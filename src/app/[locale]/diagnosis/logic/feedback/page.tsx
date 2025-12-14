import { Metadata } from "next";
import { FeedbackClient } from "./FeedbackClient";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LogicFeedback" });
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

export default function FeedbackLogicPage() {
  return <FeedbackClient />;
}
