"use client";

import { useState } from "react";

interface ShareActionsProps {
  url: string;
  colors: {
    name: string;
    code: string;
  };
}

export function ShareActions({ url, colors }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const text = `私の好きな色は「${colors.name} (${colors.code})」でした。\n\n24bitColors - あなたの好きな色を見つけよう`;

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
    <div className="flex w-full items-center justify-center gap-space-4 py-space-5">
      {/* リンクコピー */}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--foreground)] bg-[var(--card)] transition-all hover:bg-[var(--foreground)] hover:text-[var(--background)]"
          aria-label="リンクをコピー"
        >
          {copied ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-[var(--foreground)] group-hover:text-[var(--background)]"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[var(--muted-foreground)] transition-colors group-hover:text-[var(--background)]"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
          {copied && (
            <span className="absolute -top-10 whitespace-nowrap bg-[var(--foreground)] px-2 py-1 text-[length:var(--text-micro)] text-[var(--background)] opacity-0 transition-opacity animate-fade-in-up">
              Copied!
            </span>
          )}
        </button>
      </div>

      {/* X (Twitter) */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-11 w-11 items-center justify-center rounded-full border border-[var(--foreground)] bg-[var(--card)] transition-all hover:bg-[var(--foreground)] hover:text-[var(--background)]"
        aria-label="X (Twitter)でシェア"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-[var(--muted-foreground)] transition-colors group-hover:text-[var(--background)]"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Instagram (画像生成誘導のため、本来はリンクシェアできないが配置する場合) 
          今回はデザイン統一のため、Instaカラーではなくモノクロで。 */}
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-11 w-11 items-center justify-center rounded-full border border-[var(--foreground)] bg-[var(--card)] transition-all hover:bg-[var(--foreground)] hover:text-[var(--background)]"
        aria-label="Instagramを開く"
        onClick={() => {
          // Instagramはテキストシェアできないので、画像保存を促すトーストなどを出すのが親切だが、今回はリンクのみ
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-[var(--muted-foreground)] transition-colors group-hover:text-[var(--background)]"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </a>
    </div>
  );
}
