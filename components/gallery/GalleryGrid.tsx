"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export type GalleryImage = {
  src: string;
  alt: string;
  category: string;
};

type Props = {
  images: GalleryImage[];
  categories: string[];
};

export function GalleryGrid({ images, categories }: Props) {
  const [active, setActive] = useState<string>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "All" ? images : images.filter((img) => img.category === active);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prev = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, prev, next]);

  const tabs = ["All", ...categories];

  return (
    <>
      {/* Category tabs */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActive(tab); setLightbox(null); }}
              className={`px-5 py-2 text-[13px] font-medium tracking-wide rounded-[2px] transition-colors ${
                active === tab
                  ? "bg-ink text-paper"
                  : "border border-stone-200 text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-ink-soft text-[15px]">No photos in this category yet.</p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 lg:gap-4">
          {filtered.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setLightbox(i)}
              className="block w-full mb-3 lg:mb-4 break-inside-avoid overflow-hidden group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded-[2px]"
              aria-label={`Open ${img.alt}`}
            >
              <div className="relative w-full overflow-hidden rounded-[2px] bg-parchment">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300 rounded-[2px]" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[80] bg-ink/95 flex flex-col"
          onClick={closeLightbox}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-6 py-4 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-paper/50 text-[13px] tabular-nums">
              {lightbox + 1} / {filtered.length}
            </span>
            <button
              onClick={closeLightbox}
              className="text-paper/60 hover:text-paper text-[13px] uppercase tracking-[0.18em] font-medium transition-colors"
              aria-label="Close"
            >
              Close ✕
            </button>
          </div>

          {/* Image */}
          <div
            className="flex-1 flex items-center justify-center px-4 pb-4 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-5xl w-full max-h-full flex items-center justify-center">
              <Image
                src={filtered[lightbox].src}
                alt={filtered[lightbox].alt}
                width={1200}
                height={900}
                className="max-h-[80vh] w-auto object-contain rounded-[2px]"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Prev / Next */}
          <div
            className="shrink-0 flex items-center justify-center gap-6 pb-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-paper/20 text-paper/70 hover:border-paper/50 hover:text-paper transition-colors flex items-center justify-center"
              aria-label="Previous"
            >
              ←
            </button>
            <p className="text-paper/40 text-[13px] max-w-[40ch] text-center leading-snug hidden sm:block">
              {filtered[lightbox].alt}
            </p>
            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-paper/20 text-paper/70 hover:border-paper/50 hover:text-paper transition-colors flex items-center justify-center"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
