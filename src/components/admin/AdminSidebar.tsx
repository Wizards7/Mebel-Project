"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Armchair,
  X
} from "lucide-react";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
  newOrdersCount?: number;
}

export default function AdminSidebar({ onCloseMobile, newOrdersCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const menuItems = [
    {
      href: "/admin",
      label: "Панели асосӣ",
      icon: <LayoutDashboard className="w-5 h-5" />,
      exact: true,
    },
    {
      href: "/admin/products",
      label: "Маҳсулотҳо",
      icon: <Package className="w-5 h-5" />,
    },
    {
      href: "/admin/categories",
      label: "Категорияҳо",
      icon: <Layers className="w-5 h-5" />,
    },
    {
      href: "/admin/orders",
      label: "Фармоишҳо",
      icon: <ShoppingBag className="w-5 h-5" />,
      badge: newOrdersCount > 0 ? newOrdersCount : undefined,
    },
    {
      href: "/admin/clients",
      label: "Муштариён",
      icon: <Users className="w-5 h-5" />,
    },
    {
      href: "/admin/settings",
      label: "Танзимот",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <aside className="w-64 bg-stone-900 text-stone-300 flex flex-col h-full border-r border-stone-800">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-stone-800">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center">
            <Armchair className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-white text-base tracking-tight font-display block leading-none">
              Админ Панел
            </span>
            <span className="text-[10px] text-stone-400 font-medium">
              Мебели Тоҷикистон
            </span>
          </div>
        </Link>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="text-[11px] font-bold text-stone-500 uppercase px-3 mb-2 tracking-wider">
          Бахшҳои асосӣ
        </div>

        {menuItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-600 text-white font-semibold shadow-soft"
                  : "text-stone-400 hover:bg-stone-800 hover:text-stone-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? "text-white" : "text-stone-400"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-stone-950">
                  {item.badge} нав
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-stone-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-stone-400 hover:bg-stone-800 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-stone-500" />
            <span>Ба сомона гузаштан</span>
          </span>
          <span className="text-[10px] text-stone-500">↗</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Баромадан аз система</span>
        </button>
      </div>
    </aside>
  );
}
