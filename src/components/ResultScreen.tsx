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
  { value: 1, emoji: "1", label: "全然違う" },
  { value: 2, emoji: "2", label: "少し違う" },
  { value: 3, emoji: "3", label: "まあまあ" },
  { value: 4, emoji: "4", label: "近い" },
  { value: 5, emoji: "5", label: "ピッタリ" },
];

/**
 * ギャラリー風カードのプレビューコンポーネント
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
      className="overflow-hidden bg-[#E8E8E8] p-6"
      style={{ width: "220px" }}
    >
      {/* 色の絵（黒フレーム付き） */}
      <div className="mb-5">
        <div className="color-frame">
          <div
            style={{
              width: "100%",
              aspectRatio: "720 / 480",
              backgroundColor: hex,
            }}
          />
        </div>
      </div>

      {/* キャプションカード */}
      <div className="text-left">
        <p
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: "16px",
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
            fontSize: "14px",
            fontWeight: 400,
            color: "#000000",
            marginTop: "6px",
            lineHeight: 1.3,
          }}
        >
          {hex.toUpperCase()}
        </p>
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "12px",
            fontWeight: 300,
            color: "#666666",
            marginTop: "6px",
            lineHeight: 1.3,
          }}
        >
          24bitcolors.com 2025
        </p>
        <p
          style={{
            fontFamily: '"SF Mono", monospace',
            fontSize: "11px",
            fontWeight: 300,
            color: "#999999",
            marginTop: "6px",
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
        {/* タイトル */}
        <h2
          className="mb-8 text-2xl font-normal"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Diagnosis Complete
        </h2>

        {/* ギャラリー風カードプレビュー */}
        <div className="mb-8">
          <GalleryCardPreview
            hex={result.hex}
            lightness={result.color.lightness}
            chroma={result.color.chroma}
            hue={result.color.hue}
          />
        </div>

        {/* 5段階評価 */}
        {!submitted ? (
          <div className="mb-8 w-full">
            <p
              className="mb-4 text-sm text-gray-600"
              style={{ fontFamily: "Georgia, serif" }}
            >
              この診断結果はいかがでしたか？
            </p>
            <div className="mb-4 flex justify-center gap-2">
              {ratingLabels.map(({ value, emoji }) => (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  className={`flex h-10 w-10 items-center justify-center border text-sm transition-all ${
                    rating === value
                      ? "border-black bg-black text-white"
                      : "border-gray-400 bg-transparent text-gray-600 hover:border-black"
                  }`}
                  style={{ fontFamily: '"SF Mono", monospace' }}
                  aria-label={ratingLabels[value - 1].label}
                >
                  {emoji}
                </button>
              ))}
            </div>
            {rating && (
              <div
                className="mb-3 text-sm text-gray-500"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {ratingLabels[rating - 1].label}
              </div>
            )}
            <button
              onClick={handleRatingSubmit}
              disabled={rating === null}
              className={`text-sm ${
                rating !== null
                  ? "btn-museum"
                  : "cursor-not-allowed bg-gray-300 px-6 py-3 text-gray-500"
              }`}
            >
              評価を送信
            </button>
          </div>
        ) : (
          <div className="mb-8">
            <p
              className="text-sm text-gray-600"
              style={{ fontFamily: "Georgia, serif" }}
            >
              ✓ フィードバックありがとうございます
            </p>
          </div>
        )}

        {/* アクションボタン */}
        <div className="flex gap-4">
          <button onClick={() => setShowShareCard(true)} className="btn-museum">
            画像でシェア
          </button>
          <button onClick={onRestart} className="btn-museum-outline">
            もう一度診断
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
