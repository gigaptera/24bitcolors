"use client";

import { useState, useEffect } from "react";

import {
  XLogo,
  PinterestLogo,
  InstagramLogo,
  Link as LinkIcon,
  Check,
  ShareNetwork,
} from "@phosphor-icons/react";
// import { useTranslations } from "next-intl"; // Not used currently

interface ShareActionsProps {
  url: string;
  text: string;
  onShareImage: () => void;
}

export function ShareActions({ url, text, onShareImage }: ShareActionsProps) {
  // const t = useTranslations("Share");
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

  // Safe window open helper
  const openWindow = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  const handleXShare = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}&hashtags=24bitColors`;
    openWindow(shareUrl);
  };

  /* Removed handleFacebookShare as button is removed */

  const handlePinterestShare = () => {
    const shareUrl = `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      url
    )}&description=${encodeURIComponent(text)}`;
    openWindow(shareUrl);
  };

  // Web Share API Support
  const [isWebShareSupported, setIsWebShareSupported] = useState(false);

  useEffect(() => {
    // Check if Web Share API is supported (client-side only)
    // Defer check to avoid blocking/sync issues during hydration
    const checkSupport = () => {
      if (
        typeof navigator !== "undefined" &&
        "share" in navigator &&
        "canShare" in navigator
      ) {
        setIsWebShareSupported(true);
      }
    };
    checkSupport();
  }, []);

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "24bitColors",
          text: text,
          url: url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  // Button base class
  const btnClass =
    "group flex h-10 w-10 items-center justify-center rounded-sm bg-foreground/5 text-foreground transition-all duration-300 hover:bg-foreground hover:text-background active:scale-95";
  const iconClass = "h-4 w-4 transition-transform group-hover:scale-110";

  return (
    <div className="flex w-full items-center justify-center gap-2 py-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
      {/* Web Share (Mobile Native Share) */}
      {isWebShareSupported && (
        <button
          onClick={handleWebShare}
          className={btnClass}
          aria-label="Share via system"
        >
          <ShareNetwork weight="light" className={iconClass} />
        </button>
      )}

      {/* X (Twitter) */}
      <button
        onClick={handleXShare}
        className={btnClass}
        aria-label="Share on X"
      >
        <XLogo weight="light" className={iconClass} />
      </button>

      {/* Pinterest */}
      <button
        onClick={handlePinterestShare}
        className={btnClass}
        aria-label="Share on Pinterest"
      >
        <PinterestLogo weight="light" className={iconClass} />
      </button>

      {/* Instagram (Triggers Save Image) */}
      <button
        onClick={onShareImage}
        className={btnClass}
        aria-label="Share on as Image"
      >
        <InstagramLogo weight="light" className={iconClass} />
      </button>

      {/* Copy Link */}
      <button onClick={handleCopy} className={btnClass} aria-label="Copy Link">
        {copied ? (
          <Check weight="light" className={`${iconClass} animate-in zoom-in`} />
        ) : (
          <LinkIcon weight="light" className={iconClass} />
        )}
      </button>
    </div>
  );
}
