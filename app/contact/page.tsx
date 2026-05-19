import type { Metadata } from "next";
import { ContactClient } from "./Contact.client";
import { SITE } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Contact ARK Hotels Ranchi | Book a Room in Kokar",
  description: `Book a room or ask a question — call ${SITE.phone.display} or WhatsApp ${SITE.whatsapp.display}. ARK Hotels, Don Bosco School Lane-1, Old HB Road, Kokar, Ranchi 834001. Direct bookings only, no fees.`,
  alternates: { canonical: `${SITE.url}/contact` },
};

export default function ContactPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: `${SITE.url}/` },
    { name: "Talk to us", url: `${SITE.url}/contact` },
  ]);

  return (
    <>
      <ContactClient />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd)}
      />
    </>
  );
}
