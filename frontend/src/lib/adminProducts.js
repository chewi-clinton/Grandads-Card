const ADDED_KEY = "admin_products_added";
const EDITED_KEY = "admin_products_edited";
const DELETED_KEY = "admin_products_deleted";

function readJson(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Merges the real scraped catalog with local admin overrides (additions/edits/deletions).
// This is a frontend-only staging layer — the real backend will own persistence.
export function mergeProducts(baseProducts) {
  const added = readJson(ADDED_KEY, []);
  const edited = readJson(EDITED_KEY, {});
  const deleted = readJson(DELETED_KEY, []);

  const base = baseProducts
    .filter((p) => !deleted.includes(p.handle))
    .map((p) => (edited[p.handle] ? { ...p, ...edited[p.handle] } : p));

  return [...added, ...base];
}

export function findProduct(handle, baseProducts) {
  return mergeProducts(baseProducts).find((p) => p.handle === handle) || null;
}

// Resolves a single product without needing the full catalog in memory —
// used on edit pages where the server only passes the one matched product.
export function resolveProduct(handle, baseProduct) {
  const deleted = readJson(DELETED_KEY, []);
  if (deleted.includes(handle)) return null;

  if (baseProduct) {
    const edited = readJson(EDITED_KEY, {});
    return edited[handle] ? { ...baseProduct, ...edited[handle] } : baseProduct;
  }

  const added = readJson(ADDED_KEY, []);
  return added.find((p) => p.handle === handle) || null;
}

export function addProduct(input) {
  const added = readJson(ADDED_KEY, []);
  const baseHandle = slugify(input.title || "new-product");
  let handle = baseHandle;
  let suffix = 1;
  while (added.some((p) => p.handle === handle)) {
    handle = `${baseHandle}-${suffix++}`;
  }

  const product = {
    id: `local-${Date.now()}`,
    handle,
    title: input.title,
    descriptionHtml: input.description || "",
    vendor: input.vendor || "Grandad's Cards",
    type: input.type || "",
    tags: [],
    price: input.price,
    compareAtPrice: input.compareAtPrice || null,
    available: Boolean(input.available),
    category: input.category || "other",
    image: input.image || "/images/site/logo.png",
    images: input.image ? [input.image] : [],
    variants: [{ id: `local-${Date.now()}`, title: "Default", sku: "", price: input.price, available: Boolean(input.available) }],
    _local: true,
  };

  added.push(product);
  writeJson(ADDED_KEY, added);
  return product;
}

export function updateProduct(handle, input) {
  const added = readJson(ADDED_KEY, []);
  const idx = added.findIndex((p) => p.handle === handle);

  if (idx !== -1) {
    added[idx] = { ...added[idx], ...input, images: input.image ? [input.image] : added[idx].images };
    writeJson(ADDED_KEY, added);
    return added[idx];
  }

  const edited = readJson(EDITED_KEY, {});
  edited[handle] = { ...edited[handle], ...input, images: input.image ? [input.image] : edited[handle]?.images };
  writeJson(EDITED_KEY, edited);
  return { handle, ...input };
}

export function deleteProduct(handle) {
  const added = readJson(ADDED_KEY, []);
  if (added.some((p) => p.handle === handle)) {
    writeJson(ADDED_KEY, added.filter((p) => p.handle !== handle));
    return;
  }
  const deleted = readJson(DELETED_KEY, []);
  if (!deleted.includes(handle)) {
    deleted.push(handle);
    writeJson(DELETED_KEY, deleted);
  }
}
