"use client";

import { useRef } from "react";
import Link from "next/link";

function Stars({ rating }) {
  return (
    <span className="text-accent" aria-label={`${rating} stars`} role="img">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

export function ProductReviewsCarousel({ reviews }) {
  const trackRef = useRef(null);

  function scrollBy(amount) {
    trackRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  if (!reviews || reviews.length === 0) return null;

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
      <div ref={trackRef} className="carousel-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-6">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="w-[80vw] shrink-0 border border-border p-5 shadow-[0_0_0_1px_var(--color-border)] sm:w-[320px]"
          >
            <Stars rating={r.rating} />
            {r.title && <p className="mt-2 font-semibold">{r.title}</p>}
            <p className="mt-1 line-clamp-4 text-sm text-neutral-600">{r.body}</p>
            {r.productHandle ? (
              <Link href={`/products/${r.productHandle}`} className="mt-3 block text-xs text-link underline">
                {r.author} &middot; {r.productTitle}
              </Link>
            ) : (
              <p className="mt-3 text-xs font-semibold">{r.author}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
