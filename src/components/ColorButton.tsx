"use client";

import { OklchColor, oklchToHex } from "@/lib/oklch";
import { triggerAndroidHaptic } from "@/utils/haptics";

interface ColorButtonProps {
  color: OklchColor;
  onClick: () => void;
}

export function ColorButton({ color, onClick }: ColorButtonProps) {
  const hex = oklchToHex(color);

  const handleClick = () => {
    triggerAndroidHaptic();
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="aspect-square w-full rounded-none border border-border shadow-sm transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{ backgroundColor: hex }}
      aria-label={`色を選択: ${hex}`}
    />
  );
}
