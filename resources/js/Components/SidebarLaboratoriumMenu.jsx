import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { FlaskConical, ClipboardList, TestTube, LayoutDashboard } from "lucide-react";

export default function SidebarLaboratoriumMenu({ title = "Laboratorium" }) {
  const { url } = usePage();

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
      <div className="h-14 flex items-center px-3 gap-2">
        <FlaskConical className="w-5 h-5" />
        <span className="font-semibold truncate">{title}</span>
      </div>
      <nav className="px-2 py-2 space-y-1 text-white/90">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              isActive(item.href) ? "bg-white/20 text-white" : "hover:bg-white/10"
            }`}
          >
            <span className="text-white/90">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
