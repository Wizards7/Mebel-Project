import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price?: number | null, currency = "сомонӣ"): string {
  if (price === undefined || price === null) {
    return "Нарх бо дархост";
  }
  return `${price.toLocaleString("ru-RU")} ${currency}`;
}

export function formatPhone(phone: string): string {
  // If e.g. 111225554 or 992111225554
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 9) {
    return `+992 (${digits.slice(0, 2)}) ${digits.slice(2, 5)}-${digits.slice(5, 7)}-${digits.slice(7, 9)}`;
  }
  if (digits.length === 12 && digits.startsWith("992")) {
    return `+992 (${digits.slice(3, 5)}) ${digits.slice(5, 8)}-${digits.slice(8, 10)}-${digits.slice(10, 12)}`;
  }
  return phone;
}
