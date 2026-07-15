import json
import os
import re
import shutil

from django.conf import settings
from django.core.management.base import BaseCommand
from django.db import transaction

from products.models import Category, Product, ProductVariant

CATEGORY_DEFS = [
    ("pokemon-japanese", "Japanese Pokémon"),
    ("pokemon-chinese", "Chinese Pokémon"),
    ("pokemon-english", "English Pokémon"),
    ("pokemon-singles", "Pokémon Singles"),
    ("one-piece-sealed", "One Piece"),
    ("one-piece-singles", "One Piece Singles"),
    ("mtg-sealed", "Magic: The Gathering"),
    ("mtg-singles", "Magic: The Gathering Singles"),
    ("riftbound-sealed", "Sealed Riftbound"),
    ("riftbound-singles", "Riftbound Singles"),
    ("accessories", "Accessories"),
]

# Mirrors CATEGORY_RULES in frontend/src/data/products.js — keep in sync.
CATEGORY_RULES = [
    ("one-piece-singles", lambda t, tags: re.search(r"one piece.*single", t, re.I)),
    ("one-piece-sealed", lambda t, tags: re.search(r"one piece", t, re.I) or any(re.search(r"one piece", x, re.I) for x in tags)),
    ("riftbound-singles", lambda t, tags: re.search(r"riftbound.*single", t, re.I)),
    ("riftbound-sealed", lambda t, tags: re.search(r"riftbound", t, re.I)),
    ("mtg-singles", lambda t, tags: re.search(r"mtg single", t, re.I)),
    ("mtg-sealed", lambda t, tags: re.search(r"mtg|magic", t, re.I)),
    ("accessories", lambda t, tags: re.search(r"sleeve|loader|accessor|case|binder", t, re.I)),
    ("pokemon-singles", lambda t, tags: re.search(r"pokemon single|pokemon japan single", t, re.I)),
    ("pokemon-chinese", lambda t, tags: re.search(r"^chinese (booster box|pokemon)", t, re.I)),
    ("pokemon-japanese", lambda t, tags: re.search(r"^japanese (booster box|pokemon)|pokemon japan", t, re.I)),
    ("pokemon-english", lambda t, tags: re.search(r"pokemon", t, re.I)),
]


def categorize(type_str, tags):
    type_str = type_str or ""
    tags = tags or []
    for handle, test in CATEGORY_RULES:
        if test(type_str, tags):
            return handle
    return None


class Command(BaseCommand):
    help = "Imports the scraped product catalog (products-all.jsonl) into the database."

    def add_arguments(self, parser):
        parser.add_argument(
            "--jsonl",
            default=str(settings.BASE_DIR.parent / "frontend" / "src" / "data" / "products-all.jsonl"),
        )
        parser.add_argument(
            "--images-dir",
            default=str(settings.BASE_DIR.parent / "frontend" / "public" / "images" / "products"),
        )
        parser.add_argument("--limit", type=int, default=None)

    def handle(self, *args, **options):
        jsonl_path = options["jsonl"]
        images_dir = options["images_dir"]
        limit = options["limit"]

        if not os.path.exists(jsonl_path):
            self.stderr.write(self.style.ERROR(f"JSONL file not found: {jsonl_path}"))
            return

        categories = {}
        for handle, title in CATEGORY_DEFS:
            cat, _ = Category.objects.get_or_create(handle=handle, defaults={"title": title})
            categories[handle] = cat
        self.stdout.write(self.style.SUCCESS(f"Ensured {len(categories)} categories."))

        media_products_dir = os.path.join(settings.MEDIA_ROOT, "products") if not settings.USE_S3 else None
        if media_products_dir:
            os.makedirs(media_products_dir, exist_ok=True)

        created, skipped, no_image = 0, 0, 0
        existing_handles = set(Product.objects.values_list("handle", flat=True))

        with open(jsonl_path, "r") as f:
            lines = [line for line in f if line.strip()]

        if limit:
            lines = lines[:limit]

        batch_size = 250
        pending = []

        def flush(pending):
            nonlocal created
            if not pending:
                return
            with transaction.atomic():
                products = [
                    Product(
                        handle=item["handle"],
                        title=item["title"],
                        description_html=item["description_html"],
                        vendor=item["vendor"],
                        type=item["type"],
                        tags=item["tags"],
                        price=item["price"],
                        compare_at_price=item["compare_at_price"],
                        available=item["available"],
                        category=item["category"],
                        image=item["image"],
                    )
                    for item in pending
                ]
                Product.objects.bulk_create(products)

                variants = []
                for product, item in zip(products, pending):
                    item_variants = item["variants"]
                    if item_variants:
                        for v in item_variants:
                            variants.append(
                                ProductVariant(
                                    product=product,
                                    title=v.get("title", "Default"),
                                    sku=v.get("sku", "") or "",
                                    price=v.get("price") or product.price,
                                    available=bool(v.get("available")),
                                )
                            )
                    else:
                        variants.append(
                            ProductVariant(
                                product=product, title="Default", price=product.price, available=product.available
                            )
                        )
                ProductVariant.objects.bulk_create(variants)
            created += len(pending)
            self.stdout.write(f"  {created} imported...")
            self.stdout.flush()

        for line in lines:
            try:
                p = json.loads(line)
            except json.JSONDecodeError:
                continue

            handle = p.get("handle")
            if not handle or handle in existing_handles:
                skipped += 1
                continue
            existing_handles.add(handle)

            local_image = p.get("_local_image")
            image_name = None
            if local_image:
                src_filename = os.path.basename(local_image)
                src_path = os.path.join(images_dir, src_filename)
                if os.path.exists(src_path) and media_products_dir:
                    dest_path = os.path.join(media_products_dir, src_filename)
                    if not os.path.exists(dest_path):
                        shutil.copy2(src_path, dest_path)
                    image_name = f"products/{src_filename}"
            else:
                no_image += 1

            cat_handle = categorize(p.get("type"), p.get("tags"))
            category = categories.get(cat_handle) if cat_handle else None

            pending.append(
                {
                    "handle": handle,
                    "title": p.get("title", ""),
                    "description_html": p.get("description", "") or "",
                    "vendor": p.get("vendor", "") or "",
                    "type": p.get("type", "") or "",
                    "tags": p.get("tags") or [],
                    "price": p.get("price") or 0,
                    "compare_at_price": p.get("compare_at_price") or None,
                    "available": bool(p.get("available")),
                    "category": category,
                    "image": image_name,
                    "variants": p.get("variants") or [],
                }
            )

            if len(pending) >= batch_size:
                flush(pending)
                pending = []

        flush(pending)

        self.stdout.write(
            self.style.SUCCESS(
                f"Done. Created {created}, skipped {skipped} (already existed), {no_image} had no image."
            )
        )
