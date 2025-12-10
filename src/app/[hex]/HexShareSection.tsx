"use client";

import { useState } from "react";
import { ShareActions } from "@/components/ShareActions";
import { ShareCard } from "@/components/ShareCard";
// Helper to convert hex to Oklch for ShareCard
import { converter, parse } from "culori";
import { OklchColor } from "@/lib/oklch";

const toOklch = converter("oklch");

interface HexShareSectionProps {
  hex: string;
}

export function HexShareSection({ hex }: HexShareSectionProps) {
  const [showShareCard, setShowShareCard] = useState(false);

  // Prepare color object for ShareCard
  const parsed = parse(hex);
  const oklch = parsed ? toOklch(parsed) : { h: 0, l: 0, c: 0 };

  // OklchColor type match
  const colorData: OklchColor = {
    hue: oklch.h ?? 0,
    lightness: oklch.l ?? 0,
    chroma: oklch.c ?? 0,
    weight: 1.0, // Default weight for non-diagnosis colors
  };

  return (
    <>
      <ShareActions
        url={`https://24bitcolors.com/${hex}`}
        onShare={() => setShowShareCard(true)}
      />

      {showShareCard && (
        <ShareCard
          color={colorData}
          hex={hex}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </>
  );
}
