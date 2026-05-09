import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { LinkArrow } from "@/components/ui/Buttons";
import { SITE, whatsappHref } from "@/lib/site";
import { breadcrumbJsonLd, faqPageJsonLd, jsonLdScript } from "@/lib/jsonld";

const BUSINESS_FAQ = [
  {
    q: "Is parking free, and is there space for a sedan?",
    a: "Yes — on-site and free for guests. The lot fits standard sedans and SUVs.",
  },
  {
    q: "Can I get a GST invoice on checkout?",
    a: "Yes. Share your company name and GSTIN at booking or check-in, and the invoice is handed over at checkout — no follow-up email needed.",
  },
  {
    q: "Can my colleague pay for my room later by bank transfer?",
    a: "Yes — corporate billing is supported. We hold the booking against a confirmation email from the company and accept payment by NEFT or UPI within an agreed window.",
  },
];

export const metadata: Metadata = {
  title: "Business Hotel in Ranchi, Near Airport",
  description:
    "Free WiFi, work desks, power backup, free parking, 24-hr front desk. 9 km from Birsa Munda Airport. Corporate rates and GST invoicing available.",
  alternates: { canonical: "/business" },
};

const SERVICES = [
  {
    k: "Early check-in handling",
    v: "If a room is ready when you land, you get it. If not, leave your bag at the desk, freshen up, and we'll let you know the moment housekeeping clears it. Standard check-in is 12:00 PM.",
  },
  {
    k: "GST invoice on checkout",
    v: "Pre-filled with your company name and GSTIN if you share them at booking. Hard copy at checkout — no follow-up emails required.",
  },
  {
    k: "Same-day laundry",
    v: "Laundry and dry-cleaning are available. Same-day turnaround is usually possible — confirm timings with the front desk when handing the clothes in.",
  },
  {
    k: "Free on-site parking",
    v: "Covered space, sedan and SUV friendly. Drivers welcome inside for tea and a place to sit.",
  },
  {
    k: "Airport pickup on request",
    v: "Paid pickup and drop from Birsa Munda Airport in a sedan. Book ahead at the front desk; approximate fare shared at booking.",
  },
  {
    k: "Corporate billing",
    v: "We hold the booking against a confirmation email from the company and accept payment by NEFT or UPI within an agreed window. Speak to the front desk for the format.",
  },
];

export default function BusinessPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: `${SITE.url}/` },
    { name: "For business travellers", url: `${SITE.url}/business` },
  ]);

  return (
    <>
      <section className="container-page pt-12 lg:pt-20 pb-16 lg:pb-24">
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow>For business travellers</Eyebrow>
            <h1 className="mt-4 font-display text-[34px] sm:text-[52px] lg:text-[64px] leading-[1.06] tracking-[-0.02em] text-ink max-w-[16ch]">
              Built for the two-night work trip.
            </h1>
            <p className="mt-8 text-[18px] text-ink-soft max-w-[58ch] leading-[1.65]">
              Most ARK guests are in Ranchi for a reason — a vendor visit in
              Doranda, a PSU meeting at HEC, two days of training, an audit.
              The hotel is set up around that. Check-in is fast because the
              front desk has your details ready. The GST invoice is handed to
              you at checkout, not chased over email a week later. The basics,
              done without you having to ask twice.
            </p>
          </div>
          <div className="hidden lg:block col-span-3 col-start-10 pb-1">
            <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
              Front desk · 24 hrs
            </p>
            <a
              href={SITE.phone.tel}
              className="mt-2 block font-display text-[28px] text-brass-deep tabular-nums"
            >
              {SITE.phone.display}
            </a>
            <p className="mt-3 text-[13px] text-stone-500 leading-relaxed">
              For company-billed bookings, ask for the corporate desk.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page pb-24 lg:pb-32">
        <Reveal>
          <Eyebrow>What you actually get</Eyebrow>
        </Reveal>
        <ul className="mt-10 divide-y divide-stone-100 border-y border-stone-100" id="billing">
          {SERVICES.map((row) => (
            <li
              key={row.k}
              className="grid grid-cols-12 gap-4 py-6 lg:py-7 items-start"
            >
              <span className="col-span-12 lg:col-span-4 font-display text-[20px] lg:text-[24px] text-ink leading-[1.2]">
                {row.k}
              </span>
              <span className="col-span-12 lg:col-span-8 text-ink-soft text-[15px] leading-[1.65]">
                {row.v}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-parchment border-y border-stone-100">
        <div className="container-page py-20 lg:py-28">
          <div className="grid grid-cols-12 gap-6 lg:gap-12 items-start">
            <div className="col-span-12 lg:col-span-5">
              <Eyebrow tone="moss">
                The room you want
              </Eyebrow>
              <h2 className="mt-4 font-display text-[28px] lg:text-[36px] leading-[1.15] text-ink max-w-[22ch]">
                Most business guests pick the Super Deluxe.
              </h2>
              <p className="mt-6 text-ink-soft leading-[1.65] max-w-[44ch]">
                Larger than the Deluxe, upgraded mattress, a bathroom that
                doesn&apos;t feel cramped after a 12-hour day, and a quieter
                position in the building.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <LinkArrow href="/rooms/super-deluxe">
                  See Super Deluxe
                </LinkArrow>
                <LinkArrow href="/rooms/premium-executive">
                  Or Executive
                </LinkArrow>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <PlaceholderImage
                src="/images/rooms/delux_double_room.jpeg"
                alt="Work desk in Executive room, ARK Hotels Ranchi"
                ratio="3/2"
                caption="Executive room work setup — desk lamp, two power points within reach."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20 lg:py-28">
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-8">
            <Eyebrow>Group bookings & long stays</Eyebrow>
            <h2 className="mt-4 font-display text-[32px] lg:text-[40px] leading-[1.1] tracking-[-0.015em] text-ink max-w-[22ch]">
              Three rooms or a fortnight: tell us, we&apos;ll work it out.
            </h2>
            <p className="mt-6 text-ink-soft leading-[1.65] max-w-[58ch]">
              For a team visiting together, an audit running across a week, or
              a wedding-guest block — call the front desk directly. Group
              rates and stay-for-five-pay-for-four arrangements are handled
              over a single phone call.
            </p>
            <p className="mt-8 text-[15px] text-ink-soft leading-[1.65] max-w-[58ch]">
              Call{" "}
              <a
                href={SITE.phone.tel}
                className="text-ink underline decoration-brass decoration-1 underline-offset-[6px] hover:decoration-2 hover:text-brass-deep transition-all tabular-nums"
              >
                {SITE.phone.display}
              </a>
              , or{" "}
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline decoration-brass decoration-1 underline-offset-[6px] hover:decoration-2 hover:text-brass-deep transition-all"
              >
                WhatsApp the front desk
              </a>
              .
            </p>
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
        dangerouslySetInnerHTML={jsonLdScript(faqPageJsonLd(BUSINESS_FAQ))}
      />
    </>
  );
}

