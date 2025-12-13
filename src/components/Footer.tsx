import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  const years = new Date().getFullYear();

  return (
    <footer className="w-full py-16 px-6 text-center">
      <div className="flex flex-col items-center gap-6">
        {/* Minimal Navigation */}
        <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-mono">
          <Link
            href="/about"
            className="hover:text-foreground transition-colors duration-300"
          >
            {t("about")}
          </Link>
          <Link
            href="/contact"
            className="hover:text-foreground transition-colors duration-300"
          >
            {t("contact")}
          </Link>
          <Link
            href="/terms"
            className="hover:text-foreground transition-colors duration-300"
          >
            {t("terms")}
          </Link>
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors duration-300"
          >
            {t("privacy")}
          </Link>
        </div>

        {/* Caption-style Copyright */}
        <p className="text-[10px] text-muted-foreground/40 font-serif tracking-wider">
          © {years} 24bitColors. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
