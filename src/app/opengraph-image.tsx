import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "24bitColors - Find Your True Color";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * Premium site-wide OGP
 * Night Museum style - minimal & elegant
 */
export default async function Image() {
  // 24 colors from hue wheel (0° to 345° in 15° increments)
  const hue24 = Array.from({ length: 24 }, (_, i) => {
    const hue = i * 15;
    return `hsl(${hue}, 70%, 55%)`;
  });

  // Group into 6 sets of 4 (2x2 grids)
  const colorGroups: string[][] = [];
  for (let i = 0; i < 24; i += 4) {
    colorGroups.push(hue24.slice(i, i + 4));
  }

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
        {/* Main Content - All elements aligned to 508px width */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: 508,
          }}
        >
          {/* Logo / Title - Sized to fit 508px */}
          <div
            style={{
              fontSize: 90,
              fontWeight: 400,
              color: "#1a1a1a",
              letterSpacing: "0.02em",
              marginBottom: 21,
              fontFamily: "Georgia, 'Times New Roman', Times, serif",
              width: "100%",
            }}
          >
            24bitColors
          </div>

          {/* Tagline - Sized to fit 508px */}
          <div
            style={{
              fontSize: 24,
              color: "#808080",
              letterSpacing: "0.32em",
              fontWeight: 400,
              textTransform: "uppercase",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, Inter, sans-serif",
              marginBottom: 34,
              width: "100%",
            }}
          >
            Find Your True Color
          </div>

          {/* 24-Hue Color Grid (6 groups of 2x2) */}
          <div
            style={{
              display: "flex",
              gap: 20,
            }}
          >
            {colorGroups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: 68,
                  height: 68,
                  gap: 4,
                  backgroundColor: "#fafafa",
                  padding: 2,
                }}
              >
                {group.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: color,
                      borderRadius: 2,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
