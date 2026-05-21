import Link from "next/link";
import fs from "fs";
import path from "path";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { RoomsIndexClient } from "@/components/home/RoomsIndex.client";
import { BookingWidget } from "@/components/home/BookingWidget";
import { ImageMarquee } from "@/components/shared/ImageMarquee";
import { ROOMS, NEARBY_BUSINESS, NEARBY_LEISURE } from "@/lib/site";
import { faqJsonLd, jsonLdScript } from "@/lib/jsonld";

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">ARK Hotels Ranchi — Hotel in Kokar, 9 km from Birsa Munda Airport</h1>
      <HeroCarousel />
      <BookingWidget />
      <IntroParagraph />
      <RoomsIndexClient rooms={ROOMS} />
      <DiningCallout />
      <BusinessSection />
      <AboutConfession />
      <GalleryTeaser />
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
              100% Pure Veg &nbsp;·&nbsp; 15 min from Airport &nbsp;·&nbsp; Free WiFi &nbsp;·&nbsp; Free Parking
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
              ARK Kitchen
            </Eyebrow>
            <h2 className="mt-4 font-display text-[28px] sm:text-[32px] lg:text-[44px] leading-[1.1] tracking-[-0.015em] text-ink hover:text-brass transition-colors">
              <Link href="/dining">
                Pure vegetarian, rooftop dining,
                <br className="hidden lg:block" /> open all day.
              </Link>
            </h2>
            <p className="mt-5 sm:mt-6 text-[15px] sm:text-[16px] text-ink-soft leading-[1.65] max-w-[44ch]">
              ARK Kitchen is our in-house vegetarian restaurant, served on the rooftop. North Indian classics, Indo-Chinese favourites, and a complimentary breakfast included with most room rates.
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
              // caption="Today's thali — dal, two seasonal sabzi, rice, four rotis, curd, salad, sweet."
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
            <Link href="/gallery" className="block hover:opacity-95 transition-opacity">
              <PlaceholderImage
                src="/images/ark_out_image.webp"
                alt="Lobby corridor at ARK Hotels Ranchi, evening light"
                ratio="3/4"
              // caption="Lobby desk, monsoon evening."
              />
            </Link>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-2 lg:order-1">
            <Eyebrow>ARK Hotels, Ranchi</Eyebrow>
            <h2 className="mt-4 font-display text-[28px] sm:text-[32px] lg:text-[44px] leading-[1.12] tracking-[-0.015em] text-ink max-w-[20ch]">
              A hotel defined by personal attention and genuine hospitality.
            </h2>
            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 text-[15px] sm:text-[16px] text-ink-soft leading-[1.65] max-w-[52ch]">
              <p>
                A familiar landmark in Kokar, ARK Hotels is an owner-run property dedicated to a disciplined, professional stay. With rooftop vegetarian dining at ARK Kitchen and free parking, we focus entirely on what business travellers and families actually need.
              </p>
              <p>
                We believe that a business traveler in Ranchi values a spotless room, reliable service, and a front desk that is always ready to assist at any hour — day or night.
              </p>
            </div>
            <div className="mt-10">
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-ink text-paper text-[14px] font-medium tracking-wide rounded-sm hover:bg-brass-deep transition-colors shadow-sm"
              >
                See the photos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  Gallery teaser  ───────────────────────── */
function GalleryTeaser() {
  const galleryRoot = path.join(process.cwd(), "public", "images", "gallery");
  const IMAGE_EXT = /\.(jpg|jpeg|png|webp|avif)$/i;
  const images: string[] = [];

  try {
    const entries = fs.readdirSync(galleryRoot, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const sub = path.join(galleryRoot, entry.name);
        try {
          fs.readdirSync(sub)
            .filter((f) => IMAGE_EXT.test(f))
            .forEach((f) => images.push(`/images/gallery/${entry.name}/${f}`));
        } catch { /* skip */ }
      } else if (IMAGE_EXT.test(entry.name)) {
        images.push(`/images/gallery/${entry.name}`);
      }
    }
  } catch { /* folder not ready yet */ }

  if (images.length === 0) return null;

  return (
    <section className="py-2 lg:py-4">
      <div className="container-page mb-8 flex items-end justify-between gap-4 pr-4 sm:pr-6 lg:pr-0">
        <div>
          <Eyebrow>Gallery</Eyebrow>
          <h2 className="mt-3 font-display text-[24px] sm:text-[28px] lg:text-[36px] leading-[1.15] text-ink">
            A look around the hotel.
          </h2>
        </div>
        <Link
          href="/gallery"
          className="shrink-0 text-[14px] font-medium text-ink-soft underline decoration-brass decoration-1 underline-offset-[6px] hover:text-ink hover:decoration-2 transition-all"
        >
          See all photos →
        </Link>
      </div>
      <ImageMarquee images={images} />
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
            &ldquo;Wonderful experience and excellent service. Hygiene and cleanliness was really good.&rdquo;
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
            // caption="Breakfast service, 7:30 AM."
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  Location strip  ───────────────────────── */
function LocationStrip() {
  return (
    <section className="bg-ink text-paper">
      <div className="container-page py-14 lg:py-24">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 pb-10 lg:pb-14 border-b border-paper/10">
          <div>
            <Eyebrow tone="brass">Find us</Eyebrow>
            <h2 className="mt-3 font-display text-[26px] sm:text-[32px] lg:text-[40px] leading-[1.1] tracking-[-0.015em] max-w-[28ch]">
              Kokar, north Ranchi. Close to where business gets done — and a short drive from Jharkhand&apos;s best day trips.
            </h2>
          </div>
          <Link
            href="/explore"
            className="shrink-0 inline-flex items-baseline gap-1 text-paper underline decoration-brass decoration-1 underline-offset-[6px] hover:decoration-2 hover:text-brass transition-all duration-[180ms] text-[15px]"
          >
            Full distances &amp; map
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 mt-10 lg:mt-12">

          {/* Business */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-brass font-medium mb-6">
              For meetings &amp; work
            </p>
            <ul className="divide-y divide-paper/10">
              {NEARBY_BUSINESS.filter(n => [
                "Birsa Munda Airport",
                "Ranchi Junction",
                "Khadgarha Bus Stand",
                "PSU Belt — HEC & MECON, Dhurwa",
                "Dipatoli",
                "BIT Mesra",
              ].includes(n.place)).map((n) => (
                <li key={n.place} className="flex items-center justify-between gap-4 py-3.5">
                  <span className="text-[15px] text-paper leading-[1.4]">{n.place}</span>
                  <span className="text-[13px] text-paper/50 tabular-nums shrink-0">{n.distance} · {n.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider on mobile */}
          <div className="border-t border-paper/10 mt-10 pt-10 lg:border-t-0 lg:mt-0 lg:pt-0">
            <p className="text-[11px] uppercase tracking-[0.2em] text-paper/60 font-medium mb-6">
              For weekends &amp; day trips
            </p>
            <ul className="divide-y divide-paper/10">
              {NEARBY_LEISURE.filter(n => [
                "Pahari Mandir",
                "Ranchi Lake",
                "Hundru Falls",
                "Dassam Falls",
                "Netarhat",
              ].includes(n.place)).map((n) => (
                <li key={n.place} className="flex items-center justify-between gap-4 py-3.5">
                  <span className="text-[15px] text-paper leading-[1.4]">{n.place}</span>
                  <span className="text-[13px] text-paper/50 tabular-nums shrink-0">{n.distance} · {n.time}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

