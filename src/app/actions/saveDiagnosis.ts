"use server";

import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";

interface SaveDiagnosisParams {
  hex: string;
  hue: number;
  lightness: number;
  chroma: number;
  theme: string;
  duration_seconds: number;
  algorithm_version: string;
  locale: string;
  anonymous_id: string;
}

export async function saveDiagnosisAction(params: SaveDiagnosisParams) {
  // Server-side Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Supabase credentials missing. Diagnosis not saved.");
    return { success: false, error: "Supabase not configured" };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "unknown";

  // Vercel / Cloudflare headers for geolocation
  const country = headersList.get("x-vercel-ip-country") || "unknown";
  const region = headersList.get("x-vercel-ip-country-region") || "unknown";

  try {
    const { data, error } = await supabase
      .from("diagnoses")
      .insert({
        ...params,
        user_agent: userAgent,
        country,
        region,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase Insert Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data.id };
  } catch (err) {
    console.error("Server Action Error:", err);
    return { success: false, error: "Internal Server Error" };
  }
}
