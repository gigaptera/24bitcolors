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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fcfcfc", // Slightly off-white for paper feel
        }}
      >
        {/* The Exhibit: Color Circle */}
        <div
          style={{
            display: "flex", // Needed for children
            width: 480,
            height: 480,
            borderRadius: "50%",
            backgroundColor: hexCode,
            boxShadow: "0 40px 80px -20px rgba(0,0,0,0.3)", // Deep shadow
            marginBottom: 60,
          }}
        />

        {/* Typography: Hex Code */}
        <div
          style={{
            fontSize: 72,
            fontFamily: '"Courier New", Courier, monospace', // Monospace for precision
            color: "#1a1a1a",
            letterSpacing: "0.15em",
            marginBottom: 20,
            display: "flex",
          }}
        >
          {hexCode.split("").join(" ")}
        </div>

        {/* Typography: Brand */}
        <div
          style={{
            fontSize: 24,
            fontFamily: 'Georgia, "Times New Roman", serif', // Serif for elegance
            color: "#808080",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            display: "flex",
            marginTop: 40,
          }}
        >
          24bitColors
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
