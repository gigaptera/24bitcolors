"use client";

import { useState, useCallback } from "react";
import { StartScreen } from "@/components/StartScreen";
import { QuestionScreen } from "@/components/QuestionScreen";
import { ResultScreen } from "@/components/ResultScreen";
import {
  DiagnosisState,
  DiagnosisResult,
  ColorPair,
  createDiagnosisState,
  selectOptimalColorPair,
  processChoice,
  getFinalResult,
  isDiagnosisComplete,
} from "@/lib/color-diagnosis";

type Screen = "start" | "question" | "result";

interface HistoryEntry {
  state: DiagnosisState;
  pair: ColorPair;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("start");
  const [diagnosisState, setDiagnosisState] = useState<DiagnosisState | null>(
    null
  );
  const [colorPair, setColorPair] = useState<ColorPair | null>(null);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const handleStart = useCallback(() => {
    const state = createDiagnosisState();
    const pair = selectOptimalColorPair(state);
    setDiagnosisState(state);
    setColorPair(pair);
    setHistory([]);
    setScreen("question");
  }, []);

  const handleSelect = useCallback(
    (choice: "A" | "B") => {
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
        setResult(finalResult);
        setScreen("result");
      } else {
        const newPair = selectOptimalColorPair(newState);
        setColorPair(newPair);
      }
    },
    [diagnosisState, colorPair]
  );

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;

    const lastEntry = history[history.length - 1];
    setDiagnosisState(lastEntry.state);
    setColorPair(lastEntry.pair);
    setHistory((prev) => prev.slice(0, -1));
  }, [history]);

  const handleRestart = useCallback(() => {
    setDiagnosisState(null);
    setColorPair(null);
    setResult(null);
    setHistory([]);
    setScreen("start");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <main className="w-full max-w-md p-8">
        {screen === "start" && <StartScreen onStart={handleStart} />}

        {screen === "question" && diagnosisState && colorPair && (
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
        )}

        {screen === "result" && result && (
          <ResultScreen result={result} onRestart={handleRestart} />
        )}
      </main>
    </div>
  );
}
