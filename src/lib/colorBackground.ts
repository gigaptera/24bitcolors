/**
 * 背景色ユーティリティ
 * テキストの視認性を確保するため、色の明度を調整
 */
import { converter, formatHex } from "culori";

const toOklch = converter("oklch");
const toRgb = converter("rgb");

/**
 * 診断色から背景用の調整済み色を生成
 * ライトモード: 明度 0.85 以上 (淡い色)
 * ダークモード: 明度 0.25 以下 (暗い色)
 *
 * @param hex - 元の色 (#RRGGBB)
 * @param isDark - ダークモードかどうか
 * @returns 背景用の調整済み色 (#RRGGBB)
 */
export function getAmbientBackgroundColor(
  hex: string,
  isDark: boolean
): string {
  const oklch = toOklch(hex);
  if (!oklch) return isDark ? "#1a1a1a" : "#fafafa";

  // 彩度を控えめに（くすませる）
  const adjustedChroma = Math.min(oklch.c ?? 0, 0.06);

  // モードに応じて明度を調整
  const adjustedLightness = isDark
    ? Math.min(oklch.l ?? 0.5, 0.25) // ダーク: 暗く
    : Math.max(oklch.l ?? 0.5, 0.85); // ライト: 明るく

  const adjustedOklch = {
    mode: "oklch" as const,
    l: adjustedLightness,
    c: adjustedChroma,
    h: oklch.h ?? 0,
  };

  const rgb = toRgb(adjustedOklch);
  return formatHex(rgb) || (isDark ? "#1a1a1a" : "#fafafa");
}

/**
 * 色の明度を取得 (0-1)
 */
export function getLightness(hex: string): number {
  const oklch = toOklch(hex);
  return oklch?.l ?? 0.5;
}
