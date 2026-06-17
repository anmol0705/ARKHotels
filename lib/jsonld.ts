import { FAQS, SITE } from "./site";

type FAQItem = { q: string; a: string };

type RoomInput = {
  slug: string;
  name: string;
  description: string;
  features: ReadonlyArray<string>;
  image: { src: string; alt: string };
};

const BASE = SITE.url;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: `${SITE.address.street}, ${SITE.address.locality}`,
  addressLocality: SITE.address.city,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postalCode,
  addressCountry: SITE.address.country,
};

export const hotelJsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  "@id": `${BASE}/#hotel`,
  name: SITE.name,
  description:
    "Professional hotel in Kokar, Ranchi, 9 km from Birsa Munda Airport, with a pure vegetarian restaurant, AC rooms, free WiFi, free parking, and 24-hour front desk.",
  url: `${BASE}/`,
  telephone: SITE.phone.e164,
  email: SITE.email,
  image: `${BASE}/images/hero_carousel/ark_out_image.webp`,
  address: postalAddress,
  checkinTime: SITE.hotel.checkIn,
  checkoutTime: SITE.hotel.checkOut,
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Air conditioning", value: true },
    { "@type": "LocationFeatureSpecification", name: "24-hour front desk", value: true },
    { "@type": "LocationFeatureSpecification", name: "Pure vegetarian restaurant", value: true },
    { "@type": "LocationFeatureSpecification", name: "Room service", value: true },
    { "@type": "LocationFeatureSpecification", name: "Laundry service", value: true },
    { "@type": "LocationFeatureSpecification", name: "Luggage storage", value: true },
    { "@type": "LocationFeatureSpecification", name: "Airport shuttle (paid)", value: true },
    { "@type": "LocationFeatureSpecification", name: "GST invoice on checkout", value: true },
  ],
  hasMap: SITE.address.googleMaps,
};

export const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${BASE}/#restaurant`,
  name: "ARK Kitchen",
  description:
    "Pure vegetarian rooftop restaurant inside ARK Hotels, Kokar, Ranchi, with North Indian and Indo-Chinese food, breakfast, and in-room dining.",
  url: `${BASE}/dining`,
  telephone: SITE.phone.e164,
  servesCuisine: ["North Indian", "Indian Vegetarian", "Indo-Chinese"],
  acceptsReservations: true,
  address: postalAddress,
  isPartOf: { "@id": `${BASE}/#hotel` },
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: `${BASE}/`,
  telephone: SITE.phone.e164,
  email: SITE.email,
  address: postalAddress,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: SITE.phone.e164,
      contactType: "reservations",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  ],
};

export function breadcrumbJsonLd(crumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function faqPageJsonLd(items: ReadonlyArray<FAQItem>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  name: SITE.name,
  url: `${BASE}/`,
  description:
    "ARK Hotels in Kokar, Ranchi, 9 km from Birsa Munda Airport, with pure vegetarian dining, AC rooms, free WiFi, free parking, and GST invoicing.",
  inLanguage: "en-IN",
};

export function hotelRoomJsonLd(room: RoomInput) {
  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    "@id": `${BASE}/rooms/${room.slug}#room`,
    name: room.name,
    description: room.description,
    url: `${BASE}/rooms/${room.slug}`,
    image: `${BASE}${room.image.src}`,
    amenityFeature: room.features.map((f) => ({
      "@type": "LocationFeatureSpecification",
      name: f,
      value: true,
    })),
    containedInPlace: { "@id": `${BASE}/#hotel` },
  };
}
