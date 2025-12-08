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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      onClick={onClose}
    >
      <div
        className="flex max-w-md flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* プレビュー */}
        {imageDataUrl ? (
          <img
            src={imageDataUrl}
            alt="Share Card"
            className="mb-6 max-h-[70vh] w-auto shadow-2xl"
          />
        ) : (
          <div className="mb-6 flex h-96 w-64 items-center justify-center bg-[#E8E8E8]">
            <span
              className="text-gray-500"
              style={{ fontFamily: "Georgia, serif" }}
            >
              生成中...
            </span>
          </div>
        )}

        {/* アクションボタン */}
        <div className="flex w-full gap-3">
          <button
            onClick={handleShare}
            disabled={isGenerating || !imageDataUrl}
            className="flex-1 bg-white py-4 text-black shadow-lg transition-all hover:bg-gray-100 disabled:opacity-50"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {isGenerating ? "処理中..." : "シェア"}
          </button>
          <button
            onClick={handleDownload}
            disabled={!imageDataUrl}
            className="flex-1 border border-white bg-transparent py-4 text-white shadow-lg transition-all hover:bg-white hover:text-black disabled:opacity-50"
            style={{ fontFamily: "Georgia, serif" }}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
