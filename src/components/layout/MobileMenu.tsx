// // src/components/layout/MobileMenu.tsx
// import Link from "next/link";
// import { User, Package, LogOut } from "lucide-react";
// import { navLinks } from "./Navbar";
// import { useSession } from "next-auth/react";
// import { useTranslations } from "next-intl";
// import LanguageToggle from "./LanguageToggle";

// interface MobileMenuProps {
//   mobileMenuOpen: boolean;
//   setMobileMenuOpen: (open: boolean) => void;
//   handleSignOut: () => void;
// }

// export default function MobileMenu({
//   mobileMenuOpen,
//   setMobileMenuOpen,
//   handleSignOut,
// }: MobileMenuProps) {
//   const { data: session } = useSession();
//   const t = useTranslations();
//   if (!mobileMenuOpen) {
//     return null;
//   }

//   const handleLinkClick = () => setMobileMenuOpen(false);

//   const handleSignOutClick = () => {
//     handleSignOut();
//     setMobileMenuOpen(false);
//   };

//   return (
//     <div className="md:hidden border-t py-4">
//       <div className="flex flex-col space-y-3">
//         {/* Mobile Navigation Links */}
//         {navLinks.map((link) => (
//           <Link
//             key={link.key}
//             href={link.href}
//             className="text-sm font-medium transition-colors hover:text-primary px-2 py-2 rounded-md hover:bg-accent"
//             onClick={handleLinkClick}
//           >
//             {t(`nav.${link.key}`)}
//           </Link>
//         ))}

//         {/* Mobile User Menu Items (if session exists) */}
//         {session && (
//           <div className="border-t pt-3 mt-3 sm:hidden">
//             <Link
//               href="/profile"
//               className="flex items-center gap-2 text-sm font-medium px-2 py-2 rounded-md hover:bg-accent"
//               onClick={handleLinkClick}
//             >
//               <User className="h-4 w-4" />
//               {t("nav.profile")}
//             </Link>
//             <Link
//               href="/orders"
//               className="flex items-center gap-2 text-sm font-medium px-2 py-2 rounded-md hover:bg-accent"
//               onClick={handleLinkClick}
//             >
//               <Package className="h-4 w-4" />
//               {t("nav.orders")}
//             </Link>
//             <button
//               onClick={handleSignOutClick}
//               className="flex items-center gap-2 text-sm font-medium px-2 py-2 rounded-md hover:bg-accent text-destructive w-full text-left"
//             >
//               <LogOut className="h-4 w-4" />
//               {t("nav.logout")}
//             </button>
//           </div>
//         )}

//         {/* Mobile Language Toggle Button */}
//         <LanguageToggle className="sm:hidden" />
//       </div>
//     </div>
//   );
// }
import Link from "next/link";
import { User, Package, LogOut } from "lucide-react";
import { navLinks } from "./Navbar"; 
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import LanguageToggle from "./LanguageToggle";
import { Separator } from "@/components/ui/separator";  

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
    <div className="md:hidden border-t border-slate-200 dark:border-slate-800  p-4 pt-6">
      <div className="flex flex-col space-y-1">
        
        {navLinks.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className="text-base font-semibold transition-colors hover:text-primary px-3 py-3 rounded-xl hover:bg-accent/50"
            onClick={handleLinkClick}
          >
            {t(`nav.${link.key}`)}
          </Link>
        ))}

        {session && (
          <div className="mt-4 pt-4 space-y-1">
            <Separator className="bg-slate-200 dark:bg-slate-800 mb-3" />
            
            <p className="text-xs font-bold uppercase text-muted-foreground px-3 pb-1">{t("nav.userMenu")}</p>

            <Link
              href="/profile"
              className="flex items-center gap-3 text-base font-semibold px-3 py-3 rounded-xl hover:bg-accent/50 transition-colors"
              onClick={handleLinkClick}
            >
              <User className="h-5 w-5 text-primary/80" />
              {t("nav.profile")}
            </Link>
            
            <Link
              href="/orders"
              className="flex items-center gap-3 text-base font-semibold px-3 py-3 rounded-xl hover:bg-accent/50 transition-colors"
              onClick={handleLinkClick}
            >
              <Package className="h-5 w-5 text-primary/80" />
              {t("nav.orders")}
            </Link>
            
            <button
              onClick={handleSignOutClick}
              className="flex items-center gap-3 text-base font-semibold px-3 py-3 rounded-xl hover:bg-red-500/10 text-destructive w-full text-left transition-colors"
            >
              <LogOut className="h-5 w-5" />
              {t("nav.logout")}
            </button>
          </div>
        )}

        {/* Mobile Language Toggle Button & other utilities */}
        <div className="pt-4 mt-4">
             <Separator className="bg-slate-200 dark:bg-slate-800 mb-3" />
             <div className="px-3">
                 <LanguageToggle className="w-full justify-start" />
             </div>
        </div>
      </div>
    </div>
  );
}