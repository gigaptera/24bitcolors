"use client";

import { useTranslations } from "next-intl";
import type { ColorInsight } from "@/types";
import { Sparkles, Brain, Globe, BookOpen } from "lucide-react";

interface ColorInsightSectionProps {
  insight: ColorInsight;
  colorName: string;
}

export function ColorInsightSection({
  insight,
  colorName,
}: ColorInsightSectionProps) {
  const t = useTranslations("Result");

  return (
    <div className="w-full mt-24 pt-16 border-t border-border/40">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary/70 text-[10px] tracking-[0.2em] uppercase font-mono mb-4 border border-primary/10">
          <Sparkles className="w-3 h-3" />
          AI Color Insight
        </div>
        <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-foreground mb-4">
          {t("aiInsightTitle", { colorName })}
        </h2>
        <p className="text-muted-foreground font-serif italic text-sm opacity-60">
          {t("aiInsightSubtitle")}
        </p>
      </div>

      {/* Insight Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto px-4">
        {/* Psychology */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-foreground">
            <div className="p-2 rounded-none border border-border">
              <Brain className="w-4 h-4 opacity-70" />
            </div>
            <h3 className="font-serif tracking-wider text-sm uppercase">
              {t("aiPsychology")}
            </h3>
          </div>
          <p className="text-sm text-foreground leading-relaxed font-serif">
            {insight.psychology}
          </p>
        </div>

        {/* Culture */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-foreground">
            <div className="p-2 rounded-none border border-border">
              <Globe className="w-4 h-4 opacity-70" />
            </div>
            <h3 className="font-serif tracking-wider text-sm uppercase">
              {t("aiCulture")}
            </h3>
          </div>
          <p className="text-sm text-foreground leading-relaxed font-serif">
            {insight.culture}
          </p>
        </div>

        {/* Story */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-foreground">
            <div className="p-2 rounded-none border border-border">
              <BookOpen className="w-4 h-4 opacity-70" />
            </div>
            <h3 className="font-serif tracking-wider text-sm uppercase">
              {t("aiStory")}
            </h3>
          </div>
          <p className="text-sm text-foreground leading-relaxed font-serif italic">
            &quot;{insight.story}&quot;
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-20 max-w-2xl mx-auto text-center">
        <p className="text-[10px] text-muted-foreground/40 font-serif leading-relaxed px-6">
          {t("aiDisclaimer")}
        </p>
      </div>
    </div>
  );
}
