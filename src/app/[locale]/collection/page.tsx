"use client";

import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { getNearestPoeticName } from "@/lib/colorNaming";
import { Calendar, Hash } from "lucide-react";
import { CollectionShareButton } from "@/components/CollectionShareButton";
import { useEffect, useState } from "react";

type HistoryItem = {
  id: string;
  hex: string;
  created_at: string;
  poeticName?: string;
  groupSlug?: string;
};

export default function CollectionPage() {
  const t = useTranslations("CollectionPage");
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/collection");
        if (!res.ok) throw new Error("Failed to fetch history");

        const data = await res.json();
        const rawHistory = data.history || [];

        // Enrich with poetic names on client side
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const enriched = rawHistory.map((item: any) => {
          const info = getNearestPoeticName(item.hex);
          return {
            ...item,
            poeticName: info.fullTitle,
            groupSlug: info.groupSlug,
          };
        });

        setHistory(enriched);
      } catch (error) {
        console.error("Failed to load collection:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    if (!isLoading && history.length === 0) {
      router.push("/diagnosis");
    }
  }, [isLoading, history, router]);

  if (isLoading || history.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-space-4 max-w-5xl mx-auto flex flex-col items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-4 w-32 bg-secondary/50 rounded"></div>
          <div className="h-8 w-48 bg-secondary/50 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-space-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col items-start text-left space-y-6 max-w-3xl">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground tracking-tight">
              {t("title")}
            </h1>
            <p className="text-muted-foreground font-serif leading-relaxed text-balance max-w-xl text-left">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 pb-2">
          <CollectionShareButton />
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {history.map((item, index) => (
          <Link
            key={item.id}
            href={`/result/${item.groupSlug}?hex=${item.hex.replace("#", "")}`}
            className="group relative flex flex-col items-center p-8 bg-card/50 backdrop-blur-sm border border-border/40 rounded-none overflow-hidden hover:border-border/80 hover:bg-card/80 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-[var(--shadow-floating)] hover:-translate-y-1"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            {/* Color Circle */}
            <div
              className="w-32 h-32 rounded-full shadow-2xl mb-6 border border-white/10 group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundColor: item.hex }}
            />

            {/* Info */}
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
        ))}
      </div>
    </div>
  );
}
