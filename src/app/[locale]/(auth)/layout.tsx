// src/app/[locale]/(auth)/layout.tsx
import Logo from "@/components/layout/Logo";
import { OTPBanner } from "@/components/OTPBanner";
import { ReactNode } from "react";

import { useTranslations } from "next-intl";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const t = useTranslations("auth");

  return (
    <div className="flex min-h-screen bg-background">
      <OTPBanner />
      <div className="flex flex-[1.1] flex-col justify-center  px-8 md:px-12 lg:px-20  py-12 ">
        <div className="self-center w-full max-w-[600px]">
          <div className="mb-10 flex justify-center lg:justify-start">
            <Logo />
          </div>

          <main className="animate-in fade-in slide-in-from-bottom-5 duration-700">
            {children}
          </main>
        </div>
      </div>
      <div className="relative hidden lg:block lg:flex-1 bg-slate-900">
        <div className="absolute inset-0 h-full w-full object-cover opacity-80 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />

        <div className="absolute bottom-16 left-16 right-16 z-20 text-white animate-in fade-in duration-1000">
          <h2 className="text-4xl font-black leading-tight tracking-tight">
            {t("marketingTitle")}
          </h2>
          <p className="mt-4 text-lg text-white/80 font-medium">
            {t("marketingSubtitle")}
          </p>
        </div>
      </div>
    </div>
  );
}
