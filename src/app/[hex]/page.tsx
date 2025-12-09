import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getColorInfo,
  isValidHex,
  getHarmonies,
  getShades,
  getTints,
  isAchromatic,
} from "@/lib/color-utils";
import { ShareActions } from "@/components/ShareActions";
import { Button } from "@/components/ui/button";
import { CopyableHex } from "@/components/CopyableHex";

type Params = Promise<{ hex: string }>;

interface PageProps {
  params: Params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { hex } = await params;
  if (!isValidHex(hex)) return {};

  const info = getColorInfo(`#${hex}`);
  if (!info) return {};

  return {
    title: `${info.hex} - Color Analysis | 24bitColors`,
    description: `Scientific color analysis of ${info.hex}. Harmonies, Shades, Tints, and Technical conversions (RGB, CMYK, OKLCH).`,
    openGraph: {
      title: `${info.hex}`,
      description: `Scientific Color Analysis on 24bitColors.`,
      images: [
        {
          url: `https://api.clrs.page/${hex}`,
        },
      ],
    },
  };
}

export default async function ColorDetailPage({ params }: PageProps) {
  const { hex } = await params;

  if (!isValidHex(hex)) {
    notFound();
  }

  const colorInfo = getColorInfo(`#${hex}`);
  if (!colorInfo) {
    notFound();
  }

  const harmonies = getHarmonies(`#${hex}`);
  const shades = getShades(`#${hex}`, 5);
  const tints = getTints(`#${hex}`, 5);

  const yiq =
    (colorInfo.rgb.r * 299 + colorInfo.rgb.g * 587 + colorInfo.rgb.b * 114) /
    1000;
  const onColorText = yiq >= 128 ? "text-black/50" : "text-white/50";

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center bg-background py-12 md:py-20 animate-in fade-in duration-1000">
      {/* 1. HERO: The "Museum Piece" Card */}
      {/* 1. HERO: The "Museum Piece" Card */}
      <div className="group/card relative mb-20 w-[90%] md:w-full md:max-w-[400px] bg-card shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-700 hover:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.4)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] dark:hover:shadow-[0_45px_100px_-20px_rgba(255,255,255,0.05)]">
        {/* Swatch (Top) */}
        <CopyableHex
          hex={colorInfo.hex}
          className="relative aspect-[3/3.5] w-full overflow-hidden block"
          style={{ backgroundColor: colorInfo.hex }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 pointer-events-none" />
          {/* Interactive Hint */}
          <div
            className={`flex h-full w-full items-center justify-center transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover/card:opacity-100 ${onColorText}`}
          >
            <span className="font-serif tracking-widest text-sm uppercase">
              Pigment No. {colorInfo.hex.replace("#", "")}
            </span>
          </div>
        </CopyableHex>

        {/* Label (Bottom) */}
        <div className="flex flex-col items-center bg-card px-8 py-10 text-card-foreground">
          <CopyableHex hex={colorInfo.hex} showIcon className="mb-8">
            <h1
              className="font-serif text-5xl font-normal tracking-wide text-foreground"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              {colorInfo.hex}
            </h1>
          </CopyableHex>

          <div className="w-full space-y-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <div className="flex justify-between border-b border-border pb-2">
              <span>RGB</span>
              <span className="text-foreground text-xs tracking-widest">
                {colorInfo.rgb.r}, {colorInfo.rgb.g}, {colorInfo.rgb.b}
              </span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span>CMYK</span>
              <span className="text-foreground text-xs tracking-widest">
                {colorInfo.cmyk.c}, {colorInfo.cmyk.m}, {colorInfo.cmyk.y},{" "}
                {colorInfo.cmyk.k}
              </span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span>OKLCH</span>
              <span className="text-foreground text-xs tracking-widest">
                {Math.round(colorInfo.oklch.l * 100)}%,{" "}
                {Math.round(colorInfo.oklch.c * 100)}%,{" "}
                {Math.round(colorInfo.oklch.h)}°
              </span>
            </div>
          </div>

          <div className="mt-8 w-full border-t border-transparent pt-2">
            <ShareActions
              url={`https://24bitcolors.com/${hex}`}
              colors={{ name: colorInfo.hex, code: colorInfo.hex }}
            />
          </div>
        </div>
      </div>

      {/* 2. SCIENTIFIC ANALYSIS (Content Richness) */}
      <div className="container max-w-4xl px-4 space-y-24">
        {/* Shades & Tints */}
        {/* Tonal Variations (Gallery Style) */}
        <section className="w-full max-w-6xl mx-auto">
          <h2 className="mb-12 text-center font-serif text-2xl tracking-widest text-foreground">
            TONAL VARIATIONS
            <span className="mt-2 block font-sans text-sm tracking-normal text-muted-foreground">
              トーンの変化（明度・彩度）
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                label: "明色",
                sub: "TINTS",
                data: [...tints].reverse().concat(colorInfo.hex),
              },
              {
                label: "暗色",
                sub: "SHADES",
                data: [colorInfo.hex, ...shades],
              },
            ].map((set) => (
              <div key={set.label} className="group flex flex-col space-y-6">
                {/* The Art (Unified Aspect 16:10) */}
                <div className="relative w-full floating-shadow overflow-hidden">
                  <div className="flex aspect-[16/10] w-full">
                    {set.data.map((c, i) => (
                      <Link
                        key={`${set.label}-${c}-${i}`}
                        href={`/${c.replace("#", "")}`}
                        className="group/swatch relative flex flex-1 items-end justify-center pb-0 z-0"
                        style={{ backgroundColor: c }}
                        title={`${c}`}
                      >
                        <span className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-white py-2 font-mono text-[10px] tracking-wider text-black opacity-0 transition-opacity duration-200 group-hover/swatch:opacity-100">
                          {c}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* The Caption (Left Aligned) */}
                <div className="px-1 text-left">
                  <h3 className="font-serif text-base text-foreground tracking-wider">
                    {set.label}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase border-t border-border/40 pt-2 inline-block min-w-[100px]">
                    {set.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Harmonies (Chromatic Only) */}
        {!isAchromatic(`#${hex}`) && harmonies && (
          <section>
            <h2 className="mb-12 text-center font-serif text-2xl tracking-widest text-foreground">
              COLOR SCHEMES
              <span className="mt-2 block font-sans text-sm tracking-normal text-muted-foreground">
                配色パターンギャラリー
              </span>
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "補色",
                  sub: "COMPLEMENTARY",
                  colors: [colorInfo.hex, harmonies.complementary],
                },
                {
                  name: "類似色",
                  sub: "ANALOGOUS",
                  colors: [
                    harmonies.analogous[0],
                    colorInfo.hex,
                    harmonies.analogous[1],
                  ],
                },
                {
                  name: "トライアド",
                  sub: "TRIADIC",
                  colors: [colorInfo.hex, ...harmonies.triadic],
                },
                {
                  name: "分裂補色",
                  sub: "SPLIT COMPLEMENTARY",
                  colors: [colorInfo.hex, ...harmonies.splitComplementary],
                },
                {
                  name: "テトラード",
                  sub: "TETRADIC",
                  colors: [colorInfo.hex, ...harmonies.tetradic],
                },
                {
                  name: "ペンタード",
                  sub: "PENTADIC",
                  colors: [colorInfo.hex, ...harmonies.pentadic],
                },
                {
                  name: "ヘキサード",
                  sub: "HEXADIC",
                  colors: [colorInfo.hex, ...harmonies.hexadic],
                },
              ].map((scheme) => (
                <div key={scheme.sub} className="group flex flex-col space-y-6">
                  {/* The Art (Palette) */}
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

                  {/* The Caption */}
                  <div className="px-1 text-left">
                    <h3 className="font-serif text-base text-foreground tracking-wider">
                      {scheme.name}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase border-t border-border/40 pt-2 inline-block min-w-[100px]">
                      {scheme.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="mt-32 opacity-50 transition-opacity hover:opacity-100">
        <Button
          variant="link"
          asChild
          className="text-muted-foreground font-serif tracking-widest hover:text-foreground hover:no-underline"
        >
          <Link href="/">← BACK TO COLLECTION</Link>
        </Button>
      </div>
    </div>
  );
}
