import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hex = searchParams.get("hex") || "000000";
  const name = searchParams.get("name") || "Unknown Color";
  const color = `#${hex.replace("#", "")}`;

  // Determine text color based on brightness
  // Simple check: RGB average or just simplistic L check
  // Since we are in OG environment (minimal deps), approximate.
  // We'll just default to white text with shadow for safety on any background.

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
          backgroundColor: color,
          fontFamily: "serif", // OG supports standard fonts or loaded fonts
          position: "relative",
        }}
      >
        {/* Grain overlay or subtle texture if possible? CSS radial gradient works */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.1) 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          {/* Small Label */}
          <div
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: 24,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Your True Color
          </div>

          {/* Main Name */}
          <div
            style={{
              color: "white",
              fontSize: 80,
              fontWeight: "bold",
              letterSpacing: "0.05em",
              textAlign: "center",
              textShadow: "0 4px 12px rgba(0,0,0,0.3)",
              padding: "0 40px",
            }}
          >
            {name}
          </div>

          {/* Hex Code */}
          <div
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: 40,
              fontFamily: "monospace",
              letterSpacing: "0.1em",
              marginTop: 20,
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            {color.toUpperCase()}
          </div>
        </div>

        {/* Branding Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            color: "rgba(255,255,255,0.6)",
            fontSize: 20,
            letterSpacing: "0.1em",
          }}
        >
          24bitColors.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
