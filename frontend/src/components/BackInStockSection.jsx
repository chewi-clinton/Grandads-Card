import Link from "next/link";
import { ProductCarousel } from "./ProductCarousel";
import { getProductByHandle } from "@/data/products";

const HANDLES = [
  "nihil-zero-booster-box-m3",
  "mega-symphonia-booster-box-m1s",
  "abyss-eye-booster-box-m5-pre-order",
  "chinese-gem-pack-volume-4-booster-box",
  "ninja-spinner-booster-box-m4",
  "stellar-miracle-booster-box-sv7",
];

export function BackInStockSection() {
  const products = HANDLES.map((h) => getProductByHandle(h)).filter(Boolean);
  if (products.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-14">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Back In Stock</h2>
        <Link href="/collections/all-products" className="text-sm text-link underline">
          View all
        </Link>
      </div>
      <ProductCarousel products={products} />
    </section>
  );
}
