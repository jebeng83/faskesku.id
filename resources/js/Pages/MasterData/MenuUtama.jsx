import React, { useDeferredValue, useMemo, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";
import { route } from "ziggy-js";
import { motion, useReducedMotion } from "framer-motion";
import {
  BeakerIcon,
  CalculatorIcon,
  CameraIcon,
  ClockIcon,
  DocumentTextIcon,
  HeartIcon,
  HomeIcon,
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

function safeRoute(name, fallback) {
  try {
    return route(name);
  } catch (_) {
    return fallback;
  }
}

const items = [
  {
    title: "Dashboard",
    description: "Ringkasan dan akses cepat fitur utama",
    href: safeRoute("dashboard", "/dashboard"),
    icon: Squares2X2Icon,
    group: "Umum",
    keywords: ["beranda", "home", "ringkasan"],
    accent: "from-slate-600 to-slate-900",
  },
  {
    title: "Pendaftaran",
    description: "Registrasi pasien, lanjutan, dan proses antrian awal",
    href: safeRoute("registration.index", "/registration"),
    icon: ClipboardDocumentListIcon,
    group: "Pelayanan",
    keywords: ["registrasi", "kunjungan", "sep", "bpjs"],
    accent: "from-blue-500 to-indigo-500",
  },
  {
    title: "Pasien",
    description: "Manajemen data pasien",
    href: safeRoute("patients.index", "/patients"),
    icon: UsersIcon,
    group: "Pelayanan",
    keywords: ["rm", "rekam medis", "identitas", "biodata"],
    accent: "from-cyan-500 to-blue-500",
  },
  {
    title: "Rawat Jalan",
    description: "Pelayanan rawat jalan & CPPT",
    href: safeRoute("rawat-jalan.index", "/rawat-jalan"),
    icon: HeartIcon,
    group: "Pelayanan",
    keywords: ["rajal", "poli", "cppt", "soap"],
    accent: "from-rose-500 to-red-500",
  },
  {
    title: "Rawat Inap",
    description: "Pelayanan rawat inap, bangsal, kamar & tindakan",
    href: safeRoute("rawat-inap.index", "/rawat-inap"),
    icon: BuildingOffice2Icon,
    group: "Pelayanan",
    keywords: ["ranap", "bangsal", "kamar", "inap"],
    accent: "from-indigo-500 to-purple-500",
  },
  {
    title: "UGD",
    description: "Pelayanan IGD & tindakan kegawatdaruratan",
    href: safeRoute("igd.index", "/igd"),
    icon: ShieldCheckIcon,
    group: "Pelayanan",
    keywords: ["igd", "ugd", "triase"],
    accent: "from-amber-500 to-orange-500",
  },
  {
    title: "Pembayaran",
    description: "Pembayaran ralan/ranap dan rincian tagihan",
    href: safeRoute("pembayaran.index", "/pembayaran"),
    icon: BanknotesIcon,
    group: "Keuangan",
    keywords: ["bayar", "tagihan", "invoice", "kwitansi"],
    accent: "from-emerald-500 to-teal-500",
  },
  {
    title: "Kasir (Akutansi)",
    description: "Kasir rawat jalan, pembayaran, dan transaksi",
    href: safeRoute("akutansi.kasir-ralan.page", "/akutansi/kasir-ralan"),
    icon: CalculatorIcon,
    group: "Keuangan",
    keywords: ["kasir", "pembayaran", "transaksi"],
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    title: "Billing Rawat Inap",
    description: "Billing pasien rawat inap",
    href: safeRoute("akutansi.billing-rawat-inap.page", "/akutansi/billing-rawat-inap"),
    icon: DocumentTextIcon,
    group: "Keuangan",
    keywords: ["billing", "ranap", "nota inap"],
    accent: "from-sky-500 to-cyan-500",
  },
  {
    title: "Laboratorium",
    description: "Permintaan, pemeriksaan, dan hasil laboratorium",
    href: safeRoute("laboratorium.permintaan-lab.index", "/laboratorium/permintaan-lab"),
    icon: BeakerIcon,
    group: "Penunjang",
    keywords: ["lab", "laborat", "permintaan lab"],
    accent: "from-sky-500 to-blue-500",
  },
  {
    title: "Farmasi",
    description: "Permintaan resep & pelayanan farmasi",
    href: safeRoute("farmasi.permintaan-resep", "/farmasi"),
    icon: ClipboardDocumentListIcon,
    group: "Penunjang",
    keywords: ["obat", "resep", "apotek", "farmasi"],
    accent: "from-emerald-500 to-green-500",
  },
  {
    title: "Radiologi",
    description: "Permintaan pemeriksaan radiologi",
    href: "/radiologi",
    icon: CameraIcon,
    group: "Penunjang",
    keywords: ["rad", "radiologi", "rontgen"],
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Antrian Loket",
    description: "Ambil nomor & pengelolaan antrian loket",
    href: safeRoute("anjungan.pasien-mandiri", "/anjungan/pasien-mandiri"),
    icon: ClockIcon,
    group: "Antrian",
    keywords: ["loket", "kiosk", "nomor antrian"],
    accent: "from-slate-700 to-slate-900",
  },
  {
    title: "Display TV Loket",
    description: "Tampilan display antrian loket",
    href: safeRoute("antrian.display", "/antrian/display"),
    icon: Squares2X2Icon,
    group: "Antrian",
    keywords: ["display", "tv", "loket", "monitor"],
    accent: "from-slate-700 to-slate-900",
  },
  {
    title: "Display TV Poli",
    description: "Tampilan display antrian poliklinik",
    href: safeRoute("antrian.poli", "/antrian/poli"),
    icon: Squares2X2Icon,
    group: "Antrian",
    keywords: ["display", "tv", "poli", "antrian poli"],
    accent: "from-slate-700 to-slate-900",
  },
  {
    title: "Suara Display",
    description: "Pengaturan suara pemanggilan antrian",
    href: safeRoute("antrian.suara", "/antrian/suara"),
    icon: Squares2X2Icon,
    group: "Antrian",
    keywords: ["suara", "panggil", "speaker"],
    accent: "from-slate-700 to-slate-900",
  },
  {
    title: "PCare",
    description: "Menu bridging PCare & Mobile JKN",
    href: safeRoute("pcare.index", "/pcare"),
    icon: HomeIcon,
    group: "Bridging",
    keywords: ["bpjs", "pcare", "mobile jkn", "bridging"],
    accent: "from-blue-600 to-indigo-700",
  },
  {
    title: "SATUSEHAT",
    description: "Menu integrasi SATUSEHAT",
    href: safeRoute("satusehat.index", "/satusehat"),
    icon: ShieldCheckIcon,
    group: "Bridging",
    keywords: ["satusehat", "fhir", "bridging"],
    accent: "from-emerald-600 to-teal-700",
  },
  {
    title: "Laporan",
    description: "Laporan rajal/ranap dan statistik",
    href: safeRoute("laporan.index", "/laporan"),
    icon: Squares2X2Icon,
    group: "Laporan",
    keywords: ["rekap", "statistik", "kunjungan", "frekuensi"],
    accent: "from-amber-500 to-orange-600",
  },
  {
    title: "Poliklinik",
    description: "Master daftar poliklinik dan status aktif/tidak",
    href: safeRoute("poliklinik.index", "/poliklinik"),
    icon: BuildingOffice2Icon,
    group: "Master Data",
    keywords: ["poli", "klinik", "unit"],
    accent: "from-sky-500 to-blue-500",
  },
  {
    title: "Jadwal Dokter",
    description: "Kelola jadwal praktik dokter & kuota",
    href: safeRoute("jadwal.index", "/jadwal"),
    icon: CalendarDaysIcon,
    group: "Master Data",
    keywords: ["jadwal", "praktek", "kuota"],
    accent: "from-blue-500 to-indigo-500",
  },
  {
    title: "Penjamin (Penjab)",
    description: "Pengaturan penjamin/instansi pembayaran",
    href: safeRoute("penjab.index", "/penjab"),
    icon: ShieldCheckIcon,
    group: "Master Data",
    keywords: ["penjab", "asuransi", "penjamin"],
    accent: "from-emerald-500 to-teal-500",
  },
  {
    title: "Spesialis",
    description: "Master daftar spesialisasi dokter",
    href: safeRoute("spesialis.index", "/spesialis"),
    icon: AcademicCapIcon,
    group: "Master Data",
    keywords: ["spesialis", "poli", "dokter"],
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Dokter",
    description: "Manajemen data dokter",
    href: safeRoute("doctors.index", "/doctors"),
    icon: UserCircleIcon,
    group: "Kepegawaian",
    keywords: ["dokter", "sip", "jadwal"],
    accent: "from-indigo-500 to-purple-500",
  },
  {
    title: "Pegawai",
    description: "Manajemen data pegawai",
    href: safeRoute("employees.index", "/employees"),
    icon: UsersIcon,
    group: "Kepegawaian",
    keywords: ["pegawai", "karyawan", "sdm"],
    accent: "from-cyan-500 to-blue-500",
  },
  {
    title: "Petugas",
    description: "Manajemen data petugas",
    href: safeRoute("employees.petugas", "/employees/petugas"),
    icon: UsersIcon,
    group: "Kepegawaian",
    keywords: ["petugas", "sdm", "karyawan"],
    accent: "from-emerald-500 to-green-500",
  },
  {
    title: "Users",
    description: "Akun pengguna dan peran",
    href: safeRoute("users.index", "/users"),
    icon: UserGroupIcon,
    group: "Administrasi",
    keywords: ["akun", "user", "pengguna"],
    accent: "from-amber-500 to-orange-500",
  },
  {
    title: "Permissions & Roles",
    description: "Hak akses menu dan peran pengguna",
    href: safeRoute("permissions.index", "/permissions"),
    icon: KeyIcon,
    group: "Administrasi",
    keywords: ["role", "permission", "hak akses"],
    accent: "from-rose-500 to-red-500",
  },
  {
    title: "Menu Aplikasi",
    description: "Struktur dan urutan menu aplikasi",
    href: safeRoute("menus.index", "/menus"),
    icon: Squares2X2Icon,
    group: "Administrasi",
    keywords: ["menu", "navigasi", "sidebar"],
    accent: "from-teal-500 to-emerald-500",
  },
  {
    title: "Kategori Perawatan",
    description: "Pengelompokan tindakan perawatan",
    href: safeRoute("kategori-perawatan.index", "/kategori-perawatan"),
    icon: ClipboardDocumentListIcon,
    group: "Master Data",
    keywords: ["tindakan", "perawatan", "kategori"],
    accent: "from-sky-500 to-cyan-500",
  },
  {
    title: "Daftar Tarif",
    description: "Master tarif tindakan dan layanan",
    href: safeRoute("daftar-tarif.index", "/daftar-tarif"),
    icon: BanknotesIcon,
    group: "Master Data",
    keywords: ["tarif", "harga", "tindakan"],
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    title: "Setting Aplikasi",
    description: "Konfigurasi umum aplikasi dan branding",
    href: safeRoute("setting.index", "/setting"),
    icon: Cog6ToothIcon,
    group: "Administrasi",
    keywords: ["setting", "konfigurasi", "aplikasi"],
    accent: "from-indigo-500 to-blue-500",
  },
];

export default function MenuUtamaMasterData() {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [activeGroup, setActiveGroup] = useState("Semua");
  const shouldReduceMotion = useReducedMotion();

  const groups = useMemo(() => {
    const g = new Set();
    for (const it of items) {
      if (it?.group) g.add(it.group);
    }
    return ["Semua", ...Array.from(g)];
  }, []);

  const filteredItems = useMemo(() => {
    const q = (deferredSearch || "").trim().toLowerCase();
    const byGroup =
      activeGroup === "Semua"
        ? items
        : items.filter((it) => String(it?.group || "") === activeGroup);

    if (!q) return byGroup;

    return byGroup.filter((item) => {
      const hay = [
        item.title,
        item.description,
        item.group,
        Array.isArray(item.keywords) ? item.keywords.join(" ") : "",
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [activeGroup, deferredSearch]);

  const motionGridProps = shouldReduceMotion
    ? {}
    : {
        variants: containerVariants,
        initial: "hidden",
        animate: "visible",
      };
  return (
    <SidebarPengaturan title="Menu Utama">
      <Head title="Menu Utama" />

      <div>
        <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
          <div className="min-w-[220px]">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Menu Utama
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Cari cepat menu aplikasi berdasarkan nama, kategori, atau kata kunci.
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
                placeholder="Cari menu aplikasi..."
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
        <div className="flex flex-wrap gap-2 mb-4">
          {groups.map((g) => {
            const active = g === activeGroup;
            return (
              <button
                key={g}
                type="button"
                onClick={() => setActiveGroup(g)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  active
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white/70 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                }`}
              >
                {g}
              </button>
            );
          })}
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
