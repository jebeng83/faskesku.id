import React from "react";
import { Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

const statCards = [
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
];

const workflowSteps = [
    { title: "Verifikasi Tagihan", desc: "Review data billing otomatis dari modul medis." },
    { title: "Pilih Penjamin", desc: "Pastikan penanggung jawab pembayaran dan plafon masih tersedia." },
    { title: "Input Pembayaran", desc: "Entri metode bayar, nomor bukti, dan nilai pembayaran." },
    { title: "Status & Kwitansi", desc: "Set status lunas dan unduh kwitansi resmi untuk pasien." },
];

export default function PembayaranIndex() {
    return (
        <AppLayout title="Pembayaran">
            <div className="-mt-6 -mx-6 p-6 space-y-8">
                <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">Modul Pembayaran</p>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">Dashboard Pembayaran</h1>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                            Pantau status pembayaran Rawat Jalan & Rawat Inap secara real-time. Modul ini terhubung langsung dengan data registrasi, penjamin, dan tagihan tindakan.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                            Histori Pembayaran
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition">
                            Buat Pembayaran Baru
                        </button>
                    </div>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {statCards.map((card) => (
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

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Antrian Pembayaran</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Daftar ringkas billing yang perlu ditindaklanjuti.</p>
                            </div>
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Lihat Semua</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { pasien: "Rizky Aditya", tipe: "Ralan", waktu: "10:45", total: "Rp 1.250.000", status: "Menunggu Verifikasi" },
                                { pasien: "Dewi Lestari", tipe: "Ranap", waktu: "09:10", total: "Rp 8.450.000", status: "Siap Dibayar" },
                                { pasien: "Satria Wibowo", tipe: "Ralan", waktu: "08:20", total: "Rp 675.000", status: "Menunggu Penjamin" },
                            ].map((item) => (
                                <div
                                    key={`${item.pasien}-${item.waktu}`}
                                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800"
                                >
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{item.pasien}</p>
                                        <p className="text-sm text-gray-500">{item.tipe} • {item.waktu}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900 dark:text-white">{item.total}</p>
                                        <p className="text-xs text-amber-600 dark:text-amber-400">{item.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Alur Pembayaran</h2>
                        <div className="space-y-6">
                            {workflowSteps.map((step, index) => (
                                <div key={step.title} className="flex gap-3">
                                    <div className="flex flex-col items-center">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center font-semibold">
                                            {index + 1}
                                        </div>
                                        {index < workflowSteps.length - 1 && <div className="flex-1 w-px bg-gray-200 dark:bg-gray-700 mt-2" />}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{step.title}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}

