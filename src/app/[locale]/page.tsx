import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { StickyCTA } from "@/components/StickyCTA";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main className="relative flex w-full flex-col bg-background text-foreground overflow-x-hidden selection:bg-foreground selection:text-background">
      {/* 
        HERO SECTION: Global Museum Style
        - Asymmetrical Layout (Mobile: Stacked, Desktop: Grid)
        - Huge Typography
      */}
      <section className="relative min-h-[100dvh] w-full px-6 pt-32 pb-20 md:px-12 md:py-0 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 items-center">
        {/* Background Atmosphere */}
        <div className="aurora-gradient absolute inset-0 -z-10 opacity-30 dark:opacity-20 pointer-events-none" />

        {/* LEFT: Massive Heading (The Exhibit) */}
        <div className="md:col-span-7 flex flex-col justify-center items-start z-10">
          <h1
            className="font-serif text-[15vw] md:text-[9vw] leading-[0.9] tracking-tighter text-foreground mix-blend-difference animate-fade-in opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            FIND
            <br />
            YOUR
            <br />
            COLOR
          </h1>
        </div>

        {/* RIGHT: Context & Action (Gallery Label) */}
        <div className="md:col-span-5 flex flex-col justify-end items-start h-full md:pb-24 z-10">
          {/* Label Group */}
          <div
            className="space-y-8 animate-fade-in opacity-0"
            style={{ animationDelay: "0.8s" }}
          >
            {/* Tagline */}
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("heroTagline")}
            </p>

            {/* Description (Japanese) */}
            <div className="font-serif text-sm md:text-base leading-loose text-muted-foreground/80 max-w-sm whitespace-pre-line">
              <p>{t("heroDescription")}</p>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="rounded-none px-12 py-8 text-lg bg-foreground text-background hover:bg-foreground/90 hover:scale-[1.02] transition-all duration-500 shadow-xl dark:shadow-[var(--shadow-floating)]"
              >
                <Link href="/diagnosis">{t("ctaSearchYourColor")}</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator (Absolute Bottom Center) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hidden md:block">
          <p className="text-[10px] uppercase tracking-[0.3em] font-mono">
            Scroll
          </p>
        </div>
      </section>

      {/* 
        CONCEPT SECTION: The Philosophy
        - Clean centered text with "Ma" (Negative space)
      */}
      {/* 
        CONCEPT SECTION: The Philosophy
        - Clean centered text with "Ma" (Negative space)
        - Height adjusted for natural flow (Fibonacci Spacing)
      */}
      <section className="w-full py-40 md:py-64 px-6 flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 view-timeline-name:--reveal">
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground/60">
            {t("conceptLabel")}
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-tight">
            {t("conceptTitle")}
          </h2>
          <p className="text-base md:text-lg leading-loose text-muted-foreground font-serif whitespace-pre-line">
            {t("conceptBody")}
          </p>

          <Button
            variant="outline"
            asChild
            className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-6 text-xs tracking-widest uppercase transition-all duration-300"
          >
            <Link href="/about">{t("readOurStory")}</Link>
          </Button>
        </div>
      </section>

      {/* 
        LOGIC SECTION
        - Height adjusted for natural flow
      */}
      <section className="w-full py-40 md:py-64 px-6 flex flex-col items-center justify-center bg-foreground/5">
        <div className="max-w-2xl text-center space-y-12">
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground/60">
            {t("logicLabel")}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground">
            {t("logicTitle")}
          </h2>
          <p className="text-sm md:text-base leading-loose text-muted-foreground whitespace-pre-line">
            {t("logicBody")}
          </p>

          <Button
            asChild
            variant="outline"
            className="rounded-none border-foreground/20 hover:bg-foreground hover:text-background px-8 py-6 tracking-widest text-xs uppercase transition-all duration-300"
          >
            <Link href="/diagnosis/logic">{t("ctaSeeLogicBehind")}</Link>
          </Button>
        </div>
      </section>

      {/* Sticky CTA for Mobile */}
      <StickyCTA />
    </main>
  );
}
