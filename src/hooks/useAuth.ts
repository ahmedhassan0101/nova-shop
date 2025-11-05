import { axiosInstance } from "@/lib/axios";
import { LogInInput, SignUpInput } from "@/lib/validations/auth";
import { RegisterResponse, VerifyEmailResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { getSession, signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const t = useTranslations("auth");

  const loginWithCredentials = useMutation({
    mutationFn: async ({ identifier, password }: LogInInput) => {
      return signIn("credentials", {
        redirect: false,
        identifier,
        password,
        callbackUrl,
      });
    },
    onSuccess: async (response) => {
      console.log("🚀 ~ useLogin ~ response:", response);
      if (!response || response.error) {
        toast.error(response?.error || t("messages.invalidCredentials"));
        return;
      }
      toast.success(t("messages.loggedIn"));

      const session = await getSession();
      console.log("🚀 ~ useLogin ~ session:", session);

      if (session?.user && !session.user.isProfileComplete) {
        router.push("/profile/complete");
      } else {
        router.push(callbackUrl);
      }
      router.refresh();
    },
    onError: (error) => {
      console.log("🚀 ~ useLogin ~ error:", error);
      console.error("Auth error:", error);
      toast.error(t("messages.generalError"));
    },
  });
  const loginWithGoogle = async () => {
    // await signIn("google", { callbackUrl });
    await signIn("google", { callbackUrl: "/profile/complete" });
  };
  return { ...loginWithCredentials, loginWithGoogle };
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (formData: SignUpInput) => {
      const response = await axiosInstance.post<RegisterResponse>(
        "/auth/register",
        formData
      );
      return response.data;
    },
    onSuccess: (response) => {
      if (response) {
        toast.success(response.message);
      }
      // if (response?.requiresOTP) {
      //   router.push(`/auth/verify-otp?userId=${response.data.userId}`);
      // } else {
      router.push(`/auth/verify-request?email=${response.data?.email}`);
      // }
    },
    onError: (error) => {
      console.log("🚀 ~ useRegister ~ error:", error);
      console.group("❌ Hook Error Details");
      console.log("1. Full Error:", error);
      console.log("2. Error Message:", error.message);
      console.log("3. Error Response:", error.response);
      console.log("4. Error Response Data:", error.response?.data);
      console.log("5. Error Response Status:", error.response?.status);
      console.groupEnd();
      toast.error(error.message);
    },
  });
}

interface ResendInput {
  email: string;
}

export function useResendVerification() {
  const t = useTranslations("auth");
  console.log("32"); // print twice every second

  return useMutation({
    mutationFn: async ({ email }: ResendInput) => {
      const response = await axiosInstance.post("/auth/resend-verification", {
        email,
      });
      return response.data;
    },
    onSuccess: (response) => {
      console.log("✅ Resend verification success:", response);
      if (response.message) {
        toast.success(response.message);
      }
    },
    onError: (error) => {
      console.error("❌ Resend verification error:", error);
      toast.error(error.message || t("verifyRequest.resendErrorDefault"));
    },
  });
}

interface VerifyEmailInput {
  token: string;
}

export function useVerifyEmail() {
  const t = useTranslations("auth.verifyEmail.messages");

  return useMutation({
    mutationKey: ["verifyEmail"],
    mutationFn: async ({ token }: VerifyEmailInput) => {
      const response = await axiosInstance.post<VerifyEmailResponse>(
        "/auth/verify-email",
        {
          token,
        }
      );
      return response.data;
    },
    onSuccess: (response) => {
      console.log("✅ Email verification success:", response);
      toast.success(response.message || t("emailVerifiedSuccess"));
    },
    onError: (error) => {
      console.log("🚀 ~ useVerifyEmail ~ error:", error);
      console.error("❌ Email verification error:", error.message);
      toast.error(error.message || t("verificationFailed"));
    },
    retry: false,
  });
}
