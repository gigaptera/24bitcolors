import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const anonymousId = cookieStore.get("anonymous_id")?.value;

    if (!anonymousId) {
      return NextResponse.json(
        { error: "No anonymous ID found" },
        { status: 401 }
      );
    }

    // Get current history from request body or fetch from DB?
    // User requested "Snapshot" of *current* state.
    // Ideally we trust the client to send the IDs, or we fetch from DB using anonymousId.
    // Fetching from DB is safer and ensures we only share what's actually in DB.

    // 1. Init Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""; // Must use Service Key to bypass RLS if needed, or just standard client
    // Actually we can use standard client if we have RLS set up for anonymous_users, but we are using pure anonymous_id string.
    // We'll use Service Role Key for backend operations to ensure we can read/write freely,
    // BUT we must validate ownership.

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 2. Fetch User's Current History
    const { data: history, error: fetchError } = await supabase
      .from("diagnoses")
      .select("id, hex, created_at")
      .eq("anonymous_id", anonymousId)
      .order("created_at", { ascending: false })
      .limit(100);

    if (fetchError || !history || history.length === 0) {
      return NextResponse.json(
        { error: "No history to share" },
        { status: 400 }
      );
    }

    // 3. Create Snapshot in shared_collections
    const { data: shared, error: insertError } = await supabase
      .from("shared_collections")
      .insert({
        original_anonymous_id: anonymousId, // Storing as UUID if the column is UUID, but anonymous_id in diagnoses is often UUID.
        snapshot_data: history,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Share insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to create share link" },
        { status: 500 }
      );
    }

    return NextResponse.json({ shareId: shared.id, count: history.length });
  } catch (err) {
    console.error("Share API error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
