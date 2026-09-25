import { Product } from "@/types/product";
import { siteConfig } from "@/data/siteConfig";
import { formatPrice } from "./utils";

export function generateWhatsAppOrderLink(product: Product, pageUrl?: string): string {
  const rawPhone = product.phone || siteConfig.whatsAppPhone;
  // Normalize phone for wa.me: if 9 digits (e.g. 111225554), prepend 992
  let sanitizedPhone = rawPhone.replace(/\D/g, "");
  if (sanitizedPhone.length === 9) {
    sanitizedPhone = `992${sanitizedPhone}`;
  }

  const priceFormatted = formatPrice(product.price, product.currency || "сомонӣ");

  const lines = [
    "Салом, ман ба ин маҳсулот шавқ дорам:",
    `🛋️ ${product.name}`,
    `💰 Нарх: ${priceFormatted}`,
    product.size ? `📐 Андоза: ${product.size}` : null,
    product.material ? `🪵 Мавод: ${product.material}` : null,
    pageUrl ? `🔗 Саҳифа: ${pageUrl}` : null,
    "",
    "Лутфан, оид ба таҳвил ва фармоиш маълумот диҳед."
  ].filter(Boolean);

  const message = lines.join("\n");
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;
}

export function generateGeneralConsultationLink(customMessage?: string): string {
  let sanitizedPhone = siteConfig.whatsAppPhone.replace(/\D/g, "");
  if (sanitizedPhone.length === 9) {
    sanitizedPhone = `992${sanitizedPhone}`;
  }
  const defaultText = "Салом! Мехоҳам дар бораи мебели шумо ва нархҳо маълумот гирам.";
  const text = customMessage || defaultText;
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(text)}`;
}

export function generatePhoneCallLink(phone?: string): string {
  const rawPhone = phone || siteConfig.defaultPhone;
  let digits = rawPhone.replace(/\D/g, "");
  if (digits.length === 9) {
    digits = `+992${digits}`;
  } else if (!digits.startsWith("+")) {
    digits = `+${digits}`;
  }
  return `tel:${digits}`;
}
