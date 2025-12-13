import { createClient } from "@supabase/supabase-js";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ImportCollectionButton } from "@/components/ImportCollectionButton";
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
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 max-w-2xl">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground tracking-tight">
              {t("shareTitle")}
            </h1>
            <p className="text-lg text-muted-foreground font-serif leading-relaxed max-w-lg">
              {t("collection", { count: history.length })}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto">
          <ImportCollectionButton shareId={id} />
          <Button
            asChild
            variant="ghost"
            className="rounded-none font-serif text-muted-foreground hover:text-foreground"
          >
            <Link href="/diagnosis">{tCommon("startDiagnosis")}</Link>
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {history.map((item, index) => (
          <SharedColorCard
            key={item.id}
            item={item}
            shareId={id}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
