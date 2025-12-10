"use client";

import { useEffect } from "react";

export function HomeScrollManager() {
  useEffect(() => {
    // Enable global scroll snap ONLY for this page
    const html = document.documentElement;
    const originalScrollSnapType = html.style.scrollSnapType;
    const originalScrollPaddingTop = html.style.scrollPaddingTop;
    const originalScrollBehavior = html.style.scrollBehavior;

    // Force mandatory snap on the window
    html.style.scrollSnapType = "y mandatory";
    html.style.scrollPaddingTop = "0px"; // Allow content to go behind transparent header
    html.style.scrollBehavior = "smooth";

    return () => {
      // Cleanup
      html.style.scrollSnapType = originalScrollSnapType;
      html.style.scrollPaddingTop = originalScrollPaddingTop;
      html.style.scrollBehavior = originalScrollBehavior;
    };
  }, []);

  return null;
}
