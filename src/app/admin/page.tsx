"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Layers,
  ShoppingBag,
  Users,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  TrendingUp
} from "lucide-react";
import { formatPrice, formatPhone } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; bg: string; text: string }> = {
      NEW: { label: "НАВ", bg: "bg-amber-100", text: "text-amber-800" },
      CONTACTED: { label: "ДАР ТАМОС", bg: "bg-blue-100", text: "text-blue-800" },
      CONFIRMED: { label: "ТАСДИҚШУДА", bg: "bg-indigo-100", text: "text-indigo-800" },
      DELIVERING: { label: "ДАР РОҲ", bg: "bg-purple-100", text: "text-purple-800" },
      COMPLETED: { label: "АНҶОМЁФТА", bg: "bg-emerald-100", text: "text-emerald-800" },
      CANCELLED: { label: "БЕКОРШУДА", bg: "bg-stone-200", text: "text-stone-700" },
    };

    const s = statusMap[status] || { label: status, bg: "bg-stone-100", text: "text-stone-800" };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${s.bg} ${s.text}`}>
        {s.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-stone-200 rounded-lg w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-stone-200 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const metrics = data?.metrics || {
    totalProducts: 0,
    totalCategories: 6,
    newOrdersCount: 0,
    totalClients: 0,
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display tracking-tight">
            Хуш омадед ба панели админ!
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Омори умумии сомона, маҳсулотҳо ва фармоишҳои нав
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-soft transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Иловаи маҳсулот</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: New Orders */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-soft-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Фармоишҳои нав
            </span>
            <div className="text-3xl font-extrabold text-amber-600 font-display">
              {metrics.newOrdersCount}
            </div>
            <span className="text-[11px] text-stone-400 block">
              Интизори тасдиқ ва занг
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Total Products */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-soft-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Маҳсулотҳо
            </span>
            <div className="text-3xl font-extrabold text-stone-900 font-display">
              {metrics.totalProducts}
            </div>
            <span className="text-[11px] text-emerald-700 block font-medium">
              {metrics.activeProducts || metrics.totalProducts} фаъол дар сомона
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Total Clients */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-soft-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Муштариён
            </span>
            <div className="text-3xl font-extrabold text-stone-900 font-display">
              {metrics.totalClients}
            </div>
            <span className="text-[11px] text-stone-400 block">
              Дар база сабтшуда
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Categories */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-soft-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Категорияҳо
            </span>
            <div className="text-3xl font-extrabold text-stone-900 font-display">
              {metrics.totalCategories}
            </div>
            <span className="text-[11px] text-stone-400 block">
              Бахшҳои мебел
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <Layers className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-soft-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900 font-display">
              Фармоишҳои охирин
            </h2>
            <p className="text-xs text-stone-500">
              Муштариёне, ки ба наздикӣ фармоиш додаанд
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
          >
            <span>Ҳамаи фармоишҳо</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {data?.recentOrders && data.recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-50 text-stone-500 text-xs font-semibold uppercase tracking-wider border-b border-stone-100">
                <tr>
                  <th className="px-6 py-3.5">Фармоиш</th>
                  <th className="px-6 py-3.5">Муштарӣ</th>
                  <th className="px-6 py-3.5">Маҳсулот</th>
                  <th className="px-6 py-3.5">Маблағ</th>
                  <th className="px-6 py-3.5">Ҳолат</th>
                  <th className="px-6 py-3.5 text-right">Амал</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {data.recentOrders.map((order: any) => {
                  const firstItem = order.items?.[0];
                  return (
                    <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="px-6 py-4 font-bold text-stone-900">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-stone-900">{order.clientName}</div>
                        <div className="text-xs text-stone-500 font-mono">
                          {formatPhone(order.clientPhone)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-stone-800">
                          {firstItem?.productName || "Маҳсулот"}
                        </div>
                        {order.items?.length > 1 && (
                          <div className="text-xs text-stone-400">
                            + боз {order.items.length - 1} адад
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-bold text-stone-950 font-display">
                        {formatPrice(order.totalPrice)}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-800"
                        >
                          Дидан <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-stone-400 text-sm">
            Ҳоло ҳеҷ як фармоиш қабул нашудааст.
          </div>
        )}
      </div>
    </div>
  );
}
