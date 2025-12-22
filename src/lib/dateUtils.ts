// lib/dateUtils.ts
import { format, parseISO, formatISO, isValid } from "date-fns";
import { ar } from "date-fns/locale";

/*
 * @returns "2025-12-10T12:30:00.000Z"
 */

export function formatForDB(
  date: Date | string | null | undefined
): string | null {
  if (!date) return null;

  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    if (!isValid(dateObj)) return null;

    return formatISO(dateObj); // ISO 8601 format
  } catch {
    return null;
  }
}


export function formatForMongoDB(
  date: Date | string | null | undefined
): Date | null {
  if (!date) return null;

  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    if (!isValid(dateObj)) return null;
    return dateObj;
  } catch {
    return null;
  }
}


export function formatDateByLocale(
  date: Date | string | null | undefined,
  locale: string = "ar"
): string {
  if (!date) return "-";

  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    if (!isValid(dateObj)) return "-";

    const isArabic = locale === "ar";

    return format(dateObj, "dd MMMM yyyy", {
      locale: isArabic ? ar : undefined,
    });
  } catch {
    return "-";
  }
}

export function formatDateShort(
  date: Date | string | null | undefined,
  locale: string = "ar"
): string {
  if (!date) return "-";

  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    if (!isValid(dateObj)) return "-";

    const isArabic = locale === "ar";
    return format(dateObj, isArabic ? "dd/MM/yyyy" : "MM/dd/yyyy");
  } catch {
    return "-";
  }
}


export function formatDateTime(
  date: Date | string | null | undefined,
  locale: string = "ar"
): string {
  if (!date) return "-";

  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    if (!isValid(dateObj)) return "-";

    const isArabic = locale === "ar";

    return format(dateObj, "dd MMMM yyyy، hh:mm a", {
      locale: isArabic ? ar : undefined,
    });
  } catch {
    return "-";
  }
}


export function getRelativeTime(
  date: Date | string | null | undefined,
  locale: string = "ar"
): string {
  if (!date) return "-";

  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    if (!isValid(dateObj)) return "-";

    const now = new Date();
    const diffInMs = now.getTime() - dateObj.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    const isArabic = locale === "ar";

    if (diffInMinutes < 1) return isArabic ? "الآن" : "Now";
    if (diffInMinutes < 60) {
      return isArabic
        ? `منذ ${diffInMinutes} دقيقة`
        : `${diffInMinutes} minutes ago`;
    }
    if (diffInHours < 24) {
      return isArabic ? `منذ ${diffInHours} ساعة` : `${diffInHours} hours ago`;
    }
    if (diffInDays < 7) {
      return isArabic ? `منذ ${diffInDays} يوم` : `${diffInDays} days ago`;
    }

    return formatDateByLocale(dateObj, locale);
  } catch {
    return "-";
  }
}

// ============================================
// 4️⃣ مثال الاستخدام مع MongoDB و next-intl
// ============================================

/*
// ============================================
// في Server Action (MongoDB)
// ============================================
import { formatForMongoDB } from "@/lib/dateUtils";

async function createOrder(data: any) {
  await db.collection("orders").insertOne({
    ...data,
    orderDate: formatForMongoDB(data.orderDate), // ✅ Date Object
    deliveryDate: formatForMongoDB(data.deliveryDate),
    createdAt: new Date(), // ✅ أو Date Object مباشرة
  });
}

// ============================================
// في الكومبوننت للعرض (مع next-intl)
// ============================================
import { formatDateByLocale, getRelativeTime } from "@/lib/dateUtils";
import { useLocale } from "next-intl";

function OrderCard({ order }) {
  const locale = useLocale();
  
  return (
    <div>
      <p>
        {locale === "ar" ? "تاريخ الطلب:" : "Order Date:"}
        {formatDateByLocale(order.orderDate, locale)}
      </p>
      <p>
        {locale === "ar" ? "منذ:" : "Since:"}
        {getRelativeTime(order.createdAt, locale)}
      </p>
    </div>
  );
}

// ============================================
// في Form Submit Handler
// ============================================
import { formatForMongoDB } from "@/lib/dateUtils";

const onSubmit = async (data: FormValues) => {
  const payload = {
    ...data,
    birthDate: formatForMongoDB(data.birthDate),
    orderDate: formatForMongoDB(data.orderDate),
  };
  
  // إرسال للـ API
  await createOrder(payload);
};
*/
