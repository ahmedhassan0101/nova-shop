import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Logo() {
  const t = useTranslations("nav");

  return (
    <Link href="/" className="group flex items-center gap-0.5">
      <div className="relative flex items-center">
        <span className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white transition-colors">
          {t("nova")}
        </span>
      </div>
      <span className="text-3xl font-black tracking-tighter text-primary">
        {t("shop")}
      </span>
    </Link>
  );
}
