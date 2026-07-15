"use client";

import { useState } from "react";
import { ChevronDownIcon, MicIcon } from "./icons";

const PRODUCT_TYPES = [
  "All",
  "Accessories",
  "Chinese Booster Box",
  "Japanese Booster Box",
  "Japanese One Piece Booster Box",
  "MTG Sealed",
  "MTG Single",
  "One Piece Card Game Single",
  "Pokemon Sealed",
  "Pokemon Single",
  "Riftbound: League of Legends Trading Card Game Single",
];

export function SearchBar() {
  const [type, setType] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative flex w-full items-center rounded border border-border bg-white">
      <div className="relative flex-shrink-0 border-r border-border">
        <button
          type="button"
          onClick={() => setDropdownOpen((o) => !o)}
          className="flex items-center gap-1 px-3 py-2.5 text-sm text-foreground"
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
        >
          <span>{type}</span>
          <ChevronDownIcon className="text-foreground" />
        </button>
        {dropdownOpen && (
          <ul className="absolute left-0 top-full z-30 max-h-72 w-64 overflow-y-auto rounded border border-border bg-white py-1 shadow-lg">
            {PRODUCT_TYPES.map((t) => (
              <li key={t}>
                <button
                  type="button"
                  onClick={() => {
                    setType(t);
                    setDropdownOpen(false);
                  }}
                  className="block w-full px-3 py-1.5 text-left text-sm hover:bg-background"
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <input
        type="search"
        placeholder="Search for products"
        aria-label="Search"
        className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-neutral-500"
      />
      <button type="button" aria-label="Search by voice" className="flex-shrink-0 px-3" style={{ color: "var(--color-speech)" }}>
        <MicIcon />
      </button>
    </div>
  );
}
