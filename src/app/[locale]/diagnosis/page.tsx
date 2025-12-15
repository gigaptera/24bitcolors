import { getTranslations } from "next-intl/server";
import { DiagnosisApp } from "@/components/DiagnosisApp";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Diagnosis" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

export default function DiagnosisPage() {
  return <DiagnosisApp />;
}
