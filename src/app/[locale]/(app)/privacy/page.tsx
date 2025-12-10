// // src/app/[locale]/privacy/page.tsx
// import { useTranslations } from "next-intl";
// import { Shield } from "lucide-react";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Privacy Policy - Nova Shop",
//   description: "Learn about how we collect, use, and protect your data",
// };

// export default function PrivacyPage() {
//   const t = useTranslations("privacy");

//   const sections = ["collection", "usage", "security", "cookies", "rights"];

//   return (
//     <div className="container mx-auto px-4 py-16 max-w-4xl">
//       {/* Header */}
//       <div className="text-center mb-12">
//         <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
//           <Shield className="w-8 h-8 text-primary" />
//         </div>
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
//         <p className="text-muted-foreground">
//           {t("lastUpdated")}: January 1, 2024
//         </p>
//       </div>

//       {/* Introduction */}
//       <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
//         <p className="text-lg leading-relaxed">{t("intro")}</p>
//       </div>

//       {/* Sections */}
//       <div className="space-y-8">
//         {sections.map((section, index) => (
//           <div
//             key={section}
//             className="ltr:border-l-4 rtl:border-r-4 border-primary ltr:pl-6 rtl:pr-6 py-2"
//           >
//             <h2 className="text-2xl font-bold mb-3">
//               {index + 1}. {t(`sections.${section}.title`)}
//             </h2>
//             <p className="text-muted-foreground leading-relaxed">
//               {t(`sections.${section}.content`)}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Contact Section */}
//       <div className="mt-16 p-8 rounded-lg bg-secondary/30 border">
//         <h3 className="text-xl font-semibold mb-3">{t("questionsTitle")}</h3>
//         <p className="text-muted-foreground mb-4">
//           {t("privacyQuestionsNotice")}
//         </p>
//         <a
//           href="mailto:privacy@novashop.com"
//           className="text-primary hover:underline font-medium"
//         >
//           privacy@novashop.com
//         </a>
//       </div>
//     </div>
//   );
// }
// src/app/[locale]/privacy/page.tsx
"use client";

import { useTranslations } from "next-intl";
import { Shield, Eye, Lock, Server, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DocumentHero } from "@/components/DocumentHero";

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  // تعريف الأقسام بأيقوناتها لضمان التوحيد
  const sections = [
    { id: "collection", icon: Eye },
    { id: "usage", icon: Server },
    { id: "security", icon: Lock },
    { id: "cookies", icon: Globe },
    { id: "rights", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* 🟢 1. الموحد: Hero Section (Abstract & Clean) */}
      {/* <div className="relative w-full bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 py-20 lg:py-28 overflow-hidden">
        <div className="absolute top-0 ltr:right-0 rtl:left-0 p-20 opacity-5 dark:opacity-10 pointer-events-none">
          <Shield className="w-96 h-96 text-primary" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              {t("badge")}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900 dark:text-white">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {t("intro")}
            </p>
            <div className="mt-8 flex items-center gap-4 text-sm font-medium text-slate-500">
              <span className="flex h-2 w-2 rounded-full bg-green-500" />
              {t("lastUpdated")}: January 1, 2024
            </div>
          </div>
        </div>
      </div> */}
      <DocumentHero
        title={t("title")}
        description={t("intro")}
        badgeText={t("badge")}
        icon={Shield}
        updatedDate= "Jan 1, 2024"
        colorClassName="text-primary"
      />
      {/* 🟢 2. الموحد: Content Layout (Sidebar + Content) */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Sticky Sidebar Navigation */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-1">
              <p className="px-4 mb-4 text-xs font-black uppercase text-muted-foreground tracking-widest">
                {t("tableOfContents")}
              </p>
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                    <span className="text-[10px] font-bold">{index + 1}</span>
                  </span>
                  {t(`sections.${section.id}.title`)}
                </a>
              ))}
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 max-w-4xl space-y-16">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                    <section.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {t(`sections.${section.id}.title`)}
                  </h2>
                </div>

                <div className="prose prose-lg dark:prose-invert prose-slate max-w-none">
                  <p className="leading-loose text-muted-foreground">
                    {t(`sections.${section.id}.content`)}
                  </p>

                  {/* مثال على Smart Block داخل المحتوى */}
                  {section.id === "cookies" && (
                    <div className="not-prose mt-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-secondary" />{" "}
                        {t("cookieSettingsTitle")}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t("cookieSettingsDesc")}
                      </p>
                      <Button variant="outline" size="sm">
                        {t("manageCookies")}
                      </Button>
                    </div>
                  )}
                </div>
              </section>
            ))}

            {/* Footer / Contact CTA */}
            <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800">
              <div className="bg-primary/5 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {t("questionsTitle")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("privacyQuestionsNotice")}
                  </p>
                </div>
                <Button className="shrink-0 gap-2 bg-primary hover:bg-primary/90 text-white rounded-xl h-12 px-6">
                  {t("contactSupport")} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
