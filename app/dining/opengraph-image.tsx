import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";
export const alt = "ARK Kitchen — 100% Pure Vegetarian Restaurant, ARK Hotels Ranchi";
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
          background: "#F5F1EA",
          color: "#1B1A17",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.01em" }}>
            ARK <span style={{ color: "#8A6736" }}>Hotels</span>
          </div>
          <div style={{ fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A7468" }}>
            Kokar · Ranchi · Jharkhand
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#5C8A5A" }}>
            100% Pure Vegetarian · Rooftop · Open All Day
          </div>
          <div style={{ fontSize: 96, fontWeight: 400, lineHeight: 0.92, letterSpacing: "-0.03em", color: "#1B1A17" }}>
            ARK<br />Kitchen
          </div>
          <div style={{ fontSize: 22, color: "#5A5650", maxWidth: 900, marginTop: 8 }}>
            North Indian · Indo-Chinese · Veg Breakfast · 100+ menu items
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid #B8B0A0", paddingTop: 24 }}>
          <div style={{ fontSize: 18, color: "#3A3833" }}>
            Call · {SITE.phone.display}
          </div>
          <div style={{ fontSize: 16, color: "#7A7468" }}>
            arkhotelsranchi.in/dining
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
