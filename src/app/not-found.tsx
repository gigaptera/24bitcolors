import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center p-space-5 text-center font-serif">
      <h1 className="mb-space-4 text-[length:var(--text-display)] font-thin text-[var(--muted-foreground)] opacity-50">
        404
      </h1>
      <h2 className="mb-space-5 text-[length:var(--text-medium)] font-medium tracking-wide text-[var(--foreground)]">
        Page Not Found
      </h2>
      <p className="mb-space-6 leading-relaxed text-[var(--muted-foreground)]">
        お探しのページは見つかりませんでした。
        <br />
        URLが間違っているか、ページが移動・削除された可能性があります。
      </p>
      <Link
        href="/"
        className="rounded-full border border-[var(--muted-foreground)] px-8 py-3 text-[length:var(--text-base)] transition-all hover:border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
      >
        トップページへ戻る
      </Link>
    </div>
  );
}
