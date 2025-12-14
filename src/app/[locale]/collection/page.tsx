import { CollectionPageClient } from "@/components/CollectionPageClient";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CollectionPage" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function CollectionPage() {
  return <CollectionPageClient />;
}
