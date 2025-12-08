"use client";

import { OklchColor, oklchToHex } from "@/lib/oklch";

interface ColorButtonProps {
  color: OklchColor;
  onClick: () => void;
}

export function ColorButton({ color, onClick }: ColorButtonProps) {
  const hex = oklchToHex(color);

  return (
    <button
      onClick={onClick}
      className="h-32 w-full rounded-2xl shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] sm:h-40"
      style={{ backgroundColor: hex }}
      aria-label={`色を選択: ${hex}`}
    />
  );
}
