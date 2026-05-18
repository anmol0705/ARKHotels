import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinkArrow } from "@/components/ui/Buttons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RoomCarousel } from "@/components/ui/RoomCarousel";
import { ROOMS, SITE, whatsappHref } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";

export function generateStaticParams() {
  return ROOMS.map((r) => ({ slug: r.slug }));
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug);
  if (!room) return {};
  return {
    title: `${room.name} Room`,
    description: `${room.short} at ARK Hotels Ranchi, Kokar. Call ${SITE.phone.display} to book direct.`,
    alternates: { canonical: `/rooms/${room.slug}` },
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug);
  if (!room) notFound();

  const idx = ROOMS.findIndex((r) => r.slug === slug);
  const next = ROOMS[(idx + 1) % ROOMS.length];

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: `${SITE.url}/` },
    { name: "Rooms", url: `${SITE.url}/rooms` },
    { name: room.name, url: `${SITE.url}/rooms/${room.slug}` },
  ]);

  return (
    <>
      <section className="container-page pt-12 lg:pt-16 pb-12">
        <Eyebrow>The room</Eyebrow>
        <h1 className="mt-4 font-display text-[34px] sm:text-[52px] lg:text-[64px] leading-[1.06] tracking-[-0.02em] text-ink max-w-[20ch]">
          {room.name}
        </h1>
        <p className="mt-4 text-[15px] text-stone-500 tabular-nums">
          {room.size} · sleeps two, extra bed on request
        </p>
      </section>

      <section className="container-page pb-20 lg:pb-28">
        <RoomCarousel images={room.images} />

        <div className="grid grid-cols-12 gap-6 lg:gap-12 mt-16 lg:mt-24">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="font-display text-[28px] lg:text-[36px] leading-[1.18] text-ink max-w-[24ch]">
              {room.short}
            </h2>
            <p className="mt-6 text-[18px] text-ink-soft leading-[1.65] max-w-[58ch]">
              {room.description}
            </p>
            <p className="mt-6 text-ink-soft leading-[1.65] max-w-[58ch]">
              All ARK rooms come with AC, room heater for winter, blackout
              curtains, work desk, free WiFi, daily housekeeping, hot water
              and 24-hour room service.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="border-t border-stone-100 pt-6">
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                What this room has
              </p>
              <ul className="mt-4 divide-y divide-stone-100 border-y border-stone-100">
                {room.features.map((f) => (
                  <li
                    key={f}
                    className="py-3 text-[15px] text-ink-soft leading-[1.55]"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 space-y-3">
              <a
                href={SITE.phone.tel}
                className="block w-full text-center px-6 py-4 bg-brass text-paper text-[15px] font-medium rounded-[2px] hover:bg-brass-deep transition-colors"
              >
                Call front desk · {SITE.phone.display}
              </a>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-4 bg-[#25D366] text-white text-[15px] font-medium rounded-[2px] hover:bg-[#1ebe5d] transition-colors"
              >
                WhatsApp the front desk
              </a>
              <p className="pt-3 text-[12px] text-stone-500 leading-[1.6]">
                Replies usually under 10 minutes during the day. Direct
                bookings get the best available rate; no service fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-parchment border-y border-stone-100">
        <div className="container-page py-20 lg:py-24">
          <div className="grid grid-cols-12 gap-6 lg:gap-12 items-end">
            <div className="col-span-12 lg:col-span-6">
              <Eyebrow tone="moss">Or look at</Eyebrow>
              <h3 className="mt-3 font-display text-[28px] lg:text-[36px] leading-[1.15] text-ink max-w-[20ch]">
                {next.name} — {next.short.toLowerCase()}
              </h3>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex flex-wrap items-baseline gap-x-4 gap-y-3">
              <LinkArrow href={`/rooms/${next.slug}`}>
                See {next.name.toLowerCase()}
              </LinkArrow>
              <span className="text-stone-300" aria-hidden>/</span>
              <LinkArrow href="/rooms">All rooms</LinkArrow>
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

