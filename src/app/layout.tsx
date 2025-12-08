import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
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
  alternates: {
    canonical: "/",
  },
};

export const viewport: { themeColor: string } = {
  themeColor: "#E8E8E8",
};

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
        {children}
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
