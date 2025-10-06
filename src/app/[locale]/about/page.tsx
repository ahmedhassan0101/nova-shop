// src/app/[locale]/about/page.tsx
import { useTranslations } from "next-intl";
import { Users, Target, Lightbulb, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Nova Shop",
  description: "Learn more about Nova Shop and our mission",
};

export default function AboutPage() {
  const t = useTranslations("about");

  const values = [
    {
      icon: Target,
      key: "quality",
    },
    {
      icon: Heart,
      key: "trust",
    },
    {
      icon: Lightbulb,
      key: "innovation",
    },
    {
      icon: Users,
      key: "customer",
    },
  ];

  const stats = [
    { number: "50,000+", key: "customers" },
    { number: "500+", key: "merchants" },
    { number: "10,000+", key: "products" },
    { number: "15+", key: "countries" },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t("title")}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
        {stats.map((stat) => (
          <div key={stat.key} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {stat.number}
            </div>
            <div className="text-sm text-muted-foreground">
              {t(`stats.${stat.key}`)}
            </div>
          </div>
        ))}
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{t("mission.title")}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("mission.content")}
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{t("vision.title")}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("vision.content")}
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t("values.title")}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div
              key={value.key}
              className="text-center p-6 rounded-lg bg-card border hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <value.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t(`values.${value.key}.title`)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(`values.${value.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-secondary/30 rounded-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-6">{t("story.title")}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t("story.content")}
        </p>
      </div>
    </div>
  );
}