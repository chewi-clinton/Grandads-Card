import Image from "next/image";
import Link from "next/link";
import { homepageCategoryTiles } from "@/data/collections";

export function CategoryGrid() {
  return (
    <section className="bg-background py-14">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {homepageCategoryTiles.map((cat) => (
            <Link key={cat.handle} href={`/collections/${cat.handle}`} className="group text-center">
              <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-white">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-contain p-4 transition-transform group-hover:scale-105"
                  sizes="200px"
                />
              </div>
              <p className="mt-2 text-sm font-semibold">{cat.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
