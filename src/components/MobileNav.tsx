import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { LastDiagnosisLink } from "./LastDiagnosisLink";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        {/* Accessibility Requirements */}
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Main navigation menu for mobile devices
        </SheetDescription>

        <nav className="flex flex-col gap-16 mt-20 px-6">
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-serif font-medium tracking-wide text-foreground">
              Menu
            </h2>
            <div className="flex flex-col gap-6 pl-1">
              <Link
                href="/about"
                className="text-xl font-serif text-muted-foreground transition-all hover:text-foreground hover:translate-x-1"
              >
                About
              </Link>
              <Link
                href="/diagnosis/logic"
                className="text-xl font-serif text-muted-foreground transition-all hover:text-foreground hover:translate-x-1"
              >
                Logic
              </Link>
            </div>
          </div>

          <div className="h-px bg-border/30 w-full" />

          <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-serif font-medium tracking-wide text-foreground">
              Tools
            </h2>
            <div className="flex flex-col gap-8 pl-1">
              <div className="flex items-center justify-between group">
                <span className="text-lg text-muted-foreground font-serif transition-colors group-hover:text-foreground">
                  Last Color
                </span>
                <LastDiagnosisLink />
              </div>
              <div className="flex items-center justify-between group">
                <span className="text-lg text-muted-foreground font-serif transition-colors group-hover:text-foreground">
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
