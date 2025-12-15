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
          backgroundColor: "#fcfcfc", // Slightly off-white
          position: "relative",
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 100,
            fontWeight: 400,
            color: "#1a1a1a",
            letterSpacing: "0.05em",
            marginBottom: 60,
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
          }}
        >
          24bitColors
        </div>

        {/* The Exhibit: A Grid of Colors */}
        <div
          style={{
            display: "flex",
            gap: 24,
            padding: 40,
            backgroundColor: "#fff",
            boxShadow: "0 20px 60px -10px rgba(0,0,0,0.15)", // Card shadow
            borderRadius: 4,
          }}
        >
          {colorGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              style={{
                display: "flex",
                flexDirection: "column", // Vertical stacks looks like palettes
                width: 60,
                gap: 8,
              }}
            >
              {group.map((color, colorIndex) => (
                <div
                  key={colorIndex}
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: color,
                    borderRadius: "50%", // Circles instead of squares
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Footer Tagline */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            fontSize: 24,
            fontFamily: '"Courier New", Courier, monospace',
            color: "#808080",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          Digital Color Museum
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
