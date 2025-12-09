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
