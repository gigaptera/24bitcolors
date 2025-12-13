import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const anonymousId = request.cookies.get("anonymous_id")?.value;
    // Fallback to query param for backward compatibility or testing
    // const anonymousId = request.cookies.get("anonymous_id")?.value || request.nextUrl.searchParams.get("id");

    const limit = parseInt(
      request.nextUrl.searchParams.get("limit") || "50",
      10
    );

    if (!anonymousId) {
      return NextResponse.json(
        { error: "Anonymous ID is required (Cookie missing)" },
        { status: 401 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "";

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase credentials missing");
      return NextResponse.json(
        { error: "Service unavailable" },
        { status: 503 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("[API] History GET. Cookie ID:", anonymousId);

    const { data, error } = await supabase
      .from("diagnoses")
      .select("id, hex, created_at")
      .eq("anonymous_id", anonymousId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (data) {
      console.log(`[API] History GET. Found ${data.length} records.`);
    }

    if (error) {
      console.error("Supabase error fetching history:", error);
      return NextResponse.json(
        { error: "Failed to fetch history" },
        { status: 500 }
      );
    }

    return NextResponse.json({ history: data });
  } catch (e) {
    console.error("Unexpected error in history API:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
