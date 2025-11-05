// components/providers/SessionProvider.tsx
"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SessionProvider({ children }: Props) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
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