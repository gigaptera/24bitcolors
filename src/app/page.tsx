import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "24bitColors - あなたの好きな色を見つけよう",
  description:
    "20の質問で、1677万色の中からあなたの「運命の色」を統計的に特定します。登録不要、無料で今すぐ診断。",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="flex w-full flex-grow items-center justify-center p-space-2">
      <main className="flex w-full max-w-lg flex-col items-center text-center p-space-4">
        {/* タイトル */}
        <h1
          className="mb-3 text-4xl font-normal tracking-wide animate-fade-in"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          24bitColors
        </h1>

        {/* サブタイトル */}
        <p
          className="mb-space-5 text-[length:var(--text-medium)] text-[var(--muted-foreground)] animate-fade-in delay-100"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Discover Your Favorite Color
        </p>

        {/* 説明文 */}
        <div
          className="mb-space-6 max-w-md text-[length:var(--text-base)] leading-relaxed text-[var(--muted-foreground)] animate-fade-in delay-200"
          style={{ fontFamily: "Georgia, serif" }}
        >
          20の質問への回答から、1677万色の中であなたが最も好む色を統計的に特定します。
        </div>

        {/* 開始ボタン (LP -> Diagnosis) */}
        <div className="animate-fade-in delay-300">
          <Button asChild className="btn-museum">
            <Link href="/diagnosis">診断を開始する</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
