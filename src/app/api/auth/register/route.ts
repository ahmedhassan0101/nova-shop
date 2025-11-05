/* eslint-disable @typescript-eslint/no-explicit-any */
// src\app\api\auth\register\route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { sendVerificationEmail } from "@/lib/email";
// import { sendOTP } from '@/lib/sms';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password, registerWith } = await req.json();
    await connectDB();

    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { message: "auth.register.emailExists", status: 409 },
          { status: 409 }
        );
      }
    }

    if (phone) {
      const existingUser = await User.findOne({ phone });
      if (existingUser) {
        return NextResponse.json(
          { message: "auth.register.phoneExists", status: 409 },
          { status: 409 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const user = await User.create({
      name,
      email: email || undefined,
      phone: phone || undefined,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires,
      profileCompletionStep: 0,
    });

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    if (registerWith === "email" && email) {
      await sendVerificationEmail(email, verificationToken);

      return NextResponse.json(
        {
          message: "auth.register.emailSuccess",
          data: userResponse,
          status: 201,
        },
        { status: 201 }
      );
    } else if (registerWith === "phone" && phone) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      user.otp = await bcrypt.hash(otp, 10);
      user.otpExpires = otpExpires;
      await user.save();
      // await sendOTP(phone, otp);
      return NextResponse.json(
        {
          message: "auth.register.phoneSuccess",
          data: { ...userResponse, requiresOTP: true },
          status: 201,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "auth.register.invalidMethod", status: 400 },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        message: error.message || "auth.errors.general",
        status: 500,
      },
      { status: 500 }
    );
  }
}
