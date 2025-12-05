// app/api/auth/verify-otp/route.ts
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { ApiError, errorResponse, successResponse } from "@/lib/apiResponse";

export async function POST(req: NextRequest) {
  try {
    const { userId, otp } = await req.json();
    // validation id and otp
    await connectDB();

    const user = await User.findById(userId);

    if (!user || !user.otp || !user.otpExpires) {
      throw new ApiError({
        message: "Invalid request",
        messageKey: "auth.verifyOTP.invalidRequest",
        status: 400,
      });
    }

    if (user.otpExpires < new Date()) {
      throw new ApiError({
        message: "OTP has expired",
        messageKey: "auth.verifyOTP.expired",
        status: 400,
      });
    }

    const isValid = await bcrypt.compare(otp, user.otp); // try this in token too

    if (!isValid) {
      throw new ApiError({
        message: "Invalid OTP",
        messageKey: "auth.verifyOTP.invalid",
        status: 400,
      });
    }

    user.phoneVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.profileCompletionStep = 1;
    await user.save();

    return successResponse({
      message: "Phone verified successfully!",
      messageKey: "auth.verifyOTP.success",
      data: { userId: user._id, phone: user.phone },
      // status: 200, // 200 is a default
    });
  } catch (error) {
    return errorResponse(error);
  }
}
