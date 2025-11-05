// src/components/layout/DesktopNavLinks.tsx
import Link from "next/link";
import { useTranslations } from "next-intl";
import { navLinks } from "./Navbar";

export default function DesktopNavLinks() {
  const t = useTranslations();

  return (
    <div className="hidden md:flex items-center gap-8">
      {navLinks.map((link) => (
        <Link
          key={link.key}
          href={link.href}
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          {t(`nav.${link.key}`)}
        </Link>
      ))}
    </div>
  );
}
