import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";
import { motion, AnimatePresence } from "framer-motion";
import {
    Cog6ToothIcon,
    ShieldCheckIcon,
    LinkIcon,
    BuildingOffice2Icon,
    ClipboardDocumentListIcon,
    UsersIcon,
    ChartBarIcon,
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

const tabs = [
    {
        key: "app",
        label: "Pengaturan Aplikasi",
        items: [
            {
                title: "App Settings",
                description: "Pengaturan branding dan aset",
                href: route("setting.index"),
                icon: ClipboardDocumentListIcon,
                accent: "from-indigo-500 to-purple-500",
            },
            {
                title: "Highlight & Prioritas",
                description: "Pengaturan highlight tim dan tindakan prioritas",
                href: route("setting.dashboard.index"),
                icon: Cog6ToothIcon,
                accent: "from-amber-500 to-orange-500",
            },
        ],
    },
    {
        key: "hakAkses",
        label: "Pengaturan Hak Akses",
        items: [
            {
                title: "Users",
                description: "Manajemen akun pengguna",
                href: route("users.index"),
                icon: UsersIcon,
                accent: "from-emerald-500 to-teal-500",
            },
            {
                title: "Permissions",
                description: "Roles dan hak akses",
                href: route("permissions.index"),
                icon: ShieldCheckIcon,
                accent: "from-amber-500 to-orange-500",
            },
        ],
    },
    {
        key: "umum",
        label: "Pengaturan Umum",
        items: [
            {
                title: "Master Data",
                description: "Menu utama master data",
                href: route("master-data.index"),
                icon: ClipboardDocumentListIcon,
                accent: "from-fuchsia-500 to-pink-500",
            },
            {
                title: "Penjab",
                description: "Daftar penjamin",
                href: route("penjab.index"),
                icon: ClipboardDocumentListIcon,
                accent: "from-cyan-500 to-blue-500",
            },
            {
                title: "Poliklinik",
                description: "Daftar poliklinik",
                href: route("poliklinik.index"),
                icon: BuildingOffice2Icon,
                accent: "from-teal-500 to-emerald-500",
            },
            {
                title: "Jadwal Dokter",
                description: "Pengaturan jadwal pelayanan",
                href: route("jadwal.index"),
                icon: ChartBarIcon,
                accent: "from-indigo-500 to-blue-500",
            },
        ],
    },
    {
        key: "pcare",
        label: "Bridging PCare",
        items: [
            {
                title: "Setting PCare",
                description: "Konfigurasi integrasi PCare",
                href: route("pcare.setting.index"),
                icon: LinkIcon,
                accent: "from-sky-500 to-blue-500",
            },
            {
                title: "Setting Mobile JKN",
                description: "Konfigurasi integrasi Mobile JKN",
                href: route("pcare.setting.mobilejkn.index"),
                icon: LinkIcon,
                accent: "from-emerald-500 to-teal-500",
            },
            {
                title: "Mapping Dokter",
                description: "Relasi dokter RS ↔ PCare",
                href: route("pcare.mapping.dokter"),
                icon: UsersIcon,
                accent: "from-amber-500 to-orange-500",
            },
            {
                title: "Mapping Poli",
                description: "Relasi poli RS ↔ PCare",
                href: route("pcare.mapping.poli"),
                icon: BuildingOffice2Icon,
                accent: "from-cyan-500 to-blue-500",
            },
            {
                title: "Mapping Obat",
                description: "Relasi obat RS ↔ PCare",
                href: route("pcare.mapping.obat"),
                icon: ClipboardDocumentListIcon,
                accent: "from-violet-500 to-fuchsia-500",
            },
        ],
    },
    {
        key: "satusehat",
        label: "Bridging Satu Sehat",
        items: [
            {
                title: "Mapping Organisasi",
                description: "Pemetaan organisasi",
                href: route("satusehat.prerequisites.organization"),
                icon: BuildingOffice2Icon,
                accent: "from-indigo-500 to-blue-500",
            },
            {
                title: "Mapping Location",
                description: "Pemetaan lokasi poli",
                href: route("satusehat.prerequisites.location"),
                icon: ClipboardDocumentListIcon,
                accent: "from-sky-500 to-cyan-500",
            },
            {
                title: "Location Farmasi",
                description: "Pemetaan lokasi farmasi",
                href: route("satusehat.prerequisites.location_farmasi"),
                icon: ClipboardDocumentListIcon,
                accent: "from-purple-500 to-pink-500",
            },
            {
                title: "Location Ranap",
                description: "Pemetaan lokasi rawat inap",
                href: route("satusehat.prerequisites.location_ranap"),
                icon: ClipboardDocumentListIcon,
                accent: "from-teal-500 to-emerald-500",
            },
        ],
    },
];

export default function ProfileHome() {
    const [activeTab, setActiveTab] = useState("app");
    const current = tabs.find((t) => t.key === activeTab);

    return (
        <SidebarPengaturan title="Pengaturan" wide>
            <Head title="Home Pengaturan" />
            <div className="px-0 sm:px-2 lg:px-4">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Home Pengaturan
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Akses cepat ke seluruh menu pengaturan.
                        </p>
                    </div>
                </div>

                <motion.div className="relative" layout>
                    <div className="-mx-4 sm:mx-0 overflow-x-auto scrollbar-hide">
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
                                            layoutId="profileTabIndicator"
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
                        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6"
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
        </SidebarPengaturan>
    );
}
