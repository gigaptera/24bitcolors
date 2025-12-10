"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getNearestPoeticName } from "@/lib/colorNaming";

export function LastDiagnosisLink() {
  const [lastHex, setLastHex] = useState<string | null>(null);
  const [groupSlug, setGroupSlug] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedJson = localStorage.getItem("lastDiagnosisResult");
    const storedHex = localStorage.getItem("lastDiagnosisHex");

    let hex: string | null = null;

    if (storedJson) {
      try {
        const parsed = JSON.parse(storedJson);
        if (parsed.hex) hex = parsed.hex;
      } catch (e) {
        console.error("Failed to parse lastDiagnosisResult", e);
      }
    }

    // Fallback or override
    if (!hex && storedHex) {
      hex = storedHex;
    }

    if (hex) {
      const { groupSlug } = getNearestPoeticName(hex);
      // Avoid synchronous state update in effect
      setTimeout(() => {
        setLastHex(hex);
        setGroupSlug(groupSlug);
        setIsVisible(true);
      }, 0);
    }
  }, []);

  if (!isVisible || !lastHex || !groupSlug) return null;

  const safeHex = lastHex.replace("#", "");

  return (
    <div className="flex items-center animate-in fade-in duration-500">
      <Link
        href={`/result/${groupSlug}?hex=${safeHex}`}
        className="group flex items-center gap-2 pr-4 border-r border-border/40 mr-4"
        title="前回の診断結果へ"
      >
        <div className="relative flex items-center justify-center">
          {/* Minimal label that appears on hover */}
          <span className="absolute right-full mr-2 whitespace-nowrap text-[10px] tracking-widest text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 font-serif uppercase">
            Last Color
          </span>

          {/* Color Circle */}
          <div
            className="h-5 w-5 rounded-full shadow-sm ring-1 ring-black/5 transition-transform group-hover:scale-110"
            style={{ backgroundColor: lastHex }}
          />
        </div>
      </Link>
    </div>
  );
}
