// src/components/layout/Footer.tsx
"use client";
import { useTranslations } from "next-intl";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { labelKey: "home", href: "/" },
    { labelKey: "products", href: "/products" },
    { labelKey: "categories", href: "/categories" },
    { labelKey: "about", href: "/about" },
    { labelKey: "contact", href: "/contact" },
  ];

  const customerService = [
    { labelKey: "faq", href: "/faq" },
    { labelKey: "shipping", href: "/shipping" },
    { labelKey: "returns", href: "/returns" },
    { labelKey: "privacyPolicy", href: "/privacy" },
    { labelKey: "terms", href: "/terms" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-card text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="text-2xl font-black text-primary transition-colors"
            >
              Nova Shop
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {t("aboutDesc")}
            </p>
            <div className="space-y-1 pt-2">
              <p className="text-sm font-medium">{t("contactUs")}:</p>
              <p className="text-sm text-muted-foreground hover:text-primary transition-colors">
                <a href="mailto:support@novashop.com">support@novashop.com</a>
              </p>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {t("customerService")}
            </h3>
            <ul className="space-y-3">
              {customerService.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Newsletter (النشرة الإخبارية) */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {t("newsletterTitle")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("newsletterDesc")}
            </p>
            <form className="flex space-x-2 pt-1">
              <Input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="max-w-xs"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-secondary hover:bg-secondary/90 shadow-md"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* 5. Bottom Bar (Copyright & Social Links) */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground text-center md:text-start">
              © {currentYear} Nova Shop. {t("allRightsReserved")}.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-accent"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
// "use client";
// import { useTranslations } from "next-intl";
// import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

// export default function Footer() {
//   const t = useTranslations("footer");
//   const currentYear = new Date().getFullYear();

//   const quickLinks = [
//     { labelKey: "home", href: "/" },
//     { labelKey: "products", href: "/products" },
//     { labelKey: "categories", href: "/categories" },
//     { labelKey: "about", href: "/about" },
//     { labelKey: "contact", href: "/contact" },
//   ];

//   const customerService = [
//     { labelKey: "privacyPolicy", href: "/privacy" },
//     { labelKey: "terms", href: "/terms" },
//     { labelKey: "faq", href: "/faq" },
//     { labelKey: "shipping", href: "/shipping" },
//     { labelKey: "returns", href: "/returns" },
//   ];

//   const socialLinks = [
//     { icon: Facebook, href: "#", label: "Facebook" },
//     { icon: Twitter, href: "#", label: "Twitter" },
//     { icon: Instagram, href: "#", label: "Instagram" },
//     { icon: Linkedin, href: "#", label: "LinkedIn" },
//   ];

//   return (
// <footer className="border-t bg-background">
//   <div className="container mx-auto px-4 py-12">
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//       {/* About Section */}
//       <div className="space-y-4">
//         <h3 className="text-lg font-semibold">{t("about")}</h3>
//         <p className="text-sm text-muted-foreground">{t("aboutDesc")}</p>
//       </div>

//       {/* Quick Links */}
//       <div className="space-y-4">
//         <h3 className="text-lg font-semibold">{t("quickLinks")}</h3>
//         <ul className="space-y-2">
//           {quickLinks.map((link) => (
//             <li key={link.labelKey}>
//               <a
//                 href={link.href}
//                 className="text-sm text-muted-foreground hover:text-primary transition-colors"
//               >
//                 {t(link.labelKey)}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Customer Service */}
//       <div className="space-y-4">
//         <h3 className="text-lg font-semibold">{t("customerService")}</h3>
//         <ul className="space-y-2">
//           {customerService.map((link) => (
//             <li key={link.labelKey}>
//               <a
//                 href={link.href}
//                 className="text-sm text-muted-foreground hover:text-primary transition-colors"
//               >
//                 {t(link.labelKey)}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Social Media */}
//       <div className="space-y-4">
//         <h3 className="text-lg font-semibold">{t("followUs")}</h3>
//         <div className="flex gap-4">
//           {socialLinks.map((social) => (
//             <a
//               key={social.label}
//               href={social.href}
//               aria-label={social.label}
//               className="text-muted-foreground hover:text-primary transition-colors"
//             >
//               <social.icon className="h-5 w-5" />
//             </a>
//           ))}
//         </div>
//       </div>
//     </div>

//     {/* Bottom Bar */}
//     <div className="mt-12 pt-8 border-t">
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//         <p className="text-sm text-muted-foreground text-center md:text-start">
//           © {currentYear} Nova Shop. {t("allRightsReserved")}.
//         </p>
//       </div>
//     </div>
//   </div>
// </footer>
//   );
// }
// "use client";
// import { useTranslations } from "next-intl";
// import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

// export default function Footer() {
//   const t = useTranslations("footer");
//   const currentYear = new Date().getFullYear();

//   const quickLinks = [
//     { key: "home", href: "/" },
//     { key: "products", href: "/products" },
//     { key: "categories", href: "/categories" },
//     { key: "about", href: "/about" },
//   ];

//   const customerService = [
//     { key: "privacyPolicy", href: "/privacy" },
//     { key: "terms", href: "/terms" },
//     { key: "faq", href: "/faq" },
//     { key: "shipping", href: "/shipping" },
//     { key: "returns", href: "/returns" },
//   ];

//   const socialLinks = [
//     { icon: Facebook, href: "#", label: "Facebook" },
//     { icon: Twitter, href: "#", label: "Twitter" },
//     { icon: Instagram, href: "#", label: "Instagram" },
//     { icon: Linkedin, href: "#", label: "LinkedIn" },
//   ];

//   return (
//     <footer className="border-t bg-background">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* About Section */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">{t("about")}</h3>
//             <p className="text-sm text-muted-foreground">
//               {t("aboutDesc")}
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">{t("quickLinks")}</h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link) => (
//                 <li key={link.key}>
//                   <a
//                     href={link.href}
//                     className="text-sm text-muted-foreground hover:text-primary transition-colors"
//                   >
//                     {t(link.key)}
//                      {/* {t(`nav.${link.key}`)} */}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Customer Service */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">{t("customerService")}</h3>
//             <ul className="space-y-2">
//               {customerService.map((link) => (
//                 <li key={link.key}>
//                   <a
//                     href={link.href}
//                     className="text-sm text-muted-foreground hover:text-primary transition-colors"
//                   >
//                     {t(link.key)}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Social Media */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">{t("followUs")}</h3>
//             <div className="flex gap-4">
//               {socialLinks.map((social) => (
//                 <a
//                   key={social.label}
//                   href={social.href}
//                   aria-label={social.label}
//                   className="text-muted-foreground hover:text-primary transition-colors"
//                 >
//                   <social.icon className="h-5 w-5" />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-12 pt-8 border-t">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-sm text-muted-foreground text-center md:text-start">
//               © {currentYear} Nova Shop. {t("allRightsReserved")}.
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
