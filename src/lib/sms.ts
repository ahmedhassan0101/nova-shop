/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vonage } from "@vonage/server-sdk";
import { otpStore } from "./otp-store";

const SEND_REAL_SMS = process.env.SEND_REAL_SMS === "true";

if (!SEND_REAL_SMS) {
  console.log("⚠️  SMS Sending is DISABLED. Set SEND_REAL_SMS=true to enable.");
}

if (
  (SEND_REAL_SMS && !process.env.VONAGE_API_KEY) ||
  !process.env.VONAGE_API_SECRET
) {
  throw new Error(
    "Vonage credentials are not configured. Please add VONAGE_API_KEY and VONAGE_API_SECRET to .env.local"
  );
}

const vonage = SEND_REAL_SMS
  ? new Vonage({
      apiKey: process.env.VONAGE_API_KEY,
      apiSecret: process.env.VONAGE_API_SECRET,
    })
  : null;

const BRAND_NAME = process.env.VONAGE_BRAND_NAME || "My App";
// const FROM = process.env.VONAGE_VIRTUAL_NUMBER || 'Vonage';

function formatPhoneNumber(phone: string): string {
  // "(010) 123-4567" → "0101234567"
  const cleaned = phone.replace(/\s+/g, "").replace(/[()-]/g, "");

  // "+201001234567" → "201001234567"
  if (cleaned.startsWith("+")) {
    return cleaned.substring(1);
  }

  // "01012345678" → "201012345678"
  if (cleaned.startsWith("01")) {
    return `2${cleaned}`;
  }

  // "201012345678" Return it as it is
  if (cleaned.startsWith("2")) {
    return cleaned;
  }

  return `2${cleaned}`;
}

export async function sendOTP(phoneNumber: string, otp: string): Promise<void> {
  const formattedPhone = formatPhoneNumber(phoneNumber);

  if (!SEND_REAL_SMS) {
    console.log("🎯 MOCK SMS Mode - Saving OTP to store");
    console.log("📞 Phone:", formattedPhone);
    console.log("🔐 OTP:", otp);

    otpStore.save(formattedPhone, otp);

    console.log("\n" + "=".repeat(60));
    console.log("📱 MOCK SMS - OTP CODE");
    console.log("=".repeat(60));
    console.log("📞 Phone: +" + formattedPhone);
    console.log("🔐 OTP: " + otp);
    console.log("⏰ Expires in: 10 minutes");
    console.log("=".repeat(60));
    console.log("💡 The OTP will be displayed on screen for testing");
    console.log("=".repeat(60) + "\n");
    return;
  }

  try {
    const message = `Your verification code is: ${otp}

    This code will expire in 10 minutes.

    Do not share this code with anyone.

    - ${BRAND_NAME}`;
    console.log("🚀 ~ sendOTP ~ message:", message);

    const response = await vonage!.sms.send({
      to: formattedPhone,
      from: BRAND_NAME,
      text: message,
    });

    if (response.messages[0].status !== "0") {
      throw new Error(response.messages?.[0].errorText || "Failed to send SMS");
    }

    console.log(`✅ OTP sent successfully to +${formattedPhone}`);
    console.log(
      `💰 Remaining balance: ${response.messages[0]["remaining-balance"]}`
    );
  } catch (error: any) {
    console.error("❌ SMS Error:", error.message);
    throw new Error("Failed to send verification code");
  }
}

export async function sendPasswordResetOTP(
  phoneNumber: string,
  otp: string
): Promise<void> {
  const formattedPhone = formatPhoneNumber(phoneNumber);

  if (!SEND_REAL_SMS) {
    otpStore.save(formattedPhone, otp);

    console.log("\n📱 MOCK SMS - Password Reset");
    console.log("📞 Phone: +" + formattedPhone);
    console.log("🔐 OTP: " + otp);
    console.log("");
    return;
  }
  try {
    const message = `Your password reset code is: ${otp}

    This code will expire in 10 minutes.

    If you didn't request this, please ignore this message.

    - ${BRAND_NAME}`;
    const response = await vonage!.sms.send({
      to: formattedPhone,
      from: BRAND_NAME,
      text: message,
    });

    if (response.messages[0].status !== "0") {
      throw new Error(response.messages?.[0].errorText || "Failed to send SMS");
    }

    console.log(`✅ OTP sent successfully to +${formattedPhone}`);
    console.log(
      `💰 Remaining balance: ${response.messages[0]["remaining-balance"]}`
    );
  } catch (error: any) {
    console.error("❌ SMS Error:", error.message);
    throw new Error("Failed to send password reset code. Please try again.");
  }
}

// export async function getBalance(): Promise<number> {
//   if (!vonage) return 0;
//   try {
//     const balance = await vonage.account.getBalance();
//     return parseFloat(balance.value);
//   } catch (error) {
//     console.error('Error getting balance:', error);
//     return 0;
//   }
// }

// export async function validatePhoneNumber(phoneNumber: string): Promise<{
//   valid: boolean;
//   country?: string;
//   type?: string;
// }> {
//   try {
//     const formattedPhone = formatPhoneNumber(phoneNumber);

//     const result = await vonage.numberInsight.basic({
//       number: formattedPhone,
//     });

//     return {
//       valid: result.status === 0,
//       country: result.country_name,
//       type: result.number_type,
//     };
//   } catch (error) {
//     console.error('Error validating phone number:', error);
//     return { valid: false };
//   }
// }
