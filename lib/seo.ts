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

export function absoluteUrl(path: `/${string}` = "/") {
  return `${SITE.url}${path === "/" ? "/" : path}`;
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
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
