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
import {
  Mail,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Lightbulb,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useResendVerification } from "@/hooks/useAuth";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { Badge } from "@/components/ui/badge";

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
    <div className="w-full space-y-8 animate-in fade-in duration-700">
      <div className="text-center space-y-6">
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-primary/20 blur-3xl animate-pulse" />
          <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-primary/20 shadow-2xl h-full flex items-center justify-center">
            <Mail className="h-10 w-10 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
            Check Your <span className="text-primary">Inbox</span>
          </h1>
          <p className="text-slate-500 font-medium">
            {t("description")}{" "}
            <strong className="text-slate-900 dark:text-white underline decoration-primary decoration-2">
              {email}
            </strong>
          </p>
        </div>
      </div>

      {/* 🧩 Visual Steps Info-graphic */}
      <div className="grid grid-cols-1 gap-3">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className="flex items-center gap-4 p-4 rounded-2xl bg-slate-200/90 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
          >
        
        
            <span className="flex-none w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-sm">
              {step}
            </span>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {t(`instructions.step${step}`)}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          {t("resendPrompt")}
        </p>
        <Button
          variant={canResend ? "default" : "outline"}
          onClick={handleResend}
          className={`w-full h-12 rounded-xl font-black shadow-lg ${canResend ? "bg-primary shadow-primary/20" : ""}`}
          disabled={!canResend || isPending}
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : canResend ? (
            t("button.resend")
          ) : (
            t("button.countdown", { count: countdown })
          )}
        </Button>
      </div>

      {/* 💡 Tips Section: Modernized */}
      <div className="bg-orange-100/50 dark:bg-orange-950/20 border-2 border-orange-200 dark:border-orange-900/50 rounded-2xl p-6 space-y-4">
        <p className="text-orange-700 dark:text-orange-400 font-black flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5" /> {t("tips.heading")}
        </p>
        <ul className="text-base font-bold text-orange-600/80 dark:text-orange-400/80 space-y-3 leading-loose">
          <li>{t("tips.tip1")}</li>
          <li>{t("tips.tip2")}</li>
          <li>{t("tips.tip3")}</li>
          <li>{t("tips.tip4")}</li>
        </ul>
      </div>
    </div>
  );
}
