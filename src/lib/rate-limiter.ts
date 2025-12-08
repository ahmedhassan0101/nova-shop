// lib/rate-limiter.ts
// حماية من إرسال OTP متكرر

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

/**
 * التحقق من Rate Limiting
 * @param identifier - معرّف فريد (رقم الهاتف أو IP)
 * @param maxAttempts - عدد المحاولات المسموحة
 * @param windowMs - النافذة الزمنية بالميلي ثانية (افتراضياً 15 دقيقة)
 */
export function checkRateLimit(
  identifier: string,
  maxAttempts: number = 3,
  windowMs: number = 15 * 60 * 1000
): { allowed: boolean; remainingAttempts: number; resetTime?: Date } {
  const now = Date.now();
  const record = store[identifier];

  // إذا لم يكن هناك سجل أو انتهت المدة
  if (!record || now > record.resetTime) {
    store[identifier] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return {
      allowed: true,
      remainingAttempts: maxAttempts - 1,
    };
  }

  // إذا تجاوز الحد المسموح
  if (record.count >= maxAttempts) {
    return {
      allowed: false,
      remainingAttempts: 0,
      resetTime: new Date(record.resetTime),
    };
  }

  // زيادة العداد
  record.count++;
  
  return {
    allowed: true,
    remainingAttempts: maxAttempts - record.count,
  };
}

/**
 * إعادة تعيين Rate Limit لمعرّف معين
 */
export function resetRateLimit(identifier: string): void {
  delete store[identifier];
}

/**
 * تنظيف السجلات المنتهية (يُشغَّل دورياً)
 */
export function cleanupExpiredRecords(): void {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (now > store[key].resetTime) {
      delete store[key];
    }
  });
}

// تشغيل التنظيف كل 5 دقائق
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredRecords, 5 * 60 * 1000);
}