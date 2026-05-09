import { SITE, FAQS } from "./site";

type FAQItem = { q: string; a: string };

const BASE = SITE.url;

export const hotelJsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  "@id": `${BASE}/#hotel`,
  name: SITE.name,
  description:
    "23-room budget business hotel in Kokar, Ranchi, 9 km from Birsa Munda Airport. Free WiFi, free parking, on-site vegetarian restaurant.",
  url: `${BASE}/`,
  telephone: SITE.phone.e164,
  priceRange: "₹₹",
  starRating: { "@type": "Rating", ratingValue: String(SITE.hotel.starRating) },
  address: {
    "@type": "PostalAddress",
    streetAddress: `${SITE.address.street}, ${SITE.address.locality}`,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: String(SITE.address.geo.lat),
    longitude: String(SITE.address.geo.lng),
  },
  checkinTime: SITE.hotel.checkIn,
  checkoutTime: SITE.hotel.checkOut,
  numberOfRooms: String(SITE.hotel.rooms),
  petsAllowed: false,
  smokingAllowed: false,
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Air conditioning", value: true },
    { "@type": "LocationFeatureSpecification", name: "Power backup", value: true },
    { "@type": "LocationFeatureSpecification", name: "24-hour front desk", value: true },
    { "@type": "LocationFeatureSpecification", name: "On-site vegetarian restaurant", value: true },
    { "@type": "LocationFeatureSpecification", name: "Room service", value: true },
    { "@type": "LocationFeatureSpecification", name: "Laundry service", value: true },
    { "@type": "LocationFeatureSpecification", name: "Luggage storage", value: true },
    { "@type": "LocationFeatureSpecification", name: "Airport shuttle (paid)", value: true },
  ],
  // aggregateRating intentionally omitted until a verified review count is
  // available from Google Business Profile or the OTA aggregate. Inventing one
  // is a structured-data violation and can suppress the listing in SERP.
  hasMap: SITE.address.googleMaps,
};

export const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${BASE}/#restaurant`,
  name: "ARK Hotels Restaurant",
  description:
    "Pure-vegetarian, home-style North Indian restaurant inside ARK Hotels, Kokar, Ranchi. In-room dining and vegetarian breakfast available.",
  url: `${BASE}/dining`,
  telephone: SITE.phone.e164,
  servesCuisine: ["North Indian", "Indian Vegetarian"],
  acceptsReservations: true,
  priceRange: "₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${SITE.address.street}, ${SITE.address.locality}`,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "22:30",
    },
  ],
  isPartOf: { "@id": `${BASE}/#hotel` },
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE}/#localbusiness`,
  name: SITE.name,
  url: `${BASE}/`,
  telephone: SITE.phone.e164,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${SITE.address.street}, ${SITE.address.locality}`,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: String(SITE.address.geo.lat),
    longitude: String(SITE.address.geo.lng),
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  department: [{ "@id": `${BASE}/#hotel` }, { "@id": `${BASE}/#restaurant` }],
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
  address: {
    "@type": "PostalAddress",
    streetAddress: `${SITE.address.street}, ${SITE.address.locality}`,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
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

export function jsonLdScript(data: object) {
  return { __html: JSON.stringify(data) };
}
