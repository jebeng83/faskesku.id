import React, { useEffect, useMemo, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import {
  Gauge,
  Home as HomeIcon,
  Wallet,
  Banknote,
  Calendar,
  CreditCard,
  BookOpen,
  FileText,
  Receipt,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import usePermission from "@/hooks/usePermission";

export default function SidebarKeuanganMenu({ title = "Keuangan" }) {
  const { url } = usePage();
  const { permissions, can } = usePermission();
  const [openPengaturan, setOpenPengaturan] = useState(true);
  const [openJurnal, setOpenJurnal] = useState(true);
  const [openAkutansi, setOpenAkutansi] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("keuanganSidebarCollapsed");
      if (saved !== null) setCollapsed(saved === "true");
    } catch { }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("keuanganSidebarCollapsed", String(collapsed));
    } catch { }
    if (typeof window !== "undefined" && typeof window.CustomEvent === "function") {
      window.dispatchEvent(new window.CustomEvent("layoutSidebarCollapsed", { detail: { key: "keuangan", collapsed } }));
    }
    if (collapsed) {
      setOpenPengaturan(false);
      setOpenJurnal(false);
      setOpenAkutansi(false);
    }
  }, [collapsed]);

  const items = useMemo(
    () => [
      { label: "Dashboard", href: (() => { try { return route("dashboard", {}, false); } catch { return "/dashboard"; } })(), icon: <Gauge className="w-4 h-4" />, permission: "dashboard.index" },
      { label: "Home", href: "/akutansi/home", icon: <HomeIcon className="w-4 h-4" />, permission: "akutansi.index" },
      {
        label: "Pengaturan Akun",
        icon: <Wallet className="w-4 h-4" />,
        children: [
          { label: "Pengaturan Rekening", href: "/akutansi/pengaturan-rekening", icon: <Banknote className="w-4 h-4" />, permission: "akutansi.pengaturan-rekening" },
          { label: "Rekening", href: "/akutansi/rekening", icon: <Banknote className="w-4 h-4" />, permission: "akutansi.rekening" },
          { label: "Rekening Tahun", href: "/akutansi/rekening-tahun", icon: <Calendar className="w-4 h-4" />, permission: "akutansi.rekening-tahun" },
          { label: "Akun Bayar", href: "/akutansi/akun-bayar", icon: <CreditCard className="w-4 h-4" />, permission: "akutansi.akun-bayar" },
          { label: "Akun Piutang", href: "/akutansi/akun-piutang", icon: <Wallet className="w-4 h-4" />, permission: "akutansi.akun-piutang" },
        ],
      },
      {
        label: "Jurnal",
        icon: <BookOpen className="w-4 h-4" />,
        children: [
          { label: "Jurnal", href: "/akutansi/jurnal", icon: <BookOpen className="w-4 h-4" />, permission: "akutansi.jurnal" },
          { label: "Jurnal Penyesuaian", href: "/akutansi/jurnal-penyesuaian", icon: <BookOpen className="w-4 h-4" />, permission: "akutansi.jurnal-penyesuaian" },
          { label: "Jurnal Penutup", href: "/akutansi/jurnal-penutup", icon: <BookOpen className="w-4 h-4" />, permission: "akutansi.jurnal-penutup" },
          { label: "Detail Jurnal", href: "/akutansi/detail-jurnal", icon: <FileText className="w-4 h-4" />, permission: "akutansi.detail-jurnal" },
          { label: "Buku Besar", href: "/akutansi/buku-besar", icon: <BookOpen className="w-4 h-4" />, permission: "akutansi.buku-besar" },
        ],
      },
      {
        label: "Akutansi",
        icon: <Receipt className="w-4 h-4" />,
        children: [
          { label: "Kasir Ralan", href: "/akutansi/kasir-ralan", icon: <Receipt className="w-4 h-4" />, permission: "akutansi.kasir-ralan" },
          { label: "Billing", href: "/akutansi/billing", icon: <Receipt className="w-4 h-4" />, permission: "akutansi.billing" },
          { label: "Nota Jalan", href: "/akutansi/nota-jalan", icon: <Receipt className="w-4 h-4" />, permission: "akutansi.nota-jalan" },
          { label: "Nota Inap", href: "/akutansi/nota-inap", icon: <Receipt className="w-4 h-4" /> },
          { label: "Cash Flow", href: "/akutansi/cashflow", icon: <Wallet className="w-4 h-4" />, permission: "akutansi.cash-flow" },
          { label: "Neraca", href: "/akutansi/neraca", icon: <Receipt className="w-4 h-4" />, permission: "akutansi.neraca" },
          { label: "Mutasi Rekening", href: "/akutansi/mutasi-rekening", icon: <Banknote className="w-4 h-4" />, permission: "akutansi.mutasi-rekening" },
          { label: "Mutasi Kas", href: "/akutansi/mutasi-kas", icon: <Wallet className="w-4 h-4" />, permission: "akutansi.mutasi-kas" },
          { label: "Setoran Bank", href: "/akutansi/setoran-bank", icon: <Banknote className="w-4 h-4" />, permission: "akutansi.setoran-bank" },
        ],
      },
    ],
    []
  );

  const filteredItems = useMemo(() => {
    return items
      .map((item) => {
        if (!item.children) {
          if (item.permission && !can(item.permission)) return null;
          return item;
        }
        const children = item.children.filter((c) => !c.permission || can(c.permission));
        if (children.length === 0) return null;
        return { ...item, children };
      })
      .filter(Boolean);
  }, [items, permissions]);

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
          <Wallet className="w-5 h-5 flex-shrink-0" />
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
        {filteredItems.map((item) => (
          item.children ? (
            <div key={item.label}>
              <button
                type="button"
                onClick={() => {
                  if (collapsed) return;
                  if (item.label === "Pengaturan Akun") setOpenPengaturan((v) => !v);
                  else if (item.label === "Jurnal") setOpenJurnal((v) => !v);
                  else if (item.label === "Akutansi") setOpenAkutansi((v) => !v);
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
              {!collapsed && (
                (
                item.label === "Pengaturan Akun"
                  ? openPengaturan
                  : item.label === "Jurnal"
                  ? openJurnal
                  : openAkutansi
                ) && (
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
              ))}
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
