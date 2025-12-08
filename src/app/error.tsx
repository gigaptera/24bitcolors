"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-grow flex-col items-center justify-center p-6 text-center font-serif">
      <h1 className="mb-4 text-4xl font-medium tracking-wide text-gray-800">
        Something went wrong
      </h1>
      <p className="mb-10 text-gray-600 leading-relaxed">
        予期せぬエラーが発生しました。
        <br />
        時間をおいて再度お試しください。
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="rounded-full bg-black px-8 py-3 text-sm text-white transition-all hover:bg-gray-800"
        >
          再読み込み
        </button>
      </div>
    </div>
  );
}
