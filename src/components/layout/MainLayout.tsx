// src\components\layout\index.tsx

"use client";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
9;
export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();

  const hideLayout = pathname === `/${locale}/profile/complete`;

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      {!hideLayout && <Navbar />}{" "}
      {/* <div className=" flex-1">{children}</div> */}
      <main className="flex-1">{children}</main>
      {!hideLayout && <Footer />}
    </div>
  );
}
