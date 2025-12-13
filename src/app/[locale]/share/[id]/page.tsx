import { createClient } from "@supabase/supabase-js";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Palette, Calendar, Hash } from "lucide-react";
import { getNearestPoeticName } from "@/lib/colorNaming";
import { Metadata } from "next";
import { Swatches } from "@phosphor-icons/react/dist/ssr";

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
  const tCommon = await getTranslations({ locale, namespace: "Common" });

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
    <div className="min-h-screen pt-32 pb-20 px-space-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-secondary/50 mb-6">
          <Swatches className="w-6 h-6 text-foreground/80" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-foreground tracking-wide text-center mb-4">
          {t("collection", { count: history.length })}
        </h1>

        <Button asChild className="mt-4 rounded-full px-8">
          <Link href="/diagnosis">{tCommon("startDiagnosis")}</Link>
        </Button>
      </div>

      {/* Grid */}
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
        ))}
      </div>
    </div>
  );
}
