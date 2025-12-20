import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import { motion, AnimatePresence } from "framer-motion";
import {
    Wallet,
    Banknote,
    CreditCard,
    BookOpen,
    FileText,
    Receipt,
    Calendar,
    Scale,
    Home,
} from "lucide-react";

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
        transition: { type: "spring", stiffness: 240, damping: 22 },
    },
};

const tabs = [
    {
        key: "pengaturan",
        label: "Pengaturan Akun",
        items: [
            {
                title: "Pengaturan Rekening",
                description: "Konfigurasi COA & mapping",
                href: "/akutansi/pengaturan-rekening",
                icon: Banknote,
                accent: "from-sky-500 to-blue-500",
            },
            {
                title: "Rekening",
                description: "Daftar akun dan sub-akun",
                href: "/akutansi/rekening",
                icon: Banknote,
                accent: "from-emerald-500 to-teal-500",
            },
            {
                title: "Rekening Tahun",
                description: "Saldo awal per tahun",
                href: "/akutansi/rekening-tahun",
                icon: Calendar,
                accent: "from-cyan-500 to-blue-500",
            },
            {
                title: "Akun Bayar",
                description: "Mapping metode pembayaran",
                href: "/akutansi/akun-bayar",
                icon: CreditCard,
                accent: "from-violet-500 to-fuchsia-500",
            },
            {
                title: "Akun Piutang",
                description: "Mapping akun piutang",
                href: "/akutansi/akun-piutang",
                icon: Wallet,
                accent: "from-pink-500 to-rose-500",
            },
        ],
    },
    {
        key: "jurnal",
        label: "Jurnal",
        items: [
            {
                title: "Jurnal",
                description: "Jurnal umum dan posting",
                href: "/akutansi/jurnal",
                icon: BookOpen,
                accent: "from-indigo-500 to-purple-500",
            },
            {
                title: "Jurnal Penyesuaian",
                description: "Adjusting entries",
                href: "/akutansi/jurnal-penyesuaian",
                icon: BookOpen,
                accent: "from-amber-500 to-orange-500",
            },
            {
                title: "Jurnal Penutup",
                description: "Closing entries",
                href: "/akutansi/jurnal-penutup",
                icon: BookOpen,
                accent: "from-emerald-500 to-teal-500",
            },
            {
                title: "Detail Jurnal",
                description: "Rincian baris jurnal",
                href: "/akutansi/detail-jurnal",
                icon: FileText,
                accent: "from-cyan-500 to-blue-500",
            },
            {
                title: "Buku Besar",
                description: "General ledger per akun",
                href: "/akutansi/buku-besar",
                icon: BookOpen,
                accent: "from-sky-500 to-blue-500",
            },
        ],
    },
    {
        key: "akutansi",
        label: "Akutansi",
        items: [
            {
                title: "Cash Flow",
                description: "Arus kas per periode",
                href: "/akutansi/cashflow",
                icon: Wallet,
                accent: "from-indigo-500 to-blue-500",
            },
            {
                title: "Neraca",
                description: "Laporan posisi keuangan",
                href: "/akutansi/neraca",
                icon: Scale,
                accent: "from-fuchsia-500 to-pink-500",
            },
            {
                title: "Mutasi Rekening",
                description: "Pergerakan akun nominal",
                href: "/akutansi/mutasi-rekening",
                icon: Banknote,
                accent: "from-teal-500 to-emerald-500",
            },
            {
                title: "Mutasi Kas",
                description: "Pergerakan akun kas",
                href: "/akutansi/mutasi-kas",
                icon: Wallet,
                accent: "from-sky-500 to-cyan-500",
            },
            {
                title: "Setoran Bank",
                description: "Setor kas ke bank",
                href: "/akutansi/setoran-bank",
                icon: Banknote,
                accent: "from-rose-500 to-red-500",
            },
        ],
    },
    {
        key: "transaksi",
        label: "Transaksi",
        items: [
            {
                title: "Kasir Ralan",
                description: "Transaksi rawat jalan",
                href: "/akutansi/kasir-ralan",
                icon: Receipt,
                accent: "from-purple-500 to-pink-500",
            },
            {
                title: "Billing",
                description: "Manajemen billing",
                href: "/akutansi/billing",
                icon: Receipt,
                accent: "from-emerald-500 to-teal-500",
            },
            {
                title: "Nota Jalan",
                description: "Tagihan rawat jalan",
                href: "/akutansi/nota-jalan",
                icon: Receipt,
                accent: "from-orange-500 to-amber-500",
            },
            {
                title: "Nota Inap",
                description: "Tagihan rawat inap",
                href: "/akutansi/nota-inap",
                icon: Receipt,
                accent: "from-rose-500 to-red-500",
            },
        ],
    },
];

export default function AkutansiHome() {
    const [activeTab, setActiveTab] = useState("pengaturan");
    const current = tabs.find((t) => t.key === activeTab);

    return (
        <SidebarKeuangan title="Keuangan">
            <Head title="Akutansi" />
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Home className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Modul Akutansi
                        </h1>
                    </div>
                </div>
                <motion.div className="relative" layout>
                    <div className="-mx-4 sm:mx-0 overflow-x-auto">
                        <div className="flex min-w-max gap-4 sm:gap-8 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-0">
                            {tabs.map((tab) => (
                                <motion.button
                                    key={tab.key}
                                    layout
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`relative -mb-px pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
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
                    </div>
                </motion.div>
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
        </SidebarKeuangan>
    );
}
