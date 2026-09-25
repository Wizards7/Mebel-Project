"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Plus,
  Search,
  SlidersHorizontal,
  Edit,
  Eye,
  EyeOff,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchProducts = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedCategory !== "all") params.set("categoryId", selectedCategory);
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    if (search) params.set("search", search);

    fetch(`/api/admin/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    // Fetch categories for dropdown
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []));

    fetchProducts();
  }, [selectedCategory, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleToggleStatus = async (product: any) => {
    setActionLoadingId(product.id);
    const newStatus = product.status === "ACTIVE" ? "HIDDEN" : "ACTIVE";

    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, status: newStatus } : p))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Шумо дар ҳақиқат мехоҳед маҳсулоти «${name}»-ро бойгонӣ кунед?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 font-display">
            Идоракунии маҳсулотҳо
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Ҳамаи моделҳои мебел, иловакунӣ, таҳрир ва тағйири нархҳо
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-soft transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Иловаи маҳсулоти нав</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft-sm space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ҷустуҷӯ аз рӯи номи мебел, мавод ё андоза..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
            >
              <option value="all">Ҳамаи категорияҳо</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
            >
              <option value="ALL">Ҳамаи ҳолатҳо</option>
              <option value="ACTIVE">Танҳо фаъол (Дар сайт)</option>
              <option value="HIDDEN">Танҳо пинҳоншуда</option>
            </select>

            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold transition-colors"
            >
              Ҷустуҷӯ
            </button>
          </div>
        </form>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-soft-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-400">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-600" />
            <p className="text-sm font-medium">Маҳсулотҳо боргирӣ шуда истодаанд...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-50 text-stone-500 text-xs font-semibold uppercase tracking-wider border-b border-stone-100">
                <tr>
                  <th className="px-6 py-3.5">Маҳсулот</th>
                  <th className="px-6 py-3.5">Категория</th>
                  <th className="px-6 py-3.5">Нарх</th>
                  <th className="px-6 py-3.5">Андоза / Мавод</th>
                  <th className="px-6 py-3.5">Ҳолат дар сайт</th>
                  <th className="px-6 py-3.5 text-right">Амалҳо</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map((p) => {
                  const mainImage =
                    p.images?.find((img: any) => img.isMain)?.url ||
                    p.images?.[0]?.url ||
                    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=150";

                  const isActive = p.status === "ACTIVE";

                  return (
                    <tr key={p.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 flex-shrink-0">
                            <Image
                              src={mainImage}
                              alt={p.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-stone-900">{p.name}</div>
                            <div className="text-[11px] text-stone-400 font-mono">
                              slug: {p.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-medium text-stone-700">
                        {p.category?.name || "—"}
                      </td>

                      <td className="px-6 py-4 font-bold text-stone-950 font-display">
                        {formatPrice(p.price, p.currency)}
                      </td>

                      <td className="px-6 py-4 text-xs text-stone-600">
                        {p.size && <div>Андоза: <span className="font-bold text-stone-800">{p.size}</span></div>}
                        {p.material && <div className="truncate max-w-[140px]">{p.material}</div>}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleStatus(p)}
                          disabled={actionLoadingId === p.id}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            isActive
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                          }`}
                        >
                          {isActive ? (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>ФАЪОЛ (Дар сайт)</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>ПИНҲОН</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/product/${p.slug}`}
                            target="_blank"
                            className="p-2 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
                            title="Дар сомона дидан"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <Link
                            href={`/admin/products/${p.id}/edit`}
                            className="p-2 rounded-lg text-brand-600 hover:bg-brand-50 transition-colors"
                            title="Таҳрир кардан"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                            title="Бойгонӣ кардан"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-stone-500">
            Маҳсулот ёфт нашуд. Шумо метавонед маҳсулоти нав илова намоед.
          </div>
        )}
      </div>
    </div>
  );
}
