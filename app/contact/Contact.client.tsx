"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Map } from "@/components/shared/Map";
import { FAQS, SITE, whatsappHref } from "@/lib/site";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function ContactClient() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* ─────────── Hero ─────────── */}
      <section className="container-page pt-12 lg:pt-20 pb-16 lg:pb-24">
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "visible"}
          transition={{ staggerChildren: 0.08, delayChildren: 0.05 }}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: EASE }}>
            <Eyebrow>Talk to the front desk</Eyebrow>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.65, ease: EASE }}
            className="mt-4 font-display text-[34px] sm:text-[52px] lg:text-[68px] leading-[1.06] tracking-[-0.02em] text-ink max-w-[18ch]"
          >
            The phone is faster than a form.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.65, ease: EASE }}
            className="mt-6 text-[18px] text-ink-soft max-w-[58ch] leading-[1.65]"
          >
            For bookings, GST invoices, group rates, airport pickup or anything
            else — call the front desk. We&apos;re open 24 hours, and most
            enquiries are settled in a single phone call.
          </motion.p>
        </motion.div>
      </section>


      {/* ─────────── Map ─────────── */}
      <section className="container-page pb-20 lg:pb-28">
        <Map ratio="21/9" />
      </section>

      {/* ─────────── Reach the front desk + side blocks ─────────── */}
      <section className="container-page pb-20 lg:pb-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
            hidden: {},
          }}
          className="grid grid-cols-12 gap-6 lg:gap-12"
        >
          {/* Left — phone, whatsapp, address */}
          <div className="col-span-12 lg:col-span-5 space-y-12">
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="border-t border-stone-100 pt-6"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                By phone
              </p>
              <a
                href={SITE.phone.tel}
                className="mt-3 block font-display text-[36px] lg:text-[44px] text-ink hover:text-brass-deep transition-colors tabular-nums"
              >
                {SITE.phone.display}
              </a>
              <p className="mt-2 text-[14px] text-stone-500">
                Front desk · 24 hours
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="border-t border-stone-100 pt-6"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                On WhatsApp
              </p>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block font-display text-[28px] lg:text-[32px] text-ink hover:text-brass-deep transition-colors tabular-nums"
              >
                {SITE.whatsapp.display}
              </a>
              <p className="mt-2 text-[14px] text-stone-500">
                Replies usually under 10 minutes during the day
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="border-t border-stone-100 pt-6"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                In person
              </p>
              <p className="mt-3 text-[18px] text-ink leading-[1.6] max-w-[34ch]">
                {SITE.address.street}
                <br />
                {SITE.address.locality}, {SITE.address.city},{" "}
                {SITE.address.region} {SITE.address.postalCode}
              </p>
            </motion.div>
          </div>

          {/* Right — quick enquiries, corporate, groups */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 space-y-12">
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="border-t border-stone-100 pt-6"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                Quick enquiries
              </p>
              <p className="mt-3 font-display text-[24px] lg:text-[28px] text-ink leading-[1.25] max-w-[28ch]">
                A 90-second WhatsApp gets a faster answer than email.
              </p>
              <p className="mt-4 text-[15px] text-ink-soft leading-[1.65] max-w-[42ch]">
                Tap below and the message is pre-filled with your dates and
                guest count slots — fill them in, send, and the front desk
                takes it from there.
              </p>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-brass text-paper text-[15px] font-medium rounded-[2px] hover:bg-brass-deep transition-colors"
              >
                Open WhatsApp
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="border-t border-stone-100 pt-6"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                For company-billed bookings
              </p>
              <p className="mt-3 text-[15px] text-ink-soft leading-[1.65] max-w-[42ch]">
                Mention &ldquo;corporate desk&rdquo; when you call. Share your
                company name and GSTIN at the time of booking; we hold the room
                against an email confirmation and accept payment by NEFT or UPI
                within an agreed window.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="border-t border-stone-100 pt-6"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                For groups & weddings
              </p>
              <p className="mt-3 text-[15px] text-ink-soft leading-[1.65] max-w-[42ch]">
                Team booking or a long stay: call the front desk and we&apos;ll work
                out a block rate over a single phone call.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─────────── FAQs ─────────── */}
      <section
        id="faqs"
        className="bg-parchment border-y border-stone-100"
      >
        <div className="container-page py-20 lg:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
              hidden: {},
            }}
            className="grid grid-cols-12 gap-6 lg:gap-12 items-start"
          >
            <div className="col-span-12 lg:col-span-4">
              <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: EASE }}>
                <Eyebrow>FAQs</Eyebrow>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="mt-4 font-display text-[28px] lg:text-[36px] leading-[1.15] text-ink max-w-[20ch]"
              >
                Things people actually ask.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="mt-6 text-[14px] text-ink-soft leading-[1.6] max-w-[30ch]"
              >
                The eight below cover most of what guests want to know before
                booking. Anything else, call the front desk.
              </motion.p>
            </div>

            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <ul className="divide-y divide-stone-100 border-y border-stone-100">
                {FAQS.map((f) => (
                  <FaqRow key={f.q} q={f.q} a={f.a} />
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ─────────── FAQ row with controlled accordion + motion ─────────── */
function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <motion.li
      variants={fadeUp}
      transition={{ duration: 0.5, ease: EASE }}
      className="py-2"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 py-4 lg:py-5 text-left group"
      >
        <span className="font-display text-[18px] lg:text-[22px] text-ink leading-[1.3] group-hover:text-brass-deep transition-colors pr-2">
          {q}
        </span>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="text-[20px] text-stone-500 leading-none mt-2 shrink-0"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="content"
            initial={reduce ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 lg:pb-6 pr-2 text-[15px] text-ink-soft leading-[1.7] max-w-[58ch]">
              {a}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.li>
  );
}

