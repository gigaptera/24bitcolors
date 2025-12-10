"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { QuestionScreen } from "@/components/QuestionScreen";
import {
  DiagnosisState,
  ColorPair,
  createDiagnosisState,
  selectOptimalColorPair,
  processChoice,
  getFinalResult,
  isDiagnosisComplete,
} from "@/lib/color-diagnosis";
import { saveDiagnosisAction } from "@/app/actions/saveDiagnosis";
import { useTheme } from "./ThemeProvider";

interface HistoryEntry {
  state: DiagnosisState;
  pair: ColorPair;
}

import { useRouter } from "next/navigation";
import { getNearestPoeticName } from "@/lib/colorNaming";

export function DiagnosisApp() {
  const router = useRouter();
  const { theme } = useTheme();

  // Analytics State
  const startTimeRef = useRef<number>(0);
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);
  const [anonymousId, setAnonymousId] = useState<string>("");

  // 初期化: ページロード時に同期的に診断を開始（Lazy initialization）
  const [initialData] = useState(() => {
    const state = createDiagnosisState();
    // 初期は履歴なし
    const pair = selectOptimalColorPair(state, []);
    return { state, pair };
  });

  const [diagnosisState, setDiagnosisState] = useState<DiagnosisState>(
    initialData.state
  );
  const [colorPair, setColorPair] = useState<ColorPair>(initialData.pair);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Initialize Anonymous ID
  useEffect(() => {
    const timer = setTimeout(() => {
      let id = localStorage.getItem("anonymous_id");
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("anonymous_id", id);
      }
      setAnonymousId(id);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = useCallback(
    async (choice: "A" | "B") => {
      if (!diagnosisState || !colorPair) return;

      // 現在の状態を履歴に追加
      setHistory((prev) => [
        ...prev,
        { state: diagnosisState, pair: colorPair },
      ]);

      const newState = processChoice(diagnosisState, choice, colorPair);
      setDiagnosisState(newState);

      if (isDiagnosisComplete(newState)) {
        const finalResult = getFinalResult(newState);

        // --- Data Collection v2 Start ---
        const endTime = Date.now();
        const durationSeconds = Math.round(
          (endTime - startTimeRef.current) / 1000
        );

        // Client-side save for feedback form UI
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "lastDiagnosisResult",
            JSON.stringify(finalResult)
          );
        }

        // setScreen("result"); // Old: Show local result
        // New: Redirect to Sharable Result Page
        // Calculate slug for SEO-friendly URL
        const safeHex = finalResult.hex.replace("#", "");
        const { groupSlug } = getNearestPoeticName(`#${safeHex}`);

        // Redirect to /result/[group]?hex=[hex]
        router.push(`/result/${groupSlug}?hex=${safeHex}`);

        // Server Action Call (Background)
        try {
          const response = await saveDiagnosisAction({
            hex: finalResult.hex,
            hue: finalResult.color.hue,
            lightness: finalResult.color.lightness,
            chroma: finalResult.color.chroma,
            theme: theme, // from useTheme
            duration_seconds: durationSeconds,
            algorithm_version: "v1.0.0",
            locale: navigator.language,
            anonymous_id: anonymousId || "unknown", // Fallback if state not yet set (unlikely)
          });

          if (response.success && response.id) {
            // Save Diagnosis ID for Feedback
            localStorage.setItem("lastDiagnosisId", response.id);
          }
        } catch (e) {
          console.error("Auto-save failed", e);
        }
        // --- Data Collection v2 End ---
      } else {
        // 現在までの履歴ペア（今回答えたものも含む）を作成して渡す
        const pastPairs = history.map((h) => h.pair);
        const currentHistory = [...pastPairs, colorPair];

        const newPair = selectOptimalColorPair(newState, currentHistory);
        setColorPair(newPair);
      }
    },
    [diagnosisState, colorPair, history, theme, anonymousId, router]
  );

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;

    const lastEntry = history[history.length - 1];
    setDiagnosisState(lastEntry.state);
    setColorPair(lastEntry.pair);
    setHistory((prev) => prev.slice(0, -1));
  }, [history]);

  // まだロード中（useEffect前）の場合は何も表示しないか、ローディング出す
  if (!diagnosisState || !colorPair) {
    return null; // または <Loading />
  }

  return (
    <div className="flex w-full flex-grow items-center justify-center p-space-2">
      <main className="w-full max-w-md p-space-4">
        <QuestionScreen
          questionNumber={diagnosisState.currentQuestion}
          totalQuestions={diagnosisState.totalQuestions}
          colorA={colorPair.colorA}
          colorB={colorPair.colorB}
          prediction={diagnosisState.currentPrediction}
          confidence={diagnosisState.confidence}
          onSelectA={() => handleSelect("A")}
          onSelectB={() => handleSelect("B")}
          onUndo={history.length > 0 ? handleUndo : undefined}
        />
      </main>
    </div>
  );
}
