"use client";

import { useRef } from "react";
import { ProductCard } from "./ProductCard";

export function ProductCarousel({ products }) {
  const trackRef = useRef(null);

  function scrollBy(amount) {
    trackRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  if (products.length === 0) return null;

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Previous"
        onClick={() => scrollBy(-320)}
        className="absolute -left-4 top-1/3 z-10 hidden h-10 w-10 items-center justify-center rounded-full bg-white text-foreground shadow md:flex"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="m6.797 11.625 8.03-8.03 1.06 1.06-6.97 6.97 6.97 6.97-1.06 1.06z" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => scrollBy(320)}
        className="absolute -right-4 top-1/3 z-10 hidden h-10 w-10 items-center justify-center rounded-full bg-white text-foreground shadow md:flex"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="m9.693 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
      <div
        ref={trackRef}
        className="carousel-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-6"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[45vw] flex-shrink-0 sm:w-[30vw] md:w-[220px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
