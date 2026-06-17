"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { HERO_SLIDES, TRUST_SIGNALS, SITE, whatsappHref, type HeroSlide } from "@/lib/site";
import { trackEvent, GA_EVENTS } from "@/lib/analytics";
import { cn } from "@/lib/cn";

function isoDateOffset(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

function MobileBookingPanel() {
  const [today] = useState(() => isoDateOffset(0));
  const [tomorrow] = useState(() => isoDateOffset(1));
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");

  const handleTap = () => {
    const parts: string[] = [];
    if (checkin) parts.push(`Check-in: ${checkin}`);
    if (checkout) parts.push(`Check-out: ${checkout}`);
    const msg = ["Hi, I'd like to check room availability.", ...parts, "Please share rates. Thanks."].join(" ");
    const url = `https://wa.me/${SITE.whatsapp.e164.replace("+", "")}?text=${encodeURIComponent(msg)}`;
    trackEvent(GA_EVENTS.BOOKING_ENQUIRY, { has_checkin: checkin ? "yes" : "no", has_checkout: checkout ? "yes" : "no", guests: "1" });
    trackEvent(GA_EVENTS.WHATSAPP_CLICK, { page: "hero_mobile_panel" });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="md:hidden bg-paper border-b border-stone-200 px-5 py-4">
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="hm-checkin" className="text-[10px] uppercase tracking-[0.18em] font-medium text-stone-400">Check-in</label>
          <input
            id="hm-checkin"
            type="date"
            min={today}
            value={checkin}
            onChange={(e) => { setCheckin(e.target.value); if (checkout && e.target.value >= checkout) setCheckout(""); }}
            className="h-11 px-3 border border-stone-200 rounded-sm text-[13px] text-ink bg-paper focus:outline-none focus:border-brass transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="hm-checkout" className="text-[10px] uppercase tracking-[0.18em] font-medium text-stone-400">Check-out</label>
          <input
            id="hm-checkout"
            type="date"
            min={checkin || tomorrow}
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            className="h-11 px-3 border border-stone-200 rounded-sm text-[13px] text-ink bg-paper focus:outline-none focus:border-brass transition-colors"
          />
        </div>
      </div>
      <button
        onClick={handleTap}
        className="w-full h-12 bg-[#25D366] text-white text-[14px] font-medium rounded-sm hover:bg-[#1ebe5d] transition-colors"
      >
        Ask rate on WhatsApp
      </button>
    </div>
  );
}

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
      className="hero-bleed relative isolate w-full"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="h-hero relative w-full overflow-hidden bg-ink">
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
              className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/30 to-ink/10"
            />
            {/* Left-side gradient for hero text panel */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent"
            />
            {/* Top gradient — ensures the transparent desktop header (logo + nav)
                is always legible against the hero image on lg+ viewports */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/55 to-transparent hidden lg:block"
            />
          </motion.div>
        </AnimatePresence>


        {/* Text panel — pinned to the bottom of the hero image via justify-end.
            Top padding prevents content from ever touching the absolute top
            on short viewports. On desktop (lg+), pt-36 > header height (101px)
            so content is always clear of the transparent fixed header overlay. */}
        <div className="absolute inset-0 z-10 flex pointer-events-none">
          <div className="container-page w-full flex flex-col justify-end pt-16 md:pt-28 lg:pt-36 pb-8 md:pb-16 lg:pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${index}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="max-w-[60ch] pointer-events-auto"
              >
                <p className="flex flex-wrap items-center gap-2 text-[10px] md:text-[11px] font-medium uppercase tracking-[0.22em] text-paper/80">
                  <span className="h-px w-5 bg-brass shrink-0" aria-hidden />
                  <span>{slide.eyebrow}</span>
                </p>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
                  className="mt-3 md:mt-4 font-display text-[clamp(1.65rem,5vw,3.625rem)] leading-[1.1] tracking-[-0.02em] text-paper"
                >
                  {slide.headline}
                </motion.h1>

                {/* Supporting text — only on desktop where there is ample height */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
                  className="hidden lg:block mt-5 text-[17px] leading-[1.65] text-paper/80 max-w-[52ch]"
                >
                  {slide.supporting}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
                  className="mt-5 md:mt-7 flex flex-row flex-wrap gap-2 md:gap-3"
                >
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 bg-brass text-paper text-[13px] md:text-[15px] font-medium tracking-tight rounded-[2px] hover:bg-brass-deep transition-colors duration-[180ms] whitespace-nowrap"
                  >
                    WhatsApp to Book
                  </a>
                  <Link
                    href="/rooms"
                    className="inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 border border-paper/50 text-paper text-[13px] md:text-[15px] font-medium rounded-[2px] hover:bg-paper hover:text-ink transition-colors duration-[180ms] whitespace-nowrap"
                  >
                    View Rooms
                  </Link>
                  <a
                    href={SITE.phone.tel}
                    className="hidden lg:inline-flex items-center justify-center gap-2 px-6 py-3 border border-paper/50 text-paper text-[15px] font-medium rounded-[2px] hover:bg-paper hover:text-ink transition-colors duration-[180ms]"
                  >
                    <span>Call Front Desk</span>
                    <span className="opacity-60 tabular-nums">· {SITE.phone.display}</span>
                  </a>
                </motion.div>

                {/* Compact trust strip — visible on mobile only; TrustStrip component
                    handles the full version in the page body below the hero */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
                  className="mt-4 lg:hidden flex flex-wrap items-center gap-x-3 gap-y-1"
                >
                  {TRUST_SIGNALS.map((s, i) => (
                    <span key={s.label} className="flex items-center gap-1">
                      <span className="text-[12px] font-semibold text-paper tabular-nums">{s.value}</span>
                      <span className="text-[10px] uppercase tracking-[0.1em] text-paper/50">{s.label}</span>
                      {i < TRUST_SIGNALS.length - 1 && (
                        <span className="text-paper/25 select-none" aria-hidden> · </span>
                      )}
                    </span>
                  ))}
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

      {/* Hotel identity rail — brief facts visible between hero and booking panel on mobile */}
      <div className="md:hidden bg-parchment border-b border-stone-200 px-5 py-2.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-0 whitespace-nowrap text-[11px]">
          <span className="font-medium text-stone-600">Kokar, Ranchi</span>
          <span className="mx-3 text-stone-200 select-none" aria-hidden>|</span>
          <span className="font-semibold text-brass-deep tabular-nums">9 km</span>
          <span className="ml-1 text-stone-400"> airport</span>
          <span className="mx-3 text-stone-200 select-none" aria-hidden>|</span>
          <span className="text-stone-500">Pure veg kitchen</span>
          <span className="mx-3 text-stone-200 select-none" aria-hidden>|</span>
          <span className="font-semibold text-brass-deep tabular-nums">23</span>
          <span className="ml-1 text-stone-400"> rooms</span>
        </div>
      </div>

      <MobileBookingPanel />

      {/* Live region for screen readers — announces slide changes */}
      <span aria-live="polite" className="sr-only">
        {`Slide ${index + 1} of ${slides.length}: ${slide.eyebrow}. ${slide.headline}`}
      </span>
    </section>
  );
}
