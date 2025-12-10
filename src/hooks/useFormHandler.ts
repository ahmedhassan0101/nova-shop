/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useFormHandler.ts
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  UseFormProps,
  DefaultValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { z } from "zod";

export type InferredZodSchema<T extends z.ZodType<any, any>> = z.infer<T>;

type UseFormHandlerOptions<T extends z.ZodType<any, any>> = {
  schema: T;
  defaultValues?: DefaultValues<InferredZodSchema<T>>;
  onSubmit?: SubmitHandler<InferredZodSchema<T>>;
} & Omit<UseFormProps<InferredZodSchema<T>>, "resolver" | "defaultValues">;

export function useFormHandler<T extends z.ZodType<any, any>>({
  schema,
  defaultValues,
  onSubmit,
  ...restOptions
}: UseFormHandlerOptions<T>): {
  form: UseFormReturn<InferredZodSchema<T>>;
  onSubmit: ((e?: React.BaseSyntheticEvent) => Promise<void>) | undefined;
} {
  type FormValues = InferredZodSchema<T>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as any,
    defaultValues: defaultValues,
    mode: restOptions.mode || "onSubmit",
    ...restOptions,
  });

  const submitHandler = onSubmit ? form.handleSubmit(onSubmit) : undefined;

  return {
    form: form as UseFormReturn<FormValues>,
    onSubmit: submitHandler,
  };
}

//usage
// const { form, onSubmit } = useFormHandler({
//     schema: mySchema,
//     defaultValues: { /* ... */ },
//     onSubmit: handleSubmitFunction,

// });
