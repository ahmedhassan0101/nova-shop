import { axiosInstance } from "@/lib/axios";
import { getLatestOTP } from "@/lib/actions/otp-actions";
import { LogInInput, SignUpInput } from "@/lib/schemas/auth";
import {
  ApiErrorResponse,
  ApiResponse,
  RegisterResponse,
  ResendOTPResponse,
  VerifyEmailResponse,
  VerifyOTPResponse,
} from "@/types/api";
import { useDisplayToast } from "@/utils/displayToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSession, signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const t = useTranslations();

  const loginWithCredentials = useMutation({
    mutationFn: async ({ identifier, password }: LogInInput) => {
      const result = await signIn("credentials", {
        redirect: false,
        identifier,
        password,
        callbackUrl,
      });
      if (!result?.ok && result?.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: async () => {
      toast.success(t("auth.login.success"));

      const session = await getSession();

      if (session?.user && !session.user.isProfileComplete) {
        router.replace("/profile/complete");
      } else {
        router.replace(callbackUrl);
      }
      router.refresh();
    },
    onError: (error) => {
      toast.error(t(error.message));
    },
  });

  const loginWithGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: "/profile/complete" });
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error(t("auth.errors.googleSignInFailed"));
    }
  };
  return { ...loginWithCredentials, loginWithGoogle };
}

export function useRegister() {
  const router = useRouter();
  const { displayError, displaySuccess } = useDisplayToast();
  return useMutation({
    mutationFn: async (formData: SignUpInput) => {
      const response = await axiosInstance.post<RegisterResponse>(
        "/auth/register",
        formData
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      displaySuccess(data);

      if (variables.registerWith === "phone" && data?.data?.requiresOTP) {
        router.push(`/auth/verify-otp?userId=${data.data._id}`);
      } else if (variables.registerWith === "email" && variables.email) {
        router.push(`/auth/verify-request?email=${variables.email}`);
      }
    },
    onError: (error: ApiErrorResponse) => {
      displayError(error);
    },
  });
}

export function useResendVerification() {
  const { displayError, displaySuccess } = useDisplayToast();
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await axiosInstance.post("/auth/resend-verification", {
        email,
      });
      return response.data;
    },
    onSuccess: (data) => {
      displaySuccess(data);
    },
    onError: (error: ApiErrorResponse) => {
      displayError(error);
    },
  });
}

export function useVerifyEmail() {
  const { displayError, displaySuccess } = useDisplayToast();
  return useMutation({
    mutationKey: ["verifyEmail"],
    mutationFn: async ({ token }: { token: string }) => {
      const response = await axiosInstance.post<VerifyEmailResponse>(
        "/auth/verify-email",
        { token }
      );
      return response.data;
    },
    onSuccess: (data) => {
      displaySuccess(data);
    },
    onError: (error: ApiErrorResponse) => {
      displayError(error);
    },
    retry: false,
  });
}

export function useForgotPassword() {
  const { displayError, displaySuccess } = useDisplayToast();
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await axiosInstance.post<ApiResponse>(
        "/auth/forgot-password",
        { email }
      );
      return response.data;
    },
    onSuccess: (data) => {
      displaySuccess(data);
    },

    onError: (error: ApiErrorResponse) => {
      displayError(error);
    },
  });
}

export function useResetPassword() {
  const router = useRouter();
  const { displayError, displaySuccess } = useDisplayToast();
  return useMutation({
    mutationFn: async ({
      password,
      token,
    }: {
      password: string;
      token: string;
    }) => {
      const response = await axiosInstance.post<ApiResponse>(
        "/auth/reset-password",
        {
          password,
          token,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      displaySuccess(data);
      setTimeout(() => {
        router.push("/auth/login?password-reset=true");
      }, 2000);
    },
    onError: (error: ApiErrorResponse) => {
      displayError(error);
    },
  });
}

export function useVerifyOTP() {
  const router = useRouter();
  const { displayError, displaySuccess } = useDisplayToast();

  return useMutation({
    mutationFn: async (data: { userId: string; otp: string }) => {
      const response = await axiosInstance.post<VerifyOTPResponse>(
        "/auth/verify-otp",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      displaySuccess(data);
      router.push("/auth/login?verified=true");
    },
    onError: (error: ApiErrorResponse) => {
      displayError(error);
    },
  });
}

export function useResendOTP() {
  const { displayError, displaySuccess } = useDisplayToast();

  return useMutation({
    mutationFn: async (data: { userId: string }) => {
      const response = await axiosInstance.post<ResendOTPResponse>(
        "/auth/resend-otp",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      displaySuccess(data);
    },
    onError: (error: ApiErrorResponse) => {
      displayError(error);
    },
  });
}

export function useLatestOTP() {
  return useQuery({
    queryKey: ["latestOTP"],
    queryFn: async () => {
      const data = await getLatestOTP();

      return data;
    },
    refetchInterval: 5000,
    staleTime: 0,
  });
}
