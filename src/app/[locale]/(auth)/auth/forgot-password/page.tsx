// // app/[locale]/auth/forgot-password/page.tsx
// "use client";

// import {
//   forgotPasswordSchema,
//   type ForgotPasswordInput,
// } from "@/lib/schemas/auth";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Loader2, Mail, ArrowLeft } from "lucide-react";
// import Link from "next/link";
// import { useTranslations } from "next-intl";
// import { useFormHandler } from "@/hooks/useFormHandler";
// import { Form } from "@/components/ui/form";
// import { FormInput } from "@/components/form-fields/FormInput";
// import { useForgotPassword } from "@/hooks/useAuth";

// const defaultValues: ForgotPasswordInput = {
//   email: "",
// };

// export default function ForgotPasswordPage() {
//   const t = useTranslations("auth.forgotPassword");
//   const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();

//   const handleForgotPassword = async (value: ForgotPasswordInput) => {
//     forgotPassword(value);
//   };

//   const { form, onSubmit } = useFormHandler({
//     schema: forgotPasswordSchema,
//     defaultValues: defaultValues,
//     onSubmit: handleForgotPassword,
//   });

//   if (isSuccess) {
//     return (
//       <div className="container flex items-center justify-center min-h-screen py-10">
//         <Card className="w-full max-w-md">
//           <CardHeader className="text-center">
//             <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
//               <Mail className="h-10 w-10 text-primary" />
//             </div>
//             <CardTitle className="text-2xl">
//               {t("checkYourEmailTitle")}
//             </CardTitle>
//             <CardDescription>
//               {t("checkYourEmailDescription")}{" "}
//               <strong className="text-foreground">
//                 {form.getValues("email")}
//               </strong>
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <Alert>
//               <AlertDescription>{t("checkEmailAlert")}</AlertDescription>
//             </Alert>

//             <Button asChild className="w-full">
//               <Link href="/auth/login">{t("backToLogin")}</Link>
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="container flex items-center justify-center min-h-screen py-10">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle className="text-2xl">{t("title")}</CardTitle>
//           <CardDescription>{t("description")}</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={onSubmit}>
//               {/* Email */}

//               <FormInput
//                 control={form.control}
//                 name="email"
//                 label={t("emailLabel")}
//                 description={t("emailDescription")}
//                 placeholder={t("emailPlaceholder")}
//                 type="email"
//                 disabled={isPending}
//               />
//               {/* {error && (
//                 <Alert variant="destructive">
//                   <AlertDescription>{t("error")}</AlertDescription>
//                 </Alert>
//               )} */}

//               <Button type="submit" className="w-full" disabled={isPending}>
//                 {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                 {t("sendResetLink")}
//               </Button>
//             </form>
//           </Form>
//           <div className="mt-6 text-center">
//             <Link
//               href="/auth/login"
//               className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               {t("backToLogin")}
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
"use client";

import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/schemas/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useFormHandler } from "@/hooks/useFormHandler";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form-fields/FormInput";
import { useForgotPassword } from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth.forgotPassword");
  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();

  const { form, onSubmit } = useFormHandler({
    schema: forgotPasswordSchema,
    defaultValues: { email: "" },
    onSubmit: (v) => forgotPassword(v),
  });

  if (isSuccess) {
    return (
      <div className="w-full space-y-8 animate-in zoom-in-95 duration-500 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 shadow-xl shadow-primary/10">
          <Mail className="h-12 w-12 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            {t("checkYourEmailTitle")}
          </h1>
          <p className="text-slate-500 font-medium">
            {t("checkYourEmailDescription")}{" "}
            <span className="text-primary font-black">
              {form.getValues("email")}
            </span>
          </p>
        </div>
        <Alert className="border-blue-500/20 bg-blue-500/5 backdrop-blur-md rounded-2xl">
          <AlertDescription className="font-bold text-blue-700 dark:text-blue-300">
            {t("checkEmailAlert")}
          </AlertDescription>
        </Alert>
        <Button
          asChild
          className="w-full h-12 rounded-xl font-bold bg-primary shadow-lg shadow-primary/20"
        >
          <Link href="/auth/login">{t("backToLogin")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700 relative">
      <Sparkles className="absolute -top-10 ltr:-right-10 rtl:-left-10 text-primary/5 h-64 w-64 pointer-events-none" />
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
            name="email"
            label={t("emailLabel")}
            placeholder={t("emailPlaceholder")}
            type="email"
            disabled={isPending}
          />
          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl font-black text-lg shadow-xl shadow-primary/20 transition-all"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              t("sendResetLink")
            )}
          </Button>
        </form>
      </Form>
      <div className="text-center">
        <Link
          href="/auth/login"
          className="text-sm font-bold text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> {t("backToLogin")}
        </Link>
      </div>
    </div>
  );
}
