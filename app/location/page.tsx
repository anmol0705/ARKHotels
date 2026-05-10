import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkArrow } from "@/components/ui/Buttons";
import { NEARBY_BUSINESS, NEARBY_LEISURE, SITE } from "@/lib/site";
import { breadcrumbJsonLd, faqPageJsonLd, jsonLdScript } from "@/lib/jsonld";

const LOCATION_FAQ = [
  {
    q: "How far is ARK Hotels from Birsa Munda Airport?",
    a: "ARK Hotels is 9 km from Birsa Munda Airport in Kokar, Ranchi — about 15 to 20 minutes by cab.",
  },
  {
    q: "Can the hotel arrange a cab to the airport?",
    a: "Yes, paid pickup and drop from Birsa Munda Airport in a sedan. Book at least three hours ahead at the front desk or on WhatsApp.",
  },
  {
    q: "How do I get from the airport to ARK Hotels at night?",
    a: "App cabs and pre-paid taxis run from Birsa Munda Airport at all hours. The front desk can also arrange a sedan pickup with advance notice; fare is shared at the time of booking.",
  },
];

export const metadata: Metadata = {
  title: "Hotel Location — Kokar, Ranchi | Near Airport, HEC & City Centre",
  description:
    "ARK Hotels is in Kokar, Ranchi — 9 km from Birsa Munda Airport, close to HEC, BIT Mesra, Upper Bazar, Passport Office and Khelgaon. Day trips to Hundru Falls, Pahari Mandir and more.",
  alternates: { canonical: "/location" },
};

export default function LocationPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: `${SITE.url}/` },
    { name: "Find us", url: `${SITE.url}/location` },
  ]);

  const mapEmbed =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.477447443871!2d85.35187467472818!3d23.370938978931125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1001d7f224b%3A0x347c7991c5d10f31!2sARK%20Hotels!5e0!3m2!1sen!2sin!4v1778268930855!5m2!1sen!2sin";

  return (
    <>
      {/* ── Hero ── */}
      <section className="container-page pt-12 lg:pt-20 pb-12">
        <Eyebrow>Find us</Eyebrow>
        <h1 className="mt-4 font-display text-[34px] sm:text-[52px] lg:text-[64px] leading-[1.06] tracking-[-0.02em] text-ink max-w-[20ch]">
          Kokar, north Ranchi. Close to where business gets done.
        </h1>
        <p className="mt-8 text-[18px] text-ink-soft max-w-[60ch] leading-[1.65]">
          ARK sits on Don Bosco School Lane-1, just off Old HB Road in Kokar —
          well-connected to the airport, PSU campuses, commercial belts, and the
          road out toward Jharkhand&apos;s waterfall country. Auto-rickshaws are
          easy to flag from the main road; app cabs reach most destinations in
          under twenty minutes.
        </p>
      </section>

      {/* ── Map ── */}
      <section className="container-page pb-20 lg:pb-28">
        <div className="aspect-[5/4] sm:aspect-[16/7] w-full overflow-hidden border border-stone-100">
          <iframe
            title="ARK Hotels location map"
            src={mapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[13px] text-stone-500">
          <span>{SITE.address.full}</span>
          <a
            href={SITE.address.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-soft hover:text-ink underline decoration-brass decoration-1 underline-offset-4 shrink-0"
          >
            Open in Google Maps ↗
          </a>
        </div>
      </section>

      {/* ── Business destinations ── */}
      <section className="bg-parchment border-y border-stone-100">
        <div className="container-page py-20 lg:py-28">
          <div className="grid grid-cols-12 gap-6 lg:gap-16 items-start">
            <div className="col-span-12 lg:col-span-4">
              <Eyebrow>For business travellers</Eyebrow>
              <h2 className="mt-4 font-display text-[28px] lg:text-[36px] leading-[1.15] text-ink max-w-[22ch]">
                Most meeting destinations are under 25 minutes.
              </h2>
              <p className="mt-6 text-ink-soft leading-[1.65] max-w-[40ch]">
                Kokar puts you inside the commercial ring of Ranchi without
                the congestion of the city centre. PSU campuses, government
                offices, industrial zones, and the airport are all straightforward
                cab rides.
              </p>
              <p className="mt-4 text-[13px] text-stone-500 leading-relaxed">
                Times are estimates in normal traffic. The front desk can
                arrange a cab or share the best route — ask at check-in.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <ul className="divide-y divide-stone-100 border-y border-stone-100">
                {NEARBY_BUSINESS.map((n) => (
                  <li
                    key={n.place}
                    className="grid grid-cols-12 gap-x-4 gap-y-1 py-5 items-baseline"
                  >
                    <div className="col-span-12 sm:col-span-5 lg:col-span-4">
                      <span className="font-display text-[18px] lg:text-[20px] text-ink leading-[1.2]">
                        {n.place}
                      </span>
                    </div>
                    <div className="col-span-6 sm:col-span-2 flex items-baseline gap-3">
                      <span className="text-[13px] text-stone-500 tabular-nums">{n.distance}</span>
                      <span className="text-[13px] text-stone-400 tabular-nums hidden sm:inline">{n.time}</span>
                    </div>
                    <p className="col-span-12 sm:col-span-5 lg:col-span-6 text-[13px] text-ink-soft leading-[1.55]">
                      {n.note}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Day trips / leisure ── */}
      <section className="container-page py-20 lg:py-28">
        <div className="grid grid-cols-12 gap-6 lg:gap-16 items-start">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow tone="moss">Day trips & leisure</Eyebrow>
            <h2 className="mt-4 font-display text-[28px] lg:text-[36px] leading-[1.15] text-ink max-w-[22ch]">
              Half a day from every waterfall worth seeing.
            </h2>
            <p className="mt-6 text-ink-soft leading-[1.65] max-w-[40ch]">
              Most weekend guests do a Hundru–Jonha loop on day one and
              Pahari Mandir at sunrise on day two. The front desk can put
              together an itinerary and arrange a car for the day.
            </p>
            <div className="mt-8">
              <LinkArrow href="/contact">Ask about a day trip</LinkArrow>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <ul className="divide-y divide-stone-100 border-y border-stone-100">
              {NEARBY_LEISURE.map((n) => (
                <li
                  key={n.place}
                  className="grid grid-cols-12 gap-x-4 gap-y-1 py-5 items-baseline"
                >
                  <div className="col-span-12 sm:col-span-5 lg:col-span-4">
                    <span className="font-display text-[18px] lg:text-[20px] text-ink leading-[1.2]">
                      {n.place}
                    </span>
                  </div>
                  <div className="col-span-6 sm:col-span-2 flex items-baseline gap-3">
                    <span className="text-[13px] text-stone-500 tabular-nums">{n.distance}</span>
                    <span className="text-[13px] text-stone-400 tabular-nums hidden sm:inline">{n.time}</span>
                  </div>
                  <p className="col-span-12 sm:col-span-5 lg:col-span-6 text-[13px] text-ink-soft leading-[1.55]">
                    {n.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Airport transfer ── */}
      <section className="bg-parchment border-y border-stone-100">
        <div className="container-page py-20 lg:py-28">
          <div className="grid grid-cols-12 gap-6 lg:gap-12 items-end">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow>From the airport</Eyebrow>
              <h2 className="mt-4 font-display text-[32px] lg:text-[40px] leading-[1.1] tracking-[-0.015em] text-ink max-w-[22ch]">
                Birsa Munda Airport to ARK in fifteen minutes.
              </h2>
              <p className="mt-6 text-ink-soft leading-[1.65] max-w-[58ch]">
                App cabs and pre-paid taxis are both available at the airport.
                If you&apos;d rather not deal with a queue at midnight, the
                front desk arranges a sedan pickup with advance notice. Fare
                is shared at the time of booking.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-wrap items-baseline gap-x-4 gap-y-3">
              <LinkArrow href="/contact">Arrange a pickup</LinkArrow>
              <span className="text-stone-300" aria-hidden>/</span>
              <a
                href={SITE.phone.tel}
                className="text-[15px] text-stone-500 underline decoration-stone-300 decoration-1 underline-offset-[6px] hover:text-ink hover:decoration-ink transition-all"
              >
                Or call · {SITE.phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLdScript(faqPageJsonLd(LOCATION_FAQ))}
      />
    </>
  );
}
