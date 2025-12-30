import { NextRequest, NextResponse } from "next/server";
import { generateColorInsight } from "@/lib/gemini";

// Force dynamic to prevent static generation issues with env vars
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hex = searchParams.get("hex");
  const name = searchParams.get("name");
  const locale = searchParams.get("locale") || "ja";

  if (!hex || !name) {
    return NextResponse.json(
      { error: "Missing hex or name parameter" },
      { status: 400 }
    );
  }

  try {
    // Add # prefix if missing
    const safeHex = hex.startsWith("#") ? hex : `#${hex}`;

    // This will now throw specific errors if env var is missing or API fails
    const insight = await generateColorInsight(safeHex, name, locale);

    if (!insight) {
      return NextResponse.json(
        { error: "Failed to generate insight (Empty response)" },
        { status: 500 }
      );
    }

    return NextResponse.json(insight);
  } catch (error: any) {
    console.error("API Route Error:", error);

    // Return the specific error message to help debugging
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
