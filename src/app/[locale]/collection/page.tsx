import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { Link } from "@/i18n/routing"; // Use i18n redirect
import { getTranslations } from "next-intl/server";
import { getNearestPoeticName } from "@/lib/colorNaming";
import { Calendar, Hash } from "lucide-react";
import { CollectionShareButton } from "@/components/CollectionShareButton";
import { Button } from "@/components/ui/button"; // Keep Button for the "no history" case

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CollectionPage" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export const dynamic = "force-dynamic";

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CollectionPage" });
  const cookieStore = await cookies();
  const anonymousId = cookieStore.get("anonymous_id")?.value;

  if (!anonymousId) {
    // If no anonymous_id, no history to show.
    return (
      <div className="min-h-screen pt-32 pb-20 px-space-4 max-w-5xl mx-auto flex flex-col items-center justify-center">
        <h1 className="text-xl md:text-2xl font-serif text-muted-foreground mb-4">
          {t("noHistory")}
        </h1>
        <Button asChild variant="outline">
          <Link href="/diagnosis">{t("viewAllHistory")}</Link>
        </Button>
      </div>
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: historyData } = await supabase
    .from("diagnoses")
    .select("id, hex, created_at")
    .eq("anonymous_id", anonymousId)
    .order("created_at", { ascending: false });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const history = (historyData || []).map((item: any) => {
    const info = getNearestPoeticName(item.hex);
    return {
      ...item,
      poeticName: info.fullTitle,
      groupSlug: info.groupSlug,
    };
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-space-4 max-w-5xl mx-auto">
      {/* Header Section Removed as per request */}

      {/* Action Bar */}
      <div className="flex justify-end mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <CollectionShareButton />
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
