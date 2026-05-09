"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { type Room } from "@/components/rooms/RoomShowcase";
import { RoomCarousel } from "@/components/home/RoomCarousel";

export function RoomsIndexClient({ rooms }: { rooms: readonly Room[] }) {
  return (
    <section className="bg-paper pb-14 lg:pb-32">
      <div className="container-page pt-14 lg:pt-32">
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-end mb-10 lg:mb-14 pr-4 sm:pr-6 lg:pr-0">
          <Reveal className="col-span-12 lg:col-span-6">
            <Eyebrow>Rooms</Eyebrow>
            <h2 className="mt-4 font-display text-[28px] sm:text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.015em] text-ink">
              Three room categories. Choose the right space for your stay.
            </h2>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-5 lg:col-start-8">
            <span className="brass-rule mb-5 hidden lg:block" />
            <p className="text-[15px] sm:text-[16px] text-ink-soft leading-[1.65]">
              Every room has air conditioning, a work desk, free WiFi, hot water, an LCD TV, and daily housekeeping. Explore below to find the right fit.
            </p>
          </Reveal>
        </div>
      </div>

      <RoomCarousel rooms={rooms} />
    </section>
  );
}

