import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GalleryGrid, type GalleryImage } from "@/components/gallery/GalleryGrid";
import { SITE } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Hotel Photos — Rooms, Restaurant & Lobby | ARK Hotels Ranchi",
  description:
    "Browse photos of ARK Hotels, Kokar Ranchi — AC rooms, ARK Kitchen 100% pure veg rooftop restaurant, hotel lobby, and exterior. 23 rooms across 3 floors in Kokar.",
  alternates: { canonical: `${SITE.url}/gallery` },
};

const CATEGORY_LABELS: Record<string, string> = {
  hotel:      "Hotel & Lobby",
  rooms:      "Rooms",
  restaurant: "ARK Kitchen",
};

function readGallery(): { images: GalleryImage[]; categories: string[] } {
  const galleryRoot = path.join(process.cwd(), "public", "images", "gallery");
  const IMAGE_EXT = /\.(jpg|jpeg|png|webp|avif)$/i;
  const images: GalleryImage[] = [];
  const categorySet = new Set<string>();

  try {
    const entries = fs.readdirSync(galleryRoot, { withFileTypes: true });

    // Subfolders → categories
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith("old_")) {
        const slug = entry.name;
        const label = CATEGORY_LABELS[slug] ?? slug.replace(/-/g, " ");
        const subDir = path.join(galleryRoot, slug);

        try {
          const files = fs.readdirSync(subDir).filter((f) => IMAGE_EXT.test(f));
          if (files.length > 0) {
            categorySet.add(label);
            for (const file of files) {
              images.push({
                src: `/images/gallery/${slug}/${file}`,
                alt:  `${label} — ARK Hotels Ranchi`,
                category: label,
              });
            }
          }
        } catch {
          // skip unreadable subfolder
        }
      }
    }

    // Root-level images (no category) → "General"
    const rootFiles = entries
      .filter((e) => e.isFile() && IMAGE_EXT.test(e.name))
      .map((e) => e.name);

    if (rootFiles.length > 0) {
      categorySet.add("General");
      for (const file of rootFiles) {
        images.push({
          src: `/images/gallery/${file}`,
          alt:  `ARK Hotels Ranchi`,
          category: "General",
        });
      }
    }
  } catch {
    // gallery folder doesn't exist yet — return empty
  }

  // Preferred category order
  const ORDER = ["Hotel & Lobby", "Rooms", "ARK Kitchen", "General"];
  const categories = [...categorySet].sort(
    (a, b) => (ORDER.indexOf(a) === -1 ? 99 : ORDER.indexOf(a)) - (ORDER.indexOf(b) === -1 ? 99 : ORDER.indexOf(b))
  );

  return { images, categories };
}

export default function GalleryPage() {
  const { images, categories } = readGallery();
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home",    url: `${SITE.url}/` },
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
          A look around ARK Hotels — from the rooms to ARK Kitchen upstairs.
        </p>
      </section>

      <section className="container-page pb-24 lg:pb-32">
        {images.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-stone-200 rounded-[2px]">
            <p className="text-ink-soft text-[15px]">Photos coming soon.</p>
            <p className="mt-2 text-stone-400 text-[13px]">
              Add images to <code className="font-mono text-[12px]">public/images/gallery/</code>
            </p>
          </div>
        ) : (
          <GalleryGrid images={images} categories={categories} />
        )}
      </section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)}
      />
    </>
  );
}
