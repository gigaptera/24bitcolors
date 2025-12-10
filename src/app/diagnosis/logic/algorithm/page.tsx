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
        <header className="space-y-8">
          <h1 className="font-serif text-4xl md:text-5xl tracking-widest text-foreground">
            ADAPTIVE <br /> ALGORITHM
          </h1>
          <div className="space-y-4 max-w-2xl">
            <p className="font-sans text-lg text-foreground/80 tracking-wide leading-relaxed font-light">
              あなたの「無意識」を、数学で捕まえる。
            </p>
            <p className="font-sans text-sm text-muted-foreground tracking-wide leading-relaxed">
              この診断は、単なる性格診断や占いではありません。
              <br />
              確率統計学と情報理論を応用し、あなたの脳内にある「理想の色」への最短ルートを計算し続ける、対話型の探索エンジンです。
            </p>
          </div>
        </header>

        {/* Section 1: The Candidates (Guideposts) */}
        <section className="space-y-12">
          <div className="space-y-6">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              01. THE MAP & SENSORS
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              1677万色の海に浮かぶ「263個のブイ」
            </h2>
            <div className="space-y-6 text-foreground/90 leading-loose text-justify font-light">
              <p>
                PCやスマホの画面は、理論上1677万色もの色を映し出すことができます。この広大な色の海から、あなたが求めているたった一つの色を見つけ出すのは、太平洋で落とした指輪を探すようなものです。闇雲に探しても見つかりません。
              </p>
              <p>
                そこでこのシステムは、色空間という地図全体に、等間隔に
                <strong>263個の「観測点（候補色）」</strong>
                を配置しました。これはGPS衛星や、海に浮かべるブイのようなものです。
              </p>
              <p>
                重要なのは、この263色が「答えの候補（選択肢）」ではないということです。これらはあくまで、あなたの好みが「どのあたりにあるか」を感知するための
                <strong>センサー</strong>です。
                最終的な診断結果は、これらの点の間を数学的に補間（埋めること）して計算されるため、ブイがない場所にある色でも、無限に近い滑らかさで特定することができます。
              </p>

              <div className="bg-muted/50 p-4 rounded-md text-sm text-muted-foreground border border-border/50">
                <p className="font-semibold mb-1 text-xs tracking-wider">
                  Note: なぜ263個なのか？
                </p>
                <p className="leading-relaxed text-xs">
                  理論上はもっと多くの点を配置（496個）していますが、人間の目には見えても一般的なモニター（sRGB）では再現できない「色が潰れてしまう領域」を厳密に除外した結果、生き残ったのがこの263個のエリートたちです。将来、世界中のディスプレイ性能が上がれば、この道標の数は自動的に増えるよう設計されています。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Bayesian Inference */}
        <section className="space-y-12">
          <div className="space-y-6">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              02. BAYESIAN INFERENCE
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              「可能性の霧」を晴らす
            </h2>
            <div className="space-y-6 text-foreground/90 leading-loose text-justify font-light">
              <p>
                診断が始まった瞬間、システムはあなたがどの色を好きか全く知りません。つまり、全ての色に対して「好きである確率」が平等に薄く広がっている状態です。これは色空間全体が「可能性の霧」で覆われているようなものです。
              </p>
              <p>
                ここで<strong>「ベイズ推定」</strong>
                という確率の魔法が登場します。
                あなたが「Aの色が好き」と答えると、システムは「Aに近い色は好きである可能性が高い」「逆にBに近い色は嫌いである可能性が高い」と計算し、霧の濃淡を更新します（事後確率の更新）。
              </p>
              <p>
                これを繰り返すと、最初は真っ白だった霧が徐々に晴れていき、ある一点だけが強く光り輝くようになります。これが、あなたの好みが特定されていくプロセスです。「正解を選ぶ」のではなく、「可能性を絞り込む」アプローチをとることで、少ない質問数での特定を可能にしています。
              </p>
            </div>
          </div>

          {/* Visual: Dot Matrix Evolution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* State 1: Uniform */}
            <div className="space-y-3">
              <div className="aspect-square rounded-lg bg-card border border-border p-6 relative overflow-hidden">
                <div className="absolute top-3 left-3 text-[10px] font-mono opacity-50">
                  START (Uniform probability)
                </div>
                <div className="w-full h-full grid grid-cols-6 gap-3 opacity-50 place-items-center">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-foreground/30"
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                最初はどこに正解があるかわからないため、
                <br />
                全ての点の確率が同じ（一様分布）。
              </p>
            </div>
            {/* State 2: Weighted */}
            <div className="space-y-3">
              <div className="aspect-square rounded-lg bg-card border border-border p-6 relative overflow-hidden">
                <div className="absolute top-3 left-3 text-[10px] font-mono opacity-50">
                  AFTER 10 QUESTIONS (Converged)
                </div>
                <div className="w-full h-full grid grid-cols-6 gap-3 place-items-center">
                  {Array.from({ length: 36 }).map((_, i) => {
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
              <p className="text-xs text-muted-foreground text-center">
                質問を重ねると、特定のエリア（好みの色）の
                <br />
                確率密度だけが高まり、他は消えていく。
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Information Gain */}
        <section className="space-y-12">
          <div className="space-y-6">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              03. INFORMATION GAIN
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              「究極の2択」を作り出す技術
            </h2>
            <div className="space-y-6 text-foreground/90 leading-loose text-justify font-light">
              <p>
                システムは毎回、適当に2色を選んでいるわけではありません。数千通りの組み合わせの中から、
                <strong>
                  「最も情報が得られる（Information Gainが高い）質問」
                </strong>
                を計算して出題しています。
              </p>
              <p>
                例えば、「赤と青、どっちが好き？」と聞いて、あなたが「赤」と答えたとします。もしシステムが最初から「赤が好きだろうな」と予想していたら、この質問からは新しい情報はほとんど得られません。逆に、「全く予想がつかない五分五分の2色」を提示されたときこそ、あなたの選択には大きな価値（情報量）が生まれます。
              </p>
              <p>
                専門用語で言うと、システムは
                <strong>「エントロピー（不確実性）を最大化する質問」</strong>
                を避けて、<strong>「エントロピーを最も減少させる質問」</strong>
                を探しています。もしあなたが「どっちも好きだな…」あるいは「どっちも微妙だな…」と迷うような質問が出たら、それはアルゴリズムがあなたの核心に迫っている証拠です。その「迷い」の決断こそが、診断を劇的に前進させるのです。
              </p>
            </div>
          </div>

          {/* Visual: Bar Chart */}
          <div className="w-full h-48 flex items-end justify-center space-x-4 pb-6 border-b border-border/10 pt-8">
            <div className="flex-1 max-w-[80px] flex flex-col items-center group">
              <div className="w-full bg-foreground/10 h-12 rounded-t-sm relative transition-all group-hover:bg-foreground/20"></div>
              <div className="mt-4 text-[10px] text-muted-foreground text-center leading-tight">
                簡単な質問
                <br />
                (情報量：小)
              </div>
            </div>
            <div className="flex-1 max-w-[80px] flex flex-col items-center group">
              <div className="w-full bg-foreground/80 h-32 rounded-t-sm relative shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all group-hover:bg-foreground">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap text-foreground animate-bounce">
                  OPTIMAL
                </span>
              </div>
              <div className="mt-4 text-[10px] text-foreground font-bold text-center leading-tight">
                迷う質問
                <br />
                (情報量：大)
              </div>
            </div>
            <div className="flex-1 max-w-[80px] flex flex-col items-center group">
              <div className="w-full bg-foreground/10 h-8 rounded-t-sm relative transition-all group-hover:bg-foreground/20"></div>
              <div className="mt-4 text-[10px] text-muted-foreground text-center leading-tight">
                無関係な質問
                <br />
                (情報量：ゼロ)
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
            <Link href="/diagnosis/logic">BACK TO LOGIC OVERVIEW</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
