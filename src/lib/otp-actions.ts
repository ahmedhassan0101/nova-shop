// lib/otp-actions.ts
"use server";

import { otpStore } from "./otp-store";

// export async function getLatestOTP() {
  
//   if (process.env.SEND_REAL_SMS === "true") return null;

//   const latest = otpStore.getLatest();
//   console.log("🚀 ~ getLatestOTP ~ latest:", latest)

//   if (!latest) return null; 

//   return {
//     otp: latest.otp,
//     phone: latest.phone,
//     timestamp: latest.timestamp,
//   };
// }
export async function getLatestOTP() {
  console.log('🔍 getLatestOTP called');
  console.log('🔧 SEND_REAL_SMS:', process.env.SEND_REAL_SMS);
  
  if (process.env.SEND_REAL_SMS === "true") {
    console.log('⚠️  Real SMS mode - returning null');
    return null;
  }

  const latest = otpStore.getLatest();
  console.log("🚀 ~ getLatestOTP ~ latest:", latest);

  if (!latest) {
    console.log('❌ No OTP found in store');
    return null;
  }

  console.log('✅ Returning OTP:', latest.otp);
  return {
    otp: latest.otp,
    phone: latest.phone,
    timestamp: latest.timestamp,
  };
}