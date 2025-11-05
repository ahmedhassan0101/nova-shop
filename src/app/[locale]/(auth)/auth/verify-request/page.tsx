// app/[locale]/auth/verify-request/page.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useResendVerification } from "@/hooks/useAuth";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";

export default function VerifyRequestPage() {
  const t = useTranslations("auth.verifyRequest");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  // ✅ Countdown Timer Hook
  const { countdown, canResend, resetTimer } = useCountdownTimer(60);

  // ✅ Resend Verification Hook
  const { mutate: resendEmail, isPending, isSuccess } = useResendVerification();

  // ✅ Reset timer after successful resend
  useEffect(() => {
    if (isSuccess) resetTimer();
  }, [isSuccess, resetTimer]);

  const handleResend = async () => {
    if (email && canResend) {
      resendEmail({ email });
    }
  };

  return (
    <div className="container  flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-xl">
        <CardHeader className="text-center">
          {/* Icon */}
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-10 w-10 text-primary" />
          </div>

          <CardTitle className="text-2xl">Check Your Email</CardTitle>
          <CardDescription className="mt-2">
            {t("description")}{" "}
            {email && <strong className="text-foreground">{email}</strong>}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Instructions */}
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-medium">{t("instructions.heading")}</p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>{t("instructions.step1")}</li>
              <li>{t("instructions.step2")}</li>
              <li>{t("instructions.step3")}</li>
            </ol>
          </div>

          {/* Info Alert */}
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription className="ml-2">
              {t("expirationInfo")}
            </AlertDescription>
          </Alert>

          {/* Resend Email */}
          <div className="space-y-3">
            <p className="text-sm text-center text-muted-foreground">
              {t("resendPrompt")}
            </p>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleResend}
              disabled={isPending || !canResend || !email}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("button.sending")}
                </>
              ) : canResend ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {t("button.resend")}
                </>
              ) : (
                <>{t("button.countdown", { count: countdown })}</>
              )}
            </Button>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 rounded-lg bg-muted/50 space-y-2">
            <p className="text-sm font-medium">{t("tips.heading")}</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside ml-4">
              <li>{t("tips.tip1")}</li>
              <li>{t("tips.tip2")}</li>
              <li>{t("tips.tip3")}</li>
              <li>{t("tips.tip4")}</li>
            </ul>
          </div>

          {/* Back to Sign In */}
          <div className="text-center pt-4">
            <Link
              href="/auth/login"
              className="text-sm text-primary hover:underline"
            >
              {/* ← Back to Log In */}
              {t("backToLogin")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
