"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newOrdersCount, setNewOrdersCount] = useState(0);

  // Don't render sidebar layout on login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;

    // Fetch dashboard counters for badges
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((data) => {
        if (data?.metrics?.newOrdersCount) {
          setNewOrdersCount(data.metrics.newOrdersCount);
        }
      })
      .catch(() => {});
  }, [pathname, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-stone-100 overflow-hidden text-stone-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <AdminSidebar newOrdersCount={newOrdersCount} />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full">
            <AdminSidebar
              onCloseMobile={() => setMobileMenuOpen(false)}
              newOrdersCount={newOrdersCount}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile Header Bar */}
        <div className="md:hidden flex items-center justify-between h-16 px-4 bg-stone-900 text-white border-b border-stone-800">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg text-stone-300 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold text-sm font-display">Панели Админ</span>
          <div className="w-6" />
        </div>

        {/* Dynamic Page Content */}
        <main className="flex-1 relative overflow-y-auto p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
