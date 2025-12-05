import { ZodType, ZodError, flattenError } from "zod";

export class ValidationError extends Error {
  constructor(public fieldErrors: Record<string, string[]>) {
    super("Validation Error"); // Error Message
    this.name = "ValidationError"; //Error Name
  }
}

export function validateBody<T>(body: unknown, schema: ZodType<T>): T {
  try {
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      const flattened = flattenError(error);
      throw new ValidationError(
        flattened.fieldErrors as Record<string, string[]>
      );
    }
    throw error;
  }
}
