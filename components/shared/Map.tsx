"use client";

import { motion, useReducedMotion } from "motion/react";
import { SITE } from "@/lib/site";

const QUERY = encodeURIComponent("ARK Hotels Don Bosco School Lane Kokar Ranchi");

const EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.477447443871!2d85.35187467472818!3d23.370938978931125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1001d7f224b%3A0x347c7991c5d10f31!2sARK%20Hotels!5e0!3m2!1sen!2sin!4v1778268930855!5m2!1sen!2sin";
const DIRECT = `https://www.google.com/maps/dir/?api=1&destination=${QUERY}`;

type Props = {
  ratio?: "16/9" | "21/9" | "5/4" | "1/1";
  showCaption?: boolean;
  className?: string;
};

// On mobile, very wide ratios (21/9) crush the iframe to a sliver. Use a
// taller ratio under sm: and let it widen on large screens where it has room.
const RATIO: Record<NonNullable<Props["ratio"]>, string> = {
  "16/9": "aspect-[5/4] sm:aspect-[16/9]",
  "21/9": "aspect-[4/3] sm:aspect-[21/9]",
  "5/4": "aspect-[5/4]",
  "1/1": "aspect-square",
};

export function Map({ ratio = "21/9", showCaption = true, className }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      className={className}
    >
      <div
        className={`relative w-full ${RATIO[ratio]} overflow-hidden border border-stone-100 bg-parchment`}
      >
        <iframe
          title="ARK Hotels — Kokar, Ranchi"
          src={EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
        />
      </div>

      {showCaption ? (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
              The address
            </p>
            <p className="mt-3 font-display text-[20px] lg:text-[24px] leading-[1.3] text-ink max-w-[40ch]">
              {SITE.address.street}, {SITE.address.locality},{" "}
              {SITE.address.city} {SITE.address.postalCode}
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-wrap gap-4 lg:justify-end">
            <a
              href={SITE.address.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 border border-ink text-ink text-[14px] font-medium rounded-[2px] hover:bg-ink hover:text-paper transition-colors"
            >
              Open in Google Maps
              <span aria-hidden>↗</span>
            </a>
            <a
              href={DIRECT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-brass text-paper text-[14px] font-medium rounded-[2px] hover:bg-brass-deep transition-colors"
            >
              Get directions
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}
