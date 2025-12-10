import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * Premium OGP for /[hex] page
 * Museum style design similar to share card
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const hex = searchParams.get("hex") || "000000";
  const color = `#${hex.replace("#", "")}`;

  // Calculate OKLCH-like values for display (simplified for edge runtime)
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Approximate lightness (0-100)
  const lightness = Math.round(
    ((r * 0.299 + g * 0.587 + b * 0.114) / 255) * 100
  );

  // Approximate hue (simplified)
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let hue = 0;
  if (delta !== 0) {
    if (max === r) hue = ((g - b) / delta) % 6;
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;
    hue = Math.round(hue * 60);
    if (hue < 0) hue += 360;
  }

  // Approximate chroma (0-0.4)
  const chroma = ((delta / 255) * 0.4).toFixed(2);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fafafa",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Color Circle */}
        <div
          style={{
            width: 320,
            height: 320,
            borderRadius: "50%",
            backgroundColor: color,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            marginBottom: 48,
          }}
        />

        {/* Hex Code */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            color: "#1a1a1a",
            letterSpacing: "0.05em",
            marginBottom: 24,
          }}
        >
          {color.toUpperCase()}
        </div>

        {/* OKLCH Values */}
        <div
          style={{
            display: "flex",
            gap: 32,
            fontSize: 24,
            color: "#666",
            fontFamily: "monospace",
          }}
        >
          <span>L:{lightness}</span>
          <span>C:{chroma}</span>
          <span>H:{hue}°</span>
        </div>

        {/* Branding Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "0 64px",
          }}
        >
          <span style={{ fontSize: 28, color: "#1a1a1a", fontWeight: 500 }}>
            24bitColors
          </span>
          <span style={{ fontSize: 28, color: "#666" }}>#24bitColors</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
