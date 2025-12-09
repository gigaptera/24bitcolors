"use client";

import { useState, useEffect } from "react";
import { OklchColor } from "@/lib/oklch";

interface ShareCardProps {
  color: OklchColor;
  hex: string;
  onClose: () => void;
}

/**
 * ギャラリー風シェアカード生成関数
 * Canvas APIで直接描画（Instagram Story サイズ 1080x1920）
 */
function generateGalleryShareCard(
  colorHex: string,
  oklchData: { l: number; c: number; h: number }
): string {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // 背景
  ctx.fillStyle = "#E8E8E8";
  ctx.fillRect(0, 0, 1080, 1920);

  // アートワーク配置（より大きく、上寄り）
  const artX = 80;
  const artY = 200;
  const artWidth = 920;
  const artHeight = 920; // 正方形に近い大きなサイズ

  // シャドウ
  ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
  ctx.shadowBlur = 40;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 15;

  // 黒フレーム
  const frameThickness = 6;
  ctx.fillStyle = "#000000";
  ctx.fillRect(
    artX - frameThickness,
    artY - frameThickness,
    artWidth + frameThickness * 2,
    artHeight + frameThickness * 2
  );

  // 色の長方形
  ctx.fillStyle = colorHex;
  ctx.fillRect(artX, artY, artWidth, artHeight);

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  // ミュージアムラベル
  const labelX = artX;
  const labelBaseY = artY + artHeight + 80;

  // "Your Color"
  ctx.fillStyle = "#2C2C2C";
  ctx.font = '500 64px Georgia, "Times New Roman", serif';
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Your Color", labelX, labelBaseY);

  // HEXコード
  ctx.font = '400 56px "SF Mono", "Courier New", Courier, monospace';
  ctx.fillStyle = "#000000";
  ctx.fillText(colorHex.toUpperCase(), labelX, labelBaseY + 90);

  // "24bitcolors.com 2025"
  ctx.font = "300 42px Georgia, serif";
  ctx.fillStyle = "#666666";
  ctx.fillText("24bitcolors.com 2025", labelX, labelBaseY + 170);

  // OKLCH値
  ctx.font = '300 36px "SF Mono", monospace';
  ctx.fillStyle = "#999999";
  const oklchText = `L:${Math.round(oklchData.l * 100)}  C:${Math.round(
    oklchData.c * 100
  )}  H:${Math.round(oklchData.h)}°`;
  ctx.fillText(oklchText, labelX, labelBaseY + 235);

  return canvas.toDataURL("image/png");
}

export function ShareCard({ color, hex, onClose }: ShareCardProps) {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // 初回レンダリング時にカード生成
  useEffect(() => {
    const dataUrl = generateGalleryShareCard(hex, {
      l: color.lightness,
      c: color.chroma,
      h: color.hue,
    });
    setImageDataUrl(dataUrl);
  }, [hex, color]);

  const handleDownload = () => {
    if (!imageDataUrl) return;
    const link = document.createElement("a");
    link.href = imageDataUrl;
    link.download = `my-color-${hex.replace("#", "")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (!imageDataUrl) return;
    setIsGenerating(true);

    try {
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      const file = new File([blob], "my-color.png", { type: "image/png" });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My Favorite Color",
          text: `私の好きな色は ${hex} です! #24bitColors #YourColor`,
        });
      } else {
        handleDownload();
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("シェアエラー:", error);
        handleDownload();
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-space-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      onClick={onClose}
    >
      <div
        className="flex max-w-md flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* プレビュー */}
        {imageDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageDataUrl}
            alt="Share Card"
            className="mb-space-6 max-h-[70vh] w-auto shadow-2xl"
          />
        ) : (
          <div className="mb-space-6 flex h-96 w-64 items-center justify-center bg-[#E8E8E8]">
            <span
              className="text-[#666666]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              生成中...
            </span>
          </div>
        )}

        {/* アクションボタン */}
        <div className="flex w-full gap-space-3">
          <button
            onClick={handleShare}
            disabled={isGenerating || !imageDataUrl}
            className="flex-1 bg-white py-space-4 text-black shadow-lg transition-all hover:bg-gray-100 disabled:opacity-50"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {isGenerating ? "処理中..." : "シェア"}
          </button>
          <button
            onClick={handleDownload}
            disabled={!imageDataUrl}
            className="flex-1 border border-white bg-transparent py-space-4 text-white shadow-lg transition-all hover:bg-white hover:text-black disabled:opacity-50"
            style={{ fontFamily: "Georgia, serif" }}
          >
            保存
          </button>
        </div>

        {/* SNS Links (Manual Attach) */}
        {imageDataUrl && (
          <div className="mt-space-5 flex flex-col items-center gap-space-3">
            <p className="text-[length:var(--text-micro)] text-white/70">
              画像を保存して、SNSでシェアしよう
            </p>
            <div className="flex gap-space-4">
              {/* X */}
              <a
                href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                  `私の好きな色は ${hex} です! #24bitColors`
                )}&url=${encodeURIComponent("https://24bitcolors.com")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-110"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-110"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
