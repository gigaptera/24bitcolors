"use client";

import { useEffect, useState } from "react";
import { ColorInsight } from "@/lib/gemini";
import { ColorInsightSection } from "@/components/ColorInsightSection";

interface ColorInsightFetcherProps {
  hex: string;
  colorName: string;
  locale: string;
}

export function ColorInsightFetcher({
  hex,
  colorName,
  locale,
}: ColorInsightFetcherProps) {
  const [insight, setInsight] = useState<ColorInsight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Keep track if we have ANY data to show
  const hasData = insight !== null;

  useEffect(() => {
    let isMounted = true;

    const fetchInsight = async () => {
      // Debug log to check what exactly is being sent
      console.log(
        `[Fetcher] Requesting insight for: ${hex}, Name: "${colorName}", Locale: ${locale}`
      );

      try {
        const params = new URLSearchParams({
          hex: hex.replace("#", ""),
          name: colorName,
          locale,
        });

        const res = await fetch(`/api/gemini?${params.toString()}`);

        if (!res.ok) {
          // Try to parse error message from server
          const errorData = await res.json().catch(() => ({}));
          const msg = errorData.error || `Status: ${res.status}`;
          console.error("[ColorInsightFetcher] Server Error:", msg);
          throw new Error(msg);
        }

        const data = await res.json();
        if (isMounted) {
          setInsight(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch insight:", err);
        if (isMounted) {
          setError(true);
          setErrorMessage(err instanceof Error ? err.message : String(err));
          setLoading(false);
        }
      }
    };

    fetchInsight();

    return () => {
      isMounted = false;
    };
  }, [hex, colorName, locale]);

  if (error && !hasData) {
    // Only show error UI if we have no data to show
    // Check if it's a quota error (429) or related to billing
    const isQuotaError =
      errorMessage.includes("429") ||
      errorMessage.includes("quota") ||
      errorMessage.includes("Too Many Requests");

    if (isQuotaError) {
      return (
        <div className="w-full max-w-5xl px-6 py-12 flex justify-center opacity-70 relative z-10">
          <div className="bg-red-500/5 text-red-600/60 dark:text-red-400/60 px-6 py-4 rounded-sm text-[10px] font-mono tracking-widest text-center max-w-md border border-red-500/10 uppercase">
            Capacity Limit Reached.
            <br />
            <span className="opacity-70 normal-case tracking-normal block mt-1">
              AI analysis is currently busy. Please try again later.
            </span>
          </div>
        </div>
      );
    }
    return null;
  }

  // Initial Loading State (No data yet)
  if (loading && !hasData) {
    return (
      <div className="w-full max-w-5xl px-6 py-24 flex justify-center opacity-50 relative z-10">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-0.5 w-12 bg-foreground/20"></div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
            Analyzing Color Resonance...
          </span>
        </div>
      </div>
    );
  }

  if (!hasData) return null;

  return (
    <div className="w-full max-w-5xl px-6 relative z-10">
      {/* If validating/re-fetching but we have stale data, optionally show a small indicator or nothing */}
      {/* {loading && <div className="absolute inset-0 bg-background/50 z-10" />} */}
      <ColorInsightSection insight={insight!} colorName={colorName} />
    </div>
  );
}
