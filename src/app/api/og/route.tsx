import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Dynamic params
    const title = searchParams.get("title") || "24bitColors";
    const subtitle = searchParams.get("subtitle") || "Find Your True Color";

    // Font loading (Standard font)
    const fontData = await fetch(
      new URL(
        "https://github.com/googlefonts/noto-cjk/raw/main/Sans/OTF/Japanese/NotoSansCJKjp-Bold.otf"
      )
    ).then((res) => res.arrayBuffer());

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
            backgroundColor: "#f5f5f5", // neutral-100
            fontFamily: '"NotoSansJP"',
            position: "relative",
          }}
        >
          {/* Background decoration */}
          <div
            style={{
              position: "absolute",
              top: "-20%",
              left: "-10%",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)",
              filter: "blur(120px)",
              opacity: 0.3,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-20%",
              right: "-10%",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
              filter: "blur(120px)",
              opacity: 0.3,
            }}
          />

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
            }}
          >
            {/* Title */}
            <h1
              style={{
                fontSize: "72px",
                fontWeight: 700,
                margin: 0,
                marginBottom: "24px",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                background: "linear-gradient(to right, #171717, #525252)",
                backgroundClip: "text",
                color: "transparent",
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
                marginTop: "12px",
                letterSpacing: "0.05em",
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Logo Footer */}
          <div
            style={{
              position: "absolute",
              bottom: "50px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                display: "flex",
                flexWrap: "wrap",
                marginRight: "12px",
              }}
            >
              {/* Simple 24bitColors icon representation */}
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  background: "#f87171",
                  margin: "1px",
                }}
              />
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  background: "#fbbf24",
                  margin: "1px",
                }}
              />
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  background: "#34d399",
                  margin: "1px",
                }}
              />
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  background: "#60a5fa",
                  margin: "1px",
                }}
              />
            </div>
            <span
              style={{
                fontSize: "24px",
                color: "#171717",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              24bitColors
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "NotoSansJP",
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
