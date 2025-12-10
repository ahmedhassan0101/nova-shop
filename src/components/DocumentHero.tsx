// src/components/layout/DocumentHero.tsx

import React from "react";
import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

interface DocumentHeroProps {
  title: React.ReactNode;
  description: React.ReactNode;
  badgeText: React.ReactNode;
  updatedDate?: string;
  icon: LucideIcon;
  colorClassName: "text-primary" | "text-secondary";
}

const getDynamicClasses = (colorClass: "text-primary" | "text-secondary") => {
  const bgBadge =
    colorClass === "text-primary" ? "bg-primary/10" : "bg-secondary/10";
  const textBadge =
    colorClass === "text-primary" ? "text-primary" : "text-secondary";
  const bgDot = colorClass === "text-primary" ? "bg-green-500" : "bg-secondary";
  return { bgBadge, textBadge, bgDot };
};

export const DocumentHero: React.FC<DocumentHeroProps> = ({
  title,
  description,
  badgeText,
  updatedDate,
  icon: Icon,
  colorClassName,
}) => {
  const t = useTranslations();
  const { bgBadge, textBadge, bgDot } = getDynamicClasses(colorClassName);

  return (
    <div className="relative w-full bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 py-20 lg:py-28 overflow-hidden">
      <div className="absolute top-0 ltr:right-0 rtl:left-0 p-20 opacity-5 dark:opacity-10 pointer-events-none">
        <Icon className={twMerge("w-96 h-96", colorClassName)} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${bgBadge} ${textBadge}`}
          >
            {badgeText}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {description}
          </p>
          {updatedDate && (
            <div className="mt-8 flex items-center gap-4 text-sm font-medium text-slate-500">
              <span className={`flex h-2 w-2 rounded-full ${bgDot}`} />
              {t("privacy.lastUpdated")}: {updatedDate}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
