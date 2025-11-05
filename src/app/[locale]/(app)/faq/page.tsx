// src/app/[locale]/faq/page.tsx
"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FAQPage() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = [
    { id: "q1", category: "account" },
    { id: "q2", category: "general" },
    { id: "q3", category: "orders" },
    { id: "q4", category: "shipping" },
    { id: "q5", category: "returns" },
    { id: "q6", category: "general" },
    { id: "q7", category: "shipping" },
    { id: "q8", category: "orders" },
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <HelpCircle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
        <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {questions.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.id}
              className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left rtl:text-right hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {t(`categories.${item.category}`)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">
                    {t(`questions.${item.id}.question`)}
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>
              {isOpen && (
                <div className="px-6 pb-4 pt-2">
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`questions.${item.id}.answer`)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact CTA */}
      <div className="mt-16 p-8 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border text-center">
        <h3 className="text-2xl font-bold mb-2">{t("stillNeedHelp")}</h3>
        <p className="text-muted-foreground mb-6">{t("supportDesc")}</p>
        <Link href="/contact">
          <Button size="lg">{t("contactSupport")}</Button>
        </Link>
      </div>
    </div>
  );
}
