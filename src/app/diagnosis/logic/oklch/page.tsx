import Link from "next/link";
import { Button } from "@/components/ui/button";

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
        <header className="space-y-6">
          <h1 className="font-serif text-4xl md:text-5xl tracking-widest text-foreground">
            THE SCIENCE OF <br /> OKLCH
          </h1>
          <p className="font-sans text-base text-muted-foreground tracking-wide leading-relaxed max-w-xl">
            2020年に生まれた、色空間の「最終決定版」。
            <br />
            なぜ私たちはHSLやRGBを捨て、OKLCHを選んだのか。
          </p>
        </header>

        {/* Section 1: The "L" Illusion (HSL vs Human Eye) */}
        <section className="space-y-12">
          <div className="space-y-4">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              01. PERCEPTION GAP
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              「黄色」は「青」より明るい
            </h2>
            <p className="text-foreground/90 leading-loose text-justify font-light">
              従来のWebデザインで愛用されてきた「HSL色空間」には、致命的な欠点があります。
              それは「数学的な明度」と「人間が感じる明るさ」が一致しないことです。
              <br />
              <br />
              下のグラフを見てください。HSLでは、青も黄色も同じ「明度50%」として扱われます。
              しかし、人間の目には黄色の方が圧倒的に明るく見えます。 この
              <strong>「感覚と数値のズレ」</strong>
              が、デザインの調和を崩す原因となっていました。
            </p>
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
                ▲
                HSLの「明度50%」における、実際の見た目の明るさの違い（イメージ）。
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Origin & Oklab */}
        <section className="space-y-12">
          <div className="space-y-4">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              02. ORIGIN
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              Björn Ottossonと「Oklab」
            </h2>
            <p className="text-foreground/90 leading-loose text-justify font-light">
              OKLCHの基礎となる「Oklab」は、2020年にBjörn
              Ottosson氏によって発表されました。
              それまでも「CIELAB」などの均等色空間は存在しましたが、計算が複雑で、色相の歪み（青が紫に見える問題）を抱えていました。
              Oklabはこれらの問題を数学的に洗練させ、
              <strong>「シンプルで、予測可能で、知覚的に正しい」</strong>
              という、現代のデジタル色彩における最適解を導き出したのです。
            </p>
          </div>
        </section>

        {/* Section 3: Unbounded Chroma */}
        <section className="space-y-12">
          <div className="space-y-4">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              03. UNBOUNDED
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              「枠」のない世界
            </h2>
            <p className="text-foreground/90 leading-loose text-justify font-light">
              RGBやCMYKといった従来の色空間は、「立方体」のような閉じた箱でした。その箱の外にある色は表現できません。
              しかし、OKLCHのC（彩度）には理論上の上限がありません。
              <br />
              <br />
              これは、将来的にディスプレイ技術が進化し、より鮮やかな色が表現できるようになったとしても、
              OKLCHのデータはそのままで対応できることを意味します。 Display
              P3やRec.2020といった広色域ディスプレイが標準化しつつある今、
              <strong>「箱（デバイス）に依存しない色定義」</strong>
              こそが、本質的な色の永続性を保証するのです。
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <div className="p-4 border border-border rounded-lg bg-card/50">
              <span className="block text-xs font-mono text-muted-foreground mb-2">
                sRGB (Standard Web)
              </span>
              <div className="h-2 w-full bg-gradient-to-r from-gray-500 to-red-500 rounded-full opacity-50" />
              <p className="text-[10px] text-right mt-1 opacity-50">
                Limited Range
              </p>
            </div>
            <div className="p-4 border border-foreground/50 rounded-lg bg-card">
              <span className="block text-xs font-mono text-foreground mb-2 font-bold">
                OKLCH (Unlimited)
              </span>
              <div className="h-2 w-full bg-gradient-to-r from-gray-500 via-red-500 to-[#ff0080] rounded-full" />
              <p className="text-[10px] text-right mt-1">Future Proof</p>
            </div>
          </div>
        </section>

        {/* Comparison Section (Reserved from previous) */}
        <section className="space-y-12">
          <div className="space-y-4">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] block">
              04. CONSISTENCY
            </span>
            <h2 className="font-serif text-2xl tracking-wide">
              グラデーションの純度
            </h2>
            <div className="space-y-6 rounded-xl border border-border p-8 bg-card/50">
              <div className="grid gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-mono text-foreground/80 font-medium">
                    <span>Blue</span>
                    <span>Linear RGB</span>
                    <span>White</span>
                  </div>
                  <div className="h-16 w-full rounded-md bg-gradient-to-r from-[#0000FF] to-[#FFFFFF] shadow-sm" />
                  <p className="text-[11px] text-foreground/70 leading-relaxed">
                    ▲ 中間色が濁り、紫色っぽく見える現象（Hue Shift）。
                  </p>
                </div>
                <div className="space-y-3 pt-4">
                  <div className="flex justify-between text-xs font-mono text-foreground font-bold">
                    <span>Blue</span>
                    <span>OKLCH Interpolation</span>
                    <span>White</span>
                  </div>
                  <div
                    className="h-16 w-full rounded-md shadow-sm"
                    style={{
                      background:
                        "linear-gradient(90deg, oklch(0.45 0.26 264), oklch(1 0 0))",
                    }}
                  />
                  <p className="text-[11px] text-foreground/90 font-medium leading-relaxed">
                    ▲ 鮮やかさを保ったまま、自然に遷移する（Perceptually
                    Smooth）。
                  </p>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground leading-loose text-justify font-light pt-4">
              24bitColorsが採用しているのは、単なる「新しい計算式」ではありません。
              それは、人間の目が捉える「色」の本質を、デジタルの世界で正しく再現するための基盤技術です。
              この一貫性があるからこそ、あなたの感性に最も近い色を診断することができるのです。
            </p>
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
