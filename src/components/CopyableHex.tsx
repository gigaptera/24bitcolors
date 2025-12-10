"use client";

import * as React from "react";
import { Check, Copy } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface CopyableHexProps extends React.HTMLAttributes<HTMLDivElement> {
  hex: string;
  children: React.ReactNode;
  showIcon?: boolean;
}

export function CopyableHex({
  hex,
  children,
  className,
  showIcon = false,
  ...props
}: CopyableHexProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      onClick={handleCopy}
      className={cn(
        "cursor-pointer transition-transform active:scale-95 flex items-center justify-center gap-2",
        className
      )}
      title="Click to copy HEX"
      {...props}
    >
      {children}
      {showIcon && (
        <span className="text-muted-foreground">
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </span>
      )}
      {copied && !showIcon && (
        <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-black/10 dark:bg-white/10 backdrop-blur-[1px] rounded animate-in fade-in duration-200">
          <span className="text-xs font-bold bg-background/80 px-2 py-1 rounded shadow-sm text-foreground">
            COPIED
          </span>
        </div>
      )}
    </div>
  );
}
