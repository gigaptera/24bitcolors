import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="flex w-full items-center justify-between px-space-5 py-space-5">
      <Link href="/" className="group">
        <h1
          className="text-[length:var(--text-medium)] font-normal tracking-wide text-[var(--accent)] transition-opacity group-hover:opacity-70"
          style={{ fontFamily: '"Times New Roman", serif' }}
        >
          24bitColors
        </h1>
      </Link>

      {/* 診断開始ボタンなどは必要に応じて追加。現在はシンプルにホームへ戻る機能を提供 */}
      <div className="flex items-center gap-space-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
