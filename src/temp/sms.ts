// lib/sms.ts
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendOTP(phoneNumber: string, otp: string) {
  try {
    // تأكد أن رقم الموبايل بصيغة دولية (+20...)
    const formattedPhone = phoneNumber.startsWith('+') 
      ? phoneNumber 
      : `+2${phoneNumber}`;

    await client.messages.create({
      body: `Your verification code is: ${otp}\n\nThis code will expire in 10 minutes.\n\n- Your Store`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone,
    });

    console.log(`OTP sent successfully to ${formattedPhone}`);
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
}

export async function sendPasswordResetOTP(phoneNumber: string, otp: string) {
  try {
    const formattedPhone = phoneNumber.startsWith('+') 
      ? phoneNumber 
      : `+2${phoneNumber}`;

    await client.messages.create({
      body: `Your password reset code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this, please ignore this message.\n\n- Your Store`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone,
    });

    console.log(`Password reset OTP sent to ${formattedPhone}`);
  } catch (error) {
    console.error('Error sending reset OTP:', error);
    throw new Error('Failed to send reset OTP');
  }
}

// npm install twilio