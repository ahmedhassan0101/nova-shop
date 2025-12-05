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
import { CheckCircle2, Info, Loader2 } from "lucide-react";
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
    <div className="container flex items-center justify-center py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Success Messages */}
          {verified === "true" && (
            <Alert className="mb-4 border-green-500/50 bg-green-500/10">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription className="ml-2 text-green-700 dark:text-green-400">
                <strong>{t("emailVerifiedTitle")}</strong>
                <br />
                {t("emailVerifiedMessage")}
              </AlertDescription>
            </Alert>
          )}

          {passwordReset === "true" && (
            <Alert className="mb-4">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription className="ml-2">
                {t("passwordResetSuccess")}
              </AlertDescription>
            </Alert>
          )}

          {passwordChanged === "true" && (
            <Alert className="mb-4">
              <Info className="h-4 w-4" />
              <AlertDescription className="ml-2">
                {t("passwordChangedMessage")}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Email or Phone */}
              <FormInput
                control={form.control}
                name="identifier"
                label={t("emailOrPhone")}
                description={t("emailOrPhoneDescription")}
                placeholder={t("emailOrPhonePlaceholder")}
                disabled={isPending}
                className="space-y-2"
              />

              {/* Password */}
              <div className="space-y-2">
                <FormInput
                  control={form.control}
                  name="password"
                  label={t("password")}
                  description={t("passwordDescription")}
                  placeholder={t("emailOrPhonePlaceholder")}
                  disabled={isPending}
                  type="password"
                />
                <div className="flex justify-end">
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    {t("forgotPassword")}
                  </Link>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t("submit")}
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t("orContinueWith")}
              </span>
            </div>
          </div>

          {/* Google Sign In */}
          <Button
            variant="outline"
            className="w-full"
            onClick={loginWithGoogle}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Image
                src="/google.svg"
                alt="Google"
                width={16}
                height={16}
                className="mr-2"
              />
            )}
            {t("continueWithGoogle")}
          </Button>

          {/* Sign Up Link */}
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {t("dontHaveAccount")}{" "}
            <Link href="/auth/signup" className="underline hover:text-primary">
              {t("signUpLink")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
