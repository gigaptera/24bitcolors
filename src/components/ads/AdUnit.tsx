"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AdUnitProps {
  /**
   * Google AdSense Unit ID (data-ad-slot)
   * If not provided, a responsive generic ad will be attempted if auto-ads are not sufficient
   */
  slotId?: string;
  /**
   * Ad format (e.g., "auto", "fluid", "rectangle")
   * @default "auto"
   */
  format?: "auto" | "fluid" | "rectangle";
  /**
   * Layout key usually required for In-feed ads
   */
  layoutKey?: string;
  /**
   * Custom class name for the wrapper
   */
  className?: string;
  /**
   * Style object for fixed size ads
   */
  style?: React.CSSProperties;
}

export function AdUnit({
  slotId,
  format = "auto",
  layoutKey,
  className,
  style,
}: AdUnitProps) {
  const isDev = process.env.NODE_ENV === "development";
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // In production, trigger AdSense push
    if (!isDev) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, [isDev, slotId]);

  if (isDev) {
    return (
      <div
        className={cn(
          "w-full bg-muted/30 border border-dashed border-border flex flex-col items-center justify-center p-4 min-h-[100px] text-muted-foreground transition-all",
          className
        )}
        style={style}
      >
        <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">
          Advertisement
        </span>
        <span className="text-[10px] opacity-30 mt-1">
          {format} {slotId ? `(ID: ${slotId})` : "(Auto)"}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full overflow-hidden flex justify-center bg-transparent",
        className
      )}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", ...style }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
        data-ad-layout-key={layoutKey}
      />
    </div>
  );
}
