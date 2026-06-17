import type { Metadata } from "next";
import { ExploreClient } from "./ExploreClient";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Explore Ranchi | Waterfalls, Temples, Business Hubs Near ARK Hotels",
  description:
    "Near ARK Hotels, Kokar Ranchi: Dassam Falls, Hundru Falls, Pahari Mandir, Patratu Valley, Netarhat. Business hubs: HEC, MECON, Passport Office — all within 90 min.",
  path: "/explore",
  image: "/images/explore/ranchi-junction.webp",
  imageAlt: "Ranchi local travel reference near ARK Hotels Ranchi",
});

export default function ExplorePage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: `${SITE.url}/` },
    { name: "Explore Ranchi", url: `${SITE.url}/explore` },
  ]);

  return (
    <>
      <h1 className="sr-only">Explore Ranchi — Places to Visit Near ARK Hotels, Kokar</h1>
      <ExploreClient />
      <JsonLd id="explore-breadcrumb-jsonld" data={breadcrumbs} />
    </>
  );
}
