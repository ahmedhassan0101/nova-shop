// app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { sendPasswordResetEmail } from "@/lib/email-nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "auth.errors.general", status: 500 },
        { status: 500 }
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // ساعة واحدة

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json({
      message: "auth.forgotPassword.success",
      status: 200,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "auth.errors.general", status: 500 },
      { status: 500 }
    );
  }
}
