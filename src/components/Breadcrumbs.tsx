"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Fragment } from "react";
import { isValidHex } from "@/lib/color-utils";

export function Breadcrumbs() {
  const t = useTranslations("Breadcrumbs");
  const pathname = usePathname();

  // Root or 404 (pathname might be null in some edge cases)
  if (!pathname || pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  // Whitelist of keys that exist in en.json/ja.json under "Breadcrumbs"
  const KNOWN_KEYS = [
    "home",
    "diagnosis",
    "logic",
    "algorithm",
    "oklch",
    "feedback",
    "about",
    "contact",
    "privacy",
    "terms",
    "result",
    "history",
  ];

  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    let label = "";

    // 1. Check if it's a Hex code
    if (isValidHex(segment) || /^[0-9a-fA-F]{6}$/.test(segment)) {
      label = `#${segment.toUpperCase()}`;
    }
    // 2. Check whitelist for translation
    else if (KNOWN_KEYS.includes(segment)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      label = t(segment as any);
    }
    // 3. Fallback for dynamic slugs (e.g. "dusty-lavender")
    else {
      try {
        const decoded = decodeURIComponent(segment);
        // "dusty-lavender" -> "Dusty Lavender"
        label = decoded
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      } catch {
        label = segment.toUpperCase();
      }
    }

    return { name: label, path: href, url: `https://24bitcolors.com${href}` };
  });

  const fullList = [
    { name: t("home"), url: "https://24bitcolors.com/" },
    ...breadcrumbItems,
  ];

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullList.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full px-space-5 pt-20 pb-2 relative z-10"
    >
      <div className="flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground font-serif tracking-wider">
        <Link href="/" className="hover:text-foreground transition-colors">
          {t("home")}
        </Link>
        {breadcrumbItems.map((item, index) => (
          <Fragment key={item.path}>
            <span className="opacity-40">/</span>
            {index === breadcrumbItems.length - 1 ? (
              <span className="font-medium text-foreground opacity-80">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.path}
                className="hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            )}
          </Fragment>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
