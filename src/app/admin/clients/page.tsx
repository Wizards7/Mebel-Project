"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Search, Phone, MapPin, ArrowRight, ShoppingBag, Loader2 } from "lucide-react";
import { formatPhone } from "@/lib/utils";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchClients = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);

    fetch(`/api/admin/clients?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setClients(data.clients || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchClients();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 font-display">
            Базаи муштариён (Clients)
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Муштариёне, ки тавассути сомона фармоиш додаанд (муттаҳидшуда аз рӯи рақами телефон)
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft-sm">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ҷустуҷӯи муштарӣ аз рӯи ном, телефон ё шаҳр..."
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

      {/* Clients Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-soft-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-400">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-600" />
            <p className="text-sm font-medium">Муштариён боргирӣ шуда истодаанд...</p>
          </div>
        ) : clients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-50 text-stone-500 text-xs font-semibold uppercase tracking-wider border-b border-stone-100">
                <tr>
                  <th className="px-6 py-3.5">Муштарӣ</th>
                  <th className="px-6 py-3.5">Телефон</th>
                  <th className="px-6 py-3.5">Шаҳр ва Суроға</th>
                  <th className="px-6 py-3.5">Миқдори фармоишҳо</th>
                  <th className="px-6 py-3.5">Фармоиши охирин</th>
                  <th className="px-6 py-3.5 text-right">Таърих</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-stone-900">
                      {client.name}
                    </td>

                    <td className="px-6 py-4 font-mono text-xs font-semibold text-brand-700">
                      <a href={`tel:+${client.phone}`} className="hover:underline">
                        {formatPhone(client.phone)}
                      </a>
                    </td>

                    <td className="px-6 py-4 text-xs text-stone-600">
                      <div className="font-semibold text-stone-900">{client.city || "—"}</div>
                      <div className="truncate max-w-[180px]">{client.address || "—"}</div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-stone-100 text-stone-800">
                        <ShoppingBag className="w-3 h-3 text-stone-500" />
                        <span>{client._count?.orders || client.totalOrders || 1} фармоиш</span>
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs text-stone-500">
                      {new Date(client.lastOrderAt).toLocaleDateString("tg-TJ", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/clients/${client.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                      >
                        Таърих <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-stone-500">
            Ҳоло муштарӣ ёфт нашуд.
          </div>
        )}
      </div>
    </div>
  );
}
