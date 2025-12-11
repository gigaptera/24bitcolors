"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const PATH_MAP: Record<string, string> = {
  diagnosis: "診断",
  logic: "ロジック",
  algorithm: "アルゴリズム解説",
  oklch: "OKLCH色空間",
  feedback: "フィードバック",
  result: "診断結果",
  about: "About",
  contact: "お問い合わせ",
  privacy: "プライバシーポリシー",
  terms: "利用規約",
};

export function Breadcrumbs() {
  const pathname = usePathname();

  // Root or 404 (pathname might be null in some edge cases)
  if (!pathname || pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    // Check map, or use segment directly (decodeURI for Japanese if needed)
    let label = PATH_MAP[segment];
    if (!label) {
      // Decode URI component for Japanese slugs or hex codes
      try {
        label = decodeURIComponent(segment).toUpperCase();
      } catch {
        label = segment.toUpperCase();
      }
    }

    return { name: label, path: href, url: `https://24bitcolors.com${href}` };
  });

  const fullList = [
    { name: "Home", url: "https://24bitcolors.com/" },
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
          HOME
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
