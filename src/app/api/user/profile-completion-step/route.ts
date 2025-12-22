// app/api/user/profile-completion-step/route.ts
import { getServerSession } from "next-auth";
import User from "@/models/User";
import { authOptions } from "@/config/authOptions";
import connectDB from "@/lib/mongodb";
import { ApiError, errorResponse } from "@/lib/apiResponse";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new ApiError({
        message: "Unauthorized",
        messageKey: "",
        status: 401,
      });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.id });

    return Response.json({
      currentStep: user?.profileCompletionStep || 2,
      isComplete: user?.isProfileComplete || false,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
