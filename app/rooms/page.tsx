import type { Metadata } from "next";
import { LinkArrow } from "@/components/ui/Buttons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ROOMS, SITE } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";
import { RoomShowcase } from "@/components/rooms/RoomShowcase";

export const metadata: Metadata = {
  title: "Rooms & Tariff",
  description:
    "Three room types at ARK Hotels Ranchi — Deluxe Single, Deluxe Double, and Super Double. AC, WiFi, work desk, vegetarian breakfast. Budget-friendly rates, book direct.",
  alternates: { canonical: "/rooms" },
};

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
              Best rate is direct. Call the front desk on{" "}
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

      <RoomShowcase rooms={ROOMS} isRoomsPage={true} />

      <section className="container-page pb-24 lg:pb-32 mt-12 lg:mt-24">
        <div className="border-t border-stone-100 pt-10 lg:pt-12">
          <Eyebrow>Booking direct</Eyebrow>
          <p className="mt-3 font-display text-[24px] lg:text-[32px] leading-[1.2] tracking-[-0.01em] text-ink max-w-[34ch]">
            Lowest rate is at the front desk. No service fees.
          </p>
          <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <a
              href={SITE.phone.tel}
              className="font-display text-[24px] lg:text-[28px] text-brass-deep hover:text-ink transition-colors tabular-nums"
            >
              {SITE.phone.display}
            </a>
            <span className="text-stone-300">·</span>
            <LinkArrow href="/contact">Or write to us</LinkArrow>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)}
      />
    </>
  );
}

