import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-8 text-center text-xs text-gray-500">
      <div className="flex justify-center gap-6 mb-4">
        <Link href="/terms" className="hover:text-gray-800 transition-colors">
          利用規約
        </Link>
        <Link href="/privacy" className="hover:text-gray-800 transition-colors">
          プライバシーポリシー
        </Link>
        <Link href="/contact" className="hover:text-gray-800 transition-colors">
          お問い合わせ
        </Link>
      </div>
      <p>&copy; 2025 24bitColors. All rights reserved.</p>
    </footer>
  );
}
