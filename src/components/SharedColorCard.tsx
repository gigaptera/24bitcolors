"use client";

import { Link } from "@/i18n/routing";
import { Hash, Calendar, BookmarkSimple, Check } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type SharedColorCardProps = {
  item: {
    id: string;
    hex: string;
    created_at: string;
    poeticName?: string;
    groupSlug?: string;
  };
  shareId: string;
  index: number;
};

export function SharedColorCard({
  item,
  shareId,
  index,
}: SharedColorCardProps) {
  const t = useTranslations("Share");
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();

    if (isSaved || isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shareId, hex: item.hex }),
      });

      if (!res.ok) throw new Error("Import failed");

      setIsSaved(true);
    } catch (e) {
      console.error(e);
      // Optional: Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link
      href={`/result/${item.groupSlug || "unknown"}?hex=${item.hex.replace(
        "#",
        ""
      )}`}
      className="group relative flex flex-col items-center p-8 bg-card/50 backdrop-blur-sm border border-border/40 rounded-none overflow-hidden hover:border-foreground/20 hover:bg-card/80 transition-all duration-500 hover:shadow-[var(--shadow-museum)] hover:-translate-y-1 block"
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Bookmark Button */}
      <Button
        variant="ghost"
        size="icon"
        className={`absolute top-4 right-4 z-10 transition-all duration-300 ${
          isSaved
            ? "text-green-500 bg-green-500/10 hover:bg-green-500/20 hover:text-green-600"
            : "text-muted-foreground/50 hover:text-primary hover:bg-primary/5"
        }`}
        onClick={handleBookmark}
        disabled={isLoading || isSaved}
        title={isSaved ? t("saved") : t("bookmark")}
      >
        {isSaved ? (
          <Check className="w-5 h-5" weight="bold" />
        ) : (
          <BookmarkSimple
            className="w-5 h-5"
            weight={isLoading ? "fill" : "regular"}
          />
        )}
      </Button>

      <div
        className="w-32 h-32 rounded-full shadow-2xl mb-6 border border-white/10 group-hover:scale-105 transition-transform duration-500"
        style={{ backgroundColor: item.hex }}
      />
      <div className="text-center space-y-2 w-full">
        <h3 className="text-xl font-serif tracking-wide text-foreground group-hover:text-primary transition-colors">
          {item.poeticName}
        </h3>
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground font-mono opacity-70">
          <span className="flex items-center gap-1">
            <Hash className="w-3 h-3" />
            {item.hex.replace("#", "")}
          </span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(item.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
