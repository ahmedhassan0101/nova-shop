// app/api/auth/verify-otp/route.ts
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { ApiError, errorResponse, successResponse } from "@/lib/apiResponse";
import { validateBody } from "@/lib/validation";
import { verifyOTPSchema } from "@/lib/schemas/auth";
import { otpStore } from "@/lib/otp-store";

export async function POST(req: NextRequest) {
  try {
    const { userId, otp } = validateBody(await req.json(), verifyOTPSchema);

    await connectDB();

    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError({
        message: "User not found",
        messageKey: "auth.verifyOTP.userNotFound",
        status: 404,
      });
    }

    if (!user.otp || !user.otpExpires) {
      throw new ApiError({
        message: "No OTP request found. Please request a new OTP.",
        messageKey: "auth.verifyOTP.noOTPFound",
        status: 400,
      });
    }

    if (user.otpExpires < new Date()) {
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      throw new ApiError({
        message: "OTP has expired. Please request a new one.",
        messageKey: "auth.verifyOTP.expired",
        status: 400,
      });
    }

    const isValid = await bcrypt.compare(otp, user.otp); // try this in token too

    if (!isValid) {
      throw new ApiError({
        message: "Invalid OTP. Please check and try again.",
        messageKey: "auth.verifyOTP.invalid",
        status: 400,
      });
    }

    user.phoneVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.profileCompletionStep = Math.max(user.profileCompletionStep, 1);
    await user.save();

    otpStore.clear();
    
    return successResponse({
      message: "Phone verified successfully!",
      messageKey: "auth.verifyOTP.success",
      data: {
        userId: user._id,
        phone: user.phone,
        phoneVerified: true,
      },
      // status: 200, // 200 is a default
    });
  } catch (error) {
    return errorResponse(error);
  }
}
