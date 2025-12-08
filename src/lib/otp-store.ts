// interface OTPEntry {
//   phone: string;
//   otp: string;
//   timestamp: number;
// }

// class OTPStore {
//   private otps: OTPEntry[] = [];

//   save(phone: string, otp: string) {
//     this.otps.push({
//       phone,
//       otp,
//       timestamp: Date.now(),
//     });

//     if (this.otps.length > 10) {
//       this.otps = this.otps.slice(-10);
//     }

//     const fifteenMinutesAgo = Date.now() - 15 * 60 * 1000;
//     this.otps = this.otps.filter(
//       (entry) => entry.timestamp > fifteenMinutesAgo
//     );
//   }

//   getLatest(): OTPEntry | null {
//     if (this.otps.length === 0) return null;
    
//     return this.otps[this.otps.length - 1];
//   }

//   getLatestForPhone(phone: string): OTPEntry | null {
//     const filtered = this.otps.filter((entry) => entry.phone === phone);
//     if (filtered.length === 0) return null;
//     return filtered[filtered.length - 1];
//   }

//   clear() {
//     this.otps = [];
//   }
// }

// // Singleton instance
// export const otpStore = new OTPStore();
// lib/otp-store.ts
interface OTPEntry {
  phone: string;
  otp: string;
  timestamp: number;
}

class OTPStore {
  private otps: OTPEntry[] = [];

  save(phone: string, otp: string) {
    console.log('💾 Saving OTP:', { phone, otp });
    
    this.otps.push({
      phone,
      otp,
      timestamp: Date.now(),
    });

    if (this.otps.length > 10) {
      this.otps = this.otps.slice(-10);
    }

    const fifteenMinutesAgo = Date.now() - 15 * 60 * 1000;
    this.otps = this.otps.filter(
      (entry) => entry.timestamp > fifteenMinutesAgo
    );
    
    console.log('✅ OTP saved. Total OTPs:', this.otps.length);
    console.log('📋 Current OTPs:', this.otps);
  }

  getLatest(): OTPEntry | null {
    console.log('🔍 Getting latest OTP. Total stored:', this.otps.length);
    
    if (this.otps.length === 0) {
      console.log('❌ No OTPs found');
      return null;
    }
    
    const latest = this.otps[this.otps.length - 1];
    console.log('✅ Latest OTP:', latest);
    return latest;
  }

  getLatestForPhone(phone: string): OTPEntry | null {
    const filtered = this.otps.filter((entry) => entry.phone === phone);
    if (filtered.length === 0) return null;
    return filtered[filtered.length - 1];
  }

  clear() {
    console.log('🗑️  Clearing all OTPs');
    this.otps = [];
  }
  
  // للتشخيص
  getAll() {
    return this.otps;
  }
}

// 🔥 استخدم globalThis للحفاظ على الـ Store في HMR
// هذا يمنع reset الـ Store في Development Mode
const globalForOTP = globalThis as unknown as {
  otpStore: OTPStore | undefined;
};

export const otpStore = globalForOTP.otpStore ?? new OTPStore();

// احفظ في globalThis
if (process.env.NODE_ENV !== 'production') {
  globalForOTP.otpStore = otpStore;
}