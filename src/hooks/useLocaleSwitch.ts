// src/hooks/useLocaleSwitch.ts
"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";

export function useLocaleSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const isRTL = locale === "ar";
  const currentLocaleName = locale === "en" ? "English" : "العربية";
  const nextLocaleName = locale === "en" ? "العربية" : "English";

  return {
    locale,
    isRTL,
    isPending,
    switchLocale,
    currentLocaleName,
    nextLocaleName,
  };
}