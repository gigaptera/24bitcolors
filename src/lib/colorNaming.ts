import { converter } from "culori";

// 1. Define Poetic Hues (32 steps ≈ 11.25 degrees each)
// Aligned to match the intuitive color circle
const POETIC_HUES = [
  { name: "Rose", start: 0 },
  { name: "Blush", start: 11 },
  { name: "Coral", start: 22 },
  { name: "Peach", start: 33 },
  { name: "Sun", start: 45 },
  { name: "Gold", start: 56 },
  { name: "Olive", start: 67 },
  { name: "Forest", start: 78 },
  { name: "Moss", start: 90 },
  { name: "Emerald", start: 101 },
  { name: "Teal", start: 112 },
  { name: "Cyan", start: 123 },
  { name: "Sky", start: 135 },
  { name: "Azure", start: 146 },
  { name: "Ocean", start: 157 },
  { name: "Indigo", start: 168 },
  { name: "Midnight", start: 180 },
  { name: "Violet", start: 191 },
  { name: "Iris", start: 202 },
  { name: "Lavender", start: 213 },
  { name: "Orchid", start: 225 },
  { name: "Magenta", start: 236 },
  { name: "Berry", start: 247 },
  { name: "Crimson", start: 258 },
  { name: "Ruby", start: 270 },
  { name: "Garnet", start: 281 },
  { name: "Clay", start: 292 },
  { name: "Sand", start: 303 },
  { name: "Sepia", start: 315 },
  { name: "Coffee", start: 326 },
  { name: "Chocolate", start: 337 },
  { name: "Rouge", start: 348 },
];

/**
 * Get the semantic Hue name based on degrees (0-360)
 */
function getPseudoHueName(h: number): string {
  // Normalize h
  h = h % 360;
  if (h < 0) h += 360;

  // Find nearest hue by simple distance
  // Since list is sorted, we can just check distance to each and picking min
  // but for 32 items, iteration is extremely fast.
  let bestName = POETIC_HUES[0].name;
  let minDiff = 360;

  for (const ph of POETIC_HUES) {
    let diff = Math.abs(ph.start - h);
    if (diff > 180) diff = 360 - diff;
    if (diff < minDiff) {
      minDiff = diff;
      bestName = ph.name;
    }
  }
  return bestName;
}

// 2. Define Poetic Tones based on Lightness (L) and Chroma (C)
// This creates a grid of names.
// Lightness: 0-1
// Chroma: 0-0.3 (approx max for sRGB is ~0.3 in OKLCH)

interface ToneDef {
  name: string;
  lMin: number;
  lMax: number;
  cMin: number;
  cMax: number;
}

const POETIC_TONES: ToneDef[] = [
  // --- High Chroma (Vivid) ---
  { name: "Neon", lMin: 0.7, lMax: 1.0, cMin: 0.15, cMax: 1.0 },
  { name: "Vivid", lMin: 0.5, lMax: 0.7, cMin: 0.15, cMax: 1.0 },
  { name: "Deep", lMin: 0.2, lMax: 0.5, cMin: 0.1, cMax: 1.0 },

  // --- Medium Chroma (Nature) ---
  { name: "Pale", lMin: 0.8, lMax: 1.0, cMin: 0.05, cMax: 0.15 },
  { name: "Light", lMin: 0.6, lMax: 0.8, cMin: 0.05, cMax: 0.15 },
  { name: "Mute", lMin: 0.4, lMax: 0.6, cMin: 0.05, cMax: 0.15 },
  { name: "Dark", lMin: 0.15, lMax: 0.4, cMin: 0.05, cMax: 0.1 },

  // --- Low Chroma (Grayish/Atmosphere) ---
  { name: "Mist", lMin: 0.85, lMax: 1.0, cMin: 0.0, cMax: 0.05 },
  { name: "Fog", lMin: 0.6, lMax: 0.85, cMin: 0.0, cMax: 0.05 },
  { name: "Ash", lMin: 0.3, lMax: 0.6, cMin: 0.0, cMax: 0.05 },
  { name: "Shadow", lMin: 0.0, lMax: 0.3, cMin: 0.0, cMax: 0.05 },
];

/**
 * Get the Tone string based on L and C
 */
function getToneName(l: number, c: number): string {
  // Simple bounded check. First match wins (order matters? No, ranges are mostly exclusive but let's be careful)
  // We'll calculate "center distance" to each tone block to be safer
  let bestTone = "Average";
  let minDist = 100;

  for (const t of POETIC_TONES) {
    const lCenter = (t.lMin + t.lMax) / 2;
    const cCenter = (t.cMin + t.cMax) / 2;
    // Simple Euclidean distance in L-C space
    // Weight C more because visual difference in C is smaller number-wise
    const dist = Math.sqrt((l - lCenter) ** 2 + ((c - cCenter) * 2) ** 2);

    // Also check strict bounds if we want to be precise, but "nearest center" is more robust broadly
    // Let's use nearest center logic but valid only if somewhat close
    if (dist < minDist) {
      minDist = dist;
      bestTone = t.name;
    }
  }
  return bestTone;
}

export const toOklch = converter("oklch");

import { CREATIVE_NAMES } from "./colorNamesDictionary";

export function getNearestPoeticName(hex: string): {
  groupName: string;
  groupSlug: string;
  fullTitle: string;
} {
  const c = toOklch(hex);
  if (!c) {
    return {
      groupName: "Unknown",
      groupSlug: "unknown",
      fullTitle: "Unknown Color",
    };
  }

  const l = c.l ?? 0;
  const chroma = c.c ?? 0;
  // Use Circular Hue (0-360)
  const h = c.h ?? 0;

  // 1. Determine Hue Name
  // Special Handling for Achromatic (Neutral)
  let hueName = "";
  if (chroma < 0.02) {
    hueName = "Neutral";
  } else {
    hueName = getPseudoHueName(h);
  }

  // 2. Determine Tone Name
  const toneName = getToneName(l, chroma);

  // 3. Lookup Creative Name
  const key = `${toneName}-${hueName}`;
  const creativeName = CREATIVE_NAMES[key] || `${toneName} ${hueName}`; // Fallback

  const groupName = creativeName;
  // Robust Slug Generation: "Angel's Breath" -> "angels-breath"
  const groupSlug = groupName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    groupName,
    groupSlug,
    fullTitle: groupName,
  };
}

// Reverse Lookup for SEO / Slug Validation
import { oklchToHex } from "./oklch";

export function getColorFromSlug(slug: string): string | null {
  if (!slug || slug === "unknown") return null;

  // Iterate over dictionay to find matching slug
  // This is O(N) where N=350, very fast.
  const entry = Object.entries(CREATIVE_NAMES).find((entry) => {
    const name = entry[1];
    const s = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return s === slug;
  });

  if (!entry) return null;

  const [key] = entry; // "Tone-Hue"
  const [toneName, hueName] = key.split("-");

  // Reconstruct Color from Tone/Hue centers
  const toneDef = POETIC_TONES.find((t) => t.name === toneName);
  if (!toneDef) return null; // Should not happen

  let h = 0;
  if (hueName === "Neutral") {
    h = 0;
  } else {
    const hueDef = POETIC_HUES.find((h) => h.name === hueName);
    if (hueDef) h = hueDef.start;
  }

  const l = (toneDef.lMin + toneDef.lMax) / 2;
  const c = (toneDef.cMin + toneDef.cMax) / 2;

  // Convert to Hex
  return oklchToHex({
    hue: h,
    lightness: l,
    chroma: c,
    weight: 1,
  });
}
