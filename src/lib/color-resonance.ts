import { toOklch, OklchColor, colorDistance } from "@/lib/oklch";
import { getNearestPoeticName } from "@/lib/colorNaming";

export interface ResonanceResult {
  score: number; // 0-100
  harmonyType: HarmonyType;
  description: string;
  blendHex: string; // The color that represents the mix
}

export type HarmonyType =
  | "identity" // Same color
  | "complementary" // 180deg
  | "analogous" // ~30deg
  | "triadic" // ~120deg
  | "vibrant" // High contrast/distance
  | "subtle" // Close but not analogous
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
      description: "Unknown Relationship",
      blendHex: "#000000",
    };
  }

  // 1. Calculate basic metrics
  const hueDiff = Math.abs((cA.hue || 0) - (cB.hue || 0));
  const hueDist = Math.min(hueDiff, 360 - hueDiff); // Shortest arc on color wheel
  const dist = colorDistance(cA, cB);

  // 2. Determine Harmony Type & Score Base
  let type: HarmonyType = "neutral";
  let score = 50;
  let descKey = "neutral";

  // Identity logic
  if (dist < 0.02) {
    type = "identity";
    score = 100;
    descKey = "identity";
  }
  // Complementary logic (180deg +/- 20deg)
  else if (hueDist > 160 && hueDist < 200) {
    type = "complementary";
    score = 95; // High resonance
    descKey = "complementary";
  }
  // Analogous logic (30deg +/- 15deg)
  else if (hueDist < 45 && hueDist > 10) {
    type = "analogous";
    score = 85; // Pleasant harmony
    descKey = "analogous";
  }
  // Triadic logic (120deg +/- 15deg)
  else if (Math.abs(hueDist - 120) < 15) {
    type = "triadic";
    score = 90; // Balanced
    descKey = "triadic";
  }
  // High contrast/Vibrant
  else if (dist > 0.3) {
    type = "vibrant";
    score = 80;
    descKey = "vibrant";
  }
  // Subtle/Neutral
  else if (dist < 0.1) {
    type = "subtle";
    score = 60;
    descKey = "subtle";
  } else {
    // Calculate score based on distance for "neutral"
    // Just a mapping of distance to some score
    score = Math.min(100, Math.max(20, Math.round(dist * 200)));
  }

  // 3. Normalize score (0-100 integer)
  score = Math.round(score);

  // 4. Determine blend color (simple average for now)
  // In a real implementation, we might mix in OKLCH space
  // Here we just use a placeholder mechanism or use the Oklch mix if feasible.
  // We'll compute the "mix" in logic for visualization if needed,
  // but for the return value, let's return a "Mix" name.
  // Actually, let's just return the hex of the mix for UI usage if needed.
  // For simplicity, we won't implement full color mixing here unless requested.
  // We'll return #000000 properly later or valid hex logic.

  return {
    score,
    harmonyType: type,
    description: descKey,
    blendHex: hexA, // Placeholder, UI performs visual blending
  };
}
