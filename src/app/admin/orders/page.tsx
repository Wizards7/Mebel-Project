"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Filter
} from "lucide-react";
import { formatPrice, formatPhone } from "@/lib/utils";

const ORDER_STATUSES = [
  { key: "ALL", label: "Ҳамаи фармоишҳо" },
  { key: "NEW", label: "НАВ", bg: "bg-amber-100 text-amber-800" },
  { key: "CONTACTED", label: "ДАР ТАМОС", bg: "bg-blue-100 text-blue-800" },
  { key: "CONFIRMED", label: "ТАСДИҚШУДА", bg: "bg-indigo-100 text-indigo-800" },
  { key: "DELIVERING", label: "ДАР РОҲИ ТАҲВИЛ", bg: "bg-purple-100 text-purple-800" },
  { key: "COMPLETED", label: "АНҶОМЁФТА", bg: "bg-emerald-100 text-emerald-800" },
  { key: "CANCELLED", label: "БЕКОРШУДА", bg: "bg-stone-200 text-stone-700" },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [statusUpdatingId, setStatusUpdatingId] = useState<number | null>(null);

  const fetchOrders = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeStatus !== "ALL") params.set("status", activeStatus);
    if (search) params.set("search", search);

    fetch(`/api/admin/orders?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, [activeStatus]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  const handleQuickStatusChange = async (orderId: number, newStatus: string) => {
    setStatusUpdatingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const s = ORDER_STATUSES.find((item) => item.key === status);
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${s?.bg || "bg-stone-100 text-stone-800"}`}>
        {s?.label || status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 font-display">
            Идоракунии фармоишҳо
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Фармоишҳои аз сомона расида, тағийри ҳолатҳо ва маълумоти муштариён
          </p>
        </div>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft-sm space-y-4">
        {/* Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {ORDER_STATUSES.map((item) => {
            const isSelected = activeStatus === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveStatus(item.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                  isSelected
                    ? "bg-stone-900 text-white shadow-soft"
                    : "bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ҷустуҷӯ аз рӯи номи муштарӣ, телефон ё суроға..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold transition-colors"
          >
            Ҷустуҷӯ
          </button>
        </form>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-soft-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-400">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-600" />
            <p className="text-sm font-medium">Фармоишҳо боргирӣ шуда истодаанд...</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-50 text-stone-500 text-xs font-semibold uppercase tracking-wider border-b border-stone-100">
                <tr>
                  <th className="px-6 py-3.5">Фармоиш</th>
                  <th className="px-6 py-3.5">Муштарӣ / Телефон</th>
                  <th className="px-6 py-3.5">Шаҳр ва Суроға</th>
                  <th className="px-6 py-3.5">Маҳсулот (Item)</th>
                  <th className="px-6 py-3.5">Маблағ</th>
                  <th className="px-6 py-3.5">Ҳолат (Status)</th>
                  <th className="px-6 py-3.5 text-right">Муфассал</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((order) => {
                  const firstItem = order.items?.[0];
                  return (
                    <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="px-6 py-4 font-bold text-stone-900 whitespace-nowrap">
                        <div className="text-sm">#{order.id}</div>
                        <div className="text-[10px] text-stone-400 font-normal">
                          {new Date(order.createdAt).toLocaleDateString("tg-TJ", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-bold text-stone-900">{order.clientName}</div>
                        <a
                          href={`tel:+${order.clientPhone}`}
                          className="text-xs text-brand-700 font-mono hover:underline inline-flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          {formatPhone(order.clientPhone)}
                        </a>
                      </td>

                      <td className="px-6 py-4 text-xs text-stone-600">
                        <div className="font-semibold text-stone-900">{order.city}</div>
                        <div className="truncate max-w-[160px]">{order.address}</div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-semibold text-stone-900">
                          {firstItem?.productName || "Маҳсулот"}
                        </div>
                        <div className="text-xs text-stone-500">
                          Миқдор: <span className="font-bold">{firstItem?.quantity || 1} адад</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-bold text-stone-950 font-display whitespace-nowrap">
                        {formatPrice(order.totalPrice)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div>{getStatusBadge(order.status)}</div>
                          <select
                            value={order.status}
                            disabled={statusUpdatingId === order.id}
                            onChange={(e) => handleQuickStatusChange(order.id, e.target.value)}
                            className="text-[11px] font-semibold border border-stone-200 rounded-lg p-1 bg-white cursor-pointer"
                          >
                            <option value="NEW">НАВ</option>
                            <option value="CONTACTED">ДАР ТАМОС</option>
                            <option value="CONFIRMED">ТАСДИҚШУДА</option>
                            <option value="DELIVERING">ДАР РОҲ</option>
                            <option value="COMPLETED">АНҶОМЁФТА</option>
                            <option value="CANCELLED">БЕКОРШУДА</option>
                          </select>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                        >
                          Кушодан <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-stone-500">
            Дар ин бахш ҳеҷ як фармоиш ёфт нашуд.
          </div>
        )}
      </div>
    </div>
  );
}
