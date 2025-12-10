"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { XCircle, ArrowLeft, Home, OctagonAlert } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const t = useTranslations("auth.errorPage");
  const errorCode = searchParams.get("error") || "Default";

  return (
    <div className="w-full space-y-8 animate-in fade-in zoom-in-95 duration-700 relative text-center">
      <OctagonAlert className="absolute -top-10 ltr:-right-10 rtl:-left-10 text-destructive/5 h-64 w-64 pointer-events-none select-none" />

      {/* 📝 Heading Section */}
      <div className="space-y-4">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-destructive/10 shadow-xl shadow-destructive/10">
          <XCircle className="h-12 w-12 text-destructive animate-pulse" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            {t("title")}
          </h1>
          <p className="text-slate-500 font-medium">{t("description")}</p>
        </div>
      </div>

      {/* 🛑 Error Alert Box */}
      <Alert
        variant="destructive"
        className="border-destructive/20 bg-destructive/5 backdrop-blur-md rounded-2xl p-6"
      >
        <AlertDescription className="font-bold text-destructive/90 leading-relaxed">
          {t(`codes.${errorCode}`) || t("codes.Default")}
        </AlertDescription>
      </Alert>

      {/* 🚀 Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          asChild
          className="h-12 rounded-xl font-black bg-primary shadow-lg shadow-primary/20"
        >
          <Link href="/auth/login">
            <ArrowLeft className="mr-2 h-5 w-5 rtl:rotate-180" />
            {t("tryAgain")}
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-12 rounded-xl font-black border-2 border-slate-200 dark:border-slate-800"
        >
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            {t("goHome")}
          </Link>
        </Button>
      </div>

      <p className="text-lg text-slate-400 font-medium">
        {t("errorIdLabel")}:{" "}
        <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">
          {errorCode}
        </span>
      </p>
    </div>
  );
}
