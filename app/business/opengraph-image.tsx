import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";
export const alt = "ARK Hotels Ranchi — Business Hotel near Birsa Munda Airport, GST Invoice";
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
            For Business Travellers
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A8814B" }}>
            9 km from Birsa Munda Airport · Kokar, Ranchi
          </div>
          <div style={{ fontSize: 68, fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.02em", color: "#F5F1EA", maxWidth: 950 }}>
            Built for the two-night work trip.
          </div>
          <div style={{ display: "flex", gap: 32, marginTop: 8 }}>
            {["Free Parking", "GST Invoice", "24-hr Desk", "Free WiFi", "Pure Veg Meals"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, color: "#9A9490" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#A8814B" }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid #3A3833", paddingTop: 24 }}>
          <div style={{ fontSize: 18, color: "#9A9490" }}>
            Front desk · {SITE.phone.display}
          </div>
          <div style={{ fontSize: 16, color: "#5A5650" }}>
            arkhotelsranchi.in/business
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
