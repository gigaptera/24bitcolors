import { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { getNearestPoeticName, getColorFromSlug } from "@/lib/colorNaming";
import { ResultInteraction } from "@/components/ResultInteraction";
import { toOklch } from "@/lib/colorNaming";
import { AmbientBackground } from "@/components/AmbientBackground";
import { getTranslations } from "next-intl/server";
import { ColorInsightFetcher } from "@/components/ColorInsightFetcher";
// import { AdUnit } from "@/components/ads/AdUnit";

// Force dynamic is NOT needed for the page itself anymore as we fetch client-side,
// but keeping it 'auto' (default) is fine.
// However, if we heavily rely on searchParams, 'force-dynamic' might prevent static generation issues.
// Let's stick to default behavior or 'force-dynamic' if params vary widely.
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ group: string; locale: string }>;
  searchParams: Promise<{ hex?: string; from_diagnosis?: string }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { group, locale } = await params;
  const { hex } = await searchParams;
  const t = await getTranslations({ locale, namespace: "Result" });

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
      title: readableGroup,
      description: t("descBelongTo", { groupName: readableGroup }),
      openGraph: {
        title: readableGroup,
        description: t("descBelongTo", { groupName: readableGroup }),
        images: [
          `/api/og?hex=${targetHex}&name=${encodeURIComponent(readableGroup)}`,
        ],
      },
    };
  }

  // Fallback if no valid color found
  return {
    title: readableGroup,
    description: t("descBelongTo", { groupName: readableGroup }),
  };
}

export default async function ResultPage({ params, searchParams }: Props) {
  const { group, locale } = await params;
  const { hex, from_diagnosis } = await searchParams;
  const t = await getTranslations({ locale, namespace: "Result" });

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
    <div className="min-h-screen w-full flex flex-col items-center justify-start relative pt-24 pb-32">
      {/* Background Ambience - theme-aware for text readability */}
      <AmbientBackground hex={safeHex} />

      <main className="z-10 w-full max-w-3xl px-6 flex flex-col items-center text-center space-y-12">
        {/* Color Card */}
        <div className="relative group">
          <div
            className="w-64 h-64 md:w-80 md:h-80 rounded-full shadow-2xl border-4 border-background transition-transform duration-700 hover:scale-105 floating-shadow"
            style={{ backgroundColor: safeHex }}
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <p className="text-xs font-mono tracking-[0.4em] uppercase text-muted-foreground/60">
            {hex ? t("labelYourTrueColor") : t("labelColorSpace")}
          </p>

          <div className="relative inline-block">
            <h1 className="font-serif text-5xl md:text-7xl tracking-wide text-foreground relative z-10">
              {groupName}
            </h1>
            {/* Subtle decorative backing */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
          </div>

          <div className="pt-2 font-mono text-xl opacity-80 tracking-[0.2em] font-light">
            {safeHex.toUpperCase()}
          </div>

          <div className="w-full flex justify-center pt-2">
            <p className="max-w-md text-sm text-muted-foreground tracking-wider leading-loose whitespace-pre-line font-serif italic opacity-80">
              {t("descBelongTo", { groupName })}
            </p>
          </div>
        </div>
      </main>

      {/* Dynamic AI Insights Section (Client Fetching) */}
      <ColorInsightFetcher
        hex={safeHex}
        colorName={groupName}
        locale={locale}
      />

      {/* Share Section and Buttons - Moved here */}
      <div className="w-full max-w-md pt-16 pb-12 flex flex-col items-center space-y-6 z-10">
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
              fromDiagnosis={from_diagnosis === "true"}
            />
          );
        })()}
      </div>

      {/* Ad Placement: After content, before very bottom */}
      {/* AdUnit temporarily disabled pending Google AdSense approval */}
    </div>
  );
}
