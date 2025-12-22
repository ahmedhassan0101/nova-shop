// app/api/user/complete-profile/route.ts
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
// import { validateBody } from "@/lib/validation";
import { ApiError, errorResponse, successResponse } from "@/lib/apiResponse";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new ApiError({
        message: "Unauthorized",
        messageKey: "",
        status: 401,
      });
    }

    const { step, data } = await req.json();

    // const { step, data } = validateBody(
    //   await req.json(),
    //   resetPasswordSchema
    // );
    await connectDB();

    const user = await User.findOne({
      $or: [{ _id: session.user.id }, { email: session.user.email }],
    });

    if (!user) {
      throw new ApiError({
        message: "User not found",
        messageKey: "",
        status: 404,
      });
    }

    switch (step) {
      case 2: // Addresses
        user.addresses = data.addresses;
        user.profileCompletionStep = 2;
        break;

      case 3: // Preferences
        const { dateOfBirth, gender, preferredLanguage, newsletter } = data;

        if (dateOfBirth) user.dateOfBirth = new Date(data.dateOfBirth);
        if (gender) user.gender = gender;
        if (preferredLanguage) user.preferredLanguage = preferredLanguage;

        user.newsletter = newsletter || false;
        user.profileCompletionStep = 3;
        user.isProfileComplete = true;
        break;

      default:
        throw new ApiError({
          message: "Invalid step",
          messageKey: "",
          status: 400,
        });
    }

    await user.save();

    return successResponse({
      message: "Profile updated successfully!",
      messageKey: "auth.resetPassword.success",
      data: {
        id: user._id,
        isProfileComplete: user.isProfileComplete,
        profileCompletionStep: user.profileCompletionStep,
      },
      // status: 200, // 200 is a default
    });
  } catch (error) {
    return errorResponse(error);
  }
}
