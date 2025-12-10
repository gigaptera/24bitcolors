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
 * 診断用の初期色空間を生成
 * Oklab直交座標 (L, a, b) で均等配置することで
 * 無彩色も自然に含まれる
 */
export function initializeColorSpace(): OklchColor[] {
  const colors: OklchColor[] = [];

  // Oklab空間での高密度均等配置
  // L: 0.12 ~ 0.95 (9段階)
  // a: -0.16 ~ 0.16 (7段階)
  // b: -0.16 ~ 0.16 (7段階)
  const L_STEPS = linspace(0.12, 0.95, 9);
  const AB_STEPS = linspace(-0.16, 0.16, 7);

  for (const L of L_STEPS) {
    for (const a of AB_STEPS) {
      for (const b of AB_STEPS) {
        // Oklab(L,a,b) → Oklch(L,C,H) に変換
        const chroma = Math.sqrt(a ** 2 + b ** 2);
        let hue = (Math.atan2(b, a) * 180) / Math.PI;
        if (hue < 0) hue += 360;

        // sRGB色域内のみ追加
        if (isInGamut(L, chroma, hue)) {
          colors.push({
            hue,
            lightness: L,
            chroma,
            weight: 1.0,
          });
        }
      }
    }
  }

  return colors;
}
