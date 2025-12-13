"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { CheckCircle, WarningCircle, ArrowRight } from "@phosphor-icons/react";
import { saveFeedback } from "@/lib/feedback";

// Type for the stored result
interface StoredResult {
  hex: string;
  color: {
    hue: number;
    lightness: number;
    chroma: number;
  };
}

function DiagnosisResultSection({ result }: { result: StoredResult | null }) {
  const t = useTranslations("LogicFeedback");
  if (!result) {
    return (
      <div className="rounded-none border border-dashed border-red-500/50 bg-red-500/5 p-8 text-center space-y-4">
        <div className="flex justify-center text-red-500 mb-2">
          <WarningCircle weight="light" className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-lg tracking-wide">
          {t("resultNotFoundTitle")}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t("resultNotFoundDesc")}
        </p>
        <div className="pt-4">
          <Button asChild variant="default">
            <Link href="/diagnosis">
              {t("startDiagnosis")} <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="rounded-none">
      <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
        <div
          className="w-64 h-64 md:w-80 md:h-80 rounded-full shadow-2xl border-4 border-background transition-transform duration-700 hover:scale-105 dark:shadow-[var(--shadow-glow)]"
          style={{ backgroundColor: result.hex }}
        />
        <div className="text-center md:text-left space-y-2">
          <div className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
            {t("targetDiagnosis")}
          </div>
          <div className="font-serif text-2xl tracking-wider">
            {result.hex.toUpperCase()}
          </div>
          <p className="text-xs text-muted-foreground">
            {t("lastDiagnosisDesc")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function FeedbackClient() {
  const t = useTranslations("LogicFeedback");
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<StoredResult | null>(null);
  const [diagnosisId, setDiagnosisId] = useState<string | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  // Form States
  const [agreementScore, setAgreementScore] = useState(50);
  const [expectedColor, setExpectedColor] = useState("");
  const [actualImpression, setActualImpression] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Avoid synchronous state update warning
    const timer = setTimeout(() => {
      // Try reading new JSON format first
      const storedJson = localStorage.getItem("lastDiagnosisResult");
      if (storedJson) {
        try {
          const parsed = JSON.parse(storedJson);
          setResult(parsed);
        } catch (e) {
          console.error("Failed to parse diagnosis result", e);
        }
      } else {
        // Fallback for older hex-only storage (backward compatibility)
        const storedHex = localStorage.getItem("lastDiagnosisHex");
        if (storedHex) {
          setResult({
            hex: storedHex,
            color: { hue: 0, lightness: 0, chroma: 0 }, // Dummy values
          });
        }
      }

      // Load Diagnosis ID
      const id = localStorage.getItem("lastDiagnosisId");
      if (id) setDiagnosisId(id);

      setLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result) return;

    setIsSubmitting(true);

    await saveFeedback({
      diagnosis_id: diagnosisId,
      hex: result.hex,
      hue: result.color.hue,
      lightness: result.color.lightness,
      chroma: result.color.chroma,
      agreement_score: agreementScore,
      expected_color: expectedColor,
      actual_impression: actualImpression,
      comment: comment,
    });

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background py-20 px-6 animate-in fade-in duration-700">
        <div className="text-center space-y-6 max-w-lg">
          <div className="flex justify-center mb-6">
            <CheckCircle
              weight="light"
              className="mx-auto mb-4 h-12 w-12 text-primary"
            />
          </div>
          <h1 className="font-serif text-3xl tracking-widest text-foreground">
            {t("successTitle")}
          </h1>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {t("successDesc")}
          </p>
          <div className="pt-8">
            <Button
              variant="outline"
              asChild
              className="font-serif tracking-widest"
            >
              <Link href="/diagnosis/logic">{t("backToLogic")}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!loaded) return null;

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background py-20 px-6">
      <div className="w-full max-w-2xl animate-in fade-in duration-700 space-y-16">
        {/* Navigation */}
        <div className="flex justify-start">
          <Button
            variant="link"
            asChild
            className="pl-0 text-muted-foreground font-serif tracking-widest hover:text-foreground hover:no-underline"
          >
            <Link href="/diagnosis/logic">{t("back")}</Link>
          </Button>
        </div>

        {/* Header */}
        <header className="space-y-6 text-center">
          <p className="font-mono text-xs text-muted-foreground tracking-[0.3em] uppercase">
            {t("heading")}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl tracking-widest text-foreground">
            {t("subHeading")}
          </h1>
          <p className="font-sans text-muted-foreground leading-loose pt-4 whitespace-pre-wrap">
            {t("intro")}
          </p>
        </header>

        <DiagnosisResultSection result={result} />

        {result && (
          <form onSubmit={handleSubmit} className="space-y-16">
            {/* Section 1: Accuracy Rating */}
            <section className="space-y-6">
              <h2 className="font-serif text-xl tracking-wide border-b border-border/40 pb-4">
                {t("q1Title")}
              </h2>
              <div className="space-y-8 pt-4">
                <p className="text-sm text-muted-foreground">{t("q1Desc")}</p>
                <div className="px-2">
                  <Slider
                    min={0}
                    max={100}
                    value={agreementScore}
                    onChange={(e) => setAgreementScore(Number(e.target.value))}
                  />
                </div>
                <div className="flex justify-between text-xs font-mono text-muted-foreground">
                  <span>{t("labelTotallyDifferent")}</span>
                  <span>{t("labelPerfect")}</span>
                </div>
                <div className="text-center font-mono text-lg font-bold">
                  {agreementScore}
                </div>
              </div>
            </section>

            {/* Section 2: Expected vs Actual */}
            <section className="space-y-6">
              <h2 className="font-serif text-xl tracking-wide border-b border-border/40 pb-4">
                {t("q2Title")}
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium opacity-80 font-serif">
                    {t("labelExpectedColor")}
                  </label>
                  <Select
                    value={expectedColor}
                    onValueChange={setExpectedColor}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("placeholderSelect")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="red">
                        {t("optionsExpected.red")}
                      </SelectItem>
                      <SelectItem value="blue">
                        {t("optionsExpected.blue")}
                      </SelectItem>
                      <SelectItem value="green">
                        {t("optionsExpected.green")}
                      </SelectItem>
                      <SelectItem value="yellow">
                        {t("optionsExpected.yellow")}
                      </SelectItem>
                      <SelectItem value="purple">
                        {t("optionsExpected.purple")}
                      </SelectItem>
                      <SelectItem value="mono">
                        {t("optionsExpected.mono")}
                      </SelectItem>
                      <SelectItem value="neutral">
                        {t("optionsExpected.neutral")}
                      </SelectItem>
                      <SelectItem value="other">
                        {t("optionsExpected.other")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium opacity-80 font-serif">
                    {t("labelActualImpression")}
                  </label>
                  <Select
                    value={actualImpression}
                    onValueChange={setActualImpression}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("placeholderSelect")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perfect">
                        {t("optionsActual.perfect")}
                      </SelectItem>
                      <SelectItem value="close">
                        {t("optionsActual.close")}
                      </SelectItem>
                      <SelectItem value="surprising">
                        {t("optionsActual.surprising")}
                      </SelectItem>
                      <SelectItem value="far">
                        {t("optionsActual.far")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* Section 3: Detailed Feedback */}
            <section className="space-y-6">
              <h2 className="font-serif text-xl tracking-wide border-b border-border/40 pb-4">
                {t("q3Title")}
              </h2>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{t("q3Desc")}</p>
                <Textarea
                  className="resize-none h-40 font-mono text-xs leading-relaxed"
                  placeholder={t("placeholderComment")}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </section>

            {/* Submit */}
            <div className="pt-8 flex justify-center">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full md:w-auto min-w-[200px] font-serif tracking-widest h-14 text-lg rounded-none"
              >
                {isSubmitting ? t("sending") : t("submit")}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
