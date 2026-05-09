import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { LinkArrow } from "@/components/ui/Buttons";
import { SITE } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Vegetarian Restaurant in Kokar, Ranchi",
  description:
    "Pure-vegetarian restaurant at ARK Hotels Ranchi. Home-style North Indian, in-room dining, vegetarian breakfast. Open daily 7 AM – 10:30 PM.",
  alternates: { canonical: "/dining" },
};

// Dish list reflects a typical North-Indian veg hotel restaurant in Jharkhand.
// The full menu is on the printed in-room card and at the restaurant counter.
const HIGHLIGHTS = [
  {
    name: "Today's thali",
    note: "Dal, two seasonal sabzi, rice, rotis, curd, salad and a sweet.",
  },
  {
    name: "Ghar ka khichdi",
    note: 'Moong dal khichdi with ghee, papad and pickle. The "I just want something easy" order.',
  },
  {
    name: "Aloo paratha breakfast plate",
    note: "Parathas with white butter, curd and pickle.",
  },
  {
    name: "Litti chokha",
    note: "The Jharkhand classic, when the kitchen has it on.",
  },
  {
    name: "Paneer butter masala with butter naan",
    note: "A consistent dinner pick.",
  },
  {
    name: "Veg Hakka noodles · Veg Manchurian",
    note: "For the guest who's been eating dal-roti all week.",
  },
];

export default function DiningPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: `${SITE.url}/` },
    { name: "The Restaurant", url: `${SITE.url}/dining` },
  ]);

  return (
    <>
      <section className="container-page pt-12 lg:pt-20 pb-12 lg:pb-16">
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow tone="moss">
              The Restaurant
            </Eyebrow>
            <h1 className="mt-4 font-display text-[34px] sm:text-[52px] lg:text-[64px] leading-[1.06] tracking-[-0.02em] text-ink max-w-[16ch]">
              Pure-veg, home-style, all day.
            </h1>
            <p className="mt-6 text-[18px] text-ink-soft max-w-[58ch]">
              ARK has one in-house restaurant. The kitchen runs on the
              principle that a businessperson eating dinner alone after a long
              day deserves the same care as a table of four on a Sunday
              afternoon.
            </p>
          </div>
          <div className="hidden lg:block col-span-3 col-start-10 pb-2 text-right">
            <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
              Service
            </p>
            <p className="mt-2 text-[14px] text-ink-soft leading-relaxed">
              Breakfast, lunch and dinner served daily. In-room dining
              available through the day.
            </p>
            <p className="mt-3 text-[12px] text-stone-500 leading-relaxed">
              Exact timings confirmed at check-in.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page pb-20 lg:pb-28">
        <PlaceholderImage
          src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=2400&q=80"
          alt="North Indian vegetarian thali at ARK Hotels restaurant, Kokar"
          ratio="21/9"
          priority
          caption="The thali at lunch — different sabzi every day."
        />
      </section>

      <section className="bg-parchment border-y border-stone-100">
        <div className="container-page py-20 lg:py-28" id="menu">
          <Reveal>
            <Eyebrow tone="moss">
              Highlights
            </Eyebrow>
            <h2 className="mt-4 font-display text-[32px] lg:text-[44px] leading-[1.1] tracking-[-0.015em] text-ink max-w-[24ch]">
              What people actually order.
            </h2>
            <p className="mt-6 text-ink-soft leading-[1.65] max-w-[56ch]">
              The kitchen runs a short, honest menu rather than a long
              forgettable one. Most days you&apos;ll find the staples below.
              Full menu printed in the room and at the restaurant counter.
            </p>
          </Reveal>

          <ul className="mt-16 lg:mt-20 divide-y divide-stone-100 border-y border-stone-100">
            {HIGHLIGHTS.map((h, i) => (
              <li
                key={h.name}
                className="grid grid-cols-12 gap-4 py-6 lg:py-7 items-baseline"
              >
                <span className="col-span-12 lg:col-span-5 font-display text-[20px] lg:text-[24px] text-ink leading-[1.2]">
                  {h.name}
                </span>
                <span className="col-span-12 lg:col-span-7 text-ink-soft text-[15px] leading-[1.6]">
                  {h.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-20 lg:py-28">
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-start">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow tone="moss">
              In-room dining
            </Eyebrow>
            <h2 className="mt-4 font-display text-[28px] lg:text-[36px] leading-[1.15] text-ink max-w-[22ch]">
              Eat at your desk. We&apos;ll bring it up.
            </h2>
            <p className="mt-6 text-ink-soft leading-[1.65] max-w-[44ch]">
              In-room dining runs through the day. Breakfast is included on
              most rates and can be sent to the room or eaten downstairs.
              For Jain or other dietary preparations, give the kitchen
              advance notice at the desk.
            </p>
            <div className="mt-8">
              <LinkArrow href="/contact">Ask about a special prep</LinkArrow>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <PlaceholderImage
              src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=1400&q=80"
              alt="Aloo paratha breakfast plate at ARK Hotels"
              ratio="3/4"
              caption="Aloo paratha plate — two, with white butter and curd."
            />
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

