import React from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("id-ID");

const statusClasses = {
    "Belum Bayar": "bg-amber-100 text-amber-700 dark:bg-amber-400/20 dark:text-amber-200",
    "Sudah Bayar": "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-200",
};

const formatDate = (date) => {
    if (!date) {
        return "-";
    }

    return new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export default function PembayaranRalan({ groups = [], stats = {}, filters = {} }) {
    const summary = [
        { label: "Menunggu Pembayaran", value: stats.menunggu_pembayaran ?? 0 },
        { label: "Menunggu Penjamin", value: stats.menunggu_penjamin ?? 0 },
        { label: "Dalam Proses Kasir", value: stats.dalam_proses_kasir ?? 0 },
        { label: "Selesai Hari Ini", value: stats.selesai_hari_ini ?? 0 },
    ];

    return (
        <AppLayout title="Pembayaran Ralan">
            <div className="-mt-6 -mx-6 p-6 space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Pembayaran</p>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Rawat Jalan</h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Menampilkan pasien Reg Periksa dengan status lanjut Ralan pada rentang{" "}
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {formatDate(filters.start_date)} - {formatDate(filters.end_date)}
                            </span>
                            .
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                            Export CSV
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition">
                            Input Pembayaran
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {summary.map((item) => (
                        <div key={item.label} className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm">
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{numberFormatter.format(item.value)}</p>
                        </div>
                    ))}
                </div>

                <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Pasien dalam rentang</p>
                            <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                                {numberFormatter.format(groups.reduce((sum, group) => sum + (group.items?.length ?? 0), 0))}
                            </p>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-3">
                            <span>Rentang mulai: <span className="font-semibold text-gray-900 dark:text-white">{formatDate(filters.start_date)}</span></span>
                            <span>Rentang selesai: <span className="font-semibold text-gray-900 dark:text-white">{formatDate(filters.end_date)}</span></span>
                        </div>
                    </div>
                </div>

                {groups.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-10 text-center">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">Belum ada registrasi Rawat Jalan.</p>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Coba ubah rentang tanggal atau pastikan data reg_periksa sudah tersedia.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {groups.map((group) => (
                            <div key={group.tanggal} className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
                                <div className="flex flex-col gap-1 border-b border-gray-100 dark:border-gray-800 px-6 py-4 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Tanggal Registrasi</p>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{group.display_tanggal}</h3>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {group.items?.length ?? 0} pasien
                                    </p>
                                </div>
                                <div className="overflow-x-auto px-6 py-4">
                                    <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                                        <thead>
                                            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                                <th className="py-3 pr-4">Jam</th>
                                                <th className="py-3 pr-4">No. Rawat</th>
                                                <th className="py-3 pr-4">Pasien</th>
                                                <th className="py-3 pr-4">Penjamin</th>
                                                <th className="py-3 pr-4">Tarif Registrasi</th>
                                                <th className="py-3">Status Bayar</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                            {(group.items || []).map((row) => (
                                                <tr key={row.no_rawat} className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                                                    <td className="py-3 pr-4 text-gray-900 dark:text-white">{row.jam_reg}</td>
                                                    <td className="py-3 pr-4 font-semibold text-blue-600 dark:text-blue-400">
                                                        <Link href={route("pembayaran.ralan.detail", row.no_rawat)} className="hover:underline">
                                                            {row.no_rawat}
                                                        </Link>
                                                    </td>
                                                    <td className="py-3 pr-4 text-gray-900 dark:text-white">
                                                        <Link href={route("pembayaran.ralan.detail", row.no_rawat)} className="block font-medium hover:underline">
                                                            {row.pasien}
                                                        </Link>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">{row.no_rkm_medis}</span>
                                                    </td>
                                                    <td className="py-3 pr-4">{row.penjamin}</td>
                                                    <td className="py-3 pr-4 font-semibold">{currencyFormatter.format(row.total || 0)}</td>
                                                    <td className="py-3">
                                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[row.status_bayar] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"}`}>
                                                            {row.status_bayar}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

