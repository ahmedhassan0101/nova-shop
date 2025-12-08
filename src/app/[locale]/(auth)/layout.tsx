// src/app/[locale]/(auth)/layout.tsx
import LanguageToggle from "@/components/layout/LanguageToggle";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { OTPBanner } from "@/components/OTPBanner";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    // <>
    //   {/* 1. البانر يوضع خارج الحاوية الرئيسية لأنه Fixed */}
    //   <OTPBanner />

    //   {/* 2. حاوية المحتوى تبقى كما هي لتوسيط الفورم فقط */}
    //   <div className="flex min-h-screen flex-col items-center justify-center gap-10">
    //     {children}
    //   </div>
    // </>
    <div className="flex min-h-screen items-center justify-center flex-col gap-20">
      {/* <div className="flex items-center gap-3 justify-end w-full px-10"> */}
      {/* <LanguageToggle /> */}
      {/* <ModeToggle /> */}
      {/* </div> */}
      {/* <OTPBanner /> */}
      {process.env.SEND_REAL_SMS !== "true" && <OTPBanner />}
      {children}
    </div>
  );
}
