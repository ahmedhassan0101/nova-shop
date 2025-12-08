// app/api/auth/resend-otp/route.ts
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { sendOTP } from "@/lib/sms";
import { ApiError, errorResponse, successResponse } from "@/lib/apiResponse";
import { validateBody } from "@/lib/validation";
import { resendOTPSchema } from "@/lib/schemas/auth";

export async function POST(req: NextRequest) {
  try {
    const { userId } = validateBody(await req.json(), resendOTPSchema);

    await connectDB();

    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError({
        message: "User not found",
        messageKey: "auth.resendOTP.userNotFound",
        status: 404,
      });
    }

    if (!user.phone) {
      throw new ApiError({
        message: "No phone number associated with this account",
        messageKey: "auth.resendOTP.noPhone",
        status: 400,
      });
    }

    if (user.phoneVerified) {
      throw new ApiError({
        message: "Phone number is already verified",
        messageKey: "auth.resendOTP.alreadyVerified",
        status: 400,
      });
    }

    if (
      user.otpExpires &&
      user.otpExpires > new Date(Date.now() + 9 * 60 * 1000)
    ) {
      throw new ApiError({
        message: "Please wait before requesting a new OTP",
        messageKey: "auth.resendOTP.tooSoon",
        status: 429,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = await bcrypt.hash(otp, 10);
    user.otpExpires = otpExpires;
    await user.save();

    await sendOTP(user.phone, otp);

    return successResponse({
      message: "OTP sent successfully to your phone",
      messageKey: "auth.resendOTP.success",
      data: {
        phone: user.phone,
        expiresIn: 600, // seconds
      },
      // status: 200, // 200 is a default
    });
  } catch (error) {
    return errorResponse(error);
  }
}
