import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/feedback
 * Save feedback to database
 *
 * Request body:
 * {
 *   diagnosis_id?: string,
 *   rating?: number,
 *   agreement_score?: number,
 *   expected_color?: string,
 *   actual_impression?: string,
 *   comment?: string
 * }
 *
 * Response:
 * { success: boolean, error?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Supabase client with service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
      "";

    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn("Supabase credentials missing. Feedback not saved.");
      return NextResponse.json(
        { success: false, error: "Database not configured" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert feedback
    const { error } = await supabase.from("feedback").insert({
      diagnosis_id: body.diagnosis_id || null,
      rating: body.rating || null,
      agreement_score: body.agreement_score || null,
      expected_color: body.expected_color || null,
      actual_impression: body.actual_impression || null,
      comment: body.comment || null,
      reason_tags: body.reason_tags || null,
    });

    if (error) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
