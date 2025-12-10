"use client";

import { useState } from "react";
import { Check, Copy, ShareNetwork } from "@phosphor-icons/react";

interface ShareActionsProps {
  url: string;
  onShare: () => void;
}

export function ShareActions({ url, onShare }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-full py-4 font-serif">
      {/* Share (Opens Modal) */}
      <button
        onClick={onShare}
        className="group relative flex h-12 w-full items-center justify-center border border-foreground/10 bg-background transition-all duration-300 hover:bg-foreground hover:text-background active:scale-95"
        aria-label="Share"
      >
        <ShareNetwork
          weight="light"
          className="h-5 w-5 transition-transform group-hover:scale-110"
        />
        <span className="ml-3 text-xs tracking-[0.2em] font-medium uppercase text-muted-foreground group-hover:text-background font-serif">
          シェア
        </span>
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="group relative flex h-12 items-center justify-center border border-foreground/10 bg-background transition-all duration-300 hover:bg-foreground hover:text-background active:scale-95 w-full"
        aria-label="Copy Link"
      >
        {copied ? (
          <Check
            weight="light"
            className="h-5 w-5 animate-in zoom-in spin-in-45"
          />
        ) : (
          <Copy
            weight="light"
            className="h-5 w-5 transition-transform group-hover:scale-110"
          />
        )}
        <span className="ml-3 text-xs tracking-[0.2em] font-medium uppercase text-muted-foreground group-hover:text-background whitespace-nowrap font-serif">
          {copied ? "コピーしました" : "リンクをコピー"}
        </span>
      </button>
    </div>
  );
}
