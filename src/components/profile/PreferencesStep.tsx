/* eslint-disable @typescript-eslint/no-explicit-any */
// // components/profile/PreferencesStep.tsx
// "use client";

// import {
//   profileCompletionStep3Schema,
//   type ProfileStep3Input,
// } from "@/lib/schemas/auth";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Loader2, User, Globe, Bell, Mail, CheckCircle2 } from "lucide-react";

// import { Card, CardContent } from "@/components/ui/card";
// import Link from "next/link";
// import { Form } from "../ui/form";
// import { useFormHandler } from "@/hooks/useFormHandler";
// import { FormDatePicker } from "../form-fields/FormDatePicker";
// import { FormRadioGroup } from "../form-fields/FormRadioGroup";
// import { FormSelect } from "../form-fields/FormSelect";
// import { FormSwitch } from "../form-fields/FormSwitch";
// import { useTranslations } from "next-intl";
// import { usePreferencesStep } from "@/hooks/useProfile";
// import { useEffect } from "react";

// interface PreferencesStepProps {
//   onComplete: () => void;
// }

// export default function PreferencesStep({ onComplete }: PreferencesStepProps) {
//   const t = useTranslations("profile");
//   const { mutate, isPending, isSuccess } = usePreferencesStep();
//   const handleLogin = async (data: ProfileStep3Input) => {
//     mutate({ step: 3, data });
//   };
//   useEffect(() => {
//     if (isSuccess) onComplete();
//   }, [isSuccess, onComplete]);

//   const { form, onSubmit } = useFormHandler({
//     schema: profileCompletionStep3Schema,
//     defaultValues: {
//       preferredLanguage: "ar",
//       newsletter: false,
//     },
//     onSubmit: handleLogin,
//   });

//   const isLoading = form.formState.isSubmitting || isPending;

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={onSubmit}
//         className="space-y-6 animate-in fade-in duration-500"
//       >
//         {/* Personal Information */}
//         <Card>
//           <CardContent className="pt-6 space-y-4">
//             <div className="flex items-center gap-2 pb-2 border-b">
//               <div className="p-2 rounded-lg bg-primary/10">
//                 <User className="h-5 w-5 text-primary" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold">
//                   {t("personalInfo.title")}
//                 </h3>
//                 <p className="text-sm text-muted-foreground">
//                   {t("personalInfo.description")}
//                 </p>
//               </div>
//             </div>

//             <FormDatePicker
//               control={form.control}
//               name="dateOfBirth"
//               label={t("dateOfBirth.label")}
//               description={t("dateOfBirth.description")}
//               placeholder={t("dateOfBirth.placeholder")}
//               disabled={isLoading}
//             />

//             <FormRadioGroup
//               control={form.control}
//               name="gender"
//               label={t("gender.label")}
//               description={t("gender.description")}
//               options={[
//                 { value: "male", label: t("gender.male") },
//                 { value: "female", label: t("gender.female") },
//               ]}
//               disabled={isLoading}
//             />
//           </CardContent>
//         </Card>

//         {/* Language Preference */}
//         <Card>
//           <CardContent className="pt-6 space-y-4">
//             <div className="flex items-center gap-2 pb-2 border-b">
//               <div className="p-2 rounded-lg bg-primary/10">
//                 <Globe className="h-5 w-5 text-primary" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold">{t("language.title")}</h3>
//                 <p className="text-sm text-muted-foreground">
//                   {t("language.description")}
//                 </p>
//               </div>
//             </div>

//             <FormSelect
//               control={form.control}
//               name="preferredLanguage"
//               label={t("language.label")}
//               options={[
//                 { value: "ar", label: "العربية" },
//                 { value: "en", label: "English" },
//               ]}
//               placeholder={t("language.placeholder")}
//               disabled={isLoading}
//             />

//             <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
//               <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
//               <p className="text-xs text-muted-foreground">
//                 {t("language.note")}
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Notifications */}
//         <Card>
//           <CardContent className="pt-6 space-y-4">
//             <div className="flex items-center gap-2 pb-2 border-b">
//               <div className="p-2 rounded-lg bg-primary/10">
//                 <Bell className="h-5 w-5 text-primary" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold">
//                   {t("notifications.title")}
//                 </h3>
//                 <p className="text-sm text-muted-foreground">
//                   {t("notifications.description")}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start justify-between gap-4 p-4 border rounded-lg">
//               <div className="space-y-1 flex-1">
//                 <div className="flex items-center gap-2">
//                   <Mail className="h-4 w-4 text-primary" />
//                   <Label className="text-base font-medium">
//                     {t("newsletter.label")}
//                   </Label>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   {t("newsletter.description")}
//                 </p>
//               </div>
//               <FormSwitch
//                 control={form.control}
//                 name="newsletter"
//                 disabled={isLoading}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Info Alert */}
//         <Alert className="border-primary/20 bg-primary/5">
//           <CheckCircle2 className="h-4 w-4 text-primary" />
//           <AlertDescription className="text-sm ml-2">
//             <strong className="text-primary">{t("alert.title")}</strong>{" "}
//             {t("alert.description")}
//           </AlertDescription>
//         </Alert>

//         {/* Action Buttons */}
//         <div className="flex gap-3 pt-4">
//           <Button
//             type="button"
//             variant="outline"
//             className="flex-1"
//             onClick={() => window.history.back()}
//             disabled={isLoading}
//           >
//             {t("buttons.back")}
//           </Button>
//           <Button type="submit" className="flex-1" disabled={isLoading}>
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 {t("buttons.saving")}
//               </>
//             ) : (
//               <>
//                 <CheckCircle2 className="mr-2 h-4 w-4" />
//                 {t("buttons.complete")}
//               </>
//             )}
//           </Button>
//         </div>

//         {/* Privacy Notice */}
//         <p className="text-xs text-center text-muted-foreground">
//           {t("privacy.text")}{" "}
//           <Link href="/privacy" className="underline hover:text-primary">
//             {t("privacy.privacyPolicy")}
//           </Link>{" "}
//           {t("privacy.and")}{" "}
//           <Link href="/terms" className="underline hover:text-primary">
//             {t("privacy.terms")}
//           </Link>
//         </p>
//       </form>
//     </Form>
//   );
// }
// "use client";

// import {
//   profileCompletionStep3Schema,
//   type ProfileStep3Input,
// } from "@/lib/schemas/auth";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import {
//   Loader2,
//   User,
//   Globe,
//   Bell,
//   Mail,
//   Info,
//   CheckCircle,
//   ArrowRight,
// } from "lucide-react";
// import Link from "next/link";
// import { Form } from "../ui/form";
// import { useFormHandler } from "@/hooks/useFormHandler";
// import { FormDatePicker } from "../form-fields/FormDatePicker";
// import { FormRadioGroup } from "../form-fields/FormRadioGroup";
// import { FormSelect } from "../form-fields/FormSelect";
// import { FormSwitch } from "../form-fields/FormSwitch";
// import { useTranslations } from "next-intl";
// import { usePreferencesStep } from "@/hooks/useProfile";
// import { useEffect } from "react";
// import { motion } from "framer-motion";

// interface PreferencesStepProps {
//   onComplete: () => void;
// }

// export default function PreferencesStep({ onComplete }: PreferencesStepProps) {
//   const t = useTranslations("profile");
//   const { mutate, isPending, isSuccess } = usePreferencesStep();

//   const handleLogin = async (data: ProfileStep3Input) => {
//     mutate({ step: 3, data });
//   };

//   useEffect(() => {
//     if (isSuccess) onComplete();
//   }, [isSuccess, onComplete]);

//   const { form, onSubmit } = useFormHandler({
//     schema: profileCompletionStep3Schema,
//     defaultValues: {
//       preferredLanguage: "ar",
//       newsletter: false,
//       gender: "male",
//     },
//     onSubmit: handleLogin,
//   });

//   const isLoading = form.formState.isSubmitting || isPending;

//   // Reusable Section Component for cleaner code
//   const Section = ({ icon: Icon, title, description, children }: any) => (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       className="pb-8 border-b border-gray-100 last:border-0 last:pb-0"
//     >
//       <div className="flex gap-4 mb-6">
//         <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
//           <Icon className="w-5 h-5" />
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//           <p className="text-sm text-gray-500">{description}</p>
//         </div>
//       </div>
//       <div className="pl-0 sm:pl-14 space-y-6">{children}</div>
//     </motion.div>
//   );

//   return (
//     <div className="space-y-8">
//       <div className="space-y-1">
//         <h2 className="text-2xl font-semibold text-gray-900">
//           {t("preferencesTitle", { defaultValue: "Personalize Experience" })}
//         </h2>
//         <p className="text-sm text-muted-foreground">
//           {t("preferencesDesc", {
//             defaultValue: "Customize your profile settings and notifications.",
//           })}
//         </p>
//       </div>

//       <Form {...form}>
//         <form onSubmit={onSubmit} className="space-y-8">
//           {/* 1. Personal Info Section */}
//           <Section
//             icon={User}
//             title={t("personalInfo.title")}
//             description={t("personalInfo.description")}
//           >
//             <div className="grid gap-6 sm:grid-cols-2">
//               <FormDatePicker
//                 control={form.control}
//                 name="dateOfBirth"
//                 label={t("dateOfBirth.label")}
//                 description={t("dateOfBirth.description")}
//                 placeholder={t("dateOfBirth.placeholder")}
//                 disabled={isLoading}
//               />
//               <FormRadioGroup
//                 control={form.control}
//                 name="gender"
//                 label={t("gender.label")}
//                 description={t("gender.description")}
//                 options={[
//                   { value: "male", label: t("gender.male") },
//                   { value: "female", label: t("gender.female") },
//                 ]}
//                 disabled={isLoading}
//                 className="space-y-3"
//               />
//             </div>
//           </Section>

//           {/* 2. Language Section */}
//           <Section
//             icon={Globe}
//             title={t("language.title")}
//             description={t("language.description")}
//           >
//             <div className="max-w-md">
//               <FormSelect
//                 control={form.control}
//                 name="preferredLanguage"
//                 label={t("language.label")}
//                 options={[
//                   { value: "ar", label: "العربية (Arabic)" },
//                   { value: "en", label: "English (United States)" },
//                 ]}
//                 placeholder={t("language.placeholder")}
//                 disabled={isLoading}
//               />
//             </div>
//             <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-100">
//               <Info className="w-4 h-4" />
//               {t("language.note")}
//             </div>
//           </Section>

//           {/* 3. Notifications Section */}
//           <Section
//             icon={Bell}
//             title={t("notifications.title")}
//             description={t("notifications.description")}
//           >
//             <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white hover:border-emerald-200 transition-colors">
//               <div className="flex items-center gap-3">
//                 <Mail className="h-5 w-5 text-gray-400" />
//                 <div>
//                   <Label className="text-base font-medium text-gray-900 cursor-pointer">
//                     {t("newsletter.label")}
//                   </Label>
//                   <p className="text-sm text-gray-500 mt-0.5">
//                     {t("newsletter.description")}
//                   </p>
//                 </div>
//               </div>
//               <FormSwitch
//                 control={form.control}
//                 name="newsletter"
//                 disabled={isLoading}
//                 className="data-[state=checked]:bg-emerald-600"
//               />
//             </div>
//           </Section>

//           {/* Completion Alert */}
//           <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900">
//             <CheckCircle className="h-4 w-4 text-emerald-600" />
//             <AlertTitle className="text-emerald-800 font-semibold ml-2">
//               {t("alert.title")}
//             </AlertTitle>
//             <AlertDescription className="ml-2 text-emerald-700/90">
//               {t("alert.description")}
//             </AlertDescription>
//           </Alert>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 pt-4">
//             <Button
//               type="button"
//               variant="outline"
//               size="lg"
//               className="flex-1 h-12 text-base rounded-xl hover:bg-gray-50"
//               onClick={() => window.history.back()}
//               disabled={isLoading}
//             >
//               {t("buttons.back")}
//             </Button>
//             <Button
//               type="submit"
//               size="lg"
//               className="flex-1 h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200 rounded-xl"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                   {t("buttons.saving")}
//                 </>
//               ) : (
//                 <>
//                   {t("buttons.complete")}
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </>
//               )}
//             </Button>
//           </div>

//           {/* Footer Links */}
//           <p className="text-xs text-center text-gray-400 mt-6">
//             {t("privacy.text")}{" "}
//             <Link
//               href="/privacy"
//               className="underline hover:text-emerald-600 transition-colors"
//             >
//               {t("privacy.privacyPolicy")}
//             </Link>{" "}
//             {t("privacy.and")}{" "}
//             <Link
//               href="/terms"
//               className="underline hover:text-emerald-600 transition-colors"
//             >
//               {t("privacy.terms")}
//             </Link>
//           </p>
//         </form>
//       </Form>
//     </div>
//   );
// }
"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useFormHandler } from "@/hooks/useFormHandler"; // Assuming this hook exists
import {
  profileCompletionStep3Schema,
  type ProfileStep3Input,
} from "@/lib/schemas/auth";
import { usePreferencesStep } from "@/hooks/useProfile"; // Assuming this hook exists

// UI Components
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form } from "../ui/form";
import { FormDatePicker } from "../form-fields/FormDatePicker";
import { FormSelect } from "../form-fields/FormSelect";
import { FormSwitch } from "../form-fields/FormSwitch";

// Icons
import {
  Loader2,
  CheckCircle2,
  Calendar,
  UserCircle2,
  Languages,
  BellRing,
  ShieldCheck,
  ChevronRight,
  User,
  UserRound,
  Mars,
  Venus,
  Globe,
  Mail,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FormRadioGroup } from "../form-fields/FormRadioGroup";

interface PreferencesStepProps {
  onComplete: () => void;
}

export default function PreferencesStep({ onComplete }: PreferencesStepProps) {
  const t = useTranslations("profile");
  const { mutate, isPending, isSuccess } = usePreferencesStep();

  const handlePreferencesSubmit = async (data: ProfileStep3Input) => {
    mutate({ step: 3, data });
  };

  useEffect(() => {
    if (isSuccess) onComplete();
  }, [isSuccess, onComplete]);

  const { form, onSubmit } = useFormHandler({
    schema: profileCompletionStep3Schema,
    defaultValues: {
      preferredLanguage: "ar",
      newsletter: false,
      gender: "male", // default fallback
    },
    onSubmit: handlePreferencesSubmit,
  });

  const isLoading = form.formState.isSubmitting || isPending;

  return (
    <div className="w-full container mx-auto space-y-3">
      {/* Header Text */}
      <div className="flex flex-col gap-2 rounded-3xl bg-card p-6 shadow-sm border-2">
        <h2 className="flex items-center gap-2 text-3xl font-bold tracking-tight text-foreground">
          <UserCircle2 className="w-6 h-6 text-emerald-600" />
          {t("preferencesTitle", {
            defaultValue: "Personalize Your Experience",
          })}
        </h2>
        <p className="text-muted-foreground text-base">
          {t("preferencesDesc", {
            defaultValue:
              "Tell us a bit more about you to get tailored recommendations.",
          })}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-3">
          {/* 1. Basic Info Section */}
          <div className="border-2 bg-card text-card-foreground rounded-3xl shadow-sm transition-all duration-200 p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormDatePicker
                control={form.control}
                name="dateOfBirth"
                label={t("dateOfBirth.label")}
                description={t("dateOfBirth.description")}
                placeholder={t("dateOfBirth.placeholder")}
                disabled={isLoading}
              />

              {/* Custom Radio Group using simple div and logic or provided component */}
              {/* <div className="grid grid-cols-2 gap-4">
                {["male", "female"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => form.setValue("gender", g)}
                    className={cn(
                      "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all",
                      form.watch("gender") === g
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-gray-100 hover:border-emerald-200"
                    )}
                  >
                    {g === "male" ? (
                      <Mars className="size-8 mb-2" />
                    ) : (
                      <Venus className="size-8 mb-2" />
                    )}
                    <span className="font-medium capitalize">
                      {t(`gender.${g}`)}
                    </span>
                  </button>
                ))}
              </div> */}
              <FormRadioGroup
                control={form.control}
                name="gender"
                label={t("gender.label")}
                description={t("gender.description")}
                options={[
                  { value: "male", label: t("gender.male") },
                  { value: "female", label: t("gender.female") },
                ]}
                disabled={isLoading}
                className="space-y-3"
              />
              <div className="grid gap-5 col-span-full">
                {/* 2. Language & Localization */}

                <FormSelect
                  control={form.control}
                  name="preferredLanguage"
                  label={t("language.label")}
                  options={[
                    { value: "ar", label: "العربية (Arabic)" },
                    { value: "en", label: "English (US)" },
                  ]}
                  placeholder={t("language.placeholder")}
                  disabled={isLoading}
                  description={t("language.note", {
                    defaultValue:
                      "We use this for emails and interface language.",
                  })}
                />

                {/* 3. Notifications */}
                <FormSwitch
                  control={form.control}
                  label={t("newsletter.label", {
                    defaultValue: "Subscribe to Newsletter",
                  })}
                  description={t("newsletter.description", {
                    defaultValue:
                      "Get exclusive offers and new arrivals directly to your inbox.",
                  })}
                  name="newsletter"
                  disabled={isLoading}
                  className="data-[state=checked]:bg-emerald-600"
                />
              </div>
            </div>
          </div>
          {/* Action Buttons */}

          <div className="pt-6 mt-6 border-t-2 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Button
              type="submit"
              size="lg"
              className=" sm:col-start-2 lg:col-start-3  h-12 rounded-2xl font-semibold "
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t("buttons.saving", { defaultValue: "Saving..." })}
                </>
              ) : (
                <>
                  {t("buttons.complete", { defaultValue: "Complete Setup" })}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
