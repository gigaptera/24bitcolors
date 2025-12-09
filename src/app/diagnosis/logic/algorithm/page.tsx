import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "アルゴリズムの仕組み",
  description:
    "ベイズ推定と情報理論を用いた独自の対話エンジン。1677万色からあなたの好みを特定する統計的プロセスの全貌。",
};

export default function AlgorithmLogicPage() {
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
            <Link href="/diagnosis/logic">← BACK TO OVERVIEW</Link>
          </Button>
        </div>

        {/* Header */}
        <header className="space-y-6">
          <h1 className="font-serif text-4xl md:text-5xl tracking-widest text-foreground">
            ADAPTIVE <br /> ALGORITHM
          </h1>
          <p className="font-sans text-base text-muted-foreground tracking-wide leading-relaxed max-w-xl">
            あなたの「無意識」を数値化する。
            <br />
            ベイズ推定と情報理論に基づく対話エンジン。
          </p>
        </header>

        {/* Section 1: The Candidates (Guideposts) */}
        <section className="space-y-12">
          <div className="space-y-4">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              01. CANDIDATES
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              1677万色へ至る「295の道標」
            </h2>
            <p className="text-foreground/90 leading-loose text-justify font-light">
              広大な色空間の中から、たった数問であなたの好みを見つけ出すために、
              システムは色空間全体に均等に配置された288色の有彩色と、7段階の無彩色、
              合計<strong>295個の「観測点（候補色）」</strong>を持っています。
              <br />
              <br />
              これらの候補は、最終的に選ばれる色のリストではありません。
              あくまで「この辺りの色が好きなのか？」を探るためのアンテナのような存在です。
              診断が進むにつれて、これらの点の間を補間し、無限に近い滑らかさであなただけの色を生成します。
            </p>
          </div>
        </section>

        {/* Section 2: Bayesian Inference */}
        <section className="space-y-12">
          <div className="space-y-4">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              02. BAYESIAN INFERENCE
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              可能性のクラウド
            </h2>
            <p className="text-foreground/90 leading-loose text-justify font-light">
              アルゴリズムは、最初は全ての色に対して「公平な可能性（確率分布）」を持っています。
              あなたが質問に答えるたび、選ばれなかった色の可能性（重み）が下がり、選ばれた色に近い領域の可能性が劇的に上がります。
              これは、霧の中で徐々に目的地が浮かび上がってくる様子に似ています。
            </p>
          </div>

          {/* Visual: Dot Matrix Evolution */}
          <div className="grid grid-cols-2 gap-4">
            {/* State 1: Uniform */}
            <div className="aspect-square rounded-lg bg-card border border-border p-4 relative overflow-hidden">
              <div className="absolute top-2 left-2 text-[10px] font-mono opacity-50">
                INITIAL STATE (Uniform)
              </div>
              <div className="w-full h-full grid grid-cols-6 gap-2 opacity-50">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full bg-foreground/20 scale-100 transition-all duration-500"
                  />
                ))}
              </div>
            </div>
            {/* State 2: Weighted */}
            <div className="aspect-square rounded-lg bg-card border border-border p-4 relative overflow-hidden">
              <div className="absolute top-2 left-2 text-[10px] font-mono opacity-50">
                AFTER 5 QUESTIONS (Weighted)
              </div>
              <div className="w-full h-full grid grid-cols-6 gap-2">
                {Array.from({ length: 36 }).map((_, i) => {
                  // Simulate random weighting visually
                  const active = [2, 3, 8, 9, 14, 15, 20].includes(i);
                  const scale = active
                    ? "scale-125 bg-foreground/90 shadow-[0_0_10px_currentColor]"
                    : "scale-50 bg-foreground/5";
                  return (
                    <div
                      key={i}
                      className={`rounded-full transition-all duration-500 ${scale}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Information Gain */}
        <section className="space-y-12">
          <div className="space-y-4">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              03. STRATEGY
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              「迷う質問」こそが良い質問
            </h2>
            <p className="text-foreground/90 leading-loose text-justify font-light">
              システムは常に、<strong>「情報利得 (Information Gain)」</strong>
              が最大になる2色の組み合わせ計算しています。
              これは、「どちらを選んでも結果があまり変わらない質問」を避け、「どちらを選ぶかで結果が大きく変わる質問」をぶつける戦略です。
              <br />
              <br />
              もしあなたが「どっちも好きだな...」あるいは「どっちも嫌いだ...」と迷ったなら、それはアルゴリズムが正常に機能している証拠です。
              その究極の選択こそが、不確実（エントロピー）を最も大きく減少させ、あなたの深層心理を暴き出す鍵となるからです。
            </p>
          </div>

          {/* Visual: Bar Chart */}
          <div className="w-full h-40 flex items-end justify-center space-x-2 pb-6 border-b border-border/10">
            <div className="flex-1 max-w-[50px] bg-foreground/10 h-[30%] rounded-t-md relative group">
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Easy Choice
              </span>
            </div>
            <div className="flex-1 max-w-[50px] bg-foreground/10 h-[45%] rounded-t-md relative group">
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Low Gain
              </span>
            </div>
            <div className="flex-1 max-w-[50px] bg-foreground/80 h-[90%] rounded-t-md relative shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-bold whitespace-nowrap text-foreground">
                OPTIMAL (Hard Choice)
              </span>
            </div>
            <div className="flex-1 max-w-[50px] bg-foreground/10 h-[60%] rounded-t-md relative group">
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Medium
              </span>
            </div>
            <div className="flex-1 max-w-[50px] bg-foreground/10 h-[20%] rounded-t-md relative group">
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Low
              </span>
            </div>
          </div>
          <p className="text-xs text-center text-muted-foreground pt-4">
            数千通りの組み合わせの中から、あなたの「迷い」を最適に誘発する1問を選び抜きます。
          </p>
        </section>

        {/* Footer Navigation */}
        <div className="pt-12 pb-20 flex justify-center opacity-80 hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            asChild
            className="font-serif tracking-widest px-8"
          >
            <Link href="/diagnosis/logic">BACK TO LOGIC OVERVIEW</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
