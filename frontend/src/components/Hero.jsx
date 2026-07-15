"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/site/hero-storm-emeralda.jpg",
    heading: "Storm Emeralda Pre-Orders.",
    subheading: "The newest Japanese set. Coming soon.",
    ctaText: "Shop the release",
    ctaHref: "/collections/japanese-pokemon",
  },
  {
    image: "/images/site/hero-dream.png",
    heading: "MEGA Dream Shipping Daily",
    subheading:
      "The Japanese High Class Pack is here. Sealed boxes and singles while stock lasts.",
    ctaText: "Shop the release",
    ctaHref: "/collections/japanese-pokemon",
  },
  {
    image: "/images/site/hero-ninja.png",
    heading: "Ninja Spinner Out of Control",
    ctaText: "Shop the release",
    ctaHref: "/collections/japanese-pokemon",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [playing]);

  const slide = slides[index];

  return (
    <section className="relative h-[420px] w-full overflow-hidden bg-black sm:h-[600px]">
      <Image
        src={slide.image}
        alt={slide.heading}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="relative z-10 flex h-full items-center px-6 sm:px-16">
        <div className="max-w-lg text-white">
          <h1 className="mb-4 text-3xl font-bold sm:text-5xl">{slide.heading}</h1>
          {slide.subheading && <p className="mb-6 text-base sm:text-lg">{slide.subheading}</p>}
          <Link
            href={slide.ctaHref}
            className="inline-block rounded bg-accent px-6 py-3 text-sm font-bold text-white hover:opacity-90"
          >
            {slide.ctaText}
          </Link>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        {slides.map((s, i) => (
          <button
            key={s.image}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`}
          />
        ))}
        <button
          aria-label={playing ? "Pause slideshow" : "Play slideshow"}
          onClick={() => setPlaying((p) => !p)}
          className="ml-2 text-white"
        >
          {playing ? "❙❙" : "▶"}
        </button>
      </div>
    </section>
  );
}
