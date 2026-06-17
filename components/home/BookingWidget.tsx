"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { trackEvent, GA_EVENTS } from "@/lib/analytics";

function fmt(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function isoDateOffset(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

export function BookingWidget() {
  const [today] = useState(() => isoDateOffset(0));
  const [tomorrow] = useState(() => isoDateOffset(1));

  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("1");

  const handleCheck = () => {
    const parts: string[] = [];
    if (checkin) parts.push(`Check-in: ${fmt(checkin)}`);
    if (checkout) parts.push(`Check-out: ${fmt(checkout)}`);
    if (guests) parts.push(`Guests: ${guests}`);
    const msg = [
      "Hi, I'd like to check room availability and rates.",
      ...parts,
      "Please share what's available. Thanks.",
    ].join(" ");
    const url = `https://wa.me/${SITE.whatsapp.e164.replace("+", "")}?text=${encodeURIComponent(msg)}`;
    trackEvent(GA_EVENTS.BOOKING_ENQUIRY, {
      has_checkin: checkin ? "yes" : "no",
      has_checkout: checkout ? "yes" : "no",
      guests,
    });
    trackEvent(GA_EVENTS.WHATSAPP_CLICK, { page: "booking_widget" });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full bg-paper border-y border-stone-200 shadow-sm">
      <div className="container-page py-4">
        {/*
         * Row layout only at md: (768px+). Below that, fields stack vertically.
         * At 640–767px the row would be too tight for the button text — keep stacked.
         */}
        <div className="flex flex-col md:flex-row md:items-end gap-3">

          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <label htmlFor="bw-checkin" className="text-[10px] uppercase tracking-[0.18em] font-medium text-stone-400">
              Check-in
            </label>
            <input
              id="bw-checkin"
              type="date"
              min={today}
              value={checkin}
              onChange={(e) => {
                setCheckin(e.target.value);
                if (checkout && e.target.value >= checkout) setCheckout("");
              }}
              className="w-full h-11 px-3 border border-stone-200 rounded-sm text-[14px] text-ink bg-paper focus:outline-none focus:border-brass transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <label htmlFor="bw-checkout" className="text-[10px] uppercase tracking-[0.18em] font-medium text-stone-400">
              Check-out
            </label>
            <input
              id="bw-checkout"
              type="date"
              min={checkin || tomorrow}
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
              className="w-full h-11 px-3 border border-stone-200 rounded-sm text-[14px] text-ink bg-paper focus:outline-none focus:border-brass transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1 w-full md:w-28 shrink-0">
            <label htmlFor="bw-guests" className="text-[10px] uppercase tracking-[0.18em] font-medium text-stone-400">
              Guests
            </label>
            <select
              id="bw-guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full h-11 px-3 border border-stone-200 rounded-sm text-[14px] text-ink bg-paper focus:outline-none focus:border-brass transition-colors"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>{n} guest{n > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCheck}
            className="h-11 px-5 bg-brass text-paper text-[13px] font-medium uppercase tracking-[0.1em] rounded-sm hover:bg-brass-deep transition-colors shrink-0 whitespace-nowrap"
          >
            Ask Availability on WhatsApp
          </button>

        </div>
        <p className="mt-2 text-[11px] text-stone-400">
          Front desk confirms room availability and rates on WhatsApp.
        </p>
      </div>
    </div>
  );
}
