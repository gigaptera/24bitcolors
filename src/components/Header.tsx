"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { LastDiagnosisLink } from "./LastDiagnosisLink";
import { AppIcon } from "./AppIcon";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const isResultPage = pathname?.startsWith("/result/");

  return (
    <header
      className={cn(
        "fixed top-0 z-50 flex w-full items-center justify-between px-space-5 py-space-3 transition-all",
        isResultPage
          ? "bg-transparent border-transparent"
          : "bg-background/80 backdrop-blur-md border-b border-border/50"
      )}
    >
      <div className="flex items-center gap-8">
        {/* Brand Logo Group */}
        <Link href="/" className="group flex items-center gap-4">
          <AppIcon className="h-6 w-auto transition-transform group-hover:scale-110" />
          <h1
            className="hidden md:block text-2xl font-normal tracking-wide text-foreground transition-opacity group-hover:opacity-70"
            style={{ fontFamily: '"Times New Roman", serif' }}
          >
            24bitColors
          </h1>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/about"
            className="text-base text-muted-foreground transition-colors hover:text-foreground font-serif"
          >
            About
          </Link>
          <Link
            href="/diagnosis/logic"
            className="text-base text-muted-foreground transition-colors hover:text-foreground font-serif"
          >
            Logic
          </Link>
        </nav>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        <LastDiagnosisLink />
        <ThemeToggle />
        <Button
          variant="outline"
          className="h-10 px-6 md:h-11 md:px-8 active:scale-95 transition-transform ml-2"
          asChild
        >
          <Link href="/diagnosis" className="flex items-center justify-center">
            <span className="md:hidden text-xs">診断</span>
            <span className="hidden md:inline">診断を開始する</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
