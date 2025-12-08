"use client";

import { useState } from "react";
import { DiagnosisResult } from "@/lib/color-diagnosis";
import { saveFeedback } from "@/lib/feedback";
import { ShareCard } from "./ShareCard";

interface ResultScreenProps {
  result: DiagnosisResult;
  onRestart: () => void;
}

const ratingLabels = [
  { value: 1, emoji: "😞", label: "全然違う" },
  { value: 2, emoji: "😕", label: "少し違う" },
  { value: 3, emoji: "😐", label: "まあまあ" },
  { value: 4, emoji: "😊", label: "近い" },
  { value: 5, emoji: "🎯", label: "ピッタリ！" },
];

/**
 * ギャラリー風カードのプレビューコンポーネント
 * ShareCardと同じレイアウト（美術館のキャプションカード風）
 */
function GalleryCardPreview({
  hex,
  lightness,
  chroma,
  hue,
}: {
  hex: string;
  lightness: number;
  chroma: number;
  hue: number;
}) {
  return (
    <div
      className="overflow-hidden rounded-xl bg-[#E8E8E8] p-6 shadow-lg"
      style={{ width: "200px" }}
    >
      {/* 色の絵（黒フレーム付き） */}
      <div className="mx-auto mb-5">
        <div
          className="p-1"
          style={{
            backgroundColor: "#000",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "720 / 480",
              backgroundColor: hex,
            }}
          />
        </div>
      </div>

      {/* キャプションカード（左揃え、中央配置） */}
      <div className="text-left">
        <p
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: "14px",
            fontWeight: 500,
            color: "#2C2C2C",
            lineHeight: 1.3,
          }}
        >
          Your Color
        </p>
        <p
          style={{
            fontFamily: '"SF Mono", "Courier New", Courier, monospace',
            fontSize: "12px",
            fontWeight: 400,
            color: "#000000",
            marginTop: "4px",
            lineHeight: 1.3,
          }}
        >
          {hex.toUpperCase()}
        </p>
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "10px",
            fontWeight: 300,
            color: "#666666",
            marginTop: "4px",
            lineHeight: 1.3,
          }}
        >
          24bitColors, 2025
        </p>
        <p
          style={{
            fontFamily: '"SF Mono", monospace',
            fontSize: "9px",
            fontWeight: 300,
            color: "#999999",
            marginTop: "4px",
            lineHeight: 1.3,
          }}
        >
          L:{Math.round(lightness * 100)} C:{Math.round(chroma * 100)} H:
          {Math.round(hue)}°
        </p>
      </div>
    </div>
  );
}

export function ResultScreen({ result, onRestart }: ResultScreenProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);

  const handleRatingSubmit = async () => {
    if (rating === null) return;

    await saveFeedback({
      hex: result.hex,
      hue: result.color.hue,
      lightness: result.color.lightness,
      chroma: result.color.chroma,
      rating,
    });

    setSubmitted(true);
  };

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <div className="mb-2 text-4xl">🎯</div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          診断完了！
        </h2>

        {/* ギャラリー風カードプレビュー */}
        <div className="mb-6">
          <GalleryCardPreview
            hex={result.hex}
            lightness={result.color.lightness}
            chroma={result.color.chroma}
            hue={result.color.hue}
          />
        </div>

        {/* 5段階評価 */}
        {!submitted ? (
          <div className="mb-6 w-full">
            <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              この色はあなたの好みに合っていますか？
            </p>
            <div className="mb-3 flex justify-center gap-2">
              {ratingLabels.map(({ value, emoji }) => (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl transition-all ${
                    rating === value
                      ? "scale-110 bg-indigo-100 ring-2 ring-indigo-500 dark:bg-indigo-900"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                  }`}
                  aria-label={ratingLabels[value - 1].label}
                >
                  {emoji}
                </button>
              ))}
            </div>
            {rating && (
              <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                {ratingLabels[rating - 1].label}
              </div>
            )}
            <button
              onClick={handleRatingSubmit}
              disabled={rating === null}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                rating !== null
                  ? "bg-indigo-500 text-white hover:bg-indigo-600"
                  : "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-700"
              }`}
            >
              評価を送信
            </button>
          </div>
        ) : (
          <div className="mb-6 rounded-xl bg-green-50 px-4 py-3 dark:bg-green-900/30">
            <p className="text-sm font-medium text-green-700 dark:text-green-300">
              ✓ フィードバックありがとうございます！
            </p>
          </div>
        )}

        {/* アクションボタン */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => setShowShareCard(true)}
            className="flex items-center justify-center gap-2 rounded-full bg-indigo-500 px-6 py-3 font-medium text-white transition-all hover:bg-indigo-600"
          >
            🖼️ 画像でシェア
          </button>
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 rounded-full bg-gray-500 px-6 py-3 font-medium text-white transition-all hover:bg-gray-600"
          >
            🔄 もう一度診断
          </button>
        </div>
      </div>

      {/* シェアカードモーダル */}
      {showShareCard && (
        <ShareCard
          color={result.color}
          hex={result.hex}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </>
  );
}
