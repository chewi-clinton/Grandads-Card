import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/data/nav";

export const metadata = {
  title: "Retail Store",
  description: `Visit Grandad's Cards at ${siteConfig.address}.`,
  alternates: { canonical: "/pages/retail-store" },
};

export default function RetailStorePage() {
  return (
    <div>
      <Breadcrumbs items={[{ text: "Home", href: "/" }, { text: "Retail Store" }]} />
      <div className="container mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold">Retail Store</h1>
        <p className="mb-2 text-lg">{siteConfig.address}</p>
        <p className="mb-8">
          <a href={`mailto:${siteConfig.email}`} className="text-link underline">
            {siteConfig.email}
          </a>
        </p>
        <a
          href="https://www.google.com/maps/place/Grandad's+Cards/@38.0276133,-84.5343111,17z"
          target="_blank"
          rel="noopener"
          className="inline-block rounded bg-foreground px-6 py-3 text-sm font-bold text-white hover:opacity-90"
        >
          Get directions
        </a>
      </div>
    </div>
  );
}
