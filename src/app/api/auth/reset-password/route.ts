// app/api/auth/reset-password/route.ts
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { validateBody } from "@/lib/validation";

import { z } from "zod";
import { ApiError, errorResponse, successResponse } from "@/lib/apiResponse";

export const resetPasswordSchema = z.object({
  password: z.string().min(8, { message: "errors.passwordMin" }),
  token: z
    .string()
    .min(1, { message: "auth.resetPassword.tokenRequired" })
    .regex(/^[a-f0-9]{64}$/i, { message: "auth.resetPassword.tokenInvalid" }),
});

export async function POST(req: NextRequest) {
  try {
    const { token, password } = validateBody(
      await req.json(),
      resetPasswordSchema
    );

    await connectDB();

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new ApiError({
        message: "The reset token is invalid or has expired.",
        messageKey: "auth.resetPassword.tokenInvalid",
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return successResponse({
      message: "Password reset successfully!",
      messageKey: "auth.resetPassword.success",
      // status: 200, // 200 is a default
    });
  } catch (error) {
    return errorResponse(error);
  }
}
