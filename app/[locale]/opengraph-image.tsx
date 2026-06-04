import { ImageResponse } from "next/og";
import {
  defaultLocale,
  getDictionary,
  isLocale,
} from "@/lib/i18n";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(circle at 15% 20%, #2d5215 0%, transparent 50%), radial-gradient(circle at 85% 80%, #4a8418 0%, transparent 45%), #0d1014",
          color: "white",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 9999,
              background: "#7cc42a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 42,
              color: "#0d1014",
            }}
          >
            B
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 800, fontSize: 28 }}>Barca FM</span>
            <span
              style={{
                fontSize: 16,
                color: "#7cc42a",
                letterSpacing: 4,
                fontWeight: 700,
              }}
            >
              99.6 FM
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 24,
              color: "#7cc42a",
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Ponte da Barca · Minho
          </span>
          <h1
            style={{
              fontSize: 78,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: -2,
              margin: 0,
              maxWidth: 980,
            }}
          >
            {dict.home.headline}
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.6)",
            fontSize: 20,
          }}
        >
          <span>{dict.home.subhead.split(".")[0]}</span>
          <span>barcafm.pt</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
