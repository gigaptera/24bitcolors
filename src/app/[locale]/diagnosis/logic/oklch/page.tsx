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
  const t = await getTranslations({ locale, namespace: "LogicOklch" });
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

export default function OklchLogicPage() {
  const t = useTranslations("LogicOklch");
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

        {/* Section 1: The "L" Illusion (HSL vs Human Eye) */}
        <section className="space-y-12">
          <div className="space-y-6">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              {t("sec1Label")}
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              {t("sec1Title")}
            </h2>
            <div className="space-y-6 text-foreground/90 leading-loose text-justify font-light">
              <p dangerouslySetInnerHTML={{ __html: t.raw("sec1Body1") }} />
              <p>{t("sec1Body2")}</p>
              <p>{t("sec1Body3")}</p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-xl border border-border space-y-8">
            {/* Visual Comparison Graph */}
            <div className="space-y-4">
              <div className="flex justify-between items-end h-32 border-b border-foreground/20 pb-2 relative">
                {/* Reference Line */}
                <div className="absolute top-1/2 w-full h-[1px] bg-foreground/20 border-t border-dashed border-foreground/40" />
                <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground w-6 text-right">
                  50%
                </span>

                {/* Blue Bar */}
                <div className="flex flex-col items-center gap-2 w-1/4 group">
                  <div className="w-12 h-16 bg-[#0000FF] rounded-t-md relative">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      HSL: 50%
                      <br />
                      Eye: Dark
                    </span>
                  </div>
                  <span className="text-[10px] font-mono">Blue</span>
                </div>

                {/* Yellow Bar */}
                <div className="flex flex-col items-center gap-2 w-1/4 group">
                  <div className="w-12 h-28 bg-[#FFFF00] rounded-t-md relative">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      HSL: 50%
                      <br />
                      Eye: Bright!
                    </span>
                  </div>
                  <span className="text-[10px] font-mono">Yellow</span>
                </div>

                {/* OKLCH Solution */}
                <div className="absolute right-4 top-4 text-xs font-mono text-right text-muted-foreground max-w-[150px]">
                  HSL treats these as EQUAL lightness. <br />
                  <strong className="text-foreground">OKLCH fixes this.</strong>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground text-center pt-2">
                {t("graphLabel")}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: OKLAB vs OKLCH */}
        <section className="space-y-12">
          <div className="space-y-6">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              {t("sec2Label")}
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              {t("sec2Title")}
            </h2>
            <div className="space-y-6 text-foreground/90 leading-loose text-justify font-light">
              <p dangerouslySetInnerHTML={{ __html: t.raw("sec2Body1") }} />

              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div className="border border-border p-6 rounded-lg bg-card/30">
                  <h3 className="font-serif text-lg mb-2 text-foreground">
                    {t("oklabTitle")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("oklabSub")}
                  </p>
                  <p className="text-sm leading-relaxed">{t("oklabDesc")}</p>
                </div>
                <div className="border border-border p-6 rounded-lg bg-card/30">
                  <h3 className="font-serif text-lg mb-2 text-foreground">
                    {t("oklchTitle")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("oklchSub")}
                  </p>
                  <p className="text-sm leading-relaxed">{t("oklchDesc")}</p>
                </div>
              </div>

              <p>{t("sec2Body2")}</p>
            </div>
          </div>
        </section>

        {/* Section 3: Future Proof */}
        <section className="space-y-12">
          <div className="space-y-6">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              {t("sec3Label")}
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              {t("sec3Title")}
            </h2>
            <div className="space-y-6 text-foreground/90 leading-loose text-justify font-light">
              <p>{t("sec3Body1")}</p>
              <p>{t("sec3Body2")}</p>
              <p dangerouslySetInnerHTML={{ __html: t.raw("sec3Body3") }} />
            </div>
          </div>

          <div className="relative h-24 mt-8 rounded-lg overflow-hidden border border-border">
            {/* Gamut Visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[80%] h-2 bg-gradient-to-r from-gray-500 via-red-500 to-[#ff0080] rounded-full opacity-30 blur-sm"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[40%] h-4 border-2 border-foreground/30 bg-background/50 backdrop-blur-sm rounded flex items-center justify-center">
                <span className="text-[10px] font-mono text-muted-foreground">
                  {t("graphGamut")}
                </span>
              </div>
            </div>
            <div className="absolute right-[10%] top-1/2 -translate-y-1/2">
              <span className="text-[10px] font-mono text-foreground font-bold animate-pulse">
                Your True Color →
              </span>
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
        url="https://24bitcolors.com/diagnosis/logic/oklch"
      />
    </div>
  );
}
