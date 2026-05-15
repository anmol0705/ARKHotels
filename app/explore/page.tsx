import type { Metadata } from "next";
import { ExploreClient } from "./ExploreClient";
import { SITE } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Explore Ranchi | Local Guide to Business Hubs & Leisure",
  description: "Discover nearby business districts, government offices, waterfalls, temples, and transit hubs just minutes from ARK Hotels in Kokar, Ranchi.",
  alternates: { canonical: "/explore" },
};

export default function ExplorePage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: `${SITE.url}/` },
    { name: "Explore Ranchi", url: `${SITE.url}/explore` },
  ]);

  return (
    <>
      <ExploreClient />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)}
      />
    </>
  );
}
