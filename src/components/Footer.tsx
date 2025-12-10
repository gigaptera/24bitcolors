import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full snap-end py-space-6 text-center text-[length:var(--text-micro)] text-[var(--muted-foreground)]">
      <div className="mb-space-4 flex justify-center gap-space-4">
        <Link
          href="/about"
          className="hover:text-[var(--foreground)] transition-colors"
        >
          ABOUT
        </Link>
        <Link
          href="/terms"
          className="hover:text-[var(--foreground)] transition-colors"
        >
          利用規約
        </Link>
        <Link
          href="/privacy"
          className="hover:text-[var(--foreground)] transition-colors"
        >
          プライバシーポリシー
        </Link>
        <Link
          href="/contact"
          className="hover:text-[var(--foreground)] transition-colors"
        >
          お問い合わせ
        </Link>
      </div>
      <p>&copy; 2025 24bitColors. All rights reserved.</p>
    </footer>
  );
}
