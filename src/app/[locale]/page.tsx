import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { HomeScrollManager } from "@/components/HomeScrollManager";
import { StickyCTA } from "@/components/StickyCTA";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main className="flex w-full flex-col bg-background text-foreground selection:bg-foreground selection:text-background">
      <HomeScrollManager />
      {/* 
        HERO SECTION 
        - Snap Start
        - Full Height
      */}
      <section className="relative flex h-[100vh] w-full snap-start flex-col items-center justify-center overflow-hidden p-6">
        {/* Background Effect: Color Prism / Aurora */}
        <div className="aurora-gradient absolute inset-0 -z-10 animate-pulse-slow opacity-30 dark:opacity-20" />

        {/* Floating Abstract Shapes */}
        <div className="animate-float absolute -left-20 top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl filter dark:bg-blue-400/5" />
        <div className="animate-float absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-rose-500/10 blur-3xl filter transition-transform delay-1000 dark:bg-rose-400/5" />

        {/* Main Content Container */}
        <div className="z-10 flex max-w-3xl flex-col items-center text-center">
          {/* Main Title - Optimize for Brand but Keep SEO in mind via context */}
          <h1 className="mb-8 animate-fade-in text-6xl font-medium tracking-tight md:text-8xl font-serif">
            {t("heroTitle")}
          </h1>

          {/* Tagline */}
          <p className="mb-12 animate-fade-in text-sm font-light uppercase tracking-[0.25em] text-muted-foreground delay-100 md:text-base font-sans">
            {t("heroTagline")}
          </p>

          {/* Description - SEO Optimized */}
          <div className="mb-12 max-w-md animate-fade-in text-sm leading-relaxed text-muted-foreground delay-200 md:text-base font-serif">
            <h2 className="sr-only">{t("srOnlyTitle")}</h2>
            <p className="whitespace-pre-line">{t("heroDescription")}</p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-4 animate-fade-in delay-300">
            <Button
              asChild
              size="lg"
              className="px-10 py-7 text-lg shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:shadow-none dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              <Link href="/diagnosis">{t("ctaSearchYourColor")}</Link>
            </Button>
            <p className="text-xs text-muted-foreground tracking-wider opacity-80">
              {t("freeNoRegistration")}
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 animate-bounce opacity-80">
          <p className="text-[10px] tracking-[0.3em] font-medium">
            {t("scroll")}
          </p>
        </div>
      </section>

      {/* 
        CONCEPT SECTION 
        - Snap Start
        - Full Height
      */}
      <section className="flex h-[100vh] w-full snap-start flex-col items-center justify-center bg-foreground/5 p-6 text-center">
        <div className="max-w-xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {t("conceptLabel")}
          </p>
          <h2 className="text-3xl font-normal md:text-5xl font-serif">
            {t("conceptTitle")}
          </h2>
          <p className="leading-loose text-muted-foreground font-serif text-sm md:text-base whitespace-pre-line">
            {t("conceptBody")}
          </p>

          <div className="pt-8 flex flex-col items-center gap-6">
            <Button
              variant="outline"
              asChild
              className="group text-xs tracking-[0.2em] px-8 h-12"
            >
              <Link href="/about" className="flex items-center gap-2">
                <span>{t("readOurStory")}</span>
                <span className="block h-px w-8 bg-foreground transition-all group-hover:w-16" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 
        LOGIC SECTION 
        - Snap Start
        - Full Height
      */}
      <section
        id="about"
        className="flex h-[100vh] w-full snap-start flex-col items-center justify-center p-6 text-center"
      >
        <div className="max-w-xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {t("logicLabel")}
          </p>
          <h2 className="mb-8 text-3xl font-normal md:text-4xl font-serif">
            {t("logicTitle")}
          </h2>
          <p className="mb-10 leading-loose text-muted-foreground whitespace-pre-line">
            {t("logicBody")}
          </p>

          <div className="flex flex-col items-center gap-4">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 font-serif tracking-widest shadow-sm transition-all hover:bg-foreground hover:text-background"
            >
              <Link href="/diagnosis/logic">{t("ctaSeeLogicBehind")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky CTA for Mobile */}
      <StickyCTA />
    </main>
  );
}
