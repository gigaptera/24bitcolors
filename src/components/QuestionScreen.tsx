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
  onUndo?: () => void;
}

export function QuestionScreen({
  questionNumber,
  totalQuestions,
  colorA,
  colorB,
  prediction,
  onSelectA,
  onSelectB,
  onUndo,
}: QuestionScreenProps) {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="flex w-full flex-col items-center">
      {/* プログレスバー */}
      <div className="mb-6 h-px w-full bg-gray-400">
        <div
          className="h-full bg-black transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 質問カウント + 戻るボタン */}
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="w-16">
          {onUndo && (
            <button
              onClick={onUndo}
              className="text-sm text-gray-500 transition-colors hover:text-black"
              style={{ fontFamily: "Georgia, serif" }}
            >
              ← 戻る
            </button>
          )}
        </div>
        <p
          className="text-sm tracking-wider text-gray-500"
          style={{ fontFamily: '"SF Mono", monospace' }}
        >
          {questionNumber + 1} / {totalQuestions}
        </p>
        <div className="w-16" />
      </div>

      {/* 質問テキスト */}
      <h2
        className="mb-8 text-xl font-normal"
        style={{ fontFamily: "Georgia, serif" }}
      >
        どちらの色がお好みですか？
      </h2>

      {/* 色選択 */}
      <div className="mb-8 grid w-full max-w-md grid-cols-2 gap-6">
        <ColorButton color={colorA} onClick={onSelectA} />
        <ColorButton color={colorB} onClick={onSelectB} />
      </div>

      {/* 予測表示 */}
      {prediction && (
        <div className="flex items-center gap-4">
          <div
            className="h-6 w-6 border border-black"
            style={{ backgroundColor: oklchToHex(prediction) }}
          />
          <div
            className="text-sm"
            style={{ fontFamily: '"SF Mono", monospace' }}
          >
            <span className="text-gray-500">Prediction: </span>
            <span className="text-gray-800">{oklchToHex(prediction)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
