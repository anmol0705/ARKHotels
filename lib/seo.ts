import type { Metadata } from "next";
import { SITE } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
};

const defaultImage = "/images/hero_carousel/ark_out_image.webp";
const defaultImageAlt = "ARK Hotels exterior in Kokar, Ranchi";

/** Converts a root-relative path to an absolute https:// URL. */
export function absoluteUrl(path: `/${string}` = "/") {
  return `${SITE.url}${path === "/" ? "/" : path}`;
}

/** Ensures an image path is always an absolute URL for OG/Twitter crawlers. */
function absoluteImageUrl(image: string): string {
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `${SITE.url}${image.startsWith("/") ? image : `/${image}`}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultImage,
  imageAlt = defaultImageAlt,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const absImage = absoluteImageUrl(image);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: "ARK Hotels Ranchi",
      title,
      description,
      images: [
        {
          url: absImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ARKHotelsRanchi",
      title,
      description,
      images: [absImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
