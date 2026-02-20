import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Banknote, ClipboardList, Stethoscope, Bed, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function SidebarDaftarTarifMenu({ title = "Master Tarif" }) {
  const { url } = usePage();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("tarifSidebarCollapsed");
      if (saved !== null) setCollapsed(saved === "true");
    } catch { }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("tarifSidebarCollapsed", String(collapsed));
    } catch { }
    if (typeof window !== "undefined" && typeof window.CustomEvent === "function") {
      window.dispatchEvent(new window.CustomEvent("layoutSidebarCollapsed", { detail: { key: "tarif", collapsed } }));
    }
  }, [collapsed]);

  const items = [
    { label: "Daftar Tarif", href: route("daftar-tarif.index"), icon: <Banknote className="w-4 h-4" /> },
    { label: "Kategori Perawatan", href: route("kategori-perawatan.index"), icon: <ClipboardList className="w-4 h-4" /> },
    { label: "Poliklinik", href: route("poliklinik.index"), icon: <Stethoscope className="w-4 h-4" /> },
    { label: "Bangsal", href: route("rawat-inap.bangsal"), icon: <Bed className="w-4 h-4" /> },
  ];

  const isActive = (href) => {
    try {
      const u = new URL(href, window.location.origin);
      return (url || window.location.pathname).startsWith(u.pathname);
    } catch {
      return (url || window.location.pathname).startsWith(href);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-3 text-white">
      <div className="h-14 flex items-center px-3 gap-2 justify-between">
        <div className={`flex items-center gap-2 min-w-0 ${collapsed ? "justify-center w-full" : ""}`}>
          <Banknote className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-semibold truncate">{title}</span>}
        </div>
        <button
          type="button"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed((v) => !v)}
          className="flex items-center justify-center w-9 h-9 rounded-md transition-colors hover:bg-white/10"
        >
          {collapsed ? <ChevronsRight className="w-4 h-4 text-white/80" /> : <ChevronsLeft className="w-4 h-4 text-white/80" />}
        </button>
      </div>
      <nav className="px-2 py-2 space-y-1 text-white/90">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center py-2 rounded-md transition-colors ${collapsed ? "justify-center px-2" : "gap-3 px-3"} ${
              isActive(item.href) ? "bg-white/20 text-white" : "hover:bg-white/10"
            }`}
          >
            <span className="text-white/90">{item.icon}</span>
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
