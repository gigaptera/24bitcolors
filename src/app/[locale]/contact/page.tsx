import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return {
    title: t("title"),
    description: t("intro"), // Using intro as description for now or create specific key
    robots: {
      index: false,
    },
  };
}

export default function ContactPage() {
  const t = useTranslations("Contact");

  return (
    <div className="container mx-auto max-w-3xl px-space-5 py-space-6 text-center font-serif">
      <h1
        className="mb-space-6 text-[length:var(--text-large)] font-normal tracking-wide text-foreground"
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        {t("title")}
      </h1>

      <div className="mx-auto max-w-lg leading-relaxed text-foreground">
        <p className="mb-space-6 whitespace-pre-line">{t("intro")}</p>

        <div className="flex flex-col items-center justify-center space-y-12 py-12">
          {/* Email Section */}
          <div className="group relative">
            <a
              href="mailto:contact@24bitcolors.com"
              className="relative z-10 flex flex-col items-center gap-4 py-8 px-12 transition-all duration-500"
            >
              <div className="mb-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-foreground"
                >
                  <path
                    d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                    strokeWidth="1"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  />
                  <path
                    d="M22 6L12 13L2 6"
                    strokeWidth="1"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  />
                </svg>
              </div>
              <span className="font-serif text-sm tracking-[0.2em] text-muted-foreground uppercase group-hover:text-foreground transition-colors">
                {t("emailLabel")}
              </span>
              <span className="font-mono text-xl md:text-2xl font-light tracking-wider border-b border-transparent group-hover:border-foreground transition-all duration-500 pb-1">
                contact@24bitcolors.com
              </span>
            </a>

            {/* Hover Background aura */}
            <div className="absolute inset-0 bg-foreground/5 scale-75 opacity-0 blur-2xl transition-all duration-700 group-hover:scale-100 group-hover:opacity-100 -z-10 rounded-full" />
          </div>
        </div>

        <p className="mt-space-6 text-[length:var(--text-micro)] text-muted-foreground whitespace-pre-wrap">
          {t("note")}
        </p>
      </div>
    </div>
  );
}
