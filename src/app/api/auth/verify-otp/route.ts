// app/api/auth/verify-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { userId, otp } = await req.json();

    await connectDB();

    const user = await User.findById(userId);

    if (!user || !user.otp || !user.otpExpires) {
      return NextResponse.json(
        { message: "auth.verifyOTP.invalidRequest", status: 400 },
        { status: 400 }
      );
    }

    if (user.otpExpires < new Date()) {
      return NextResponse.json(
        { message: "auth.verifyOTP.expired", status: 400 },
        { status: 400 }
      );
    }

    const isValid = await bcrypt.compare(otp, user.otp);

    if (!isValid) {
      return NextResponse.json(
        { message: "auth.verifyOTP.invalid", status: 400 },
        { status: 400 }
      );
    }

    user.phoneVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.profileCompletionStep = 1;
    await user.save();

    return NextResponse.json({
      message: "auth.verifyOTP.success",
      data: { userId: user._id, phone: user.phone },
      status: 200,
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { message: "auth.errors.general", status: 500 },
      { status: 500 }
    );
  }
}
