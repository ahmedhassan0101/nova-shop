"use client";

import React from "react";
import { z } from "zod";
import { FormInput } from "./FormInput";
import { FormRadioGroup } from "./FormRadioGroup";
import { FormSelect } from "./FormSelect";
import { FormTextarea } from "./FormTextarea";
import { FormSwitch } from "./FormSwitch";
import { FormCheckbox } from "./FormCheckbox";
import { Form } from "../ui/form";
import { useFormHandler } from "@/hooks/useFormHandler";

const testSchema = z.object({
  username: z.string().min(3, { message: "الاسم لازم يكون 3 حروف على الأقل" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  password: z
    .string()
    .min(6, { message: "الرقم السري لازم يكون 6 حروف على الأقل" }),
  agreeTerms: z
    .boolean()
    .refine((val) => val === true, "لازم توافق على الشروط"),
  gender: z.enum(["male", "female"], {
    message: "اختر النوع",
  }),
  country: z.string().min(1, { message: "اختر الدولة" }),
  notifications: z.boolean(),
  bio: z.string().min(10, { message: "النبذة لازم تكون 10 حروف على الأقل" }),
});

type TestFormValues = z.infer<typeof testSchema>;
const defaultValues: TestFormValues = {
  username: "",
  email: "",
  password: "",
  agreeTerms: false,
  gender: "male",
  country: "",
  notifications: false,
  bio: "",
};
export default function TestFormComponent() {
  const { form, onSubmit } = useFormHandler({
    schema: testSchema,
    defaultValues: defaultValues,
    onSubmit: (data: TestFormValues) => {
      console.log("✅ Form Submitted Successfully!");
      console.log("📋 Form Data:", data);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📝 Detailed Values:");
      console.log("  Username:", data.username);
      console.log("  Email:", data.email);
      console.log("  Password:", data.password);
      console.log("  Agree Terms:", data.agreeTerms);
      console.log("  Gender:", data.gender);
      console.log("  Country:", data.country);
      console.log("  Notifications:", data.notifications);
      console.log("  Bio:", data.bio);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          اختبار Custom Form Components
        </h1>
        <p className="text-center text-gray-600 mb-2">
          مع shadcn/ui Form Components 🚀
        </p>
        <p className="text-center text-sm text-gray-500 mb-8">
          افتح الـ Console عشان تشوف النتيجة
        </p>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <FormInput
              control={form.control}
              name="username"
              label="اسم المستخدم"
              description="ده الاسم اللي هيظهر للناس"
              placeholder="أدخل اسم المستخدم"
            />

            <FormInput
              control={form.control}
              name="email"
              label="البريد الإلكتروني"
              description="هنبعتلك رسائل تأكيد على الإيميل ده"
              placeholder="example@email.com"
              type="email"
            />

            <FormInput
              control={form.control}
              name="password"
              label="كلمة المرور"
              description="لازم تكون قوية وآمنة"
              placeholder="أدخل كلمة المرور"
              type="password"
            />

            <FormRadioGroup
              control={form.control}
              name="gender"
              label="النوع"
              description="اختر النوع المناسب"
              options={[
                { value: "male", label: "ذكر" },
                { value: "female", label: "أنثى" },
              ]}
            />

            <FormSelect
              control={form.control}
              name="country"
              label="الدولة"
              description="اختر دولتك"
              placeholder="اختر الدولة"
              options={[
                { value: "egypt", label: "مصر" },
                { value: "saudi", label: "السعودية" },
                { value: "uae", label: "الإمارات" },
                { value: "jordan", label: "الأردن" },
                { value: "kuwait", label: "الكويت" },
              ]}
            />

            <FormTextarea
              control={form.control}
              name="bio"
              label="نبذة عنك"
              description="اكتب معلومات عن نفسك"
              placeholder="اكتب نبذة مختصرة عنك..."
              rows={4}
            />

            <FormSwitch
              control={form.control}
              name="notifications"
              label="تفعيل الإشعارات"
              description="هتستقبل إشعارات عن التحديثات الجديدة"
            />

            <FormCheckbox
              control={form.control}
              name="agreeTerms"
              label="أوافق على الشروط والأحكام"
              description="لازم توافق عشان تكمل"
            />

            <button
              type="submit"
              onClick={onSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              إرسال النموذج
            </button>
          </form>
        </Form>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            📊 Form State
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Valid:</span>
              <span
                className={
                  form.formState.isValid
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {form.formState.isValid ? "✅ Yes" : "❌ No"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Dirty:</span>
              <span
                className={
                  form.formState.isDirty
                    ? "text-blue-600 font-semibold"
                    : "text-gray-400"
                }
              >
                {form.formState.isDirty ? "✅ Yes" : "❌ No"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Errors:</span>
              <span
                className={
                  Object.keys(form.formState.errors).length > 0
                    ? "text-red-600 font-semibold"
                    : "text-green-600 font-semibold"
                }
              >
                {Object.keys(form.formState.errors).length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Submitting:</span>
              <span
                className={
                  form.formState.isSubmitting
                    ? "text-blue-600 font-semibold"
                    : "text-gray-400"
                }
              >
                {form.formState.isSubmitting ? "⏳ Yes" : "❌ No"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
