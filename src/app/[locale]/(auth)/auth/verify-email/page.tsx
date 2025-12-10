// app/[locale]/auth/verify-email/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Loader2, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useVerifyEmail } from "@/hooks/useAuth";

export default function VerifyEmailPage() {
  const t = useTranslations("auth.verifyEmail");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [hasNoToken, setHasNoToken] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const {
    mutate: verifyEmail,
    isPending,
    isSuccess,
    isError,
    error,
  } = useVerifyEmail();

  // Verify email on mount
  useEffect(() => {
    if (!token) {
      setHasNoToken(true);
      return;
    }

    verifyEmail({ token });
  }, [token, verifyEmail]);

  // Auto-redirect countdown after success
  useEffect(() => {
    if (isSuccess && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isSuccess && countdown === 0) {
      router.push("/auth/login?verified=true");
    }
  }, [isSuccess, countdown, router]);

 

  return (
    <div className="w-full space-y-10 relative py-12 text-center animate-in fade-in zoom-in-95 duration-700">
      <Mail className="absolute -top-20 -right-20 text-primary/5 h-80 w-80 -rotate-12 pointer-events-none" />

      <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
        <div
          className={`absolute inset-0 rounded-full blur-2xl opacity-20 ${isSuccess ? "bg-green-500" : isError ? "bg-destructive" : "bg-primary"} `}
        />
        <div
          className={`relative z-10 w-24 h-24 rounded-3xl border-2 flex items-center justify-center shadow-2xl transition-colors duration-500 ${isSuccess ? "border-green-500 bg-green-50/10" : isError ? "border-destructive bg-destructive/5" : "border-primary/20 bg-primary/5"}`}
        >
          {isPending && (
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          )}
          {isSuccess && (
            <CheckCircle2 className="h-12 w-12 text-green-500 animate-in zoom-in duration-500" />
          )}
          {(isError || !token) && (
            <XCircle className="h-12 w-12 text-destructive animate-in bounce-in" />
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {isPending
            ? t("loading.title")
            : isSuccess
              ? t("success.title")
              : t("error.title")}
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
          {isSuccess ? t("success.description") : t("error.description")}
        </p>
      </div>

      {isSuccess && (
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-green-500/10 text-green-600 font-bold text-sm border border-green-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {t("success.redirecting", { countdown })}
          </div>
          <Button
            asChild
            size="lg"
            className="w-full bg-green-600 hover:bg-green-700 rounded-2xl h-14 font-black shadow-xl shadow-green-500/20"
          >
            <Link href="/auth/login?verified=true">
              {t("success.continueButton")}{" "}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      )}

      {(isError || !token) && (
        <div className="space-y-4 pt-6">
          <Alert
            variant="destructive"
            className="rounded-2xl border-2 border-destructive/20 bg-destructive/5 font-bold"
          >
            {error?.message || t("messages.verificationFailed")}
          </Alert>
          <div className="grid grid-cols-2 gap-4">
            <Button
              asChild
              variant="outline"
              className="rounded-2xl h-12 border-2"
            >
              <Link href="/auth/signup">{t("error.createNewAccount")}</Link>
            </Button>
            <Button asChild className="rounded-2xl h-12 bg-primary">
              <Link href="/auth/login">{t("error.backToLogin")}</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
  // return (
  //   <div className="container mx-auto flex items-center justify-center min-h-screen py-10">
  //     <Card className="w-full max-w-md">
  //       <CardHeader className="text-center">
  //         {/* Loading State */}
  //         {isPending && (
  //           <>
  //             <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
  //               <Loader2 className="h-10 w-10 text-primary animate-spin" />
  //             </div>
  //             <CardTitle className="text-2xl">{t("loading.title")}</CardTitle>
  //             <CardDescription>{t("loading.description")}</CardDescription>
  //           </>
  //         )}
  //         {/* Success State */}
  //         {isSuccess && (
  //           <>
  //             <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
  //               <CheckCircle2 className="h-10 w-10 text-green-500" />
  //             </div>
  //             <CardTitle className="text-2xl">{t("success.title")}</CardTitle>
  //             <CardDescription>{t("success.description")}</CardDescription>
  //           </>
  //         )}

  //         {/* Error State */}
  //         {(isError || hasNoToken) && (
  //           <>
  //             <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
  //               <XCircle className="h-10 w-10 text-destructive" />
  //             </div>
  //             <CardTitle className="text-2xl">{t("error.title")}</CardTitle>
  //             <CardDescription>{t("error.description")}</CardDescription>
  //           </>
  //         )}
  //       </CardHeader>

  //       <CardContent className="space-y-4">
  //         {/* Message */}
  //         {isSuccess && (
  //           <Alert>
  //             <AlertDescription>
  //               {t("messages.emailVerifiedSuccess")}
  //             </AlertDescription>
  //           </Alert>
  //         )}

  //         {/* Error Message */}
  //         {(isError || hasNoToken) && (
  //           <Alert variant="destructive">
  //             <AlertDescription>{errorMessage}</AlertDescription>
  //           </Alert>
  //         )}

  //         {/* Success Actions */}
  //         {isSuccess && (
  //           <>
  //             <div className="text-center space-y-2">
  //               <p className="text-sm text-muted-foreground">
  //                 {t("success.redirecting", { countdown })}
  //               </p>
  //             </div>

  //             <Button asChild className="w-full">
  //               <Link href="/auth/login?verified=true">
  //                 {t("success.continueButton")}
  //               </Link>
  //             </Button>
  //           </>
  //         )}

  //         {/* Error Actions */}
  //         {(isError || hasNoToken) && (
  //           <div className="space-y-3">
  //             <Alert>
  //               <Mail className="h-4 w-4" />
  //               <AlertDescription className="ml-2">
  //                 {t("error.expiredOrInvalid")}
  //               </AlertDescription>
  //             </Alert>

  //             <div className="space-y-2">
  //               <Button asChild className="w-full">
  //                 <Link href="/auth/signup">{t("error.createNewAccount")}</Link>
  //               </Button>

  //               <Button asChild variant="outline" className="w-full">
  //                 <Link href="/auth/login">{t("error.backToLogin")}</Link>
  //               </Button>
  //             </div>
  //           </div>
  //         )}
  //       </CardContent>
  //     </Card>
  //   </div>
  // );
}
