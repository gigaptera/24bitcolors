import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "OKLCH色空間とは",
  description:
    "なぜHSLやRGBではなくOKLCHなのか。人間の知覚に忠実な最新の色空間がもたらす「正しい色診断」の科学的根拠。",
};

export default function OklchLogicPage() {
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
            THE SCIENCE OF <br /> OKLCH & OKLAB
          </h1>
          <div className="space-y-4 max-w-2xl">
            <p className="font-sans text-lg text-foreground/80 tracking-wide leading-relaxed font-light">
              人間の「目」を、そのまま数式にする。
            </p>
            <p className="font-sans text-sm text-muted-foreground tracking-wide leading-relaxed">
              24bitColorsの心臓部で動いているのは、2020年に生まれた最新の色空間「OKLCH」と「OKLAB」です。
              <br />
              これは単なる新しいカラーピッカーではありません。コンピュータが初めて、人間と同じように色を感じられるようになった革命的な出来事なのです。
            </p>
          </div>
        </header>

        {/* Section 1: The "L" Illusion (HSL vs Human Eye) */}
        <section className="space-y-12">
          <div className="space-y-6">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              01. PERCEPTION GAP
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              「黄色」は「青」より、ずっと明るい
            </h2>
            <div className="space-y-6 text-foreground/90 leading-loose text-justify font-light">
              <p>
                従来のWebデザインで使われてきた「HSL色空間」には、致命的な欠陥がありました。それは
                <strong>
                  「数値上の明るさと、見た目の明るさが一致しない」
                </strong>
                ことです。
              </p>
              <p>
                下の図を見てください。HSLの計算式では、濃い青も鮮やかな黄色も、同じ「明度50%」だと主張します。しかし、人間の目には明らかに黄色の方が眩しく見えますよね？
              </p>
              <p>
                「数値は合っているのに、デザインがなんとなくチグハグになる」。そんなデザイナーたちの長年の悩みを、OKLCHは生物学的なアプローチで解決しました。眼球の網膜が受け取る刺激を計算式に組み込むことで、青も黄色も、人間が感じる通りの「正しい明るさ」で管理できるようになったのです。
              </p>
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
                ▲ HSLの「明度50%」における、実際の見た目の明るさの違い。
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: OKLAB vs OKLCH */}
        <section className="space-y-12">
          <div className="space-y-6">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              02. TWO FACES OF COLOR
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              地図で読むか、コンパスで読むか
            </h2>
            <div className="space-y-6 text-foreground/90 leading-loose text-justify font-light">
              <p>
                このサイトでは、場面に応じて「OKLCH」と「OKLAB」という2つの言葉を使い分けていますが、実はこれらは
                <strong>全く同じ色空間の「別の表現方法」</strong>
                です。ちょうど、地図上の場所を「緯度経度」で表すか、「ここから北東に何キロ」で表すかの違いと同じです。
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div className="border border-border p-6 rounded-lg bg-card/30">
                  <h3 className="font-serif text-lg mb-2 text-foreground">
                    OKLAB (Cartesian)
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    L=明度, a=赤緑軸, b=青黄軸
                  </p>
                  <p className="text-sm leading-relaxed">
                    数学的なXY座標のようなもの。「色の距離」を計算するのに最適です。今回の診断でも、無彩色（グレー）の判定や、色同士の近さを計算する裏側ではこのOKLABが活躍しています。
                  </p>
                </div>
                <div className="border border-border p-6 rounded-lg bg-card/30">
                  <h3 className="font-serif text-lg mb-2 text-foreground">
                    OKLCH (Polar)
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    L=明度, C=彩度, H=色相
                  </p>
                  <p className="text-sm leading-relaxed">
                    コンパスと距離のようなもの。「もっと鮮やかに」「もっと赤く」といった、人間の直感的な操作に適しています。診断結果の表示や、あなたの好みを分析する表側ではこちらを使っています。
                  </p>
                </div>
              </div>

              <p>
                この2つを自由に行き来することで、計算の「正確さ」と、人間の「直感」を両立させているのが24bitColorsの特徴です。特に無彩色（白黒）の扱いにおいて、OKLABは「a=0,
                b=0」という完全な無を定義できるため、美しいグレーを表現するのに不可欠です。
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Future Proof */}
        <section className="space-y-12">
          <div className="space-y-6">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              03. UNBOUNDED FUTURE
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              「sRGBの檻」からの脱出
            </h2>
            <div className="space-y-6 text-foreground/90 leading-loose text-justify font-light">
              <p>
                これまでのWebデザインは「sRGB」という色の檻の中に閉じ込められていました。sRGBは20年以上前のブラウン管モニターを基準に作られた規格で、現実世界の鮮やかな色の半分も表現できません。
              </p>
              <p>
                しかしOKLCHには、理論上の「彩度の上限」がありません。
                今はまだ、多くのスマホやPCモニターがsRGBの範囲しか出せませんが、最新のiPhoneやMacBook（Display
                P3対応）は既にその外側の色を表示し始めています。
              </p>
              <p>
                私たちはアルゴリズムをOKLCHで構築することで、将来どのような高性能ディスプレイが登場しても、その性能をフルに活かせる
                <strong>「未来互換性（Future-Proof）」</strong>
                を確保しました。今日あなたが選んだその色は、10年後のディスプレイで見れば、もっと鮮やかに、もっと美しく輝くはずです。
              </p>
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
                  Current Web (sRGB)
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
            <Link href="/diagnosis/logic">BACK TO LOGIC OVERVIEW</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
