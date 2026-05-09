"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { type Room } from "@/components/rooms/RoomShowcase";
import { RoomCarousel } from "@/components/home/RoomCarousel";

export function RoomsIndexClient({ rooms }: { rooms: readonly Room[] }) {
  return (
    <section className="bg-paper pb-14 lg:pb-32">
      <div className="container-page pt-14 lg:pt-32 relative">
        <Reveal className="max-w-[40ch] mb-8 lg:mb-12">
          <Eyebrow>Rooms</Eyebrow>
          <h2 className="mt-4 font-display text-[28px] sm:text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.015em] text-ink">
            Three room categories. Choose the perfect space for your stay.
          </h2>
          <p className="mt-5 sm:mt-6 text-[15px] sm:text-[16px] text-ink-soft max-w-[58ch]">
            Every room features air conditioning, a dedicated work desk, complimentary WiFi, hot water, an LCD TV, a tea/coffee tray, and daily housekeeping. Explore the differences below to find the ideal fit for your visit.
          </p>
        </Reveal>
      </div>

      <RoomCarousel rooms={rooms} />
    </section>
  );
}

