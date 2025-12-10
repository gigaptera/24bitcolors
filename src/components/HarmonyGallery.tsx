"use client";

import React, { useState } from "react";
import Link from "next/link";
import { parse, converter } from "culori";
import { HarmonyDetailModal } from "./HarmonyDetailModal";
import { ArrowsOut } from "@phosphor-icons/react";

interface HarmonyGalleryProps {
  hex: string;
  harmonies: {
    complementary: string;
    analogous: string[];
    rectangular: string[];
    analogousComplementary: string[];
    triadic: string[];
    tetradic: string[];
    splitComplementary: string[];
    pentadic: string[];
    hexadic: string[];
  };
}

const toOklch = converter("oklch");

export function HarmonyGallery({ hex, harmonies }: HarmonyGalleryProps) {
  const [selectedHarmony, setSelectedHarmony] = useState<{
    name: string;
    sub: string;
    description?: string;
    colors: string[];
    angles: number[];
  } | null>(null);

  // Calculate Base Hue for geometry
  const c = parse(hex);
  const ok = c ? toOklch(c) : { h: 0 };
  const h = ok.h || 0;

  const schemes = [
    {
      name: "補色",
      sub: "COMPLEMENTARY",
      description:
        "色相環の対極に位置する2色。互いの色を最も強く引き立て合う『補色対比』を生み出します。視覚的なインパクトが非常に強く、ダイナミックで力強いエネルギーを感じさせる配色です。",
      colors: [hex, harmonies.complementary],
      angles: [h, (h + 180) % 360],
    },
    {
      name: "類似色",
      sub: "ANALOGOUS",
      description:
        "色相環上で隣接する色同士の組み合わせ。共通の色相成分を持つため、極めて調和しやすく、自然界にも多く見られます。穏やかで統一感があり、見る人に安心感を与える配色です。",
      colors: [harmonies.analogous[0], hex, harmonies.analogous[1]],
      angles: [(h - 30 + 360) % 360, h, (h + 30) % 360],
    },
    {
      name: "レクタングル",
      sub: "RECTANGULAR",
      description:
        "2組の補色対比を含む4色の構成。長方形を描くこの配置は、補色の強烈なコントラストを持ちながらも、色相のバリエーションにより豊かな響きを生みます。複雑で洗練されたバランスを構築できます。",
      colors: [hex, ...harmonies.rectangular],
      angles: [h, (h + 60) % 360, (h + 180) % 360, (h + 240) % 360],
    },
    {
      name: "アナロガス・コンプリメンタリー",
      sub: "ANALOGOUS COMPLEMENTARY",
      description:
        "類似色の調和の中に、アクセントとしてその補色（反対色）を加えた構成。類似色が持つ『統一感』と、補色が持つ『緊張感』が共存し、退屈さを回避しつつまとまりのある印象を作ります。",
      colors: [
        harmonies.analogousComplementary[0],
        hex,
        harmonies.analogousComplementary[1],
        harmonies.analogousComplementary[2],
      ],
      angles: [(h - 30 + 360) % 360, h, (h + 30) % 360, (h + 180) % 360],
    },
    {
      name: "トライアド",
      sub: "TRIADIC",
      description:
        "色相環を3等分する正三角形の配色。3色が互いに異なる個性を持ちながらも、幾何学的な均衡が保たれています。コントラストがありながらも安定感があり、生き生きとした活気を与える伝統的な配色です。",
      colors: [hex, ...harmonies.triadic],
      angles: [h, (h + 120) % 360, (h + 240) % 360],
    },
    {
      name: "分裂補色",
      sub: "SPLIT COMPLEMENTARY",
      description:
        "補色の両隣に位置する2色を採用した3色構成（二等辺三角形）。補色の強い対比を維持しつつ、緊張感を和らげています。コントラストと調和のバランスが良く、扱いやすく洗練された印象を与えます。",
      colors: [hex, ...harmonies.splitComplementary],
      angles: [h, (h + 150) % 360, (h + 210) % 360],
    },
    {
      name: "テトラード",
      sub: "TETRADIC",
      description:
        "色相環を4等分する正方形の配色。4つの色が均等な距離にあるため、多色配色のなかでも特にカラフルでリズミカルな構成です。2組の補色関係を含むため、非常に豊かで遊び心のある表現が可能です。",
      colors: [hex, ...harmonies.tetradic],
      angles: [h, (h + 90) % 360, (h + 180) % 360, (h + 270) % 360],
    },
    {
      name: "ペンタード",
      sub: "PENTADIC",
      description:
        "色相環を5等分する正五角形の配色。5つの色が星を描くように配置されます。色数が多いため非常に華やかで、万華鏡のような多様性を持ちます。1色を主役にすることで、賑やかさの中に秩序が生まれます。",
      colors: [hex, ...harmonies.pentadic],
      angles: [
        h,
        (h + 72) % 360,
        (h + 144) % 360,
        (h + 216) % 360,
        (h + 288) % 360,
      ],
    },
    {
      name: "ヘキサード",
      sub: "HEXADIC",
      description:
        "色相環を6等分する正六角形の配色。「ダブル・トライアド」とも呼ばれ、2つの正三角形が重なり合う構成です。豊かな色彩の広がりを持ち、すべての色が互いに響き合う、調和と多様性の極致と言える配色です。",
      colors: [hex, ...harmonies.hexadic],
      angles: [
        h,
        (h + 60) % 360,
        (h + 120) % 360,
        (h + 180) % 360,
        (h + 240) % 360,
        (h + 300) % 360,
      ],
    },
  ];

  return (
    <section>
      <h2 className="mb-12 text-center font-serif text-2xl tracking-widest text-foreground">
        COLOR SCHEMES
        <span className="mt-2 block font-sans text-sm tracking-normal text-muted-foreground">
          配色パターンギャラリー
        </span>
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {schemes.map((scheme) => (
          <div key={scheme.sub} className="group flex flex-col space-y-6">
            {/* The Art (Palette) */}
            <div className="relative">
              <div className="flex aspect-[16/10] w-full overflow-hidden floating-shadow">
                {scheme.colors.map((c, i) => (
                  <Link
                    key={`${scheme.sub}-${c}-${i}`}
                    href={`/${c.replace("#", "")}`}
                    className="group/swatch relative flex flex-1 items-end justify-center pb-0 shadow-sm z-0"
                    style={{ backgroundColor: c }}
                    title={`${c}`}
                  >
                    <span className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-white py-2 font-mono text-[10px] tracking-wider text-black opacity-0 transition-opacity duration-200 group-hover/swatch:opacity-100">
                      {c}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Detail View Button (Overlay) */}
              <button
                onClick={() => setSelectedHarmony(scheme)}
                className="absolute top-2 right-2 p-2 rounded-full bg-black/20 hover:bg-black/50 text-white opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                title="色相環で見る"
              >
                <ArrowsOut weight="light" className="w-4 h-4" />
              </button>
            </div>

            {/* The Caption */}
            <div
              className="px-1 text-left cursor-pointer"
              onClick={() => setSelectedHarmony(scheme)}
            >
              <div className="flex items-center gap-2 group-hover:text-foreground/80 transition-colors">
                <h3 className="font-serif text-base text-foreground tracking-wider">
                  {scheme.name}
                </h3>
              </div>
              <p className="mt-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase border-t border-border/40 pt-2 inline-block min-w-[100px]">
                {scheme.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedHarmony && (
        <HarmonyDetailModal
          isOpen={!!selectedHarmony}
          onClose={() => setSelectedHarmony(null)}
          title={selectedHarmony.name}
          sub={selectedHarmony.sub}
          description={selectedHarmony.description}
          colors={selectedHarmony.colors}
          mainColor={hex}
          angles={selectedHarmony.angles}
        />
      )}
    </section>
  );
}
