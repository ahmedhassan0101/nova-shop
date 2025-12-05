// app/api/auth/resend-otp/route.ts
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
// import { sendOTP } from "@/lib/sms";
import { ApiError, errorResponse, successResponse } from "@/lib/apiResponse";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    // validation id
    await connectDB();

    const user = await User.findById(userId);

    if (!user || !user.phone) {
      throw new ApiError({
        message: "Invalid request",
        messageKey: "auth.resendOTP.invalidRequest",
        status: 400,
      });
    }

    if (user.phoneVerified) {
      throw new ApiError({
        message: "Phone already verified",
        messageKey: "auth.resendOTP.alreadyVerified",
        status: 400,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = await bcrypt.hash(otp, 10);
    user.otpExpires = otpExpires;
    await user.save();

    // await sendOTP(user.phone, otp);
    return successResponse({
      message: "OTP sent successfully.",
      messageKey: "auth.resendOTP.success",
      data: { phone: user.phone },
      // status: 200, // 200 is a default
    });
  } catch (error) {
    return errorResponse(error);
  }
}
