"use client";

import { ColorButton } from "./ColorButton";
import { OklchColor, oklchToHex } from "@/lib/oklch";

interface QuestionScreenProps {
  questionNumber: number;
  totalQuestions: number;
  colorA: OklchColor;
  colorB: OklchColor;
  prediction: OklchColor | null;
  confidence: number;
  onSelectA: () => void;
  onSelectB: () => void;
}

export function QuestionScreen({
  questionNumber,
  totalQuestions,
  colorA,
  colorB,
  prediction,
  confidence,
  onSelectA,
  onSelectB,
}: QuestionScreenProps) {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="flex w-full flex-col items-center">
      {/* プログレスバー */}
      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 質問カウント */}
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        質問 {questionNumber + 1} / {totalQuestions}
      </p>

      {/* 質問テキスト */}
      <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
        どちらの色がお好みですか？
      </h2>

      {/* 色選択 */}
      <div className="mb-6 grid w-full grid-cols-2 gap-4">
        <ColorButton color={colorA} onClick={onSelectA} />
        <ColorButton color={colorB} onClick={onSelectB} />
      </div>

      {/* 予測表示 */}
      {prediction && (
        <div className="flex items-center gap-3 rounded-xl bg-gray-100 px-4 py-3 dark:bg-gray-800">
          <div
            className="h-8 w-8 rounded-full shadow-inner"
            style={{ backgroundColor: oklchToHex(prediction) }}
          />
          <div className="text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              現在の予想:{" "}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {oklchToHex(prediction)}
            </span>
            <span className="ml-2 text-gray-500 dark:text-gray-500">
              ({Math.round(confidence)}%)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
