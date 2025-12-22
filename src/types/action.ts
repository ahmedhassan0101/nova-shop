export type ActionData<T = void> = {
  messageKey?: string;
  message: string;
  data?: T;
};

export interface ActionErrorResponse {
  message: string;
  messageKey?: string;
  errors?: Record<string, string[]>;
}

export type ProfileStepActionResponse = ActionData<{
  currentStep: number;
  isComplete: boolean;
}>;
