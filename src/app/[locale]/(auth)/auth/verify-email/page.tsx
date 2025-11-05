// app/[locale]/auth/verify-email/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";
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

  // Extract error message
  const errorMessage = hasNoToken
    ? t("error.noToken")
    : error?.message || t("messages.verificationFailed");

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {/* Loading State */}
          {isPending && (
            <>
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
              </div>
              <CardTitle className="text-2xl">{t("loading.title")}</CardTitle>
              <CardDescription>{t("loading.description")}</CardDescription>
            </>
          )}
          {/* Success State */}
          {isSuccess && (
            <>
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
              <CardTitle className="text-2xl">{t("success.title")}</CardTitle>
              <CardDescription>{t("success.description")}</CardDescription>
            </>
          )}

          {/* Error State */}
          {(isError || hasNoToken) && (
            <>
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                <XCircle className="h-10 w-10 text-destructive" />
              </div>
              <CardTitle className="text-2xl">{t("error.title")}</CardTitle>
              <CardDescription>{t("error.description")}</CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Message */}
          {isSuccess && (
            <Alert>
              <AlertDescription>
                {t("messages.emailVerifiedSuccess")}
              </AlertDescription>
            </Alert>
          )}

          {/* Error Message */}
          {(isError || hasNoToken) && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {/* Success Actions */}
          {isSuccess && (
            <>
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t("success.redirecting", { countdown })}
                </p>
              </div>

              <Button asChild className="w-full">
                <Link href="/auth/login?verified=true">
                  {t("success.continueButton")}
                </Link>
              </Button>
            </>
          )}

          {/* Error Actions */}
          {(isError || hasNoToken) && (
            <div className="space-y-3">
              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription className="ml-2">
                  {t("error.expiredOrInvalid")}
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link href="/auth/signup">{t("error.createNewAccount")}</Link>
                </Button>

                <Button asChild variant="outline" className="w-full">
                  <Link href="/auth/login">{t("error.backToLogin")}</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
