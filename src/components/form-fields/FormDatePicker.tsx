import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { useLocale } from "next-intl";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { arEG, arSA, enUS } from "react-day-picker/locale";

interface FormDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function formatDate(date: Date | undefined, locale: string) {
  if (!date) return "";

  const isArabic = locale === "ar";

  return date.toLocaleDateString(isArabic ? "ar-EG" : "en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

export function FormDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  disabled,
  className = "",
}: FormDatePickerProps<T>) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(new Date());

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const displayValue = formatDate(field.value, locale);

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div className="relative flex gap-2">
                <Input
                  value={displayValue}
                  placeholder={placeholder}
                  disabled={disabled}
                  dir={isRTL ? "rtl" : "ltr"}
                  className={`bg-background ${isRTL ? "pr-10" : "pl-10"} ${className}`}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    if (isValidDate(date)) {
                      field.onChange(date);
                      setMonth(date);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setOpen(true);
                    }
                  }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      disabled={disabled}
                      className={`absolute top-1/2 ${isRTL ? "right-2" : "left-2"} size-6 -translate-y-1/2`}
                    >
                      <CalendarIcon className="size-3.5" />
                      <span className="sr-only">
                        {isRTL ? "اختر التاريخ" : "Select date"}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    // align={isRTL ? "start" : "end"}
                    align="start"
                    alignOffset={-8}
                    sideOffset={10}
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      captionLayout="dropdown"
                      month={month}
                      onMonthChange={setMonth}
                      onSelect={(date) => {
                        field.onChange(date);
                        setOpen(false);
                      }}
                      disabled={disabled}
                      dir={isRTL ? "rtl" : "ltr"}
                      locale={locale === "ar" ? arEG : enUS}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

// ============================================
// مثال الاستخدام مع next-intl
// ============================================

/*
import { z } from "zod";
import { useTranslations } from "next-intl";
import { FormDatePicker } from "./FormDatePicker";

// في الكومبوننت
const t = useTranslations("form");

const formSchema = z.object({
  birthDate: z.date({
    required_error: "errors.dateRequired",
    invalid_type_error: "errors.invalidDate",
  }),
  orderDate: z.date().optional(),
});

// الاستخدام
<FormDatePicker
  control={form.control}
  name="birthDate"
  label={t("birthDate.label")}
  description={t("birthDate.description")}
  placeholder={t("birthDate.placeholder")}
/>

// ============================================
// ملفات الترجمة
// ============================================

// messages/ar.json
{
  "form": {
    "birthDate": {
      "label": "تاريخ الميلاد",
      "description": "أدخل تاريخ ميلادك",
      "placeholder": "اختر التاريخ"
    }
  },
  "errors": {
    "dateRequired": "التاريخ مطلوب",
    "invalidDate": "التاريخ غير صحيح"
  }
}

// messages/en.json
{
  "form": {
    "birthDate": {
      "label": "Birth Date",
      "description": "Enter your birth date",
      "placeholder": "Select date"
    }
  },
  "errors": {
    "dateRequired": "Date is required",
    "invalidDate": "Invalid date"
  }
}
*/
