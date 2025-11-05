// src/components/layout/MobileMenu.tsx
import Link from "next/link";
import { User, Package, LogOut } from "lucide-react";
import { navLinks } from "./Navbar";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import LanguageToggle from "./LanguageToggle";

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  handleSignOut: () => void;
}

export default function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  handleSignOut,
}: MobileMenuProps) {
  const { data: session } = useSession();
  const t = useTranslations();
  if (!mobileMenuOpen) {
    return null;
  }

  const handleLinkClick = () => setMobileMenuOpen(false);

  const handleSignOutClick = () => {
    handleSignOut();
    setMobileMenuOpen(false);
  };

  return (
    <div className="md:hidden border-t py-4">
      <div className="flex flex-col space-y-3">
        {/* Mobile Navigation Links */}
        {navLinks.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className="text-sm font-medium transition-colors hover:text-primary px-2 py-2 rounded-md hover:bg-accent"
            onClick={handleLinkClick}
          >
            {t(`nav.${link.key}`)}
          </Link>
        ))}

        {/* Mobile User Menu Items (if session exists) */}
        {session && (
          <div className="border-t pt-3 mt-3 sm:hidden">
            <Link
              href="/profile"
              className="flex items-center gap-2 text-sm font-medium px-2 py-2 rounded-md hover:bg-accent"
              onClick={handleLinkClick}
            >
              <User className="h-4 w-4" />
              {t("nav.profile")}
            </Link>
            <Link
              href="/orders"
              className="flex items-center gap-2 text-sm font-medium px-2 py-2 rounded-md hover:bg-accent"
              onClick={handleLinkClick}
            >
              <Package className="h-4 w-4" />
              {t("nav.orders")}
            </Link>
            <button
              onClick={handleSignOutClick}
              className="flex items-center gap-2 text-sm font-medium px-2 py-2 rounded-md hover:bg-accent text-destructive w-full text-left"
            >
              <LogOut className="h-4 w-4" />
              {t("nav.logout")}
            </button>
          </div>
        )}

        {/* Mobile Language Toggle Button */}
        <LanguageToggle className="sm:hidden" />
      </div>
    </div>
  );
}
