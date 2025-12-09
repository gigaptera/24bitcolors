import { useState, useEffect } from "react";
import { DiagnosisResult } from "@/lib/color-diagnosis";
import { saveFeedback } from "@/lib/feedback";
import { ShareCard } from "./ShareCard";
import { ShareActions } from "./ShareActions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ResultScreenProps {
  result: DiagnosisResult;
}

const ratingLabels = [
  { value: 1, emoji: "1", label: "全然違う" },
  { value: 2, emoji: "2", label: "少し違う" },
  { value: 3, emoji: "3", label: "まあまあ" },
  { value: 4, emoji: "4", label: "近い" },
  { value: 5, emoji: "5", label: "ピッタリ" },
];

import { useTheme } from "./ThemeProvider";

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
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = isDark
    ? {
        bg: "#1A1A1A",
        frame: "#E5E5E5",
        textMain: "#E0E0E0",
        textHex: "#FFFFFF",
        textSub: "#AAAAAA",
        textInfo: "#888888",
        containerBg: "#1A1A1A", // カード外枠
      }
    : {
        bg: "#E8E8E8",
        frame: "#000000",
        textMain: "#2C2C2C",
        textHex: "#000000",
        textSub: "#666666",
        textInfo: "#999999",
        containerBg: "#E8E8E8",
      };

  return (
    <div
      className="mx-auto flex flex-col items-center p-6 shadow-xl transition-colors duration-500"
      style={{
        width: "240px",
        backgroundColor: colors.containerBg,
      }}
    >
      {/* 色の絵（フレーム付き） */}
      <div className="mb-5 w-full">
        <div
          className="border-[6px] bg-white p-0 shadow-lg transition-colors duration-500"
          style={{ borderColor: colors.frame }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              backgroundColor: hex,
            }}
          />
        </div>
      </div>

      {/* キャプションカード */}
      <div className="w-full text-left">
        {/* Brand Name - User Request: Main position */}
        <p
          className="mb-1 text-lg font-bold transition-colors duration-500"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            color: colors.textMain,
          }}
        >
          24bitColors
        </p>

        {/* HEX Code */}
        <p
          className="mb-2 text-base font-normal transition-colors duration-500"
          style={{
            fontFamily: '"SF Mono", "Courier New", Courier, monospace',
            color: colors.textHex,
          }}
        >
          {hex.toUpperCase()}
        </p>

        {/* Sub Info */}
        <p
          className="mb-1 text-xs transition-colors duration-500"
          style={{
            fontFamily: "Georgia, serif",
            color: colors.textSub,
          }}
        >
          Your Personal Color
        </p>

        {/* LCH Data */}
        <p
          className="text-[10px] font-light transition-colors duration-500"
          style={{
            fontFamily: '"SF Mono", monospace',
            color: colors.textInfo,
          }}
        >
          L:{Math.round(lightness * 100)} C:{Math.round(chroma * 100)} H:
          {Math.round(hue)}°
        </p>
      </div>
    </div>
  );
}

export function ResultScreen({ result }: ResultScreenProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const [diagnosisId, setDiagnosisId] = useState<string | undefined>(undefined);

  // Load diagnosis ID on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const id = localStorage.getItem("lastDiagnosisId");
      if (id) setDiagnosisId(id);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleRatingSubmit = async () => {
    if (rating === null) return;

    await saveFeedback({
      diagnosis_id: diagnosisId,
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
          className="mb-space-5 text-[length:var(--text-medium)] font-normal text-[var(--foreground)]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Diagnosis Complete
        </h2>

        {/* ギャラリー風カードプレビュー */}
        <div className="mb-space-6">
          <GalleryCardPreview
            hex={result.hex}
            lightness={result.color.lightness}
            chroma={result.color.chroma}
            hue={result.color.hue}
          />
        </div>

        {/* 5段階評価 */}
        {!submitted ? (
          <div className="mb-space-6 w-full">
            <p
              className="mb-space-4 text-[length:var(--text-base)] text-[var(--muted-foreground)]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              この診断結果はいかがでしたか？
            </p>
            <div className="mb-space-4 flex justify-center gap-space-2">
              {ratingLabels.map(({ value, emoji }) => (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  className={`flex h-10 w-10 items-center justify-center border text-[length:var(--text-base)] transition-all ${
                    rating === value
                      ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                      : "border-[var(--muted-foreground)] bg-transparent text-[var(--muted-foreground)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
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
                className="mb-space-3 text-[length:var(--text-base)] text-[var(--muted-foreground)]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {ratingLabels[rating - 1].label}
              </div>
            )}
            <Button
              onClick={handleRatingSubmit}
              disabled={rating === null}
              className={
                rating === null
                  ? "cursor-not-allowed opacity-50 bg-muted text-muted-foreground"
                  : ""
              }
            >
              評価を送信
            </Button>
          </div>
        ) : (
          <div className="mb-space-6 w-full animate-fade-in">
            <p
              className="mb-space-4 text-[length:var(--text-base)] text-[var(--muted-foreground)]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              ✓ フィードバックありがとうございます
            </p>

            {/* URLシェア (Phase 1.5) */}
            <ShareActions
              url={`https://24bitcolors.com/${result.hex.replace("#", "")}`}
              colors={{ name: result.hex.toUpperCase(), code: result.hex }}
            />

            {/* アクションボタン */}
            <div className="flex justify-center gap-4">
              <Button onClick={() => setShowShareCard(true)}>
                画像でシェア
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/${result.hex.replace("#", "")}`}>詳細を見る</Link>
              </Button>
            </div>

            {/* Detailed Feedback CTA */}
            <div className="mt-8 border-t border-border/40 pt-4">
              <p className="mb-2 text-xs text-muted-foreground font-serif">
                もしよろしければ、アルゴリズム精度向上のために
                <br />
                詳細なフィードバックにご協力ください。
              </p>
              <Button
                variant="link"
                size="sm"
                asChild
                className="text-xs text-muted-foreground hover:text-foreground underline-offset-4"
              >
                <Link
                  href="/diagnosis/logic/feedback"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  詳細フィードバックフォームへ進む &rarr;
                </Link>
              </Button>
            </div>
          </div>
        )}
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
