"use client";

import { useState, useSyncExternalStore } from "react";
import { saveFeedback } from "@/lib/feedback";
import { ShareCard } from "@/components/ShareCard";
import { ShareActions } from "@/components/ShareActions";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { OklchColor } from "@/lib/oklch";
import { useTranslations } from "next-intl";
import { getNearestPoeticName } from "@/lib/colorNaming";

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
  // If NOT from diagnosis, treat as already "submitted" (show post-submit view), but allow re-rating or just sharing
  // Actually, we want to show Share ALWAYS.
  // The "submitted" state controls the Feedback form visibility.
  const [submitted, setSubmitted] = useState(!fromDiagnosis);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const [reasonTags, setReasonTags] = useState<string[]>([]);
  // Helper for localStorage subscription
  const subscribe = (callback: () => void) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
  };

  const diagnosisId = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem("lastDiagnosisId"),
    () => null
  );

  const myHex = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem("lastDiagnosisHex"),
    () => null
  );

  const handleRatingSubmit = async () => {
    if (rating === null) return;

    await saveFeedback({
      diagnosis_id: diagnosisId ?? undefined,
      hex: hex,
      hue: resultColor?.hue ?? 0,
      lightness: resultColor?.lightness ?? 0,
      chroma: resultColor?.chroma ?? 0,
      rating,
      reason_tags: reasonTags,
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

  const shareUrl = `https://24bitcolors.com/result/${groupSlug}?hex=${safeHex.replace(
    "#",
    ""
  )}`;
  const { groupName } = getNearestPoeticName(safeHex);
  const shareText = t("shareText", { name: groupName, hex: safeHex });

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      {/* Share Actions - ALWAYS VISIBLE & AT TOP */}
      <div className="w-full mb-8">
        <ShareActions
          url={shareUrl}
          text={shareText}
          onShareImage={() => setShowShareCard(true)}
        />
        <p className="text-center text-xs text-muted-foreground font-serif tracking-widest opacity-60 mt-2">
          SHARE YOUR COLOR
        </p>
      </div>

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

          {/* Reason Tags for Low Rating */}
          {rating && rating <= 3 && (
            <div className="mb-6 animate-in fade-in slide-in-from-top-2">
              <p className="mb-3 text-xs text-center text-muted-foreground">
                {t("feedbackRequest")}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["mismatch", "question", "ui", "performance", "other"].map(
                  (tagKey) => (
                    <button
                      key={tagKey}
                      onClick={() => {
                        setReasonTags((prev) =>
                          prev.includes(tagKey)
                            ? prev.filter((t) => t !== tagKey)
                            : [...prev, tagKey]
                        );
                      }}
                      className={`px-3 py-1.5 text-xs border transition-colors rounded-full ${
                        reasonTags.includes(tagKey)
                          ? "bg-foreground text-background border-foreground"
                          : "bg-transparent text-muted-foreground border-border hover:border-foreground/50"
                      }`}
                    >
                      {t(`reasonTags.${tagKey}`)}
                    </button>
                  )
                )}
              </div>
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
        </div>
      )}

      <div className="mb-8 w-full flex flex-col gap-4">
        {/* Compare Button - ONLY if diagnosis exists and not comparing self */}
        {diagnosisId &&
          myHex &&
          // Ideally we check if hex === myHex to hide "Compare with me" if it's me
          // But simple check: safeHex (current page) vs lastDiagnosisHex
          myHex.replace("#", "").toUpperCase() !==
            hex.replace("#", "").toUpperCase() && (
            <Button
              variant="default"
              className="w-full h-12 text-xs tracking-[0.2em] uppercase bg-foreground text-background hover:bg-foreground/90 transition-all font-serif"
              asChild
            >
              <Link href={`/compare?target=${hex.replace("#", "")}`}>
                Compare with My Color (Beta)
              </Link>
            </Button>
          )}

        <Button
          variant="outline"
          className="btn-museum h-12 w-full text-xs tracking-[0.2em] uppercase border-foreground/20 hover:bg-foreground hover:text-background transition-colors"
          asChild
        >
          <Link href={`/${safeHex.replace("#", "")}`}>{t("btnDetail")}</Link>
        </Button>
      </div>

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
            href="https://docs.google.com/forms/d/e/1FAIpQLSfxxxxxx/viewform" // Using a dummy link pattern, but preserving the placeholder intent
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
