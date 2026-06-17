import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GalleryGrid, type GalleryImage } from "@/components/gallery/GalleryGrid";
import { SITE, whatsappHref } from "@/lib/site";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Hotel Photos - Rooms, Restaurant & Lobby | ARK Hotels Ranchi",
  description:
    "Browse photos of ARK Hotels, Kokar Ranchi - AC rooms, ARK Kitchen 100% pure veg rooftop restaurant, hotel lobby, and exterior.",
  path: "/gallery",
  image: "/images/gallery/hotel/ark_reception-2.webp",
  imageAlt: "Reception seating at ARK Hotels Ranchi",
});

const CATEGORIES = ["Hotel & Lobby", "Rooms", "ARK Kitchen"];

const CURATED_GALLERY: GalleryImage[] = [
  {
    src: "/images/gallery/hotel/ark_out_image.webp",
    alt: "ARK Hotels exterior in Kokar, Ranchi",
    caption: "ARK Hotels, Kokar — three floors, ground-floor reception, free on-site parking",
    category: "Hotel & Lobby",
    width: 1688,
    height: 2136,
  },
  {
    src: "/images/gallery/hotel/ark_reception-2.webp",
    alt: "Reception desk and lobby seating at ARK Hotels Ranchi",
    caption: "Reception — 24-hr front desk, check-in in under 5 minutes, GST invoice on checkout",
    category: "Hotel & Lobby",
    width: 1920,
    height: 1080,
  },
  {
    src: "/images/gallery/hotel/ARK_hall_stairs.webp",
    alt: "Staircase and hallway at ARK Hotels Ranchi",
    caption: "Well-lit corridors — housekeeping clears by noon, fresh linen daily",
    category: "Hotel & Lobby",
    width: 6000,
    height: 3376,
  },
  {
    src: "/images/gallery/hotel/DSC01228.webp",
    alt: "Open terrace area at ARK Hotels Ranchi",
    caption: "Open terrace on the ground floor — quiet corner away from the road",
    category: "Hotel & Lobby",
    width: 4000,
    height: 6000,
  },
  {
    src: "/images/gallery/hotel/IMG_6254.webp",
    alt: "Evening rooftop dining area at ARK Kitchen Ranchi",
    caption: "ARK Kitchen rooftop in the evening — city views, 100% pure vegetarian menu",
    category: "ARK Kitchen",
    width: 4032,
    height: 3024,
  },
  {
    src: "/images/gallery/hotel/IMG_6255.webp",
    alt: "Garden-lit rooftop seating at ARK Hotels Ranchi",
    caption: "Rooftop garden seating — good for a slow dinner after a long day in the city",
    category: "Hotel & Lobby",
    width: 3024,
    height: 4032,
  },
  {
    src: "/images/gallery/rooms/delux_double_room.webp",
    alt: "Deluxe Double room at ARK Hotels Ranchi",
    caption: "Deluxe Double — double bed, dedicated work desk, blackout curtains, AC",
    category: "Rooms",
    width: 1600,
    height: 900,
  },
  {
    src: "/images/gallery/rooms/room_image.webp",
    alt: "Double room with seating at ARK Hotels Ranchi",
    caption: "In-room seating — a place to sit that is not the bed",
    category: "Rooms",
    width: 252,
    height: 168,
  },
  {
    src: "/images/gallery/rooms/delux_single_room.webp",
    alt: "Deluxe Single room at ARK Hotels Ranchi",
    caption: "Deluxe Single — compact and clean, priced for one person travelling alone",
    category: "Rooms",
    width: 1024,
    height: 576,
  },
  {
    src: "/images/gallery/rooms/super_double_room.webp",
    alt: "Super Double room at ARK Hotels Ranchi",
    caption: "Super Double — more floor space, larger bathroom, wardrobe that fits a week's luggage",
    category: "Rooms",
    width: 1024,
    height: 460,
  },
  {
    src: "/images/gallery/rooms/DSC01116.webp",
    alt: "Bathroom in an ARK Hotels room",
    caption: "Hot water available 24 hours — no morning-slot timing games",
    category: "Rooms",
    width: 3376,
    height: 6000,
  },
  {
    src: "/images/gallery/rooms/DSC01112.webp",
    alt: "Tea and coffee setup in an ARK Hotels room",
    caption: "Tea and coffee tray in every room — refilled by housekeeping daily",
    category: "Rooms",
    width: 6000,
    height: 3376,
  },
  {
    src: "/images/gallery/rooms/DSC01123.webp",
    alt: "Double room with work corner at ARK Hotels Ranchi",
    caption: "Work corner — desk lamp, two power points within reach, fast WiFi",
    category: "Rooms",
    width: 6000,
    height: 3376,
  },
  {
    src: "/images/gallery/restaurant/restro2.webp",
    alt: "Restaurant seating at ARK Kitchen Ranchi",
    caption: "ARK Kitchen indoor section — good for a working lunch or an early dinner",
    category: "ARK Kitchen",
    width: 1080,
    height: 1080,
  },
  {
    src: "/images/gallery/restaurant/restro4.webp",
    alt: "Dining area at ARK Kitchen, ARK Hotels Kokar Ranchi",
    caption: "ARK Kitchen — warm lighting, relaxed pace, pure vegetarian menu",
    category: "ARK Kitchen",
    width: 1080,
    height: 1080,
  },
  {
    src: "/images/DSC01243.webp",
    alt: "Rooftop restaurant area at ARK Hotels Ranchi",
    caption: "Rooftop dining area — open from breakfast through late evening, seven days",
    category: "ARK Kitchen",
    width: 6000,
    height: 3376,
  },
  {
    src: "/images/gallery/restaurant/baby_corn_chilli.webp",
    alt: "Baby corn chilli at ARK Kitchen Ranchi",
    caption: "Baby corn chilli — consistently the most re-ordered starter",
    category: "ARK Kitchen",
    width: 275,
    height: 183,
  },
  {
    src: "/images/gallery/restaurant/food.webp",
    alt: "Paneer tikka platter at ARK Kitchen Ranchi",
    caption: "Paneer tikka — marinated overnight, grilled to order, not pre-made",
    category: "ARK Kitchen",
    width: 253,
    height: 181,
  },
  {
    src: "/images/gallery/restaurant/paneer_butter_masala.webp",
    alt: "Paneer butter masala served at ARK Kitchen Ranchi",
    caption: "Paneer butter masala — the ARK Kitchen staple, ordered by most tables",
    category: "ARK Kitchen",
    width: 500,
    height: 500,
  },
  {
    src: "/images/gallery/restaurant/paneer_chilli.webp",
    alt: "Paneer chilli served at ARK Kitchen Ranchi",
    caption: "Paneer chilli — Indo-Chinese, tossed not stir-fried, consistently requested",
    category: "ARK Kitchen",
    width: 500,
    height: 375,
  },
  {
    src: "/images/gallery/restaurant/paneer_tikka.webp",
    alt: "Paneer tikka served at ARK Kitchen Ranchi",
    caption: "Paneer tikka skewers — smoky, not dry",
    category: "ARK Kitchen",
    width: 251,
    height: 170,
  },
  {
    src: "/images/gallery/restaurant/restaurant-ambiance-03.webp",
    alt: "Vegetarian noodles served at ARK Kitchen Ranchi",
    caption: "Hakka noodles — tossed properly, not just boiled and plated",
    category: "ARK Kitchen",
    width: 1536,
    height: 1169,
  },
  {
    src: "/images/gallery/restaurant/restaurant-dining-01.webp",
    alt: "Vegetarian starter served at ARK Kitchen Ranchi",
    caption: "Mixed vegetarian platter — good share for two, or an evening snack alone",
    category: "ARK Kitchen",
    width: 1204,
    height: 1600,
  },
];

export default function GalleryPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: `${SITE.url}/` },
    { name: "Gallery", url: `${SITE.url}/gallery` },
  ]);

  return (
    <>
      <section className="container-page pt-12 lg:pt-20 pb-12">
        <Eyebrow>Gallery</Eyebrow>
        <h1 className="mt-4 font-display text-[34px] sm:text-[52px] lg:text-[64px] leading-[1.06] tracking-[-0.02em] text-ink max-w-[20ch]">
          The rooms, the rooftop, the hotel.
        </h1>
        <p className="mt-6 text-[18px] text-ink-soft max-w-[56ch] leading-[1.65]">
          A focused look around ARK Hotels - from the rooms to ARK Kitchen upstairs.
        </p>
      </section>

      <section className="container-page pb-24 lg:pb-32">
        <GalleryGrid images={CURATED_GALLERY} categories={CATEGORIES} />
        <div className="mt-14 border-t border-stone-100 pt-10 lg:pt-12 grid grid-cols-12 gap-6 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow>Ready to book?</Eyebrow>
            <p className="mt-3 font-display text-[24px] lg:text-[32px] leading-[1.2] tracking-[-0.01em] text-ink max-w-[34ch]">
              Like what you see? Call or WhatsApp the front desk to check room
              availability.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-3">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-[#25D366] text-white text-[14px] font-medium rounded-[2px] hover:bg-[#1ebe5d] transition-colors"
            >
              WhatsApp to Book
            </a>
            <a
              href={SITE.phone.tel}
              className="inline-flex items-center justify-center px-6 py-3.5 bg-ink text-paper text-[14px] font-medium rounded-[2px] hover:bg-brass-deep transition-colors"
            >
              Call Front Desk
            </a>
          </div>
        </div>
      </section>

      <JsonLd id="gallery-breadcrumb-jsonld" data={breadcrumbs} />
    </>
  );
}
