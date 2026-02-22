import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { FlaskConical, ClipboardList, TestTube, LayoutDashboard, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function SidebarLaboratoriumMenu({ title = "Laboratorium" }) {
  const { url } = usePage();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("laboratoriumSidebarCollapsed");
      if (saved !== null) setCollapsed(saved === "true");
    } catch { }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("laboratoriumSidebarCollapsed", String(collapsed));
    } catch { }
    if (typeof window !== "undefined" && typeof window.CustomEvent === "function") {
      window.dispatchEvent(new window.CustomEvent("layoutSidebarCollapsed", { detail: { key: "laboratorium", collapsed } }));
    }
  }, [collapsed]);

  const items = [
    {
      label: "Dashboard",
      href: (() => {
        try {
          return route("dashboard", {}, false);
        } catch {
          return "/dashboard";
        }
      })(),
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    { label: "Permintaan Lab", href: route("laboratorium.permintaan-lab.index"), icon: <ClipboardList className="w-4 h-4" /> },
    { label: "Tarif Lab", href: route("daftar-tarif.index", { category: "laboratorium" }), icon: <TestTube className="w-4 h-4" /> },
    { label: "Template Lab", href: route("daftar-tarif.index", { category: "laboratorium" }), icon: <TestTube className="w-4 h-4" /> },
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
          <FlaskConical className="w-5 h-5 flex-shrink-0" />
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
        {items.map((item) => {
          const isDashboard = item.label.toLowerCase() === "dashboard";
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={
                isDashboard
                  ? `relative w-full flex items-center text-sm font-medium rounded-xl transition-all duration-300 group ${collapsed ? "justify-center p-2" : "gap-3 p-3"} ${
                      active
                        ? "text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-[0_10px_30px_rgba(79,70,229,0.45)] ring-1 ring-white/20"
                        : "text-white/90 hover:text-white bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 hover:from-blue-500/30 hover:via-indigo-500/30 hover:to-purple-500/30 border border-white/15 backdrop-blur-sm hover:shadow-[0_6px_18px_rgba(59,130,246,0.25)]"
                    }`
                  : `flex items-center rounded-xl transition-all duration-300 ${collapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"} ${
                      active ? "bg-white/20 text-white" : "hover:bg-white/10"
                    }`
              }
            >
              <span className="text-white/90">
                {React.cloneElement(item.icon, {
                  className: isDashboard ? "w-7 h-7" : "w-4 h-4",
                })}
              </span>
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
