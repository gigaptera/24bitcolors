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
  const [displayCount, setDisplayCount] = useState(20);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDisplayCount(10);
      } else {
        setDisplayCount(20);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.length < 2) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // --- Draw Grid Lines for Visibility Removed ---
      // ctx.strokeStyle = "rgba(100, 100, 100, 0.1)"; // Subtle grey
      // ctx.lineWidth = 1;
      // ctx.setLineDash([4, 4]); // Dashed lines

      // Noon Line (Top limit: 10% from top)
      // const noonY = h * 0.1;
      // ctx.beginPath();
      // ctx.moveTo(0, noonY);
      // ctx.lineTo(w, noonY);
      // ctx.stroke();

      // Midnight Line (Bottom limit: 90% from top)
      // const midnightY = h * 0.9;
      // ctx.beginPath();
      // ctx.moveTo(0, midnightY);
      // ctx.lineTo(w, midnightY);
      // ctx.stroke();

      // Reset dash for wave
      // ctx.setLineDash([]);

      const visibleData = [...history].slice(0, displayCount).reverse();
      if (visibleData.length < 2) return;

      const gradient = ctx.createLinearGradient(0, 0, w, 0);
      visibleData.forEach((item, index) => {
        const offset = index / (visibleData.length - 1);
        gradient.addColorStop(offset, item.hex);
      });

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, h);

      const points = visibleData.map((item, index) => {
        const x = (index / (visibleData.length - 1)) * w;
        const date = new Date(item.created_at);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const totalMinutes = hours * 60 + minutes;
        const distFromNoon = Math.abs(totalMinutes - 720);
        const normalizedTime = distFromNoon / 720;
        const y = h * (0.1 + normalizedTime * 0.8);
        return { x, y };
      });

      ctx.lineTo(points[0].x, points[0].y);

      for (let i = 0; i < points.length - 1; i++) {
        const current = points[i];
        const next = points[i + 1];
        const xc = (current.x + next.x) / 2;
        const yc = (current.y + next.y) / 2;
        if (i === 0) {
          ctx.lineTo(xc, yc);
        } else {
          ctx.quadraticCurveTo(current.x, current.y, xc, yc);
        }
      }

      const last = points[points.length - 1];
      ctx.lineTo(last.x, last.y);

      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();
    };

    draw();
    const handleResize = () => requestAnimationFrame(draw);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [history, displayCount]);

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

      <div className="relative w-full h-48 md:h-64 bg-card/30 border border-border/40 overflow-hidden group rounded-sm">
        <canvas
          ref={canvasRef}
          className="w-full h-full transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-transparent pointer-events-none" />

        {/* Improved Label Functionality & Visibility */}
        <div className="absolute left-3 top-3 flex items-center gap-2 z-10">
          <span className="w-2 h-2 rounded-full border border-foreground/60"></span>
          <span className="text-[10px] font-mono text-foreground/80 tracking-widest font-medium">
            NOON (12:00)
          </span>
        </div>

        <div className="absolute left-3 bottom-3 flex items-center gap-2 z-10">
          <span className="w-2 h-2 rounded-full bg-foreground/60"></span>
          <span className="text-[10px] font-mono text-foreground/80 tracking-widest font-medium">
            MIDNIGHT (0:00)
          </span>
        </div>
      </div>
    </div>
  );
}
