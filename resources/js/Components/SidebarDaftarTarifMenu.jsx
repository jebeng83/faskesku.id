import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Banknote, ClipboardList, Stethoscope, Bed } from "lucide-react";

export default function SidebarDaftarTarifMenu({ title = "Master Tarif" }) {
  const { url } = usePage();

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
      <div className="h-14 flex items-center px-3 gap-2">
        <Banknote className="w-5 h-5" />
        <span className="font-semibold truncate">{title}</span>
      </div>
      <nav className="px-2 py-2 space-y-1 text-white/90">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 ${
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
