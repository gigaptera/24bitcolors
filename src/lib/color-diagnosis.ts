/**
 * 色の好み診断アルゴリズム
 * 二択を繰り返す適応的アルゴリズム
 */
import {
  OklchColor,
  colorDistance,
  weightedAverageHue,
  initializeColorSpace,
  oklchToHex,
} from "./oklch";

export interface DiagnosisState {
  colorSpace: OklchColor[];
  currentQuestion: number;
  totalQuestions: number;
  currentPrediction: OklchColor | null;
  confidence: number;
}

export interface ColorPair {
  colorA: OklchColor;
  colorB: OklchColor;
}

export interface DiagnosisResult {
  color: OklchColor;
  hex: string;
  confidence: number;
}

/**
 * 診断の初期状態を作成
 */
export function createDiagnosisState(): DiagnosisState {
  return {
    colorSpace: initializeColorSpace(),
    currentQuestion: 0,
    totalQuestions: 20,
    currentPrediction: null,
    confidence: 50,
  };
}

/**
 * 最適な2色のペアを選択（情報量最大化 + ランダム性）
 */
export function selectOptimalColorPair(
  state: DiagnosisState,
  history: ColorPair[] = []
): ColorPair {
  const validColors = state.colorSpace.filter((c) => c.weight > 0.001);

  if (validColors.length < 2) {
    return { colorA: validColors[0], colorB: validColors[0] };
  }

  // 過去に出題されたペアのシグネチャセットを作成 (重複防止)
  const historySignatures = new Set(
    history.map((h) => {
      const h1 = oklchToHex(h.colorA);
      const h2 = oklchToHex(h.colorB);
      return h1 < h2 ? `${h1}-${h2}` : `${h2}-${h1}`;
    })
  );

  const isDuplicate = (c1: OklchColor, c2: OklchColor) => {
    const h1 = oklchToHex(c1);
    const h2 = oklchToHex(c2);
    const signature = h1 < h2 ? `${h1}-${h2}` : `${h2}-${h1}`;
    return historySignatures.has(signature);
  };

  const MIN_DISTANCE = 0.15; // 似すぎている色を防止する閾値

  // 初回質問の場合、よりランダムに色を選択
  if (state.currentQuestion === 0) {
    // ランダムに候補を選択
    const shuffled = [...validColors].sort(() => Math.random() - 0.5);
    const candidates = shuffled.slice(0, 30);

    // 距離が大きいペアを探索
    let bestPair: ColorPair = { colorA: candidates[0], colorB: candidates[1] };
    let maxDistance = 0;

    for (let i = 0; i < candidates.length; i++) {
      for (let j = i + 1; j < candidates.length; j++) {
        const c1 = candidates[i];
        const c2 = candidates[j];

        // 重複チェック
        if (isDuplicate(c1, c2)) continue;

        const distance = colorDistance(c1, c2);

        // 類似すぎチェック
        if (distance < MIN_DISTANCE) continue;

        if (distance > maxDistance) {
          maxDistance = distance;
          bestPair = { colorA: c1, colorB: c2 };
        }
      }
    }

    // ランダムに順序を入れ替え
    if (Math.random() > 0.5) {
      return { colorA: bestPair.colorB, colorB: bestPair.colorA };
    }
    return bestPair;
  }

  // 通常の選択ロジック
  // 重み付きでサンプリング（上位色を優先的に選択）
  const sortedByWeight = [...validColors].sort((a, b) => b.weight - a.weight);

  // 候補プールを広げて多様性を確保 (30 -> 50)
  const candidates = sortedByWeight.slice(
    0,
    Math.min(50, sortedByWeight.length)
  );

  let bestPair: ColorPair = { colorA: candidates[0], colorB: candidates[1] };
  let maxDistance = 0;

  // 距離が最大のペアを探索、ただし重複と類似は避ける
  let foundValidPair = false;

  for (let i = 0; i < candidates.length; i++) {
    for (let j = i + 1; j < candidates.length; j++) {
      const c1 = candidates[i];
      const c2 = candidates[j];

      if (isDuplicate(c1, c2)) continue;

      const distance = colorDistance(c1, c2);

      // 類似の排除（ただし後半で候補がない場合は緩和するロジックも検討可だが、一旦厳格に）
      if (distance < MIN_DISTANCE) continue;

      if (distance > maxDistance) {
        maxDistance = distance;
        bestPair = { colorA: c1, colorB: c2 };
        foundValidPair = true;
      }
    }
  }

  // もし有効なペアが見つからなかった場合（収束しすぎて候補が近い場合など）、
  // 距離条件を無視して、重複チェックのみで最大距離を選ぶ
  if (!foundValidPair) {
    maxDistance = 0;
    for (let i = 0; i < candidates.length; i++) {
      for (let j = i + 1; j < candidates.length; j++) {
        const c1 = candidates[i];
        const c2 = candidates[j];
        if (isDuplicate(c1, c2)) continue;
        const distance = colorDistance(c1, c2);
        if (distance > maxDistance) {
          maxDistance = distance;
          bestPair = { colorA: c1, colorB: c2 };
        }
      }
    }
  }

  // ランダムに順序を入れ替えてバイアスを防ぐ
  if (Math.random() > 0.5) {
    return { colorA: bestPair.colorB, colorB: bestPair.colorA };
  }

  return bestPair;
}

/**
 * ユーザーの選択を処理して状態を更新
 */
export function processChoice(
  state: DiagnosisState,
  choice: "A" | "B",
  colorPair: ColorPair
): DiagnosisState {
  const selectedColor = choice === "A" ? colorPair.colorA : colorPair.colorB;
  const rejectedColor = choice === "A" ? colorPair.colorB : colorPair.colorA;

  // 重みを更新
  const updatedColorSpace = state.colorSpace.map((color) => {
    const distToSelected = colorDistance(color, selectedColor);
    const distToRejected = colorDistance(color, rejectedColor);

    let newWeight = color.weight;
    if (distToSelected < distToRejected) {
      newWeight *= 1.3; // 選ばれた色に近い → 重み増加
    } else {
      newWeight *= 0.6; // 遠い → 重み減少
    }

    return { ...color, weight: newWeight };
  });

  // 重みを正規化
  const totalWeight = updatedColorSpace.reduce((sum, c) => sum + c.weight, 0);
  const normalizedColorSpace = updatedColorSpace.map((c) => ({
    ...c,
    weight: c.weight / totalWeight,
  }));

  // 予測を更新
  const prediction = calculatePrediction(normalizedColorSpace);
  const newQuestion = state.currentQuestion + 1;
  const confidence = Math.min(98, 50 + newQuestion * 2.4);

  return {
    colorSpace: normalizedColorSpace,
    currentQuestion: newQuestion,
    totalQuestions: state.totalQuestions,
    currentPrediction: prediction,
    confidence,
  };
}

/**
 * 現在の予測色を計算
 */
function calculatePrediction(colorSpace: OklchColor[]): OklchColor {
  const validColors = colorSpace.filter((c) => c.weight > 0.001);
  const weights = validColors.map((c) => c.weight);

  // 色相の加重平均（円形座標で計算）
  const avgHue = weightedAverageHue(validColors, weights);

  // 明度と彩度の加重平均
  let avgLightness = 0;
  let avgChroma = 0;
  let totalWeight = 0;

  validColors.forEach((color, i) => {
    avgLightness += color.lightness * weights[i];
    avgChroma += color.chroma * weights[i];
    totalWeight += weights[i];
  });

  return {
    hue: avgHue,
    lightness: avgLightness / totalWeight,
    chroma: avgChroma / totalWeight,
    weight: 1,
  };
}

/**
 * 最終結果を取得
 */
export function getFinalResult(state: DiagnosisState): DiagnosisResult {
  // 上位5色の加重平均
  const topColors = [...state.colorSpace]
    .filter((c) => c.weight > 0)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 5);

  const weights = topColors.map((c) => c.weight);
  const avgHue = weightedAverageHue(topColors, weights);

  let avgLightness = 0;
  let avgChroma = 0;
  let totalWeight = 0;

  topColors.forEach((color, i) => {
    avgLightness += color.lightness * weights[i];
    avgChroma += color.chroma * weights[i];
    totalWeight += weights[i];
  });

  const finalColor: OklchColor = {
    hue: avgHue,
    lightness: avgLightness / totalWeight,
    chroma: avgChroma / totalWeight,
    weight: 1,
  };

  return {
    color: finalColor,
    hex: oklchToHex(finalColor),
    confidence: Math.min(98, 70 + state.currentQuestion * 1.4),
  };
}

/**
 * 診断が完了したかどうか
 * currentQuestion は 0-indexed なので、totalQuestions (20) に達したら完了
 * 表示は +1 されるので「20/20」で選択後に完了
 */
export function isDiagnosisComplete(state: DiagnosisState): boolean {
  return state.currentQuestion >= state.totalQuestions;
}

/**
 * 進捗率を取得
 */
export function getProgress(state: DiagnosisState): number {
  return (state.currentQuestion / state.totalQuestions) * 100;
}
