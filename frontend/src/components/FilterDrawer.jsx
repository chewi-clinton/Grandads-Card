"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CloseIcon } from "./icons";

export function FilterDrawer({ open, onClose }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [availability, setAvailability] = useState(searchParams.getAll("availability"));
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  function toggleAvailability(value) {
    setAvailability((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  }

  function apply() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("availability");
    availability.forEach((v) => params.append("availability", v));
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");
    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
    onClose();
  }

  function clearAll() {
    setAvailability([]);
    setMinPrice("");
    setMaxPrice("");
    router.push(pathname);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-black/40" onClick={onClose}>
      <div className="flex h-full w-full max-w-xs flex-col bg-white p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold font-heading">Filters</h2>
          <button onClick={onClose} aria-label="Close">
            <CloseIcon width={20} height={20} />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 font-bold">Availability</h3>
          <label className="flex items-center gap-2 py-1 text-sm">
            <input
              type="checkbox"
              checked={availability.includes("in-stock")}
              onChange={() => toggleAvailability("in-stock")}
            />
            In stock
          </label>
          <label className="flex items-center gap-2 py-1 text-sm">
            <input
              type="checkbox"
              checked={availability.includes("sold-out")}
              onChange={() => toggleAvailability("sold-out")}
            />
            Sold out
          </label>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 font-bold">Price</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              placeholder="From $"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full rounded border border-border p-2 text-sm"
            />
            <span>&ndash;</span>
            <input
              type="number"
              min="0"
              placeholder="To $"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full rounded border border-border p-2 text-sm"
            />
          </div>
        </div>

        <div className="mt-auto flex gap-3">
          <button onClick={clearAll} className="flex-1 rounded border border-border py-3 text-sm font-bold">
            Clear all
          </button>
          <button onClick={apply} className="flex-1 rounded bg-foreground py-3 text-sm font-bold text-white">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
