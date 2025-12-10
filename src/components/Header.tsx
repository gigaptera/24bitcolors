import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { LastDiagnosisLink } from "./LastDiagnosisLink";

export function Header() {
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-transparent px-space-5 py-space-3 transition-all">
      <Link href="/" className="group">
        <h1
          className="text-[length:var(--text-medium)] font-normal tracking-wide text-foreground transition-opacity group-hover:opacity-70"
          style={{ fontFamily: '"Times New Roman", serif' }}
        >
          24bitColors
        </h1>
      </Link>

      {/* 診断開始ボタンなどは必要に応じて追加。現在はシンプルにホームへ戻る機能を提供 */}
      <div className="flex items-center gap-space-4">
        <LastDiagnosisLink />
        <ThemeToggle />
      </div>
    </header>
  );
}
