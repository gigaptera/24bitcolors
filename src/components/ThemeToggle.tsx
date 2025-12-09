"use client";

import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";

/**
 * Dark Side Theme Toggle
 * - "Half Moon" style icon that rotates 180° on toggle
 * - Inspired by Theme Toggles (https://toggles.dev/dark-side)
 */
export function ThemeToggle() {
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
    <button
      onClick={toggleTheme}
      type="button"
      title="テーマを切り替える"
      aria-label="テーマを切り替える"
      className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 hover:bg-black/10 dark:hover:bg-white/10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 32 32"
        className="text-foreground transition-transform duration-500 ease-in-out"
        style={{
          transform: isDark ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        {/* Dark Side: Half-filled circle path */}
        <path d="M16 .5C7.4.5.5 7.4.5 16S7.4 31.5 16 31.5 31.5 24.6 31.5 16 24.6.5 16 .5zm0 28.1V3.4C23 3.4 28.6 9 28.6 16S23 28.6 16 28.6z" />
      </svg>
    </button>
  );
}
