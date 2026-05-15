import type { Metadata } from "next";
import Link from "next/link";
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
    name: "Paratha plate — Aloo, Muli, Sattu or Gobi",
    note: "Two parathas with achar and curd. Complimentary with most room rates at breakfast.",
  },
  {
    name: "Paneer butter masala with butter naan",
    note: "The reliable dinner after a long day of meetings. Consistently done well — a kitchen staple.",
  },
  {
    name: "ARK Dal Makhani",
    note: "Our house dal, slow-cooked and rich. Guests returning for a second stay often ask for it by name.",
  },
  {
    name: "Wok Hakka noodles",
    note: "Indo-Chinese done properly. Available veg or mixed — pairs well with Paneer Chilli.",
  },
  {
    name: "Tandoori momo (6 pc)",
    note: "Tandoor-finished dumplings — a lighter alternative to fried momos and a popular pre-dinner snack.",
  },
  {
    name: "ARK Special",
    note: "The chef's signature main course. Ask the kitchen — the exact preparation changes with the season.",
  },
];

export default function DiningPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: `${SITE.url}/` },
    { name: "The Restaurant", url: `${SITE.url}/dining` },
  ]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="container-page pt-10 lg:pt-16 pb-10 lg:pb-14">
        <div className="border-b border-stone-100 pb-8 lg:pb-10 mb-8 lg:mb-10">
          <Eyebrow tone="moss">ARK Hotels · Kokar, Ranchi</Eyebrow>
          <h1 className="mt-5 font-display text-[72px] sm:text-[100px] lg:text-[140px] xl:text-[160px] leading-[0.9] tracking-[-0.03em] text-ink">
            ARK<br />Kitchen
          </h1>
        </div>
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[20px] sm:text-[22px] text-ink-soft font-display italic leading-[1.3] max-w-[36ch]">
              Pure-veg. Rooftop. All day.
            </p>
            <p className="mt-5 text-[16px] text-ink-soft max-w-[56ch] leading-[1.7]">
              Our in-house vegetarian restaurant, served on the rooftop. A
              businessperson eating dinner alone after a long day deserves the
              same care as a table of four on a Sunday afternoon.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Pure Vegetarian", "Rooftop Setting", "Open All Day", "100+ Menu Items"].map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-parchment border border-stone-100 text-[12px] text-ink-soft tracking-wide"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-moss inline-block" />
                  {pill}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden lg:block col-span-3 col-start-10 pb-2 text-right">
            <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">Service</p>
            <p className="mt-2 text-[14px] text-ink-soft leading-relaxed">
              Breakfast, lunch and dinner served daily on the rooftop.
            </p>
            <p className="mt-3 text-[12px] text-stone-500 leading-relaxed">
              Exact timings confirmed at check-in.
            </p>
          </div>
        </div>
      </section>

      {/* ── Hero image ── */}
      <section className="container-page pb-0">
        <PlaceholderImage
          src="/images/DSC01243.webp"
          alt="ARK Kitchen rooftop dining area at ARK Hotels, Kokar Ranchi"
          ratio="21/9"
          priority
          caption="ARK Kitchen — rooftop dining, open all day."
        />
      </section>

      {/* ── Dark brand section — prose, no grid ── */}
      <section className="bg-ink text-paper">
        <div className="container-page py-16 lg:py-24">
          <div className="grid grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="col-span-12 lg:col-span-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-brass font-medium">
                The kitchen
              </p>
              <h2 className="mt-5 font-display text-[48px] sm:text-[60px] lg:text-[72px] leading-[0.92] tracking-[-0.02em] text-paper">
                ARK<br />Kitchen
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:pt-2">
              <p className="text-[17px] lg:text-[19px] text-paper/80 leading-[1.75] max-w-[52ch]">
                A pure-vegetarian kitchen open every day of the week. The menu
                runs across{" "}
                <span className="text-paper font-medium">Breakfast &amp; Combos</span>,{" "}
                <span className="text-paper font-medium">Snacks &amp; Starters</span>,{" "}
                <span className="text-paper font-medium">North Indian Mains</span>,{" "}
                <span className="text-paper font-medium">Indo-Chinese</span>,{" "}
                <span className="text-paper font-medium">Breads, Rice &amp; Soups</span>, and{" "}
                <span className="text-paper font-medium">Beverages &amp; Desserts</span> — over
                100 items in total.
              </p>
              <p className="mt-6 text-[15px] text-paper/50 leading-[1.7] max-w-[48ch]">
                Pick up the printed menu at the restaurant for the full list.
                The dishes below are what guests come back for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Highlights — the one list ── */}
      <section className="bg-parchment border-y border-stone-100">
        <div className="container-page py-20 lg:py-28" id="menu">
          <Reveal>
            <Eyebrow tone="moss">Highlights</Eyebrow>
            <h2 className="mt-4 font-display text-[32px] lg:text-[44px] leading-[1.1] tracking-[-0.015em] text-ink max-w-[24ch]">
              What people actually order.
            </h2>
          </Reveal>

          <ul className="mt-14 lg:mt-18 divide-y divide-stone-200">
            {HIGHLIGHTS.map((h) => (
              <li
                key={h.name}
                className="grid grid-cols-12 gap-4 lg:gap-12 py-7 lg:py-8 items-baseline"
              >
                <span className="col-span-12 lg:col-span-5 font-display text-[22px] lg:text-[26px] text-ink leading-[1.2]">
                  {h.name}
                </span>
                <span className="col-span-12 lg:col-span-7 text-ink-soft text-[15px] leading-[1.65]">
                  {h.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Review + CTA — one combined section ── */}
      <section className="container-page py-16 lg:py-24">
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow>From a recent guest</Eyebrow>
            <blockquote className="mt-6 font-display italic text-[26px] sm:text-[30px] lg:text-[38px] leading-[1.2] tracking-[-0.015em] text-ink max-w-[22ch]">
              &ldquo;Wonderful experience and excellent service. Hygiene and
              cleanliness was really good.&rdquo;
            </blockquote>
            <p className="mt-5 text-[13px] text-stone-500">
              — Verified guest, MakeMyTrip
            </p>
            <p className="mt-3 text-[13px] text-stone-400">
              Rated 4.8 on MakeMyTrip &nbsp;·&nbsp; 8.5 on Booking.com &nbsp;·&nbsp; 4.7 on JustDial
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex flex-col gap-4">
            <Eyebrow tone="moss">Ready to dine?</Eyebrow>
            <p className="mt-1 font-display text-[22px] sm:text-[26px] lg:text-[30px] leading-[1.15] tracking-[-0.01em] text-ink max-w-[22ch]">
              Walk in, or ask the front desk to reserve your table.
            </p>
            <p className="text-[14px] text-ink-soft max-w-[36ch] leading-[1.65]">
              Open to hotel guests and walk-in diners. Call ahead for large
              groups or event bookings.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a
                href={SITE.phone.tel}
                className="inline-flex items-center justify-center px-7 py-3.5 bg-ink text-paper text-[14px] font-medium tracking-wide rounded-sm hover:bg-brass-deep transition-colors shadow-sm"
              >
                Call the restaurant
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-stone-300 text-ink text-[14px] font-medium tracking-wide rounded-sm hover:border-ink transition-colors"
              >
                Send an enquiry
              </Link>
            </div>
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
