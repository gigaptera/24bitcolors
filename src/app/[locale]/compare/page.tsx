"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, useSyncExternalStore } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { calculateResonance } from "@/lib/color-resonance";
import { getNearestPoeticName } from "@/lib/colorNaming";
import { AmbientBackground } from "@/components/AmbientBackground";
import { useTranslations } from "next-intl";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const t = useTranslations("Compare");

  // Helper for localStorage subscription
  const subscribe = (callback: () => void) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
  };

  // 1. Get Target from URL
  const targetParam = searchParams.get("target");
  const targetHex = useMemo(() => {
    return targetParam
      ? targetParam.startsWith("#")
        ? targetParam
        : `#${targetParam}`
      : null;
  }, [targetParam]);

  // 2. Get My Color from LocalStorage using useSyncExternalStore
  const getMyHex = () => {
    if (typeof window === "undefined") return null;
    const storedJson = localStorage.getItem("lastDiagnosisResult");
    const storedHex = localStorage.getItem("lastDiagnosisHex");

    if (storedJson) {
      try {
        const parsed = JSON.parse(storedJson);
        if (parsed.hex) return parsed.hex;
      } catch (e) {
        console.error("Failed to parse lastDiagnosisResult", e);
      }
    }
    return storedHex || null;
  };

  const myHex = useSyncExternalStore(subscribe, getMyHex, () => null);

  // 3. Calculate Resonance (Derived) - MUST be called before any return
  const resonance = useMemo(() => {
    if (myHex && targetHex) {
      return calculateResonance(myHex, targetHex);
    }
    return null;
  }, [myHex, targetHex]);

  // Loading state handling (Mounted check)
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // delay slightly to avoid synchronous setState warning and ensure hydration match
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden pt-16 md:pt-0">
      <AmbientBackground hex={myHex} />

      <main className="z-10 w-full max-w-4xl px-6 py-12 flex flex-col items-center text-center space-y-16">
        {/* Header Section */}
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-1000">
          <p className="text-xs font-mono tracking-[0.4em] uppercase text-muted-foreground/60">
            Color Resonance
          </p>
          <h1 className="text-6xl md:text-8xl font-serif tracking-wide font-light">
            {resonance?.score ?? 0}%
          </h1>
        </div>

        {/* Color Comparison Visualization */}
        <div className="relative w-full max-w-3xl flex items-center justify-center min-h-[400px] md:min-h-[300px] animate-in fade-in zoom-in duration-1000 delay-200">
          {/* My Color (Left) */}
          <div className="relative group flex flex-col items-center gap-6 transition-transform hover:scale-105 duration-700">
            <div className="relative">
              <div
                className="w-40 h-40 md:w-56 md:h-56 rounded-full shadow-2xl border-4 border-background/50 transition-all duration-700"
                style={{ backgroundColor: myHex }}
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
            </div>
            <p className="font-serif text-base md:text-lg tracking-wide text-foreground">
              {myName}
            </p>
          </div>

          {/* Connection Line */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
          </div>

          {/* Harmony Badge */}
          <div className="absolute z-30 bg-background/90 backdrop-blur-md px-8 py-3 rounded-full border border-white/20 shadow-2xl animate-in zoom-in duration-700 delay-500">
            <span className="font-mono text-sm md:text-base tracking-[0.3em] uppercase font-light">
              {harmonyTitle}
            </span>
          </div>

          {/* Target Color (Right) */}
          <div className="relative group flex flex-col items-center gap-6 transition-transform hover:scale-105 duration-700">
            <div className="relative">
              <div
                className="w-40 h-40 md:w-56 md:h-56 rounded-full shadow-2xl border-4 border-background/50 transition-all duration-700"
                style={{ backgroundColor: targetHex }}
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
            </div>
            <p className="font-serif text-base md:text-lg tracking-wide text-foreground">
              {targetName}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent mx-auto" />
          <p className="text-lg font-serif italic text-muted-foreground leading-relaxed tracking-wide">
            {harmonyDesc}
          </p>
        </div>

        {/* Action Button */}
        <div className="w-full max-w-xs pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000">
          <Button
            asChild
            variant="outline"
            className="w-full h-12 text-xs tracking-[0.2em] uppercase border-foreground/20 hover:bg-foreground hover:text-background transition-colors"
          >
            <Link href={`/${myHex.replace("#", "")}`}>Back to My Color</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
