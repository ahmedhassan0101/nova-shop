"use server";

import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import connectDB from "../mongodb";
import User from "@/models/User";
import { ApiError } from "../apiResponse";
import { actionErrorHandler, actionSuccess } from "../serverActionResponse";
import z from "zod";
import { validateBody } from "../validation";
// import { revalidatePath } from "next/cache";

export async function getProfileCompletionStep() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new ApiError({
        message: "Unauthorized",
        messageKey: "errors.unauthorized",
      });
    }

    await connectDB();
    const user = await User.findById(session.user.id, {
      profileCompletionStep: 1,
      isProfileComplete: 1,
    }).lean();

    if (!user) {
      throw new ApiError({
        message: "User not found",
        messageKey: "errors.userNotFound",
      });
    }

    return actionSuccess({
      message: "Profile step fetched successfully",
      messageKey: "profile.stepFetched",
      data: {
        currentStep: user.profileCompletionStep,
        isComplete: user.isProfileComplete || false,
      },
    });
  } catch (error) {
    actionErrorHandler(error);
  }
}

const updateStepSchema = z.object({
  step: z.number().min(1).max(3),
});

export async function updateProfileStep(step: number) {
  try {
    const validated = validateBody({ step }, updateStepSchema);
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new ApiError({
        message: "Unauthorized",
        messageKey: "errors.unauthorized",
      });
    }

    await connectDB();

    const result = await User.updateOne(
      { userId: session.user.id },
      {
        $set: {
          profileCompletionStep: validated.step,
          isProfileComplete: validated.step > 3,
        },
      }
    );

    if (result.matchedCount === 0) {
      throw new ApiError({
        message: "User not found",
        messageKey: "errors.userNotFound",
      });
    }

    // Revalidate the profile page
    // revalidatePath("/profile/complete");

    return actionSuccess({
      message: "Profile step updated successfully",
      messageKey: "profile.stepUpdated",
      data: {
        step: validated.step,
        isComplete: validated.step > 3,
      },
    });
  } catch (error) {
    actionErrorHandler(error);
  }
}
