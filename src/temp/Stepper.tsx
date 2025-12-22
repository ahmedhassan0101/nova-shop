"use client";
import React from "react";
import { Check, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepItem {
  id: number | string;
  label: string;
  icon?: LucideIcon;
  description?: string;
}

interface StepperProps {
  steps: StepItem[];
  currentStepIndex: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Stepper({
  steps,
  currentStepIndex,
  orientation = "horizontal",
  className,
}: StepperProps) {
  const isVertical = orientation === "vertical";
  return (
    <div
      className={cn(
        "w-full flex",
        isVertical
          ? "flex-col gap-0"
          : "flex-row items-center justify-center relative md:p-5 w-11/12 mx-auto md:mb-4 mb-8 px-4 py-5 ",
        className
      )}
    >
      {/* <div className="w-full flex items-center justify-between relative p-7 mb-5"> */}
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isActive = index === currentStepIndex;
        const isLastStep = index === steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            {/* Step Circle & Label */}
            <div
              className={cn(
                "relative flex z-10",
                isVertical ? "flex-row  items-center" : "flex-col items-center"
              )}
            >
              {/* Circle Container */}
              <div
                className={cn(
                  "flex items-center justify-center transition-all duration-300 border-2 rounded-2xl shrink-0 bg-white relative group",
                  // Responsive Sizes (Mobile vs Desktop)
                  "size-8 md:size-10 text-xs md:text-sm",
                  isActive
                    ? "border-emerald-500 ring-4 ring-emerald-100 m-1 bg-gradient-to-br from-emerald-50 to-white shadow-lg shadow-emerald-500/20 scale-110"
                    : isCompleted
                      ? "border-emerald-500 bg-emerald-500 text-white  bg-gradient-to-br from-emerald-500 to-emerald-600  shadow-md hover:shadow-lg hover:scale-105"
                      : "border-gray-200 text-gray-500 hover:border-gray-300 hover:scale-105"
                )}
              >
               
                
                
                {isCompleted ? (
                  <Check className="size-4 md:size-5 animate-in zoom-in duration-300" />
                ) : step.icon ? (
                  <step.icon
                    className={cn(
                      "size-4 md:size-5 duration-300",
                      isActive ? "text-emerald-600" : "text-gray-400"
                    )}
                  />
                ) : (
                  <span className="font-bold">{index + 1}</span>
                )}
              </div>

              {/* Label */}
              <div
                className={cn(
                  "flex flex-col transition-colors duration-300",
                  isVertical
                    ? "ms-3 items-center text-start"
                    : "items-center text-center absolute top-10 md:top-12 md:min-w-[110px] overflow-hidden"
                )}
              >
                <span
                  className={cn(
                    "text-sm font-semibold leading-none",
                    isActive
                      ? "text-emerald-500"
                      : isCompleted
                        ? "text-emerald-400"
                        : "text-gray-500"
                  )}
                >
                  {step.label}
                </span>
              </div>
            </div>

            {/* Connector Line (The logic ensures no line after the last step) */}
            {/* --- Horizontal Connector Line --- */}
            {!isVertical && !isLastStep && (
              <div className="flex-1 h-[2.5px] mx-2 bg-gray-300 relative rounded-full overflow-hidden  ">
                <div
                  className={cn(
                    "absolute top-0 left-0 h-full w-full bg-gradient-to-r from-emerald-200 to-emerald-500  transition-all duration-500 ease-in-out",
                    "origin-left rtl:origin-right",
                    isCompleted ? "w-full" : "w-0"
                  )}
                />
              </div>
            )}
            {isVertical && !isLastStep && (
              <div className="  md:start-5 ms-4.5 my-2 w-[2px] h-8 rounded-full  bg-gray-200">
                {/* Vertical Progress Fill */}
                <div
                  className={cn(
                    "w-full bg-gradient-to-b from-emerald-100 to-emerald-500  transition-all duration-500 origin-top",
                    isCompleted ? "h-full" : "h-0"
                  )}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// const CHECKOUT_STEPS: StepItem[] = [
//   {
//     id: "account",
//     label: "Create Account",
//     icon: UserPlus,
//     description: "Basic Info",
//   },
//   {
//     id: "verify",
//     label: "Verification",
//     icon: ShieldCheck,
//     description: "Security Check",
//   },
//   {
//     id: "address",
//     label: "Address Details",
//     icon: MapPin,
//     description: "Shipping Info",
//   },
//   {
//     id: "pref",
//     label: "Preferences",
//     icon: Settings2,
//     description: "Customize",
//   },
// ];

// export default function MultiStepFormPage() {
//   // State for logic control
//   const [currentStepIndex, setCurrentStepIndex] = useState(0);

//   // Derived State
//   const isFirstStep = currentStepIndex === 0;
//   const isLastStep = currentStepIndex === CHECKOUT_STEPS.length - 1;

//   // Handlers
//   const handleNext = () => {
//     if (!isLastStep) {
//       setCurrentStepIndex((prev) => prev + 1);
//     } else {
//       alert("Form Submitted Successfully!");
//     }
//   };

//   const handleBack = () => {
//     if (!isFirstStep) {
//       setCurrentStepIndex((prev) => prev - 1);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 px-4">
//       {/* Container for the form */}
//       <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg space-y-12 border border-gray-100">
//         {/* 1. Header & Stepper UI */}
//         <div className="space-y-4">
//           <h2 className="text-2xl font-bold text-center text-gray-800">
//             Registration Process
//           </h2>
//           <div className="py-6">
//             <Stepper
//               steps={CHECKOUT_STEPS}
//               currentStepIndex={currentStepIndex}
//             />
//           </div>
//         </div>

//         {/* 2. Form Content Area (Dynamic Content) */}
//         <div className="min-h-[200px] flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
//           <div className="text-center space-y-2">
//             <h3 className="text-xl font-semibold text-gray-700">
//               Step {currentStepIndex + 1}:{" "}
//               {CHECKOUT_STEPS[currentStepIndex].label}
//             </h3>
//             <p className="text-gray-500">
//               This is where the content for{" "}
//               <span className="font-mono text-emerald-600">
//                 Step {currentStepIndex + 1}
//               </span>{" "}
//               goes.
//             </p>
//           </div>
//         </div>

//         {/* 3. Navigation Controls */}
//         <div className="flex justify-between items-center pt-4 border-t">
//           <Button
//             variant="outline"
//             onClick={handleBack}
//             disabled={isFirstStep}
//             className="w-32 hover:bg-gray-100"
//           >
//             Back
//           </Button>

//           <Button
//             onClick={handleNext}
//             className="w-32 bg-emerald-600 hover:bg-emerald-700 text-white"
//           >
//             {isLastStep ? "Finish" : "Next"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
