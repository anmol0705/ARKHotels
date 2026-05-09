import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { SITE } from "@/lib/site";
import {
  hotelJsonLd,
  localBusinessJsonLd,
  organizationJsonLd,
  restaurantJsonLd,
  jsonLdScript,
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
    default: "ARK Hotels Ranchi — Budget Business Hotel in Kokar",
    template: "%s — ARK Hotels Ranchi",
  },
  description:
    "23-room business hotel in Kokar, 9 km from Birsa Munda Airport. AC rooms, free WiFi, free parking, in-house veg restaurant. GST invoice on checkout.",
  applicationName: "ARK Hotels Ranchi",
  authors: [{ name: "ARK Hotels" }],
  keywords: [
    "ARK Hotels Ranchi",
    "budget hotel Ranchi",
    "business hotel Ranchi",
    "hotel near Birsa Munda Airport",
    "hotel in Kokar Ranchi",
    "vegetarian restaurant Kokar",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: "ARK Hotels Ranchi — Budget Business Hotel in Kokar",
    description:
      "23-room business hotel in Kokar, 15 minutes from Birsa Munda Airport. Free WiFi, free parking, in-house veg restaurant.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARK Hotels Ranchi — Budget Business Hotel in Kokar",
    description:
      "23-room business hotel in Kokar, 15 minutes from Birsa Munda Airport. Free WiFi, free parking, in-house veg restaurant.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F5F1EA",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-dvh flex flex-col bg-paper text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFab />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd)}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={jsonLdScript(hotelJsonLd)}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={jsonLdScript(restaurantJsonLd)}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={jsonLdScript(localBusinessJsonLd)}
        />
      </body>
    </html>
  );
}

