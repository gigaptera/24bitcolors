/**
 * 背景色ユーティリティ
 * テキストの視認性を確保するため、色の明度を調整
 */
import { converter, formatHex } from "culori";

const toOklch = converter("oklch");
const toRgb = converter("rgb");

/**
 * 診断色から背景用のライトバージョンを生成
 * 明度を最低 0.85 以上に調整し、彩度も控えめに
 * @param hex - 元の色 (#RRGGBB)
 * @returns 背景用の明るい色 (#RRGGBB)
 */
export function getLightBackgroundColor(hex: string): string {
  const oklch = toOklch(hex);
  if (!oklch) return "#fafafa";

  // 明度を 0.85 以上に制限（暗い色でも明るく）
  // 彩度を 30% に制限（くすませる）
  const adjustedOklch = {
    mode: "oklch" as const,
    l: Math.max(oklch.l ?? 0.5, 0.85),
    c: Math.min(oklch.c ?? 0, 0.08), // 彩度を控えめに
    h: oklch.h ?? 0,
  };

  const rgb = toRgb(adjustedOklch);
  return formatHex(rgb) || "#fafafa";
}

/**
 * 色の明度を取得 (0-1)
 */
export function getLightness(hex: string): number {
  const oklch = toOklch(hex);
  return oklch?.l ?? 0.5;
}
