"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addProduct, updateProduct } from "@/lib/adminProducts";

export function ProductForm({ product }) {
  const router = useRouter();
  const isEdit = Boolean(product);

  const [form, setForm] = useState({
    title: product?.title || "",
    vendor: product?.vendor || "Grandad's Cards",
    type: product?.type || "",
    description: product?.descriptionHtml || "",
    price: product ? (product.price / 100).toFixed(2) : "",
    compareAtPrice: product?.compareAtPrice ? (product.compareAtPrice / 100).toFixed(2) : "",
    image: product?.image || "",
    available: product?.available ?? true,
  });

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const input = {
      title: form.title,
      vendor: form.vendor,
      type: form.type,
      description: form.description,
      price: Math.round(parseFloat(form.price || "0") * 100),
      compareAtPrice: form.compareAtPrice ? Math.round(parseFloat(form.compareAtPrice) * 100) : null,
      image: form.image,
      available: form.available,
    };

    if (isEdit) {
      updateProduct(product.handle, input);
    } else {
      addProduct(input);
    }
    router.push("/admin/products");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <div>
        <label className="mb-1 block text-sm font-semibold" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          required
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          className="w-full border border-border bg-white p-2.5 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="vendor">
            Vendor
          </label>
          <input
            id="vendor"
            value={form.vendor}
            onChange={(e) => set("vendor", e.target.value)}
            className="w-full border border-border bg-white p-2.5 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="type">
            Type
          </label>
          <input
            id="type"
            value={form.type}
            onChange={(e) => set("type", e.target.value)}
            className="w-full border border-border bg-white p-2.5 text-sm"
            placeholder="e.g. Pokemon Booster Box"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="price">
            Price ($)
          </label>
          <input
            id="price"
            required
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            className="w-full border border-border bg-white p-2.5 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="compareAtPrice">
            Compare-at Price ($)
          </label>
          <input
            id="compareAtPrice"
            type="number"
            min="0"
            step="0.01"
            value={form.compareAtPrice}
            onChange={(e) => set("compareAtPrice", e.target.value)}
            className="w-full border border-border bg-white p-2.5 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold" htmlFor="image">
          Image Path
        </label>
        <input
          id="image"
          value={form.image}
          onChange={(e) => set("image", e.target.value)}
          placeholder="/images/products/example.jpg"
          className="w-full border border-border bg-white p-2.5 text-sm"
        />
        <p className="mt-1 text-xs text-neutral-500">Image upload connects once MinIO storage is live.</p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          rows={5}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className="w-full border border-border bg-white p-2.5 text-sm"
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          checked={form.available}
          onChange={(e) => set("available", e.target.checked)}
        />
        In stock
      </label>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="bg-accent px-6 py-2.5 text-sm font-bold text-white hover:opacity-90">
          {isEdit ? "Save Changes" : "Add Product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="border border-border px-6 py-2.5 text-sm font-bold"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
