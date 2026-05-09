"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";

type CarouselImage = {
  src: string;
  alt: string;
  caption?: string;
};

type Props = {
  images: ReadonlyArray<CarouselImage>;
  ratio?: "21/9" | "16/9" | "4/5" | "3/4" | "1/1" | "5/4" | "3/2";
  className?: string;
};

const RATIO_CLASS: Record<NonNullable<Props["ratio"]>, string> = {
  "21/9": "aspect-[21/9]",
  "16/9": "aspect-[16/9]",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
  "5/4": "aspect-[5/4]",
  "3/2": "aspect-[3/2]",
};

const EASE = [0.22, 0.61, 0.36, 1] as const;

export function ImageCarousel({ images, ratio = "3/4", className }: Props) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  if (!images || images.length === 0) return null;

  return (
    <figure className={cn("space-y-3 group", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden bg-parchment",
          RATIO_CLASS[ratio]
        )}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={images[index].src}
              alt={images[index].alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-paper/80 hover:bg-paper text-ink flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm"
              aria-label="Previous image"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-paper/80 hover:bg-paper text-ink flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm"
              aria-label="Next image"
            >
              <span aria-hidden>→</span>
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-[280ms]",
                    i === index ? "bg-paper scale-110" : "bg-paper/40 hover:bg-paper/70"
                  )}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <AnimatePresence mode="wait">
        {images[index].caption ? (
          <motion.figcaption
            key={`caption-${index}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="pt-3"
          >
            <span className="brass-rule" aria-hidden />
            <span className="block mt-2 text-[13px] text-ink-soft leading-snug">
              {images[index].caption}
            </span>
          </motion.figcaption>
        ) : null}
      </AnimatePresence>
    </figure>
  );
}
