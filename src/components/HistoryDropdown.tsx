"use client";

import { useState, useEffect, useCallback } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getNearestPoeticName } from "@/lib/colorNaming";
import { Swatches } from "@phosphor-icons/react";

interface HistoryItem {
  id: string;
  hex: string;
  created_at: string;
  poeticName?: string;
}

export function HistoryDropdown() {
  const t = useTranslations("Common");
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = useCallback(() => {
    setIsLoading(true);
    fetch(`/api/collection?limit=3`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data) => {
        if (data.history) {
          const enriched = data.history.map(
            (item: { id: string; hex: string; created_at: string }) => {
              const info = getNearestPoeticName(item.hex);
              return {
                ...item,
                poeticName: info.fullTitle,
                groupSlug: info.groupSlug,
              };
            }
          );
          setHistory(enriched);
        }
      })
      .catch(() => {
        // Silent error
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    // Ensure fetch happens after mount/update, not synchronously blocking
    const timer = setTimeout(() => {
      fetchHistory();
    }, 0);

    const handleUpdate = () => {
      setTimeout(fetchHistory, 500);
    };

    window.addEventListener("diagnosisHistoryUpdate", handleUpdate);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("diagnosisHistoryUpdate", handleUpdate);
    };
  }, [fetchHistory]);

  // Only show top 3 in the menu
  const displayHistory = history.slice(0, 3);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("history")}>
          <Swatches weight="light" className="h-5 w-5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={20}
        className="w-[144px] md:w-[160px]"
      >
        {isLoading ? (
          <div className="py-2 px-2 text-center text-xs text-muted-foreground font-serif tracking-widest min-w-[120px]">
            Loading...
          </div>
        ) : history.length > 0 ? (
          <>
            {displayHistory.map((item) => (
              <DropdownMenuItem key={item.id} asChild>
                <Link
                  href={`/result/${
                    getNearestPoeticName(item.hex).groupSlug
                  }?hex=${item.hex.replace("#", "")}`}
                  className="w-full flex items-center justify-between gap-4 cursor-pointer font-serif tracking-widest min-w-[124px]"
                >
                  <span className="truncate max-w-[100px]">
                    {item.poeticName}
                  </span>
                  <div
                    className="w-5 h-5 rounded-full border border-border/20 shadow-sm shrink-0"
                    style={{ backgroundColor: item.hex }}
                  />
                </Link>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/collection"
                className="w-full justify-center text-xs text-muted-foreground font-serif tracking-widest cursor-pointer"
              >
                {t("viewAll")}
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem
            disabled
            className="font-serif tracking-widest text-sm justify-center text-muted-foreground min-w-[124px]"
          >
            {t("noHistory")}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
