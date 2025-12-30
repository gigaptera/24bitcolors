import { NextRequest, NextResponse } from "next/server";
import { generateColorInsight } from "@/lib/gemini";
import { createClient } from "@supabase/supabase-js";

// Force dynamic to prevent static generation issues with env vars
export const dynamic = "force-dynamic";

// Initialize Supabase Client for caching
// Note: We use Service Role Key for secure server-side operations (write access)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
    // Add # prefix if missing for consistency
    const safeHex = hex.startsWith("#") ? hex : `#${hex}`;

    // 1. Check Cache in Supabase
    // We select 'data' column where NAME and locale match.
    // Use limit(1).maybeSingle() to handle potential duplicate rows gracefully.
    console.log(
      `[Cache Lookup] Checking for name: "${name}", locale: "${locale}"`
    );
    const { data: cachedData, error: cacheError } = await supabase
      .from("ai_insights")
      .select("data")
      .eq("name", name)
      .eq("locale", locale)
      .limit(1)
      .maybeSingle();

    if (cacheError) {
      console.log(
        `[Cache Lookup Error] Code: ${cacheError.code}, Msg: ${cacheError.message}`
      );
    }

    if (cachedData) {
      // Cache Hit! Return immediately
      console.log(
        `[Cache Hit] Returning cached insight for name: "${name}" (${locale})`
      );
      return NextResponse.json(cachedData.data);
    }

    // 2. Cache Miss: Generate Fresh Insight via Gemini
    console.log(
      `[Cache Miss] Generating fresh insight for ${safeHex} / ${name} (${locale})`
    );

    // This will now throw specific errors if env var is missing or API fails
    const insight = await generateColorInsight(safeHex, name, locale);

    if (!insight) {
      return NextResponse.json(
        { error: "Failed to generate insight (Empty response)" },
        { status: 500 }
      );
    }

    // 3. Save to Cache (Async)
    // We store 'name' so future lookups can find it by group
    const { error: saveError } = await supabase.from("ai_insights").insert({
      hex: safeHex,
      name: name,
      locale,
      data: insight,
    });

    if (saveError) {
      console.error("[Cache Save Error]", saveError);
    } else {
      console.log(`[Cache Saved] Insight for ${name} stored successfully.`);
    }

    return NextResponse.json(insight);
  } catch (error: unknown) {
    console.error("API Route Error:", error);

    // Return the specific error message to help debugging
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
