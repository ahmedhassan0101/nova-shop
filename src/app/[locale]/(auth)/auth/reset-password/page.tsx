// app/[locale]/auth/reset-password/page.tsx
"use client";

// import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "@/lib/schemas/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useFormHandler } from "@/hooks/useFormHandler";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form-fields/FormInput";
import { useResetPassword } from "@/hooks/useAuth";
import { Alert, AlertDescription } from "@/components/ui/alert";

const defaultValues: ResetPasswordInput = {
  password: "",
  confirmPassword: "",
};

export default function ResetPasswordPage() {
  const t = useTranslations("auth.resetPassword");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { mutate: resetPassword, isPending, isSuccess } = useResetPassword();

  // useEffect(() => {
  // if (!token) {
  // return;
  // setError("Invalid reset link");
  // }
  // }, [token]);

  const handleResetPassword = async ({ password }: ResetPasswordInput) => {
    if (!token) return;
    resetPassword({ password, token });
  };

  const { form, onSubmit } = useFormHandler({
    schema: resetPasswordSchema,
    defaultValues: defaultValues,
    onSubmit: handleResetPassword,
  });

  if (isSuccess) {
    return (
      <div className="w-full space-y-8 animate-in zoom-in-95 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle2 className="h-12 w-12 text-green-500 animate-pulse" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          {t("successTitle")}
        </h1>
        <Alert className="border-green-500/20 bg-green-500/5 rounded-2xl">
          <AlertDescription className="font-bold text-green-700 dark:text-green-400">
            {t("redirecting")}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 relative">
      
      <ShieldCheck className="absolute -top-10 ltr:-right-10 rtl:-left-10 text-primary/5 h-64 w-64 pointer-events-none" />
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          {t("title")}
        </h1>
        <p className="text-slate-500 font-medium">{t("description")}</p>
      </div>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <FormInput
            control={form.control}
            name="password"
            label={t("newPassword")}
            type="password"
            disabled={isPending}
          />
          <FormInput
            control={form.control}
            name="confirmPassword"
            label={t("confirmPassword")}
            type="password"
            disabled={isPending}
          />

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3 text-xs font-medium text-slate-500">
            <p className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
              <Lock className="h-4 w-4" /> {t("requirements")}
            </p>
            <ul className="grid grid-cols-2 gap-2 list-disc list-inside text-base">
              <li>{t("reqLength")}</li>
              <li>{t("reqCases")}</li>
              <li>{t("reqNumbers")}</li>
              <li>{t("reqSpecial")}</li>
            </ul>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-primary rounded-xl font-black shadow-lg shadow-primary/20"
            disabled={isPending || !token}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              t("submit")
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
  // return (
  //   <div className="container flex items-center justify-center min-h-screen py-10">
  //     <Card className="w-full max-w-md">
  //       <CardHeader>
  //         <CardTitle className="text-2xl">Reset Password</CardTitle>
  //         <CardDescription>Enter your new password below</CardDescription>
  //       </CardHeader>
  //       <CardContent>
  //         <Form {...form}>
  //           <form onSubmit={onSubmit} className="space-y-4">
  //             {/* New Password */}
  //             <FormInput
  //               control={form.control}
  //               name="password"
  //               label="New Password" // -----
  //               type="password"
  //               disabled={isPending}
  //             />
  //             {/* Confirm Password */}
  //             <FormInput
  //               control={form.control}
  //               name="confirmPassword"
  //               label="Confirm New Password" // -----
  //               type="password"
  //               disabled={isPending}
  //             />
  //             {/* Password Tips */}
  //             <div className="p-4 rounded-lg bg-muted/50 space-y-2">
  //               <p className="text-sm font-medium flex items-center gap-2">
  //                 <Lock className="h-4 w-4" />
  //                 Password Requirements
  //               </p>
  //               <ul className="text-xs text-muted-foreground space-y-1 ml-6 list-disc">
  //                 <li>At least 8 characters long</li>
  //                 <li>Include uppercase and lowercase letters</li>
  //                 <li>Include numbers</li>
  //                 <li>Include special characters</li>
  //               </ul>
  //             </div>
  //             <Button
  //               type="submit"
  //               className="w-full"
  //               disabled={isPending || !token}
  //             >
  //               {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  //               Reset Password
  //             </Button>
  //           </form>
  //         </Form>

  //         <div className="mt-6 text-center">
  //           <Link
  //             href="/auth/login"
  //             className="text-sm text-primary hover:underline"
  //           >
  //             Back to Log In
  //           </Link>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   </div>
  // );
}
