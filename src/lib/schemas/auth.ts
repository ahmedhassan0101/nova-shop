import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(2, "errors.nameMin"),
    email: z.email("errors.invalidEmail").optional().or(z.literal("")),
    phone: z
      .string()
      .regex(/^[0-9]{11}$/, "errors.phoneDigits")
      .optional()
      .or(z.literal("")),
    password: z.string().min(8, "errors.passwordMin"),
    confirmPassword: z.string().min(8, "errors.passwordMin"),
    registerWith: z.enum(["email", "phone"], "errors.selectRegisterMethod"),
  
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "errors.passwordsDontMatch",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.registerWith === "email") return !!data.email;
      if (data.registerWith === "phone") return !!data.phone;
      return false;
    },
    {
      message: "errors.requiredByMethod",
      path: ["email"],
    }
  )
  .transform((data) => {
    if (data.registerWith === "email") {
      return { ...data, phone: "" };
    }
    if (data.registerWith === "phone") {
      return { ...data, email: "" };
    }
    return data;
  });

// export const logInSchema = z.object({
//   identifier: z.string().min(1, "errors.identifierRequired"),
//   password: z.string().min(1, "errors.passwordRequired"),
// });
export const logInSchema = z.object({
  identifier: z
    .string()
    .min(1, "errors.identifierRequired")
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{11}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      },
      {
        message: "errors.invalidIdentifier",
      }
    ),
  password: z.string().min(1, "errors.passwordRequired"),
});
export const forgotPasswordSchema = z.object({
  email: z.email("errors.invalidEmail"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "errors.passwordMin"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "errors.passwordsDontMatch",
    path: ["confirmPassword"],
  });

export const addressSchema = z.object({
  label: z.string().min(1, "errors.labelRequired"),
  fullName: z.string().min(2, "errors.fullNameRequired"),
  phone: z.string().regex(/^[0-9]{11}$/, "errors.phoneDigits"),
  street: z.string().min(5, "errors.streetRequired"),
  city: z.string().min(2, "errors.cityRequired"),
  state: z.string().min(2, "errors.stateRequired"),
  postalCode: z.string().min(4, "errors.postalRequired"),
  country: z.string().min(2, "errors.countryRequired"),
  isDefault: z.boolean().default(false),
});

export const profileCompletionStep2Schema = z.object({
  addresses: z.array(addressSchema).min(1, "errors.atLeastOneAddress"),
});

// ✅ Profile Step 3 Schema
export const profileCompletionStep3Schema = z.object({
  dateOfBirth: z.date().optional(),
  gender: z.enum(["male", "female"]).optional(),
  preferredLanguage: z.enum(["ar", "en"]),
  newsletter: z.boolean().default(false),
});

// export const profileCompletionStep3Schema = z.object({
//   dateOfBirth: z.string().optional().or(z.literal('')),
//   gender: z.enum(['male', 'female']).optional(),
//   preferredLanguage: z.enum(['ar', 'en']),
//   newsletter: z.boolean().default(false),
// });

/*
 --------------------------------------------------------------------
 ✅ Type Inference
 --------------------------------------------------------------------
*/

export type SignUpInput = z.infer<typeof signUpSchema>;
export type LogInInput = z.infer<typeof logInSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type ProfileStep2Input = z.infer<typeof profileCompletionStep2Schema>;
export type ProfileStep3Input = z.infer<typeof profileCompletionStep3Schema>;
