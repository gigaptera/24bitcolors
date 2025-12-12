"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function StickyCTA() {
  const t = useTranslations("Common");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down a bit (e.g., 100px)
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-4 z-40 transition-all duration-300 md:hidden",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-10 opacity-0"
      )}
    >
      <Button
        asChild
        size="lg"
        className="shadow-2xl shadow-primary/40 backdrop-blur-md px-10 h-14 text-lg"
      >
        <Link
          href="/diagnosis"
          className="flex items-center font-serif tracking-widest"
        >
          {t("startDiagnosis")}
        </Link>
      </Button>
    </div>
  );
}
