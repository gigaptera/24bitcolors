import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "24bitColors - あなたの好きな色を見つけよう",
  description:
    "20の質問で、1677万色の中からあなたの「運命の色」を統計的に特定します。登録不要、無料で今すぐ診断。",
  alternates: {
    canonical: "/",
  },
};

import { HomeScrollManager } from "@/components/HomeScrollManager";

export default function Home() {
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
          {/* Main Title */}
          <h1 className="mb-8 animate-fade-in text-6xl font-medium tracking-tight md:text-8xl font-serif">
            24bitColors
          </h1>

          {/* Tagline */}
          <p className="mb-12 animate-fade-in text-sm font-light uppercase tracking-[0.25em] text-muted-foreground delay-100 md:text-base font-sans">
            Discover Your True Color
          </p>

          {/* Description */}
          <p className="mb-12 max-w-md animate-fade-in text-sm leading-relaxed text-muted-foreground delay-200 md:text-base font-serif">
            20の質問への回答から、
            <br className="md:hidden" />
            1677万色の中であなたが最も好む色を
            <br className="md:hidden" />
            統計的に特定します。
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in delay-300">
            <Button
              asChild
              size="lg"
              className="px-10 py-7 text-lg shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <Link href="/diagnosis">診断を開始する</Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 animate-bounce opacity-80">
          <p className="text-[10px] tracking-[0.3em] font-medium">SCROLL</p>
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
            The Concept
          </p>
          <h2 className="text-3xl font-normal md:text-5xl font-serif">
            Digital Color Museum
          </h2>
          <p className="leading-loose text-muted-foreground font-serif text-sm md:text-base">
            1,677万色の海から、
            <br />
            あなたの真実の色を見つける旅へ。
            <br />
            ここは、あなたと色だけが存在する静寂な美術館です。
          </p>

          <div className="pt-8">
            <Button
              variant="ghost"
              asChild
              className="group text-xs tracking-[0.2em] hover:bg-transparent hover:text-foreground"
            >
              <Link href="/about" className="flex items-center gap-2">
                <span>READ OUR STORY</span>
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
            The Logic
          </p>
          <h2 className="mb-8 text-3xl font-normal md:text-4xl font-serif">
            色彩の統計学
          </h2>
          <p className="mb-10 leading-loose text-muted-foreground">
            色彩心理学と情報工学に基づいた独自のアルゴリズムが、
            <br />
            あなたの潜在的な色の好みを分析します。
            <br className="mb-4 block" />
            単純なランダム抽出ではなく、
            <br />
            あなたの選択履歴から「好みの傾向」を学習し、
            <br />
            1677万色の中から最適解へと収束させます。
          </p>

          <Button variant="outline" asChild className="border-foreground/20">
            <Link href="/diagnosis/logic">ロジックの裏側を見る</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
