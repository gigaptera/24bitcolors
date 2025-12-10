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
  // Let height = h, then width = 1.618 * h
  // In a 512x512 square, let's add some padding.
  // Max width possible with padding = 440px
  // If width = 440px, height = 440 / 1.618 = 271.9px ~ 272px

  const containerWidth = 420;
  const containerHeight = Math.round(containerWidth / 1.618); // ~260px

  // Grid: 3 columns, 2 rows
  // We want the total block area to roughly fit this, with gaps.
  // Let gap = 12px
  const gap = 16;
  // Width: 3 * blockSize + 2 * gap = containerWidth
  // Height: 2 * blockSize + 1 * gap = containerHeight
  // Ideally blocks are square. Let's see if they match.
  // blockSizeW = (420 - 32) / 3 = 129.3
  // blockSizeH = (260 - 16) / 2 = 122
  // Close enough to square! We can fix the block size to be square and let the container adjust slightly to maintain Golden Ratio visually OR force Golden Ratio on the bounding box.
  // User asked for "Rectangle that forms is Golden Ratio".
  // So we prioritize total width/height ratio.
  // We can center the grid of squares within that Golden Rectangle area.

  const blockSize = Math.min(
    (containerWidth - gap * 2) / 3,
    (containerHeight - gap) / 2
  );
  // Recalculate container to perfectly wrap the grid
  const actualWidth = blockSize * 3 + gap * 2;
  const actualHeight = blockSize * 2 + gap;

  // Colors (OKLCH approximations for display)
  // Row 1: Red, Orange, Yellow
  // Row 2: Green, Cyan/Blue, Purple
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
        {/* Golden Ratio Container (Invisible bounding box, implied by content) */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: `${actualWidth}px`,
            height: `${actualHeight}px`,
            gap: `${gap}px`,
            justifyContent: "center", // Center items? No, gap handles it.
            alignContent: "center",
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
