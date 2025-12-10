// // src/components/sections/HeroSection.tsx
// "use client";
// import { useTranslations } from "next-intl";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, Sparkles } from "lucide-react";

// export default function HeroSection() {
//   const t = useTranslations("hero");

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20">
//       <div className="container mx-auto px-4 py-24 md:py-32">
//         <div className="flex flex-col items-center text-center space-y-8">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
//             <Sparkles className="h-4 w-4" />
//             <span>{t("newArrivals")}</span>
//           </div>

//           {/* Title */}
//           <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl">
//             {t("title")}
//           </h1>

//           {/* Subtitle */}
//           <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
//             {t("subtitle")}
//           </p>

//           {/* CTAs */}
//           <div className="flex flex-col sm:flex-row gap-4 pt-4">
//             <Button size="lg" className="gap-2 group">
//               {t("cta")}
//               <ArrowRight className="h-4 w-4 transition-transfشorm group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
//             </Button>
//             <Button size="lg" variant="outline">
//               {t("learnMore")}
//             </Button>
//           </div>

//           {/* Decorative Elements */}
//           <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
//             <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
//             <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// src/components/sections/HeroSection.tsx

"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Percent, Star, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="container mx-auto px-4 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 min-h-[600px]">
        <div className="md:col-span-4 lg:col-span-4 relative group overflow-hidden rounded-[2.5rem] bg-slate-900 border border-slate-200/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/40 to-transparent z-10" />

          <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />

          <div className="relative z-20 h-full flex flex-col justify-center p-8 md:p-16 space-y-6">
            <div className="inline-flex items-center self-center lg:self-start gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 text-[10px] font-black uppercase tracking-[0.2em]">
              <Zap className="h-3 w-3 fill-secondary" />
              <span>{t("limitedOffer")}</span>
            </div>
            <span className="inline-flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs">
              <Star className="h-4 w-4 fill-primary" /> {t("verifiedStore")}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight max-w-lg">
              {t("mainTitle")}{" "}
              <span className="text-primary">{t("highlightTitle")}</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-md leading-relaxed">
              {t("heroDescription")}
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="rounded-full px-8 h-14 text-lg font-bold group bg-primary shadow-lg shadow-primary/25"
              >
                {t("shopNow")}{" "}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
              </Button>
            </div>
          </div>
        </div>

        {/* 2️⃣ عرض جانبي صغير (Hot Deal) - يغطي عمودين */}
        <div className="md:col-span-2 lg:col-span-2 flex flex-col gap-4">
          {/* Card 1: Flash Sale */}
          <div className="flex-1 relative overflow-hidden rounded-[2rem] bg-secondary p-8 flex flex-col justify-between group shadow-xl">
            <Image
              src="/circuit.svg"
              alt="overlay"
              width={330}
              height={330}
              className="absolute bottom-0 rtl:left-0 ltr:right-0 opacity-50 rtl:scale-x-[-1] pointer-events-none mix-blend-overlay bg-repeat "
            />
            {/* 2. ووتر مارك ضخم (Giant Watermark) */}
            <div className="absolute -top-6 -left-10 text-9xl font-black text-white/15 -rotate-12 pointer-events-none select-none">
              SALE
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="h-1 w-6 bg-white/40 rounded-full" />
                <p className="text-white/80 font-bold uppercase text-[10px] tracking-[0.2em]">
                  {t("limitedOffer")}
                </p>
              </div>
              <h2 className="text-3xl font-black text-white leading-tight">
                {t("deliveryTime")} <br />
                <span className="text-white/80">{t("fastDelivery")}</span>
              </h2>
            </div>

            <div className="relative z-10 flex items-end justify-between">
              <Link
                href="/products"
                className="h-14 w-14 bg-white rounded-2xl flex  items-center justify-center text-secondary shadow-lg hover:scale-105 hover:rotate-3 transition-all duration-300"
              >
                <ArrowRight className="h-7 w-7 rtl:rotate-180" />
              </Link>

              {/* أيقونة النسبة المئوية بتصميم Glassmorphism مطور */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/50 blur-xl rounded-full animate-pulse" />
                <div className="relative bg-white/20 backdrop-blur-xl p-4 rounded-2xl border border-white/30 shadow-inner">
                  <Percent className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            {/* 3. عناصر تزيينية دائرية محسنة (Blurred Orbs) */}
            <div className="absolute bottom-[-10%] right-[-10%] w-32 h-32 bg-white/50 rounded-full blur-3xl group-hover:bg-white/30 transition-colors" />
            <div className="absolute top-[20%] right-[-5%] w-16 h-16 bg-white/50 rounded-full blur-xl" />
          </div>
          {/* Card 2: New Collection */}
          <div className="flex-1 relative overflow-hidden rounded-[2rem] bg-white border-2 border-slate-100 dark:bg-slate-800 dark:border-slate-700 p-8 flex flex-col justify-between shadow-lg group">
            <div className="z-10">
              <Image
                src="/circuit.svg"
                alt="overlay"
                width={330}
                height={330}
                className="absolute bottom-0 rtl:left-0 opacity-[0.08] ltr:right-0 rtl:scale-x-[-1] pointer-events-none mix-blend-overlay bg-repeat "
              />
              <h3 className="text-xl font-black text-slate-800 dark:text-white">
                {t("shoppingRedefined")}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                {t("secure")}
              </p>
            </div>
            <div className="z-10 self-end">
              <Button
                variant="ghost"
                className="text-primary font-black hover:bg-primary/10"
              >
                {t("viewCatalog")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            {/* Watermark Logo */}
            <div className="absolute -bottom-10 -right-5 text-9xl font-black text-slate-200/80 dark:text-slate-700/30 -rotate-12 pointer-events-none uppercase">
              Nova
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
