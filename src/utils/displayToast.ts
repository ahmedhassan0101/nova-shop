/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiErrorResponse, ApiResponse } from "@/types/api";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useDisplayToast() {
  const t = useTranslations();

  function displayError(error: ApiErrorResponse) {
    if (error.errors) {
      // && error.message === "validation Failed"
      const errorMessages = Object.entries(error.errors).flatMap(
        ([_, messages]) => messages
      );

      if (errorMessages.length === 1) {
        toast.error(t(errorMessages[0]));
        return;
      }

      errorMessages.forEach((msg) => toast.error(t(msg)));
      return;
    }

    if (error.messageKey) toast.error(t(error.messageKey));

    toast.error(error.message || "Something went wrong");
  }

  function displaySuccess<T = void>(data: ApiResponse<T>) {
    const SuccessMessage = data.messageKey ? t(data.messageKey) : data.message;
    toast.success(SuccessMessage);
  }

  return { displayError, displaySuccess };
}
