"use client";

import { useState, useEffect } from "react";
import { OklchColor } from "@/lib/oklch";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { X } from "@phosphor-icons/react";

interface ShareCardProps {
  color: OklchColor;
  hex: string;
  onClose: () => void;
}

type CardTheme = "light" | "dark" | "color";

import { getNearestPoeticName } from "@/lib/colorNaming";

/**
 * ギャラリー風シェアカード生成関数
 * Canvas APIで直接描画（Instagram Story サイズ 1080x1920）
 */
function generateGalleryShareCard(
  colorHex: string,
  oklchData: { l: number; c: number; h: number },
  theme: CardTheme
): string {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // Color Name lookup
  const { groupName } = getNearestPoeticName(colorHex);

  // ベース定義 (Design System: Museum Palette)
  const lightColors = {
    bg: "#f9f9f9", // --background
    frame: "#000000", // .color-frame
    textMain: "#1a1a1a", // --foreground
    textHex: "#1a1a1a",
    textSub: "#666666", // --muted-foreground
    textInfo: "#666666",
    shadow: "rgba(0, 0, 0, 0.15)",
    shadowBlur: 40,
  };

  const darkColors = {
    bg: "#080808", // --background (Deep Ink)
    frame: "#e5e5e5", // --foreground (Soft White)
    textMain: "#e5e5e5",
    textHex: "#e5e5e5",
    textSub: "#808080", // --muted-foreground
    textInfo: "#808080",
    shadow: "rgba(0, 0, 0, 0.5)",
    shadowBlur: 60,
  };

  // テーマ別カラー決定
  let colors;

  if (theme === "light") {
    colors = lightColors;
  } else if (theme === "dark") {
    colors = darkColors;
  } else {
    // Color mode
    const isBrightBackground = oklchData.l > 0.6;
    const textColor = isBrightBackground ? "#000000" : "#FFFFFF";
    const baseColors = isBrightBackground ? lightColors : darkColors;

    colors = {
      ...baseColors,
      bg: colorHex,
      shadow: isBrightBackground ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.6)",
      frame: textColor,
      textMain: textColor,
      textHex: textColor,
      textSub: textColor,
      textInfo: textColor,
      // Color Themeの場合はフレーム(リング)を少し透明にするなど調整
      frameRing: isBrightBackground
        ? "rgba(0,0,0,0.1)"
        : "rgba(255,255,255,0.2)",
    };
  }

  // 背景
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, 1080, 1920);

  // 円形アートワーク配置
  const centerX = 1080 / 2;
  const centerY = 700; // 少し上に配置
  const radius = 400; // 直径800

  // シャドウ (円形)
  ctx.shadowColor = colors.shadow;
  ctx.shadowBlur = colors.shadowBlur;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 30;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fillStyle = colorHex;
  ctx.fill();

  // Shadow off for stroke/details
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // リング (ResultPageの `ring-1 ring-white/10` や `border-4` を模倣)
  // テーマに応じて色を変える
  ctx.lineWidth = 4;
  ctx.strokeStyle =
    (colors as { frameRing?: string }).frameRing ||
    (theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)");
  ctx.stroke();

  // テキストエリア
  const textCenterY = centerY + radius + 180;

  ctx.textAlign = "center";

  // 1. Group Name (Main Title) - Serif
  ctx.fillStyle = colors.textMain;
  ctx.font = '400 90px Georgia, "Times New Roman", serif';
  // 少し文字間を広げる
  ctx.fillText(groupName, centerX, textCenterY);

  // 2. HEX Code - Mono
  ctx.fillStyle = colors.textHex;
  ctx.font = '400 50px "SF Mono", "Courier New", monospace';
  ctx.fillText(colorHex.toUpperCase(), centerX, textCenterY + 120);

  // 3. Tech Data (Moved up)
  ctx.fillStyle = colors.textInfo;
  ctx.font = '300 32px "SF Mono", monospace';
  const oklchText = `L:${Math.round(oklchData.l * 100)}  C:${Math.round(
    oklchData.c * 100
  )}  H:${Math.round(oklchData.h)}°`;
  ctx.fillText(oklchText, centerX, textCenterY + 220);

  // 4. Footer Branding
  const footerY = 1920 - 100;
  const paddingX = 80;

  // Left: Brand Name
  ctx.textAlign = "left";
  ctx.fillStyle = colors.textMain;
  ctx.font = 'bold 48px Georgia, "Times New Roman", serif';
  ctx.fillText("24bitColors", paddingX, footerY);

  // Right: Hashtag
  ctx.textAlign = "right";
  ctx.fillStyle = colors.textMain; // Visible
  ctx.font = 'bold 44px "SF Mono", monospace';
  ctx.fillText("#24bitColors", 1080 - paddingX, footerY);

  return canvas.toDataURL("image/png");
}

export function ShareCard({ color, hex, onClose }: ShareCardProps) {
  const { theme: systemTheme } = useTheme();
  const isDark = systemTheme === "dark";

  // systemThemeは"light"または"dark"なので、CardThemeにキャスト
  const [cardTheme, setCardTheme] = useState<CardTheme>(systemTheme);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Header visibility control
  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      header.style.transition = "opacity 0.3s";
      header.style.opacity = "0";
      header.style.pointerEvents = "none";
    }
    return () => {
      if (header) {
        header.style.opacity = "1";
        header.style.pointerEvents = "auto";
      }
    };
  }, []);

  // レンダリングと再生成 (Restored)
  useEffect(() => {
    const dataUrl = generateGalleryShareCard(
      hex,
      {
        l: color.lightness,
        c: color.chroma,
        h: color.hue,
      },
      cardTheme
    );
    setImageDataUrl(dataUrl);
  }, [hex, color, cardTheme]);

  const handleDownload = () => {
    if (!imageDataUrl) return;
    const link = document.createElement("a");
    link.href = imageDataUrl;
    link.download = `24bitcolors-${hex.replace("#", "")}.png`;
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
      const file = new File([blob], "24bitcolors.png", { type: "image/png" });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My True Color | 24bitColors",
          text: `私の色は「${
            getNearestPoeticName(hex).groupName
          }」(${hex}) でした。\n\n#24bitColors`,
        });
      } else {
        // Fallback if file share not supported but Web Share is (rare but possible) or just Desktop
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-space-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* 閉じるボタン */}
      <button
        onClick={onClose}
        className="absolute top-12 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-none border border-foreground text-foreground bg-transparent transition-all hover:bg-foreground hover:text-background"
        aria-label="Close"
      >
        <X weight="light" className="h-6 w-6" />
      </button>

      <div
        className="relative flex w-fit flex-col items-center pt-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* プレビューエリア */}
        <div className="relative mb-8 flex items-center justify-center">
          {imageDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageDataUrl}
              alt="Share Card"
              className="max-h-[50vh] w-auto border border-border/20 shadow-2xl transition-all duration-500 animate-fade-in"
            />
          ) : (
            <div
              className={`flex aspect-[9/16] h-[50vh] w-auto items-center justify-center shadow-2xl ${
                isDark ? "bg-[#1A1A1A]" : "bg-[#E8E8E8]"
              }`}
            >
              <span className="animate-pulse font-serif text-muted-foreground">
                Generating...
              </span>
            </div>
          )}
        </div>

        {/* スタイル選択 */}
        <div className="mb-8 flex gap-4">
          {/* Light Code */}
          <button
            onClick={() => setCardTheme("light")}
            className={`h-8 w-8 border bg-[#f9f9f9] transition-all focus:outline-none rounded-none ${
              isDark ? "border-white/20" : "border-black/10 shadow-sm"
            } ${
              cardTheme === "light"
                ? `scale-110 ring-1 ring-offset-4 ${
                    isDark
                      ? "ring-white ring-offset-black"
                      : "ring-black ring-offset-white"
                  }`
                : "opacity-60 hover:opacity-100"
            }`}
            aria-label="Select Light Theme"
          />

          {/* Dark Code */}
          <button
            onClick={() => setCardTheme("dark")}
            className={`h-8 w-8 border bg-[#080808] transition-all focus:outline-none rounded-none ${
              isDark ? "border-white/20" : "border-black/10"
            } ${
              cardTheme === "dark"
                ? `scale-110 ring-1 ring-offset-4 ${
                    isDark
                      ? "ring-white ring-offset-black"
                      : "ring-black ring-offset-white"
                  }`
                : "opacity-60 hover:opacity-100"
            }`}
            aria-label="Select Dark Theme"
          />

          {/* Color Code */}
          <button
            onClick={() => setCardTheme("color")}
            className={`h-8 w-8 border transition-all focus:outline-none rounded-none ${
              isDark ? "border-white/20" : "border-black/10 shadow-sm"
            } ${
              cardTheme === "color"
                ? `scale-110 ring-1 ring-offset-4 ${
                    isDark
                      ? "ring-white ring-offset-black"
                      : "ring-black ring-offset-white"
                  }`
                : "opacity-60 hover:opacity-100"
            }`}
            style={{ backgroundColor: hex }}
            aria-label="Select Color Theme"
          />
        </div>

        {/* アクションボタン Vertical Stack */}
        <div className="flex flex-col gap-4 w-full">
          <Button
            onClick={handleShare}
            disabled={isGenerating || !imageDataUrl}
            className="h-12 w-full text-xs tracking-[0.2em] font-serif uppercase"
          >
            {isGenerating ? "..." : "画像をシェア"}
          </Button>
          <Button
            onClick={handleDownload}
            disabled={!imageDataUrl}
            variant="outline"
            className="h-12 w-full text-xs tracking-[0.2em] font-serif uppercase border-foreground/20"
          >
            画像を保存
          </Button>
        </div>
      </div>
    </div>
  );
}
