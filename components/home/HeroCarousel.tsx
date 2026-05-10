"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { HERO_SLIDES, SITE, type HeroSlide } from "@/lib/site";
import { cn } from "@/lib/cn";

const INTERVAL_MS = 6800;
const EASE = [0.22, 0.61, 0.36, 1] as const;

type Props = { slides?: ReadonlyArray<HeroSlide> };

export function HeroCarousel({ slides = HERO_SLIDES }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const next = useCallback(
    () => setIndex((i) => (i + 1) % slides.length),
    [slides.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + slides.length) % slides.length),
    [slides.length],
  );

  // Auto-advance — paused only on explicit pause or keyboard focus. Reduced
  // motion users still get the rotation (per spec); only the Ken Burns zoom
  // and section reveals respect prefers-reduced-motion.
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, INTERVAL_MS);
    return () => clearTimeout(t);
  }, [index, paused, next]);

  // Preload the next image so the crossfade is seamless.
  useEffect(() => {
    const nxt = slides[(index + 1) % slides.length];
    const img = new window.Image();
    img.src = nxt.image;
  }, [index, slides]);

  const slide = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="ARK Hotels — featured story"
      className="relative isolate w-full"
      // Pause only on keyboard focus (accessibility). Hover does NOT pause —
      // the rotation is the experience. Use the on-screen pause button for
      // explicit control.
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative w-full h-[calc(100svh-116px)] min-h-[460px] sm:min-h-[540px] max-h-[920px] overflow-hidden bg-ink">
        {/* Image stack — crossfade with slow Ken Burns */}
        <AnimatePresence initial={false}>
          <motion.div
            key={`img-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="absolute inset-0"
            aria-hidden={false}
          >
            <motion.div
              key={`zoom-${index}`}
              initial={{ scale: 1.02 }}
              animate={{ scale: paused || reduce ? 1.02 : 1.08 }}
              transition={{
                duration: paused || reduce ? 0.4 : INTERVAL_MS / 1000 + 1.4,
                ease: "linear",
              }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                loading={index === 0 ? "eager" : undefined}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
            {/* Vignette + bottom gradient for text legibility */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/35 to-ink/10"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-ink/45 via-transparent to-transparent"
            />
          </motion.div>
        </AnimatePresence>

        {/* Top-right chrome — atmospheric line. Hidden under lg so it
            doesn't collide with the mobile/tablet "Menu" button. */}
        <div className="absolute top-6 lg:top-10 right-6 lg:right-10 z-10 hidden lg:flex items-center gap-3 text-paper/85">
          <span className="h-px w-6 bg-paper/60" aria-hidden />
          <span className="text-[11px] uppercase tracking-[0.22em]">
            Front desk · 24 hours · {SITE.phone.display}
          </span>
        </div>

        {/* Top-left brand mark — kept light so the regular header layers cleanly above it */}
        <div className="absolute top-6 lg:top-10 left-6 lg:left-10 z-10 hidden md:block text-paper/0 select-none">
          {/* spacer — header above provides the wordmark; this is a hook for future overlays */}
        </div>

        {/* Text panel — flex justify-end with a hard top padding so the
            content can never overflow upward into the sticky chrome, no
            matter how tall the headline gets on a given slide. */}
        <div className="absolute inset-0 z-10 flex pointer-events-none">
          {/* Top padding ≥ sticky chrome (TopBar 36 + Header 80 = 116px) so
              the headline can never overflow upward into it on tall slides. */}
          <div className="container-page w-full flex flex-col justify-end pt-32 lg:pt-36 pb-20 sm:pb-16 lg:pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${index}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="max-w-[64ch] pointer-events-auto"
              >
                <p className="flex flex-wrap items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-paper/85">
                  <span className="h-px w-6 bg-brass" aria-hidden />
                  <span>{slide.eyebrow}</span>
                </p>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
                  className="mt-5 font-display text-[30px] sm:text-[44px] lg:text-[58px] leading-[1.08] tracking-[-0.02em] text-paper"
                >
                  {slide.headline}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
                  className="mt-5 text-[15px] lg:text-[17px] leading-[1.6] text-paper/85 max-w-[56ch]"
                >
                  {slide.supporting}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
                  className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <Link
                    href={slide.primaryHref}
                    className="inline-flex items-center justify-center px-6 py-3 bg-brass text-paper text-[15px] font-medium tracking-tight rounded-[2px] hover:bg-brass-deep transition-colors duration-[180ms]"
                  >
                    {slide.primaryLabel}
                  </Link>
                  <a
                    href={SITE.phone.tel}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-paper/55 text-paper text-[15px] font-medium rounded-[2px] hover:bg-paper hover:text-ink transition-colors duration-[180ms]"
                  >
                    <span>Call front desk</span>
                    <span className="opacity-65 tabular-nums">
                      · {SITE.phone.display}
                    </span>
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom-right controls (desktop) — slide ticks (each tick fills as
            its slide is active), pause/play, prev/next */}
        <div className="hidden md:flex absolute bottom-8 right-8 lg:bottom-12 lg:right-10 z-10 items-center gap-5 text-paper">
          {/* Slide ticks — active one is bright/thicker, others dim. The
              outer button gets 44px tap height so it meets touch-target
              minimums; the visible rule itself stays a hairline. */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="group h-11 w-12 grid place-items-center"
              >
                <span
                  className={cn(
                    "block w-full transition-all duration-[280ms] ease-[var(--ease-out-soft)]",
                    i === index
                      ? "h-[2px] bg-paper"
                      : i < index
                        ? "h-px bg-paper/55 group-hover:bg-paper/80"
                        : "h-px bg-paper/30 group-hover:bg-paper/55",
                  )}
                />
              </button>
            ))}
          </div>

          {/* Pause / play */}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            className="h-11 w-11 grid place-items-center border border-paper/40 hover:border-paper hover:bg-paper hover:text-ink transition-colors rounded-[2px]"
          >
            {paused ? (
              <svg width="11" height="12" viewBox="0 0 11 12" aria-hidden>
                <path d="M0 0 L11 6 L0 12 Z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
                <rect x="0" y="0" width="3" height="12" fill="currentColor" />
                <rect x="7" y="0" width="3" height="12" fill="currentColor" />
              </svg>
            )}
          </button>

          {/* Prev / next */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="h-11 w-11 grid place-items-center border border-paper/40 hover:border-paper hover:bg-paper hover:text-ink transition-colors text-[18px] rounded-[2px]"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="h-11 w-11 grid place-items-center border border-paper/40 hover:border-paper hover:bg-paper hover:text-ink transition-colors text-[18px] rounded-[2px]"
            >
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>

        {/* Bottom centre slide ticks (mobile) — wrapper is 44px tall for tap,
            the visible rule itself stays a hairline. */}
        <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-11 grid place-items-center px-1.5"
            >
              <span
                aria-hidden
                className={cn(
                  "block h-[2px] transition-all duration-[280ms]",
                  i === index ? "w-8 bg-paper" : "w-3 bg-paper/40",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Live region for screen readers — announces slide changes */}
      <span aria-live="polite" className="sr-only">
        {`Slide ${index + 1} of ${slides.length}: ${slide.eyebrow}. ${slide.headline}`}
      </span>
    </section>
  );
}
