import type { Metadata } from "next";
import { ExploreClient } from "./ExploreClient";
import { SITE } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Explore Ranchi | Waterfalls, Temples, Business Hubs Near ARK Hotels",
  description:
    "Near ARK Hotels, Kokar Ranchi: Dassam Falls, Hundru Falls, Pahari Mandir, Patratu Valley, Netarhat. Business hubs: HEC, MECON, Passport Office — all within 90 min.",
  alternates: { canonical: `${SITE.url}/explore` },
};

export default function ExplorePage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: `${SITE.url}/` },
    { name: "Explore Ranchi", url: `${SITE.url}/explore` },
  ]);

  return (
    <>
      <h1 className="sr-only">Explore Ranchi — Places to Visit Near ARK Hotels, Kokar</h1>
      <ExploreClient />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)}
      />
    </>
  );
}
