// // src\app\[locale]\auth\signup\page.tsx

"use client";
import { useLocale, useTranslations } from "next-intl";
import { signUpSchema, type SignUpInput } from "@/lib/schemas/auth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Mail, Phone, ArrowRight, UserPlus, Sparkles } from "lucide-react";
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
  const isRTL = locale === "ar";
  const dir = locale === "ar" ? "rtl" : "ltr";
  const handleSignUp = async (formData: SignUpInput) => {
    signUp(formData);
  };

  const { form, onSubmit } = useFormHandler({
    schema: signUpSchema,
    defaultValues,
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
    <div className="relative w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ✨ Watermark: Sparkles خفيفة جداً في الخلفية */}
      <div className="absolute -top-10 ltr:-right-10 rtl:-left-10  text-primary/5 pointer-events-none select-none">
        <Sparkles className="h-64 w-64 rotate-12" />
      </div>
      <div className="absolute -bottom-20 -left-20 text-secondary/5 pointer-events-none select-none">
        <Sparkles className="h-48 w-48 -rotate-12" />
      </div>
      {/* 📝 Heading Section */}
      <div className="space-y-2 text-center lg:text-left rtl:lg:text-right">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2 justify-center lg:justify-start">
          <UserPlus className="text-primary h-8 w-8" />
          {t("title")}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          {t("description")}
        </p>
      </div>

      <Tabs
        defaultValue="email"
        onValueChange={handleRegisterMethodChange}
        className="w-full"
        dir={dir}
      >
        
        <TabsList className="grid w-full grid-cols-2 bg-slate-200 dark:bg-slate-700 p-1 h-12 rounded-xl">
          <TabsTrigger
            value="email"
            className="rounded-lg gap-2 font-bold data-[state=active]:text-primary"
          >
            <Mail className="w-4 h-4" />
            {t("withEmail")}
          </TabsTrigger>
          <TabsTrigger
            value="phone"
            className="rounded-lg gap-2 font-bold data-[state=active]:text-primary"
          >
            <Phone className="w-4 h-4" />
            {t("withPhone")}
          </TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-5 mt-8">
            {/* 👤 Full Name */}
            <FormInput
              control={form.control}
              name="name"
              label={t("name.label")}
              placeholder={t("name.placeholder")}
              disabled={isPending}
            />

            <TabsContent value="email" className="mt-0">
              <FormInput
                control={form.control}
                name="email"
                type="email"
                label={t("email.label")}
                placeholder={t("email.placeholder")}
                disabled={isPending}
              />
            </TabsContent>

            <TabsContent value="phone" className="mt-0">
              <FormInput
                control={form.control}
                name="phone"
                type="tel"
                label={t("phone.label")}
                placeholder={t("phone.placeholder")}
                disabled={isPending}
              />
            </TabsContent>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                control={form.control}
                name="password"
                type="password"
                label={t("password.label")}
                placeholder="••••••••"
                disabled={isPending}
              />
              <FormInput
                control={form.control}
                name="confirmPassword"
                type="password"
                label={t("confirmPassword.label")}
                placeholder="••••••••"
                disabled={isPending}
              />
            </div>

            {/* 🚀 Submit Button - ORANGE (Secondary) */}
            <Button
              type="submit"
              className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-black text-lg rounded-xl shadow-lg shadow-secondary/20 transition-all active:scale-95"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight
                  className={`h-5 w-5 ${isRTL ? "rotate-180" : ""} mr-2`}
                />
              )}
              {t("submit")}
            </Button>
          </form>
        </Form>
      </Tabs>

      {/* 🔗 Divider & Third Party */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 text-slate-500 font-bold">
            {t("orContinueWith")}
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full h-12 border-2 rounded-xl font-bold gap-3"
        onClick={() => signIn("google", { callbackUrl: "/profile/complete" })}
        disabled={isPending}
      >
        <Image src="/google.svg" alt="Google" width={20} height={20} />
        {t("continueWithGoogle")}
      </Button>

      <p className="text-center text-sm font-medium text-slate-500">
        {t("alreadyHaveAccount")}{" "}
        <Link
          href="/auth/login"
          className="text-primary font-black underline-offset-4 hover:underline"
        >
          {t("signInLink")}
        </Link>
      </p>
    </div>
  );
}
