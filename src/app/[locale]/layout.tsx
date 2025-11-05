// src\app\[locale]\layout.tsx
import "./globals.css";
import AppLayout from "@/components/layout/MainLayout";
import Providers from "@/providers";
import { routing, type Locale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import {
  siteMetadata,
  geistSans,
  geistMono,
  cairoFont,
} from "@/config/constants";

export const metadata = siteMetadata;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}>;

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Get messages for the locale
  const messages = await getMessages();

  // Determine font classes based on locale
  const fontClasses =
    locale === "ar"
      ? `${cairoFont.variable} font-cairo`
      : `${geistSans.variable} ${geistMono.variable} font-sans`;

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={`${fontClasses} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Providers locale={locale}>
            {/* <AppLayout> */}
            {children}
            {/* </AppLayout> */}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// // app/[locale]/layout.tsx
// import { NextIntlClientProvider } from 'next-intl';
// import { getMessages } from 'next-intl/server';
// import { ThemeProvider } from '@/components/providers/ThemeProvider';
// import SessionProvider from '@/components/providers/SessionProvider';

// export default async function LocaleLayout({
//   children,
//   params: { locale },
// }: {
//   children: React.ReactNode;
//   params: { locale: string };
// }) {
//   const messages = await getMessages();

//   return (
//     <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
//       <body>
//         <SessionProvider>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="system"
//             enableSystem
//             disableTransitionOnChange
//           >
//             <NextIntlClientProvider messages={messages}>
//               {children}
//             </NextIntlClientProvider>
//           </ThemeProvider>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }
