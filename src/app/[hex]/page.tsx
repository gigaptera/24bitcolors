import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { HexShareSection } from "./HexShareSection";
import {
  getColorInfo,
  isValidHex,
  getHarmonies,
  getShades,
  getTints,
  isAchromatic,
} from "@/lib/color-utils";
import { Button } from "@/components/ui/button";
import { CopyableHex } from "@/components/CopyableHex";
import { HarmonyGallery } from "@/components/HarmonyGallery";

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
      {/* Shared Container for Vertical Flow */}
      <div className="w-full max-w-3xl px-6 flex flex-col items-center">
        {/* 1. HERO: The "Color Monolith" (Exhibition Poster) */}
        <div className="relative mb-16 md:mb-32 w-full perspective-1000">
          {/* The Frame - Full Width of Container */}
          <div className="relative mx-auto bg-white p-[15px] shadow-[var(--shadow-museum)] duration-700 ease-out hover:scale-[1.01] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] dark:bg-[#111] dark:hover:shadow-[0_40px_80px_-15px_rgba(255,255,255,0.1)]">
            {/* The Matting (Passe-Partout) */}
            <div className="flex aspect-[5/6] md:aspect-[4/3] w-full flex-col bg-white p-6 dark:bg-[#1a1a1a] sm:p-[60px]">
              {/* The Artwork (Color) */}
              <CopyableHex
                hex={colorInfo.hex}
                className="group/art relative flex-1 w-full overflow-hidden shadow-inner cursor-pointer"
                style={{ backgroundColor: colorInfo.hex }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover/art:opacity-100" />

                {/* Overlay Text (Museum Label Style on Canvas) */}
                <div
                  className={`flex h-full w-full flex-col items-center justify-center text-center opacity-90 transition-all duration-500 hover:scale-105 ${onColorText}`}
                >
                  <span className="mb-4 font-serif text-sm font-light tracking-[0.3em] uppercase opacity-70">
                    Pigment No.
                  </span>
                  <span
                    className="font-serif text-5xl sm:text-7xl font-normal tracking-wider"
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  >
                    {colorInfo.hex.replace("#", "")}
                  </span>
                </div>
              </CopyableHex>

              {/* The Caption (Bottom of Mat - integrated for simpler look in wider view) */}
              <div className="mt-4 md:mt-6 flex flex-col items-center space-y-4">
                {/* Exhibition Notes (Tech Data) */}
                <div className="w-full grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] lg:gap-4 gap-y-6 pt-4 md:pt-8 font-mono tracking-wider text-black/70 dark:text-white/70">
                  {/* RGB (Row 1 Left) */}
                  <div className="flex justify-center lg:justify-between px-2 lg:px-0">
                    <div className="flex gap-4 sm:gap-6 lg:gap-5 w-full justify-center lg:justify-around text-center">
                      <div className="flex flex-col items-center min-w-[1.5rem]">
                        <span className="mb-3 text-[10px] opacity-40">R</span>
                        <span className="text-xs">{colorInfo.rgb.r}</span>
                      </div>
                      <div className="flex flex-col items-center min-w-[1.5rem]">
                        <span className="mb-3 text-[10px] opacity-40">G</span>
                        <span className="text-xs">{colorInfo.rgb.g}</span>
                      </div>
                      <div className="flex flex-col items-center min-w-[1.5rem]">
                        <span className="mb-3 text-[10px] opacity-40">B</span>
                        <span className="text-xs">{colorInfo.rgb.b}</span>
                      </div>
                    </div>
                  </div>

                  {/* OKLCH (Row 1 Right on Mobile) */}
                  <div className="flex justify-center lg:justify-between px-2 lg:px-0">
                    <div className="flex gap-4 sm:gap-6 lg:gap-5 w-full justify-center lg:justify-around text-center">
                      <div className="flex flex-col items-center min-w-[1.5rem]">
                        <span className="mb-3 text-[10px] opacity-40">L</span>
                        <span className="text-xs">
                          {Math.round(colorInfo.oklch.l * 100)}%
                        </span>
                      </div>
                      <div className="flex flex-col items-center min-w-[1.5rem]">
                        <span className="mb-3 text-[10px] opacity-40">C</span>
                        <span className="text-xs">
                          {colorInfo.oklch.c.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex flex-col items-center min-w-[1.5rem]">
                        <span className="mb-3 text-[10px] opacity-40">H</span>
                        <span className="text-xs">
                          {Math.round(colorInfo.oklch.h)}°
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CMYK (Row 2 Spans Full) */}
                  <div className="col-span-2 lg:col-span-1 flex justify-center lg:border-l lg:border-r border-black/5 dark:border-white/5 px-4 lg:px-6">
                    <div className="flex gap-4 sm:gap-6 lg:gap-5 w-full justify-center lg:justify-around text-center">
                      <div className="flex flex-col items-center min-w-[1.5rem]">
                        <span className="mb-3 text-[10px] opacity-40">C</span>
                        <span className="text-xs">{colorInfo.cmyk.c}</span>
                      </div>
                      <div className="flex flex-col items-center min-w-[1.5rem]">
                        <span className="mb-3 text-[10px] opacity-40">M</span>
                        <span className="text-xs">{colorInfo.cmyk.m}</span>
                      </div>
                      <div className="flex flex-col items-center min-w-[1.5rem]">
                        <span className="mb-3 text-[10px] opacity-40">Y</span>
                        <span className="text-xs">{colorInfo.cmyk.y}</span>
                      </div>
                      <div className="flex flex-col items-center min-w-[1.5rem]">
                        <span className="mb-3 text-[10px] opacity-40">K</span>
                        <span className="text-xs">{colorInfo.cmyk.k}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Share Actions (Below the Frame) */}
          <div className="mt-12 flex justify-center">
            <HexShareSection hex={hex} />
          </div>
        </div>

        {/* 2. SCIENTIFIC ANALYSIS (Content Richness) */}
        <div className="w-full space-y-32">
          {/* Shades & Tints */}
          {/* Tonal Variations (Gallery Style) */}
          <section className="w-full">
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
            <HarmonyGallery hex={colorInfo.hex} harmonies={harmonies} />
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
    </div>
  );
}
