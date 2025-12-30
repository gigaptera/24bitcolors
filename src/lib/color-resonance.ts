import { toOklch, colorDistance, circularHueDistance } from "@/lib/oklch";

export interface ResonanceResult {
  score: number; // 0-100
  harmonyType: HarmonyType;
  description: string;
  blendHex: string; // The color that represents the mix
}

export type HarmonyType =
  | "identity" // Same color
  | "monochromatic" // Same hue, different L/C
  | "analogous" // ~30deg
  | "dyadic" // ~90deg
  | "triadic" // ~120deg
  | "split_complementary" // ~150deg
  | "complementary" // 180deg
  | "tonal" // Same L/C, different hue
  | "vibrant" // High contrast/distance
  | "neutral"; // No strong relation

/**
 * Calculate the resonance between two colors
 */
export function calculateResonance(
  hexA: string,
  hexB: string
): ResonanceResult {
  const cA = toOklch(hexA);
  const cB = toOklch(hexB);

  // Default fallback if invalid
  if (!cA || !cB) {
    return {
      score: 0,
      harmonyType: "neutral",
      description: "neutral",
      blendHex: "#000000",
    };
  }

  // 1. Calculate basic metrics
  const hDist = circularHueDistance(cA.hue, cB.hue);
  const lDist = Math.abs(cA.lightness - cB.lightness);
  const cDist = Math.abs(cA.chroma - cB.chroma);
  const totalDist = colorDistance(cA, cB);

  // 2. Determine Harmony Type & Score Base
  let type: HarmonyType = "neutral";
  let score = 50;

  // Identity logic
  if (totalDist < 0.01) {
    type = "identity";
    score = 100;
  }
  // Monochromatic (Same hue, different L or C)
  else if (hDist < 5) {
    type = "monochromatic";
    score = 90 - lDist * 20 - cDist * 30;
  }
  // Complementary (180deg)
  else if (Math.abs(hDist - 180) < 15) {
    type = "complementary";
    const dev = Math.abs(hDist - 180);
    score = 98 - dev * 0.5;
  }
  // Split Complementary (150deg)
  else if (Math.abs(hDist - 150) < 15) {
    type = "split_complementary";
    const dev = Math.abs(hDist - 150);
    score = 92 - dev * 0.5;
  }
  // Triadic (120deg)
  else if (Math.abs(hDist - 120) < 15) {
    type = "triadic";
    const dev = Math.abs(hDist - 120);
    score = 88 - dev * 0.5;
  }
  // Dyadic (90deg)
  else if (Math.abs(hDist - 90) < 15) {
    type = "dyadic";
    const dev = Math.abs(hDist - 90);
    score = 85 - dev * 0.5;
  }
  // Analogous (30deg)
  else if (hDist < 45) {
    type = "analogous";
    const ideal = 30;
    const dev = Math.abs(hDist - ideal);
    score = 90 - dev * 0.8;
  }
  // Tonal (Same L and C, different hue)
  else if (lDist < 0.05 && cDist < 0.05) {
    type = "tonal";
    score = 82 - lDist * 100 - cDist * 200;
  }
  // High contrast/Vibrant
  else if (totalDist > 0.4) {
    type = "vibrant";
    score = 75 + Math.min(25, (totalDist - 0.4) * 50);
  } else {
    // Neutral: Smooth interpolation based on distance and hue
    score = 40 + Math.min(30, totalDist * 100);
  }

  // 3. Final score normalization
  score = Math.round(Math.min(100, Math.max(0, score)));

  return {
    score,
    harmonyType: type,
    description: type, // Using type as key for translations
    blendHex: hexA, // UI handles visual blending
  };
}
