// app/api/auth/resend-verification/route.ts
import { NextRequest } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { sendVerificationEmail } from "@/lib/email";
import { ApiError, errorResponse, successResponse } from "@/lib/apiResponse";
import z from "zod";
import { validateBody } from "@/lib/validation";

const emailSchema = z.object({
  email: z.email("errors.invalidEmail"),
});

export async function POST(req: NextRequest) {
  try {
    const { email } = validateBody(await req.json(), emailSchema);
    if (!email) {
      throw new ApiError({
        message: "Email is required",
        messageKey: "auth.resendVerification.emailRequired",
        status: 400,
      });
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return successResponse({
        message: "If the email exists, a verification link will be sent",
        messageKey: "auth.resendVerification.checkEmail",
        // status: 200, // 200 is a default
      });
    }

    // Check if already verified
    if (user.emailVerified) {
      throw new ApiError({
        message: "Email is already verified",
        messageKey: "auth.resendVerification.alreadyVerified",
        status: 400,
      });
    }

    // Check if recently sent (rate limiting)
    if (user.verificationTokenExpires) {
      const timeSinceLastSent =
        Date.now() -
        (user.verificationTokenExpires.getTime() - 24 * 60 * 60 * 1000);
      if (timeSinceLastSent < 60000) {
        // 1 minute

        throw new ApiError({
          message: "Please wait before requesting another email",
          messageKey: "auth.resendVerification.rateLimited",
          status: 429,
        });
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

    return successResponse({
      message: "Verification email sent successfully!",
      messageKey: "auth.resendVerification.success",
      // status: 200, // 200 is a default
    });
  } catch (error) {
    return errorResponse(error);
  }
}
