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

export default function Home() {
  const [screen, setScreen] = useState<Screen>("start");
  const [diagnosisState, setDiagnosisState] = useState<DiagnosisState | null>(
    null
  );
  const [colorPair, setColorPair] = useState<ColorPair | null>(null);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const handleStart = useCallback(() => {
    const state = createDiagnosisState();
    const pair = selectOptimalColorPair(state);
    setDiagnosisState(state);
    setColorPair(pair);
    setScreen("question");
  }, []);

  const handleSelect = useCallback(
    (choice: "A" | "B") => {
      if (!diagnosisState || !colorPair) return;

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

  const handleRestart = useCallback(() => {
    setDiagnosisState(null);
    setColorPair(null);
    setResult(null);
    setScreen("start");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <main className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl dark:bg-gray-900">
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
          />
        )}

        {screen === "result" && result && (
          <ResultScreen result={result} onRestart={handleRestart} />
        )}
      </main>
    </div>
  );
}
