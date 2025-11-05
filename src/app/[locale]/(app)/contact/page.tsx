// src/app/[locale]/contact/page.tsx
"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      titleKey: "email",
      valueKey: "email",
    },
    {
      icon: Phone,
      titleKey: "phone",
      valueKey: "phone",
    },
    {
      icon: MapPin,
      titleKey: "address",
      valueKey: "address",
    },
    {
      icon: Clock,
      titleKey: "hours",
      valueKey: "hours",
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    alert(t("form.success"));
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
        <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <div className="bg-card border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">{t("form.title")}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t("form.name")}</Label>
                <Input
                  id="name"
                  placeholder={t("form.namePlaceholder")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("form.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("form.emailPlaceholder")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">{t("form.subject")}</Label>
                <Input
                  id="subject"
                  placeholder={t("form.subjectPlaceholder")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t("form.message")}</Label>
                <Textarea
                  id="message"
                  placeholder={t("form.messagePlaceholder")}
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t("form.sending") : t("form.submit")}
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">{t("info.title")}</h2>
            <p className="text-muted-foreground">{t("info.description")}</p>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info) => (
              <div
                key={info.titleKey}
                className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {t(`info.${info.titleKey}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`info.${info.valueKey}.value`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="rounded-lg overflow-hidden border h-64 bg-secondary/20 flex items-center justify-center">
            <p className="text-muted-foreground">Map Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}