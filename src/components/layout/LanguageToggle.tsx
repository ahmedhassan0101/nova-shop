// "use client";
// import React from "react";
// import { Button } from "../ui/button";
// import { Earth } from "lucide-react";
// import { useLocale, useTranslations } from "next-intl";
// import { cairoFont, geistMono, geistSans } from "@/config/constants";
// import { usePathname, useRouter } from "@/i18n/routing";

// export default function LanguageToggle({ className }: { className?: string }) {
//   const t = useTranslations();
//   const locale = useLocale();
//   const router = useRouter();
//   const pathname = usePathname();

//   const handleLocaleChange = () => {
//     const newLocale = locale === "en" ? "ar" : "en";
//     router.replace(pathname, { locale: newLocale });
//   };

//   const fontClasses =
//     locale === "ar"
//       ? `${geistSans.variable} ${geistMono.variable} font-sans`
//       : `${cairoFont.variable} font-cairo`;

//   return (
//     <Button
//       variant="outline"
//       size="sm"
//       onClick={handleLocaleChange}
//       title={t("common.language")}
//       className={className}
//     >
//       <Earth className="h-4 w-4" />
//       <span className={`hidden md:flex ${fontClasses}`}>
//         {t("common.language")}
//       </span>
//     </Button>
//   );
// }
"use client";
import React from "react";
import { Button } from "../ui/button";
import { Languages } from "lucide-react"; // أيقونة أكثر تعبيراً عن اللغات
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export default function LanguageToggle({ className }: { className?: string }) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLocaleChange}
      title={t("common.language")}
      className={`group relative h-10 px-3 rounded-xl border-2 border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-primary/30 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 ${className}`}
    >
      <div className="flex items-center gap-2">
        <Languages className="h-4 w-4 text-slate-500 transition-transform duration-500 group-hover:text-primary" />

        <span className="text-xs font-black uppercase tracking-tighter text-slate-700 dark:text-slate-300">
          {locale === "en" ? "AR" : "EN"}
        </span>
      </div>

      <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
      </span>
    </Button>
  );
}
