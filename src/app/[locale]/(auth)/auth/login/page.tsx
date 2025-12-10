"use client";

import { useTranslations } from "next-intl";
import { logInSchema, type LogInInput } from "@/lib/schemas/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Info, Loader2, LogIn, Sparkles } from "lucide-react";
import Link from "next/link";
import { useFormHandler } from "@/hooks/useFormHandler";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form-fields/FormInput";
import Image from "next/image";
import { useLogin } from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";

const defaultValues: LogInInput = {
  identifier: "",
  password: "",
};

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const searchParams = useSearchParams();

  // query parameters
  const verified = searchParams.get("verified");
  const passwordReset = searchParams.get("password-reset");
  const passwordChanged = searchParams.get("password-changed");

  const { mutate: login, loginWithGoogle, isPending } = useLogin();

  const handleLogin = async (formData: LogInInput) => {
    login(formData);
  };

  const { form, onSubmit } = useFormHandler({
    schema: logInSchema,
    defaultValues: defaultValues,
    onSubmit: handleLogin,
  });

  
  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      
      {/* ✨ Watermark Background */}
      <div className="absolute -top-10 ltr:-right-10 rtl:-left-10  text-primary/5 pointer-events-none select-none">
        <Sparkles className="h-64 w-64 rotate-12" />
      </div>

      {/* 📝 Heading Section */}
      <div className="space-y-2 text-center lg:text-left rtl:lg:text-right">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2 justify-center lg:justify-start">
          <LogIn className="text-primary h-8 w-8" />
          {t("title")}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          {t("description")}
        </p>
      </div>

      <div className="space-y-4">
        {/* ✅ Glassmorphism Success Alerts */}
        {(verified === "true" || passwordReset === "true") && (
          <Alert className="border-green-500/20 bg-green-500/10 backdrop-blur-md rounded-2xl p-4">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <AlertDescription className="ml-2 font-bold text-green-700 dark:text-green-400">
              {verified === "true" ? t("emailVerifiedMessage") : t("passwordResetSuccess")}
            </AlertDescription>
          </Alert>
        )}

        {passwordChanged === "true" && (
          <Alert className="border-blue-500/20 bg-blue-500/10 backdrop-blur-md rounded-2xl p-4">
            <Info className="h-5 w-5 text-primary" />
            <AlertDescription className="ml-2 font-bold text-blue-700 dark:text-blue-300">
              {t("passwordChangedMessage")}
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <FormInput
              control={form.control}
              name="identifier"
              label={t("emailOrPhone")}
              placeholder={t("emailOrPhonePlaceholder")}
              disabled={isPending}
            />

            <div className="space-y-2">
              <FormInput
                control={form.control}
                name="password"
                type="password"
                label={t("password")}
                placeholder="••••••••"
                disabled={isPending}
              />
              <div className="flex justify-end">
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-bold text-primary underline-offset-4 hover:underline"
                >
                  {t("forgotPassword")}
                </Link>
              </div>
            </div>

            {/* 🚀 Login Button - BLUE (Primary) */}
            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black text-lg rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95" 
              disabled={isPending}
            >
              {isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5 mr-2" />}
              {t("submit")}
            </Button>
          </form>
        </Form>
      </div>

      {/* 🔗 Divider & Google Auth */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200 dark:border-slate-800" /></div>
        <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-background px-4 text-slate-500 font-bold tracking-widest">{t("orContinueWith")}</span></div>
      </div>

      <Button
        variant="outline"
        className="w-full h-12 border-2 rounded-xl font-black gap-3 transition-all hover:bg-slate-50 dark:hover:bg-slate-900"
        onClick={loginWithGoogle}
        disabled={isPending}
      >
        <Image src="/google.svg" alt="Google" width={20} height={20} />
        {t("continueWithGoogle")}
      </Button>

      <p className="text-center text-sm font-medium text-slate-500">
        {t("dontHaveAccount")}{" "}
        <Link href="/auth/signup" className="text-primary font-black underline-offset-4 hover:underline">
          {t("signUpLink")}
        </Link>
      </p>
    </div>
  );


}

