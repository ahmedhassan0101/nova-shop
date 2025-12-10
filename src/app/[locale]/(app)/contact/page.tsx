// // src/app/[locale]/contact/page.tsx
// "use client";
// import { useState } from "react";
// import { useTranslations } from "next-intl";
// import { Mail, Phone, MapPin, Clock } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";

// export default function ContactPage() {
//   const t = useTranslations("contact");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const contactInfo = [
//     {
//       icon: Mail,
//       titleKey: "email",
//       valueKey: "email",
//     },
//     {
//       icon: Phone,
//       titleKey: "phone",
//       valueKey: "phone",
//     },
//     {
//       icon: MapPin,
//       titleKey: "address",
//       valueKey: "address",
//     },
//     {
//       icon: Clock,
//       titleKey: "hours",
//       valueKey: "hours",
//     },
//   ];

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     setIsSubmitting(false);
//     alert(t("form.success"));
//   };

//   return (
//     <div className="container mx-auto px-4 py-16">
//       {/* Header */}
//       <div className="text-center mb-16">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
//         <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
//       </div>

//       <div className="grid lg:grid-cols-2 gap-12">
//         {/* Contact Form */}
//         <div>
//           <div className="bg-card border rounded-lg p-8">
//             <h2 className="text-2xl font-bold mb-6">{t("form.title")}</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="name">{t("form.name")}</Label>
//                 <Input
//                   id="name"
//                   placeholder={t("form.namePlaceholder")}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email">{t("form.email")}</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder={t("form.emailPlaceholder")}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="subject">{t("form.subject")}</Label>
//                 <Input
//                   id="subject"
//                   placeholder={t("form.subjectPlaceholder")}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="message">{t("form.message")}</Label>
//                 <Textarea
//                   id="message"
//                   placeholder={t("form.messagePlaceholder")}
//                   rows={6}
//                   required
//                 />
//               </div>

//               <Button type="submit" className="w-full" disabled={isSubmitting}>
//                 {isSubmitting ? t("form.sending") : t("form.submit")}
//               </Button>
//             </form>
//           </div>
//         </div>

//         {/* Contact Information */}
//         <div className="space-y-8">
//           <div>
//             <h2 className="text-2xl font-bold mb-2">{t("info.title")}</h2>
//             <p className="text-muted-foreground">{t("info.description")}</p>
//           </div>

//           <div className="space-y-6">
//             {contactInfo.map((info) => (
//               <div
//                 key={info.titleKey}
//                 className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
//               >
//                 <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
//                   <info.icon className="w-6 h-6 text-primary" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold mb-1">
//                     {t(`info.${info.titleKey}.title`)}
//                   </h3>
//                   <p className="text-muted-foreground">
//                     {t(`info.${info.valueKey}.value`)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Map Placeholder */}
//           <div className="rounded-lg overflow-hidden border h-64 bg-secondary/20 flex items-center justify-center">
//             <p className="text-muted-foreground">Map Placeholder</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/app/[locale]/contact/page.tsx
"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Clock, Send, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { DocumentHero } from "@/components/DocumentHero";
import { useFormHandler } from "@/hooks/useFormHandler";
import { FormInput } from "@/components/form-fields/FormInput";
import { FormTextarea } from "@/components/form-fields/FormTextarea";

const contactSchema = z.object({
  name: z.string().min(2, { message: "errors.minLength.name" }),
  email: z.email({ message: "errors.invalidEmail" }),
  subject: z.string().min(5, { message: "errors.minLength.subject" }),
  message: z.string().min(10, { message: "errors.minLength.message" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const MapPlaceholder = ({ mapUrl }: { mapUrl?: string }) => {
  const t = useTranslations("contact");

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-80 lg:h-full bg-slate-100 dark:bg-slate-800/60 shadow-xl">
      {mapUrl && mapUrl !== "" ? (
        <iframe
          src={mapUrl}
          className="w-full h-full border-none"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Nova Shop Location"
        ></iframe>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Globe className="w-10 h-10 text-muted-foreground mb-3" />
          <p className="text-muted-foreground text-sm">{t("mapPlaceholder")}</p>
        </div>
      )}
    </div>
  );
};

export default function ContactPage() {
  const t = useTranslations("contact");

  // 💡 ربط الـ Form Handler
  const { form, onSubmit } = useFormHandler({
    schema: contactSchema,
    defaultValues: defaultValues,
    onSubmit: async (data: ContactFormValues) => {
      console.log("✅ Contact Form Data:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(t("form.success"));
      form.reset();
    },
  });

  const contactInfo = [
    { icon: Mail, titleKey: "email", valueKey: "email" },
    { icon: Phone, titleKey: "phone", valueKey: "phone" },
    { icon: Clock, titleKey: "hours", valueKey: "hours" },
  ];
  const isPending = false;
  return (
    <div className="bg-background">
      <DocumentHero
        title={t("title")}
        description={t("subtitle")}
        badgeText={t("badge")}
        icon={Mail}
        colorClassName="text-secondary"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-10 mb-16">
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-3xl font-black mb-4 text-slate-900 dark:text-white">
              {t("info.title")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t("info.description")}
            </p>

            {contactInfo.map((info) => (
              <div
                key={info.titleKey}
                className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <info.icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-lg">
                    {t(`info.${info.titleKey}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(`info.${info.valueKey}.value`)}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow duration-300">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-bold mb-1 text-lg">
                  {t("info.address.title")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("info.address.value")}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <MapPlaceholder />
          </div>
        </div>

        <div className="p-8 lg:p-12 rounded-3xl bg-card border border-slate-200 dark:border-slate-800 shadow-xl lg:max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-2 text-slate-900 dark:text-white">
            {t("form.title")}
          </h2>
          <p className="text-muted-foreground mb-8">{t("form.description")}</p>

          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  control={form.control}
                  name="name"
                  label={t("form.name")}
                  placeholder={t("form.namePlaceholder")}
                  type="text"
                  disabled={isPending}
                />
                <FormInput
                  control={form.control}
                  name="email"
                  label={t("form.email")}
                  placeholder={t("form.emailPlaceholder")}
                  type="email"
                  disabled={isPending}
                />
              </div>

              <FormInput
                control={form.control}
                name="subject"
                label={t("form.subject")}
                placeholder={t("form.subjectPlaceholder")}
                type="text"
                disabled={isPending}
              />

              <FormTextarea
                control={form.control}
                name="message"
                label={t("form.message")}
                placeholder={t("form.messagePlaceholder")}
                rows={6}
                disabled={isPending}
              />

              <Button
                type="submit"
                className="w-full h-12 gap-2 bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/30"
                disabled={isPending}
              >
                {isPending ? (
                  t("form.sending")
                ) : (
                  <>
                    <Send className="w-5 h-5" /> {t("form.submit")}
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
