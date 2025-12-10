/**
 * OKLCH色空間ユーティリティ
 * culoriライブラリを使用した正確な色変換
 */
import { formatHex, clampChroma } from "culori";

export interface OklchColor {
  hue: number; // 0-360
  lightness: number; // 0-1
  chroma: number; // 0-0.4
  weight: number; // 重み（診断用）
}

/**
 * OKLCH色をHEX文字列に変換
 */
export function oklchToHex(color: OklchColor): string {
  const oklchColor = {
    mode: "oklch" as const,
    l: color.lightness,
    c: color.chroma,
    h: color.hue,
  };

  // sRGB色域外の色をクランプ
  const clampedColor = clampChroma(oklchColor, "oklch", "rgb");
  return formatHex(clampedColor) || "#000000";
}

/**
 * 色相の円形距離を計算（0°と350°は10°離れている）
 */
export function circularHueDistance(h1: number, h2: number): number {
  const diff = Math.abs(h1 - h2);
  return Math.min(diff, 360 - diff);
}

/**
 * OklchColorをOklab直交座標(L, a, b)に変換
 * 無彩色（chroma≈0）でもa≈0, b≈0となり安定した距離計算が可能
 */
export function toOklabCartesian(color: OklchColor): {
  L: number;
  a: number;
  b: number;
} {
  const hueRad = (color.hue * Math.PI) / 180;
  return {
    L: color.lightness,
    a: color.chroma * Math.cos(hueRad),
    b: color.chroma * Math.sin(hueRad),
  };
}

/**
 * OKLCH空間での2色間の距離を計算
 * Oklab直交座標系でユークリッド距離を計算することで
 * 無彩色（chroma≈0）でも安定した結果を得る
 */
export function colorDistance(colorA: OklchColor, colorB: OklchColor): number {
  const pA = toOklabCartesian(colorA);
  const pB = toOklabCartesian(colorB);

  // Oklab空間でのユークリッド距離
  return Math.sqrt(
    (pA.L - pB.L) ** 2 + (pA.a - pB.a) ** 2 + (pA.b - pB.b) ** 2
  );
}

/**
 * 色相の加重平均を計算（円形座標として処理）
 * 無彩色（chroma < ACHROMATIC_THRESHOLD）は色相が定義できないためスキップ
 */
const ACHROMATIC_THRESHOLD = 0.02;

export function weightedAverageHue(
  colors: OklchColor[],
  weights: number[]
): number {
  let sinSum = 0;
  let cosSum = 0;
  let totalWeight = 0;

  colors.forEach((color, i) => {
    const weight = weights[i] || 0;
    // 無彩色は色相が定義できないためスキップ
    if (color.chroma < ACHROMATIC_THRESHOLD) return;

    const hueRad = (color.hue * Math.PI) / 180;
    sinSum += Math.sin(hueRad) * weight;
    cosSum += Math.cos(hueRad) * weight;
    totalWeight += weight;
  });

  // 有彩色がない場合（全て無彩色）は0を返す
  if (totalWeight === 0) return 0;

  let avgHue = (Math.atan2(sinSum, cosSum) * 180) / Math.PI;
  if (avgHue < 0) avgHue += 360;

  return avgHue;
}

/**
 * 等間隔の数列を生成
 */
function linspace(start: number, end: number, n: number): number[] {
  const step = (end - start) / (n - 1);
  return Array.from({ length: n }, (_, i) => start + step * i);
}

/**
 * 色がsRGB色域内かチェック
 */
function isInGamut(l: number, c: number, h: number): boolean {
  const oklch = { mode: "oklch" as const, l, c, h };
  const clamped = clampChroma(oklch, "oklch", "rgb");
  return Math.abs((clamped.c ?? 0) - c) < 0.005;
}

/**
 * 診断用の初期色空間を生成（ハイブリッド方式）
 * 無彩色の安定性と有彩色の解像度を両立
 */
export function initializeColorSpace(): OklchColor[] {
  const colors: OklchColor[] = [];

  // 1. 無彩色 (Achromatic) - Chroma = 0
  // 明度 (Lightness) を0.0〜1.0の間で細かく刻む（16段階）
  const achromaticL = linspace(0.0, 1.0, 16);
  for (const l of achromaticL) {
    colors.push({
      hue: 0, // 無彩色なので色相は無視
      lightness: l,
      chroma: 0, // 完全な無彩色
      weight: 1.0,
    });
  }

  // 2. 有彩色 (Chromatic) - 極座標ベース
  // 色相 (Hue): 15度刻みで均等配置 (24分割)
  for (let h = 0; h < 360; h += 15) {
    // 明度 (Lightness): 0.25 ~ 0.85 (5段階)
    const L_STEPS = [0.25, 0.4, 0.55, 0.7, 0.85];
    for (const l of L_STEPS) {
      // 彩度 (Chroma): 0.06 ~ 色域限界 (4段階)
      // 無彩色判定の閾値(0.04)より大きい値からスタートして有彩色を保証
      const C_STEPS = [0.06, 0.11, 0.16, 0.22];

      for (const c of C_STEPS) {
        // sRGB色域内のみ追加
        if (isInGamut(l, c, h)) {
          colors.push({
            hue: h,
            lightness: l,
            chroma: c,
            weight: 1.0,
          });
        }
      }
    }
  }

  return colors;
}
