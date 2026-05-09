import Link from "next/link";
import Image from "next/image";
import { LinkArrow } from "@/components/ui/Buttons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { RoomsIndexClient } from "@/components/home/RoomsIndex.client";
import { ROOMS, NEARBY } from "@/lib/site";
import { faqJsonLd, jsonLdScript } from "@/lib/jsonld";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <IntroParagraph />
      <RoomsIndexClient rooms={ROOMS} />
      <DiningCallout />
      <BusinessSection />
      <AboutConfession />
      <PlacePlateDiptych />
      <LocationStrip />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd)}
      />
    </>
  );
}

/* ─────────────────────────  Anti-template intro paragraph  ───────────────────────── */
function IntroParagraph() {
  return (
    <section className="bg-parchment border-y border-stone-100">
      <div className="container-narrow py-14 lg:py-24">
        <Reveal>
          <div className="flex flex-col items-center text-center px-4 sm:px-0">
            <Eyebrow tone="moss">Kokar, Ranchi</Eyebrow>
            <span className="brass-rule mt-5 mb-7" />
            <blockquote className="font-display italic text-[22px] sm:text-[28px] lg:text-[34px] leading-[1.3] tracking-[-0.01em] text-ink max-w-[26ch]">
              Honest rooms, reliable service, and a front desk that never sleeps.
            </blockquote>
            <span className="brass-rule mt-7" />
            <p className="mt-5 text-[12px] uppercase tracking-[0.2em] text-stone-500 font-medium">
              15 min from Birsa Munda Airport &nbsp;·&nbsp; Free WiFi &nbsp;·&nbsp; Free parking
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────  Dining callout (asymmetric, parchment band)  ───────────────────────── */
function DiningCallout() {
  return (
    <section className="bg-parchment border-y border-stone-100">
      <div className="container-page py-14 lg:py-28">
        <div className="grid grid-cols-12 gap-8 sm:gap-6 lg:gap-12 items-end pr-4 sm:pr-6 lg:pr-0">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow tone="moss">
              The Restaurant
            </Eyebrow>
            <h2 className="mt-4 font-display text-[28px] sm:text-[32px] lg:text-[44px] leading-[1.1] tracking-[-0.015em] text-ink hover:text-brass transition-colors">
              <Link href="/dining">
                Pure vegetarian, comforting meals,
                <br className="hidden lg:block" /> open all day.
              </Link>
            </h2>
            <p className="mt-5 sm:mt-6 text-[15px] sm:text-[16px] text-ink-soft leading-[1.65] max-w-[44ch]">
              ARK features a dedicated in-house vegetarian restaurant. Enjoy a freshly prepared thali for lunch, regional Jharkhand and North Indian specialties, alongside a thoughtfully curated Indo-Chinese menu. A complimentary breakfast is included with most of our room rates.
            </p>
            <div className="mt-8">
              <Link
                href="/dining"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-ink text-paper text-[14px] font-medium tracking-wide rounded-sm hover:bg-brass-deep transition-colors shadow-sm"
              >
                See the menu
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Link href="/dining" className="block hover:opacity-95 transition-opacity">
              <PlaceholderImage
                src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&q=80"
                alt="North Indian vegetarian thali at ARK Hotels restaurant, Kokar"
                ratio="3/2"
                caption="Today's thali — dal, two seasonal sabzi, rice, four rotis, curd, salad, sweet."
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  For Business Travellers  ───────────────────────── */
function BusinessSection() {
  return (
    <section className="container-page py-14 lg:py-32">
      <div className="grid grid-cols-12 gap-8 sm:gap-6 lg:gap-12 pr-4 sm:pr-6 lg:pr-0">
        <div className="col-span-12 lg:col-span-4">
          <Eyebrow>For business travellers</Eyebrow>
          <h2 className="mt-4 font-display text-[28px] sm:text-[32px] lg:text-[44px] leading-[1.1] tracking-[-0.015em] text-ink hover:text-brass transition-colors">
            <Link href="/business">
              Tailored for the modern professional.
            </Link>
          </h2>
          <p className="mt-5 sm:mt-6 text-[15px] sm:text-[16px] text-ink-soft leading-[1.65] max-w-[42ch]">
            Whether you are visiting Ranchi for a client meeting, a training session, or corporate audits, ARK Hotels is designed to make your work trip as productive and comfortable as possible.
          </p>
          <div className="mt-8">
            <Link
              href="/business"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-ink text-paper text-[14px] font-medium tracking-wide rounded-sm hover:bg-brass-deep transition-colors shadow-sm"
            >
              See the business desk
            </Link>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <ul className="divide-y divide-stone-100 border-y border-stone-100">
            {[
              {
                k: "Early check-in",
                v: "If your room is ready, it's yours. If not, we'll safely store your luggage and notify you as soon as housekeeping clears it.",
              },
              {
                k: "GST invoice on checkout",
                v: "Pre-filled with your company details and GSTIN if provided at booking, ensuring a completely hassle-free checkout.",
              },
              {
                k: "Same-day laundry",
                v: "Professional laundry and dry-cleaning available. Confirm a same-day turnaround with the desk when dropping off your clothes.",
              },
              {
                k: "Free parking",
                v: "Secure on-site parking, easily accommodating both sedans and SUVs, with facilities for drivers.",
              },
              {
                k: "Airport pickup on request",
                v: "Convenient sedan pickups from Birsa Munda Airport can be arranged ahead of time at our front desk.",
              },
            ].map((row) => (
              <li
                key={row.k}
                className="grid grid-cols-12 gap-3 sm:gap-4 py-5 lg:py-6 items-baseline"
              >
                <span className="col-span-12 lg:col-span-4 font-display text-[18px] sm:text-[20px] lg:text-[22px] text-ink">
                  {row.k}
                </span>
                <span className="col-span-12 lg:col-span-8 text-ink-soft text-[14px] sm:text-[15px] leading-[1.6]">
                  {row.v}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  Pattern C — Two-Column Confession (about)  ───────────────────────── */
function AboutConfession() {
  return (
    <section className="bg-parchment border-y border-stone-100">
      <div className="container-page py-14 lg:py-32">
        <div className="grid grid-cols-12 gap-8 sm:gap-6 lg:gap-12 items-start pr-4 sm:pr-6 lg:pr-0">
          {/* Image first on mobile (per design spec) */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:order-2">
            <Link href="/about" className="block hover:opacity-95 transition-opacity">
              <PlaceholderImage
                src="/images/ark_out_image.jpg"
                alt="Lobby corridor at ARK Hotels Ranchi, evening light"
                ratio="3/4"
                caption="Lobby desk, monsoon evening."
              />
            </Link>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-2 lg:order-1">
            <Eyebrow>About ARK</Eyebrow>
            <h2 className="mt-4 font-display text-[28px] sm:text-[32px] lg:text-[44px] leading-[1.12] tracking-[-0.015em] text-ink max-w-[20ch] hover:text-brass transition-colors">
              <Link href="/about">
                A hotel defined by personal attention and genuine hospitality.
              </Link>
            </h2>
            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 text-[15px] sm:text-[16px] text-ink-soft leading-[1.65] max-w-[52ch]">
              <p>
                A familiar landmark in Kokar, ARK Hotels is a 23-room, owner-run property dedicated to providing a seamless stay. With three well-appointed floors, elevator access, and a dedicated restaurant, we focus entirely on essential comforts.
              </p>
              <p>
                Our philosophy is simple: we believe that a business traveler in Ranchi values a spotless room, reliable service, and a front desk that is always ready to assist at any hour. This commitment to genuine, practical hospitality is why our regulars choose to stay with us time and again.
              </p>
            </div>
            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-ink text-paper text-[14px] font-medium tracking-wide rounded-sm hover:bg-brass-deep transition-colors shadow-sm"
              >
                Read the full story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  Pattern D — Place + Plate Diptych (5/7 asymmetric)  ───────────────────────── */
function PlacePlateDiptych() {
  return (
    <section className="container-page py-14 lg:py-32">
      <div className="grid grid-cols-12 gap-8 sm:gap-6 lg:gap-12 items-center pr-4 sm:pr-6 lg:pr-0">
        <div className="col-span-12 lg:col-span-5 flex flex-col">
          <Eyebrow tone="moss">From a recent guest</Eyebrow>
          <blockquote className="mt-4 sm:mt-6 font-display italic text-[24px] sm:text-[28px] lg:text-[40px] leading-[1.2] tracking-[-0.015em] text-ink max-w-[20ch]">
            &ldquo;Hygiene and cleanliness was really good.&rdquo;
          </blockquote>
          <p className="mt-5 sm:mt-6 text-[13px] text-stone-500">
            — Verified guest, MakeMyTrip
          </p>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <PlaceholderImage
            src="https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=1400&q=80"
            alt="Breakfast service at ARK Hotels Kokar"
            ratio="3/2"
            caption="Breakfast service, 7:30 AM."
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  Location strip (factual line)  ───────────────────────── */
function LocationStrip() {
  return (
    <section className="bg-ink text-paper">
      <div className="container-page py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8">
          <div>
            <Eyebrow tone="brass">Find us</Eyebrow>
            <p className="mt-3 font-display text-[22px] sm:text-2xl lg:text-3xl leading-[1.2] max-w-[24ch]">
              Kokar, north Ranchi. A short drive from the airport, the
              station, and most meeting blocks.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-[14px] text-paper/80">
            {NEARBY.slice(0, 4).map((n, i) => (
              <span key={n.place} className="inline-flex items-center gap-3">
                <span className="text-paper">{n.place}</span>
                <span className="text-paper/60 tabular-nums">{n.distance}</span>
                {i < 3 && <span className="text-paper/30 hidden md:inline">·</span>}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <Link
            href="/location"
            className="inline-flex items-baseline gap-1 text-paper underline decoration-brass decoration-1 underline-offset-[6px] hover:decoration-2 hover:text-brass transition-all duration-[180ms]"
          >
            Open the location page
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

