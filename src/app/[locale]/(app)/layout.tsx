// src/app/[locale]/(app)/layout.tsx
import MainLayout from "@/components/layout/MainLayout";
import { ReactNode } from "react";

export default function FullLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
