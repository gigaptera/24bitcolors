import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | 24bitColors",
    default: "24bitColors - あなたの好きな色を見つけよう",
  },
  description:
    "20の質問であなたの好きな色を1677万色の中から特定します。bit診断方式による色の好み診断。",
  metadataBase: new URL("https://24bitcolors.com"),
  keywords: [
    "色診断",
    "パーソナルカラー",
    "色彩",
    "デザイン",
    "24bit",
    "カラーテスト",
  ],
  authors: [{ name: "24bitColors Team" }],
  openGraph: {
    title: "24bitColors - あなたの好きな色を見つけよう",
    description:
      "20の質問であなたの好きな色を1677万色の中から特定します。bit診断方式による色の好み診断。",
    url: "https://24bitcolors.com",
    siteName: "24bitColors",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "24bitColors",
    description:
      "あなたの好きな色を1677万色の中から特定します。bit診断方式による色の好み診断。",
  },
  verification: {
    google: "TaOm_LAGUp_4fRTmzV_USJgAIEUimwfCDb5l-Q-DsPY",
  },
  other: {
    "google-adsense-account": "ca-pub-8772469250047655",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: { themeColor: string } = {
  themeColor: "#E8E8E8",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "24bitColors",
  url: "https://24bitcolors.com",
  description:
    "20の質問であなたの好きな色を1677万色の中から特定します。bit診断方式による色の好み診断。",
  publisher: {
    "@type": "Organization",
    name: "24bitColors Team",
    logo: {
      "@type": "ImageObject",
      url: "https://24bitcolors.com/icon.png",
    },
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollToTop } from "@/components/ScrollToTop";

// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <ScrollToTop />
            <Header />
            <main className="flex-grow flex flex-col">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        {/* scripts ... */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
