// app/[locale]/auth/forgot-password/page.tsx
"use client";

import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/schemas/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useFormHandler } from "@/hooks/useFormHandler";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form-fields/FormInput";
import { useForgotPassword } from "@/hooks/useAuth";

const defaultValues: ForgotPasswordInput = {
  email: "",
};

export default function ForgotPasswordPage() {
  const t = useTranslations("auth.forgotPassword");
  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();

  const handleForgotPassword = async (value: ForgotPasswordInput) => {
    console.log("🚀 ~ onSubmit ~ value:", value);
    forgotPassword(value);
  };

  const { form, onSubmit } = useFormHandler({
    schema: forgotPasswordSchema,
    defaultValues: defaultValues,
    onSubmit: handleForgotPassword,
  });

  if (isSuccess) {
    return (
      <div className="container flex items-center justify-center min-h-screen py-10">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">
              {t("checkYourEmailTitle")}
            </CardTitle>
            <CardDescription>
              {t("checkYourEmailDescription")}{" "}
              <strong className="text-foreground">
                {form.getValues("email")}
              </strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>{t("checkEmailAlert")}</AlertDescription>
            </Alert>

            <Button asChild className="w-full">
              <Link href="/auth/login">{t("backToLogin")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit}>
              {/* Email */}

              <FormInput
                control={form.control}
                name="email"
                label={t("emailLabel")}
                description={t("emailDescription")}
                placeholder={t("emailPlaceholder")}
                type="email"
                disabled={isPending}
              />
              {/* {error && (
                <Alert variant="destructive">
                  <AlertDescription>{t("error")}</AlertDescription>
                </Alert>
              )} */}

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t("sendResetLink")}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backToLogin")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
