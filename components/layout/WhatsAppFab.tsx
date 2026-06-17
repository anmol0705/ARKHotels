"use client";

import { whatsappHref } from "@/lib/site";
import { trackEvent, GA_EVENTS } from "@/lib/analytics";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message ARK Hotels on WhatsApp"
      className="fixed z-40 bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 group"
      onClick={() => trackEvent(GA_EVENTS.WHATSAPP_CLICK, { page: "fab" })}
    >
      {/*
       * Mobile: 56×56 icon-only circle — small footprint, doesn't cover CTAs.
       * sm and up: full pill with label — more surface area on larger screens.
       */}
      <div className="
        flex items-center justify-center gap-3
        bg-[#25D366] hover:bg-[#1ebe5d]
        shadow-[0_8px_24px_-8px_rgba(37,211,102,0.6)]
        transition-colors rounded-[2px]

        w-14 h-14
        sm:w-auto sm:h-auto sm:px-5 sm:py-3.5
      ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-6 w-6 sm:h-5 sm:w-5 fill-white shrink-0"
          aria-hidden
        >
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 01-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 01-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.795 1.23 1.82 2.508 3.41 4.5 4.402.616.287 2.137.844 2.81.844.36 0 .547-.057.806-.188.616-.31.997-.687 1.082-1.318a.7.7 0 00.07-.357c0-.286-2.094-1.218-2.434-1.218zm-2.97-15.205C9.42 2 4 7.42 4 14.14c0 2.286.626 4.5 1.808 6.43L4 28l7.59-1.99c1.852.98 3.93 1.51 6.04 1.51 6.72 0 12.14-5.42 12.14-12.14C29.77 8.66 24.35 3.24 17.63 3.24z" />
        </svg>
        <span className="hidden sm:inline text-[14px] font-medium text-white tracking-tight">
          WhatsApp the front desk
        </span>
      </div>
    </a>
  );
}
