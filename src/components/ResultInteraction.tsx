"use client";

import { useState, useEffect, useRef } from "react";
import { saveFeedback } from "@/lib/feedback";
import { ShareCard } from "@/components/ShareCard";
import { ShareActions } from "@/components/ShareActions"; // Reuse existing
import { Button } from "@/components/ui/button";

import { Link } from "@/i18n/routing";
import { OklchColor } from "@/lib/oklch";
import { useTranslations } from "next-intl";

interface ResultInteractionProps {
  hex: string;
  resultColor: OklchColor | null;
  groupSlug: string;
  fromDiagnosis?: boolean;
}

export function ResultInteraction({
  hex,
  resultColor,
  groupSlug,
  fromDiagnosis = false,
}: ResultInteractionProps) {
  const t = useTranslations("Result");
  const [rating, setRating] = useState<number | null>(null);
  // If NOT from diagnosis, treat as already "submitted" (show share options), but don't show success msg
  const [submitted, setSubmitted] = useState(!fromDiagnosis);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const diagnosisIdRef = useRef<string | undefined>(undefined);

  // Load diagnosis ID
  useEffect(() => {
    const id = localStorage.getItem("lastDiagnosisId");
    if (id) diagnosisIdRef.current = id;
  }, []);

  const handleRatingSubmit = async () => {
    if (rating === null) return;

    await saveFeedback({
      diagnosis_id: diagnosisIdRef.current,
      hex: hex,
      hue: resultColor?.hue ?? 0,
      lightness: resultColor?.lightness ?? 0,
      chroma: resultColor?.chroma ?? 0,
      rating,
    });

    setSubmitted(true);
    setJustSubmitted(true);
  };

  const safeHex = hex.startsWith("#") ? hex : `#${hex}`;

  const ratingLabels = [
    { value: 1, emoji: "1", label: t("ratingLabels.r1") },
    { value: 2, emoji: "2", label: t("ratingLabels.r2") },
    { value: 3, emoji: "3", label: t("ratingLabels.r3") },
    { value: 4, emoji: "4", label: t("ratingLabels.r4") },
    { value: 5, emoji: "5", label: t("ratingLabels.r5") },
  ];

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      {/* 5-Star Rating Section */}
      {!submitted ? (
        <div className="mb-12 w-full bg-card/50 p-6 border border-border/50 animate-in fade-in slide-in-from-bottom-4">
          <p className="mb-4 text-center text-base text-muted-foreground font-serif">
            {t("feedbackQuestion")}
          </p>
          <div className="mb-6 flex justify-center gap-2">
            {ratingLabels.map(({ value, emoji }) => (
              <button
                key={value}
                onClick={() => setRating(value)}
                className={`flex h-10 w-10 items-center justify-center border text-base transition-all ${
                  rating === value
                    ? "border-foreground bg-foreground text-background"
                    : "border-muted-foreground bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
                style={{ fontFamily: '"SF Mono", monospace' }}
                aria-label={ratingLabels[value - 1].label}
              >
                {emoji}
              </button>
            ))}
          </div>
          {rating && (
            <div className="mb-4 text-center text-sm text-foreground font-serif">
              {ratingLabels[rating - 1].label}
            </div>
          )}
          <Button
            onClick={handleRatingSubmit}
            disabled={rating === null}
            className="w-full"
          >
            {t("btnSubmit")}
          </Button>
        </div>
      ) : (
        <div className="mb-8 w-full animate-in fade-in slide-in-from-bottom-2">
          {justSubmitted && (
            <div className="p-4 bg-primary/5 text-primary text-center mb-8 border border-primary/20">
              <p className="font-serif text-sm">{t("msgSubmitted")}</p>
            </div>
          )}

          {/* Share Actions - Unlocked after Rating */}
          <div className="flex flex-col gap-0 w-full">
            <ShareActions
              url={`https://24bitcolors.com/result/${groupSlug}?hex=${safeHex.replace(
                "#",
                ""
              )}`}
              onShare={() => setShowShareCard(true)}
            />

            <Button
              variant="outline"
              className="btn-museum h-12 w-full text-xs tracking-[0.2em] uppercase border-foreground/20 hover:bg-foreground hover:text-background transition-colors"
              asChild
            >
              <Link href={`/${safeHex.replace("#", "")}`}>
                {t("btnDetail")}
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Share Card Modal */}
      {showShareCard && resultColor && (
        <ShareCard
          color={resultColor}
          hex={safeHex}
          onClose={() => setShowShareCard(false)}
        />
      )}

      {/* Global Feedback Link (Always Visible at bottom) */}
      <div className="mt-12 pt-8 border-t border-border/40 w-full text-center">
        <p className="mb-2 text-xs text-muted-foreground font-serif whitespace-pre-line">
          {t("feedbackRequest")}
        </p>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="rounded-none border-foreground/20 text-xs text-muted-foreground hover:bg-foreground hover:text-background transition-colors uppercase tracking-widest"
        >
          <a
            href="https://google.com" // Placeholder, user mentioned existing link
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("linkFeedbackForm")}
          </a>
        </Button>
      </div>
    </div>
  );
}
