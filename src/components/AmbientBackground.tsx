"use client";

import { getAmbientBackgroundColor } from "@/lib/colorBackground";
import { useTheme } from "@/components/ThemeProvider";

interface AmbientBackgroundProps {
  hex: string;
}

/**
 * テーマに応じた背景色を表示するクライアントコンポーネント
 * ライトモード: 淡い色
 * ダークモード: 暗い色
 */
export function AmbientBackground({ hex }: AmbientBackgroundProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bgColor = getAmbientBackgroundColor(hex, isDark);

  return (
    <div
      className="fixed inset-0 z-0 blur-3xl scale-150 animate-pulse-slow transition-colors duration-700 pointer-events-none"
      style={{ backgroundColor: bgColor }}
    />
  );
}
