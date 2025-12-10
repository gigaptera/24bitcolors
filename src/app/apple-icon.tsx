import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 512,
  height: 512,
};
export const contentType = "image/png";

export default function Icon() {
  // Golden Ratio Layout Calculation
  // Container Aspect Ratio = 1.618 (Golden Ratio)
  // gap = 16px
  const gap = 16;

  // blockSizeW = (420 - 32) / 3 = 129.3
  // containerHeight ~ 260px => blockSizeH = 122
  // We use the smaller calculating block size to ensure Square shapes
  const blockSize = 122;

  // Recalculate container to perfectly wrap the grid
  const actualWidth = blockSize * 3 + gap * 2;
  const actualHeight = blockSize * 2 + gap;

  // Colors (OKLCH approximations for display)
  const colors = [
    { base: "#ef4444", light: "#f87171", dark: "#dc2626", lighter: "#fca5a5" }, // Red
    { base: "#f59e0b", light: "#fbbf24", dark: "#d97706", lighter: "#fcd34d" }, // Orange/Yellow
    { base: "#84cc16", light: "#a3e635", dark: "#65a30d", lighter: "#bef264" }, // Lime/Green
    { base: "#06b6d4", light: "#22d3ee", dark: "#0891b2", lighter: "#67e8f9" }, // Cyan
    { base: "#3b82f6", light: "#60a5fa", dark: "#2563eb", lighter: "#93c5fd" }, // Blue
    { base: "#8b5cf6", light: "#a78bfa", dark: "#7c3aed", lighter: "#c4b5fd" }, // Purple
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: `${actualWidth}px`,
            height: `${actualHeight}px`,
            gap: `${gap}px`,
          }}
        >
          {colors.map((color, i) => (
            <div
              key={i}
              style={{
                width: `${blockSize}px`,
                height: `${blockSize}px`,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignContent: "space-between",
              }}
            >
              {/* 2x2 Inner Grid with spacing */}
              <div
                style={{
                  width: "46%",
                  height: "46%",
                  backgroundColor: color.light,
                  borderRadius: "2px",
                }}
              />
              <div
                style={{
                  width: "46%",
                  height: "46%",
                  backgroundColor: color.base,
                  borderRadius: "2px",
                }}
              />
              <div
                style={{
                  width: "46%",
                  height: "46%",
                  backgroundColor: color.lighter,
                  borderRadius: "2px",
                }}
              />
              <div
                style={{
                  width: "46%",
                  height: "46%",
                  backgroundColor: color.dark,
                  borderRadius: "2px",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
