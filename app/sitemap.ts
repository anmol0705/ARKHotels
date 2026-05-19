import type { MetadataRoute } from "next";
import { ROOMS, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/rooms`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/dining`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/business`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/explore`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
  ];

  const roomPages: MetadataRoute.Sitemap = ROOMS.map((r) => ({
    url: `${base}/rooms/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...roomPages];
}
