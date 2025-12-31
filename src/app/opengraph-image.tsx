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
  // Design System Colors (from icon.tsx)
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
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fcfcfc",
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
            fontFamily: '"Times New Roman", Times, serif', // Matches Header.tsx
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
            boxShadow: "0 20px 60px -10px rgba(0,0,0,0.15)",
            borderRadius: 4,
          }}
        >
          {colors.map((group, groupIndex) => (
            <div
              key={groupIndex}
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: 128,
                gap: 8,
              }}
            >
              {/* 2x2 Grid per color group */}
              <div
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: group.light,
                  borderRadius: 4,
                }}
              />
              <div
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: group.base,
                  borderRadius: 4,
                }}
              />
              <div
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: group.lighter,
                  borderRadius: 4,
                }}
              />
              <div
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: group.dark,
                  borderRadius: 4,
                }}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            fontSize: 24,
            fontFamily: '"Times New Roman", Times, serif', // Unified font family
            color: "#808080",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            opacity: 0.8,
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
