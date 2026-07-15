import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }) {
  const discountPct = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block bg-white shadow-[0_0_0_1px_var(--color-border)]"
    >
      <div className="relative aspect-square bg-white">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 transition-transform group-hover:scale-105"
          sizes="(min-width: 1024px) 240px, 45vw"
        />
        <div className="absolute top-0 right-0 flex flex-col items-end gap-1 p-3">
          {!product.available && (
            <span
              className="rounded-[5px] px-2 py-0.5 text-xs font-normal text-white"
              style={{ backgroundColor: "#9e0011" }}
            >
              Sold out
            </span>
          )}
          {discountPct && (
            <span className="rounded-[5px] bg-accent px-2 py-0.5 text-xs font-normal text-white">
              {discountPct}% off
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <p className="text-link text-xs">{product.vendor}</p>
        <h3 className="mb-1 text-sm font-semibold leading-snug">{product.title}</h3>
        <p className="font-bold">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
