"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { generateWhatsAppOrderLink } from "@/lib/whatsapp";
import { X, CheckCircle2, Loader2, MessageCircle, Truck, ShoppingBag, ShieldCheck } from "lucide-react";

interface OrderModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({ product, isOpen, onClose }: OrderModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+992 ");
  const [city, setCity] = useState("Душанбе");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdOrderId, setCreatedOrderId] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          name,
          phone,
          city,
          address,
          quantity: Number(quantity),
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Хатогӣ ҳангоми сабти фармоиш");
      }

      setCreatedOrderId(data.orderId);
    } catch (err: any) {
      setError(err.message || "Хатогии номаълум");
    } finally {
      setLoading(false);
    }
  };

  const primaryImage = product.images[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=300";
  const whatsAppLink = generateWhatsAppOrderLink(product);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-stone-100 bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-500/10 text-brand-700 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 font-display">
                Барасмиятдарории фармоиш
              </h3>
              <p className="text-xs text-stone-500">
                Маълумоти худро ворид намоед ва мо бо шумо тамос мегирем
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6">
          {createdOrderId ? (
            /* Success View */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-soft">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xl font-bold font-display text-stone-900">
                  Ташаккур! Фармоиши шумо қабул шуд
                </h4>
                <div className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-extrabold">
                  Рақами фармоиш: #{createdOrderId}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto pt-2">
                  Мутахассиси мо ба наздикӣ бо рақами <b>{phone}</b> барои тасдиқи вақти таҳвил ва насб тамос мегирад.
                </p>
              </div>

              <div className="pt-4 flex flex-col gap-2.5">
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-soft transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Чат дар WhatsApp оид ба фармоиш</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-semibold transition-colors"
                >
                  Пӯшидани равзана
                </button>
              </div>
            </div>
          ) : (
            /* Order Form View */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Preview Card */}
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-200 flex-shrink-0">
                  <Image
                    src={primaryImage}
                    alt={product.name}
                    fill
                    sizes="60px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-stone-900 truncate">
                    {product.name}
                  </h4>
                  <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                    {product.size && <span>Андоза: {product.size}</span>}
                    {product.material && <span>• {product.material}</span>}
                  </div>
                  <div className="text-sm font-extrabold text-stone-950 font-display mt-0.5">
                    {formatPrice(product.price, product.currency)}
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {error}
                </div>
              )}

              {/* Form inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Ному насаб <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Масалан: Алиҷон Раҳимов"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-stone-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Рақами телефон <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+992 900 00 00 00"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Шаҳр ё ноҳия <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all bg-white"
                    >
                      <option value="Душанбе">ш. Душанбе</option>
                      <option value="Хуҷанд">ш. Хуҷанд</option>
                      <option value="Кӯлоб">ш. Кӯлоб</option>
                      <option value="Бохтар">ш. Бохтар</option>
                      <option value="Истаравшан">ш. Истаравшан</option>
                      <option value="Турсунзода">ш. Турсунзода</option>
                      <option value="Ваҳдат">ш. Ваҳдат</option>
                      <option value="Дигар ноҳия">Дигар ноҳия</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Суроғаи дақиқ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Масалан: кӯчаи Борбад 45, хонаи 12"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-stone-400"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 items-end">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Миқдор
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm text-center font-bold focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Шарҳи иловагӣ (ихтиёрӣ)
                    </label>
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Ранг ё вақти мувофиқ"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-stone-400"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Note */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-medium border border-emerald-200/60">
                <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Доставка дар тамоми Тоҷикистон дастрас аст</span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-70 text-white font-bold text-sm shadow-soft transition-all active:scale-[0.99]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Сабти фармоиш...</span>
                    </>
                  ) : (
                    <span>Тасдиқи фармоиш</span>
                  )}
                </button>

                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-emerald-700 hover:bg-emerald-50 text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-50" />
                  <span>Фармоиш мустақиман бо WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
