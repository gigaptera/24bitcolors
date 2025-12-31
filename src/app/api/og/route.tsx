import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Dynamic params
    const title = searchParams.get("title") || "24bitColors";
    const subtitle = searchParams.get("subtitle") || "Find Your True Color";

    // Font loading (Serif font for "Times New Roman" feel with Japanese support)
    const fontData = await fetch(
      new URL(
        "https://github.com/googlefonts/noto-cjk/raw/main/Serif/OTF/Japanese/NotoSerifCJKjp-Bold.otf"
      )
    ).then((res) => res.arrayBuffer());

    // Design System Colors (from icon.tsx)
    const colors = [
      {
        base: "#ef4444",
        light: "#f87171",
        dark: "#dc2626",
        lighter: "#fca5a5",
      },
      {
        base: "#f59e0b",
        light: "#fbbf24",
        dark: "#d97706",
        lighter: "#fcd34d",
      },
      {
        base: "#84cc16",
        light: "#a3e635",
        dark: "#65a30d",
        lighter: "#bef264",
      },
      {
        base: "#06b6d4",
        light: "#22d3ee",
        dark: "#0891b2",
        lighter: "#67e8f9",
      },
      {
        base: "#3b82f6",
        light: "#60a5fa",
        dark: "#2563eb",
        lighter: "#93c5fd",
      },
      {
        base: "#8b5cf6",
        light: "#a78bfa",
        dark: "#7c3aed",
        lighter: "#c4b5fd",
      },
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
            fontFamily: '"NotoSerifJP"',
            position: "relative",
          }}
        >
          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              padding: "40px",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                color: "#1a1a1a",
                letterSpacing: "0.2em",
                marginBottom: "20px",
                opacity: 0.6,
                textTransform: "uppercase",
              }}
            >
              24bitColors
            </div>
            {/* Title */}
            <h1
              style={{
                fontSize: "72px",
                fontWeight: 700,
                margin: 0,
                marginBottom: "24px",
                lineHeight: 1.2,
                color: "#1a1a1a",
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "32px",
                fontWeight: 400,
                color: "#525252",
                margin: 0,
                marginTop: "10px",
                letterSpacing: "0.05em",
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Decorative Color Bar (Brand Mark 2x2 * 6) */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
              opacity: 0.9,
            }}
          >
            {colors.map((group, groupIndex) => (
              <div
                key={groupIndex}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "64px",
                  gap: "4px",
                }}
              >
                {/* 2x2 Grid per color group, scaled down to 30px blocks */}
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: group.light,
                    borderRadius: "4px",
                  }}
                />
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: group.base,
                    borderRadius: "4px",
                  }}
                />
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: group.lighter,
                    borderRadius: "4px",
                  }}
                />
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: group.dark,
                    borderRadius: "4px",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Footer Tagline */}
          <div
            style={{
              position: "absolute",
              bottom: 60,
              fontSize: 16,
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
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "NotoSerifJP",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: unknown) {
    console.log("Expected error format:", e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
