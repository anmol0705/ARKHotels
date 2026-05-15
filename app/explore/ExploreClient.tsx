"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Image from "next/image";
import {
  Building2,
  Factory,
  Store,
  Landmark,
  Stethoscope,
  Stamp,
  Train,
  Dumbbell,
  HardHat,
  Plane,
  Cog,
  GraduationCap,
  Bus,
  ImageOff,
} from "lucide-react";
import { NEARBY_BUSINESS, NEARBY_LEISURE } from "@/lib/site";
import { Eyebrow } from "@/components/ui/Eyebrow";

type BusinessPlace = (typeof NEARBY_BUSINESS)[number]["place"];

const BUSINESS_ICONS: Record<BusinessPlace, { icon: React.ElementType; accent: string }> = {
  "Samford Hospital": { icon: Stethoscope, accent: "bg-rose-50    text-rose-600    ring-rose-100" },
  "Kokar Industrial Area": { icon: Factory, accent: "bg-amber-50   text-amber-600   ring-amber-100" },
  "Upper Bazar": { icon: Store, accent: "bg-sky-50     text-sky-600     ring-sky-100" },
  "Lalpur": { icon: Building2, accent: "bg-violet-50  text-violet-600  ring-violet-100" },
  "Dipatoli": { icon: Landmark, accent: "bg-teal-50    text-teal-600    ring-teal-100" },
  "Passport Office": { icon: Stamp, accent: "bg-blue-50    text-blue-600    ring-blue-100" },
  "Khadgarha Bus Stand": { icon: Bus, accent: "bg-lime-50    text-lime-600    ring-lime-100" },
  "Ranchi Junction": { icon: Train, accent: "bg-orange-50  text-orange-600  ring-orange-100" },
  "Khelgaon": { icon: Dumbbell, accent: "bg-green-50   text-green-600   ring-green-100" },
  "PSU Belt — HEC & MECON, Dhurwa": { icon: HardHat, accent: "bg-indigo-50  text-indigo-600  ring-indigo-100" },
  "Birsa Munda Airport": { icon: Plane, accent: "bg-cyan-50    text-cyan-600    ring-cyan-100" },
  "Namkum Industrial Area": { icon: Cog, accent: "bg-stone-50   text-stone-600   ring-stone-200" },
  "BIT Mesra": { icon: GraduationCap, accent: "bg-emerald-50 text-emerald-600 ring-emerald-100" },
};



function PhotoCard({
  src, alt, title, distance, time, children,
}: {
  src: string; alt: string; title: string;
  distance: string; time: string; children: React.ReactNode;
}) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="group border border-stone-100 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow">
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        {imgError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-stone-100">
            <ImageOff size={28} className="text-stone-300" />
            <span className="text-[12px] text-stone-400">No photo yet</span>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-[20px] text-ink leading-[1.2] mb-2">{title}</h3>
        <div className="flex items-center gap-3 mb-3 text-[13px]">
          <span className="text-stone-500 tabular-nums bg-stone-100 px-2 py-1 rounded">{distance}</span>
          <span className="text-stone-500 tabular-nums bg-stone-100 px-2 py-1 rounded">{time}</span>
        </div>
        <p className="text-[13px] text-ink-soft leading-[1.55]">{children}</p>
      </div>
    </div>
  );
}

const EASE = [0.22, 0.61, 0.36, 1] as const;

function getSlug(place: string) {
  if (place.includes("PSU Belt")) return "psu-belt";
  if (place.includes("Bhagwan Birsa")) return "birsa-munda-biological-park";
  return place.toLowerCase()
    .replace(/ — /g, "-")
    .replace(/ & /g, "-")
    .replace(/, /g, "-")
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

type TabId = "business" | "leisure" | "transit";

export function ExploreClient() {
  const [activeTab, setActiveTab] = useState<TabId>("business");
  const reduce = useReducedMotion();

  const tabs: { id: TabId; label: string }[] = [
    { id: "business", label: "Business Hubs" },
    { id: "leisure", label: "Leisure & Day Trips" },
    { id: "transit", label: "Getting Here" },
  ];

  return (
    <>
      <section className="container-page pt-12 lg:pt-20 pb-12">
        <Eyebrow>Local Guide</Eyebrow>
        <h1 className="mt-4 font-display text-[34px] sm:text-[52px] lg:text-[64px] leading-[1.06] tracking-[-0.02em] text-ink max-w-[20ch]">
          Explore Ranchi from Kokar.
        </h1>
        <p className="mt-8 text-[18px] text-ink-soft max-w-[60ch] leading-[1.65]">
          ARK sits on Don Bosco School Lane-1, just off Old HB Road in Kokar —
          well-connected to the airport, PSU campuses, commercial belts, and the
          road out toward Jharkhand&apos;s waterfall country.
        </p>
      </section>

      <section className="container-page pb-20 lg:pb-28">
        {/* Tab Header */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-stone-200">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-4 text-[16px] font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? "text-ink" : "text-stone-400 hover:text-stone-600"
                  }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-ink"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8 lg:mt-12 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {activeTab === "business" && (
                <div>
                  <p className="text-ink-soft mb-8 leading-relaxed max-w-[60ch]">
                    Kokar puts you inside the commercial ring of Ranchi without the congestion of the city centre.
                    PSU campuses, government offices, and industrial zones are all straightforward cab rides.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {NEARBY_BUSINESS.map((n) => {
                      const meta = BUSINESS_ICONS[n.place];
                      const Icon = meta?.icon ?? Building2;
                      const accent = meta?.accent ?? "bg-stone-50 text-stone-600 ring-stone-200";
                      return (
                        <div key={n.place} className="group border border-stone-100 rounded-xl bg-white hover:shadow-md transition-shadow p-6 flex gap-5">
                          <div className={`shrink-0 w-25 h-25 rounded-xl flex items-center justify-center ring-1 ${accent}`}>
                            <Icon size={24} strokeWidth={1.5} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-display text-[18px] text-ink leading-[1.25] mb-1">{n.place}</h3>
                            <div className="flex items-center gap-2 mb-2 text-[12px]">
                              <span className="text-stone-500 tabular-nums">{n.distance}</span>
                              <span className="text-stone-300">·</span>
                              <span className="text-stone-500 tabular-nums">{n.time}</span>
                            </div>
                            <p className="text-[13px] text-ink-soft leading-[1.6]">{n.note}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "leisure" && (
                <div>
                  <p className="text-ink-soft mb-8 leading-relaxed max-w-[60ch]">
                    Most weekend guests do a Hundru–Jonha loop on day one and Pahari Mandir at sunrise on day two.
                    The front desk can put together an itinerary and arrange a car for the day.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {NEARBY_LEISURE.map((n) => (
                      <PhotoCard
                        key={n.place}
                        src={`/images/explore/${getSlug(n.place)}.webp`}
                        alt={n.place}
                        title={n.place}
                        distance={n.distance}
                        time={n.time}
                      >
                        {n.note}
                      </PhotoCard>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "transit" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <PhotoCard src="/images/explore/birsa-munda-airport.webp" alt="Birsa Munda Airport" title="Birsa Munda Airport" distance="9 km" time="15–20 min">
                    App cabs and pre-paid taxis are both available at the airport.
                    If you&apos;d rather not deal with a queue at midnight, the
                    front desk arranges a sedan pickup with advance notice. Fare
                    is shared at the time of booking.
                  </PhotoCard>
                  <PhotoCard src="/images/explore/ranchi-junction.webp" alt="Ranchi Railway Station" title="Ranchi Railway Station" distance="~6 km" time="15–20 min">
                    The main railway station with direct trains to Delhi, Mumbai, and Kolkata.
                    Auto-rickshaws and cabs are readily available outside the station,
                    or the front desk can arrange a pickup.
                  </PhotoCard>
                  <PhotoCard src="/images/explore/khadgarha-bus-stand.webp" alt="ISBT Khadgarha Bus Stand" title="ISBT Khadgarha Bus Stand" distance="~3 km" time="8–10 min">
                    The Birsa Munda Inter State Bus Terminus (ISBT) at Khadgarha is very close to Kokar.
                    It connects Ranchi to all major districts in Jharkhand, Bihar, and West Bengal.
                  </PhotoCard>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
