"use client";

import Link from "next/link";
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
  if (!result) {
    return (
      <div className="rounded-none border border-dashed border-red-500/50 bg-red-500/5 p-8 text-center space-y-4">
        <div className="flex justify-center text-red-500 mb-2">
          <WarningCircle weight="light" className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-lg tracking-wide">
          診断履歴が見つかりません
        </h3>
        <p className="text-sm text-muted-foreground">
          フィードバックを送信するには、まずカラー診断を行ってください。
        </p>
        <div className="pt-4">
          <Button asChild variant="default">
            <Link href="/diagnosis">
              診断を開始する <ArrowRight className="ml-2 w-4 h-4" />
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
          className="w-24 h-24 rounded-full shadow-lg border-4 border-background shrink-0"
          style={{ backgroundColor: result.hex }}
        />
        <div className="text-center md:text-left space-y-2">
          <div className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
            Target Diagnosis
          </div>
          <div className="font-serif text-2xl tracking-wider">
            {result.hex.toUpperCase()}
          </div>
          <p className="text-xs text-muted-foreground">
            あなたが最後に診断されたこの色についてのフィードバックを送信します。
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LogicFeedbackPage() {
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
            THANK YOU
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            貴重なフィードバックをありがとうございます。
            <br />
            あなたのデータはアルゴリズムの精度向上に役立てられます。
          </p>
          <div className="pt-8">
            <Button
              variant="outline"
              asChild
              className="font-serif tracking-widest"
            >
              <Link href="/diagnosis/logic">BACK TO LOGIC</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!loaded) return null;

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background py-20 px-6">
      <div className="w-full max-w-2xl animate-in fade-in duration-700 space-y-24">
        {/* Navigation */}
        <div className="flex justify-start">
          <Button
            variant="link"
            asChild
            className="pl-0 text-muted-foreground font-serif tracking-widest hover:text-foreground hover:no-underline"
          >
            <Link href="/diagnosis/logic">← BACK TO OVERVIEW</Link>
          </Button>
        </div>

        {/* Header */}
        <header className="space-y-6">
          <h1 className="font-serif text-4xl md:text-5xl tracking-widest text-foreground">
            ALGORITHM <br /> FEEDBACK
          </h1>
          <p className="font-sans text-base text-muted-foreground tracking-wide leading-relaxed max-w-xl">
            精度向上のための詳細レポート。
            エラーが発生しました。もう一度お試しください。
          </p>
        </header>

        <DiagnosisResultSection result={result} />

        {result && (
          <form onSubmit={handleSubmit} className="space-y-16">
            {/* Section 1: Accuracy Rating */}
            <section className="space-y-6">
              <h2 className="font-serif text-xl tracking-wide border-b border-border/40 pb-4">
                1. 診断結果の納得度
              </h2>
              <div className="space-y-8 pt-4">
                <p className="text-sm text-muted-foreground">
                  提示された色は、あなたの感覚にフィットしましたか？
                </p>
                <div className="px-2">
                  <Slider
                    min={0}
                    max={100}
                    value={agreementScore}
                    onChange={(e) => setAgreementScore(Number(e.target.value))}
                  />
                </div>
                <div className="flex justify-between text-xs font-mono text-muted-foreground">
                  <span>全く納得できない (0)</span>
                  <span>完全に納得 (100)</span>
                </div>
                <div className="text-center font-mono text-lg font-bold">
                  {agreementScore}
                </div>
              </div>
            </section>

            {/* Section 2: Expected vs Actual */}
            <section className="space-y-6">
              <h2 className="font-serif text-xl tracking-wide border-b border-border/40 pb-4">
                2. 期待とのギャップ
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium opacity-80 font-serif">
                    診断前に期待していた色系統
                  </label>
                  <Select
                    value={expectedColor}
                    onValueChange={setExpectedColor}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="red">赤・ピンク系</SelectItem>
                      <SelectItem value="blue">青・水色系</SelectItem>
                      <SelectItem value="green">緑・ライム系</SelectItem>
                      <SelectItem value="yellow">黄・オレンジ系</SelectItem>
                      <SelectItem value="purple">紫・ラベンダー系</SelectItem>
                      <SelectItem value="mono">白・黒・グレー系</SelectItem>
                      <SelectItem value="neutral">
                        ベージュ・ブラウン系
                      </SelectItem>
                      <SelectItem value="other">
                        特になし／わからない
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium opacity-80 font-serif">
                    実際に出た結果の印象
                  </label>
                  <Select
                    value={actualImpression}
                    onValueChange={setActualImpression}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perfect">ドンピシャだった</SelectItem>
                      <SelectItem value="close">近いが少し違う</SelectItem>
                      <SelectItem value="surprising">
                        意外だが気に入った
                      </SelectItem>
                      <SelectItem value="far">全く好まない色だった</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* Section 3: Detailed Feedback */}
            <section className="space-y-6">
              <h2 className="font-serif text-xl tracking-wide border-b border-border/40 pb-4">
                3. ロジックへの具体的指摘
              </h2>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  「質問が抽象的すぎた」「選択肢に欲しい色がなかった」など、アルゴリズムの挙動に関する感想を自由にお書きください。
                </p>
                <Textarea
                  className="resize-none h-40 font-mono text-xs leading-relaxed"
                  placeholder="例：無彩色の質問がもっと欲しかった。後半の2択がどちらも選びにくかった..."
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
                {isSubmitting ? "SENDING..." : "SEND FEEDBACK"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
