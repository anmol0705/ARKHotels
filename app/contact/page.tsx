import type { Metadata } from "next";
import { ContactClient } from "./Contact.client";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact ARK Hotels Ranchi | Book a Room in Kokar",
    description: `Book a room or ask a question — call ${SITE.phone.display} or WhatsApp ${SITE.whatsapp.display}. ARK Hotels, Don Bosco School Lane-1, Old HB Road, Kokar, Ranchi 834001.`,
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: `${SITE.url}/` },
    { name: "Talk to us", url: `${SITE.url}/contact` },
  ]);

  return (
    <>
      <ContactClient />
      <JsonLd id="contact-breadcrumb-jsonld" data={breadcrumbs} />
      <JsonLd id="contact-faq-jsonld" data={faqJsonLd} />
    </>
  );
}
