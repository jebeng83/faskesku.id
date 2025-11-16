import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

const statCards = {
    ralan: [
        {
            title: "Tagihan Ralan",
            amount: "Rp 128.450.000",
            trend: "+8.2% dibanding kemarin",
            gradient: "from-blue-500 to-indigo-600",
            href: "/pembayaran/ralan",
            label: "Kelola Pembayaran Ralan",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                    <path d="M4 6h16M4 12h12M4 18h8" />
                </svg>
            ),
        },
    ],
    ranap: [
        {
            title: "Tagihan Ranap",
            amount: "Rp 212.900.000",
            trend: "+12.4% sejak awal minggu",
            gradient: "from-emerald-500 to-teal-600",
            href: "/pembayaran/ranap",
            label: "Kelola Pembayaran Ranap",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                    <path d="M5 11h14" />
                    <path d="M12 5v14" />
                </svg>
            ),
        },
    ],
};

const workflowSteps = [
    { title: "Verifikasi Tagihan", desc: "Review data billing otomatis dari modul medis." },
    { title: "Pilih Penjamin", desc: "Pastikan penanggung jawab pembayaran dan plafon masih tersedia." },
    { title: "Input Pembayaran", desc: "Entri metode bayar, nomor bukti, dan nilai pembayaran." },
    { title: "Status & Kwitansi", desc: "Set status lunas dan unduh kwitansi resmi untuk pasien." },
];

export default function PembayaranIndex() {
    const [activeTab, setActiveTab] = useState("ralan"); // 'ralan' | 'ranap'
    return (
        <AppLayout title="Pembayaran">
            <div className="-mt-6 -mx-6 p-6 space-y-8">
                <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">Modul Pembayaran</p>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">Pembayaran</h1>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                            Pilih jenis layanan untuk mengelola pembayaran: Rawat Jalan atau Rawat Inap.
                        </p>
                    </div>
                </header>

                {/* Tabs */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 inline-flex">
                    <button
                        onClick={() => setActiveTab("ralan")}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                            activeTab === "ralan"
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                    >
                        Rawat Jalan
                    </button>
                    <button
                        onClick={() => setActiveTab("ranap")}
                        className={`ml-1 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                            activeTab === "ranap"
                                ? "bg-emerald-600 text-white"
                                : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                    >
                        Rawat Inap
                    </button>
                </div>

                {/* Ringkas & CTA per-tab */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(statCards[activeTab] || []).map((card) => (
                        <Link
                            key={card.title}
                            href={card.href}
                            className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-gradient-to-br ${card.gradient}`}
                        >
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))]" />
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium uppercase tracking-wide text-white/80">{card.title}</p>
                                    <p className="text-3xl font-bold mt-2">{card.amount}</p>
                                    <p className="text-sm mt-1 text-white/80">{card.trend}</p>
                                </div>
                                <div className="h-16 w-16 bg-white/15 rounded-xl flex items-center justify-center">{card.icon}</div>
                            </div>
                            <div className="relative z-10 mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                                {card.label}
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                    <path d="M5 12h14M13 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </section>

                {/* Konten per-tab (ringkas) */}
                {activeTab === "ralan" ? (
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Ringkasan Ralan</h2>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Pembayaran rawat jalan terbaru.</p>
                                </div>
                                <Link href="/pembayaran/ralan" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                    Buka Pembayaran Ralan
                                </Link>
                            </div>
                            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                                <div className="flex items-center justify-between rounded-xl border border-gray-100 dark:border-gray-800 p-3">
                                    <span>Menunggu verifikasi</span><span className="font-semibold">12</span>
                                </div>
                                <div className="flex items-center justify-between rounded-xl border border-gray-100 dark:border-gray-800 p-3">
                                    <span>Siap dibayar</span><span className="font-semibold">7</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Alur Pembayaran Ralan</h2>
                            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                {workflowSteps.map((s) => (
                                    <li key={s.title} className="flex items-start gap-2">
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">{s.title}</p>
                                            <p>{s.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                ) : (
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Ringkasan Ranap</h2>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Pembayaran rawat inap terbaru.</p>
                                </div>
                                <Link href="/pembayaran/ranap" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                                    Buka Pembayaran Ranap
                                </Link>
                            </div>
                            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                                <div className="flex items-center justify-between rounded-xl border border-gray-100 dark:border-gray-800 p-3">
                                    <span>Butuh verifikasi</span><span className="font-semibold">9</span>
                                </div>
                                <div className="flex items-center justify-between rounded-xl border border-gray-100 dark:border-gray-800 p-3">
                                    <span>Kasir</span><span className="font-semibold">5</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Alur Pembayaran Ranap</h2>
                            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                {workflowSteps.map((s) => (
                                    <li key={s.title} className="flex items-start gap-2">
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">{s.title}</p>
                                            <p>{s.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}
            </div>
        </AppLayout>
    );
}

