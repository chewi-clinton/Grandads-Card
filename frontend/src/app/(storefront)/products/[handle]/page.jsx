import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AddToCart } from "@/components/AddToCart";
import { AwardIcon, BoxIcon, ChevronDownIcon } from "@/components/icons";
import { getProductByHandle } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/data/nav";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) return {};

  const plainDescription = product.descriptionHtml.replace(/<[^>]+>/g, " ").trim().slice(0, 160);

  return {
    title: product.title,
    description: plainDescription || product.title,
    alternates: { canonical: `/products/${product.handle}` },
    openGraph: {
      title: product.title,
      description: plainDescription,
      url: `${siteConfig.url}/products/${product.handle}`,
      images: [`${siteConfig.url}${product.image}`],
    },
  };
}

export default async function ProductPage({ params }) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.descriptionHtml.replace(/<[^>]+>/g, " ").trim(),
    image: `${siteConfig.url}${product.image}`,
    sku: product.variants[0]?.sku,
    brand: { "@type": "Brand", name: product.vendor },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: (product.price / 100).toFixed(2),
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${siteConfig.url}/products/${product.handle}`,
    },
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ text: "Home", href: "/" }, { text: product.title }]} />
      <div className="container mx-auto grid gap-10 px-4 py-6 lg:grid-cols-2">
        <div
          className="relative aspect-square border"
          style={{ backgroundColor: "#f3f1ec", borderColor: "var(--color-border)" }}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-6"
            sizes="(min-width: 1024px) 560px, 100vw"
            priority
          />
        </div>

        <div>
          <p className="text-link text-[13.2px]">{product.vendor}</p>
          <h1 className="mb-3 mt-1 text-2xl font-bold">{product.title}</h1>
          <p className="mb-4 text-[32px] font-normal">{formatPrice(product.price)}</p>

          <div className="mb-6 flex items-center gap-2 text-sm">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: product.available ? "#0d893e" : "#9e0011" }}
            />
            <span style={{ color: product.available ? "#0d893e" : "#9e0011" }}>
              {product.available ? "In stock" : "Sold out"}
            </span>
          </div>

          <AddToCart product={product} />

          <div
            className="mt-6 flex items-center gap-3 rounded p-4 text-sm"
            style={{ backgroundColor: "var(--color-badge-bg)" }}
          >
            <AwardIcon className="shrink-0" width={28} height={28} />
            Family-run shop &mdash; every card checked and securely packed.
          </div>

          <hr className="my-6 border-border" />

          <div
            className="prose prose-sm max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

          <details className="mt-4 border-t border-border py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between">
              <span className="flex items-center gap-2 font-heading text-[15px] font-bold">
                <BoxIcon width={20} height={20} />
                Shipping &amp; Protection
              </span>
              <ChevronDownIcon />
            </summary>
            <p className="mt-3 text-sm text-neutral-600">
              Every order is packed with card-safe protective materials. For delivery options and
              rates, see checkout &mdash; or contact us with any questions.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
