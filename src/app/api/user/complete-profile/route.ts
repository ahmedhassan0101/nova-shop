// app/api/user/complete-profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { authOptions } from '@/config/authOptions';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { step, data } = await req.json();

    await connectDB();

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Step 2: إضافة العنوان
    if (step === 2) {
      const { addresses } = data;
      user.addresses = addresses;
      user.profileCompletionStep = 2;
    }

    // Step 3: التفضيلات
    if (step === 3) {
      const { dateOfBirth, gender, preferredLanguage, newsletter } = data;
      
      if (dateOfBirth) user.dateOfBirth = dateOfBirth;
      if (gender) user.gender = gender;
      if (preferredLanguage) user.preferredLanguage = preferredLanguage;
      user.newsletter = newsletter || false;
      
      user.profileCompletionStep = 3;
      user.isProfileComplete = true;
    }

    await user.save();

    return NextResponse.json({
      message: 'Profile updated successfully!',
      user: {
        id: user._id,
        isProfileComplete: user.isProfileComplete,
        profileCompletionStep: user.profileCompletionStep,
      },
    });

  } catch (error) {
    console.error('Profile completion error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}