"use client";

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* タイトル */}
      <h1
        className="mb-3 text-4xl font-normal tracking-wide"
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        24bitColors
      </h1>

      {/* サブタイトル */}
      <p
        className="mb-8 text-lg text-gray-600"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Discover Your Favorite Color
      </p>

      {/* 説明文 */}
      <div
        className="mb-10 max-w-sm text-sm leading-relaxed text-gray-500"
        style={{ fontFamily: "Georgia, serif" }}
      >
        20の質問への回答から、1677万色の中であなたが最も好む色を統計的に特定します。
      </div>

      {/* 開始ボタン */}
      <button onClick={onStart} className="btn-museum">
        診断を開始する
      </button>
    </div>
  );
}
