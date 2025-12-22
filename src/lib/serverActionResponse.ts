/* eslint-disable @typescript-eslint/no-explicit-any */

import { ActionData, ActionErrorResponse } from "@/types/action";
import { ApiError } from "./apiResponse";
import { ValidationError } from "./validation";

export class ActionError extends Error {
  public message: string;
  public messageKey?: string;
  public errors?: Record<string, string[]>;
  constructor(errorData: ActionErrorResponse) {
    super(errorData.message);
    this.name = "ActionError";
    this.message = errorData.message;
    this.messageKey = errorData.messageKey;
    this.errors = errorData.errors;
  }
}

// export interface ActionSuccess<T = void> {
//   success: true;
//   message: string;
//   messageKey?: string;
//   data?: T;
// }

// export type ProfileStepData = ActionSuccess<{
//   currentStep: number;
//   isComplete: boolean;
// }>;

// -------------------------------------------

// export interface ActionError {
//   success: false;
//   message: string;
//   messageKey?: string;
//   errors?: Record<string, string[]>;
// }

// -------------------------------------------
// interface ActionSuccessParams {
//   messageKey: string;
//   message: string;
//   data?: any;
// }

// export function actionSuccess({
//   message,
//   messageKey,
//   data,
// }: ActionSuccessParams) {
//   return {
//     // success: true,
//     messageKey,
//     message,
//     data,
//   };
// }
export function actionSuccess<T>(params: {
  message: string;
  messageKey?: string;
  data?: T;
}): ActionData<T> {
  return { ...params };
}

export function actionErrorHandler(error: any): never {
  let errorData: ActionErrorResponse;

  // 1. Validation errors
  if (error instanceof ValidationError) {
    errorData = {
      // success: false,
      messageKey: "general.validationFailed",
      message: "Data validation failed.",
      errors: error.fieldErrors,
    };
  }
  // 2. Custom Action errors
  else if (error instanceof ApiError) {
    errorData = {
      // success: false,
      messageKey: error.messageKey,
      message: error.message,
    };
  }

  // 3. Unknown errors (500)
  else {
    errorData = {
      // success: false,
      messageKey: "general.serverError",
      message: "An unexpected server error occurred.",
    };
  }
  throw new ActionError(errorData);
}
