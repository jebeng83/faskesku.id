import React from "react";
import AppLayout from "@/Layouts/AppLayout";

const summary = [
    { label: "Pasien Dirawat", value: "54", desc: "Dengan tagihan aktif" },
    { label: "Butuh Verifikasi", value: "12", desc: "Menunggu konfirmasi penjamin" },
    { label: "Siap Discharge", value: "7", desc: "Menunggu proses kasir" },
    { label: "Lunas Minggu Ini", value: "39", desc: "Sudah diterbitkan kwitansi" },
];

const timeline = [
    { title: "Resume Medis", desc: "Dokter penanggung jawab mengunggah resume", time: "09:45" },
    { title: "Audit Tindakan", desc: "Billing memverifikasi tindakan & obat", time: "10:10" },
    { title: "Konfirmasi Penjamin", desc: "Petugas BPJS menyetujui klaim", time: "11:05" },
    { title: "Kasir Ranap", desc: "Kasir mencatat metode bayar + Kwitansi", time: "11:40" },
];

export default function PembayaranRanap() {
    return (
        <AppLayout title="Pembayaran Ranap">
            <div className="-mt-6 -mx-6 p-6 space-y-6">
                <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Pembayaran</p>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Rawat Inap</h1>
                        <p className="text-gray-600 dark:text-gray-300">Monitoring piutang & penyelesaian pembayaran pasien rawat inap.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                            Unduh Rekap Harian
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold shadow hover:bg-emerald-700 transition">
                            Input Pembayaran Ranap
                        </button>
                    </div>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {summary.map((item) => (
                        <div key={item.label} className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm">
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{item.value}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                        </div>
                    ))}
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
                        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                            <div className="flex-1">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Bangsal / Ruangan</label>
                                <select className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm">
                                    <option>Semua Bangsal</option>
                                    <option>Kelas 1 Mawar</option>
                                    <option>Kelas 2 Melati</option>
                                    <option>VIP Anggrek</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Filter Status</label>
                                <select className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm">
                                    <option>Semua</option>
                                    <option>Menunggu Resume</option>
                                    <option>Menunggu Penjamin</option>
                                    <option>Lunas</option>
                                </select>
                            </div>
                            <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow hover:bg-emerald-700 transition">
                                Terapkan
                            </button>
                        </div>

                        <div className="mt-6 space-y-4">
                            {[
                                { pasien: "Arum Setyani", ranjang: "VIP-102", penjamin: "BPJS", total: "Rp 12.450.000", status: "Menunggu Penjamin" },
                                { pasien: "Bagus Priyanto", ranjang: "Kelas 1-14B", penjamin: "Umum", total: "Rp 6.820.000", status: "Kasir" },
                                { pasien: "Clara Hapsari", ranjang: "Kelas 2-21C", penjamin: "Perusahaan", total: "Rp 9.120.000", status: "Resume" },
                            ].map((row) => (
                                <div key={row.pasien} className="flex items-center justify-between rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{row.pasien}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{row.ranjang} • {row.penjamin}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900 dark:text-white">{row.total}</p>
                                        <p className="text-xs text-emerald-600 dark:text-emerald-400">{row.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Workflow Discharge</h2>
                        <div className="space-y-6">
                            {timeline.map((item) => (
                                <div key={item.title} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center font-semibold">
                                            {item.time}
                                        </div>
                                        <div className="flex-1 w-px bg-gray-200 dark:bg-gray-800 mt-2" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
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

