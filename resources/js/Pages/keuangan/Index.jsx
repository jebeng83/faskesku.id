import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CalculatorIcon,
  ScaleIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  ReceiptPercentIcon,
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
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeIn" },
  },
  hover: {
    y: -3,
    scale: 1.01,
    boxShadow:
      "0 20px 25px -5px rgba(34,197,94,0.15), 0 8px 10px -6px rgba(34,197,94,0.1)",
    transition: { type: "spring", stiffness: 240, damping: 22 },
  },
};

const tabs = [
  {
    key: "master",
    label: "Master Data",
    items: [
      {
        title: "Daftar Tarif",
        description: "Kelola tarif layanan medis, laboratorium, dan radiologi",
        href: route("daftar-tarif.index"),
        icon: ClipboardDocumentListIcon,
        accent: "from-emerald-500 to-teal-500",
      },
      {
        title: "Chart of Accounts",
        description: "Daftar akun keuangan dan kode rekening",
        href: route("keuangan.chart-accounts"),
        icon: DocumentTextIcon,
        accent: "from-blue-500 to-indigo-500",
      },
      {
        title: "Mata Uang",
        description: "Pengaturan mata uang dan kurs valuta asing",
        href: route("keuangan.mata-uang"),
        icon: CurrencyDollarIcon,
        accent: "from-cyan-500 to-blue-500",
      },
      {
        title: "Bank & Kas",
        description: "Manajemen rekening bank dan kas perusahaan",
        href: route("keuangan.kas-bank"),
        icon: BuildingLibraryIcon,
        accent: "from-violet-500 to-purple-500",
      },
      {
        title: "Pajak",
        description: "Pengaturan jenis pajak dan tarif pajak",
        href: route("keuangan.pajak"),
        icon: ReceiptPercentIcon,
        accent: "from-orange-500 to-red-500",
      },
    ],
  },
  {
    key: "transaksi",
    label: "Transaksi",
    items: [
      {
        title: "Jurnal Umum",
        description: "Pencatatan transaksi keuangan harian",
        href: route("keuangan.jurnal-umum"),
        icon: DocumentTextIcon,
        accent: "from-emerald-500 to-teal-500",
      },
      {
        title: "Kas Masuk",
        description: "Pencatatan penerimaan kas dari berbagai sumber",
        href: route("keuangan.kas-masuk"),
        icon: BanknotesIcon,
        accent: "from-green-500 to-emerald-500",
      },
      {
        title: "Kas Keluar",
        description: "Pencatatan pengeluaran kas untuk operasional",
        href: route("keuangan.kas-keluar"),
        icon: CreditCardIcon,
        accent: "from-red-500 to-rose-500",
      },
      {
        title: "Piutang",
        description: "Manajemen piutang pasien dan asuransi",
        href: route("keuangan.piutang"),
        icon: ClipboardDocumentListIcon,
        accent: "from-blue-500 to-indigo-500",
      },
      {
        title: "Hutang",
        description: "Manajemen hutang kepada supplier dan vendor",
        href: route("keuangan.hutang"),
        icon: DocumentTextIcon,
        accent: "from-orange-500 to-amber-500",
      },
    ],
  },
  {
    key: "laporan",
    label: "Laporan",
    items: [
      {
        title: "Dashboard Keuangan",
        description: "Ringkasan kinerja keuangan dan indikator utama",
        href: route("keuangan.dashboard"),
        icon: ChartBarIcon,
        accent: "from-indigo-500 to-blue-500",
      },
      {
        title: "Buku Besar",
        description: "Laporan saldo dan mutasi per akun",
        href: route("keuangan.buku-besar"),
        icon: DocumentTextIcon,
        accent: "from-purple-500 to-indigo-500",
      },
      {
        title: "Neraca",
        description: "Laporan posisi keuangan perusahaan",
        href: route("keuangan.neraca"),
        icon: ScaleIcon,
        accent: "from-teal-500 to-cyan-500",
      },
      {
        title: "Laba Rugi",
        description: "Laporan pendapatan dan beban periode tertentu",
        href: route("keuangan.laba-rugi"),
        icon: CalculatorIcon,
        accent: "from-emerald-500 to-green-500",
      },
      {
        title: "Arus Kas",
        description: "Laporan pergerakan kas masuk dan keluar",
        href: route("keuangan.arus-kas"),
        icon: BanknotesIcon,
        accent: "from-blue-500 to-sky-500",
      },
      {
        title: "Laporan Piutang",
        description: "Analisis umur piutang dan kolektibilitas",
        href: route("keuangan.laporan-piutang"),
        icon: ClipboardDocumentListIcon,
        accent: "from-amber-500 to-orange-500",
      },
    ],
  },
];

export default function KeuanganIndex() {
  const [activeTab, setActiveTab] = useState("master");

  const current = tabs.find((t) => t.key === activeTab);

  return (
    <AppLayout title="Keuangan">
      <Head title="Keuangan" />

      {/* Page Header */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Modul Keuangan
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Kelola transaksi keuangan, laporan, dan analisis finansial rumah sakit.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <motion.div className="relative" layout>
          <div className="flex gap-8 border-b border-gray-200 dark:border-gray-800">
            {tabs.map((tab) => (
              <motion.button
                key={tab.key}
                layout
                onClick={() => setActiveTab(tab.key)}
                className={`relative -mb-px pb-3 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="tabIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute left-0 right-0 -bottom-[1px] h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 6 }}
            layout
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6"
          >
            {current.items.map((item, idx) => (
              <Link key={`${current.key}-${idx}`} href={item.href} className="group">
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  layout
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
                >
                  {/* Accent header */}
                  <div className={`h-1.5 bg-gradient-to-r ${item.accent}`} />

                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-100 dark:ring-emerald-900/40">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Klik untuk membuka
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <span className="text-sm">Buka</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <path d="M7 17L17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}