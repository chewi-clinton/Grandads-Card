"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { mergeProducts, deleteProduct } from "@/lib/adminProducts";
import { formatPrice } from "@/lib/format";

export function AdminProductsTable({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [confirmHandle, setConfirmHandle] = useState(null);

  useEffect(() => {
    setProducts(mergeProducts(initialProducts));
  }, [initialProducts]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) => p.title.toLowerCase().includes(q) || p.vendor.toLowerCase().includes(q)
    );
  }, [products, search]);

  function handleDelete(handle) {
    deleteProduct(handle);
    setProducts(mergeProducts(initialProducts));
    setConfirmHandle(null);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-accent px-4 py-2 text-sm font-bold text-white hover:opacity-90"
        >
          Add Product
        </Link>
      </div>

      <input
        type="search"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full max-w-sm border border-border bg-white p-2.5 text-sm"
      />

      <div className="overflow-x-auto border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-badge-bg">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Vendor</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 200).map((p) => (
              <tr key={p.handle} className="border-b border-border last:border-b-0">
                <td className="p-3">
                  <div className="relative h-12 w-12 bg-badge-bg">
                    {p.image && <Image src={p.image} alt={p.title} fill className="object-contain" sizes="48px" />}
                  </div>
                </td>
                <td className="max-w-xs truncate p-3 font-semibold">{p.title}</td>
                <td className="p-3 text-neutral-600">{p.vendor}</td>
                <td className="p-3">{formatPrice(p.price)}</td>
                <td className="p-3">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: p.available ? "#0d893e" : "#9e0011" }}
                  >
                    {p.available ? "In stock" : "Sold out"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <Link href={`/admin/products/${p.handle}`} className="text-link text-xs underline">
                      Edit
                    </Link>
                    {confirmHandle === p.handle ? (
                      <span className="text-xs">
                        <button onClick={() => handleDelete(p.handle)} className="font-bold text-[#9e0011] underline">
                          Confirm
                        </button>{" "}
                        <button onClick={() => setConfirmHandle(null)} className="underline">
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmHandle(p.handle)}
                        className="text-xs text-[#9e0011] underline"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length > 200 && (
        <p className="mt-3 text-xs text-neutral-500">
          Showing first 200 of {filtered.length.toLocaleString()} matching products. Use search to narrow results.
        </p>
      )}
    </div>
  );
}
