import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";
export const alt = "ARK Hotels Ranchi — AC Rooms in Kokar, 9 km from Airport";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1B1A17",
          color: "#F5F1EA",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.01em", color: "#F5F1EA" }}>
            ARK <span style={{ color: "#A8814B" }}>Hotels</span>
          </div>
          <div style={{ fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A7468" }}>
            Rooms &amp; Tariff
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A8814B" }}>
            Three room types · All air-conditioned
          </div>
          <div style={{ fontSize: 72, fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#F5F1EA", maxWidth: 900 }}>
            Deluxe Single, Double &amp; Super Double.
          </div>
          <div style={{ fontSize: 22, color: "#9A9490", maxWidth: 860 }}>
            Free WiFi · Work desk · Hot water · 100% pure veg breakfast · GST invoice
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid #3A3833", paddingTop: 24 }}>
          <div style={{ fontSize: 18, color: "#9A9490" }}>
            Book direct · {SITE.phone.display}
          </div>
          <div style={{ fontSize: 16, color: "#5A5650" }}>
            arkhotelsranchi.in/rooms
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
