"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll without jumping to top (overflow:hidden resets scrollY on iOS)
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    closeRef.current?.focus();
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Close on Escape key and return focus to trigger
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

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-[background-color,box-shadow,backdrop-filter] duration-[280ms] ease-[var(--ease-in-out-soft)]",
        scrolled
          ? "bg-paper/95 backdrop-blur-[8px] border-b border-stone-200/50 shadow-sm"
          : "bg-parchment/80 lg:bg-transparent"
      )}
    >
      {/* Utility Bar (Phone & Directions) */}
      <div
        className={cn(
          "w-full border-b transition-colors duration-[280ms]",
          scrolled ? "border-stone-200/50" : "border-stone-200/30 lg:border-stone-300/40 lg:bg-parchment"
        )}
      >
        <div className="container-page flex h-9 items-center justify-between text-[13px]">
          <a
            href={SITE.phone.tel}
            className="inline-flex items-center gap-2 hover:text-ink transition-colors text-ink-soft hover:text-brass-deep"
          >
            <span className="hidden sm:inline uppercase tracking-[0.18em] text-[11px] font-medium">
              Front desk, 24 hours
            </span>
            <span className="font-medium tabular-nums">{SITE.phone.display}</span>
          </a>

          <span className="hidden md:block text-stone-500/80">{SITE.address.short}</span>

          <a
            href={SITE.address.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 hover:text-ink transition-colors text-ink-soft hover:text-brass-deep"
          >
            <span>Get directions</span>
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container-page flex h-15 items-center justify-between">
        <Link
          href="/"
          aria-label="ARK Hotels — home"
          className="flex items-center"
        >
          <Image
            src="/images/logo/LOGO_header.webp"
            alt="ARK Hotels"
            width={180}
            height={60}
            className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
            style={{ width: "auto" }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-[15px] whitespace-nowrap font-medium text-ink hover:text-brass-deep transition-colors after:absolute after:left-0 after:bottom-[-6px] after:h-[2px] after:w-0 after:bg-brass hover:after:w-full after:transition-all after:duration-[220ms]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu trigger */}
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden -mr-3 px-3 py-3 text-[13px] font-medium uppercase tracking-[0.18em] text-ink hover:text-brass-deep transition-colors"
        >
          Menu
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!open}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        inert={!open ? true : undefined}
        className={cn(
          "fixed inset-0 z-[60] lg:hidden bg-paper overflow-y-auto transition-transform duration-[280ms] ease-[var(--ease-out-soft)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-20 items-center justify-between container-page border-b border-stone-100">
          <Link
            href="/"
            onClick={close}
            className="flex items-center"
          >
            <Image
              src="/images/logo/LOGO_header.webp"
              alt="ARK Hotels"
              width={180}
              height={60}
              className="h-12 sm:h-14 w-auto object-contain"
              style={{ width: "auto" }}
            />
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="-mr-3 px-3 py-3 text-[13px] font-medium uppercase tracking-[0.18em] text-ink hover:text-brass-deep transition-colors"
          >
            Close
          </button>
        </div>

        <nav className="container-page py-10 flex flex-col gap-6">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="font-display text-3xl text-ink hover:text-brass-deep transition-colors"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(8px)",
                transition: `opacity 280ms ease, transform 280ms ease`,
                transitionDelay: open ? `${i * 40}ms` : "0ms",
              }}
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-10 border-t border-stone-100">
            <p className="text-[11px] uppercase font-medium tracking-[0.18em] text-stone-500 mb-2">
              Front desk, 24 hours
            </p>
            <a
              href={SITE.phone.tel}
              className="font-display text-3xl text-brass-deep tabular-nums"
            >
              {SITE.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
