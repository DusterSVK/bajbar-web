import { ImageResponse } from "next/og";
import { site } from "@/lib/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Bajbar Services, výškové čistenie a práca vo výške";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #1f4e8c 0%, #142a49 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "white",
              color: "#1f4e8c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 900,
            }}
          >
            BS
          </div>
          <div style={{ fontSize: 34, fontWeight: 800 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            Výškové čistenie a práca vo výške
          </div>
          <div style={{ fontSize: 30, color: "#b2cceb" }}>
            Čistenie fasád · Okná vo výškach · Čistenie budov · Bratislava
          </div>
        </div>

        <div style={{ fontSize: 26, color: "#82abd9" }}>{site.domain}</div>
      </div>
    ),
    { ...size }
  );
}
