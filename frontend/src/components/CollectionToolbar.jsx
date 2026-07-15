"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronDownIcon } from "./icons";
import { FilterDrawer } from "./FilterDrawer";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "best-selling", label: "Best selling" },
  { value: "title-asc", label: "Alphabetically, A-Z" },
  { value: "title-desc", label: "Alphabetically, Z-A" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
];

export function CollectionToolbar({ resultCount }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "featured";
  const currentView = searchParams.get("view") || "grid";

  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "featured" || value === "grid") params.delete(key);
    else params.set(key, value);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === currentSort)?.label ?? "Featured";

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border py-4">
        <div className="flex items-center gap-6">
          <button type="button" onClick={() => setFilterOpen(true)} className="text-sm font-bold hover:text-accent">
            Filter
          </button>

          <div className="relative flex items-center gap-2 text-sm">
            <span className="font-bold">Sort by</span>
            <button
              type="button"
              onClick={() => setSortOpen((o) => !o)}
              className="flex items-center gap-1 rounded border border-border bg-white px-3 py-1.5"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
            >
              {currentSortLabel}
              <ChevronDownIcon width={16} height={16} />
            </button>
            {sortOpen && (
              <ul className="absolute left-0 top-full z-20 mt-1 w-56 rounded border border-border bg-white py-1 shadow-lg">
                {SORT_OPTIONS.map((opt) => (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => {
                        updateParam("sort", opt.value);
                        setSortOpen(false);
                      }}
                      className="block w-full px-3 py-1.5 text-left hover:bg-background"
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">View as</span>
            <button
              type="button"
              aria-label="List view"
              aria-pressed={currentView === "list"}
              onClick={() => updateParam("view", "list")}
              className={currentView === "list" ? "text-accent" : "text-foreground"}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <g stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 6h13M8 12h13M8 18h13" />
                </g>
                <circle cx="4" cy="6" r="1.2" fill="currentColor" />
                <circle cx="4" cy="12" r="1.2" fill="currentColor" />
                <circle cx="4" cy="18" r="1.2" fill="currentColor" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={currentView === "grid"}
              onClick={() => updateParam("view", "grid")}
              className={currentView === "grid" ? "text-accent" : "text-foreground"}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" aria-hidden="true">
                <path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z" />
              </svg>
            </button>
          </div>
          <span className="text-sm text-neutral-500">{resultCount} results</span>
        </div>
      </div>

      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} />
    </>
  );
}
