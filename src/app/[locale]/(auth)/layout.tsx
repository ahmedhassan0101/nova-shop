// src/app/[locale]/(auth)/layout.tsx
import LanguageToggle from "@/components/layout/LanguageToggle";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center flex-col gap-20">
      <div className="flex items-center gap-3 justify-end w-full px-10">
        <LanguageToggle />
        <ModeToggle />
      </div>
      {children}
    </div>
  );
}
