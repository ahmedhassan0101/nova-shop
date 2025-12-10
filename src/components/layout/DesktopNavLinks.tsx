// src/components/layout/DesktopNavLinks.tsx
import Link from "next/link";
import { useTranslations } from "next-intl";
import { navLinks } from "./Navbar";

export default function DesktopNavLinks() {
  const t = useTranslations();

  return (
    <div className="hidden md:flex items-center gap-10">
      {navLinks.map((link) => (
        <Link
          key={link.key}
          href={link.href}
          className="relative text-sm font-bold text-slate-600 dark:text-slate-300 transition-colors hover:text-primary group"
        >
          {t(`nav.${link.key}`)}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full shadow-[0_0_10px_rgba(0,68,255,0.5)]" />
        </Link>
      ))}
    </div>
  );
}
