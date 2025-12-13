"use client";

import React, { useEffect, useState } from "react";
import { ColorWheel } from "./ColorWheel";
import { CopyableHex } from "./CopyableHex";
import { X } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

interface HarmonyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  sub: string;
  description?: string;
  colors: string[];
  mainColor: string;
  angles?: number[];
}

export function HarmonyDetailModal({
  isOpen,
  onClose,
  title,
  sub,
  description,
  colors,
  mainColor,
  angles,
}: HarmonyDetailModalProps) {
  const t = useTranslations("Harmonies");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-2xl animate-in zoom-in-95 duration-300 p-6 md:p-10 dark:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X weight="light" className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <h3 className="font-serif text-2xl font-medium tracking-wide text-foreground">
            {title}
          </h3>
          <p className="mt-2 font-mono text-sm tracking-widest text-muted-foreground uppercase">
            {sub}
          </p>
        </div>

        {/* Visualizer */}
        <div className="flex justify-center mb-10">
          <ColorWheel
            colors={colors}
            mainColor={mainColor}
            size={280}
            angles={angles}
          />
        </div>

        {/* Color List */}
        <div className="grid grid-cols-4 gap-4">
          {colors.map((hex, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <CopyableHex
                hex={hex}
                className="h-12 w-full rounded-md shadow-sm border border-border/50 block relative overflow-hidden"
                style={{ backgroundColor: hex }}
              >
                <div className="w-full h-full" />
              </CopyableHex>
              <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                {hex}
              </span>
            </div>
          ))}
        </div>

        {/* Explanation */}
        <div className="mt-8 text-left">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description || t("defaultDesc")}
          </p>
        </div>
      </div>
    </div>
  );
}
