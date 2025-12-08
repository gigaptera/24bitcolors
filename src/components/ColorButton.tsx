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
      className="group relative aspect-square w-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
      style={{ backgroundColor: hex }}
      aria-label={`色を選択: ${hex}`}
    />
  );
}
