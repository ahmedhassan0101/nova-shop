/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/user/request-deletion/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { sendAccountDeletionEmail } from "@/types/email-nodemailer";
import { authOptions } from "@/config/authOptions";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Send confirmation email
    if (user.email) {
      await sendAccountDeletionEmail(user.email, user.name);
    }

    // Option 1: Soft delete (deactivate)
    user.isActive = false;
    await user.save();

    // Option 2: Hard delete (uncomment if needed)
    // await User.findByIdAndDelete(session.user.id);

    return NextResponse.json({
      message: "Account deletion requested successfully",
      success: true,
    });
  } catch (error) {
    console.error("Request deletion error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
