// app/[locale]/auth/verify-otp/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Shield } from "lucide-react";
import { useResendOTP, useVerifyOTP } from "@/hooks/useAuth";
import { type OTPFormValues, otpSchema } from "@/lib/schemas/auth";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";

export default function VerifyOTPPage() {
  const t = useTranslations("auth.verifyOTP");
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  // const [canResend, setCanResend] = useState(false);
  // const [countdown, setCountdown] = useState(60);
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
  // React Hook useEffect has a missing dependency: 'form'. Either include it or remove the dependency array.eslintreact-hooks/exhaustive-deps   const resetTimer: () => void;
  const onSubmit = (data: OTPFormValues) => {
    if (!userId) return;
    verifyMutation.mutate({ userId, otp: data.otp });
  };

  const handleResend = () => {
    console.log("🚀 ~ handleResend ~ handleResend:", handleResend);
    console.log("🚀 ~ handleResend ~ canResend:", canResend);
    console.log("🚀 ~ handleResend ~ userId:", userId);
    if (!canResend || !userId) return;
    console.log("🚀 ~ handleResend ~ canResend:", canResend);
    console.log("🚀 ~ handleResend ~ userId:", userId);

    resendMutation.mutate({ userId });
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-10 mx-auto">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel className="text-center">
                      {t("otpLabel")}
                    </FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                        disabled={verifyMutation.isPending}
                      >
                        <InputOTPGroup dir={"ltr"}>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {verifyMutation.isError && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {verifyMutation.error?.message || t("verifyError")}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={
                  verifyMutation.isPending || form.watch("otp").length !== 6
                }
              >
                {verifyMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("verifyButton")}
              </Button>

              <div className="text-center text-sm">
                {canResend ? (
                  <Button
                    type="button"
                    onClick={handleResend}
                    disabled={resendMutation.isPending}
                    // className="text-primary hover:underline font-medium disabled:opacity-50"
                  >
                    {resendMutation.isPending ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        {t("sending")}
                      </span>
                    ) : (
                      t("resendButton")
                    )}
                  </Button>
                ) : (
                  <span className="text-muted-foreground">
                    {t("resendCountdown")} : {countdown} {t("seconds")}
                  </span>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
