"use client";

import { useTranslations } from "next-intl";

export function LogicFaqSection() {
  const t = useTranslations("DiagnosisLogic.faq");

  const faqs = [
    { q: "q1", a: "a1" },
    { q: "q2", a: "a2" },
    { q: "q3", a: "a3" },
  ];

  return (
    <section className="space-y-6 w-full">
      <div className="flex flex-col items-center">
        <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] mb-4">
          FAQ
        </span>
        <h2 className="font-serif text-2xl tracking-wide text-center mb-8">
          {t("title")}
        </h2>

        <div className="w-full max-w-lg space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-3">
              <h3 className="font-serif text-lg text-foreground">
                Q. {t(faq.q)}
              </h3>
              <p className="font-sans text-sm md:text-base text-muted-foreground leading-loose">
                {t(faq.a)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
