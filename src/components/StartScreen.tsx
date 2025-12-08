"use client";

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 text-6xl">🎨</div>
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        24bitColors
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        20の質問であなたの好きな色を特定します
      </p>
      <div className="mb-8 max-w-xs text-sm text-gray-500 dark:text-gray-500">
        bit診断方式で1677万色の中から
        <br />
        あなたの真の好みを見つけ出します
      </div>
      <button
        onClick={onStart}
        className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      >
        診断を開始する
      </button>
    </div>
  );
}
