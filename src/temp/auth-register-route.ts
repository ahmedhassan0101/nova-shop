// app/api/auth/register/route.ts (تحديث الجزء الخاص بالـ OTP)
import { sendOTP } from '@/lib/sms';

// ... داخل الـ POST function
if (registerWith === 'phone' && phone) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  user.otp = await bcrypt.hash(otp, 10);
  user.otpExpires = otpExpires;
  await user.save();

  // إرسال OTP عبر SMS
  await sendOTP(phone, otp);

  return NextResponse.json({
    message: 'Registration successful! Please verify your phone with the OTP sent.',
    userId: user._id,
    requiresOTP: true,
  });
}