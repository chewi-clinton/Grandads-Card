import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { formatPrice } from "@/lib/format";

function ProductListItem({ product }) {
  return (
    <Link
      href={`/products/${product.handle}`}
      className="flex items-center gap-4 border-b border-border py-4"
    >
      <div className="relative h-20 w-20 shrink-0 bg-white shadow-[0_0_0_1px_var(--color-border)]">
        <Image src={product.image} alt={product.title} fill className="object-contain p-2" sizes="80px" />
      </div>
      <div className="flex-1">
        <p className="text-link text-xs">{product.vendor}</p>
        <h3 className="text-sm font-semibold">{product.title}</h3>
        {!product.available && <p className="text-xs" style={{ color: "#9e0011" }}>Sold out</p>}
      </div>
      <p className="font-bold">{formatPrice(product.price)}</p>
    </Link>
  );
}

export function ProductGrid({ products, view = "grid" }) {
  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-neutral-500">
        More products in this collection are being added soon.
      </p>
    );
  }

  if (view === "list") {
    return (
      <div>
        {products.map((p) => (
          <ProductListItem key={p.id} product={p} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
