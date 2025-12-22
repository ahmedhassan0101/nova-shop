// app/api/auth/forgot-password/route.ts
import { NextRequest } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { sendPasswordResetEmail } from "@/lib/email";
import { validateBody } from "@/lib/validation";
import { ApiError, errorResponse, successResponse } from "@/lib/apiResponse";
import { forgotPasswordSchema } from "@/lib/schemas/auth";

export async function POST(req: NextRequest) {
  try {
    // Validation
    const { email } = validateBody(await req.json(), forgotPasswordSchema);

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError({
        message: "User not found",
        messageKey: "errors.userNotFound",
        status: 404,
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    // await sendPasswordResetEmail(email, resetToken);
    await sendPasswordResetEmail(email, resetToken);
    return successResponse({
      message: "Password reset email sent!",
      messageKey: "auth.forgotPassword.success",
      // status: 200, // 200 is a default
    });
  } catch (error) {
    return errorResponse(error);
  }
}
