// src/lib/locale-utils.ts

/**
 * Get the opposite locale
 */
export function getOppositeLocale(currentLocale: string): string {
  return currentLocale === "en" ? "ar" : "en";
}

/**
 * Check if current locale is RTL
 */
export function isRTL(locale: string): boolean {
  return locale === "ar";
}

/**
 * Get text direction
 */
export function getDirection(locale: string): "rtl" | "ltr" {
  return isRTL(locale) ? "rtl" : "ltr";
}

/**
 * Format currency based on locale
 */
export function formatCurrency(
  amount: number,
  locale: string,
  currency: string = "USD"
): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

/**
 * Format date based on locale
 */
export function formatDate(
  date: Date | string,
  locale: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  };

  return new Intl.DateTimeFormat(
    locale === "ar" ? "ar-EG" : "en-US",
    defaultOptions
  ).format(new Date(date));
}

/**
 * Format number based on locale
 */
export function formatNumber(number: number, locale: string): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(
    number
  );
}