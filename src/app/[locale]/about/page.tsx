import { Link } from "@/i18n/routing";
import Script from "next/script";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/about",
    },
  };
}

// Structured Data for AboutPage (kept partly static/partly dynamic if needed, but for now we keep it simple or localize if strict)
// For simplicity, keeping JSON-LD static or minimally edited.
// Ideally JSON-LD should also be localized but it's often acceptable to keep main language.
// Let's keep it defined inside component or simplistic.

export default function AboutPage() {
  const t = useTranslations("About");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t("jsonLdName"),
    description: t("jsonLdDescription"),
    url: "https://24bitcolors.com/about",
    mainEntity: {
      "@type": "Organization",
      name: t("jsonLdName"),
      url: "https://24bitcolors.com",
      logo: "https://24bitcolors.com/icon.png",
      description: t("organizationDescription"),
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="about-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative flex min-h-screen w-full flex-col bg-background text-foreground overflow-x-hidden">
        {/* Atmospheric Background */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-foreground/[0.02] to-transparent blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-foreground/[0.03] to-transparent blur-3xl" />
        </div>

        {/* 
          HERO SECTION: Asymmetrical Global Museum Style
          Left: Massive Title
          Right: Philosophy Text
        */}
        <section className="relative w-full px-6 md:px-12 pt-32 pb-20 min-h-[90vh] grid grid-cols-1 md:grid-cols-12 gap-y-12 items-center">
          {/* LEFT: Massive Heading */}
          <div
            className="md:col-span-8 z-10 flex flex-col items-start animate-fade-in opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="mb-8 block text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase text-muted-foreground">
              {t("lblPhilosophy")}
            </span>
            <h1 className="font-serif text-[12vw] md:text-[8vw] leading-[0.9] tracking-tighter text-foreground mix-blend-difference">
              Universal
              <br />
              Beauty &<br />
              Curiosity
            </h1>
          </div>

          {/* RIGHT: Philosophy Text (Bottom Aligned) */}
          <div
            className="md:col-span-4 flex flex-col justify-end h-full z-10 animate-fade-in opacity-0"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="md:pl-8 border-l border-foreground/10 md:border-none">
              <h2 className="mb-6 font-serif text-2xl md:text-3xl font-light">
                {t("heroTitle1")}
                {t("heroTitle2")}
              </h2>
              <div className="h-[1px] w-12 bg-foreground/20 mb-6" />
              <p className="font-serif text-sm md:text-base leading-loose text-muted-foreground/90">
                {t("heroSubtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* 
          CONTENT SECTIONS: Staggered "Exhibit" Layout
          Number/Label on Left (or Top on mobile), Content on Right
        */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 space-y-32 pb-32">
          {/* SECTION 1: THE CONCEPT */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 view-timeline-name:--reveal animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="md:col-span-3 md:text-right">
              <span className="text-[4rem] md:text-[6rem] leading-none font-serif text-foreground/5 block -mt-4 md:-mt-8">
                01
              </span>
              <span className="block mt-2 text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase">
                Concept
              </span>
            </div>

            <div className="md:col-span-6 border-t border-foreground/10 pt-8 md:pt-0 md:border-t-0">
              <h2 className="mb-8 text-3xl md:text-4xl font-serif text-foreground">
                {t("conceptTitle")}
              </h2>
              <div className="space-y-8 text-base leading-loose text-muted-foreground font-serif">
                <p>{t("conceptBody1")}</p>
                <p>{t("conceptBody2")}</p>
              </div>
            </div>
          </section>

          {/* SECTION 2: THE SCIENCE */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 view-timeline-name:--reveal animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="md:col-span-3 md:col-start-4 md:text-right">
              <span className="text-[4rem] md:text-[6rem] leading-none font-serif text-foreground/5 block -mt-4 md:-mt-8">
                02
              </span>
              <span className="block mt-2 text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase">
                Science
              </span>
            </div>

            <div className="md:col-span-6 border-t border-foreground/10 pt-8 md:pt-0 md:border-t-0">
              <h2 className="mb-8 text-3xl md:text-4xl font-serif text-foreground">
                {t("scienceTitle")}
              </h2>
              <div className="space-y-8 text-base leading-loose text-muted-foreground font-serif">
                <p>{t("scienceBody1")}</p>
                <p>{t("scienceBody2")}</p>
              </div>

              <div className="mt-12">
                <Link
                  href="/diagnosis/logic"
                  className="group inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase border-b border-foreground/30 pb-1 hover:border-foreground transition-all"
                >
                  <span>{t("linkAlgorithm")}</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </section>

          {/* SECTION 3: THE VISION */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 view-timeline-name:--reveal animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="md:col-span-3 md:text-right">
              <span className="text-[4rem] md:text-[6rem] leading-none font-serif text-foreground/5 block -mt-4 md:-mt-8">
                03
              </span>
              <span className="block mt-2 text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase">
                Vision
              </span>
            </div>

            <div className="md:col-span-6 border-t border-foreground/10 pt-8 md:pt-0 md:border-t-0">
              <h2 className="mb-8 text-3xl md:text-4xl font-serif text-foreground">
                {t("visionTitle")}
              </h2>
              <div className="space-y-8 text-base leading-loose text-muted-foreground font-serif">
                <p>{t("visionBody1")}</p>
                <p>{t("visionBody2")}</p>
              </div>
            </div>
          </section>
        </div>

        {/* CTA SECTION */}
        <section className="relative flex w-full flex-col items-center justify-center px-6 pt-32 pb-24 md:pt-48 md:pb-32 gap-16">
          <Link
            href="/diagnosis"
            className="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-serif text-lg text-background bg-foreground shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-glow)]"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative flex items-center gap-3 tracking-widest uppercase text-sm">
              {t("ctaStart")} <ArrowRight />
            </span>
          </Link>

          <Link
            href="/"
            className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground/50 pb-1"
          >
            {t("ctaBack")}
          </Link>
        </section>
      </div>
    </>
  );
}
