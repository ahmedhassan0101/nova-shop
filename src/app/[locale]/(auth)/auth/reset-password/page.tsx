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
import { CheckCircle2, Loader2, Lock } from "lucide-react";
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
  const t = useTranslations();
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
      <div className="container flex items-center justify-center min-h-screen py-10">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Password Reset!</CardTitle>
            <CardDescription>
              Your password has been successfully reset
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription>
                Redirecting to sign in page...
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              {/* New Password */}
              <FormInput
                control={form.control}
                name="password"
                label="New Password" // -----
                type="password"
                disabled={isPending}
              />
              {/* Confirm Password */}
              <FormInput
                control={form.control}
                name="confirmPassword"
                label="Confirm New Password" // -----
                type="password"
                disabled={isPending}
              />
              {/* Password Tips */}
              <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                <p className="text-sm font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password Requirements
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 ml-6 list-disc">
                  <li>At least 8 characters long</li>
                  <li>Include uppercase and lowercase letters</li>
                  <li>Include numbers</li>
                  <li>Include special characters</li>
                </ul>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isPending || !token}
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Reset Password
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="text-sm text-primary hover:underline"
            >
              Back to Log In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
