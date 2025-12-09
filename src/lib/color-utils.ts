import { formatHex, converter, parse } from "culori";

const toRgb = converter("rgb");
const toOklch = converter("oklch");
const toHsv = converter("hsv");

export interface ColorInfo {
  hex: string;
  rgb: { r: number; g: number; b: number };
  oklch: { l: number; c: number; h: number };
  hsv: { h: number; s: number; v: number };
  cmyk: { c: number; m: number; y: number; k: number };
}

/**
 * HEXコードから各種色情報を生成する
 */
export function getColorInfo(hexInput: string): ColorInfo | null {
  const color = parse(hexInput);
  if (!color) return null;

  const rgb = toRgb(color);
  const oklch = toOklch(color);
  const hsv = toHsv(color);

  // RGB to CMYK conversion (Basic implementation)
  const r = rgb.r;
  const g = rgb.g;
  const b = rgb.b;
  const k = 1 - Math.max(r, g, b);
  const c = (1 - r - k) / (1 - k) || 0;
  const m = (1 - g - k) / (1 - k) || 0;
  const y = (1 - b - k) / (1 - k) || 0;

  return {
    hex: formatHex(color).toUpperCase(),
    rgb: {
      r: Math.round(rgb.r * 255),
      g: Math.round(rgb.g * 255),
      b: Math.round(rgb.b * 255),
    },
    oklch: {
      l: oklch.l || 0,
      c: oklch.c || 0,
      h: oklch.h || 0,
    },
    hsv: {
      h: hsv.h || 0,
      s: hsv.s || 0,
      v: hsv.v || 0,
    },
    cmyk: {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
    },
  };
}

/**
 * 正規のHEXコードか検証する (3桁 or 6桁, #ありなし許容)
 */
export function isValidHex(hex: string): boolean {
  return /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i.test(hex);
}

/**
 * URLパラメータ用にHEXを正規化 (必ず6桁、#なし)
 */
export function normalizeHexForUrl(hex: string): string {
  const cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    return cleanHex
      .split("")
      .map((char) => char + char)
      .join("")
      .toUpperCase();
  }
  return cleanHex.toUpperCase();
}

/**
 * Generate 5 Tints (Lighter versions)
 */
export function getTints(hex: string, count: number = 5): string[] {
  const c = parse(hex);
  if (!c) return [];
  const ok = toOklch(c);

  const tints: string[] = [];
  // Current Lightness to 1.0 (White)
  const step = (1 - (ok.l || 0)) / (count + 1);

  for (let i = 1; i <= count; i++) {
    tints.push(formatHex({ ...ok, l: (ok.l || 0) + step * i }));
  }
  return tints;
}

/**
 * Generate 5 Shades (Darker versions)
 */
export function getShades(hex: string, count: number = 5): string[] {
  const c = parse(hex);
  if (!c) return [];
  const ok = toOklch(c);

  const shades: string[] = [];
  // Current Lightness to 0.0 (Black)
  const step = (ok.l || 0) / (count + 1);

  for (let i = 1; i <= count; i++) {
    shades.push(formatHex({ ...ok, l: (ok.l || 0) - step * i }));
  }
  return shades;
}

/**
 * Generate Color Harmonies
 */
export function getHarmonies(hex: string) {
  const c = parse(hex);
  if (!c) return null;
  const ok = toOklch(c);
  // culori handles hue in 0..360 usually, but oklch.h might be undefined for grayscale
  const h = ok.h || 0;

  const rotateHue = (degrees: number) => {
    return formatHex({ ...ok, h: (h + degrees) % 360 });
  };

  return {
    complementary: rotateHue(180),
    analogous: [rotateHue(-30), rotateHue(30)],
    triadic: [rotateHue(120), rotateHue(240)],
    tetradic: [rotateHue(90), rotateHue(180), rotateHue(270)],
    splitComplementary: [rotateHue(150), rotateHue(210)],
    pentadic: [rotateHue(72), rotateHue(144), rotateHue(216), rotateHue(288)],
    hexadic: [
      rotateHue(60),
      rotateHue(120),
      rotateHue(180),
      rotateHue(240),
      rotateHue(300),
    ],
  };
}

/**
 * Check if color is Achromatic (Neutral)
 * Threshold: Chroma < 0.03 in OKLCH
 */
export function isAchromatic(hex: string): boolean {
  const c = parse(hex);
  if (!c) return false;
  const ok = toOklch(c); // Use the converter defined at top level? No, checking imports... toOklch is const in file scope.
  // We need access to 'toOklch'. It was defined at top: const toOklch = converter("oklch");
  // Scope is fine.
  return ok.l !== undefined && ok.c !== undefined ? ok.c < 0.03 : false;
}

/**
 * Generate Accent Colors for Neutrals
 * Returns 4 distinct vibrant colors that pair well with the neutral.
 */
export function getAccents(hex: string) {
  const c = parse(hex);
  if (!c) return [];
  const ok = toOklch(c);

  // High contrast for Lightness
  const isLight = (ok.l || 0) > 0.5;
  const targetL = isLight ? 0.4 : 0.85;
  const targetC = 0.2; // Very vibrant

  // Hues: Red, Green, Blue, Yellow/Orange
  const hues = [20, 140, 260, 310];

  return hues.map((h) =>
    formatHex({ mode: "oklch", l: targetL, c: targetC, h: h })
  );
}
