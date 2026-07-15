import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGrid } from "@/components/ProductGrid";
import { CollectionToolbar } from "@/components/CollectionToolbar";
import { Pagination } from "@/components/Pagination";
import { getCollectionByHandle, collections } from "@/data/collections";
import { getProductsByCategories } from "@/data/products";
import { siteConfig } from "@/data/nav";

const PAGE_SIZE = 24;

export function generateStaticParams() {
  return collections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const collection = getCollectionByHandle(handle);
  if (!collection) return {};

  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.handle}` },
    openGraph: {
      title: collection.title,
      description: collection.description,
      url: `${siteConfig.url}/collections/${collection.handle}`,
      images: [`${siteConfig.url}${collection.image}`],
    },
  };
}

function filterProducts(products, sp) {
  let filtered = products;

  const availability = Array.isArray(sp?.availability)
    ? sp.availability
    : sp?.availability
      ? [sp.availability]
      : [];
  if (availability.length > 0) {
    filtered = filtered.filter((p) => {
      if (availability.includes("in-stock") && p.available) return true;
      if (availability.includes("sold-out") && !p.available) return true;
      return false;
    });
  }

  const minPrice = sp?.minPrice ? parseFloat(sp.minPrice) * 100 : null;
  const maxPrice = sp?.maxPrice ? parseFloat(sp.maxPrice) * 100 : null;
  if (minPrice !== null) filtered = filtered.filter((p) => p.price >= minPrice);
  if (maxPrice !== null) filtered = filtered.filter((p) => p.price <= maxPrice);

  return filtered;
}

function sortProducts(products, sort) {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
}

export default async function CollectionPage({ params, searchParams }) {
  const { handle } = await params;
  const sp = await searchParams;
  const collection = getCollectionByHandle(handle);
  if (!collection) notFound();

  const filtered = filterProducts(getProductsByCategories(collection.categories), sp);
  const allProducts = sortProducts(filtered, sp?.sort);
  const currentPage = Math.max(1, parseInt(sp?.page ?? "1", 10) || 1);
  const totalPages = Math.max(1, Math.ceil(allProducts.length / PAGE_SIZE));
  const pageProducts = allProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const view = sp?.view === "list" ? "list" : "grid";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.title,
    description: collection.description,
    url: `${siteConfig.url}/collections/${collection.handle}`,
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ text: "Home", href: "/" }, { text: collection.title }]} />
      <div className="container mx-auto px-4">
        <div className="mb-6 grid overflow-hidden sm:grid-cols-2" style={{ backgroundColor: "var(--background)" }}>
          <div className="flex items-center p-8 sm:p-12">
            <h1 className="text-4xl font-bold sm:text-5xl">{collection.title}</h1>
          </div>
          <div className="relative hidden aspect-video sm:block">
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              priority
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <Suspense fallback={<div className="h-14 border-b border-border" />}>
          <CollectionToolbar resultCount={allProducts.length} />
        </Suspense>

        <div className="py-6">
          <ProductGrid products={pageProducts} view={view} />
        </div>

        <Pagination
          basePath={`/collections/${collection.handle}`}
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={sp}
        />
      </div>
    </div>
  );
}
