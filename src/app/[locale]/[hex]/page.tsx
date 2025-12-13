import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
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
import { getTranslations } from "next-intl/server";

type Params = Promise<{ hex: string; locale: string }>;

interface PageProps {
  params: Params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { hex, locale } = await params;
  if (!isValidHex(hex)) return {};

  const info = getColorInfo(`#${hex}`);
  if (!info) return {};

  const t = await getTranslations({ locale, namespace: "ColorDetail" });

  return {
    title: `${t("title", { hex: info.hex })} | 24bitColors`,
    description: t("description", { hex: info.hex }),
    openGraph: {
      title: `${t("title", { hex: info.hex })} | 24bitColors`,
      description: t("description", { hex: info.hex }),
      images: [
        {
          url: `/api/og-hex?hex=${hex}`,
          width: 1200,
          height: 630,
          alt: `${info.hex} Color Analysis`,
        },
      ],
    },
  };
}

import { AmbientBackground } from "@/components/AmbientBackground";

// ... (imports remain same, need to be careful with replace)

export default async function ColorDetailPage({ params }: PageProps) {
  const { hex, locale } = await params;

  if (!isValidHex(hex)) {
    notFound();
  }

  const colorInfo = getColorInfo(`#${hex}`);
  if (!colorInfo) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "ColorDetail" });
  const harmonies = getHarmonies(`#${hex}`);
  const shades = getShades(`#${hex}`, 5);
  const tints = getTints(`#${hex}`, 5);

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center bg-background pt-20 pb-20 md:py-32 animate-in fade-in duration-1000 relative">
      <AmbientBackground hex={`#${hex}`} />

      {/* Shared Container for Vertical Flow */}
      <div className="w-full max-w-4xl px-6 flex flex-col items-center z-10">
        {/* 1. HERO: The "Color Monolith" (Exhibition Poster) */}
        <div className="relative mb-24 md:mb-40 w-full perspective-1000">
          {/* The Frame - Full Width of Container */}
          <div className="relative mx-auto bg-card shadow-[var(--shadow-museum)] transition-all duration-700 hover:shadow-[var(--shadow-floating)] hover:-translate-y-1">
            {/* The Matting (Passe-Partout) */}
            <div className="flex flex-col bg-card p-6 md:p-12 lg:p-16">
              {/* The Artwork (Color) */}
              <div className="aspect-[4/5] md:aspect-[3/2] w-full relative">
                <CopyableHex
                  hex={colorInfo.hex}
                  className="w-full h-full shadow-inner cursor-pointer"
                  style={{ backgroundColor: colorInfo.hex }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
                </CopyableHex>
              </div>

              {/* Caption Area */}
              <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left: Identity */}
                <div>
                  <h1 className="font-mono text-3xl md:text-4xl tracking-widest text-foreground uppercase">
                    {colorInfo.hex}
                  </h1>
                  <p className="mt-2 text-xs font-serif tracking-widest text-muted-foreground">
                    EXHIBIT NO. {hex.toUpperCase()}
                  </p>
                </div>

                {/* Right: Technical Specs (Minimalist) */}
                <div className="grid grid-cols-3 gap-6 font-mono text-[10px] md:text-xs text-muted-foreground tracking-widest">
                  <div className="space-y-2">
                    <span className="opacity-40 block mb-1">RGB</span>
                    <div className="flex flex-col">
                      <span>{colorInfo.rgb.r}</span>
                      <span>{colorInfo.rgb.g}</span>
                      <span>{colorInfo.rgb.b}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="opacity-40 block mb-1">CMYK</span>
                    <div className="flex flex-col">
                      <span>{colorInfo.cmyk.c}</span>
                      <span>{colorInfo.cmyk.m}</span>
                      <span>{colorInfo.cmyk.y}</span>
                      <span>{colorInfo.cmyk.k}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="opacity-40 block mb-1">OKLCH</span>
                    <div className="flex flex-col">
                      <span>{Math.round(colorInfo.oklch.l * 100)}%</span>
                      <span>{colorInfo.oklch.c.toFixed(2)}</span>
                      <span>{Math.round(colorInfo.oklch.h)}°</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Share Actions (Below the Frame) */}
          <div className="mt-16 flex justify-center">
            <HexShareSection hex={hex} />
          </div>
        </div>

        {/* 2. SCIENTIFIC ANALYSIS (Content Richness) */}
        <div className="w-full space-y-32">
          {/* Shades & Tints */}
          {/* Tonal Variations (Gallery Style) */}
          <section className="w-full">
            <h2 className="mb-12 text-center font-serif text-2xl tracking-widest text-foreground">
              {t("lblTonalVariations")}
              <span className="mt-2 block font-sans text-sm tracking-normal text-muted-foreground">
                {t("lblTonalSub")}
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  label: t("lblTintsSub"),
                  sub: t("lblTints"),
                  data: [...tints].reverse().concat(colorInfo.hex),
                },
                {
                  label: t("lblShadesSub"),
                  sub: t("lblShades"),
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
            <Link href="/">{t("backToCollection")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
