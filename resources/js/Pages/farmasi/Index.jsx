import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarFarmasi from "@/Layouts/SidebarFarmasi";
import { motion, AnimatePresence } from "framer-motion";
import {
    ClipboardDocumentListIcon,
    RectangleStackIcon,
    ShoppingCartIcon,
    BanknotesIcon,
    TruckIcon,
    BeakerIcon,
    ChartBarIcon,
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
            "0 20px 25px -5px rgba(59,130,246,0.15), 0 8px 10px -6px rgba(59,130,246,0.1)",
        transition: { type: "spring", stiffness: 240, damping: 22 },
    },
};

const hutangObatUrl = (() => {
    try {
        return route("farmasi.hutang-obat", {}, false);
    } catch (_) {
        return "/farmasi/hutang-obat";
    }
})();

const tabs = [
    {
        key: "master",
        label: "Master Data",
        items: [
            {
                title: "Industri Farmasi",
                description: "Daftar pabrikan/industri farmasi yang terdaftar",
                href: "/farmasi/industri-farmasi",
                icon: ClipboardDocumentListIcon,
                accent: "from-sky-500 to-blue-500",
            },
            {
                title: "Data Suplier",
                description: "Manajemen pemasok obat, BHP, dan alat kesehatan",
                href: route("farmasi.datasuplier.index", {}, false),
                icon: TruckIcon,
                accent: "from-emerald-500 to-teal-500",
            },
            {
                title: "Satuan Barang",
                description: "Pengaturan satuan barang untuk konsistensi data",
                href: route("farmasi.satuan-barang.index", {}, false),
                icon: RectangleStackIcon,
                accent: "from-cyan-500 to-blue-500",
            },
            {
                title: "Metode Racik",
                description: "Definisi metode racikan untuk resep komposisi",
                href: "/farmasi/metode-racik",
                icon: BeakerIcon,
                accent: "from-violet-500 to-fuchsia-500",
            },
            {
                title: "Konversi Satuan",
                description:
                    "Relasi konversi antar satuan (mis. box → strip → tablet)",
                href: "/farmasi/konversi-satuan",
                icon: ClipboardDocumentListIcon,
                accent: "from-indigo-500 to-purple-500",
            },
            {
                title: "Jenis Obat, Alkes dan BHP",
                description: "Pengelompokan berdasarkan jenis obat/alkes/BHP",
                href: "/farmasi/jenis-obat",
                icon: BeakerIcon,
                accent: "from-pink-500 to-rose-500",
            },
            {
                title: "Kategori Obat",
                description: "Pengelompokan obat untuk kemudahan administrasi",
                href: route("farmasi.kategori-obat.index", {}, false),
                icon: RectangleStackIcon,
                accent: "from-cyan-500 to-blue-500",
            },
            {
                title: "Golongan Obat",
                description: "Klasifikasi obat berdasarkan golongan",
                href: "/farmasi/golongan-obat",
                icon: ClipboardDocumentListIcon,
                accent: "from-amber-500 to-orange-500",
            },
            {
                title: "Setting Harga Obat",
                description: "Pengaturan persentase harga jual obat",
                href: route("farmasi.set-harga-obat", {}, false),
                icon: BanknotesIcon,
                accent: "from-emerald-500 to-teal-500",
            },
            {
                title: "Data Obat",
                description:
                    "Kelola daftar obat, satuan, dan detail spesifikasi",
                href: route("farmasi.data-obat", {}, false),
                icon: BeakerIcon,
                accent: "from-blue-500 to-indigo-500",
            },
        ],
    },
    {
        key: "transaksi",
        label: "Transaksi",
        items: [
            {
                title: "Stok Opname",
                description: "Lakukan penyesuaian dan audit stok berkala",
                href: route("farmasi.stok-opname", {}, false),
                icon: ClipboardDocumentListIcon,
                accent: "from-purple-500 to-pink-500",
            },
            {
                title: "Pembelian Obat",
                description:
                    "Catat dan kelola transaksi pembelian dari supplier",
                href: route("farmasi.pembelian-obat", {}, false),
                icon: TruckIcon,
                accent: "from-emerald-500 to-teal-500",
            },
            {
                title: "Hutang Obat",
                description:
                    "Daftar pemesanan belum bayar dan proses pelunasan",
                href: hutangObatUrl,
                icon: BanknotesIcon,
                accent: "from-indigo-500 to-purple-500",
            },
            {
                title: "Penjualan Obat",
                description:
                    "Transaksi penjualan untuk pasien umum dan penjamin",
                href: route("farmasi.penjualan-obat", {}, false),
                icon: ShoppingCartIcon,
                accent: "from-orange-500 to-amber-500",
            },
            {
                title: "Resep Obat",
                description:
                    "Proses resep dari layanan Rawat Jalan/IGD/Rawat Inap",
                href: route("farmasi.resep-obat", {}, false),
                icon: BeakerIcon,
                accent: "from-rose-500 to-red-500",
            },
        ],
    },
    {
        key: "laporan",
        label: "Laporan",
        items: [
            {
                title: "Dashboard & Analitik",
                description: "Grafik penjualan, pembelian, dan utilisasi obat",
                href: route("farmasi.dashboard", {}, false),
                icon: ChartBarIcon,
                accent: "from-indigo-500 to-blue-500",
            },
            {
                title: "Laporan Penjualan",
                description:
                    "Ringkasan transaksi penjualan berdasarkan periode",
                href: route("farmasi.penjualan-obat", {}, false),
                icon: BanknotesIcon,
                accent: "from-fuchsia-500 to-pink-500",
            },
            {
                title: "Laporan Pembelian",
                description: "Ringkasan pembelian obat dari berbagai supplier",
                href: route("farmasi.pembelian-obat", {}, false),
                icon: TruckIcon,
                accent: "from-teal-500 to-emerald-500",
            },
            {
                title: "Riwayat Transaksi Obat",
                description: "Pergerakan stok, stok minimum, dan peringatan",
                href: route("farmasi.riwayat-barang-medis", {}, false),
                icon: ClipboardDocumentListIcon,
                accent: "from-sky-500 to-cyan-500",
            },
            {
                title: "Riwayat Transaksi Gudang",
                description: "Riwayat keluar/masuk gudang per lokasi & periode",
                href: route("farmasi.riwayat-transaksi-gudang", {}, false),
                icon: ClipboardDocumentListIcon,
                accent: "from-amber-500 to-orange-500",
            },
        ],
    },
];

export default function FarmasiIndex() {
    const [activeTab, setActiveTab] = useState("transaksi");

    const current = tabs.find((t) => t.key === activeTab);

    return (
        <SidebarFarmasi title="Farmasi">
            <Head title="Farmasi" />

            {/* Page Header */}
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Modul Farmasi
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Kelola data, proses transaksi, dan pantau laporan
                            farmasi.
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
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                }`}
                                whileTap={{ scale: 0.98 }}
                            >
                                {tab.label}
                                {activeTab === tab.key && (
                                    <motion.div
                                        layoutId="tabIndicator"
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                        }}
                                        className="absolute left-0 right-0 -bottom-[1px] h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"
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
                            <Link
                                key={`${current.key}-${idx}`}
                                href={item.href}
                                className="group"
                            >
                                <motion.div
                                    variants={cardVariants}
                                    whileHover="hover"
                                    layout
                                    className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
                                >
                                    {/* Accent header */}
                                    <div
                                        className={`h-1.5 bg-gradient-to-r ${item.accent}`}
                                    />

                                    <div className="p-5">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 ring-1 ring-blue-100 dark:ring-blue-900/40">
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
                                            <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                                                <span className="text-sm">
                                                    Buka
                                                </span>
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
        </SidebarFarmasi>
    );
}
