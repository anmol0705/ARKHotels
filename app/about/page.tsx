import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ImageCarousel } from "@/components/shared/ImageCarousel";
import { ImageMarquee } from "@/components/shared/ImageMarquee";
import { LinkArrow } from "@/components/ui/Buttons";
import { SITE } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About ARK Hotels Ranchi",
  description:
    "A family-run 23-room business hotel in Kokar, Ranchi, opened to give visiting professionals a clean, quiet base near the airport.",
  alternates: { canonical: "/about" },
};

const ABOUT_IMAGES = [
  {
    src: "/images/hotel_image.jpeg",
    alt: "ARK Hotels exterior",
    caption: "ARK Hotels, Kokar, Ranchi.",
  },
  {
    src: "/images/reception_image.jpeg",
    alt: "Lobby corridor at ARK Hotels Ranchi",
    caption: "Lobby desk and corridor.",
  },
  {
    src: "/images/rooms/delux_double_room.jpeg",
    alt: "Deluxe Double Room at ARK Hotels",
    caption: "Our standard Deluxe Double Room.",
  },
];

export default function AboutPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: `${SITE.url}/` },
    { name: "About ARK", url: `${SITE.url}/about` },
  ]);

  const aboutImagesDir = path.join(process.cwd(), "public", "images", "about");
  let galleryImages: string[] = [];
  try {
    const files = fs.readdirSync(aboutImagesDir);
    galleryImages = files
      .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
      .map((f) => `/images/about/${f}`);
  } catch (e) {
    // Directory might not exist yet
  }

  return (
    <>
      <section className="container-page pt-12 lg:pt-20 pb-16 lg:pb-24">
        <Eyebrow>About ARK</Eyebrow>
        <h1 className="mt-4 font-display text-[34px] sm:text-[52px] lg:text-[64px] leading-[1.06] tracking-[-0.02em] text-ink max-w-[20ch]">
          A 23-room hotel run by people who answer the phone themselves.
        </h1>
      </section>

      <section className="container-page pb-20 lg:pb-32">
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-start">
          <div className="col-span-12 lg:col-span-7">
            <div className="space-y-6 text-[18px] text-ink-soft leading-[1.7] max-w-[60ch]">
              <p>
                ARK Hotels is a 23-room business hotel in Kokar, north
                Ranchi. Three floors, one lift, one in-house vegetarian
                restaurant. Nothing more, and that&apos;s the point.
              </p>
              <p>
                The hotel was built around a simple bet: that a business
                traveller in Ranchi would rather have a clean room and a
                front desk that picks up than a lobby chandelier and a
                &ldquo;concierge experience.&rdquo; Most of our guests come
                in for two nights of meetings — vendor visits, PSU work,
                training programmes, audits — so the routines around
                check-in, parking, billing and food are tuned for that.
              </p>
              <p>
                Run by a small team that knows the regulars. If something in
                the room isn&apos;t right, we&apos;d rather hear it from you
                in person than read it in a review.
              </p>
              <p className="text-[15px] text-stone-500 leading-[1.7]">
                Twenty-three rooms across three floors. Nine kilometres from
                Birsa Munda Airport. Front desk staffed twenty-four hours.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap items-baseline gap-x-4 gap-y-3">
              <LinkArrow href="/rooms">See the rooms</LinkArrow>
              <span className="text-stone-300" aria-hidden>/</span>
              <LinkArrow href="/contact">Talk to us</LinkArrow>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <ImageCarousel images={ABOUT_IMAGES} ratio="3/4" />
          </div>
        </div>
      </section>

      {galleryImages.length > 0 && (
        <section className="py-10 lg:py-20 overflow-hidden">
          <div className="container-page mb-10">
            <Eyebrow>Property gallery</Eyebrow>
            <h2 className="mt-4 font-display text-[28px] lg:text-[36px] leading-[1.15] text-ink">
              More around the hotel.
            </h2>
          </div>
          <ImageMarquee images={galleryImages} />
        </section>
      )}

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)}
      />
    </>
  );
}

