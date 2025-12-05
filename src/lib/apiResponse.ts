/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server";
import { ValidationError } from "./validation";

interface ApiErrorParams {
  messageKey: string;
  message: string;
  status: number;
}
// lib/apiResponse.ts
export class ApiError extends Error {
  public message: string;
  public messageKey: string;
  public status: number;

  constructor({ message, messageKey, status }: ApiErrorParams) {
    super(message);
    this.messageKey = messageKey;
    this.status = status;
    this.message = message;
    this.name = "ApiError";
  }
}

interface SuccessResponseParams {
  messageKey: string;
  message: string;
  status?: number;
  data?: any;
}

// Success response
export function successResponse({
  message,
  messageKey,
  data,
  status = 200,
}: SuccessResponseParams) {
  return NextResponse.json(
    {
      message,
      messageKey,
      data,
      status,
    },
    { status }
  );
}

// Error response
export function errorResponse(error: any) {
  // Validation errors
  if (error instanceof ValidationError) {
    return NextResponse.json(
      {
        message: "validation Failed",
        errors: error.fieldErrors,
        status: 400,
      },
      { status: 400 }
    );
  }

  // Custom API errors
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        message: error.message,
        status: error.status,
        messageKey: error.messageKey || "auth.errors.general",
      },
      { status: error.status }
    );
  }

  // Unknown errors (500)
  console.error("Server error:", error);
  return NextResponse.json(
    {
      message: error.message,
      messageKey: error.messageKey || "auth.errors.general",
      status: 500,
    },
    { status: 500 }
  );
}
