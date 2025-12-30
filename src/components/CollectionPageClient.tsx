"use client";

import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { getNearestPoeticName } from "@/lib/colorNaming";
import { Calendar, Hash } from "lucide-react";
import { CollectionShareButton } from "@/components/CollectionShareButton";
import { SeasonalTimeline } from "@/components/SeasonalTimeline";
import { useEffect, useState } from "react";
// import { AdUnit } from "@/components/ads/AdUnit";

type HistoryItem = {
  id: string;
  hex: string;
  created_at: string;
  poeticName?: string;
  groupSlug?: string;
};

export function CollectionPageClient() {
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
    <div className="min-h-screen w-full bg-background selection:bg-foreground selection:text-background">
      <div className="mx-auto max-w-[1800px] px-4 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Sticky Sidebar (Left) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-0 lg:h-screen pt-32 lg:py-32 flex flex-col justify-between">
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
              <span className="block font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6 uppercase">
                The Collection
              </span>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-foreground tracking-tight leading-[0.9]">
                My
                <br />
                Palette
              </h1>
            </div>

            <p className="text-muted-foreground font-serif text-lg leading-relaxed max-w-md">
              {t("description")}
            </p>

            <div className="pt-8 border-t border-border/40 max-w-[200px]">
              <CollectionShareButton />
            </div>
          </div>

          <div className="hidden lg:block">
            <p className="font-mono text-xs text-muted-foreground/50 tracking-widest uppercase">
              24bitColors
              <br />
              Personal Archive
            </p>
          </div>
        </aside>

        {/* Scrollable Gallery (Right) */}
        <main className="lg:col-span-8 pt-0 lg:pt-32 pb-32 space-y-24">
          {/* Seasonal Visualization */}
          {history.length >= 2 && <SeasonalTimeline history={history} />}

          {/* Ad Placement: Between Seasonal and content, or at top if no seasonal */}
          {/* Temporarily disabled pending AdSense approval
          <div className="w-full flex justify-center py-4 animate-in fade-in duration-1000 delay-500">
            <AdUnit
              className="max-w-[728px] min-h-[90px]"
              format="auto"
              slotId="YOUR_ADSENSE_UNIT_ID" // Placeholder
            />
          </div>
          */}

          <div className="space-y-12">
            {history.length > 0 && (
              <div className="flex items-end justify-between border-b border-border/40 pb-6">
                <span className="font-mono text-xs tracking-widest text-muted-foreground">
                  INDEX: 01 — {history.length.toString().padStart(2, "0")}
                </span>
                <span className="font-serif text-sm italic text-muted-foreground">
                  Latest Acquisitions
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12 lg:gap-x-8 lg:gap-y-16">
              {history.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/result/${item.groupSlug}?hex=${item.hex.replace(
                    "#",
                    ""
                  )}`}
                  className="group relative flex flex-col items-center p-8 bg-card/50 backdrop-blur-sm border border-border/40 rounded-none overflow-hidden hover:border-foreground/20 hover:bg-card/80 transition-all duration-500 hover:shadow-[var(--shadow-museum)] hover:-translate-y-1 block"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Color Circle */}
                  <div
                    className="w-32 h-32 rounded-full shadow-2xl mb-6 border border-white/10 group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundColor: item.hex }}
                  />

                  {/* Text Info */}
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

                  {/* Index Number (Optional subtle overlay) */}
                  <div className="absolute top-4 left-4 font-mono text-[10px] text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    NO. {(index + 1).toString().padStart(3, "0")}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
