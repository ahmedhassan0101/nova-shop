/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { sendOTP } from "@/lib/sms";

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

    const userData: any = {
      name,
      email: email || undefined,
      phone: phone || undefined,
      password: hashedPassword,
      profileCompletionStep: 0,
    };

    // const user = await User.create({
    //   name,
    //   email: email || undefined,
    //   phone: phone || undefined,
    //   password: hashedPassword,
    //   profileCompletionStep: 0,
    // verificationToken,
    // verificationTokenExpires,
    // });

    // const userResponse = user.toObject();
    // delete userResponse.password;

    if (registerWith === "email" && email) {
      const verificationToken = crypto.randomBytes(32).toString("hex");
      const verificationTokenExpires = new Date(
        Date.now() + 24 * 60 * 60 * 1000
      );

      userData.verificationToken = verificationToken;
      userData.verificationTokenExpires = verificationTokenExpires;

      const user = await User.create(userData);
      // Remove password from response
      const userResponse = user.toObject();
      delete userResponse.password;

      await sendVerificationEmail(email, verificationToken);

      return successResponse({
        message:
          "Account created successfully. Please check your email to verify your account.",
        messageKey: "auth.signUp.emailSuccess",
        data: userResponse,
        status: 201,
      });
    }

    if (registerWith === "phone" && phone) {

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      userData.otp = await bcrypt.hash(otp, 10);
      userData.otpExpires = otpExpires;

      const user = await User.create(userData);

      // Remove password & otp from response
      const userResponse = user.toObject();
      delete userResponse.password;
      delete userResponse.otp;

      // await sendOTP(phone, otp);
      try {
        await sendOTP(phone, otp);
      } catch (smsError: any) {
        await User.findByIdAndDelete(user._id);

        console.error("Failed to send OTP:", smsError);
        throw new ApiError({
          message: "Failed to send verification code. Please try again later.",
          messageKey: "auth.signUp.smsError", // لسه مش ف الترجمة
          status: 500,
        });
      }
      return successResponse({
        message:
          "Account created successfully. An OTP will be sent to your phone.",
        messageKey: "auth.signUp.phoneSuccess",
        data: { ...userResponse, requiresOTP: true, expiresIn: 600 },
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
