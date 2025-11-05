// src/app/[locale]/privacy/page.tsx
import { useTranslations } from "next-intl";
import { Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Nova Shop",
  description: "Learn about how we collect, use, and protect your data",
};

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  const sections = ["collection", "usage", "security", "cookies", "rights"];

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
        <p className="text-muted-foreground">
          {t("lastUpdated")}: January 1, 2024
        </p>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <p className="text-lg leading-relaxed">{t("intro")}</p>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section, index) => (
          <div
            key={section}
            className="ltr:border-l-4 rtl:border-r-4 border-primary ltr:pl-6 rtl:pr-6 py-2"
          >
            <h2 className="text-2xl font-bold mb-3">
              {index + 1}. {t(`sections.${section}.title`)}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t(`sections.${section}.content`)}
            </p>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-16 p-8 rounded-lg bg-secondary/30 border">
        <h3 className="text-xl font-semibold mb-3">{t("questionsTitle")}</h3>
        <p className="text-muted-foreground mb-4">
          {t("privacyQuestionsNotice")}
        </p>
        <a
          href="mailto:privacy@novashop.com"
          className="text-primary hover:underline font-medium"
        >
          privacy@novashop.com
        </a>
      </div>
    </div>
  );
}