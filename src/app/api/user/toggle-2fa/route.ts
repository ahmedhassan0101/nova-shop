// app/api/user/toggle-2fa/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { authOptions } from '@/config/authOptions';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { enabled } = await req.json();

    await connectDB();

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.twoFactorEnabled = enabled;
    
    // إذا disabled، امسح الـ secret
    if (!enabled) {
      user.twoFactorSecret = undefined;
    }

    await user.save();

    return NextResponse.json({
      message: `2FA ${enabled ? 'enabled' : 'disabled'} successfully`,
      success: true,
    });

  } catch (error) {
    console.error('Toggle 2FA error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}