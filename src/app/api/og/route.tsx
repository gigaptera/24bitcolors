import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type"); // "hex" (default) or "page"

  // --- MODE: GENERIC PAGE ---
  if (type === "page") {
    const title = searchParams.get("title") || "24bitColors";
    const subtitle = searchParams.get("subtitle") || "Find Your True Color";

    // Minimalist Dark Museum Theme
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
            backgroundColor: "#080808", // Almost black
            color: "white",
            fontFamily: "serif",
            position: "relative",
          }}
        >
          {/* Subtle Aurora Gradient Background */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              left: "-20%",
              width: "140%",
              height: "200%",
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(50,50,255,0.08) 0%, rgba(0,0,0,0) 60%)",
              transform: "rotate(-15deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-50%",
              right: "-20%",
              width: "140%",
              height: "200%",
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(255,50,50,0.05) 0%, rgba(0,0,0,0) 60%)",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 10,
              padding: "0 80px",
              textAlign: "center",
            }}
          >
            {/* Small Label / Subtitle */}
            <div
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 24,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginBottom: 32,
                fontFamily: "sans-serif",
              }}
            >
              {subtitle}
            </div>

            {/* Main Title */}
            <div
              style={{
                color: "white",
                fontSize: 80,
                fontWeight: "normal", // Serif looks better normal/light
                letterSpacing: "0.02em",
                lineHeight: 1.1,
                textShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              {title}
            </div>

            {/* Decorative Divider */}
            <div
              style={{
                width: 60,
                height: 1,
                backgroundColor: "rgba(255,255,255,0.3)",
                marginTop: 48,
              }}
            />
          </div>

          {/* Branding Footer */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: 0.5,
            }}
          >
            <div
              style={{
                fontSize: 18,
                letterSpacing: "0.15em",
                fontFamily: "sans-serif",
                textTransform: "uppercase",
              }}
            >
              24bitColors
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  // --- MODE: HEX COLOR (Default) ---
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
