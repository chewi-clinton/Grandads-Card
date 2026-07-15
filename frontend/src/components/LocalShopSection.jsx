"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  "/images/shop/shop-1.jpg",
  "/images/shop/shop-2.jpg",
  "/images/shop/shop-3.png",
  "/images/shop/shop-4.jpg",
];

export function LocalShopSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 4000);
    return () => clearInterval(id);
  }, []);

  function go(delta) {
    setIndex((i) => (i + delta + SLIDES.length) % SLIDES.length);
  }

  return (
    <section style={{ backgroundColor: "var(--background)" }}>
      <div className="container mx-auto flex flex-col items-center gap-10 px-4 py-14 md:flex-row">
        <div className="relative aspect-square w-full overflow-hidden md:w-1/2">
          {SLIDES.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt="Grandad's Cards retail store"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className={`object-cover transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0"}`}
            />
          ))}

          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-foreground opacity-80 hover:opacity-100"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="m6.797 11.625 8.03-8.03 1.06 1.06-6.97 6.97 6.97 6.97-1.06 1.06z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-foreground opacity-80 hover:opacity-100"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="m17.203 11.625-8.03-8.03-1.06 1.06 6.97 6.97-6.97 6.97 1.06 1.06z" />
            </svg>
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                onClick={() => setIndex(i)}
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: i === index ? "#dc6726" : "#1a1a1a",
                  opacity: i === index ? 1 : 0.5,
                }}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="mb-4 text-3xl font-bold">Your Local Card Shop</h2>
          <p className="mb-6 text-neutral-700">
            Grandad&apos;s Cards is a family-run trading card shop built on community and trust.
            Whether you&apos;re chasing a grail, cracking sealed product, or bringing the kids in
            for their first pack, we&apos;re here to make collecting fun, fair, and friendly.
          </p>
          <a
            href="https://www.google.com/maps/place/Grandad's+Cards/@38.0276133,-84.5343111,17z"
            target="_blank"
            rel="noopener"
            className="inline-block rounded bg-foreground px-6 py-3 text-sm font-bold text-white hover:opacity-90"
          >
            Visit the shop
          </a>
        </div>
      </div>
    </section>
  );
}
