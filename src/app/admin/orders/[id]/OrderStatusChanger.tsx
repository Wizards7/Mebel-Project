"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Clock, Truck, Check, XCircle, Loader2, Save } from "lucide-react";

interface OrderStatusChangerProps {
  orderId: number;
  initialStatus: string;
  initialNotes: string;
}

const STATUS_OPTIONS = [
  { key: "NEW", label: "НАВ (Интизори тасдиқ)", desc: "Фармоиши тоза воридшуда" },
  { key: "CONTACTED", label: "ДАР ТАМОС", desc: "Бо муштарӣ тамос гирифта шуд" },
  { key: "CONFIRMED", label: "ТАСДИҚШУДА", desc: "Фармоиш ва нарх тасдиқ шуд" },
  { key: "DELIVERING", label: "ДАР РОҲИ ТАҲВИЛ", desc: "Мебел ба роҳ баромад" },
  { key: "COMPLETED", label: "АНҶОМЁФТА", desc: "Таҳвил ва васл ба охир расид" },
  { key: "CANCELLED", label: "БЕКОРШУДА", desc: "Фармоиш рад ё бекор карда шуд" },
];

export default function OrderStatusChanger({
  orderId,
  initialStatus,
  initialNotes,
}: OrderStatusChangerProps) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [adminNotes, setAdminNotes] = useState(initialNotes);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async (newStatus?: string) => {
    const targetStatus = newStatus || status;
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: targetStatus,
          adminNotes,
        }),
      });

      if (res.ok) {
        setStatus(targetStatus);
        setMessage("Ҳолат бомуваффақият нав шуд!");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-soft-sm p-6 space-y-5">
      <h2 className="text-base font-bold text-stone-900 font-display">
        Идоракунии ҳолати фармоиш
      </h2>

      {message && (
        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          {message}
        </div>
      )}

      {/* Status Pipeline Buttons */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
          Ҳолати кунунӣ:
        </label>

        <div className="space-y-1.5">
          {STATUS_OPTIONS.map((opt) => {
            const isSelected = status === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => handleUpdate(opt.key)}
                disabled={saving}
                className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                  isSelected
                    ? "bg-brand-50 border-brand-500 text-brand-950 font-bold ring-2 ring-brand-500/20"
                    : "bg-stone-50/70 border-stone-200 text-stone-700 hover:bg-stone-100"
                }`}
              >
                <div>
                  <div className="font-bold">{opt.label}</div>
                  <div className="text-[10px] text-stone-400 font-normal">{opt.desc}</div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-brand-600 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Internal Admin Notes */}
      <div className="pt-3 border-t border-stone-100 space-y-2">
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
          Қайдҳои дохилии админ:
        </label>
        <textarea
          rows={3}
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          placeholder="Масалан: Бо муштарӣ гап задем, таҳвил рӯзи шанбе соати 14:00..."
          className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />

        <button
          type="button"
          disabled={saving}
          onClick={() => handleUpdate()}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-70 text-white text-xs font-bold shadow-soft transition-all"
        >
          {saving ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Сабт...</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Сабти қайдҳо</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
