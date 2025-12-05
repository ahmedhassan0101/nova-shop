// src\app\api\auth\register\route.ts
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { sendVerificationEmail } from "@/lib/email";
import { validateBody } from "@/lib/validation";
import { signUpSchema } from "@/lib/schemas/auth";
import { ApiError, errorResponse, successResponse } from "@/lib/apiResponse";

// import { sendOTP } from '@/lib/sms';

export async function POST(req: NextRequest) {
  try {
    // const { name, email, phone, password, registerWith } = await req.json();
    const { name, email, phone, password, registerWith } = validateBody(
      await req.json(),
      signUpSchema
    );
    await connectDB();

    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new ApiError({
          message: "This email address is already registered.",
          messageKey: "auth.signUp.emailExists",
          status: 409,
        });
      }
    }

    if (phone) {
      const existingUser = await User.findOne({ phone });
      if (existingUser) {
        throw new ApiError({
          message: "This phone number is already registered.",
          messageKey: "auth.signUp.phoneExists",
          status: 409,
        });
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

      return successResponse({
        message:
          "Account created successfully. Please check your email to verify your account.",
        messageKey: "auth.signUp.emailSuccess",
        status: 201,
      });
    } else if (registerWith === "phone" && phone) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      user.otp = await bcrypt.hash(otp, 10);
      user.otpExpires = otpExpires;
      await user.save();
      // await sendOTP(phone, otp);
      return successResponse({
        message:
          "Account created successfully. An OTP will be sent to your phone.",
        messageKey: "auth.signUp.phoneSuccess",
        status: 201,
      });
    }

    throw new ApiError({
      message: "Invalid registration method.",
      messageKey: "auth.signUp.invalidMethod",
      status: 404,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
