import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, Database, Filter, Search, CreditCard } from "lucide-react";
import SidebarKasir from "@/Layouts/SidebarKasir";

const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
});

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4 },
    },
};

export default function PembayaranRanap() {
    const [summary, setSummary] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [search, setSearch] = React.useState("");
    const [statusBayarFilter, setStatusBayarFilter] = React.useState("Belum Bayar");

    React.useEffect(() => {
        let active = true;

        const load = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await fetch("/pembayaran/ranap?json=1", {
                    method: "GET",
                    headers: { Accept: "application/json" },
                    credentials: "same-origin",
                });
                if (!res.ok) {
                    const text = await res.text().catch(() => "");
                    throw new Error(text || `Gagal memuat data (${res.status})`);
                }
                const json = await res.json();
                if (!active) return;
                setSummary(json.summary || []);
                setRows(json.rows || []); 
            } catch (e) {
                if (!active) return;
                setError(e?.message || "Terjadi kesalahan saat memuat data");
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        load();

        return () => {
            active = false;
        };
    }, []);

    const filteredRows = React.useMemo(() => {
        let result = rows;

        const needle = search.trim().toLowerCase();
        if (needle) {
            result = result.filter((row) => {
                const values = [
                    row.no_rawat,
                    row.no_rkm_medis,
                    row.pasien,
                    row.ranjang,
                    row.penjamin,
                    row.status,
                    row.status_bayar,
                ]
                    .filter(Boolean)
                    .map((v) => String(v).toLowerCase());
                return values.some((v) => v.includes(needle));
            });
        }

        if (statusBayarFilter === "Belum Bayar") {
            result = result.filter((row) => row.status_bayar === "Belum Bayar");
        } else if (statusBayarFilter === "Sudah Bayar") {
            result = result.filter((row) => row.status_bayar === "Sudah Bayar");
        }

        return result;
    }, [rows, search, statusBayarFilter]);

    return (
        <SidebarKasir title="Kasir Rawat Inap">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 px-4 sm:px-6 lg:px-12 xl:px-16 py-6 md:py-8"
            >
                <motion.div
                    variants={itemVariants}
                    className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg mb-6"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                                Kasir Rawat Inap
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 max-w-2xl">
                                Monitoring piutang dan penyelesaian pembayaran pasien rawat inap dengan status pulang "-".
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
                    {error && (
                        <motion.div
                            variants={itemVariants}
                            className="rounded-xl border border-red-200 bg-red-50 text-red-700 p-4 text-sm dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
                        >
                            {error}
                        </motion.div>
                    )}

                    {loading ? (
                        <motion.div
                            variants={itemVariants}
                            className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm text-sm text-gray-600 dark:text-gray-300"
                        >
                            Memuat data pasien rawat inap dengan status pulang "-"
                        </motion.div>
                    ) : (
                        <>
                            <motion.div
                                variants={itemVariants}
                                className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-4"
                            >
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                                <div className="relative p-4 sm:p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <motion.div
                                                className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                                                whileHover={{ rotate: 90, scale: 1.1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Filter className="w-4 h-4 text-white" />
                                            </motion.div>
                                            <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                                    Filter & Pencarian
                                                </span>
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                                                Cari Pasien / No. RM / No. Rawat
                                            </label>
                                            <div className="relative">
                                                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                                    <Search className="w-3 h-3" />
                                                </span>
                                                <input
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pl-8 pr-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/40"
                                                    placeholder="Ketik minimal 2 karakter"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                                                Status Bayar
                                            </label>
                                            <select
                                                value={statusBayarFilter}
                                                onChange={(e) => setStatusBayarFilter(e.target.value)}
                                                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/40"
                                            >
                                                <option value="Belum Bayar">Belum Bayar</option>
                                                <option value="Sudah Bayar">Sudah Bayar</option>
                                                <option value="Semua">Semua</option>
                                            </select>
                                        </div>
                                        <div className="flex items-end">
                                            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200/50 dark:border-blue-800/50">
                                                <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                    Pasien dirawat:{" "}
                                                    <span className="text-blue-600 dark:text-blue-400">
                                                        {filteredRows.length}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-800/60 shadow-xl shadow-blue-500/5"
                            >
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-xs sm:text-sm">
                                        <thead>
                                            <tr className="bg-gray-50/80 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-800">
                                                <th className="px-3 sm:px-4 py-3 text-left font-semibold uppercase tracking-wide text-[10px] sm:text-xs text-gray-600 dark:text-gray-300">
                                                    No. Rawat
                                                </th>
                                                <th className="px-3 sm:px-4 py-3 text-left font-semibold uppercase tracking-wide text-[10px] sm:text-xs text-gray-600 dark:text-gray-300">
                                                    Pasien
                                                </th>
                                                <th className="px-3 sm:px-4 py-3 text-left font-semibold uppercase tracking-wide text-[10px] sm:text-xs text-gray-600 dark:text-gray-300">
                                                    Ranjang
                                                </th>
                                                <th className="px-3 sm:px-4 py-3 text-left font-semibold uppercase tracking-wide text-[10px] sm:text-xs text-gray-600 dark:text-gray-300">
                                                    Penjamin
                                                </th>
                                                <th className="px-3 sm:px-4 py-3 text-left font-semibold uppercase tracking-wide text-[10px] sm:text-xs text-gray-600 dark:text-gray-300">
                                                    Status Bayar
                                                </th>
                                                <th className="px-3 sm:px-4 py-3 text-left font-semibold uppercase tracking-wide text-[10px] sm:text-xs text-gray-600 dark:text-gray-300">
                                                    Tgl Masuk
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                            {filteredRows.map((row) => {
                                                const totalDisplay =
                                                    typeof row.total === "number"
                                                        ? currency.format(row.total || 0)
                                                        : row.total;

                                                return (
                                                    <tr
                                                        key={row.no_rawat}
                                                        className="hover:bg-blue-50/60 dark:hover:bg-gray-800/80 transition-colors"
                                                    >
                                                        <td className="px-3 sm:px-4 py-3 align-top">
                                                            <div className="flex flex-col gap-0.5">
                                                                <span className="font-mono text-[11px] sm:text-xs font-semibold text-gray-900 dark:text-gray-100">
                                                                    {row.no_rawat}
                                                                </span>
                                                                <span className="text-[11px] text-gray-500 dark:text-gray-400">
                                                                    RM: {row.no_rkm_medis}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-3 sm:px-4 py-3 align-top">
                                                            <div className="flex flex-col gap-0.5">
                                                                {row.no_rawat ? (
                                                                    <motion.a
                                                                        href={`/akutansi/billing-ranap?no_rawat=${encodeURIComponent(
                                                                            row.no_rawat || ""
                                                                        )}`}
                                                                        className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                                                                        whileHover={{ scale: 1.02 }}
                                                                        whileTap={{ scale: 0.98 }}
                                                                    >
                                                                        {row.pasien}
                                                                    </motion.a>
                                                                ) : (
                                                                    <span className="font-semibold text-gray-900 dark:text-white">
                                                                        {row.pasien}
                                                                    </span>
                                                                )}
                                                                <span className="text-[11px] text-gray-500 dark:text-gray-400">
                                                                    Status: {row.status}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-3 sm:px-4 py-3 align-top">
                                                            <span className="text-sm text-gray-800 dark:text-gray-200">
                                                                {row.ranjang || "-"}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 sm:px-4 py-3 align-top">
                                                            <div className="flex flex-col gap-0.5">
                                                                <span className="text-sm text-gray-800 dark:text-gray-200">
                                                                    {row.penjamin}
                                                                </span>
                                                                <span className="text-[11px] text-blue-600 dark:text-blue-400">
                                                                    {totalDisplay}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-3 sm:px-4 py-3 align-top">
                                                            <span
                                                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                                                    row.status_bayar === "Sudah Bayar"
                                                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                                                                }`}
                                                            >
                                                                {row.status_bayar || "-"}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 sm:px-4 py-3 align-top">
                                                            <div className="flex flex-col gap-0.5 text-[11px] text-gray-700 dark:text-gray-300">
                                                                <span>{row.tgl_masuk}</span>
                                                                <span>{row.jam_masuk}</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            {filteredRows.length === 0 && (
                                                <tr>
                                                    <td
                                                        colSpan={6}
                                                        className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                                                    >
                                                        Tidak ada pasien rawat inap dengan status pulang "-" untuk filter saat ini.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        </>
                    )}
                </div>
            </motion.div>
        </SidebarKasir>
    );
}
