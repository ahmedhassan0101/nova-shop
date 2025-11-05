"use client";
import React from "react";
import { Button } from "../ui/button";
import { Earth } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cairoFont, geistMono, geistSans } from "@/config/constants";
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

  const fontClasses =
    locale === "ar"
      ? `${geistSans.variable} ${geistMono.variable} font-sans`
      : `${cairoFont.variable} font-cairo`;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLocaleChange}
      title={t("common.language")}
      className={className}
    >
      <Earth className="h-4 w-4" />
      <span className={`hidden md:flex ${fontClasses}`}>
        {t("common.language")}
      </span>
    </Button>
  );
}
