// "use client";

// import { useFieldArray } from "react-hook-form";
// import {
//   profileCompletionStep2Schema,
//   ProfileStep2Input,
// } from "@/lib/schemas/auth";
// import { Button } from "@/components/ui/button";
// import { Plus, Trash2 } from "lucide-react";
// import { useFormHandler } from "@/hooks/useFormHandler";
// import { Form } from "../ui/form";
// import { FormInput } from "../form-fields/FormInput";
// import { FormCheckbox } from "../form-fields/FormCheckbox";
// import { FormCountryPicker } from "../form-fields/FormCountryPicker";
// import { useTranslations } from "next-intl";
// import { useAddressStep } from "@/hooks/useProfile";
// import { useEffect } from "react";

// interface AddressStepProps {
//   onComplete: () => void;
// }

// export default function AddressStep({ onComplete }: AddressStepProps) {
//   const t = useTranslations("profile");

//   const { mutate, isPending, isSuccess } = useAddressStep();

//   const handleSubmit = async (data: ProfileStep2Input) => {
//     mutate({ step: 2, data });
//   };

//   useEffect(() => {
//     if (isSuccess) onComplete();
//   }, [isSuccess, onComplete]);

//   const { form, onSubmit } = useFormHandler({
//     schema: profileCompletionStep2Schema,
//     defaultValues: {
//       addresses: [
//         {
//           label: "Home",
//           fullName: "",
//           phone: "",
//           street: "",
//           city: "",
//           state: "",
//           postalCode: "",
//           country: "EGY",
//           isDefault: true,
//         },
//       ],
//     },
//     onSubmit: handleSubmit,
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "addresses",
//   });

//   const handleDefaultChange = (index: number, checked: boolean) => {
//     if (checked) {
//       fields.forEach((_, idx) => {
//         if (idx !== index) {
//           form.setValue(`addresses.${idx}.isDefault`, false);
//         }
//       });
//       form.setValue(`addresses.${index}.isDefault`, true);
//     } else {
//       const hasOtherDefault = fields.some(
//         (_, idx) =>
//           idx !== index && form.getValues(`addresses.${idx}.isDefault`)
//       );

//       if (!hasOtherDefault && fields.length > 1) {
//         form.setValue(`addresses.0.isDefault`, true);
//       }
//     }
//   };

//   const appendAddress = () => {
//     append({
//       label: "",
//       fullName: "",
//       phone: "",
//       street: "",
//       city: "",
//       state: "",
//       postalCode: "",
//       country: "",
//       isDefault: false,
//     });
//   };

//   const removeAddress = (index: number) => {
//     const isDefaultAddress = form.getValues(`addresses.${index}.isDefault`);
//     remove(index);
//     if (isDefaultAddress && fields.length > 1) {
//       setTimeout(() => {
//         form.setValue(`addresses.0.isDefault`, true);
//       }, 0);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={onSubmit} className="space-y-6">
//         {/* Address List */}
//         <div className="space-y-4">
//           {fields.map((field, index) => {
//             const isDefaultAddress = form.watch(`addresses.${index}.isDefault`);

//             return (
//               <div
//                 key={field.id}
//                 className={`p-4 border rounded-lg space-y-4 transition-all ${
//                   isDefaultAddress
//                     ? "border-primary bg-primary/5"
//                     : "border-border"
//                 }`}
//               >
//                 {/* Header */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <h3 className="font-medium">
//                       {t("address")} {index + 1}
//                     </h3>
//                     {isDefaultAddress && (
//                       <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
//                         {t("default")}
//                       </span>
//                     )}
//                   </div>
//                   {(fields.length > 1 || !isDefaultAddress) && (
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => removeAddress(index)}
//                       disabled={isPending}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   )}
//                 </div>

//                 {/* Form Fields */}
//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <FormInput
//                     control={form.control}
//                     name={`addresses.${index}.label`}
//                     label={t("label")}
//                     placeholder={t("labelPlaceholder")}
//                     disabled={isPending}
//                   />

//                   <FormInput
//                     control={form.control}
//                     name={`addresses.${index}.fullName`}
//                     label={t("fullName")}
//                     placeholder={t("fullNamePlaceholder")}
//                     disabled={isPending}
//                   />

//                   <FormInput
//                     control={form.control}
//                     name={`addresses.${index}.phone`}
//                     label={t("phone")}
//                     placeholder={t("phonePlaceholder")}
//                     disabled={isPending}
//                   />

//                   <FormCountryPicker
//                     control={form.control}
//                     name={`addresses.${index}.country`}
//                     label={t("country")}
//                     placeholder={t("countryPlaceholder")}
//                     disabled={isPending}
//                   />

//                   <FormInput
//                     control={form.control}
//                     name={`addresses.${index}.street`}
//                     label={t("street")}
//                     placeholder={t("streetPlaceholder")}
//                     className="sm:col-span-2"
//                     disabled={isPending}
//                   />

//                   <FormInput
//                     control={form.control}
//                     name={`addresses.${index}.city`}
//                     label={t("city")}
//                     placeholder={t("cityPlaceholder")}
//                     disabled={isPending}
//                   />

//                   <FormInput
//                     control={form.control}
//                     name={`addresses.${index}.state`}
//                     label={t("state")}
//                     placeholder={t("statePlaceholder")}
//                     disabled={isPending}
//                   />

//                   <FormInput
//                     control={form.control}
//                     name={`addresses.${index}.postalCode`}
//                     label={t("postalCode")}
//                     placeholder={t("postalCodePlaceholder")}
//                     disabled={isPending}
//                   />
//                 </div>

//                 {/* Default Checkbox */}
//                 <div className="pt-2">
//                   <FormCheckbox
//                     control={form.control}
//                     name={`addresses.${index}.isDefault`}
//                     label={t("setAsDefault")}
//                     disabled={
//                       isPending || (isDefaultAddress && fields.length === 1)
//                     }
//                     onChange={(checked) => handleDefaultChange(index, checked)}
//                   />
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Add Button */}
//         <Button
//           type="button"
//           variant="outline"
//           onClick={appendAddress}
//           disabled={isPending || fields.length >= 5}
//           className="w-full"
//         >
//           <Plus className="mr-2 h-4 w-4" />
//           {t("addAddress")}
//         </Button>

//         {/* Submit Button */}
//         <Button type="submit" className="w-full" disabled={isPending}>
//           {isPending ? t("saving") : t("continue")}
//         </Button>
//       </form>
//     </Form>
//   );
// }
// "use client";

// import { useFieldArray } from "react-hook-form";
// import {
//   profileCompletionStep2Schema,
//   ProfileStep2Input,
// } from "@/lib/schemas/auth";
// import { Button } from "@/components/ui/button";
// import { Plus, Trash2, Home, Building2, MapPin } from "lucide-react";
// import { useFormHandler } from "@/hooks/useFormHandler";
// import { Form } from "../ui/form";
// import { FormInput } from "../form-fields/FormInput";
// import { FormCheckbox } from "../form-fields/FormCheckbox";
// import { FormCountryPicker } from "../form-fields/FormCountryPicker";
// import { useTranslations } from "next-intl";
// import { useAddressStep } from "@/hooks/useProfile";
// import { useEffect } from "react";
// import { cn } from "@/lib/utils";
// import { motion } from "framer-motion";

// interface AddressStepProps {
//   onComplete: () => void;
// }

// export default function AddressStep({ onComplete }: AddressStepProps) {
//   const t = useTranslations("profile");
//   const { mutate, isPending, isSuccess } = useAddressStep();

//   const handleSubmit = async (data: ProfileStep2Input) => {
//     mutate({ step: 2, data });
//   };

//   useEffect(() => {
//     if (isSuccess) onComplete();
//   }, [isSuccess, onComplete]);

//   const { form, onSubmit } = useFormHandler({
//     schema: profileCompletionStep2Schema,
//     defaultValues: {
//       addresses: [
//         {
//           label: "Home",
//           fullName: "",
//           phone: "",
//           street: "",
//           city: "",
//           state: "",
//           postalCode: "",
//           country: "EGY",
//           isDefault: true,
//         },
//       ],
//     },
//     onSubmit: handleSubmit,
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "addresses",
//   });

//   // ... (Logic for Default Change - Same as before) ...
//   const handleDefaultChange = (index: number, checked: boolean) => {
//     if (checked) {
//       fields.forEach((_, idx) => {
//         if (idx !== index) form.setValue(`addresses.${idx}.isDefault`, false);
//       });
//       form.setValue(`addresses.${index}.isDefault`, true);
//     } else {
//       // Logic kept same as provided
//       const hasOtherDefault = fields.some(
//         (_, idx) =>
//           idx !== index && form.getValues(`addresses.${idx}.isDefault`)
//       );
//       if (!hasOtherDefault && fields.length > 1)
//         form.setValue(`addresses.0.isDefault`, true);
//     }
//   };

//   const removeAddress = (index: number) => {
//     const isDefaultAddress = form.getValues(`addresses.${index}.isDefault`);
//     remove(index);
//     if (isDefaultAddress && fields.length > 1) {
//       setTimeout(() => form.setValue(`addresses.0.isDefault`, true), 0);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <div className="space-y-1">
//         <h2 className="text-2xl font-semibold text-gray-900">
//           {t("addressInfoTitle", { defaultValue: "Shipping Addresses" })}
//         </h2>
//         <p className="text-sm text-muted-foreground">
//           {t("addressInfoDesc", {
//             defaultValue: "Manage your shipping locations for faster checkout.",
//           })}
//         </p>
//       </div>

//       <Form {...form}>
//         <form onSubmit={onSubmit} className="space-y-8">
//           <div className="space-y-6">
//             {fields.map((field, index) => {
//               const isDefaultAddress = form.watch(
//                 `addresses.${index}.isDefault`
//               );

//               return (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   key={field.id}
//                   className={cn(
//                     "group relative p-6 rounded-xl border-2 transition-all duration-300",
//                     isDefaultAddress
//                       ? "border-emerald-500 bg-emerald-50/30 shadow-sm"
//                       : "border-gray-100 bg-white hover:border-emerald-200 hover:shadow-sm"
//                   )}
//                 >
//                   {/* Badge & Remove Header */}
//                   <div className="flex items-center justify-between mb-6">
//                     <div className="flex items-center gap-3">
//                       <div
//                         className={cn(
//                           "p-2 rounded-lg",
//                           isDefaultAddress
//                             ? "bg-emerald-100 text-emerald-700"
//                             : "bg-gray-100 text-gray-600"
//                         )}
//                       >
//                         {index === 0 ? (
//                           <Home className="w-5 h-5" />
//                         ) : (
//                           <Building2 className="w-5 h-5" />
//                         )}
//                       </div>
//                       <h3 className="font-semibold text-lg text-gray-800">
//                         {t("address")} {index + 1}
//                       </h3>
//                       {isDefaultAddress && (
//                         <span className="text-xs font-bold bg-emerald-600 text-white px-3 py-1 rounded-full shadow-sm">
//                           {t("default")}
//                         </span>
//                       )}
//                     </div>
//                     {(fields.length > 1 || !isDefaultAddress) && (
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="icon"
//                         className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
//                         onClick={() => removeAddress(index)}
//                         disabled={isPending}
//                       >
//                         <Trash2 className="h-5 w-5" />
//                       </Button>
//                     )}
//                   </div>

//                   {/* Modern Grid Layout */}
//                   <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
//                     <FormInput
//                       control={form.control}
//                       name={`addresses.${index}.label`}
//                       label={t("label")}
//                       placeholder="e.g. Home, Office"
//                       disabled={isPending}
//                     />
//                     <FormInput
//                       control={form.control}
//                       name={`addresses.${index}.fullName`}
//                       label={t("fullName")}
//                       placeholder="John Doe"
//                       disabled={isPending}
//                     />
//                     <FormInput
//                       control={form.control}
//                       name={`addresses.${index}.phone`}
//                       label={t("phone")}
//                       placeholder="+20 1xxxxxxxxx"
//                       disabled={isPending}
//                     />
//                     <FormCountryPicker
//                       control={form.control}
//                       name={`addresses.${index}.country`}
//                       label={t("country")}
//                       placeholder="Select Country"
//                       disabled={isPending}
//                     />

//                     <div className="sm:col-span-2">
//                       <FormInput
//                         control={form.control}
//                         name={`addresses.${index}.street`}
//                         label={t("street")}
//                         placeholder="Street Address, Apt, Suite"
//                         disabled={isPending}
//                       />
//                     </div>

//                     <div className="grid grid-cols-3 gap-4 sm:col-span-2">
//                       <FormInput
//                         control={form.control}
//                         name={`addresses.${index}.city`}
//                         label={t("city")}
//                         placeholder="Cairo"
//                         disabled={isPending}
//                       />
//                       <FormInput
//                         control={form.control}
//                         name={`addresses.${index}.state`}
//                         label={t("state")}
//                         placeholder="Cairo"
//                         disabled={isPending}
//                       />
//                       <FormInput
//                         control={form.control}
//                         name={`addresses.${index}.postalCode`}
//                         label={t("postalCode")}
//                         placeholder="11311"
//                         disabled={isPending}
//                       />
//                     </div>
//                   </div>

//                   {/* Footer Actions */}
//                   <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
//                     <FormCheckbox
//                       control={form.control}
//                       name={`addresses.${index}.isDefault`}
//                       label={t("setAsDefault")}
//                       disabled={
//                         isPending || (isDefaultAddress && fields.length === 1)
//                       }
//                       onChange={(checked) =>
//                         handleDefaultChange(index, checked)
//                       }
//                       className="text-emerald-600 focus:ring-emerald-500"
//                     />
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>

//           {/* Dashed Add Button */}
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() =>
//               append({
//                 label: "",
//                 fullName: "",
//                 phone: "",
//                 street: "",
//                 city: "",
//                 state: "",
//                 postalCode: "",
//                 country: "",
//                 isDefault: false,
//               })
//             }
//             disabled={isPending || fields.length >= 5}
//             className="w-full h-14 border-2 border-dashed border-gray-200 text-gray-500 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all rounded-xl text-base font-medium"
//           >
//             <Plus className="mr-2 h-5 w-5" />
//             {t("addAddress")}
//           </Button>

//           <Button
//             type="submit"
//             size="lg"
//             className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg h-12 shadow-lg shadow-emerald-200 transition-all rounded-xl"
//             disabled={isPending}
//           >
//             {isPending ? t("saving") : t("continue")}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useTranslations } from "next-intl";
import {
  Plus,
  Trash2,
  MapPin,
  CheckCircle2,
  MapPinHouse,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { useFormHandler } from "@/hooks/useFormHandler";
import { useAddressStep } from "@/hooks/useProfile";
import {
  profileCompletionStep2Schema,
  ProfileStep2Input,
} from "@/lib/schemas/auth";

// Custom Form Fields
import { FormInput } from "../form-fields/FormInput";
import { FormCheckbox } from "../form-fields/FormCheckbox";
import { FormCountryPicker } from "../form-fields/FormCountryPicker";

interface AddressStepProps {
  onComplete: () => void;
}

export default function AddressStep({ onComplete }: AddressStepProps) {
  const t = useTranslations("profile");
  const { mutate, isPending, isSuccess } = useAddressStep();
  const [expandedCard, setExpandedCard] = useState<number>(0);

  const handleSubmit = async (data: ProfileStep2Input) => {
    mutate({ step: 2, data });
  };

  useEffect(() => {
    if (isSuccess) onComplete();
  }, [isSuccess, onComplete]);

  const { form, onSubmit } = useFormHandler({
    schema: profileCompletionStep2Schema,
    defaultValues: {
      addresses: [
        {
          label: "Home",
          fullName: "",
          phone: "",
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "EGY",
          isDefault: true,
        },
      ],
    },
    onSubmit: handleSubmit,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "addresses",
  });

  const handleDefaultChange = (index: number, checked: boolean) => {
    if (checked) {
      fields.forEach((_, idx) => {
        if (idx !== index) form.setValue(`addresses.${idx}.isDefault`, false);
      });
      form.setValue(`addresses.${index}.isDefault`, true);
    } else {
      const hasOtherDefault = fields.some(
        (_, idx) =>
          idx !== index && form.getValues(`addresses.${idx}.isDefault`)
      );
      if (!hasOtherDefault && fields.length > 1) {
        form.setValue(`addresses.0.isDefault`, true);
      }
    }
  };

  const removeAddress = (index: number) => {
    const isDefaultAddress = form.getValues(`addresses.${index}.isDefault`);
    remove(index);
    if (isDefaultAddress && fields.length > 1) {
      setTimeout(() => form.setValue(`addresses.0.isDefault`, true), 0);
    }
  };

  return (
    <div className="w-full container mx-auto space-y-5">
      {/* Header Section */}
      <div className="flex flex-col gap-2 rounded-3xl bg-card p-6 shadow-sm border-2">
        <h2 className="flex items-center gap-2 text-3xl font-bold tracking-tight text-foreground">
          <MapPinHouse className="w-6 h-6 text-emerald-600" />
          {t("addressInfoTitle", { defaultValue: "Shipping Addresses" })}
        </h2>
        <p className="text-muted-foreground text-base">
          {t("addressInfoDesc", {
            defaultValue:
              "Add your delivery locations. We'll use the default one for shipping.",
          })}
        </p>
      </div>

      {/* className="space-y-8" */}
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="space-y-3">
            {fields.map((field, index) => {
              const isDefaultAddress = form.watch(
                `addresses.${index}.isDefault`
              );
              // <div
              //   className={cn(
              //     "p-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-300 overflow-hidden",
              //     expandedCard !== index && "max-h-0 p-0 opacity-0"
              //   )}
              // >
              //   {/* الحقول الموجودة */}
              // </div>;
              return (
                <div
                  key={field.id}
                  className={cn(
                    "relative border-2 bg-card text-card-foreground last:rounded-b-3xl  first:rounded-t-3xl shadow-sm transition-all duration-200",
                    isDefaultAddress
                      ? "border-emerald-500 shadow-md shadow-emerald-100"
                      : "border-gray-100 hover:border-emerald-200"
                    // ? "border-primary ring-1 ring-primary/20"
                    // : "border-border hover:border-primary/50"
                  )}
                >
                  {isDefaultAddress && (
                    <div className="absolute -top-3 left-6 bg-emerald-500 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                      Primary Address
                    </div>
                  )}
                  {/* Card Header & Actions */}
                  <div className="flex items-center justify-between border-b bg-muted/30 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-2xl transition-colors",
                          isDefaultAddress
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <MapPin className="h-5 w-5" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-semibold leading-none tracking-tight">
                          {t("address")} {index + 1}
                        </h3>
                        {/* {isDefaultAddress && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                            <CheckCircle2 className="h-3 w-3" />
                            {t("default")}
                          </span>
                        )} */}
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setExpandedCard(expandedCard === index ? -1 : index)
                      }
                    >
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          expandedCard === index && "rotate-180"
                        )}
                      />
                    </Button>
                    {(fields.length > 1 || !isDefaultAddress) && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeAddress(index)}
                        disabled={isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {/* "p-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-300 overflow-hidden",
              //     expandedCard !== index && "max-h-0 p-0 opacity-0" */}
                  {/* Form Fields Grid */}
                  <div
                    className={cn(
                      "p-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-300 overflow-hidden",
                      expandedCard !== index && "max-h-0 p-0 opacity-0"
                    )}
                  >
                    {/* Row 1: Basic Info */}
                    <FormInput
                      control={form.control}
                      name={`addresses.${index}.label`}
                      label={t("label")}
                      placeholder="e.g. Home, Office"
                      disabled={isPending}
                    />
                    <FormInput
                      control={form.control}
                      name={`addresses.${index}.fullName`}
                      label={t("fullName")}
                      placeholder="John Doe"
                      disabled={isPending}
                    />
                    <FormInput
                      control={form.control}
                      name={`addresses.${index}.phone`}
                      label={t("phone")}
                      placeholder="+20 1xxxxxxxxx"
                      disabled={isPending}
                    />

                    {/* Row 2: Location */}
                    <FormCountryPicker
                      control={form.control}
                      name={`addresses.${index}.country`}
                      label={t("country")}
                      placeholder="Select Country"
                      disabled={isPending}
                    />
                    <div className="sm:col-span-2 lg:col-span-2">
                      <FormInput
                        control={form.control}
                        name={`addresses.${index}.street`}
                        label={t("street")}
                        placeholder="Street Address, Apt, Suite"
                        disabled={isPending}
                      />
                    </div>

                    {/* Row 3: Details */}
                    <FormInput
                      control={form.control}
                      name={`addresses.${index}.city`}
                      label={t("city")}
                      placeholder="City"
                      disabled={isPending}
                    />
                    <FormInput
                      control={form.control}
                      name={`addresses.${index}.state`}
                      label={t("state")}
                      placeholder="State / Province"
                      disabled={isPending}
                    />
                    <FormInput
                      control={form.control}
                      name={`addresses.${index}.postalCode`}
                      label={t("postalCode")}
                      placeholder="Postal Code"
                      disabled={isPending}
                    />
                  </div>

                  {/* Card Footer */}
                  <div className="border-t bg-muted/30 px-6 py-4  flex items-center">
                    <FormCheckbox
                      control={form.control}
                      name={`addresses.${index}.isDefault`}
                      label={t("setAsDefault")}
                      disabled={
                        isPending || (isDefaultAddress && fields.length === 1)
                      }
                      onChange={(checked) =>
                        handleDefaultChange(index, checked)
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6 pt-6 border-t-2">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  label: "",
                  fullName: "",
                  phone: "",
                  street: "",
                  city: "",
                  state: "",
                  postalCode: "",
                  country: "",
                  isDefault: false,
                })
              }
              disabled={isPending || fields.length >= 5}
              className="h-12 rounded-2xl border-dashed border-2 border-gray-400 hover:border-primary hover:bg-primary/5 transition-colors lg:col-span-2"
            >
              <Plus className="mr-2 h-4 w-4" />
              {t("addAddress")}
            </Button>
            <Button
              type="submit"
              size="lg"
              className="h-12 rounded-2xl font-semibold"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  {t("saving")}
                </>
              ) : (
                t("continue")
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
