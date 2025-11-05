"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DesktopNavLinks from "./DesktopNavLinks";
import UserAuthSection from "./UserAuthSection";
import MobileMenu from "./MobileMenu";
import { ModeToggle } from "./ModeToggle";
import LanguageToggle from "./LanguageToggle";

export const navLinks = [
  { key: "home", href: "/" },
  { key: "products", href: "/products" },
  { key: "categories", href: "/categories" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              {t("nav.novaShop")}
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <DesktopNavLinks />

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <LanguageToggle className="hidden sm:flex" />

            {/* Theme Toggle */}
            <ModeToggle />

            {/* User Menu or Login Button */}
            <UserAuthSection />

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Component */}
        <MobileMenu
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          handleSignOut={handleSignOut}
          // handleLocaleChange={handleLocaleChange}
        />
      </div>
    </nav>
  );
}
