import React, { useDeferredValue, useMemo, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";
import { route } from "ziggy-js";
import { motion, useReducedMotion } from "framer-motion";
import {
  Squares2X2Icon,
  ClipboardDocumentListIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
  AcademicCapIcon,
  UserCircleIcon,
  UsersIcon,
  UserGroupIcon,
  KeyIcon,
  BanknotesIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.02,
      staggerChildren: 0.06,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: "easeOut" },
  },
  hover: {
    y: -3,
    scale: 1.01,
    boxShadow:
      "0 20px 25px -5px rgba(59,130,246,0.15), 0 8px 10px -6px rgba(59,130,246,0.1)",
    transition: { type: "spring", stiffness: 240, damping: 22 },
  },
};

const items = [
  {
    title: "Poliklinik",
    description: "Master daftar poliklinik dan status aktif/tidak",
    href: route("poliklinik.index"),
    icon: BuildingOffice2Icon,
    accent: "from-sky-500 to-blue-500",
  },
  {
    title: "Jadwal Dokter",
    description: "Kelola jadwal praktik dokter & kuota",
    href: route("jadwal.index"),
    icon: CalendarDaysIcon,
    accent: "from-blue-500 to-indigo-500",
  },
  {
    title: "Penjamin (Penjab)",
    description: "Pengaturan penjamin/instansi pembayaran",
    href: route("penjab.index"),
    icon: ShieldCheckIcon,
    accent: "from-emerald-500 to-teal-500",
  },
  {
    title: "Spesialis",
    description: "Master daftar spesialisasi dokter",
    href: route("spesialis.index"),
    icon: AcademicCapIcon,
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Dokter",
    description: "Manajemen data dokter",
    href: route("doctors.index"),
    icon: UserCircleIcon,
    accent: "from-indigo-500 to-purple-500",
  },
  {
    title: "Pegawai",
    description: "Manajemen data pegawai",
    href: route("employees.index"),
    icon: UsersIcon,
    accent: "from-cyan-500 to-blue-500",
  },
  {
    title: "Users",
    description: "Akun pengguna dan peran",
    href: route("users.index"),
    icon: UserGroupIcon,
    accent: "from-amber-500 to-orange-500",
  },
  {
    title: "Permissions & Roles",
    description: "Hak akses menu dan peran pengguna",
    href: route("permissions.index"),
    icon: KeyIcon,
    accent: "from-rose-500 to-red-500",
  },
  {
    title: "Menu Aplikasi",
    description: "Struktur dan urutan menu aplikasi",
    href: route("menus.index"),
    icon: Squares2X2Icon,
    accent: "from-teal-500 to-emerald-500",
  },
  {
    title: "Kategori Perawatan",
    description: "Pengelompokan tindakan perawatan",
    href: route("kategori-perawatan.index"),
    icon: ClipboardDocumentListIcon,
    accent: "from-sky-500 to-cyan-500",
  },
  {
    title: "Daftar Tarif",
    description: "Master tarif tindakan dan layanan",
    href: route("daftar-tarif.index"),
    icon: BanknotesIcon,
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    title: "Setting Aplikasi",
    description: "Konfigurasi umum aplikasi dan branding",
    href: route("setting.index"),
    icon: Cog6ToothIcon,
    accent: "from-indigo-500 to-blue-500",
  },
];

export default function MenuUtamaMasterData() {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const shouldReduceMotion = useReducedMotion();

  const filteredItems = useMemo(() => {
    if (!deferredSearch) return items;
    const q = deferredSearch.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.description || "").toLowerCase().includes(q)
    );
  }, [deferredSearch]);

  const motionGridProps = shouldReduceMotion
    ? {}
    : {
        variants: containerVariants,
        initial: "hidden",
        animate: "visible",
      };
  return (
    <SidebarPengaturan title="Master Data">
      <Head title="Master Data" />

      <div>
        {/* Header dengan textbox pencarian di kanan */}
        <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
          <div className="min-w-[220px]">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Master Data
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Menu utama untuk mengelola data referensi aplikasi.
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape" && search) setSearch("");
                }}
                placeholder="Cari menu master data..."
                className="block w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm pl-10 pr-9 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="Clear search"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
        <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
          Menampilkan {filteredItems.length} dari {items.length} menu
        </p>

        {/* Grid of Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          {...motionGridProps}
        >
          {filteredItems.map((item, idx) => (
            <motion.div
              key={idx}
              variants={shouldReduceMotion ? undefined : cardVariants}
              whileHover={shouldReduceMotion ? undefined : "hover"}
            >
              <Link
                href={item.href}
                prefetch="true"
                className="block rounded-xl border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${item.accent} text-white shadow`}
                    >
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SidebarPengaturan>
  );
}
