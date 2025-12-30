"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { calculateResonance } from "@/lib/color-resonance";
import { getNearestPoeticName } from "@/lib/colorNaming";
import { AmbientBackground } from "@/components/AmbientBackground";
import { useTranslations } from "next-intl";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const t = useTranslations("Compare");

  const [myHex, setMyHex] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Get Target from URL (Derived directly)
  const targetParam = searchParams.get("target");
  const targetHex = useMemo(() => {
    return targetParam
      ? targetParam.startsWith("#")
        ? targetParam
        : `#${targetParam}`
      : null;
  }, [targetParam]);

  // 2. Get My Color from LocalStorage (Effect for client-side storage)
  useEffect(() => {
    const storedJson = localStorage.getItem("lastDiagnosisResult");
    const storedHex = localStorage.getItem("lastDiagnosisHex");

    let foundHex: string | null = null;
    if (storedJson) {
      try {
        const parsed = JSON.parse(storedJson);
        if (parsed.hex) foundHex = parsed.hex;
      } catch (e) {
        console.error("Failed to parse lastDiagnosisResult", e);
      }
    }
    if (!foundHex && storedHex) {
      foundHex = storedHex;
    }

    if (foundHex) {
      setMyHex(foundHex);
    }
    setLoading(false);
  }, []);

  // 3. Calculate Resonance (Derived)
  const resonance = useMemo(() => {
    if (myHex && targetHex) {
      return calculateResonance(myHex, targetHex);
    }
    return null;
  }, [myHex, targetHex]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white" />
    );
  }

  // Case 1: No Target provided
  if (!targetHex) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-2xl font-serif mb-4">No Target Color</h1>
        <p className="text-muted-foreground mb-8">
          Please access via a shared link.
        </p>
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  // Case 2: Target exists, but I am not diagnosed
  if (!myHex) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        <AmbientBackground hex={targetHex} />
        <div className="z-10 bg-background/30 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl max-w-md w-full">
          <div
            className="w-24 h-24 rounded-full mx-auto mb-6 shadow-lg border-2 border-white/20"
            style={{ backgroundColor: targetHex }}
          />
          <h1 className="text-xl font-serif mb-2">Compare with this color</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Discover your own color to see how it resonates with this one.
          </p>
          <Button asChild className="w-full btn-museum h-12" size="lg">
            <Link href="/">Start Diagnosis</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Case 3: Both exist -> Show Resonance
  const { groupName: myName } = getNearestPoeticName(myHex);
  const { groupName: targetName } = getNearestPoeticName(targetHex);

  const typeKey = resonance?.harmonyType || "neutral";
  const harmonyTitle = t(`harmonyTypes.${typeKey}`, {
    defaultMessage: typeKey.toUpperCase(),
  });
  const harmonyDesc = t(`harmonyDescriptions.${typeKey}`, {
    defaultMessage: "A unique relationship.",
  });

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative overflow-hidden text-foreground">
      <AmbientBackground hex={myHex} />

      <main className="z-10 w-full max-w-4xl px-4 py-12 md:py-24 flex flex-col items-center">
        <div className="mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
          <p className="text-xs font-mono tracking-[0.4em] opacity-60 uppercase mb-2">
            Color Resonance
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-thin">
            {resonance?.score ?? 0}%
          </h1>
        </div>

        <div className="relative w-full max-w-2xl aspect-square md:aspect-[2/1] flex items-center justify-center mb-12">
          <div className="relative z-10 flex flex-col items-center gap-4 transition-transform hover:scale-105 duration-500">
            <div
              className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-2xl border-4 border-background/50"
              style={{ backgroundColor: myHex }}
            />
            <p className="font-serif text-sm tracking-widest">{myName}</p>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>

          <div className="absolute z-20 bg-background/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-lg animate-in zoom-in duration-500 delay-300">
            <span className="font-mono text-xs md:text-sm tracking-widest uppercase">
              {harmonyTitle}
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-4 transition-transform hover:scale-105 duration-500">
            <div
              className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-2xl border-4 border-background/50"
              style={{ backgroundColor: targetHex }}
            />
            <p className="font-serif text-sm tracking-widest">{targetName}</p>
          </div>
        </div>

        <div className="max-w-lg text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <p className="text-lg font-serif italic text-muted-foreground leading-relaxed">
            {harmonyDesc}
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Button asChild variant="outline" className="w-full">
            <Link href={`/${myHex.replace("#", "")}`}>Back to My Color</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
