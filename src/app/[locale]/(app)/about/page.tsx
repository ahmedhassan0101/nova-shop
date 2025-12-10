// // src/app/[locale]/about/page.tsx
// import { useTranslations } from "next-intl";
// import { Users, Target, Lightbulb, Heart } from "lucide-react";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "About Us - Nova Shop",
//   description: "Learn more about Nova Shop and our mission",
// };

// export default function AboutPage() {
//   const t = useTranslations("about");

//   const values = [
//     {
//       icon: Target,
//       key: "quality",
//     },
//     {
//       icon: Heart,
//       key: "trust",
//     },
//     {
//       icon: Lightbulb,
//       key: "innovation",
//     },
//     {
//       icon: Users,
//       key: "customer",
//     },
//   ];

//   const stats = [
//     { number: "50,000+", key: "customers" },
//     { number: "500+", key: "merchants" },
//     { number: "10,000+", key: "products" },
//     { number: "15+", key: "countries" },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-16">
//       {/* Hero Section */}
//       <div className="text-center mb-16">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">
//           {t("title")}
//         </h1>
//         <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//           {t("subtitle")}
//         </p>
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
//         {stats.map((stat) => (
//           <div key={stat.key} className="text-center">
//             <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
//               {stat.number}
//             </div>
//             <div className="text-sm text-muted-foreground">
//               {t(`stats.${stat.key}`)}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Mission & Vision */}
//       <div className="grid md:grid-cols-2 gap-12 mb-20">
//         <div className="space-y-4">
//           <h2 className="text-3xl font-bold">{t("mission.title")}</h2>
//           <p className="text-muted-foreground leading-relaxed">
//             {t("mission.content")}
//           </p>
//         </div>
//         <div className="space-y-4">
//           <h2 className="text-3xl font-bold">{t("vision.title")}</h2>
//           <p className="text-muted-foreground leading-relaxed">
//             {t("vision.content")}
//           </p>
//         </div>
//       </div>

//       {/* Values Section */}
//       <div className="mb-20">
//         <h2 className="text-3xl font-bold text-center mb-12">
//           {t("values.title")}
//         </h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {values.map((value) => (
//             <div
//               key={value.key}
//               className="text-center p-6 rounded-lg bg-card border hover:shadow-lg transition-shadow"
//             >
//               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
//                 <value.icon className="w-8 h-8 text-primary" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">
//                 {t(`values.${value.key}.title`)}
//               </h3>
//               <p className="text-sm text-muted-foreground">
//                 {t(`values.${value.key}.description`)}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Story Section */}
//       <div className="bg-secondary/30 rounded-xl p-8 md:p-12">
//         <h2 className="text-3xl font-bold mb-6">{t("story.title")}</h2>
//         <p className="text-lg text-muted-foreground leading-relaxed">
//           {t("story.content")}
//         </p>
//       </div>
//     </div>
//   );
// }

// src/app/[locale]/about/page.tsx
import { useTranslations } from "next-intl";
import {
  Users,
  Target,
  Lightbulb,
  Heart,
  Rocket,
  ShieldCheck,
  Globe2,
} from "lucide-react";
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
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    { icon: Heart, key: "trust", color: "text-rose-500", bg: "bg-rose-500/10" },
    {
      icon: Lightbulb,
      key: "innovation",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      icon: Users,
      key: "customer",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  const stats = [
    { number: "50K+", key: "customers", icon: Users },
    { number: "500+", key: "merchants", icon: ShieldCheck },
    { number: "10K+", key: "products", icon: Rocket },
    { number: "15+", key: "countries", icon: Globe2 },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* 🎨 Background Elements - Soft Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden  pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-28">
        {/* 🌟 Hero Section - Layered & Centered */}
        <div className="text-center mb-24 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Rocket className="h-4 w-4" /> <span>{t("badge")}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-gradient-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white bg-clip-text text-transparent pb-2">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* 📊 Stats Section - Floating Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
          {stats.map((stat) => (
            <div
              key={stat.key}
              className="relative group p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 transition-transform duration-500"
            >
              {/* -top-10 ltr:-right-10 rtl:-left-10 */}
              <div className="absolute top-0 ltr:right-0 rtl:left-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <stat.icon className="w-24 h-24 text-primary" />
              </div>
              <div className="relative z-10">
                <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-bold text-primary uppercase tracking-widest">
                  {t(`stats.${stat.key}`)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🚀 Mission & Vision - Split Layout with Soft Neumorphism */}
        <div className="grid lg:grid-cols-2 gap-12 mb-32">
          {/* Mission */}
          <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 border border-blue-100 dark:border-slate-800 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center mb-8 shadow-lg shadow-primary/30">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black mb-4">{t("mission.title")}</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("mission.content")}
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-orange-50 to-white dark:from-slate-900 dark:to-slate-950 border border-orange-100 dark:border-slate-800 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-500/20 transition-colors" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-secondary text-white flex items-center justify-center mb-8 shadow-lg shadow-secondary/30">
                <Lightbulb className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black mb-4">{t("vision.title")}</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("vision.content")}
              </p>
            </div>
          </div>
        </div>

        {/* 💎 Values Section - Grid */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">{t("values.title")}</h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.key}
                className="text-center p-8 rounded-3xl bg-white dark:bg-slate-900 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-300 border border-slate-100 dark:border-slate-800 group"
              >
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${value.bg} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon className={`w-10 h-10 ${value.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                  {t(`values.${value.key}.title`)}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {t(`values.${value.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 📖 Story Section - Immersive */}
        <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 text-white p-12 md:p-20 text-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-slate-900/90" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-black">
              {t("story.title")}
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
              {t("story.content")}
            </p>
            <div className="pt-8">
              <span className="text-9xl font-black opacity-10 absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none">
                {t("nova")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
