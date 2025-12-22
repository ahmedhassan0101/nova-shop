// lib/otp-actions.ts
"use server";

import { otpStore } from "../otp-store";

export async function getLatestOTP() {

  if (process.env.SEND_REAL_SMS === "true") {
    return null;
  }
  const latest = otpStore.getLatest();
  if (!latest) {
    return null;
  }
  return {
    otp: latest.otp,
    phone: latest.phone,
    timestamp: latest.timestamp,
  };
}
