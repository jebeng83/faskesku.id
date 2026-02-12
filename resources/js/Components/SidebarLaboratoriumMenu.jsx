import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Gauge, FlaskConical, ClipboardList, TestTube } from "lucide-react";

export default function SidebarLaboratoriumMenu({ title = "Laboratorium" }) {
  const { url } = usePage();

  const items = [
    { label: "Dashboard", href: (() => { try { return route("dashboard", {}, false); } catch { return "/dashboard"; } })(), icon: <Gauge className="w-4 h-4" /> },
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
      <div className="h-14 flex items-center px-3 gap-2">
        <FlaskConical className="w-5 h-5" />
        <span className="font-semibold truncate">{title}</span>
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
                  ? `relative w-full flex items-center gap-3 p-3 text-sm font-medium rounded-xl transition-all duration-300 group ${
                      active
                        ? "text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-[0_10px_30px_rgba(79,70,229,0.45)] ring-1 ring-white/20"
                        : "text-white/90 hover:text-white bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 hover:from-blue-500/30 hover:via-indigo-500/30 hover:to-purple-500/30 border border-white/15 backdrop-blur-sm hover:shadow-[0_6px_18px_rgba(59,130,246,0.25)]"
                    }`
                  : `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 ${
                      active ? "bg-white/20 text-white" : "hover:bg-white/10"
                    }`
              }
            >
              <span className="text-white/90">
                {React.cloneElement(item.icon, {
                  className: isDashboard ? "w-7 h-7" : "w-4 h-4",
                })}
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
