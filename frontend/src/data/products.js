import fs from "fs";
import path from "path";
import sampleRaw from "./products-raw.json";

const CATEGORY_RULES = [
  { category: "one-piece-singles", test: (type) => /one piece.*single/i.test(type) },
  { category: "one-piece-sealed", test: (type, tags) => /one piece/i.test(type) || tags.some((t) => /one piece/i.test(t)) },
  { category: "riftbound-singles", test: (type) => /riftbound.*single/i.test(type) },
  { category: "riftbound-sealed", test: (type) => /riftbound/i.test(type) },
  { category: "mtg-singles", test: (type) => /mtg single/i.test(type) },
  { category: "mtg-sealed", test: (type) => /mtg|magic/i.test(type) },
  { category: "accessories", test: (type) => /sleeve|loader|accessor|case|binder/i.test(type) },
  { category: "pokemon-singles", test: (type) => /pokemon single|pokemon japan single/i.test(type) },
  // "Chinese/Japanese Booster Box" are this store's bare type labels for Pokemon sealed product
  // (One Piece, MTG, and Riftbound each have their own distinct type strings, matched above).
  { category: "pokemon-chinese", test: (type) => /^chinese (booster box|pokemon)/i.test(type) },
  { category: "pokemon-japanese", test: (type) => /^japanese (booster box|pokemon)|pokemon japan/i.test(type) },
  { category: "pokemon-english", test: (type) => /pokemon/i.test(type) },
];

function categorize(type = "", tags = []) {
  for (const rule of CATEGORY_RULES) {
    if (rule.test(type, tags)) return rule.category;
  }
  return "other";
}

function toProduct(p, category) {
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    descriptionHtml: p.description,
    vendor: p.vendor,
    type: p.type,
    tags: p.tags,
    price: p.price,
    compareAtPrice: p.compare_at_price || null,
    available: p.available,
    category: category ?? p._category ?? categorize(p.type, p.tags),
    image: p._local_image,
    images: p._local_image ? [p._local_image] : [],
    variants: (p.variants || []).map((v) => ({
      id: v.id,
      title: v.title,
      sku: v.sku,
      price: v.price,
      available: v.available,
    })),
  };
}

function loadFullCatalog() {
  const jsonlPath = path.join(process.cwd(), "src/data/products-all.jsonl");
  if (!fs.existsSync(jsonlPath)) return null;

  const lines = fs.readFileSync(jsonlPath, "utf-8").split("\n").filter(Boolean);
  if (lines.length === 0) return null;

  const byHandle = new Map();
  for (const line of lines) {
    try {
      const p = JSON.parse(line);
      byHandle.set(p.handle, toProduct(p, categorize(p.type, p.tags)));
    } catch {
      // skip malformed line
    }
  }
  return [...byHandle.values()];
}

const fullCatalog = loadFullCatalog();
const products = (fullCatalog && fullCatalog.length > 0 ? fullCatalog : sampleRaw.map((p) => toProduct(p))).filter(
  (p) => Boolean(p.image)
);

export function getAllProducts() {
  return products;
}

export function getProductByHandle(handle) {
  return products.find((p) => p.handle === handle);
}

export function getProductsByCategories(categories) {
  return products.filter((p) => categories.includes(p.category));
}
