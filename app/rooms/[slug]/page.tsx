import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { LinkArrow } from "@/components/ui/Buttons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RoomCarousel } from "@/components/ui/RoomCarousel";
import { RoomCTAs } from "@/components/rooms/RoomCTAs";
import { TrustStrip } from "@/components/shared/TrustStrip";
import { DirectBookingNotes } from "@/components/shared/DirectBookingNotes";
import { ROOMS, SITE } from "@/lib/site";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd, hotelRoomJsonLd } from "@/lib/jsonld";
import { createPageMetadata } from "@/lib/seo";

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
  return createPageMetadata({
    title: `${room.name} in Kokar, Ranchi | ARK Hotels`,
    description: `${room.name} at ARK Hotels, Kokar, Ranchi. ${room.short} AC room with free WiFi, work desk, hot water & vegetarian breakfast. Call or WhatsApp to book.`,
    path: `/rooms/${room.slug}`,
    image: room.image.src,
    imageAlt: room.image.alt,
  });
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

      {/* Mobile-only quick-decision strip — appears before scroll so the
          guest's first action can be "ask rate" without hunting for the CTA */}
      {'decision' in room && (() => {
        const d = (room as { decision: { bestFor: string; upgradeNote: string } }).decision;
        const waMsg = encodeURIComponent(`Hi, I'm looking at the ${room.name}. Please share today's direct rate and availability.`);
        const waHref = `https://wa.me/${SITE.whatsapp.e164.replace("+", "")}?text=${waMsg}`;
        return (
          <div className="lg:hidden border-b border-stone-100 bg-parchment">
            <div className="container-page py-5 space-y-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">Best for</p>
              <p className="text-[14px] text-ink-soft leading-[1.55] max-w-[48ch]">{d.bestFor}</p>
              <p className="text-[12px] text-brass leading-[1.5] border-l-2 border-brass/30 pl-3">{d.upgradeNote}</p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-3.5 bg-[#25D366] text-white text-[14px] font-medium rounded-[2px] hover:bg-[#1ebe5d] transition-colors"
              >
                Ask today&apos;s rate on WhatsApp
              </a>
            </div>
          </div>
        );
      })()}

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

            {'decision' in room && (() => {
              const d = (room as { decision: { bestFor: string; notFor: string; upgradeNote: string } }).decision;
              const waMsg = encodeURIComponent(`Hi, I'm looking at the ${room.name}. Please share today's direct rate and availability.`);
              const waHref = `https://wa.me/${SITE.whatsapp.e164.replace("+", "")}?text=${waMsg}`;
              return (
                <div className="mt-8 border-t-2 border-brass pt-4">
                  <table className="w-full text-[13px] border-collapse">
                    <tbody>
                      <tr className="border-b border-stone-100">
                        <td className="py-3 pr-4 text-[10px] uppercase tracking-[0.16em] text-stone-400 whitespace-nowrap align-top w-[38%]">Best for</td>
                        <td className="py-3 text-ink-soft leading-[1.55]">{d.bestFor}</td>
                      </tr>
                      <tr className="border-b border-stone-100">
                        <td className="py-3 pr-4 text-[10px] uppercase tracking-[0.16em] text-stone-400 whitespace-nowrap align-top">Why upgrade</td>
                        <td className="py-3 text-brass leading-[1.55]">{d.upgradeNote}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-[10px] uppercase tracking-[0.16em] text-stone-400 whitespace-nowrap align-middle">Ask</td>
                        <td className="py-3">
                          <a
                            href={waHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink underline decoration-brass decoration-1 underline-offset-4 hover:text-brass-deep hover:decoration-2 transition-all"
                          >
                            Today&apos;s direct rate →
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })()}

            <TrustStrip className="mt-8" />
            <RoomCTAs roomName={room.name} />
            <DirectBookingNotes />
          </div>
        </div>
      </section>

      {'amenities' in room && (
        <section className="border-t border-stone-100">
          <div className="container-page py-16 lg:py-20">
          <h2 className="font-display text-[26px] lg:text-[32px] leading-[1.15] text-ink mb-10 lg:mb-14">
            Room Amenities
          </h2>
          <div className="space-y-10 lg:space-y-12">
            {(room as typeof room & { amenities: { category: string; items: string[] }[] }).amenities.map((group) => (
              <div key={group.category}>
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink mb-5">
                  {group.category}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[15px] text-ink-soft">
                      <Check size={14} strokeWidth={2.5} className="shrink-0 text-stone-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          </div>
        </section>
      )}

      <section className="bg-parchment border-y border-stone-100">
        <div className="container-page py-20 lg:py-24">
          <div className="grid grid-cols-12 gap-6 lg:gap-12 items-end">
            <div className="col-span-12 lg:col-span-6">
              <Eyebrow tone="moss">Or look at</Eyebrow>
              <h2 className="mt-3 font-display text-[28px] lg:text-[36px] leading-[1.15] text-ink max-w-[20ch]">
                {next.name} — {next.short.toLowerCase()}
              </h2>
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

      <JsonLd id={`${room.slug}-breadcrumb-jsonld`} data={breadcrumbs} />
      <JsonLd id={`${room.slug}-room-jsonld`} data={hotelRoomJsonLd(room)} />
    </>
  );
}
