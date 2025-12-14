import { Link } from "@/i18n/routing";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LogicAlgorithm" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [
        `/api/og?type=page&title=${encodeURIComponent(
          t("title")
        )}&subtitle=${encodeURIComponent(t("ogpSubtitle"))}`,
      ],
    },
  };
}

export default function AlgorithmLogicPage() {
  const t = useTranslations("LogicAlgorithm");

  // Arrays for visualizing convergence
  const dots = Array.from({ length: 36 });

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background py-20 px-6">
      <div className="w-full max-w-3xl animate-in fade-in duration-700 space-y-24">
        {/* Navigation */}
        <div className="flex justify-start">
          <Button
            variant="link"
            asChild
            className="pl-0 text-muted-foreground font-serif tracking-widest hover:text-foreground hover:no-underline"
          >
            <Link href="/diagnosis/logic">{t("back")}</Link>
          </Button>
        </div>

        {/* Header */}
        <header className="space-y-8">
          <h1
            className="font-serif text-4xl md:text-5xl tracking-widest text-foreground"
            dangerouslySetInnerHTML={{ __html: t.raw("heading") }}
          />
          <div className="space-y-4 max-w-2xl">
            <p className="font-sans text-lg text-foreground/80 tracking-wide leading-relaxed font-light">
              {t("introLarge")}
            </p>
            <p className="font-sans text-sm text-muted-foreground tracking-wide leading-relaxed whitespace-pre-wrap">
              {t("introSmall")}
            </p>
          </div>
        </header>

        {/* Section 1: The Candidates (Guideposts) */}
        <section className="space-y-12">
          <div className="space-y-6">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              {t("sec1Label")}
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              {t("sec1Title")}
            </h2>
            <div className="space-y-6 text-foreground/90 leading-loose text-justify font-light">
              <p>{t("sec1Body1")}</p>
              <p dangerouslySetInnerHTML={{ __html: t.raw("sec1Body2") }} />
              <p dangerouslySetInnerHTML={{ __html: t.raw("sec1Body3") }} />

              <div className="bg-muted/50 p-4 rounded-md text-sm text-muted-foreground border border-border/50">
                <p className="font-semibold mb-1 text-xs tracking-wider">
                  {t("noteTitle")}
                </p>
                <p className="leading-relaxed text-xs">{t("noteBody")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Bayesian Inference */}
        <section className="space-y-12">
          <div className="space-y-6">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              {t("sec2Label")}
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              {t("sec2Title")}
            </h2>
            <div className="space-y-6 text-foreground/90 leading-loose text-justify font-light">
              <p>{t("sec2Body1")}</p>
              <p dangerouslySetInnerHTML={{ __html: t.raw("sec2Body2") }} />
              <p>{t("sec2Body3")}</p>
            </div>
          </div>

          {/* Visual: Dot Matrix Evolution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* State 1: Uniform */}
            <div className="space-y-3">
              <div className="aspect-square rounded-lg bg-card border border-border p-6 relative overflow-hidden">
                <div className="absolute top-3 left-3 text-[10px] font-mono opacity-50">
                  {t("chartLabel1")}
                </div>
                <div className="w-full h-full grid grid-cols-6 gap-3 opacity-50 place-items-center">
                  {dots.map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-foreground/30"
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center whitespace-pre-wrap">
                {t("chartDesc1")}
              </p>
            </div>
            {/* State 2: Weighted */}
            <div className="space-y-3">
              <div className="aspect-square rounded-lg bg-card border border-border p-6 relative overflow-hidden">
                <div className="absolute top-3 left-3 text-[10px] font-mono opacity-50">
                  {t("chartLabel2")}
                </div>
                <div className="w-full h-full grid grid-cols-6 gap-3 place-items-center">
                  {dots.map((_, i) => {
                    // Simulate convergence visually
                    const center = 14; // Target index
                    const dist = Math.sqrt(
                      Math.pow((i % 6) - (center % 6), 2) +
                        Math.pow(Math.floor(i / 6) - Math.floor(center / 6), 2)
                    );
                    const opacity = Math.max(0.1, 1 - dist * 0.3);
                    const size = Math.max(0.2, 1.5 - dist * 0.4);

                    return (
                      <div
                        key={i}
                        className="rounded-full bg-foreground transition-all duration-500"
                        style={{
                          opacity: opacity,
                          transform: `scale(${size})`,
                          width: "0.5rem",
                          height: "0.5rem",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center whitespace-pre-wrap">
                {t("chartDesc2")}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Information Gain */}
        <section className="space-y-12">
          <div className="space-y-6">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              {t("sec3Label")}
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              {t("sec3Title")}
            </h2>
            <div className="space-y-6 text-foreground/90 leading-loose text-justify font-light">
              <p dangerouslySetInnerHTML={{ __html: t.raw("sec3Body1") }} />
              <p>{t("sec3Body2")}</p>
              <p dangerouslySetInnerHTML={{ __html: t.raw("sec3Body3") }} />
            </div>
          </div>

          {/* Visual: Bar Chart */}
          <div className="w-full h-48 flex items-end justify-center space-x-4 pb-6 border-b border-border/10 pt-8">
            <div className="flex-1 max-w-[80px] flex flex-col items-center group">
              <div className="w-full bg-foreground/10 h-12 rounded-t-sm relative transition-all group-hover:bg-foreground/20"></div>
              <div className="mt-4 text-[10px] text-muted-foreground text-center leading-tight whitespace-pre-wrap">
                {t("barLabel1")}
              </div>
            </div>
            <div className="flex-1 max-w-[80px] flex flex-col items-center group">
              <div className="w-full bg-foreground/80 h-32 rounded-t-sm relative shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all group-hover:bg-foreground">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap text-foreground animate-bounce">
                  OPTIMAL
                </span>
              </div>
              <div className="mt-4 text-[10px] text-foreground font-bold text-center leading-tight whitespace-pre-wrap">
                {t("barLabel2")}
              </div>
            </div>
            <div className="flex-1 max-w-[80px] flex flex-col items-center group">
              <div className="w-full bg-foreground/10 h-8 rounded-t-sm relative transition-all group-hover:bg-foreground/20"></div>
              <div className="mt-4 text-[10px] text-muted-foreground text-center leading-tight whitespace-pre-wrap">
                {t("barLabel3")}
              </div>
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-12 pb-20 flex justify-center opacity-80 hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            asChild
            className="font-serif tracking-widest px-8"
          >
            <Link href="/diagnosis/logic">{t("back")}</Link>
          </Button>
        </div>
      </div>
      <ArticleJsonLd
        title={t("title")}
        description={t("description")}
        publishedTime="2025-12-01T00:00:00+09:00"
        url="https://24bitcolors.com/diagnosis/logic/algorithm"
      />
    </div>
  );
}
