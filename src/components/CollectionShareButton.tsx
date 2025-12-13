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
          className="gap-2 rounded-full font-serif tracking-wider"
        >
          <ShareNetwork className="w-4 h-4" />
          {t("share")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif tracking-wide text-xl">
            {t("shareTitle")}
          </DialogTitle>
          <DialogDescription>{t("shareDesc")}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 mt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={shareUrl}
              readOnly
              className="font-mono text-sm"
              placeholder={isLoading ? t("generating") : ""}
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={copyToClipboard}
            disabled={!shareUrl || isLoading}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">{t("copyLink")}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
