import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ROOMS, SITE, whatsappHref } from "@/lib/site";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { createPageMetadata } from "@/lib/seo";
import { RoomShowcase } from "@/components/rooms/RoomShowcase";
import { TrustStrip } from "@/components/shared/TrustStrip";

export const metadata: Metadata = createPageMetadata({
  title: "Rooms in Kokar, Ranchi | Deluxe Single, Double & Super Double",
  description:
    "Three AC room types at ARK Hotels, Kokar — Deluxe Single, Deluxe Double, and Super Double. Free WiFi, work desk, hot water, vegetarian breakfast. Call or WhatsApp to book.",
  path: "/rooms",
  image: "/images/rooms/delux_double_room/delux_double_room.webp",
  imageAlt: "Deluxe Double room at ARK Hotels Ranchi",
});

export default function RoomsPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: `${SITE.url}/` },
    { name: "Rooms", url: `${SITE.url}/rooms` },
  ]);

  return (
    <>
      <section className="container-page pt-12 lg:pt-20 pb-20 lg:pb-28">
        <div className="grid grid-cols-12 gap-6 lg:gap-12">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow>Rooms & tariff</Eyebrow>
            <h1 className="mt-4 font-display text-[34px] sm:text-[52px] lg:text-[64px] leading-[1.06] tracking-[-0.02em] text-ink max-w-[16ch]">
              Three room types. All air-conditioned, all quiet.
            </h1>
            <p className="mt-6 text-[18px] text-ink-soft max-w-[56ch]">
              All rooms are AC, with work desk, free WiFi, hot water, LCD TV,
              tea and coffee tray, and daily housekeeping. The differences
              between categories are size, bedding, and how quiet a floor
              you&apos;re on.
            </p>
          </div>
          <div className="hidden lg:flex col-span-3 col-start-10 flex-col justify-end pb-2">
            <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
              Tariff valid through 2026
            </p>
            <p className="mt-2 text-[13px] text-stone-500 leading-relaxed max-w-[24ch]">
              To check room availability, call the front desk on{" "}
              <a
                href={SITE.phone.tel}
                className="text-ink-soft underline decoration-brass decoration-1 underline-offset-4 hover:decoration-2"
              >
                {SITE.phone.display}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <div className="container-page pb-4">
        <TrustStrip />
      </div>

      {/* Mobile-only direct CTA — visible before the user starts scrolling the showcase */}
      <div className="md:hidden container-page pb-8">
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full py-4 bg-[#25D366] text-white text-[14px] font-medium rounded-[2px] hover:bg-[#1ebe5d] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-4 w-4 fill-white shrink-0" aria-hidden>
            <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 01-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 01-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.795 1.23 1.82 2.508 3.41 4.5 4.402.616.287 2.137.844 2.81.844.36 0 .547-.057.806-.188.616-.31.997-.687 1.082-1.318a.7.7 0 00.07-.357c0-.286-2.094-1.218-2.434-1.218zm-2.97-15.205C9.42 2 4 7.42 4 14.14c0 2.286.626 4.5 1.808 6.43L4 28l7.59-1.99c1.852.98 3.93 1.51 6.04 1.51 6.72 0 12.14-5.42 12.14-12.14C29.77 8.66 24.35 3.24 17.63 3.24z" />
          </svg>
          Ask direct rate on WhatsApp
        </a>
        <p className="mt-2 text-[11px] text-stone-400 text-center">
          Direct rate · no booking fees · GST invoice on checkout
        </p>
      </div>

      <RoomShowcase rooms={ROOMS} isRoomsPage={true} />

      <section className="container-page pb-24 lg:pb-32 mt-12 lg:mt-24">
        <div className="border-t border-stone-100 pt-10 lg:pt-12">
          <Eyebrow>Ask availability</Eyebrow>
          <p className="mt-3 font-display text-[24px] lg:text-[32px] leading-[1.2] tracking-[-0.01em] text-ink max-w-[34ch]">
            Call or WhatsApp the front desk to confirm room availability and rates.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-[#25D366] text-white text-[14px] font-medium rounded-[2px] hover:bg-[#1ebe5d] transition-colors"
            >
              Ask Room Availability on WhatsApp
            </a>
            <a
              href={SITE.phone.tel}
              className="inline-flex items-center justify-center px-6 py-3.5 border border-stone-200 bg-paper text-ink text-[14px] font-medium rounded-[2px] hover:border-ink hover:bg-stone-50 transition-colors"
            >
              Call Front Desk
            </a>
          </div>
        </div>
      </section>

      <JsonLd id="rooms-breadcrumb-jsonld" data={breadcrumbs} />
    </>
  );
}
