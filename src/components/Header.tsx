import Link from "next/link";

export function Header() {
  return (
    <header className="w-full px-6 py-6 flex justify-between items-center">
      <Link href="/" className="group">
        <h1
          className="text-2xl font-normal tracking-wide text-black transition-opacity group-hover:opacity-70"
          style={{ fontFamily: '"Times New Roman", serif' }}
        >
          24bitColors
        </h1>
      </Link>

      {/* 診断開始ボタンなどは必要に応じて追加。現在はシンプルにホームへ戻る機能を提供 */}
      <nav>
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-black transition-colors font-serif"
        >
          Top
        </Link>
      </nav>
    </header>
  );
}
