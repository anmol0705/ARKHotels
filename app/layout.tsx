import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { ScrollReset } from "@/components/layout/ScrollReset";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/shared/JsonLd";
import {
  hotelJsonLd,
  organizationJsonLd,
  restaurantJsonLd,
  webSiteJsonLd,
} from "@/lib/jsonld";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "ARK Hotels Ranchi | Hotel in Kokar — 9 km from Airport",
    template: "%s | ARK Hotels Ranchi",
  },
  description:
    "ARK Hotels in Kokar, Ranchi — 9 km from Birsa Munda Airport. 100% pure vegetarian restaurant, AC rooms, free WiFi, free parking. GST invoicing. Call or WhatsApp to book.",
  applicationName: "ARK Hotels Ranchi",
  authors: [{ name: "ARK Hotels" }],
  alternates: {
    canonical: `${SITE.url}/`,
  },
  icons: {
    icon: [{ url: "/images/logo/LOGO.webp", type: "image/webp" }],
    apple: "/images/logo/LOGO.webp",
    shortcut: "/images/logo/LOGO.webp",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: "ARK Hotels Ranchi",
    title: "ARK Hotels Ranchi | Hotel in Kokar — 9 km from Airport",
    description:
      "Hotel in Kokar, Ranchi — 9 km from Birsa Munda Airport. 100% pure vegetarian restaurant, AC rooms, free WiFi & parking. GST invoicing. Call or WhatsApp to book.",
    images: [
      {
        url: "/images/hero_carousel/ark_out_image.webp",
        width: 1200,
        height: 630,
        alt: "ARK Hotels — hotel exterior in Kokar, Ranchi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARK Hotels Ranchi | Hotel in Kokar — 9 km from Airport",
    description:
      "Hotel in Kokar, Ranchi — 9 km from Birsa Munda Airport. 100% pure veg restaurant, AC rooms, free WiFi & parking. Call or WhatsApp to book.",
    images: ["/images/hero_carousel/ark_out_image.webp"],
  },
  robots: { index: true, follow: true },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  /*
   * Match the header's bg-parchment colour (#EBE4D6) exactly — not the
   * slightly lighter bg-paper (#F5F1EA).  On iPhone 15, iOS uses theme-color
   * to tint the status-bar / Dynamic Island chrome, so a mismatch between
   * theme-color and the actual header background creates a visible seam.
   */
  themeColor: "#EBE4D6",
  width: "device-width",
  initialScale: 1,
  /*
   * viewport-fit=cover: the rendered viewport extends edge-to-edge behind the
   * Dynamic Island and home-indicator bar.  We then push the header's content
   * down with env(safe-area-inset-top) padding so nothing is obscured.
   * Without this, iOS renders a gap between the Dynamic Island and the header
   * that shows the bare html background — the "broken" look on iPhone 15.
   */
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col bg-paper text-ink">
        <ScrollReset />
        <Header />
        {/* Spacer — header is position:fixed so it's out of normal flow.
            This div holds the header's height so page content starts below it. */}
        <div style={{ height: "var(--header-h)" }} className="shrink-0" aria-hidden="true" />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFab />
        <GoogleAnalytics gaId="G-5TEWHW5WG6" />
        <JsonLd id="website-jsonld" data={webSiteJsonLd} />
        <JsonLd id="organization-jsonld" data={organizationJsonLd} />
        <JsonLd id="hotel-jsonld" data={hotelJsonLd} />
        <JsonLd id="restaurant-jsonld" data={restaurantJsonLd} />
      </body>
    </html>
  );
}
