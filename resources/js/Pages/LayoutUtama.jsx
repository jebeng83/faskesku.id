import React, { useState, useEffect } from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import {
  UserPlus,
  Stethoscope,
  BedDouble,
  Ambulance,
  FlaskConical,
  Pill,
  CreditCard,
  User,
  LogOut,
  Menu,
  X,
  Home,
} from "lucide-react";
import DropdownMenu, { DropdownItem, DropdownDivider } from "@/Components/DropdownMenu";
import LanjutanRegistrasiLayout from "@/Layouts/LanjutanRegistrasiLayout";
import { route } from "ziggy-js";

export default function LayoutUtama({
  title = "Layout Utama",
  left,
  children,
  chrome = true,
}) {
  const [activeView, _setActiveView] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const page = usePage();
  const { auth } = page.props || {};
  const [employeeName, setEmployeeName] = useState(null);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const nik = auth?.user?.nik || auth?.user?.nip || null;

  const pathname = (() => {
    try {
      const u = new URL(page?.url || "", window.location.origin);
      return u.pathname || window.location.pathname;
    } catch {
      return window.location.pathname;
    }
  })();
  const moduleKey = (() => {
    if (pathname.startsWith("/rawat-inap/bangsal")) return "tarif";
    if (pathname.startsWith("/daftar-tarif") || pathname.startsWith("/kategori-perawatan") || pathname.startsWith("/poliklinik")) return "tarif";
    if (pathname.startsWith("/rawat-inap") || pathname.startsWith("/igd")) return "ranap";
    if (pathname.startsWith("/laporan")) return "laporan";
    if (pathname.startsWith("/laboratorium")) return "laboratorium";
    if (pathname.startsWith("/farmasi")) return "farmasi";
    if (pathname.startsWith("/akutansi")) return "keuangan";
    return null;
  })();

  useEffect(() => {
    if (!moduleKey) {
      setIsLeftCollapsed(false);
      return;
    }
    try {
      const saved = localStorage.getItem(`${moduleKey}SidebarCollapsed`);
      if (saved !== null) setIsLeftCollapsed(saved === "true");
    } catch { }
    const handlerRanap = (e) => {
      if (moduleKey !== "ranap") return;
      const next = Boolean(e?.detail?.collapsed);
      setIsLeftCollapsed(next);
      try {
        localStorage.setItem("ranapSidebarCollapsed", String(next));
      } catch { }
    };
    const handlerGeneric = (e) => {
      const key = e?.detail?.key;
      if (!key || key !== moduleKey) return;
      const next = Boolean(e?.detail?.collapsed);
      setIsLeftCollapsed(next);
      try {
        localStorage.setItem(`${moduleKey}SidebarCollapsed`, String(next));
      } catch { }
    };
    window.addEventListener("ranapSidebarCollapsed", handlerRanap);
    window.addEventListener("layoutSidebarCollapsed", handlerGeneric);
    return () => {
      window.removeEventListener("ranapSidebarCollapsed", handlerRanap);
      window.removeEventListener("layoutSidebarCollapsed", handlerGeneric);
    };
  }, [moduleKey]);

  useEffect(() => {
    if (!auth || auth?.user?.nama) return;
    if (!nik) return;
    const q = encodeURIComponent(String(nik));
    fetch(`/pegawai/search?q=${q}`)
      .then((res) => res.json())
      .then((json) => {
        const list = Array.isArray(json?.data) ? json.data : Array.isArray(json?.list) ? json.list : [];
        const match = list.find((it) => String(it?.nik || "") === String(nik));
        const name = match?.nama || null;
        if (name) setEmployeeName(name);
      })
      .catch(() => {});
  }, [nik]);

  const displayName = employeeName || auth?.user?.nama || auth?.user?.name || auth?.user?.username || "User";
  const initial = (displayName || "U").charAt(0).toUpperCase();
  const email = auth?.user?.email || "";

  const navLinks = [
    { href: route("dashboard"), label: "Home", icon: Home },
    { href: route("registration.index"), label: "Pendaftaran", icon: UserPlus },
    { href: route("rawat-jalan.index"), label: "Rawat Jalan", icon: Stethoscope },
    { href: route("igd.index"), label: "UGD", icon: Ambulance },
    { href: "/laboratorium/permintaan-lab", label: "Laborat", icon: FlaskConical },
    { href: "/farmasi/permintaan-resep", label: "Farmasi", icon: Pill },
    { href: route("rawat-inap.index"), label: "Rawat Inap", icon: BedDouble },
    { href: "/akutansi/kasir-ralan", label: "Kasir", icon: CreditCard },
  ];

  if (!chrome) {
    return (
      <>
        <Head title={title} />
        {children}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      <Head title={title} />
      <header className="fixed top-0 inset-x-0 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="relative h-full flex items-center px-4 justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
              F
            </div>
            <div className="font-semibold text-gray-900 dark:text-white hidden sm:block">{title}</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
              >
                <link.icon className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          <DropdownMenu
            className="ml-auto"
            trigger={
              <button className="flex items-center gap-3 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{initial}</span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[150px]">{displayName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">{email}</p>
                </div>
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            }
            position="bottom"
            align="end"
          >
            <DropdownItem
              onClick={() => router.visit('/profile')}
              icon={<User className="w-4 h-4" />}
            >
              Profil
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem
              onClick={() => router.post(route('logout'))}
              icon={<LogOut className="w-4 h-4" />}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              Keluar
            </DropdownItem>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col">
            <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
              <span className="font-bold text-lg text-gray-900 dark:text-white">Menu</span>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {/* Module Menu (Left Prop) */}
              {left && (
                 <div className="mb-2">
                    <div className="bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 text-white p-3 rounded-b-xl mx-2 shadow-lg">
                      {left}
                    </div>
                 </div>
              )}

              {/* Navigation Links */}
              <div className="p-3 space-y-1">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                   Aplikasi
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}

      <main className="pt-14 flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden lg:block flex-shrink-0 bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 text-white border-r border-blue-400/20 overflow-y-auto transition-[width] duration-300 ${moduleKey ? (isLeftCollapsed ? "w-16" : "w-64") : "w-64"
            }`}
        >
          <div className="h-full p-3">
            {left}
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 overflow-y-auto min-w-0 bg-gray-50 dark:bg-gray-950">
          <div className="p-4 md:p-6 lg:p-8 max-w-[1920px] mx-auto">
            {activeView === "registrasi" ? (
              <LanjutanRegistrasiLayout title="Registrasi Pasien">
                <div />
              </LanjutanRegistrasiLayout>
            ) : (
              children
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
