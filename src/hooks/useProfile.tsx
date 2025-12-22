import {
  getProfileCompletionStep,
  updateProfileStep,
} from "@/lib/actions/profile.actions";
import { axiosInstance } from "@/lib/axios";
import { ProfileStep2Input, ProfileStep3Input } from "@/lib/schemas/auth";
import { ActionError } from "@/lib/serverActionResponse";
import { ActionData } from "@/types/action";
import { useDisplayToast } from "@/utils/displayToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

type ProfileStepData = {
  currentStep: number;
  isComplete: boolean;
};

// queryFn: async () => {
//       const actionResult = await getProfileCompletionStep();

//       if (actionResult.success) {
//         // 💡 إرجاع حقل 'data' فقط. هذا هو التنظيف (Unwrap)
//         return actionResult.data as ProfileStepData;
//       }

//     },
// return useQuery<ProfileStepData>({
export function useProfileStep() {
  const { data: session, status } = useSession();

  return useQuery({
    queryKey: ["profileStep", session?.user?.id],

    queryFn: async () => {
      const actionResult = await getProfileCompletionStep();
      if ("data" in actionResult && actionResult.data !== undefined) {
        return actionResult.data as ProfileStepData;
      }
      throw new Error("Failed to extract data from action result.");

      // throw new Error(actionResult.message);
    },
    enabled: !!session?.user?.id && status === "authenticated",
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useUpdateProfileStep() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { displayError, displaySuccess } = useDisplayToast();
  return useMutation<
    ActionData<{ step: number; isComplete: boolean }>,
    ActionError,
    number
  >({
    mutationFn: updateProfileStep,
    onSuccess: (data) => {
      // displaySuccess(data);

      queryClient.invalidateQueries({
        queryKey: ["profileStep", session?.user?.id],
      });
    },
    onError: (error) => {
      displayError(error);
    },
  });
}

export function useAddressStep() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (data: { step: number; data: ProfileStep2Input }) => {
      const response = await axiosInstance.post("/user/complete-profile", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profileStep", session?.user?.id],
      });
    },
    onError: () => {
      console.log("Error");
    },
  });
}

export function usePreferencesStep() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  return useMutation({
    mutationFn: async (data: { step: number; data: ProfileStep3Input }) => {
      const response = await axiosInstance.post("/user/complete-profile", data);
      return response.data;
    },
    onSuccess: async (response) => {
      // important
      queryClient.invalidateQueries({
        queryKey: ["profileStep", session?.user?.id],
      });

      // if (response.data?.isProfileComplete) {
      //   await update({ isProfileComplete: true });
      //   router.push("/");
      // }
      console.log("success");
    },
    onError: () => {
      console.log("Error");
    },
  });
}
// try {
//   const response = await fetch("/api/user/complete-profile", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       step: 3,
//       data: {
//         ...data,
//         dateOfBirth: data.dateOfBirth
//           ? new Date(data.dateOfBirth)
//           : undefined,
//       },
//     }),
//   });

//  body: JSON.stringify({
//           step: 3,
//           data: {
//             ...data,
//             dateOfBirth: data.dateOfBirth?.toISOString(), // ✅ تحويل للـ ISO
//           },
//         }),
