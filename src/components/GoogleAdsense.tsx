"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type GoogleAdsenseProps = {
  pId: string;
};

export const GoogleAdsense = ({ pId }: GoogleAdsenseProps) => {
  const [loadAd, setLoadAd] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setLoadAd(true);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("mousemove", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  if (!loadAd) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};
