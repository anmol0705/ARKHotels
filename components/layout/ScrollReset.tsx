"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/*
 * Two problems solved here:
 *
 * 1. iOS Safari scroll restoration — Safari remembers the scroll position from
 *    a previous visit and jumps there on reload.  Setting scrollRestoration to
 *    "manual" hands control to us instead of the browser.
 *
 * 2. CSS scroll-behavior: smooth — globals.css sets `scroll-behavior: smooth`
 *    on <html> so anchor links animate nicely.  But this also affects any
 *    programmatic scroll (including Next.js's own scroll-to-top on navigation),
 *    causing the page to visibly "fly up" from wherever it was.  We override
 *    this for the instant reset by writing scrollTop directly (assignment
 *    bypasses the CSS property) then restoring it via requestAnimationFrame
 *    so user-initiated anchor scrolls remain smooth.
 */
export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prevent browser from restoring a non-zero scroll position on reload.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Direct assignment bypasses scroll-behavior: smooth entirely.
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // Safari fallback
  }, [pathname]);

  return null;
}
