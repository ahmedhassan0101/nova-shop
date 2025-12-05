// app/api/auth/verify-email/route.ts
import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { z } from "zod";
import { ApiError, errorResponse, successResponse } from "@/lib/apiResponse";
import { validateBody } from "@/lib/validation";

export const verifyEmailSchema = z.object({
  token: z
    .string()
    .min(1, { message: "auth.resetPassword.tokenRequired" })
    .regex(/^[a-f0-9]{64}$/i, { message: "auth.resetPassword.tokenInvalid" }),
});

export async function POST(req: NextRequest) {
  try {
    const { token } = validateBody(await req.json(), verifyEmailSchema);
    await connectDB();

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new ApiError({
        message: "Invalid or expired verification token",
        messageKey: "auth.verifyEmail.invalidToken",
        status: 404,
      });
    }

    user.emailVerified = new Date();
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    user.profileCompletionStep = 1;
    await user.save();

    return successResponse({
      message: "Email verified successfully!",
      messageKey: "auth.verifyEmail.messages.emailVerifiedSuccess",
      data: { userId: user._id, email: user.email },
      // status: 200, // 200 is a default
    });
  } catch (error) {
    return errorResponse(error);
  }
}
