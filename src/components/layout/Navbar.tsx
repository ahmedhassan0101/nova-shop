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
    <nav className="sticky top-0 z-[60] w-full border-b border-primary/5 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group relative flex items-center gap-0.5">
            <div className="relative flex items-center">
              <span className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white transition-colors">
                {t("nav.nova")}
              </span>
            </div>

            <span className="text-3xl font-black tracking-tighter text-primary">
              {t("nav.shop")}
            </span>

          </Link>
        
          {/* Desktop Navigation Links */}
          <DesktopNavLinks />

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-3 ltr:pr-4 ltr:border-r rtl:pl-4 rtl:border-l border-slate-200 dark:border-slate-800">
              {/* Language Toggle */}
              <LanguageToggle className="hidden sm:flex" />
              {/* Theme Toggle */}
              <ModeToggle />
            </div>

            {/* User Menu or Login Button */}
            <UserAuthSection />

            {/* Mobile Menu Toggle */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden border-none bg-slate-100 dark:bg-slate-800 hover:bg-primary/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-primary" />
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
