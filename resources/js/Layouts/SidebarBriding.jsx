import React, { useEffect, useMemo, useState } from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import { HomeIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import {
  Link as LucideLink,
  NotebookTabs,
  Stethoscope,
  Pill,
  CalendarDays,
} from "lucide-react";

export default function SidebarBriding({ title = "Briding", children, wide = false }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const items = useMemo(() => [
    { label: "Dashboard", href: "/dashboard", icon: Squares2X2Icon },
    { label: "Home", href: safeRoute("pcare.index", "/pcare"), icon: HomeIcon },
  ], []);

  function safeRoute(name, fallback) {
    try {
      return route(name);
    } catch (_) {
      return fallback;
    }
  }

  const paths = useMemo(
    () => ({
      pcareSetting: safeRoute("pcare.setting.index", "/pcare/setting"),
      mobileJknSetting: safeRoute(
        "pcare.setting.mobilejkn.index",
        "/pcare/setting-mobilejkn"
      ),
      pcareMapDokter: safeRoute("pcare.mapping.dokter", "/pcare/mapping/dokter"),
      pcareMapPoli: safeRoute("pcare.mapping.poli", "/pcare/mapping/poli"),
      pcareMapObat: safeRoute("pcare.mapping.obat", "/pcare/mapping/obat"),
      jadwalDokter: safeRoute("jadwal.index", "/jadwal"),
    }),
    []
  );

  const isActive = (href) => {
    try {
      const u = new URL(href, window.location.origin);
      return (window.location.pathname).startsWith(u.pathname);
    } catch (_) {
      return (window.location.pathname).startsWith(href);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <aside className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-black shadow-2xl border-r border-blue-500/20 dark:border-blue-800 z-40 transition-all duration-300 ${
        isSidebarOpen ? "w-64 translate-x-0" : isSidebarCollapsed ? "w-16 -translate-x-full lg:translate-x-0" : "w-64 -translate-x-full lg:translate-x-0"
      }`}>
        <div className="h-14 flex items-center px-3 gap-2 text-white">
          <Squares2X2Icon className="w-5 h-5" />
          {!isSidebarCollapsed && (
            <span className="font-semibold truncate">{title}</span>
          )}
        </div>
        <nav className="px-2 py-2 space-y-1 text-white/90">
          {items.map((it) => (
            <Link
              key={it.label}
              href={it.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive(it.href) ? "bg-white/15 text-white" : "hover:bg-white/10"
              }`}
            >
              <it.icon className="w-5 h-5" />
              {!isSidebarCollapsed && <span className="text-sm">{it.label}</span>}
            </Link>
          ))}

          <div className="mt-2">
            {!isSidebarCollapsed && (
              <div className="px-3 py-2 text-[12px] uppercase tracking-wide text-white/80">Bridging PCare</div>
            )}
            <Link
              href={paths.pcareSetting}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive(paths.pcareSetting) ? "bg-white/15 text-white ring-1 ring-white/30" : "hover:bg-white/10"
              }`}
            >
              <LucideLink className={isSidebarCollapsed ? "w-5 h-5" : "w-4 h-4"} />
              {!isSidebarCollapsed && <span className="text-sm">Setting Bridging PCare</span>}
            </Link>
            <Link
              href={paths.mobileJknSetting}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive(paths.mobileJknSetting) ? "bg-white/15 text-white ring-1 ring-white/30" : "hover:bg-white/10"
              }`}
            >
              <LucideLink className={isSidebarCollapsed ? "w-5 h-5" : "w-4 h-4"} />
              {!isSidebarCollapsed && <span className="text-sm">Setting Mobile JKN</span>}
            </Link>
            <Link
              href={paths.pcareMapDokter}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive(paths.pcareMapDokter) ? "bg-white/15 text-white ring-1 ring-white/30" : "hover:bg-white/10"
              }`}
            >
              <Stethoscope className={isSidebarCollapsed ? "w-5 h-5" : "w-4 h-4"} />
              {!isSidebarCollapsed && <span className="text-sm">Mapping Dokter PCare</span>}
            </Link>
            <Link
              href={paths.pcareMapPoli}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive(paths.pcareMapPoli) ? "bg-white/15 text-white ring-1 ring-white/30" : "hover:bg-white/10"
              }`}
            >
              <NotebookTabs className={isSidebarCollapsed ? "w-5 h-5" : "w-4 h-4"} />
              {!isSidebarCollapsed && <span className="text-sm">Mapping Poli PCare</span>}
            </Link>
            <Link
              href={paths.pcareMapObat}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive(paths.pcareMapObat) ? "bg-white/15 text-white ring-1 ring-white/30" : "hover:bg-white/10"
              }`}
            >
              <Pill className={isSidebarCollapsed ? "w-5 h-5" : "w-4 h-4"} />
              {!isSidebarCollapsed && <span className="text-sm">Mapping Obat PCare</span>}
            </Link>
            <Link
              href={paths.jadwalDokter}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive(paths.jadwalDokter) ? "bg-white/15 text-white ring-1 ring-white/30" : "hover:bg-white/10"
              }`}
            >
              <CalendarDays className={isSidebarCollapsed ? "w-5 h-5" : "w-4 h-4"} />
              {!isSidebarCollapsed && <span className="text-sm">Jadwal Dokter</span>}
            </Link>
          </div>
        </nav>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <header
        className={`fixed top-0 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50 flex-shrink-0 transition-all duration-300 ${
          isSidebarOpen
            ? "left-64 right-0"
            : isSidebarCollapsed
            ? "left-0 right-0 lg:left-16"
            : "left-0 right-0 lg:left-64"
        }`}
      >
        <div className="h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setIsSidebarOpen(!isSidebarOpen);
                } else {
                  setIsSidebarCollapsed(!isSidebarCollapsed);
                }
              }}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-gray-600 dark:text-gray-400"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Link
                href="/dashboard"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Dashboard
              </Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900 dark:text-white font-medium">{title}</span>
            </nav>
          </div>
        </div>
      </header>

      <main
        className={`pt-14 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : isSidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        }`}
      >
        <div className={`${wide ? "px-2 sm:px-4" : "max-w-7xl mx-auto px-2 sm:px-4"} py-6`}>{children}</div>
      </main>
    </div>
  );
}
