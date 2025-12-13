import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

type Props = {
  params: Promise<{ locale: string }>;
};

import type { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DiagnosisLogic" });

  return {
    title: `${t("title")} | 24bitColors`,
    description: t("description"),
  };
}

export default function DiagnosisLogicPage() {
  const t = useTranslations("DiagnosisLogic");

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background py-20 px-6">
      <div className="w-full max-w-2xl animate-in fade-in duration-700 space-y-24">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="font-serif text-3xl md:text-4xl tracking-widest text-foreground">
            {t("lblAlgorithm")}
          </h1>
          <p className="font-sans text-sm md:text-base text-muted-foreground tracking-wide leading-relaxed max-w-lg mx-auto whitespace-pre-line">
            {t("intro")}
          </p>
        </header>

        {/* Section 1: Transparency */}
        <section className="space-y-6">
          <div className="flex flex-col items-center">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] mb-4">
              {t("lblTransparency")}
            </span>
            <h2 className="font-serif text-2xl tracking-wide text-center mb-6">
              {t("titleTransparency")}
            </h2>
            <p className="text-muted-foreground leading-loose text-left font-light">
              {t("bodyTransparency")}
            </p>
          </div>
        </section>

        {/* Section 2: OKLCH */}
        <section className="space-y-6">
          <div className="flex flex-col items-center">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] mb-4">
              {t("lblColorSpace")}
            </span>
            <h2 className="font-serif text-2xl tracking-wide text-center mb-6">
              {t("titleColorSpace")}
            </h2>
            <p className="text-muted-foreground leading-loose text-left font-light">
              {t("bodyColorSpace")}
            </p>
            <div className="pt-6">
              <Button
                variant="outline"
                asChild
                className="font-mono text-xs tracking-widest uppercase"
              >
                <Link href="/diagnosis/logic/oklch">{t("linkOklch")}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Section 3: Adaptive */}
        <section className="space-y-6">
          <div className="flex flex-col items-center">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] mb-4">
              {t("lblAdaptive")}
            </span>
            <h2 className="font-serif text-2xl tracking-wide text-center mb-6">
              {t("titleAdaptive")}
            </h2>
            <p className="text-muted-foreground leading-loose text-left font-light">
              {t("bodyAdaptive")}
            </p>
            <div className="pt-6">
              <Button
                variant="outline"
                asChild
                className="font-mono text-xs tracking-widest uppercase"
              >
                <Link href="/diagnosis/logic/algorithm">
                  {t("linkAlgorithm")}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Section 4: Evolution (New) */}
        <section className="space-y-6 relative">
          <div className="absolute -inset-x-8 -inset-y-8 bg-foreground/5 dark:bg-foreground/5 -z-10 rounded-3xl blur-2xl opacity-50" />
          <div className="flex flex-col items-center">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] mb-4">
              {t("lblEvolution")}
            </span>
            <h2 className="font-serif text-2xl tracking-wide text-center mb-6">
              {t("titleEvolution")}
            </h2>
            <p className="text-muted-foreground leading-loose text-left font-light">
              {t("bodyEvolution")}
            </p>
            <div className="pt-6">
              <Button
                variant="default"
                asChild
                className="font-mono text-xs tracking-widest uppercase px-8"
              >
                <Link href="/diagnosis/logic/feedback">
                  {t("linkFeedback")}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-12 flex justify-center opacity-70 hover:opacity-100 transition-opacity">
          <Button
            variant="link"
            asChild
            className="text-muted-foreground font-serif tracking-widest hover:text-foreground hover:no-underline"
          >
            <Link href="/diagnosis">{t("backData")}</Link>
          </Button>
        </div>
      </div>
      <ArticleJsonLd
        title="診断ロジックの裏側"
        description="24bitColorsの診断精度を支える、科学と統計に基づいた「透明性」「OKLCH色空間」「対話アルゴリズム」について解説します。"
        publishedTime="2025-12-01T00:00:00+09:00"
        url="https://24bitcolors.com/diagnosis/logic"
      />
    </div>
  );
}
