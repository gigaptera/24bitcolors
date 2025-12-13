import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return {
    title: t("title"),
    description: t("section1Body").substring(0, 100),
  };
}

export default function PrivacyPage() {
  const t = useTranslations("Privacy");

  return (
    <div className="container mx-auto max-w-3xl px-space-5 py-24 md:py-32 font-serif text-foreground">
      <h1 className="mb-16 text-3xl md:text-5xl font-light tracking-wide text-center">
        {t("title")}
      </h1>
      <div className="space-y-16 text-base md:text-lg leading-loose text-muted-foreground font-serif">
        <section>
          <h2 className="mb-6 text-xl md:text-2xl font-normal text-foreground tracking-wide">
            {t("section1Title")}
          </h2>
          <p>{t("section1Body")}</p>
        </section>

        <section>
          <h2 className="mb-6 text-xl md:text-2xl font-normal text-foreground tracking-wide">
            {t("section2Title")}
          </h2>
          <p>{t("section2Body1")}</p>
          <p className="mt-4">
            {t("section2Body2")}
            <a
              href="https://policies.google.com/technologies/ads?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground border-b border-foreground/30 hover:border-foreground transition-colors mx-1"
            >
              {t("section2Link")}
            </a>
            {t("section2Body3")}
          </p>
        </section>

        <section>
          <h2 className="mb-6 text-xl md:text-2xl font-normal text-foreground tracking-wide">
            {t("section3Title")}
          </h2>
          <p>{t("section3Body")}</p>
        </section>

        <div className="pt-12 text-right text-xs md:text-sm tracking-widest uppercase opacity-60">
          {t("date")}
        </div>
      </div>
    </div>
  );
}
