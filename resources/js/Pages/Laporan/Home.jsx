import React, { useDeferredValue, useMemo, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import SidebarLaporan from "@/Layouts/SidebarLaporan";
import { route } from "ziggy-js";
import { motion, useReducedMotion } from "framer-motion";
import { BarChart2, Activity, FileText, ClipboardList, Search, X } from "lucide-react";

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
        transition: { type: "spring", stiffness: 240, damping: 22 },
    },
};

const items = [
    {
        title: "Ringkasan Kunjungan",
        description: "Grafik dan rekap kunjungan pasien per poli.",
        href: route("dashboard"),
        icon: BarChart2,
        accent: "from-sky-500 to-indigo-500",
    },
    {
        title: "Laporan Keuangan",
        description: "Akses cepat ke laporan neraca dan arus kas.",
        href: "/akutansi/neraca",
        icon: Activity,
        accent: "from-emerald-500 to-teal-500",
    },
    {
        title: "Buku Besar",
        description: "Detail mutasi akun keuangan per periode.",
        href: "/akutansi/buku-besar",
        icon: FileText,
        accent: "from-fuchsia-500 to-pink-500",
    },
    {
        title: "Billing Rawat Jalan",
        description: "Rekap billing dan nota rawat jalan.",
        href: "/akutansi/billing",
        icon: ClipboardList,
        accent: "from-orange-500 to-amber-500",
    },
];

export default function LaporanHome() {
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
        <SidebarLaporan title="Laporan">
            <Head title="Laporan" />

            <div className="px-2 sm:px-4 lg:px-6">
                <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                    <div className="min-w-[220px]">
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Pusat Laporan
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Akses cepat ke laporan operasional dan keuangan.
                        </p>
                    </div>
                    <div className="w-full sm:w-auto">
                        <div className="relative w-full sm:w-80">
                            <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <Search className="h-5 w-5" />
                            </span>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Escape" && search) setSearch("");
                                }}
                                placeholder="Cari laporan..."
                                className="block w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm pl-10 pr-9 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <motion.div
                    {...motionGridProps}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4"
                >
                    {filteredItems.map((item) => (
                        <motion.div
                            key={item.title}
                            variants={cardVariants}
                            whileHover="hover"
                            className="group relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-900/80 backdrop-blur border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-shadow"
                        >
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                            />
                            <div className="relative p-5 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="inline-flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 p-2">
                                        <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                                    {item.title}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-1">
                                    {item.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={item.href}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        Buka laporan
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </SidebarLaporan>
    );
}
