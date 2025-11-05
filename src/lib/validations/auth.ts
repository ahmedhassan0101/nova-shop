import { z } from "zod";

// ✅ Sign Up Schema
export const getSignUpSchema = (t: (key: string) => string) =>
  z
    .object({
      name: z.string().min(2, t("errors.nameMin")),
      email: z
        .string()
        .email(t("errors.invalidEmail"))
        .optional()
        .or(z.literal("")),
      phone: z
        .string()
        .regex(/^[0-9]{11}$/, t("errors.phoneDigits"))
        .optional()
        .or(z.literal("")),
      password: z.string().min(8, t("errors.passwordMin")),
      confirmPassword: z.string(),
      registerWith: z.enum(["email", "phone"]),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("errors.passwordsDontMatch"),
      path: ["confirmPassword"],
    })
    .refine(
      (data) => {
        if (data.registerWith === "email") return !!data.email;
        if (data.registerWith === "phone") return !!data.phone;
        return false;
      },
      {
        message: t("errors.requiredByMethod"),
        path: ["email"],
      }
    );

// ✅ Sign In Schema
export const getLogInSchema = (t: (key: string) => string) =>
  z.object({
    identifier: z.string().min(1, t("errors.identifierRequired")),
    password: z.string().min(1, t("errors.passwordRequired")),
  });

// ✅ Forgot Password Schema
export const getForgotPasswordSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t("errors.invalidEmail")),
  });

// ✅ Reset Password Schema
export const getResetPasswordSchema = (t: (key: string) => string) =>
  z
    .object({
      password: z.string().min(8, t("errors.passwordMin")),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("errors.passwordsDontMatch"),
      path: ["confirmPassword"],
    });

// ✅ Address Schema
export const getAddressSchema = (t: (key: string) => string) =>
  z.object({
    label: z.string().min(1, t("errors.labelRequired")),
    fullName: z.string().min(2, t("errors.fullNameRequired")),
    phone: z.string().regex(/^[0-9]{11}$/, t("errors.phoneDigits")),
    street: z.string().min(5, t("errors.streetRequired")),
    city: z.string().min(2, t("errors.cityRequired")),
    state: z.string().min(2, t("errors.stateRequired")),
    postalCode: z.string().min(4, t("errors.postalRequired")),
    country: z.string().min(2, t("errors.countryRequired")),
    isDefault: z.boolean().default(false),
  });

// ✅ Profile Step 2 Schema
export const getProfileCompletionStep2Schema = (t: (key: string) => string) =>
  z.object({
    addresses: z
      .array(getAddressSchema(t))
      .min(1, t("errors.atLeastOneAddress")),
  });

// ✅ Profile Step 3 Schema
export const getProfileCompletionStep3Schema = () =>
  // t: (key: string) => string
  z.object({
    dateOfBirth: z.date().optional(),
    gender: z.enum(["male", "female"]).optional(),
    preferredLanguage: z.enum(["ar", "en"]),
    newsletter: z.boolean().default(false),
  });

// ✅ Type Inference
// export type SignUpInput = z.infer<ReturnType<typeof getSignUpSchema>>;
export type LogInInput = z.infer<ReturnType<typeof getLogInSchema>>;
// export type ForgotPasswordInput = z.infer<
//   ReturnType<typeof getForgotPasswordSchema>
// >;
// export type ResetPasswordInput = z.infer<
//   ReturnType<typeof getResetPasswordSchema>
// >;
// export type AddressInput = z.infer<ReturnType<typeof getAddressSchema>>;
// export type ProfileStep2Input = z.infer<
//   ReturnType<typeof getProfileCompletionStep2Schema>
// >;
// export type ProfileStep3Input = z.infer<
//   ReturnType<typeof getProfileCompletionStep3Schema>
// >;

// import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .email("Invalid email address")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .regex(/^[0-9]{11}$/, "Phone must be 11 digits")
      .optional()
      .or(z.literal("")),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    registerWith: z.enum(["email", "phone"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.registerWith === "email") return !!data.email;
      if (data.registerWith === "phone") return !!data.phone;
      return false;
    },
    {
      message: "Please provide email or phone based on registration method",
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

export const signInSchema = z.object({
  identifier: z.string().min(1, "Email or phone is required"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const addressSchema = z.object({
  label: z.string().min(1, "Label is required"),
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().regex(/^[0-9]{11}$/, "Phone must be 11 digits"),
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  isDefault: z.boolean().default(false),
});

export const profileCompletionStep2Schema = z.object({
  addresses: z.array(addressSchema).min(1, "At least one address is required"),
});

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

export type SignUpInput = z.infer<typeof signUpSchema>;
// export type SignInInput = z.infer<typeof signInSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type ProfileStep2Input = z.infer<typeof profileCompletionStep2Schema>;
export type ProfileStep3Input = z.infer<typeof profileCompletionStep3Schema>;
