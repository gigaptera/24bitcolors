"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface HistoryItem {
  id: string;
  hex: string;
  created_at: string;
}

interface SeasonalTimelineProps {
  history: HistoryItem[];
}

export function SeasonalTimeline({ history }: SeasonalTimelineProps) {
  const t = useTranslations("CollectionPage");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.length < 2) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to parent
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth * window.devicePixelRatio;
      canvas.height = parent.clientHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      draw();
    };

    const draw = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      ctx.clearRect(0, 0, w, h);

      // Create gradient from history (oldest to newest)
      // history is usually [newest, ..., oldest] based on CollectionPageClient
      const sortedHistory = [...history].reverse();
      const gradient = ctx.createLinearGradient(0, 0, w, 0);

      sortedHistory.forEach((item, index) => {
        const offset = index / (sortedHistory.length - 1);
        gradient.addColorStop(offset, item.hex);
      });

      // Draw flowing wave/river background
      ctx.fillStyle = gradient;

      // Draw a subtle organic shape
      ctx.beginPath();
      ctx.moveTo(0, h * 0.5);

      const segments = 50;
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * w;
        const yOffset = Math.sin(i * 0.2) * 10;
        ctx.lineTo(x, h * 0.5 + yOffset);
      }

      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      // Mask with soft top edge
      const edgeGradient = ctx.createLinearGradient(0, 0, 0, h);
      edgeGradient.addColorStop(0, "transparent");
      edgeGradient.addColorStop(0.3, "white");

      ctx.globalCompositeOperation = "destination-in";
      ctx.fillStyle = edgeGradient;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
    };

    window.addEventListener("resize", resize);
    resize();

    return () => window.removeEventListener("resize", resize);
  }, [history]);

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif tracking-tight text-foreground">
            {t("seasonalTitle")}
          </h2>
          <p className="text-muted-foreground font-serif italic text-sm mt-2 opacity-70">
            {t("seasonalDescription")}
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-muted-foreground uppercase opacity-50">
          <span>Past</span>
          <div className="w-12 h-px bg-border" />
          <span>Present</span>
        </div>
      </div>

      <div
        className="relative w-full h-48 md:h-64 bg-card/30 border border-border/40 overflow-hidden group cursor-crosshair"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
        />

        {/* Overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-transparent pointer-events-none" />

        {/* Hover info */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="px-4 py-2 bg-background/80 backdrop-blur-md border border-border shadow-xl text-[10px] font-mono tracking-[0.2em] uppercase">
            Tracing the arc of your perception
          </div>
        </div>
      </div>
    </div>
  );
}
