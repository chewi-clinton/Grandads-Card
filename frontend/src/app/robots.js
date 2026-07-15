import { siteConfig } from "@/data/nav";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
