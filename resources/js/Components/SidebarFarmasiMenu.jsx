import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Pill, ShoppingCart, Truck, Boxes, ClipboardList } from "lucide-react";

export default function SidebarFarmasiMenu({ title = "Farmasi" }) {
  const { url } = usePage();

  const items = [
    { label: "Home", href: (() => { try { return route("farmasi.index", {}, false); } catch { return "/farmasi"; } })(), icon: <Pill className="w-4 h-4" /> },
    { label: "Permintaan Resep", href: "/farmasi/permintaan-resep", icon: <ClipboardList className="w-4 h-4" /> },
    { label: "Penjualan Obat", href: "/farmasi/penjualan-obat", icon: <ShoppingCart className="w-4 h-4" /> },
    { label: "Pembelian Obat", href: "/farmasi/pembelian-obat", icon: <Truck className="w-4 h-4" /> },
    { label: "Stok Opname", href: "/farmasi/stok-opname", icon: <ClipboardList className="w-4 h-4" /> },
    { label: "Cek Stok Obat", href: (() => { try { return route("farmasi.cek-stok-obat", {}, false); } catch { return "/farmasi/cek-stok-obat"; } })(), icon: <Boxes className="w-4 h-4" /> },
    { label: "Riwayat Transaksi Gudang", href: "/farmasi/riwayat-transaksi-gudang", icon: <ClipboardList className="w-4 h-4" /> },
    { label: "Sisa Stok", href: "/farmasi/sisa-stok", icon: <Boxes className="w-4 h-4" /> },
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
        <Pill className="w-5 h-5" />
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
