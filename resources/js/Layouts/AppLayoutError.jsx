import React from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import useTheme from "@/hooks/useTheme";

export default function AppLayoutError({ title = "Terjadi Kesalahan", children }) {
  const { isDark, toggleDarkLight } = useTheme();

  let dashboardHref = "/";
  try {
    dashboardHref = route("dashboard", {}, false) || "/";
  } catch (_) {}

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={dashboardHref} className="font-semibold text-indigo-600">Faskesku</Link>
            <span className="text-gray-400">/</span>
            <span className="font-medium">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleDarkLight}
              className="px-3 py-1.5 rounded border bg-white/70 dark:bg-slate-800 text-slate-700 dark:text-slate-100 hover:bg-white text-xs"
            >
              {isDark ? "Tema: Gelap" : "Tema: Terang"}
            </button>
            <Link
              href={dashboardHref}
              className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-xs hover:bg-indigo-700"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-10">
        {children}
      </main>
    </div>
  );
}
