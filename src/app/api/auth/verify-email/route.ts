// app/api/auth/verify-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    await connectDB();

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "auth.verifyEmail.invalidToken" },
        { status: 400 }
      );
    }

    user.emailVerified = new Date();
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    user.profileCompletionStep = 1;
    await user.save();

    return NextResponse.json(
      {
        message: "auth.verifyEmail.success_r",
        data: { userId: user._id, email: user.email },
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { message: "auth.errors.general", status: 500 },
      { status: 500 }
    );
  }
}
