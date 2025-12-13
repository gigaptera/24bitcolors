import { createClient } from "@supabase/supabase-js";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { getNearestPoeticName } from "@/lib/colorNaming";
import { SharedColorCard } from "@/components/SharedColorCard";
import { Metadata } from "next";

type HistoryItem = {
  id: string;
  hex: string;
  created_at: string;
  poeticName?: string;
  groupSlug?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Share" });
  return {
    title: t("shareTitle"),
    description: t("shareDesc"),
  };
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Share" });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  let history: HistoryItem[] = [];
  let error = false;

  const { data: shareData, error: fetchError } = await supabase
    .from("shared_collections")
    .select("snapshot_data")
    .eq("id", id)
    .single();

  if (fetchError || !shareData) {
    error = true;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    history = (shareData.snapshot_data as any[]).map((item) => {
      const info = getNearestPoeticName(item.hex);
      return {
        ...item,
        poeticName: info.fullTitle,
        groupSlug: info.groupSlug,
      };
    });
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-serif text-muted-foreground mb-4">
          Collection Not Found
        </h1>
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background selection:bg-foreground selection:text-background">
      <div className="mx-auto max-w-[1800px] px-4 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Sticky Sidebar (Left) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-0 lg:h-screen pt-40 lg:py-32 flex flex-col justify-between">
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
              <span className="block font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6 uppercase">
                Shared Collection
              </span>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-foreground tracking-tight leading-[0.9]">
                {t("shareTitle")}
              </h1>
            </div>

            <div className="space-y-8">
              <p className="text-muted-foreground font-serif text-lg leading-relaxed max-w-md">
                {t("collection", { count: history.length })}
              </p>

              {/* Metadata or additional info can go here */}
              <div className="flex flex-col gap-2 font-mono text-xs text-muted-foreground/60">
                <p>ID: {id.substring(0, 8)}...</p>
                <p>ARCHIVED VIA 24BITCOLORS</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            {/* Action removed as per user request to focus on viewing */}
          </div>
        </aside>

        {/* Scrollable Gallery (Right) */}
        <main className="lg:col-span-8 pt-0 lg:pt-32 pb-32">
          {history.length > 0 && (
            <div className="flex items-end justify-between border-b border-border/40 pb-6 mb-12">
              <span className="font-mono text-xs tracking-widest text-muted-foreground">
                CATALOG: {id.substring(0, 4)} — {history.length} ITEMS
              </span>
              <span className="font-serif text-sm italic text-muted-foreground">
                Public Archive
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12 lg:gap-x-8 lg:gap-y-16">
            {history.map((item, index) => (
              <div
                key={item.id}
                className="animate-in fade-in duration-1000 fill-mode-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <SharedColorCard item={item} shareId={id} index={index} />
              </div>
            ))}
          </div>

          <div className="block lg:hidden mt-20 text-center">
            {/* Action removed as per user request to focus on viewing */}
          </div>
        </main>
      </div>
    </div>
  );
}
