import { getAllProducts } from "@/data/products";
import { collections } from "@/data/collections";
import { siteConfig } from "@/data/nav";

export default function sitemap() {
  const staticRoutes = [
    { url: siteConfig.url, changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/pages/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const collectionRoutes = collections.map((c) => ({
    url: `${siteConfig.url}/collections/${c.handle}`,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const productRoutes = getAllProducts().map((p) => ({
    url: `${siteConfig.url}/products/${p.handle}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
