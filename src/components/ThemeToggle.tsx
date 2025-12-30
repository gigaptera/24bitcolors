"use client";

import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

/**
 * Theme Toggle with Phosphor Icons
 */
import { useTranslations } from "next-intl";

/**
 * Theme Toggle with Phosphor Icons
 */
export function ThemeToggle() {
  const t = useTranslations("Common");
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-6 w-6" />;
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      type="button"
      title={isDark ? t("toggleThemeLight") : t("toggleThemeDark")}
      aria-label={t("toggleThemeLabel")}
    >
      {isDark ? (
        <Moon
          weight="light"
          className="h-5 w-5 animate-in zoom-in spin-in-90 duration-300"
        />
      ) : (
        <Sun
          weight="light"
          className="h-5 w-5 animate-in zoom-in spin-in-90 duration-300"
        />
      )}
    </Button>
  );
}
