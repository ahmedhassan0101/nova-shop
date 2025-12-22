// import ProfileStepper from "./ProfileStepper";

import { PROFILE_STEPS } from "@/app/[locale]/(app)/profile/complete/page";
import { Stepper } from "@/temp/Stepper";
import { Gift, Shield, Sparkles, Zap } from "lucide-react";

export default function ProfileSidebar({
  currentStepIndex,
}: {
  currentStepIndex: number;
}) {
  return (
    <div className="hidden lg:flex w-1/3 xl:w-1/4 bg-slate-900 text-white relative overflow-hidden flex-col justify-between p-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/circuit.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />
      <div className="relative z-10 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Complete Your <br />
          <span className="text-emerald-400">Shopping ID</span>
        </h1>
        <p className="text-slate-400 leading-relaxed">
          You are just a few steps away from a personalized shopping experience.
        </p>
      </div>
      <div className="relative z-10 space-y-8">
        {/* Progress Overview Card */}
        {/* <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-400">Overall Progress</span>
            <span className="text-lg font-bold text-emerald-400">
              {Math.round((currentStepIndex / PROFILE_STEPS.length) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-500 ease-out"
              style={{
                width: `${(currentStepIndex / PROFILE_STEPS.length) * 100}%`,
              }}
            />
          </div>
        </div> */}

        {/* Benefits List */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            What You'll Get
          </h3>
          {[
            { icon: Zap, text: "Faster Checkout" },
            { icon: Gift, text: "Personalized Offers" },
            { icon: Shield, text: "Secure Shipping" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-slate-400 group hover:text-emerald-400 transition-colors"
            >
              <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-emerald-500/10 transition-colors">
                <item.icon className="w-4 h-4" />
              </div>
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Stepper
        steps={PROFILE_STEPS}
        currentStepIndex={currentStepIndex}
        orientation="vertical"
      />
      <div className="relative z-10">
        <p className="text-xs text-slate-500">© 2025 Global Market Inc.</p>
      </div>
    </div>
  );
}
// أضف فوق الـ Stepper في الـ sidebar:
