// src/components/layout/Footer.tsx
"use client";
import { useTranslations } from "next-intl";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

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
    { labelKey: "privacyPolicy", href: "/privacy" },
    { labelKey: "terms", href: "/terms" },
    { labelKey: "faq", href: "/faq" },
    { labelKey: "shipping", href: "/shipping" },
    { labelKey: "returns", href: "/returns" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("about")}</h3>
            <p className="text-sm text-muted-foreground">{t("aboutDesc")}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("customerService")}</h3>
            <ul className="space-y-2">
              {customerService.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("followUs")}</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-start">
              © {currentYear} Nova Shop. {t("allRightsReserved")}.
            </p>
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
