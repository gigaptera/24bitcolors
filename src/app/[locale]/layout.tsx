import type { Metadata } from "next";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { Inter, Noto_Sans_JP, M_PLUS_Rounded_1c } from "next/font/google";
import "@/app/globals.css";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GoogleAdsense } from "@/components/GoogleAdsense";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});
const mPlusRounded1c = M_PLUS_Rounded_1c({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-mplus",
});

// Params type definition for dynamic route segment [locale]
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: {
      template: "%s | 24bitColors",
      default: t("title"),
    },
    description: t("description"),
    metadataBase: new URL("https://24bitcolors.com"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: "24bitColors",
      locale: locale,
      type: "website",
    },
  };
}

export const viewport: { themeColor: string } = {
  themeColor: "#E8E8E8",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "24bitColors",
  url: "https://24bitcolors.com",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "JPY",
  },
  description:
    "20の質問であなたの好きな色を1677万色の中から特定します。bit診断方式による色の好み診断。",
  publisher: {
    "@type": "Organization",
    name: "24bitColors Team",
    logo: {
      "@type": "ImageObject",
      url: "https://24bitcolors.com/icon",
    },
  },
};

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${notoSansJP.variable} ${mPlusRounded1c.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Header />
            <Breadcrumbs />
            <div className="flex-1 flex flex-col w-full">{children}</div>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>

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
          <GoogleAdsense pId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID} />
        )}
      </body>
    </html>
  );
}
