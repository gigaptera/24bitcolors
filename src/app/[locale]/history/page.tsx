import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { Link, redirect } from "@/i18n/routing"; // Use i18n redirect
import { getTranslations } from "next-intl/server";
import { getNearestPoeticName } from "@/lib/colorNaming";
import { ArrowLeft, Calendar, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const t = await getTranslations("HistoryPage");
  const tCommon = await getTranslations("Common");
  const cookieStore = await cookies();
  const anonymousId = cookieStore.get("anonymous_id")?.value;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let history: any[] = [];

  if (anonymousId) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "";

    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      const { data, error: dbError } = await supabase
        .from("diagnoses")
        .select("id, hex, created_at")
        .eq("anonymous_id", anonymousId)
        .order("created_at", { ascending: false })
        .limit(100);

      if (!dbError && data) {
        history = data.map((item) => {
          const info = getNearestPoeticName(item.hex);
          return {
            ...item,
            poeticName: info.fullTitle,
            groupSlug: info.groupSlug,
          };
        });
      } else {
        console.error("History fetch error:", dbError);
      }
    }
  }

  // Redirect if no history found
  if (history.length === 0) {
    redirect("/diagnosis");
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-space-4 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col items-start mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-background/80 -ml-3"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <span className="text-sm font-serif tracking-widest text-muted-foreground uppercase opacity-60">
            {tCommon("history")}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-foreground tracking-wide">
          {t("title")}
        </h1>
        <p className="text-muted-foreground mt-4 font-serif tracking-wide text-sm opacity-80 max-w-lg leading-relaxed">
          {t("description")}
        </p>
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
