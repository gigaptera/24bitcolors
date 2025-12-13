import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });

  return {
    title: t("title"),
    description: t("intro").substring(0, 100),
  };
}

export default function TermsPage() {
  const t = useTranslations("Terms");

  return (
    <div className="container mx-auto max-w-3xl px-space-5 py-24 md:py-32 font-serif text-foreground">
      <h1 className="mb-16 text-3xl md:text-5xl font-light tracking-wide text-center">
        {t("title")}
      </h1>
      <div className="space-y-16 text-base md:text-lg leading-loose text-muted-foreground font-serif">
        <p>{t("intro")}</p>

        <section>
          <h2 className="mb-6 text-xl md:text-2xl font-normal text-foreground tracking-wide">
            {t("article1Title")}
          </h2>
          <p>{t("article1Body")}</p>
        </section>

        <section>
          <h2 className="mb-6 text-xl md:text-2xl font-normal text-foreground tracking-wide">
            {t("article2Title")}
          </h2>
          <p>{t("article2Body")}</p>
          <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-foreground/50">
            <li>{t("article2List1")}</li>
            <li>{t("article2List2")}</li>
            <li>{t("article2List3")}</li>
            <li>{t("article2List4")}</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-6 text-xl md:text-2xl font-normal text-foreground tracking-wide">
            {t("article3Title")}
          </h2>
          <p>{t("article3Body1")}</p>
          <p className="mt-4">{t("article3Body2")}</p>
        </section>

        <section>
          <h2 className="mb-6 text-xl md:text-2xl font-normal text-foreground tracking-wide">
            {t("article4Title")}
          </h2>
          <p>{t("article4Body")}</p>
        </section>

        <div className="pt-12 text-right text-xs md:text-sm tracking-widest uppercase opacity-60">
          {t("date")}
        </div>
      </div>
    </div>
  );
}
