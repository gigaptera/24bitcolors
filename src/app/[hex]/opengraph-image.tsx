import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "24bitColors - Color Analysis";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Validation helper
const HEX_REGEX = /^([A-Fa-f0-9]{3}){1,2}$/;

export default async function Image({ params }: { params: { hex: string } }) {
  const { hex } = await params;
  let color = hex;

  // Normalize hex
  if (!HEX_REGEX.test(color)) {
    color = "000000"; // Fallback
  }
  // Expand short hex if needed
  if (color.length === 3) {
    color = color
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const hexCode = `#${color.toUpperCase()}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Color Area - Top 80% */}
        <div
          style={{
            flex: 4, // 80%
            backgroundColor: hexCode,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Subtle overlay/gradient effect cannot be easily done with CSS gradients in OG sometimes, 
              but distinct flat color is better for sharing usually. 
              Let's add a "Pigment No." text if it's readable? 
              Actually, keep it clean. Just pure color.
           */}
        </div>

        {/* Info Area - Bottom 20% */}
        <div
          style={{
            flex: 1, // 20%
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 60px",
            backgroundColor: "#ffffff",
            borderTop: "1px solid #e5e5e5",
          }}
        >
          {/* Left: Hex Code */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: 64,
                fontFamily: "serif", // Next.og supports standard fonts, custom fonts need loading.
                // Sans-serif is safer default, but let's try serif for the aesthetic.
                fontWeight: "bold",
                color: "#000000",
                lineHeight: 1,
              }}
            >
              {hexCode}
            </span>
            <span
              style={{
                fontSize: 24,
                fontFamily: "sans-serif",
                color: "#666666",
                marginTop: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              PIGMENT NO.
            </span>
          </div>

          {/* Right: Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#000",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "50px", // Pill shape
            }}
          >
            <span
              style={{
                fontSize: 24,
                fontWeight: "bold",
                fontFamily: "sans-serif",
              }}
            >
              24bitColors
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
