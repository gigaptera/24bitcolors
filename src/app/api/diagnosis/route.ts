import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/diagnosis
 * Save diagnosis result to database
 *
 * Request body:
 * {
 *   hex: string,
 *   hue: number,
 *   lightness: number,
 *   chroma: number,
 *   theme: string,
 *   duration_seconds: number,
 *   algorithm_version: string,
 *   locale: string,
 *   anonymous_id: string
 * }
 *
 * Response:
 * { success: boolean, id?: string, error?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "hex",
      "hue",
      "lightness",
      "chroma",
      "anonymous_id",
    ];
    for (const field of requiredFields) {
      if (body[field] === undefined) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
      "";

    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn("Supabase credentials missing");
      return NextResponse.json(
        { success: false, error: "Database not configured" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Extract headers for geo/user-agent
    const userAgent = request.headers.get("user-agent") || "unknown";
    const country = request.headers.get("x-vercel-ip-country") || "unknown";
    const region =
      request.headers.get("x-vercel-ip-country-region") || "unknown";

    // Insert diagnosis
    const { data, error } = await supabase
      .from("diagnoses")
      .insert({
        hex: body.hex,
        hue: body.hue,
        lightness: body.lightness,
        chroma: body.chroma,
        theme: body.theme || "light",
        duration_seconds: body.duration_seconds || 0,
        algorithm_version: body.algorithm_version || "v1.0.0",
        locale: body.locale || "unknown",
        anonymous_id: body.anonymous_id,
        user_agent: userAgent,
        country,
        region,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
