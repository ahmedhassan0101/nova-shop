// Projects\nova-shop\src\providers\index.tsx
"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";
import { queryClient } from "./query-client";
// import { ZustandProvider } from "@/lib/zustand-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

interface ProvidersProps {
  children: ReactNode;
  locale: string;
}

export default function Providers({ children }: ProvidersProps) {

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
