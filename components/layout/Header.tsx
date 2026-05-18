"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { NAV, SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll lock without page jump — overflow on <html> doesn't reflow
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const spring = { type: "spring" as const, stiffness: 320, damping: 32 };
  const fade = { duration: reduce ? 0 : 0.18 };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-[background-color,border-color,box-shadow] duration-300",
          scrolled
            ? "bg-paper/95 backdrop-blur-sm border-b border-stone-200 shadow-sm"
            : "bg-parchment/80 lg:bg-transparent"
        )}
      >
        {/* Utility bar — all screen sizes */}
        <div className="border-b border-stone-200/40">
          <div className="container-page flex h-9 items-center justify-between text-[13px]">
            <a
              href={SITE.phone.tel}
              className="inline-flex items-center gap-2 text-ink-soft hover:text-brass-deep transition-colors"
            >
              <span className="hidden sm:inline uppercase tracking-[0.18em] text-[11px] font-medium">
                Front desk, 24 hours
              </span>
              <span className="font-medium tabular-nums">{SITE.phone.display}</span>
            </a>
            <span className="hidden lg:block text-stone-500/80">{SITE.address.short}</span>
            <a
              href={SITE.address.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brass text-paper text-[11px] font-medium uppercase tracking-[0.12em] hover:bg-brass-deep transition-colors"
            >
              <span className="hidden sm:inline">Get directions</span>
              <span className="sm:hidden">Directions</span>
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        {/* Main bar */}
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" aria-label="ARK Hotels — home" className="flex items-center">
            <Image
              src="/images/logo/LOGO_header.webp"
              alt="ARK Hotels"
              width={180}
              height={60}
              className="h-11 sm:h-13 lg:h-14 w-auto object-contain"
              style={{ width: "auto" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-[15px] whitespace-nowrap font-medium text-ink hover:text-brass-deep transition-colors after:absolute after:left-0 after:bottom-[-6px] after:h-[2px] after:w-0 after:bg-brass hover:after:w-full after:transition-all after:duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden -mr-2 flex h-10 w-10 items-center justify-center rounded-md text-ink hover:text-brass-deep transition-colors"
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden>
              <motion.rect
                x="0" y="0" width="22" height="2" rx="1" fill="currentColor"
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={spring}
                style={{ originX: "11px", originY: "1px" }}
              />
              <motion.rect
                x="0" y="7" width="22" height="2" rx="1" fill="currentColor"
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={fade}
              />
              <motion.rect
                x="0" y="14" width="22" height="2" rx="1" fill="currentColor"
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={spring}
                style={{ originX: "11px", originY: "15px" }}
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay + drawer — outside <header> to avoid sticky stacking context */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fade}
              className="fixed inset-0 z-50 bg-black/25 lg:hidden"
              aria-hidden
              onClick={close}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={reduce ? { duration: 0 } : spring}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-paper shadow-2xl overflow-y-auto lg:hidden flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div className="flex h-16 items-center justify-between px-6 border-b border-stone-100 shrink-0">
                <Link href="/" onClick={close} className="flex items-center">
                  <Image
                    src="/images/logo/LOGO_header.webp"
                    alt="ARK Hotels"
                    width={140}
                    height={48}
                    className="h-10 w-auto object-contain"
                    style={{ width: "auto" }}
                  />
                </Link>
                <button
                  type="button"
                  onClick={close}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md text-ink hover:text-brass-deep transition-colors"
                  aria-label="Close menu"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col px-6 py-8 gap-1">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={reduce ? { duration: 0 } : { duration: 0.25, delay: 0.06 + i * 0.04, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      className="block py-3 font-display text-[26px] text-ink hover:text-brass-deep transition-colors border-b border-stone-100 last:border-0"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer contact */}
              <div className="mt-auto px-6 py-8 border-t border-stone-100">
                <p className="text-[11px] uppercase font-medium tracking-[0.18em] text-stone-400 mb-3">
                  Front desk · 24 hours
                </p>
                <a
                  href={SITE.phone.tel}
                  className="block font-display text-[28px] text-brass-deep tabular-nums hover:text-brass transition-colors"
                >
                  {SITE.phone.display}
                </a>
                <a
                  href={SITE.address.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-[13px] text-ink-soft hover:text-ink transition-colors"
                >
                  Get directions <span aria-hidden>↗</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
