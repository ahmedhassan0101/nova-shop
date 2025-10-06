// Projects\nova-shop\src\providers\index.tsx
"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";
import { queryClient } from "./query-client";
// import { ZustandProvider } from "@/lib/zustand-provider";

interface ProvidersProps {
  children: ReactNode;
  locale: string;
}

export default function Providers({ children, locale }: ProvidersProps) {
  console.log("🚀 ~ Providers ~ locale:", locale);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
