import { getTranslations } from "next-intl/server";
import { DiagnosisApp } from "@/components/DiagnosisApp";

type Props = {
  params: Promise<{ locale: string }>;
};

import type { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Diagnosis" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [
        `/api/og?type=page&title=${encodeURIComponent(
          t("title")
        )}&subtitle=${encodeURIComponent(t("ogpSubtitle"))}`,
      ],
    },
  };
}

export default function DiagnosisPage() {
  return <DiagnosisApp />;
}
