import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SITE } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "ARK Kitchen — Vegetarian Restaurant in Kokar, Ranchi",
  description:
    "ARK Kitchen at ARK Hotels Ranchi. Pure-vegetarian rooftop dining — North Indian, Indo-Chinese, and vegetarian breakfast. Open daily for business travellers.",
  alternates: { canonical: "/dining" },
};

const HIGHLIGHTS = [
  {
    name: "Aloo paratha breakfast plate",
    note: "Parathas with white butter, curd and pickle. Included with most room rates.",
  },
  {
    name: "Paneer butter masala with butter naan",
    note: "A reliable dinner after a long day of meetings.",
  },
  {
    name: "Ghar ka khichdi",
    note: 'Moong dal khichdi with ghee, papad and pickle. The "I just want something easy" order.',
  },
  {
    name: "Veg Hakka noodles",
    note: "Indo-Chinese done right — a favourite with guests who want something lighter.",
  },
  {
    name: "Veg Manchurian",
    note: "Crispy vegetable dumplings in a tangy sauce. Goes well with fried rice.",
  },
  {
    name: "Litti chokha",
    note: "The Jharkhand classic, when the kitchen has it on.",
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
              ARK Kitchen
            </Eyebrow>
            <h1 className="mt-4 font-display text-[34px] sm:text-[52px] lg:text-[64px] leading-[1.06] tracking-[-0.02em] text-ink max-w-[16ch]">
              Pure-veg. Rooftop. All day.
            </h1>
            <p className="mt-6 text-[18px] text-ink-soft max-w-[58ch]">
              ARK Kitchen is our in-house vegetarian restaurant, served on
              the rooftop. The kitchen runs on the principle that a
              businessperson eating dinner alone after a long day deserves
              the same care as a table of four on a Sunday afternoon.
            </p>
          </div>
          <div className="hidden lg:block col-span-3 col-start-10 pb-2 text-right">
            <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
              Service
            </p>
            <p className="mt-2 text-[14px] text-ink-soft leading-relaxed">
              Breakfast, lunch and dinner served daily on the rooftop.
            </p>
            <p className="mt-3 text-[12px] text-stone-500 leading-relaxed">
              Exact timings confirmed at check-in.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page pb-20 lg:pb-28">
        <PlaceholderImage
          src="/images/dining_area.jpeg"
          alt="ARK Kitchen rooftop dining area at ARK Hotels, Kokar Ranchi"
          ratio="21/9"
          priority
          caption="ARK Kitchen — rooftop dining, open all day."
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
              A short, honest menu rather than a long forgettable one. North
              Indian classics and Indo-Chinese favourites — most days
              you&apos;ll find the staples below. Full menu at the restaurant.
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

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)}
      />
    </>
  );
}

