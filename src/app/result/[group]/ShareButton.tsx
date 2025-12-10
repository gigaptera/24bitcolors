"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, ShareNetwork } from "@phosphor-icons/react";

interface Props {
  hex: string;
  name: string;
  url: string;
}

export function ShareButton({ hex, name, url }: Props) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function"
    ) {
      setTimeout(() => setCanShare(true), 0);
    }
  }, []);

  const handleNativeShare = async () => {
    const text = `私の運命の色は「${name} (${hex})」でした。\n\n1677万色からあなたの好みを特定する統計的診断 #24bitColors`;
    try {
      await navigator.share({
        title: `${name} | 24bitColors`,
        text: text,
        url: url,
      });
    } catch (err) {
      console.log("Share canceled", err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleX = () => {
    const text = `私の運命の色は「${name} (${hex})」でした。\n\n1677万色からあなたの好みを特定する統計的診断 #24bitColors`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const handleLine = () => {
    window.open(
      `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        url
      )}`,
      "_blank"
    );
  };

  // Mobile Native Share UI
  if (canShare) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <Button
          size="lg"
          className="h-16 font-serif tracking-wider text-lg w-full"
          onClick={handleNativeShare}
        >
          <ShareNetwork weight="light" className="mr-2 h-4 w-4" />
          SHARE RESULT
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground"
          onClick={handleCopy}
        >
          {copied ? "LINK COPIED" : "Copy Link only"}
        </Button>
      </div>
    );
  }

  // Desktop / Fallback UI
  return (
    <div className="grid grid-cols-3 gap-4">
      <Button
        variant="outline"
        className="h-14 font-serif tracking-wider border-foreground/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        onClick={handleX}
      >
        <span className="font-sans font-bold text-lg mr-2">𝕏</span> Share
      </Button>

      <Button
        variant="outline"
        className="h-14 font-serif tracking-wider border-foreground/10 hover:bg-[#06C755] hover:text-white hover:border-[#06C755] transition-colors"
        onClick={handleLine}
      >
        LINE
      </Button>

      <Button
        variant="outline"
        className="h-14 font-serif tracking-wider border-foreground/10"
        onClick={handleCopy}
      >
        <Link weight="light" className="mr-2 h-4 w-4" />
        {copied ? "COPIED" : "Copy"}
      </Button>
    </div>
  );
}
