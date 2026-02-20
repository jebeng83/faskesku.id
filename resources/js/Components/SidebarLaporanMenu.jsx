import React, { useEffect, useMemo, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Gauge, BarChart2, Stethoscope, Bed, Activity, Users, ChevronsLeft, ChevronsRight } from "lucide-react";
import ralan from "@/routes/laporan/ralan";
import ranap from "@/routes/laporan/ranap";

export default function SidebarLaporanMenu({ title = "Laporan" }) {
  const { url } = usePage();
  const [openRalan, setOpenRalan] = useState(true);
  const [openRanap, setOpenRanap] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("laporanSidebarCollapsed");
      if (saved !== null) setCollapsed(saved === "true");
    } catch { }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("laporanSidebarCollapsed", String(collapsed));
    } catch { }
    if (typeof window !== "undefined" && typeof window.CustomEvent === "function") {
      window.dispatchEvent(new window.CustomEvent("layoutSidebarCollapsed", { detail: { key: "laporan", collapsed } }));
    }
    if (collapsed) {
      setOpenRalan(false);
      setOpenRanap(false);
    }
  }, [collapsed]);

  const items = useMemo(
    () => [
      { label: "Dashboard", href: (() => { try { return route("dashboard", {}, false); } catch { return "/dashboard"; } })(), icon: <Gauge className="w-4 h-4" /> },
      { label: "Home", href: (() => { try { return route("laporan.index", {}, false); } catch { return "/laporan"; } })(), icon: <BarChart2 className="w-4 h-4" /> },
      {
        label: "Laporan Rajal",
        icon: <Stethoscope className="w-4 h-4" />,
        children: [
          { label: "Frekuensi Penyakit", href: ralan.frekuensiPenyakit.url(), icon: <Activity className="w-4 h-4" /> },
          { label: "Kunjungan", href: ralan.kunjungan.url(), icon: <Users className="w-4 h-4" /> },
        ],
      },
      {
        label: "Laporan Ranap",
        icon: <Bed className="w-4 h-4" />,
        children: [
          { label: "Frekuensi Penyakit", href: ranap.frekuensiPenyakit.url(), icon: <Activity className="w-4 h-4" /> },
          { label: "Kunjungan", href: ranap.kunjungan.url(), icon: <Users className="w-4 h-4" /> },
        ],
      },
    ],
    []
  );

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
          <BarChart2 className="w-5 h-5 flex-shrink-0" />
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
          item.children ? (
            <div key={item.label}>
              <button
                type="button"
                onClick={() => {
                  if (collapsed) return;
                  if (item.label === "Laporan Rajal") setOpenRalan((v) => !v);
                  else if (item.label === "Laporan Ranap") setOpenRanap((v) => !v);
                }}
                className={`w-full flex items-center py-2 rounded-md hover:bg-white/10 ${collapsed ? "justify-center px-2" : "gap-3 px-3"}`}
              >
                <span className="text-white/90">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="text-sm font-semibold flex-1 text-left">{item.label}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-white/70">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </>
                )}
              </button>
              {!collapsed && (item.label === "Laporan Rajal" ? openRalan : openRanap) && (
                <div className="ml-2 pl-3 border-l border-white/10 space-y-1 mt-1">
                  {item.children.map((c) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive(c.href) ? "bg-white/20 text-white" : "hover:bg-white/10"
                      }`}
                    >
                      <span className="text-white/90">{c.icon}</span>
                      <span className="text-sm font-medium">{c.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
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
          )
        ))}
      </nav>
    </div>
  );
}
