"use client";

import { useState } from "react";
import { ShareNetwork, Copy, Check } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CollectionShareButton() {
  const t = useTranslations("Share");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCreateShare = async () => {
    if (shareUrl) return; // Already generated

    setIsLoading(true);
    try {
      const res = await fetch("/api/share", { method: "POST" });
      if (!res.ok) throw new Error("Share failed");
      const data = await res.json();

      const url = `${window.location.origin}/share/${data.shareId}`;
      setShareUrl(url);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleCreateShare}
          className="gap-2 rounded-none font-serif tracking-wider min-w-[140px]"
        >
          <ShareNetwork className="w-4 h-4" />
          {t("share")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg p-12 gap-8 rounded-none border-neutral-100 dark:border-neutral-800 shadow-2xl">
        <DialogHeader className="space-y-4 text-left">
          <DialogTitle className="font-serif tracking-wide text-3xl">
            {t("shareTitle")}
          </DialogTitle>
          <DialogDescription className="font-serif leading-relaxed text-muted-foreground text-base">
            {t("shareDesc")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 mt-4">
          <div className="relative">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={shareUrl}
              readOnly
              className="font-mono text-sm h-14 px-0 rounded-none border-0 border-b border-neutral-300 dark:border-neutral-700 bg-transparent focus-visible:ring-0 focus-visible:border-neutral-900 dark:focus-visible:border-neutral-100 transition-colors"
              placeholder={isLoading ? t("generating") : ""}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full h-14 rounded-none font-serif tracking-wider text-base gap-2 bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition-all duration-500"
            onClick={copyToClipboard}
            disabled={!shareUrl || isLoading}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>{t("copyLink")}</span>
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
