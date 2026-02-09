import React, { useState, useEffect } from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import {
  UserPlus,
  Stethoscope,
  Ambulance,
  FlaskConical,
  Pill,
  ChartNoAxesColumn,
  CreditCard,
  User,
  LogOut,
} from "lucide-react";
import DropdownMenu, { DropdownItem, DropdownDivider } from "@/Components/DropdownMenu";
import LanjutanRegistrasiLayout from "@/Layouts/LanjutanRegistrasiLayout";
import { route } from "ziggy-js";

export default function LayoutUtama({ title = "Layout Utama", left, children }) {
  const [activeView, _setActiveView] = useState(null);
  const { auth } = usePage().props || {};
  const [employeeName, setEmployeeName] = useState(null);
  const nik = auth?.user?.nik || auth?.user?.nip || null;
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
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Head title={title} />
      <header className="fixed top-0 inset-x-0 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="relative h-full flex items-center px-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">F</div>
            <div className="font-semibold text-gray-900 dark:text-white">{title}</div>
          </div>
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              <Link href={route("registration.index")} className="group relative inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
                <UserPlus className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                <span>Pendaftaran</span>
              </Link>
              <Link href={route("rawat-jalan.index")} className="group relative inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
                <Stethoscope className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                <span>Rawat Jalan</span>
              </Link>
                    <Link href={route("igd.index")} className="group relative inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
                <Ambulance className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                <span>UGD</span>
              </Link>
              <Link href="/laboratorium/permintaan-lab" className="group relative inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
                <FlaskConical className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                <span>Laborat</span>
              </Link>
              <Link href="/farmasi/permintaan-resep" className="group relative inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
                <Pill className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                <span>Farmasi</span>
              </Link>
              <Link href="/laporan" className="group relative inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
                <ChartNoAxesColumn className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                <span>Laporan</span>
              </Link>
              <Link href="/akutansi/kasir-ralan" className="group relative inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
                <CreditCard className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                <span>Kasir</span>
              </Link>
          </nav>
          <DropdownMenu
            className="ml-auto"
            trigger={
              <button className="flex items-center gap-3 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{initial}</span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{displayName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{email}</p>
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

      <main className="pt-14">
        <div className="grid grid-cols-[15%_85%] h-[calc(100vh-3.5rem)]">
          <aside className="bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 text-white border-r border-blue-400/20">
            <div className="h-full overflow-y-auto p-3">
              {left}
            </div>
          </aside>
          <section className="h-full overflow-y-auto">
            <div className="p-4">
              {activeView === "registrasi" ? (
                <LanjutanRegistrasiLayout title="Registrasi Pasien">
                  <div />
                </LanjutanRegistrasiLayout>
              ) : (
                children
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
