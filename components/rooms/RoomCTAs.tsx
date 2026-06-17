"use client";

import { SITE } from "@/lib/site";
import { trackEvent, GA_EVENTS } from "@/lib/analytics";

type Props = { roomName: string };

export function RoomCTAs({ roomName }: Props) {
  const msg = encodeURIComponent(
    `Hi, I'm looking at the ${roomName}. Please share today's direct rate and availability.`
  );
  const waHref = `https://wa.me/${SITE.whatsapp.e164.replace("+", "")}?text=${msg}`;

  return (
    <div className="mt-10 space-y-3">
      <a
        href={SITE.phone.tel}
        className="block w-full text-center px-6 py-4 bg-brass text-paper text-[15px] font-medium rounded-[2px] hover:bg-brass-deep transition-colors"
        onClick={() => trackEvent(GA_EVENTS.PHONE_CLICK, { page: "room_detail", room: roomName })}
      >
        Call front desk · {SITE.phone.display}
      </a>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center px-6 py-4 bg-[#25D366] text-white text-[15px] font-medium rounded-[2px] hover:bg-[#1ebe5d] transition-colors"
        onClick={() => trackEvent(GA_EVENTS.WHATSAPP_CLICK, { page: "room_detail", room: roomName })}
      >
        Ask rate on WhatsApp
      </a>
      <p className="pt-3 text-[12px] text-stone-500 leading-[1.6]">
        Replies usually under 10 minutes during the day. Direct
        bookings get the best available rate; no service fees.
      </p>
    </div>
  );
}
