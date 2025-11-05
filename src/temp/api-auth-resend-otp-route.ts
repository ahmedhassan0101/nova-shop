// app/api/auth/resend-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { sendOTP } from '@/lib/sms';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    await connectDB();

    const user = await User.findById(userId);

    if (!user || !user.phone) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    if (user.phoneVerified) {
      return NextResponse.json(
        { error: 'Phone already verified' },
        { status: 400 }
      );
    }

    // إنشاء OTP جديد
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = await bcrypt.hash(otp, 10);
    user.otpExpires = otpExpires;
    await user.save();

    // إرسال OTP
    await sendOTP(user.phone, otp);

    return NextResponse.json({
      message: 'OTP sent successfully',
      success: true,
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}