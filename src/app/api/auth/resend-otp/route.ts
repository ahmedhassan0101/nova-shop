// app/api/auth/resend-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { sendOTP } from "@/lib/sms";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    await connectDB();

    const user = await User.findById(userId);

    if (!user || !user.phone) {
      return NextResponse.json(
        { message: "auth.resendOTP.invalidRequest", status: 400 },
        { status: 400 }
      );
    }

    if (user.phoneVerified) {
      return NextResponse.json(
        { message: "auth.resendOTP.alreadyVerified", status: 400 },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = await bcrypt.hash(otp, 10);
    user.otpExpires = otpExpires;
    await user.save();

    await sendOTP(user.phone, otp);

    return NextResponse.json({
      message: "auth.resendOTP.success",
      data: { phone: user.phone },
      status: 200,
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return NextResponse.json(
      { message: "auth.errors.general", status: 500 },
      { status: 500 }
    );
  }
}
