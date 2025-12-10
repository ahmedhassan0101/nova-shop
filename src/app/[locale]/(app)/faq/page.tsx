// // src/app/[locale]/faq/page.tsx
// "use client";
// import { useState } from "react";
// import { useTranslations } from "next-intl";
// import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default function FAQPage() {
//   const t = useTranslations("faq");
//   const [openIndex, setOpenIndex] = useState<number | null>(0);

//   const questions = [
//     { id: "q1", category: "account" },
//     { id: "q2", category: "general" },
//     { id: "q3", category: "orders" },
//     { id: "q4", category: "shipping" },
//     { id: "q5", category: "returns" },
//     { id: "q6", category: "general" },
//     { id: "q7", category: "shipping" },
//     { id: "q8", category: "orders" },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-16 max-w-4xl">
//       {/* Header */}
//       <div className="text-center mb-12">
//         <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
//           <HelpCircle className="w-8 h-8 text-primary" />
//         </div>
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
//         <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
//       </div>

//       {/* FAQ Accordion */}
//       <div className="space-y-4">
//         {questions.map((item, index) => {
//           const isOpen = openIndex === index;
//           return (
//             <div
//               key={item.id}
//               className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
//             >
//               <button
//                 onClick={() => setOpenIndex(isOpen ? null : index)}
//                 className="w-full px-6 py-4 flex items-center justify-between text-left rtl:text-right hover:bg-secondary/50 transition-colors"
//               >
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
//                       {t(`categories.${item.category}`)}
//                     </span>
//                   </div>
//                   <h3 className="text-lg font-semibold">
//                     {t(`questions.${item.id}.question`)}
//                   </h3>
//                 </div>
//                 <div className="flex-shrink-0 ml-4">
//                   {isOpen ? (
//                     <ChevronUp className="w-5 h-5 text-muted-foreground" />
//                   ) : (
//                     <ChevronDown className="w-5 h-5 text-muted-foreground" />
//                   )}
//                 </div>
//               </button>
//               {isOpen && (
//                 <div className="px-6 pb-4 pt-2">
//                   <p className="text-muted-foreground leading-relaxed">
//                     {t(`questions.${item.id}.answer`)}
//                   </p>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Contact CTA */}
//       <div className="mt-16 p-8 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border text-center">
//         <h3 className="text-2xl font-bold mb-2">{t("stillNeedHelp")}</h3>
//         <p className="text-muted-foreground mb-6">{t("supportDesc")}</p>
//         <Link href="/contact">
//           <Button size="lg">{t("contactSupport")}</Button>
//         </Link>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  User,
  ShoppingBag,
  Truck,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { DocumentHero } from "@/components/DocumentHero";

export default function FAQPage() {
  const t = useTranslations("faq");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const allQuestions = [
    { id: "q1", category: "account", icon: User },
    { id: "q2", category: "general", icon: HelpCircle },
    { id: "q3", category: "orders", icon: ShoppingBag },
    { id: "q4", category: "shipping", icon: Truck },
    { id: "q5", category: "returns", icon: Truck },
    { id: "q6", category: "general", icon: HelpCircle },
    { id: "q7", category: "shipping", icon: Truck },
    { id: "q8", category: "orders", icon: ShoppingBag },
    { id: "q9", category: "payment", icon: CreditCard },
  ];

  const categories = [
    { id: "all", icon: HelpCircle },
    { id: "general", icon: HelpCircle },
    { id: "account", icon: User },
    { id: "orders", icon: ShoppingBag },
    { id: "shipping", icon: Truck },
    { id: "payment", icon: CreditCard },
  ];

  // 💡 Filtered questions based on the active category
  const filteredQuestions = useMemo(() => {
    if (activeCategory === "all") {
      return allQuestions;
    }
    return allQuestions.filter((q) => q.category === activeCategory);
  }, [activeCategory]);

  // Reset accordion when category changes
  useEffect(() => {
    setOpenIndex(null);
  }, [activeCategory]);

  // Set initial category to 'all' on load
  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory("all");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <DocumentHero
        title={t("title")}
        description={t("subtitle")}
        badgeText={t("badge")}
        icon={HelpCircle}
        colorClassName="text-primary"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-1">
              <p className="px-4 mb-4 text-xs font-black uppercase text-muted-foreground tracking-widest">
                {t("categoryFilterTitle")}
              </p>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`group flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    cat.id === activeCategory
                      ? "text-primary bg-primary/10 font-bold shadow-sm"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-md transition-colors ${
                      cat.id === activeCategory
                        ? "bg-primary text-white shadow-md"
                        : "bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/20 group-hover:text-primary"
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                  </span>
                  {t(`categories.${cat.id}`)}
                </button>
              ))}
            </div>
          </aside>

          <main className="flex-1 max-w-4xl space-y-4">
            <h2 className="text-2xl font-black mb-6 border-b pb-2 border-slate-200 dark:border-slate-800">
              {t("currentSectionTitle")}: {t(`categories.${activeCategory}`)} (
              {filteredQuestions.length})
            </h2>

            {filteredQuestions.map((item, index) => {
              const isOpen = openIndex === index;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className={`rounded-xl overflow-hidden bg-card border transition-all duration-300 ${
                    isOpen
                      ? "border-primary shadow-lg shadow-primary/10"
                      : "border-slate-200 dark:border-slate-800 hover:border-primary/50"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left rtl:text-right transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            item.category === "general"
                              ? "bg-secondary/10 text-secondary"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {t(`categories.${item.category}`)}
                        </span>
                        <Icon
                          className={`w-4 h-4 transition-colors ${isOpen ? "text-primary" : "text-muted-foreground"}`}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {t(`questions.${item.id}.question`)}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-primary transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-300" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0"
                    }`}
                  >
                    <Separator className="bg-slate-200 dark:bg-slate-800" />
                    <p className="px-6 pt-4 pb-2 text-muted-foreground leading-relaxed text-base">
                      {t(`questions.${item.id}.answer`)}
                    </p>
                  </div>
                </div>
              );
            })}

            {filteredQuestions.length === 0 && (
              <div className="text-center py-12 bg-card/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                <HelpCircle className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">
                  {t("noQuestionsFound")}
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-secondary/10 to-orange-50 dark:from-slate-900 dark:to-slate-900/50 border border-secondary/20 dark:border-slate-800 text-center">
          <h3 className="text-3xl font-black mb-2 text-slate-900 dark:text-white">
            {t("stillNeedHelp")}
          </h3>
          <p className="text-lg text-muted-foreground mb-6">
            {t("supportDesc")}
          </p>
          <Link href="/contact" passHref>
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white shadow-lg shadow-secondary/30 transition-all duration-300"
            >
              {t("contactSupport")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
