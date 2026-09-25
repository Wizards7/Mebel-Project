"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Truck,
  Wrench,
  Loader2,
  Save,
  CheckCircle2
} from "lucide-react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [siteName, setSiteName] = useState("");
  const [tagline, setTagline] = useState("");
  const [phone, setPhone] = useState("");
  const [displayPhone, setDisplayPhone] = useState("");
  const [whatsAppPhone, setWhatsAppPhone] = useState("");
  const [address, setAddress] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [deliveryText, setDeliveryText] = useState("");
  const [assemblyText, setAssemblyText] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        const s = data.setting;
        if (s) {
          setSiteName(s.siteName || "");
          setTagline(s.tagline || "");
          setPhone(s.phone || "");
          setDisplayPhone(s.displayPhone || "");
          setWhatsAppPhone(s.whatsAppPhone || "");
          setAddress(s.address || "");
          setWorkingHours(s.workingHours || "");
          setDeliveryText(s.deliveryText || "");
          setAssemblyText(s.assemblyText || "");
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteName,
          tagline,
          phone,
          displayPhone,
          whatsAppPhone,
          address,
          workingHours,
          deliveryText,
          assemblyText,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Хатогӣ ҳангоми сабти танзимот");

      setMessage("Танзимоти сомона бомуваффақият сабт ва нав карда шуд!");
    } catch (err: any) {
      setError(err.message || "Хатогӣ");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-stone-400">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-600" />
        <p className="text-sm font-medium">Танзимот боргирӣ шуда истодаанд...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 font-display">
          Танзимоти асосии тиҷорат
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
          Рақамҳои тамос, WhatsApp, суроға ва маълумоти таҳвил, ки дар сомона намоиш дода мешаванд
        </p>
      </div>

      {message && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Name & Tagline */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-soft-sm space-y-4">
          <h2 className="text-base font-bold text-stone-900 font-display">
            Ном ва шиори сомона
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Номи маркази мебел (Site Name)
              </label>
              <input
                type="text"
                required
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Шиори сомона (Tagline)
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers & WhatsApp */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-soft-sm space-y-4">
          <h2 className="text-base font-bold text-stone-900 font-display flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-600" />
            <span>Рақамҳои телефон ва WhatsApp</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Рақами телефони дохилӣ
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="111225554"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Рақам барои намоиш дар сайт
              </label>
              <input
                type="text"
                value={displayPhone}
                onChange={(e) => setDisplayPhone(e.target.value)}
                placeholder="+992 (11) 122-55-54"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Рақами WhatsApp (барои фармоиш)
              </label>
              <input
                type="text"
                value={whatsAppPhone}
                onChange={(e) => setWhatsAppPhone(e.target.value)}
                placeholder="992111225554"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-mono"
              />
              <span className="text-[10px] text-stone-400 mt-0.5 block">
                Формати байналмилалӣ бе аломати «+» (масалан: 992111225554)
              </span>
            </div>
          </div>
        </div>

        {/* Address & Hours */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-soft-sm space-y-4">
          <h2 className="text-base font-bold text-stone-900 font-display flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-600" />
            <span>Суроға ва Соатҳои корӣ</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Суроғаи марказ ё шоурум
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Соатҳои корӣ
              </label>
              <input
                type="text"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Delivery & Assembly Notes */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-soft-sm space-y-4">
          <h2 className="text-base font-bold text-stone-900 font-display flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>Маълумоти таҳвил ва насб</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Матни таҳвил (Delivery Text)
              </label>
              <input
                type="text"
                value={deliveryText}
                onChange={(e) => setDeliveryText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Матни насб (Assembly Text)
              </label>
              <input
                type="text"
                value={assemblyText}
                onChange={(e) => setAssemblyText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-70 text-white font-bold text-sm shadow-soft transition-all"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Сабт шуда истодааст...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Сабти танзимот</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
