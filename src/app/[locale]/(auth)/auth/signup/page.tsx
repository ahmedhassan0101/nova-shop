// src\app\[locale]\auth\signup\page.tsx
"use client";
import { useLocale, useTranslations } from "next-intl";
import { signUpSchema, type SignUpInput } from "@/lib/schemas/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useFormHandler } from "@/hooks/useFormHandler";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form-fields/FormInput";
import { useRegister } from "@/hooks/useAuth";

const defaultValues: SignUpInput = {
  registerWith: "email",
  confirmPassword: "",
  name: "",
  password: "",
  email: "",
  phone: "",
};

export default function SignUpPage() {
  const t = useTranslations("auth.signUp");
  const { mutate: signUp, isPending } = useRegister();
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  const handleSignUp = async (formData: SignUpInput) => {
    console.log("🚀 ~ handleSignUp ~ formData:", formData);
    signUp(formData);
  };

  const { form, onSubmit } = useFormHandler({
    schema: signUpSchema,
    defaultValues: defaultValues,
    onSubmit: handleSignUp,
  });

  const handleRegisterMethodChange = (value: string) => {
    const method = value as "email" | "phone";
    form.setValue("registerWith", method);

    if (method === "email") {
      form.setValue("phone", "");
    } else {
      form.setValue("email", "");
    }
  };

  return (
    <div className="container flex items-center justify-center py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs
            defaultValue="email"
            onValueChange={handleRegisterMethodChange}
            dir={dir}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">
                <Mail className="w-4 h-4 mr-2" />
                {t("withEmail")}
              </TabsTrigger>
              <TabsTrigger value="phone">
                <Phone className="w-4 h-4 mr-2" />
                {t("withPhone")}
              </TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={onSubmit} className="space-y-4 mt-6">
                {/* Name */}
                <FormInput
                  control={form.control}
                  name="name"
                  label={t("name.label")}
                  description={t("name.description")}
                  placeholder={t("name.placeholder")}
                  disabled={isPending}
                />

                <TabsContent value="email" className="space-y-4 mt-0">
                  {/* Email */}
                  <FormInput
                    control={form.control}
                    name="email"
                    label={t("email.label")}
                    description={t("email.description")}
                    placeholder={t("email.placeholder")}
                    disabled={isPending}
                    type="email"
                  />
                </TabsContent>

                <TabsContent value="phone" className="space-y-4 mt-0">
                  {/* Phone */}
                  <FormInput
                    control={form.control}
                    name="phone"
                    label={t("phone.label")}
                    description={t("phone.description")}
                    placeholder={t("phone.placeholder")}
                    disabled={isPending}
                    type="tel"
                  />
                </TabsContent>

                {/* Password */}
                <FormInput
                  control={form.control}
                  name="password"
                  label={t("password.label")}
                  description={t("password.description")}
                  placeholder={t("password.placeholder")}
                  disabled={isPending}
                  type="password"
                />

                {/* Confirm Password */}
                <FormInput
                  control={form.control}
                  name="confirmPassword"
                  label={t("confirmPassword.label")}
                  description={t("confirmPassword.description")}
                  placeholder={t("confirmPassword.placeholder")}
                  disabled={isPending}
                  type="password"
                />

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t("submit")}
                </Button>
              </form>
            </Form>
          </Tabs>

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
            onClick={() =>
              signIn("google", { callbackUrl: "/profile/complete" })
            }
            disabled={isPending}
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={16}
              height={16}
              className="mr-2"
            />
            {t("continueWithGoogle")}
          </Button>

          {/* Sign In Link */}
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {t("alreadyHaveAccount")}{" "}
            <Link href="/auth/login" className="underline hover:text-primary">
              {t("signInLink")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
