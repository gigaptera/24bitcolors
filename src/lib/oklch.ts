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
 * OKLCH空間での2色間の距離を計算
 */
export function colorDistance(colorA: OklchColor, colorB: OklchColor): number {
  const hueDist = circularHueDistance(colorA.hue, colorB.hue) / 180; // 0-2の範囲に正規化
  const lightnessDist = Math.abs(colorA.lightness - colorB.lightness);
  const chromaDist = Math.abs(colorA.chroma - colorB.chroma) * 4; // 彩度を重み付け

  return Math.sqrt(hueDist ** 2 + lightnessDist ** 2 + chromaDist ** 2);
}

/**
 * 色相の加重平均を計算（円形座標として処理）
 */
export function weightedAverageHue(
  colors: OklchColor[],
  weights: number[]
): number {
  let sinSum = 0;
  let cosSum = 0;
  let totalWeight = 0;

  colors.forEach((color, i) => {
    const weight = weights[i] || 0;
    const hueRad = (color.hue * Math.PI) / 180;
    sinSum += Math.sin(hueRad) * weight;
    cosSum += Math.cos(hueRad) * weight;
    totalWeight += weight;
  });

  if (totalWeight === 0) return 0;

  let avgHue = (Math.atan2(sinSum, cosSum) * 180) / Math.PI;
  if (avgHue < 0) avgHue += 360;

  return avgHue;
}

/**
 * 診断用の初期色空間を生成（288色）
 */
export function initializeColorSpace(): OklchColor[] {
  const colors: OklchColor[] = [];

  // 色相: 24分割 (0°, 15°, 30°, ..., 345°)
  // 明度: 3段階 (0.3, 0.55, 0.8)
  // 彩度: 4段階 (0.08, 0.12, 0.16, 0.20)
  for (let h = 0; h < 360; h += 15) {
    for (const l of [0.3, 0.55, 0.8]) {
      for (const c of [0.08, 0.12, 0.16, 0.2]) {
        colors.push({
          hue: h,
          lightness: l,
          chroma: c,
          weight: 1.0,
        });
      }
    }
  }

  // 無彩色 (Achromatic) の追加
  // 彩度をほぼ0 (0.01) に設定し、明度のバリエーションを持たせる
  // 0.0 (Black) と 1.0 (White) を追加してダイナミックレンジを最大化
  const achromaticLightness = [0.0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 0.95, 1.0];
  for (const l of achromaticLightness) {
    colors.push({
      hue: 0, // 無彩色なので色相は無視されるが便宜上0
      lightness: l,
      chroma: 0.01, // ほぼ無彩色
      weight: 1.0,
    });
  }

  return colors;
}
