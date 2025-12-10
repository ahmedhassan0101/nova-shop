// app/[locale]/auth/verify-otp/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2, RefreshCcw, Shield } from "lucide-react";
import { useResendOTP, useVerifyOTP } from "@/hooks/useAuth";
import { type OTPFormValues, otpSchema } from "@/lib/schemas/auth";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";

export default function VerifyOTPPage() {
  const t = useTranslations("auth.verifyOTP");
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const { countdown, canResend, resetTimer } = useCountdownTimer(60);
  const verifyMutation = useVerifyOTP();
  const resendMutation = useResendOTP();

  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (!userId) {
      router.push("/auth/signup");
    }
  }, [userId, router]);
  useEffect(() => {
    if (resendMutation.isSuccess) {
      resetTimer();
      form.reset();
    }
  }, [resendMutation.isSuccess, resetTimer, form]);
  const onSubmit = (data: OTPFormValues) => {
    if (!userId) return;
    verifyMutation.mutate({ userId, otp: data.otp });
  };

  const handleResend = () => {
    if (!canResend || !userId) return;

    resendMutation.mutate({ userId });
  };

  return (
    <div className="w-full space-y-8 relative animate-in slide-in-from-bottom-6 duration-1000">
      <Shield className="absolute -top-10 ltr:-right-10 rtl:-left-10 text-primary/5 h-72 w-72 pointer-events-none" />

      <div className="text-center space-y-3">
        <div className="mx-auto w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center border-2 border-primary/20 shadow-xl">
          <Shield className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          {t("title")}
        </h1>
        <p className="text-slate-500 font-medium">{t("description")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    disabled={verifyMutation.isPending}
                  >
                    <InputOTPGroup className="gap-3">
                      {[...Array(6)].map((_, i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className="w-12 h-14 sm:w-14 sm:h-16 text-2xl font-black rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-primary shadow-inner transition-all"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!canResend && (
            <div className="w-full space-y-2">
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-1000"
                  // style={{ width: `${(countdown / 60) * 100}%` }}
                  style={{ width: `${((60 - countdown) / 60) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-center font-bold uppercase tracking-widest text-slate-400">
                {t("resendCountdown")} : {countdown}s
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-14 bg-secondary hover:bg-secondary/90 text-white font-black text-lg rounded-2xl shadow-xl shadow-secondary/20"
            disabled={
              verifyMutation.isPending || form.watch("otp").length !== 6
            }
          >
            {verifyMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              t("verifyButton")
            )}
          </Button>

          <div className="flex justify-center">
            {canResend ? (
              <Button
                variant="ghost"
                onClick={handleResend}
                className="text-primary font-black hover:bg-primary/10 gap-2"
              >
                <RefreshCcw className="h-4 w-4" /> {t("resendButton")}
              </Button>
            ) : (
              <div className="opacity-50 pointer-events-none text-slate-400 text-sm font-bold">
                {t("resendButton")}
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
