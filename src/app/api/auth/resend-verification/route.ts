// app/api/auth/resend-verification/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "auth.resendVerification.emailRequired", status: 400 },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        message: "auth.resendVerification.checkEmail",
        status: 200,
      });
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { message: "auth.resendVerification.alreadyVerified", status: 400 },
        { status: 400 }
      );
    }

    // Check if recently sent (rate limiting)
    if (user.verificationTokenExpires) {
      const timeSinceLastSent =
        Date.now() -
        (user.verificationTokenExpires.getTime() - 24 * 60 * 60 * 1000);
      if (timeSinceLastSent < 60000) {
        // 1 minute
        return NextResponse.json(
          { message: "auth.resendVerification.rateLimited", status: 429 },
          { status: 429 }
        );
      }
    }

    // Generate new token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = verificationTokenExpires;
    await user.save();

    // Send email
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      {
        message: "auth.resendVerification.success",
        data: { email },
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { message: "auth.errors.general", status: 500 },
      { status: 500 }
    );
  }
}
