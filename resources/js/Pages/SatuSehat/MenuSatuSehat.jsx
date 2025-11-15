import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";

// Menu SatuSehat
// Fokus ke menu yang sudah tersedia (Prerequisites)
const tabs = [{ key: "prereq", label: "Prerequisites" }];

const cardVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
};

const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
};

const cardsByTab = {
    prereq: [
        {
            key: "organization",
            title: "Organization",
            desc: "Kelola Organization & Subunits",
            href: route("satusehat.prerequisites.organization"),
            gradient: "from-blue-500 to-indigo-600",
            icon: (
                <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <rect x="3" y="4" width="18" height="14" rx="2" />
                    <path d="M7 8h4M7 12h4M13 12h4M13 8h4" />
                </svg>
            ),
        },
        {
            key: "location",
            title: "Location",
            desc: "Kelola lokasi faskes & ruangan",
            href: route("satusehat.prerequisites.location"),
            gradient: "from-emerald-500 to-teal-600",
            icon: (
                <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                </svg>
            ),
        },
        {
            key: "location_ranap",
            title: "Location Satusehat",
            desc: "Kelola lokasi bangsal (Rawat Inap)",
            href: route("satusehat.prerequisites.location_ranap"),
            gradient: "from-sky-500 to-cyan-600",
            icon: (
                <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                </svg>
            ),
        },
        {
            key: "location_farmasi",
            title: "Lokasi SatuSehat",
            desc: "Kelola lokasi farmasi (Bangsal)",
            href: route("satusehat.prerequisites.location_farmasi"),
            gradient: "from-violet-500 to-purple-600",
            icon: (
                <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                </svg>
            ),
        },
        {
            key: "practitioner",
            title: "Referensi Practitioner",
            desc: "Cari Practitioner (berdasarkan NIK)",
            href: route("satusehat.prerequisites.practitioner"),
            gradient: "from-rose-500 to-red-600",
            icon: (
                <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <circle cx="12" cy="8" r="3" />
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
            ),
        },
        {
            key: "patient",
            title: "Referensi Pasien",
            desc: "Cari Pasien (berdasarkan NIK)",
            href: route("satusehat.prerequisites.patient"),
            gradient: "from-amber-500 to-orange-600",
            icon: (
                <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <circle cx="12" cy="8" r="3" />
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
            ),
        },
    ],
};

export default function MenuSatuSehat() {
    const [activeTab, setActiveTab] = useState("prereq");
    return (
        <AppLayout title="SATUSEHAT">
            <div className="px-4 sm:px-6 lg:px-8 py-6">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-slate-800 tracking-tight">
                            Menu SatuSehat
                        </h1>
                        <p className="text-xs text-slate-500">
                            Akses cepat ke fitur SATUSEHAT
                        </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                        v1.0
                    </span>
                </div>

                {/* Tabs */}
                <div className="mb-3 flex flex-wrap gap-2">
                    {tabs.map((t) => (
                        <button
                            key={t.key}
                            type="button"
                            onClick={() => setActiveTab(t.key)}
                            className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                                activeTab === t.key
                                    ? "bg-slate-100 text-slate-800 border-slate-300"
                                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Cards Grid */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {cardsByTab[activeTab].map((item) => (
                        <motion.div
                            key={item.key}
                            variants={cardVariants}
                            whileHover={{ y: -3, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                href={item.href}
                                className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-colors hover:border-slate-300 hover:bg-white hover:shadow-md min-h-[110px]"
                            >
                                <div
                                    className={`flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br ${item.gradient} text-white shadow`}
                                >
                                    {item.icon}
                                </div>
                                <div className="mt-2">
                                    <div className="text-slate-800 font-semibold leading-tight">
                                        {item.title}{" "}
                                        <span className="text-slate-400">
                                            ›
                                        </span>
                                    </div>
                                    <div className="text-slate-500 text-xs">
                                        {item.desc}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer Note */}
                <div className="mt-4 text-[10px] text-slate-400">
                    Tip: Klik kartu untuk membuka halaman pengelolaan.
                </div>
            </div>
        </AppLayout>
    );
}
