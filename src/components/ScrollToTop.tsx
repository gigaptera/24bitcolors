"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable browser default scroll restoration
    if (typeof window !== "undefined" && window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Force scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}
