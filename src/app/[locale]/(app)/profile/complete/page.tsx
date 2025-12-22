// "use client";

// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import AddressStep from "@/components/profile/AddressStep";
// import PreferencesStep from "@/components/profile/PreferencesStep";
// import { useProfileStep, useUpdateProfileStep } from "@/hooks/useProfile";

// export default function ProfileCompletePage() {
//   const { data: session, update, status } = useSession();
//   console.log("🚀 ~ ProfileCompletePage ~ session:", session);

//   const router = useRouter();
//   const { data } = useProfileStep();
//   const { mutate: updateStep } = useUpdateProfileStep();

//   const currentStep = data?.currentStep;
//   console.log("🚀 ~ ProfileCompletePage ~ currentStep:", currentStep);
//   const isComplete = data?.isComplete;

//   // const [currentStep, setCurrentStep] = useState<number | null>(null);
//   const [localStep, setLocalStep] = useState<number | undefined>();

//   useEffect(() => {
//     if (currentStep !== null) {
//       setLocalStep(currentStep);
//     }
//   }, [currentStep]);

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/auth/login");
//     }
//   }, [status, router]);

//   useEffect(() => {
//     if (isComplete && session?.user?.isProfileComplete) {
//       router.push("/");
//     }
//   }, [isComplete, session, router]);

//   const handleStepComplete = async (step: number) => {
//     if (step === 3) {
//       // ✅ Profile completed - handled in useCompleteProfile hook
//       await update({ isProfileComplete: true });
//       return;
//       // router.push("/");
//     } else {
//       const nextStep = step + 1;
//       setLocalStep(nextStep);
//       updateStep(nextStep);
//     }
//   };
//   // ✅ Loading State
//   // if (isLoading || status === "loading" || localStep === null) {
//   //   return (
//   //     <div className="flex items-center justify-center min-h-screen">
//   //       <Loader2 className="h-8 w-8 animate-spin text-primary" />
//   //     </div>
//   //   );
//   // }

//   // const progress = (currentStep / 3) * 100;

//   return (
//     <div className="container max-w-2xl py-10 mx-auto">
//       <Card>
//         <CardHeader>
//           <CardTitle>Complete Your Profile</CardTitle>
//           <CardDescription>
//             Step {localStep} of 3 - Let&apos;s set up your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {localStep === 1 && (
//             <AddressStep onComplete={() => handleStepComplete(1)} />
//           )}
//           {localStep === 2 && (
//             <PreferencesStep onComplete={() => handleStepComplete(3)} />
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// src\app\[locale]\(app)\profile\complete\page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MapPin, Settings2, ShieldCheck, UserPlus } from "lucide-react";

import { useProfileStep, useUpdateProfileStep } from "@/hooks/useProfile";
import AddressStep from "@/components/profile/AddressStep";
import PreferencesStep from "@/components/profile/PreferencesStep";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { StepItem, Stepper } from "@/temp/Stepper";

export const PROFILE_STEPS: StepItem[] = [
  { id: "account", label: "Create Account", icon: UserPlus },
  { id: "verify", label: "Verification", icon: ShieldCheck },
  { id: "address", label: "Address Details", icon: MapPin },
  { id: "pref", label: "Preferences", icon: Settings2 },
];

export default function ProfileCompletePage() {
  const { data: session, update, status } = useSession();

  const router = useRouter();
  const { data } = useProfileStep();
  const { mutate: updateStep } = useUpdateProfileStep();

  const currentStep = data?.currentStep;
  // const isComplete = data?.isComplete;

  const [localStep, setLocalStep] = useState<number | undefined>();

  useEffect(() => {
    if (currentStep !== null) setLocalStep(currentStep);
  }, [currentStep]);

  const handleStepComplete = async (step: number) => {
    if (step === 3) {
      await update({ isProfileComplete: true });
      router.push("/");
      router.refresh();
    } else {
      const nextStep = step + 1;
      setLocalStep(nextStep);
      updateStep(nextStep);
    }
  };

  // Calculate Stepper Index:
  // Since "Account" and "Verify" are done, logic starts at Address.
  // localStep 1 (Address) -> Index 2 in Stepper
  // localStep 2 (Preferences) -> Index 3 in Stepper
  const stepperIndex = localStep ? localStep + 1 : 2;

  // if (status === "loading" || localStep === undefined) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //       <div className="flex flex-col items-center gap-4">
  //         <div className="h-10 w-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
  //         <p className="text-sm font-medium text-gray-500 animate-pulse">
  //           Synchronizing Profile...
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="h-screen w-full flex">
      {/* (Visual Sidebar) - Hidden on Mobile */}
      <ProfileSidebar currentStepIndex={stepperIndex} />

      {/*  (Main Content) */}
      <div className="w-full overflow-y-auto ">
        <div className="bg-emerald-50/30 backdrop-blur-md border-b-2 border-emerald-200 lg:hidden sticky top-0 z-10">
          <Stepper steps={PROFILE_STEPS} currentStepIndex={stepperIndex} />
        </div>
        <div className="w-full px-4 sm:px-6 md:px-8 py-8 md:py-12 max-w-7xl mx-auto">
          <div className=" animate-in fade-in slide-in-from-bottom-4 duration-500">
            {localStep === 1 && (
              <AddressStep onComplete={() => handleStepComplete(1)} />
            )}
            {localStep === 2 && (
              <PreferencesStep onComplete={() => handleStepComplete(2)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
