"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { formatPrice, formatPhone } from "@/lib/utils";
import { generateWhatsAppOrderLink, generatePhoneCallLink } from "@/lib/whatsapp";
import { siteConfig } from "@/data/siteConfig";
import { MessageCircle, Phone, Truck, Wrench, CheckCircle2, ShieldCheck, Tag, ShoppingBag } from "lucide-react";
import Badge from "@/components/ui/Badge";
import OrderModal from "@/components/order/OrderModal";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const whatsAppLink = generateWhatsAppOrderLink(product);
  const rawPhone = product.phone || siteConfig.defaultPhone;
  const phoneCallLink = generatePhoneCallLink(rawPhone);
  const displayPhoneFormatted = formatPhone(rawPhone);

  return (
    <div className="space-y-6">
      {/* Category & Tags Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="brand" icon={<Tag className="w-3 h-3" />}>
            {product.categoryName}
          </Badge>
          {product.featured && (
            <Badge variant="warning">Маҳсулоти машҳур</Badge>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
          {product.name}
        </h1>
      </div>

      {/* Pricing Section */}
      <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider block mb-0.5">
            Нархи маҳсулот:
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-display">
            {formatPrice(product.price, product.currency)}
          </div>
        </div>
        {product.price ? (
          <div className="text-xs text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-3 py-1.5 rounded-xl font-medium self-start sm:self-center">
            Нархи муқарраршуда
          </div>
        ) : (
          <div className="text-xs text-brand-800 bg-brand-100/70 border border-brand-200 px-3 py-1.5 rounded-xl font-medium self-start sm:self-center">
            Мувофиқи дархости муштарӣ
          </div>
        )}
      </div>

      {/* Delivery & Assembly Status Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/70 text-emerald-900 text-sm">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-xs uppercase tracking-wide text-emerald-800">Доставка</div>
            <div className="text-xs font-semibold text-emerald-950">{siteConfig.deliveryText}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-900 text-sm">
          <div className="w-8 h-8 rounded-lg bg-stone-800 text-white flex items-center justify-center flex-shrink-0">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-xs uppercase tracking-wide text-stone-600">Насб ва васл</div>
            <div className="text-xs font-semibold text-stone-950">
              {product.assemblyAvailable ? "Дастрас аст (насби касбӣ)" : "Тибқи маслиҳат"}
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Table (Хусусиятҳо) */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-soft-sm">
        <div className="px-5 py-3.5 bg-stone-100/80 border-b border-stone-200 font-bold text-sm text-stone-900">
          Хусусиятҳои асосӣ
        </div>
        <dl className="divide-y divide-stone-100 text-sm">
          {product.size && (
            <div className="px-5 py-3 grid grid-cols-3 gap-4">
              <dt className="text-stone-500 font-medium">Андоза (Size):</dt>
              <dd className="col-span-2 font-bold text-stone-900">
                {product.size}
              </dd>
            </div>
          )}
          {product.material && (
            <div className="px-5 py-3 grid grid-cols-3 gap-4">
              <dt className="text-stone-500 font-medium">Мавод (Material):</dt>
              <dd className="col-span-2 font-semibold text-stone-900">
                {product.material}
              </dd>
            </div>
          )}
          <div className="px-5 py-3 grid grid-cols-3 gap-4">
            <dt className="text-stone-500 font-medium">Категория:</dt>
            <dd className="col-span-2 font-semibold text-stone-900">
              {product.categoryName}
            </dd>
          </div>
          <div className="px-5 py-3 grid grid-cols-3 gap-4">
            <dt className="text-stone-500 font-medium">Телефони фурӯшанда:</dt>
            <dd className="col-span-2 font-bold text-brand-700">
              <a href={phoneCallLink} className="hover:underline">
                {displayPhoneFormatted}
              </a>
            </dd>
          </div>
        </dl>
      </div>

      {/* Included Items / Комплектность */}
      {product.includedItems && product.includedItems.length > 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-soft-sm space-y-3">
          <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider font-display">
            Чиҳо ба комплект дохил мешаванд:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {product.includedItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-sm text-stone-800 bg-stone-50 px-3.5 py-2.5 rounded-xl border border-stone-200/60"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description if provided */}
      {product.description && (
        <div className="text-sm text-stone-600 leading-relaxed bg-stone-50/60 p-4 rounded-xl border border-stone-200/60">
          <span className="font-semibold text-stone-900 block mb-1">Тавзеҳот:</span>
          {product.description}
        </div>
      )}

      {/* Primary Action Section: Order Modal Button + WhatsApp Option */}
      <div className="space-y-3 pt-2">
        {/* Main CTA: Opens Order Form directly on website */}
        <button
          onClick={() => setIsOrderModalOpen(true)}
          className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-base shadow-soft-lg hover:shadow-soft-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <ShoppingBag className="w-5 h-5 text-brand-400" />
          <span>Фармоиш додан (Order Online)</span>
        </button>

        {/* Secondary CTA: WhatsApp direct */}
        <a
          href={whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-soft transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
          <span>Фармоиш ё маслиҳат бо WhatsApp</span>
        </a>

        {/* Direct Phone Call */}
        <a
          href={phoneCallLink}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-6 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors border border-stone-200"
        >
          <Phone className="w-3.5 h-3.5 text-stone-600" />
          <span>Занг задан: {displayPhoneFormatted}</span>
        </a>

        <div className="flex items-center justify-center gap-2 text-xs text-stone-500 pt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Маълумоти пурра ва маслиҳат ройгон аст</span>
        </div>
      </div>

      {/* Order Modal Component */}
      <OrderModal
        product={product}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </div>
  );
}
