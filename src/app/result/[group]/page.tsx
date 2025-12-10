import { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { getNearestPoeticName, getColorFromSlug } from "@/lib/colorNaming";
import { ResultInteraction } from "@/components/ResultInteraction";
import { toOklch } from "@/lib/colorNaming";
import { AmbientBackground } from "@/components/AmbientBackground";

interface Props {
  params: Promise<{ group: string }>;
  searchParams: Promise<{ hex?: string }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { group } = await params;
  const { hex } = await searchParams;

  // Decoded group name from slug (approximate for display title)
  const readableGroup = group
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  // If Hex is provided, use it. If not, try to get representative color.
  const targetHex = hex
    ? hex.replace(/[^0-9a-fA-F]/g, "")
    : getColorFromSlug(group)?.replace("#", "");

  if (targetHex) {
    return {
      title: `${readableGroup} | 24bitColors`,
      description: `私の運命の色は ${readableGroup} (#${targetHex}) でした。| 1677万色から「あなたの色」を見つける統計的診断`,
      openGraph: {
        images: [
          `/api/og?hex=${targetHex}&name=${encodeURIComponent(readableGroup)}`,
        ],
      },
    };
  }

  return {
    title: "Not Found | 24bitColors",
  };
}

export default async function ResultPage({ params, searchParams }: Props) {
  const { group } = await params;
  const { hex } = await searchParams;

  let safeHex = "";

  if (hex) {
    safeHex = `#${hex.replace(/[^0-9a-fA-F]/g, "")}`;
    const { groupSlug } = getNearestPoeticName(safeHex);

    // Consistency Check: Redirect if slug mismatch
    if (group !== groupSlug) {
      redirect(`/result/${groupSlug}?hex=${hex}`);
    }
  } else {
    // No Hex provided: SEO / Generic Group View
    const representativeHex = getColorFromSlug(group);
    if (!representativeHex) {
      notFound(); // Invalid slug -> 404
    }
    safeHex = representativeHex;
  }

  const { groupName, groupSlug } = getNearestPoeticName(safeHex);

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center relative overflow-hidden pt-16 md:pt-0">
      {/* Background Ambience - theme-aware for text readability */}
      <AmbientBackground hex={safeHex} />

      <main className="z-10 w-full max-w-3xl px-6 py-12 flex flex-col items-center text-center space-y-12">
        {/* Color Card */}
        <div className="relative group">
          <div
            className="w-64 h-64 md:w-80 md:h-80 rounded-full shadow-2xl border-4 border-background transition-transform duration-700 hover:scale-105"
            style={{ backgroundColor: safeHex }}
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
        </div>

        {/* Text Content */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <p className="text-sm font-light tracking-[0.3em] uppercase text-muted-foreground">
            {hex ? "Your True Color" : "Color Space"}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl tracking-wide text-foreground">
            {groupName}
          </h1>
          <div className="pt-2 font-mono text-xl opacity-80 tracking-widest">
            {safeHex.toUpperCase()}
          </div>
          <p className="pt-4 text-xs text-muted-foreground tracking-widest leading-loose">
            あなたは「{groupName}」という
            <br />
            色の星雲に属しています。
          </p>
        </div>

        {/* Share Section and Buttons */}
        <div className="w-full max-w-md pt-8 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
          {/* Interactive Section (Rating -> Share -> Card) */}
          {/* We need the full OKLCH object for the card generator */}
          {(() => {
            // Re-calculate OKLCH for the interaction component
            const c = toOklch(safeHex);
            // Convert to OklchColor interface format {hue, lightness, chroma, weight}
            const colorObj = c
              ? {
                  hue: c.h ?? 0,
                  lightness: c.l ?? 0,
                  chroma: c.c ?? 0,
                  weight: 1,
                }
              : null;

            return (
              <ResultInteraction
                hex={safeHex}
                resultColor={colorObj}
                groupSlug={groupSlug}
              />
            );
          })()}
        </div>
      </main>
    </div>
  );
}
