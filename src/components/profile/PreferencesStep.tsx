/* eslint-disable @typescript-eslint/no-explicit-any */
// components/profile/PreferencesStep.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileCompletionStep3Schema,
  ProfileStep3Input,
} from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  User,
  Globe,
  Bell,
  Calendar,
  Mail,
  CheckCircle2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface PreferencesStepProps {
  onComplete: () => void;
}

export default function PreferencesStep({ onComplete }: PreferencesStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProfileStep3Input>({
    resolver: zodResolver(profileCompletionStep3Schema),
    defaultValues: {
      preferredLanguage: "ar",
      newsletter: false,
    },
  });

  const onSubmit = async (data: ProfileStep3Input) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/user/complete-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: 3,
          data: {
            ...data,
            dateOfBirth: data.dateOfBirth
              ? new Date(data.dateOfBirth)
              : undefined,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update preferences");
      }

      // Success animation قبل الانتقال
      await new Promise((resolve) => setTimeout(resolve, 500));
      onComplete();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 animate-in fade-in duration-500"
    >
      {/* Personal Information Section */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <p className="text-sm text-muted-foreground">
                Help us personalize your experience
              </p>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              Date of Birth
              <span className="text-xs text-muted-foreground">(Optional)</span>
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              max={new Date().toISOString().split("T")[0]}
              {...register("dateOfBirth")}
              disabled={isLoading}
              className="w-full"
            />
            {errors.dateOfBirth && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <span className="text-xs">⚠️</span>
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Gender
              <span className="text-xs text-muted-foreground">(Optional)</span>
            </Label>
            <RadioGroup
              value={watch("gender") || ""}
              onValueChange={(value: any) => setValue("gender", value)}
              disabled={isLoading}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "male", label: "Male", icon: "👨" },
                { value: "female", label: "Female", icon: "👩" },
                // { value: "other", label: "Other", icon: "🧑" },
              ].map((option) => (
                <div key={option.value}>
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={option.value}
                    className="flex flex-col items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="text-sm font-medium">{option.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.gender && (
              <p className="text-sm text-destructive">
                {errors.gender.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Language & Preferences Section */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b">
            <div className="p-2 rounded-lg bg-primary/10">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Language Preference</h3>
              <p className="text-sm text-muted-foreground">
                Choose your preferred language
              </p>
            </div>
          </div>

          {/* Preferred Language */}
          <div className="space-y-2">
            <Label htmlFor="preferredLanguage">Website Language</Label>
            <Select
              value={watch("preferredLanguage")}
              onValueChange={(value: any) =>
                setValue("preferredLanguage", value)
              }
              disabled={isLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">
                  <div className="flex items-center gap-2">
                    <span>🇪🇬</span>
                    <span>العربية</span>
                  </div>
                </SelectItem>
                <SelectItem value="en">
                  <div className="flex items-center gap-2">
                    <span>🇬🇧</span>
                    <span>English</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.preferredLanguage && (
              <p className="text-sm text-destructive">
                {errors.preferredLanguage.message}
              </p>
            )}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
              <p className="text-xs text-muted-foreground">
                You can change the language anytime from your profile settings
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Stay updated with our latest offers
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex items-start justify-between gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <Label
                  htmlFor="newsletter"
                  className="text-base font-medium cursor-pointer"
                >
                  Newsletter Subscription
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Get exclusive deals, new arrivals, and special offers delivered
                to your inbox
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  New Products
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  Special Offers
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  Sales
                </span>
              </div>
            </div>
            <Switch
              id="newsletter"
              checked={watch("newsletter")}
              onCheckedChange={(checked) => setValue("newsletter", checked)}
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      {/* Info Alert */}
      <Alert className="border-primary/20 bg-primary/5">
        <CheckCircle2 className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm ml-2">
          <strong className="text-primary">Almost done!</strong> You can update
          these settings anytime from your profile.
        </AlertDescription>
      </Alert>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => window.history.back()}
          disabled={isLoading}
        >
          Back
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Complete Setup
            </>
          )}
        </Button>
      </div>

      {/* Privacy Notice */}
      <p className="text-xs text-center text-muted-foreground">
        By completing your profile, you agree to our{" "}
        <Link href="/privacy" className="underline hover:text-primary">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="underline hover:text-primary">
          Terms of Service
        </Link>
      </p>
    </form>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// // components/profile/PreferencesStep.tsx
// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { profileCompletionStep3Schema, ProfileStep3Input } from '@/lib/validations/auth';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Switch } from '@/components/ui/switch';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Loader2, User, Globe, Bell, Calendar } from 'lucide-react';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// interface PreferencesStepProps {
//   onComplete: () => void;
// }

// export default function PreferencesStep({ onComplete }: PreferencesStepProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     setValue,
//   } = useForm<ProfileStep3Input>({
//     resolver: zodResolver(profileCompletionStep3Schema),
//     defaultValues: {
//       preferredLanguage: 'ar',
//       newsletter: false,
//     },
//   });

//   const onSubmit = async (data: ProfileStep3Input) => {
//     setIsLoading(true);
//     setError('');

//     try {
//       const response = await fetch('/api/user/complete-profile', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           step: 3,
//           data: {
//             ...data,
//             dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
//           }
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update preferences');
//       }

//       onComplete();
//     } catch (err: any) {
//       setError(err.message || 'Something went wrong');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       {/* Personal Information Section */}
//       <div className="space-y-4">
//         <div className="flex items-center gap-2 pb-2 border-b">
//           <User className="h-5 w-5 text-primary" />
//           <h3 className="text-lg font-semibold">Personal Information</h3>
//         </div>

//         {/* Date of Birth */}
//         <div className="space-y-2">
//           <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
//             <Calendar className="h-4 w-4" />
//             Date of Birth (Optional)
//           </Label>
//           <Input
//             id="dateOfBirth"
//             type="date"
//             max={new Date().toISOString().split('T')[0]}
//             {...register('dateOfBirth')}
//             disabled={isLoading}
//           />
//           {errors.dateOfBirth && (
//             <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
//           )}
//         </div>

//         {/* Gender */}
//         <div className="space-y-3">
//           <Label>Gender (Optional)</Label>
//           <RadioGroup
//             value={watch('gender') || ''}
//             onValueChange={(value: any) => setValue('gender', value)}
//             disabled={isLoading}
//           >
//             <div className="flex items-center space-x-2 rtl:space-x-reverse">
//               <RadioGroupItem value="male" id="male" />
//               <Label htmlFor="male" className="cursor-pointer font-normal">
//                 Male
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2 rtl:space-x-reverse">
//               <RadioGroupItem value="female" id="female" />
//               <Label htmlFor="female" className="cursor-pointer font-normal">
//                 Female
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2 rtl:space-x-reverse">
//               <RadioGroupItem value="other" id="other" />
//               <Label htmlFor="other" className="cursor-pointer font-normal">
//                 Other
//               </Label>
//             </div>
//           </RadioGroup>
//           {errors.gender && (
//             <p className="text-sm text-destructive">{errors.gender.message}</p>
//           )}
//         </div>
//       </div>

//       {/* Language & Preferences Section */}
//       <div className="space-y-4">
//         <div className="flex items-center gap-2 pb-2 border-b">
//           <Globe className="h-5 w-5 text-primary" />
//           <h3 className="text-lg font-semibold">Language & Preferences</h3>
//         </div>

//         {/* Preferred Language */}
//         <div className="space-y-2">
//           <Label htmlFor="preferredLanguage">Preferred Language</Label>
//           <Select
//             value={watch('preferredLanguage')}
//             onValueChange={(value: any) => setValue('preferredLanguage', value)}
//             disabled={isLoading}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select language" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="ar">العربية (Arabic)</SelectItem>
//               <SelectItem value="en">English</SelectItem>
//             </SelectContent>
//           </Select>
//           {errors.preferredLanguage && (
//             <p className="text-sm text-destructive">
//               {errors.preferredLanguage.message}
//             </p>
//           )}
//           <p className="text-xs text-muted-foreground">
//             This will be your default language for the website
//           </p>
//         </div>
//       </div>

//       {/* Notifications Section */}
//       <div className="space-y-4">
//         <div className="flex items-center gap-2 pb-2 border-b">
//           <Bell className="h-5 w-5 text-primary" />
//           <h3 className="text-lg font-semibold">Notifications</h3>
//         </div>

//         {/* Newsletter */}
//         <div className="flex items-center justify-between p-4 border rounded-lg">
//           <div className="space-y-0.5">
//             <Label htmlFor="newsletter" className="text-base font-medium">
//               Newsletter Subscription
//             </Label>
//             <p className="text-sm text-muted-foreground">
//               Receive updates about new products, offers, and promotions
//             </p>
//           </div>
//           <Switch
//             id="newsletter"
//             checked={watch('newsletter')}
//             onCheckedChange={(checked) => setValue('newsletter', checked)}
//             disabled={isLoading}
//           />
//         </div>
//       </div>

//       {/* Info Box */}
//       <Alert>
//         <AlertDescription className="text-sm">
//           <strong>Note:</strong> You can change these preferences anytime from your profile settings.
//         </AlertDescription>
//       </Alert>

//       {error && (
//         <Alert variant="destructive">
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       {/* Submit Button */}
//       <div className="flex gap-3">
//         <Button
//           type="button"
//           variant="outline"
//           className="flex-1"
//           onClick={() => window.history.back()}
//           disabled={isLoading}
//         >
//           Back
//         </Button>
//         <Button type="submit" className="flex-1" disabled={isLoading}>
//           {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//           Complete Setup
//         </Button>
//       </div>
//     </form>
//   );
// }
