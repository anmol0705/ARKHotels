// Single source of truth for hotel facts. Mirrors docs/01-brief.md.
// Update both files together.

export const SITE = {
  name: "ARK Hotels",
  legalName: "ARK Hotels Ranchi",
  tagline: "A clean room. A hot meal. An early checkout. Handled.",
  url: "https://arkhotelsranchi.in",
  locale: "en-IN",

  phone: {
    display: "0651 3100536",
    e164: "+916513100536",
    tel: "tel:+916513100536",
  },
  whatsapp: {
    display: "+91 99558 88780",
    e164: "+919955888780",
    message:
      "Hello ARK Hotels, I'd like to enquire about a room. My dates are [arrival] to [departure], for [number] guests. Please share availability and rate. Thanks.",
  },

  address: {
    street: "Don Bosco School Lane-1, Old HB Road",
    locality: "Kokar",
    city: "Ranchi",
    region: "Jharkhand",
    postalCode: "834001",
    country: "IN",
    short: "Kokar, Ranchi · Old HB Road",
    full: "Don Bosco School Lane-1, Old HB Road, Kokar, Ranchi, Jharkhand 834001",
    googleMaps: "https://www.google.com/maps/place/ARK+Hotels/@23.3709389,85.3518747,17z",
    directions: "https://www.google.com/maps/dir/?api=1&destination=ARK+Hotels+Don+Bosco+School+Lane+Kokar+Ranchi",
    // Approximate Kokar coordinates — verify with property pin before launch.
    geo: { lat: 23.4053, lng: 85.3344 },
  },

  hotel: {
    rooms: 23,
    floors: 3,
    starRating: 3,
    checkIn: "12:00",
    checkOut: "11:30",
    rating: { value: 4.8, count: 25 },
  },

  email: "stay@arkhotelsranchi.in",
} as const;



export const NAV: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Rooms", href: "/rooms" },
  { label: "The Restaurant", href: "/dining" },
  { label: "For Business Travellers", href: "/business" },
  { label: "Gallery", href: "/gallery" },
  { label: "Explore Ranchi", href: "/explore" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  Stay: [
    { label: "Rooms", href: "/rooms" },
    { label: "For business travellers", href: "/business" },
    { label: "Talk to the front desk", href: "/contact" },
  ],
  "The hotel": [
    { label: "The restaurant", href: "/dining" },
    { label: "Photo gallery", href: "/gallery" },
    { label: "Explore Ranchi", href: "/explore" },
  ],
  Useful: [
    { label: "FAQs", href: "/contact#faqs" },
    { label: "GST & invoicing", href: "/business#billing" },
    { label: "Cancellation policy", href: "/contact#policies" },
  ],
} as const;

// Rates: Deluxe Double and Super Deluxe rates are sourced from EaseMyTrip
// listing. Premium/Executive and Family Suite are described as "4 room types"
// on MakeMyTrip but specific rates were not surfaced — keep "Tariff on call"
// until the front desk confirms them.
export const ROOMS = [
  {
    slug: "deluxe-single",
    index: "01",
    name: "Deluxe Single Room",
    size: "Ideal for solo travelers",
    short: "A comfortable, efficient space tailored for the solo business traveler.",
    description:
      "Features a single bed, a dedicated work desk, and all the essential amenities for a productive stay without the extra cost of a larger room.",
    features: [
      "Single bed, AC, room heater for winter",
      "City-view window, blackout curtains",
      "Work desk, free WiFi, LCD TV",
      "Private bath with hot water and fresh towels daily",
    ],
    images: [
      { src: "/images/rooms/delux_single_room/delux_single_room.webp", alt: "Deluxe Single room at ARK Hotels Ranchi" },
      { src: "/images/rooms/delux_single_room/DSC01112.webp",           alt: "Deluxe Single room detail, ARK Hotels Ranchi" },
    ],
    image: {
      src: "/images/rooms/delux_single_room/delux_single_room.webp",
      alt: "Deluxe Single room, ARK Hotels Ranchi",
    },
  },
  {
    slug: "deluxe-double",
    index: "02",
    name: "Deluxe Double Room",
    size: "Ideal for couples or solo travelers",
    short: "The standard ARK room, and the one most business guests book.",
    description:
      "City-facing window, double bed, and a writing desk that fits a laptop and a file folder without crowding the room.",
    features: [
      "Double bed, AC, room heater for winter",
      "City-view window, blackout curtains",
      "Work desk, free WiFi, LCD TV, tea/coffee tray",
      "Private bath with hot water and fresh towels daily",
    ],
    images: [
      { src: "/images/rooms/delux_double_room/delux_double_room.webp", alt: "Deluxe Double room at ARK Hotels Ranchi" },
      { src: "/images/rooms/delux_double_room/DSC01112.webp",          alt: "Deluxe Double room detail, ARK Hotels Ranchi" },
    ],
    image: {
      src: "/images/rooms/delux_double_room/delux_double_room.webp",
      alt: "Deluxe Double room, ARK Hotels Ranchi",
    },
  },
  {
    slug: "super-double",
    index: "03",
    name: "Super Double Room",
    size: "Larger than Deluxe",
    short: "A larger version of the Deluxe Double with more floor space and a more generous bathroom.",
    description:
      "A good pick for longer stays, or anyone who'd rather not feel cramped after a 12-hour day.",
    features: [
      "Larger floor area with wardrobe",
      "More spacious bathroom with hot water",
      "Work desk, free WiFi, LCD TV",
      "Tea and coffee tray, AC and room heater",
    ],
    images: [
      { src: "/images/rooms/super_delux_room/super_double_room.webp", alt: "Super Double room at ARK Hotels Ranchi" },
      { src: "/images/rooms/super_delux_room/DSC01112.webp",          alt: "Super Double room detail, ARK Hotels Ranchi" },
      { src: "/images/rooms/super_delux_room/DSC01123.webp",          alt: "Super Double room view, ARK Hotels Ranchi" },
    ],
    image: {
      src: "/images/rooms/super_delux_room/super_double_room.webp",
      alt: "Super Double room, ARK Hotels Ranchi",
    },
  },
] as const;

export type Room = (typeof ROOMS)[number];

// Hero rotating slides — four atmospheric "stories" the property tells.
// Each slide pairs a photograph with an eyebrow + headline + supporting line
// so the rotation is editorial, not a generic image carousel.
export const HERO_SLIDES = [
  {
    image:
      "/images/hero_carousel/ark_out_image.webp",
    alt: "Hotel exterior in Kokar, Ranchi at morning light",
    eyebrow: "Kokar, Ranchi · 15 min from the airport",
    headline: "A smart, professional stay in Ranchi — handled with care.",
    supporting:
      "100% pure vegetarian kitchen, free parking, and a front desk awake when your flight lands. A clean, well-run hotel trusted by business travellers and families in Kokar.",
    primaryHref: "/rooms",
    primaryLabel: "See the rooms",
  },
  {
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&q=80",
    alt: "ARK Kitchen vegetarian restaurant at ARK Hotels, Kokar",
    eyebrow: "ARK Kitchen · Pure veg · open all day",
    headline: "Home-style food, prepared with quiet care.",
    supporting:
      "One in-house vegetarian restaurant. North-Indian classics, Indo-Chinese favourites, and breakfast served daily.",
    primaryHref: "/dining",
    primaryLabel: "See the restaurant",
  },
  {
    image:
      "/images/hero_carousel/room_image.webp",
    alt: "Executive room work setup at ARK Hotels",
    eyebrow: "Built for the two-night work trip",
    headline: "A clean room. A hot meal. An early checkout. Handled.",
    supporting:
      "Meetings at HEC, visits to Lalpur, Khelgaon, Dipatoli or BIT Mesra — the routines are tuned for that.",
    primaryHref: "/business",
    primaryLabel: "For business travellers",
  },
  {
    image:
      "/images/hero_carousel/reception_image.webp",
    alt: "Lobby corridor at ARK Hotels in the evening",
    eyebrow: "Front desk · 24 hours",
    headline: "An early flight, a late check-in. Both handled.",
    supporting:
      "Nine kilometres from Birsa Munda Airport. The desk is awake when you arrive, regardless of what the boarding pass says.",
    primaryHref: "/contact",
    primaryLabel: "Talk to the front desk",
  },
] as const;

export type HeroSlide = (typeof HERO_SLIDES)[number];

export const NEARBY_BUSINESS = [
  { place: "Samford Hospital", distance: "~1 km", time: "3–5 min", note: "Major multi-speciality hospital on Old HB Road — the closest referral facility to the hotel." },
  { place: "Kokar Industrial Area", distance: "~1 km", time: "5 min", note: "On the doorstep — walking distance for vendors, suppliers, and factory visits." },
  { place: "Upper Bazar", distance: "~3 km", time: "8–10 min", note: "Ranchi's main wholesale and retail commercial market." },
  { place: "Lalpur", distance: "~4 km", time: "10–12 min", note: "Key offices, banks, and the commercial hub of central Ranchi." },
  { place: "Dipatoli", distance: "~4 km", time: "10–12 min", note: "Government offices and administrative zone." },
  { place: "Passport Office", distance: "~5 km", time: "12–15 min", note: "Regional Passport Seva Kendra, Ranchi — for applicant visits and official delegations." },
  { place: "Khadgarha Bus Stand", distance: "~3 km", time: "8–10 min", note: "ISBT Khadgarha — connects Ranchi to all major districts in Jharkhand, Bihar, and West Bengal." },
  { place: "Ranchi Junction", distance: "~6 km", time: "15–20 min", note: "Main railway station — direct trains to Delhi, Mumbai, Kolkata." },
  { place: "Khelgaon", distance: "~6 km", time: "15 min", note: "Jharkhand's sports complex — events, national training camps, and tournaments." },
  { place: "PSU Belt — HEC & MECON, Dhurwa", distance: "~8 km", time: "20–25 min", note: "Heavy Engineering Corporation and MECON headquarters — the primary PSU corridor in Ranchi." },
  { place: "Birsa Munda Airport", distance: "9 km", time: "15–20 min", note: "Direct flights to Delhi, Kolkata, Mumbai, Hyderabad." },
  { place: "Namkum Industrial Area", distance: "~18 km", time: "30–35 min", note: "Ranchi's major industrial corridor — SAIL, ancillary units, and manufacturing facilities." },
  { place: "BIT Mesra", distance: "~22 km", time: "35–45 min", note: "Premier engineering institution — training programmes, campus visits, and faculty stays." },
] as const;

export const NEARBY_LEISURE = [
  { place: "Ranchi Lake", distance: "~4 km", time: "10–12 min", note: "A quiet evening walk around the lake — popular with locals." },
  { place: "Rock Garden", distance: "~5 km", time: "12–15 min", note: "A well-kept terraced park, good for a morning stroll." },
  { place: "Pahari Mandir", distance: "~5 km", time: "15 min", note: "The hilltop Shiva temple — quieter at sunrise than on weekends." },
  { place: "Tagore Hill", distance: "~6 km", time: "12–15 min", note: "The hill where Rabindranath Tagore wrote, overlooking the city. A short climb, good views, and a pleasant hour." },
  { place: "Jagannath Temple", distance: "~8 km", time: "20 min", note: "A 17th-century temple — architecturally worth the detour." },
  { place: "Nakshatra Van", distance: "~10 km", time: "20–25 min", note: "Botanical park, calm and uncrowded on weekday mornings." },
  { place: "Bhagwan Birsa Biological Park", distance: "~20 km", time: "35–40 min", note: "Allow half a day. Tigers, leopards, and a good walk through the forest." },
  { place: "Patratu Valley", distance: "~38 km", time: "50–60 min", note: "A scenic gorge around the Patratu Dam — good for a late afternoon drive, best in the cooler months." },
  { place: "Dassam Falls", distance: "~40 km", time: "60–70 min", note: "Wide, layered falls — best right after monsoon." },
  { place: "Jonha Falls", distance: "~40 km", time: "60–75 min", note: "Pair with lunch on the way back to town." },
  { place: "Hundru Falls", distance: "~45 km", time: "75–90 min", note: "Post-monsoon is the better season — significantly more water." },
  { place: "Sun Temple, Bundu", distance: "~48 km", time: "60–75 min", note: "A Surya Mandir on the Ranchi–Tata highway — clean architecture and far less crowded than the city temples." },
  { place: "McCluskieganj", distance: "~60 km", time: "90–110 min", note: "Anglo-Indian heritage village — a quiet, colonial-era retreat unlike anywhere else in Jharkhand." },
  { place: "Netarhat", distance: "~150 km", time: "3–3.5 hrs", note: "The 'Queen of Chotanagpur' — a hill resort at 3,622 ft, best known for sunrise from Magnolia Point. Plan for a full day or an overnight." },
] as const;

// Kept for backward compatibility with any component using the combined list
export const NEARBY = [
  ...NEARBY_BUSINESS.filter((n) =>
    ["Birsa Munda Airport", "Ranchi Junction", "Kokar Industrial Area", "Upper Bazar"].includes(n.place)
  ),
  ...NEARBY_LEISURE.filter((n) =>
    ["Pahari Mandir", "Ranchi Lake", "Bhagwan Birsa Biological Park", "Hundru Falls"].includes(n.place)
  ),
] as const;

export const FAQS = [
  {
    q: "Is parking free, and is there space for a sedan?",
    a: "Yes, parking is on-site and free for guests. The lot fits standard sedans and SUVs.",
  },
  {
    q: "Can I get a GST invoice on checkout?",
    a: "Yes. Share your company name and GSTIN at booking or at check-in, and the invoice is handed over at checkout — no follow-up email needed.",
  },
  {
    q: "Can I check in early if my flight lands at dawn?",
    a: "If a room is already ready, yes — at no extra charge. If not, leave your bag at the desk, freshen up, and we'll message you the moment housekeeping clears the room. Standard check-in is 12:00 PM.",
  },
  {
    q: "Is a late check-out possible?",
    a: "Subject to availability. Speak to the front desk on the morning of departure for the day's late-checkout policy and any applicable charge.",
  },
  {
    q: "Is breakfast included? What time is it served?",
    a: "Breakfast is included on most rates. Restaurant timings and in-room dining hours are confirmed at check-in.",
  },
  {
    q: "Can I get same-day laundry?",
    a: "Yes — laundry and dry-cleaning are available. Confirm same-day turnaround timings with the front desk when you hand the clothes in.",
  },
  {
    q: "Can the hotel arrange a cab to the airport?",
    a: "Yes — paid pickup and drop from Birsa Munda Airport in a sedan. Book ahead at the front desk or on WhatsApp; the approximate fare is shared at booking.",
  },
  {
    q: "Can my colleague pay for my room later, by bank transfer?",
    a: "Yes — corporate billing is supported. We can hold the booking against a confirmation email from the company and accept payment by NEFT or UPI within an agreed window. Speak to the front desk for the format.",
  },
] as const;

export function whatsappHref() {
  return `https://wa.me/${SITE.whatsapp.e164.replace("+", "")}?text=${encodeURIComponent(SITE.whatsapp.message)}`;
}
