import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";

export const metadata: Metadata = {
  title: "診断ロジックの裏側",
  description:
    "24bitColorsの診断精度を支える、科学と統計に基づいた「透明性」「OKLCH色空間」「対話アルゴリズム」について解説します。",
};

export default function DiagnosisLogicPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background py-20 px-6">
      <div className="w-full max-w-2xl animate-in fade-in duration-700 space-y-24">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="font-serif text-3xl md:text-4xl tracking-widest text-foreground">
            THE ALGORITHM
          </h1>
          <p className="font-sans text-sm md:text-base text-muted-foreground tracking-wide leading-relaxed max-w-lg mx-auto">
            24bitColorsの診断精度を支える、
            <br className="hidden md:inline" />
            科学と統計に基づいたロジックについて。
          </p>
        </header>

        {/* Section 1: Transparency */}
        <section className="space-y-6">
          <div className="flex flex-col items-center">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] mb-4">
              01. TRANSPARENCY
            </span>
            <h2 className="font-serif text-2xl tracking-wide text-center mb-6">
              ブラックボックスにしない
            </h2>
            <p className="text-muted-foreground leading-loose text-justify font-light">
              AIやアルゴリズムによる診断は、しばしば「なぜその結果になったのか」が不透明なブラックボックスになりがちです。
              私たちは、色が持つ論理的な構造を可視化し、どのようなプロセスを経てあなただけの色が導き出されるのかを公開することで、
              結果に対する納得感と信頼透明性を大切にしています。
            </p>
          </div>
        </section>

        {/* Section 2: OKLCH */}
        <section className="space-y-6">
          <div className="flex flex-col items-center">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] mb-4">
              02. COLOR SPACE
            </span>
            <h2 className="font-serif text-2xl tracking-wide text-center mb-6">
              人間の目に忠実な「OKLCH」
            </h2>
            <p className="text-muted-foreground leading-loose text-justify font-light">
              一般的なWebデザインで使われるRGB色空間は、実は人間の感覚とはズレがあります。
              24bitColorsでは、人間の知覚特性に最も近い最新の色空間である「OKLCH」を採用しています。
              これにより、「明るさ」や「鮮やかさ」を感覚通りに数値化し、従来の診断では捉えきれなかった繊細なニュアンスの違いまで分析することを可能にしました。
            </p>
            <div className="pt-6">
              <Button
                variant="outline"
                asChild
                className="font-mono text-xs tracking-widest uppercase"
              >
                <Link href="/diagnosis/logic/oklch">OKLCHの科学的背景</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Section 3: Adaptive */}
        <section className="space-y-6">
          <div className="flex flex-col items-center">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] mb-4">
              03. ADAPTIVE
            </span>
            <h2 className="font-serif text-2xl tracking-wide text-center mb-6">
              対話するアルゴリズム
            </h2>
            <p className="text-muted-foreground leading-loose text-justify font-light">
              あらかじめ決まった質問を順番にするだけではありません。
              システムはあなたの回答をリアルタイムに解析し、「次にどの色を比較すれば最も好みが絞り込めるか」を瞬時に計算します。
              1677万色の色空間に配置された数百の「観測点」を使ってあなたの好みの傾向を統計的に分析し、
              選択のたびに最適な色領域へと適応的にアプローチしていきます。
            </p>
            <div className="pt-6">
              <Button
                variant="outline"
                asChild
                className="font-mono text-xs tracking-widest uppercase"
              >
                <Link href="/diagnosis/logic/algorithm">
                  アルゴリズムの仕組み
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
              04. EVOLUTION
            </span>
            <h2 className="font-serif text-2xl tracking-wide text-center mb-6">
              フィードバックと共に進化する
            </h2>
            <p className="text-muted-foreground leading-loose text-justify font-light">
              このアルゴリズムは完成形ではありません。
              「もっと無彩色を選びたい」「質問が似すぎている」といったユーザーの皆様からのフィードバックを受けて、日々ロジックの調整を行っています。
              あなたの診断結果や感想が、次の誰かのための精度向上に直接つながります。私たちの色の探求は、あなたと共に進化し続けます。
            </p>
            <div className="pt-6">
              <Button
                variant="default"
                asChild
                className="font-mono text-xs tracking-widest uppercase px-8"
              >
                <Link href="/diagnosis/logic/feedback">
                  詳細なフィードバックを送る
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
            <Link href="/diagnosis">← BACK TO DIAGNOSIS</Link>
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
