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
    <div className="flex flex-grow flex-col items-center justify-center p-space-5 text-center font-serif">
      <h1 className="mb-space-4 text-[length:var(--text-large)] font-medium tracking-wide text-foreground">
        Something went wrong
      </h1>
      <p className="mb-space-6 leading-relaxed text-muted-foreground">
        予期せぬエラーが発生しました。
        <br />
        時間をおいて再度お試しください。
      </p>
      <div className="flex gap-space-4">
        <button
          onClick={reset}
          className="rounded-full bg-foreground px-8 py-3 text-[length:var(--text-base)] text-background transition-all hover:opacity-80"
        >
          再読み込み
        </button>
      </div>
    </div>
  );
}
