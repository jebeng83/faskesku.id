import React from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Filter,
    RefreshCw,
    Calendar,
    User,
    Building2,
    CreditCard,
    FileText,
    Loader2,
    AlertCircle,
    Database,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import { todayDateString, getAppTimeZone } from "@/tools/datetime";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};


const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
});

const formatShortDateId = (date) => {
    if (!date) return "-";
    try {
        const tz = getAppTimeZone();
        const d = new Date(date);
        if (isNaN(d.getTime())) return "-";
        return d.toLocaleDateString("id-ID", {
            timeZone: tz,
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    } catch {
        return "-";
    }
};

function Field({ label, children, icon: Icon }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {label}
            </label>
            {children}
        </div>
    );
}

function useDateRangeDefaults() {
    const today = todayDateString();
    return { start: today, end: today };
}

export default function KasirRalanPage() {
    const defaults = useDateRangeDefaults();
    const [startDate, setStartDate] = React.useState(defaults.start);
    const [endDate, setEndDate] = React.useState(defaults.end);
    const [caripenjab, setCariPenjab] = React.useState(""); // filter penjamin (png_jawab)
    const [crPoli, setCrPoli] = React.useState(""); // filter nama poliklinik
    const [crPtg, setCrPtg] = React.useState(""); // filter nama dokter/petugas
    const [status, setStatus] = React.useState("Semua");
    const [statusBayar, setStatusBayar] = React.useState("Semua");
    const [q, setQ] = React.useState("");
    const [order, setOrder] = React.useState("terbaru"); // terbaru | terlama
    const [filtersCollapsed, setFiltersCollapsed] = React.useState(true);

    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    // Buat daftar tanggal di antara startDate dan endDate (inklusif)
    // Menggunakan timezone aplikasi (Asia/Jakarta) untuk konsistensi
    const makeDateList = React.useCallback((start, end) => {
        const tz = getAppTimeZone();
        const s = new Date(start + "T00:00:00"); // Parse sebagai tanggal lokal
        const e = new Date(end + "T23:59:59"); // Parse sebagai tanggal lokal
        const days = [];
        const cur = new Date(s);

        while (cur <= e) {
            try {
                // Format tanggal dengan timezone aplikasi
                const dateStr = cur.toLocaleDateString("en-CA", {
                    timeZone: tz,
                });
                days.push(dateStr);
            } catch {
                // Fallback ke ISO jika parsing gagal
                days.push(cur.toISOString().slice(0, 10));
            }
            cur.setDate(cur.getDate() + 1);
        }
        return days;
    }, []);

    const loadData = React.useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const days = makeDateList(startDate, endDate);
            // Batasi maksimal 14 hari agar tidak terlalu berat
            if (days.length > 14) {
                throw new Error(
                    "Rentang tanggal terlalu panjang. Maksimal 14 hari."
                );
            }

            const requests = days.map((date) =>
                axios.get("/registration/get-registrations", {
                    params: {
                        date,
                        // gunakan sebagian filter server-side agar respons lebih ringan
                        kd_poli: crPoli ? undefined : undefined, // server tidak mendukung nama poli, hanya kode
                        kd_dokter: crPtg ? undefined : undefined, // server tidak mendukung nama dokter, hanya kode
                        status: status !== "Semua" ? status : undefined,
                        status_poli: undefined,
                        search: q || undefined,
                        per_page: 100,
                        // Tambahkan timestamp untuk cache-busting dan memastikan data selalu fresh
                        _t: Date.now(),
                    },
                    // Pastikan tidak menggunakan cache
                    headers: {
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                    },
                })
            );

            const responses = await Promise.all(requests);
            // Flatten semua item dari pagination: response.data.data.data
            const items = responses.flatMap((res) => {
                const payload = res?.data?.data;
                if (!payload) return [];
                return Array.isArray(payload?.data) ? payload.data : [];
            });

            // Debug: Log sample data untuk memastikan field stts ada
            if (items.length > 0) {
                console.warn("KasirRalan: Sample data dari API:", {
                    sample: items[0],
                    total_items: items.length,
                    sample_stts: items[0]?.stts,
                    sample_status_bayar: items[0]?.status_bayar,
                });
            }

            // Filter client-side: hanya Ralan
            const ralanOnly = items.filter(
                (it) => (it?.status_lanjut || it?.status_lanjut) === "Ralan"
            );

            // Debug: Log setelah filter Ralan
            if (ralanOnly.length > 0) {
                console.warn("KasirRalan: Setelah filter Ralan:", {
                    total_ralan: ralanOnly.length,
                    sample_ralan: ralanOnly[0],
                    sample_ralan_stts: ralanOnly[0]?.stts,
                });
            }

            setRows(ralanOnly);
        } catch (e) {
            setError(e?.message || "Gagal memuat data");
        } finally {
            setLoading(false);
        }
    }, [makeDateList, startDate, endDate, crPoli, crPtg, status, q]);

    React.useEffect(() => {
        // Load data saat filter berubah atau saat komponen mount
        loadData();
    }, [loadData]);

    // Terapkan filter tambahan di sisi klien (nama poli, dokter, penjamin, status bayar, dll.)
    const filtered = React.useMemo(() => {
        let data = [...rows];

        // Penjamin (png_jawab)
        if (caripenjab.trim() !== "") {
            const needle = caripenjab.toLowerCase();
            data = data.filter(
                (r) =>
                    (r?.penjab?.png_jawab || "")
                        .toLowerCase()
                        .includes(needle) ||
                    (r?.kd_pj || "").toLowerCase().includes(needle)
            );
        }

        // Nama Poli
        if (crPoli.trim() !== "") {
            const needle = crPoli.toLowerCase();
            data = data.filter(
                (r) =>
                    (r?.poliklinik?.nm_poli || "")
                        .toLowerCase()
                        .includes(needle) ||
                    (r?.kd_poli || "").toLowerCase().includes(needle)
            );
        }

        // Nama Dokter
        if (crPtg.trim() !== "") {
            const needle = crPtg.toLowerCase();
            data = data.filter(
                (r) =>
                    (r?.dokter?.nm_dokter || "")
                        .toLowerCase()
                        .includes(needle) ||
                    (r?.kd_dokter || "").toLowerCase().includes(needle)
            );
        }

        // Status (reg_periksa.stts)
        if (status !== "Semua") {
            const beforeFilter = data.length;
            data = data.filter((r) => {
                const rStts = r?.stts || "";
                const matches = rStts === status;
                // Debug: Log jika ada data dengan stts yang tidak sesuai filter
                if (!matches && rStts) {
                    console.warn("KasirRalan: Item tidak sesuai filter status", {
                        no_rawat: r?.no_rawat,
                        stts: rStts,
                        filter_status: status,
                    });
                }
                return matches;
            });
            console.warn(
                `KasirRalan: Filter status "${status}": ${beforeFilter} -> ${data.length} items`
            );
        }

        // Status Bayar
        if (statusBayar !== "Semua") {
            data = data.filter((r) => (r?.status_bayar || "") === statusBayar);
        }

        // TCari: cari di banyak kolom
        if (q.trim() !== "") {
            const needle = q.toLowerCase();
            data = data.filter((r) => {
                const fields = [
                    r?.no_reg,
                    r?.no_rawat,
                    r?.tgl_registrasi,
                    r?.jam_reg,
                    r?.kd_dokter,
                    r?.dokter?.nm_dokter,
                    r?.no_rkm_medis,
                    r?.pasien?.nm_pasien,
                    r?.poliklinik?.nm_poli,
                    r?.p_jawab,
                    r?.almt_pj,
                    r?.hubunganpj,
                    r?.penjab?.png_jawab,
                    r?.status_bayar,
                    r?.status_poli,
                ];
                return fields.some((f) =>
                    String(f || "")
                        .toLowerCase()
                        .includes(needle)
                );
            });
        }

        // Urutkan
        data.sort((a, b) => {
            const da = `${a?.tgl_registrasi || ""} ${a?.jam_reg || ""}`;
            const db = `${b?.tgl_registrasi || ""} ${b?.jam_reg || ""}`;
            if (order === "terbaru") return db.localeCompare(da);
            return da.localeCompare(db);
        });

        return data;
    }, [rows, caripenjab, crPoli, crPtg, status, statusBayar, q, order]);

    const LCount = filtered.length;

    const statusOptions = [
        "Semua",
        "Belum",
        "Sudah",
        "Batal",
        "Berkas Diterima",
        "Dirujuk",
        "Meninggal",
        "Dirawat",
        "Pulang Paksa",
    ];

    const statusBayarOptions = ["Semua", "Sudah Bayar", "Belum Bayar"];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 px-4 sm:px-6 lg:px-12 xl:px-16 py-6 md:py-8"
        >
            {/* Page Header Compact dengan Gradien */}
            <motion.div
                variants={itemVariants}
                className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg mb-6"
            >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <motion.h1
                            className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Kasir Rawat Jalan
                        </motion.h1>
                    </div>
                </div>
            </motion.div>

            {/* Filter Card dengan Top Border Gradient */}
            <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 mb-6"
            >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                <div className="relative p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <motion.div
                                className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                                whileHover={{ rotate: 90, scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Filter className="w-5 h-5 text-white" />
                            </motion.div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Filter & Pencarian
                                </span>
                            </h2>
                        </div>
                        <motion.button
                            type="button"
                            onClick={() => setFiltersCollapsed((v) => !v)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300/60 dark:border-gray-600/60 bg-white/80 dark:bg-gray-700/80 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {filtersCollapsed ? (
                                <ChevronDown className="w-4 h-4" />
                            ) : (
                                <ChevronUp className="w-4 h-4" />
                            )}
                            {filtersCollapsed ? "Tampilkan" : "Sembunyikan"}
                        </motion.button>
                    </div>

                    {!filtersCollapsed && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                <Field label="Tanggal Awal" icon={Calendar}>
                                    <input
                                        type="date"
                                        className="w-full rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                                        value={startDate}
                                        onChange={(e) =>
                                            setStartDate(e.target.value)
                                        }
                                    />
                                </Field>
                                <Field label="Tanggal Akhir" icon={Calendar}>
                                    <input
                                        type="date"
                                        className="w-full rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                                        value={endDate}
                                        onChange={(e) =>
                                            setEndDate(e.target.value)
                                        }
                                    />
                                </Field>
                                <Field
                                    label="Pencarian (No Rawat/RM/Nama)"
                                    icon={Search}
                                >
                                    <input
                                        placeholder="Cari…"
                                        className="w-full rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                                        value={q}
                                        onChange={(e) => setQ(e.target.value)}
                                    />
                                </Field>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mt-4 md:mt-6">
                                <Field
                                    label="Filter Penjamin"
                                    icon={CreditCard}
                                >
                                    <input
                                        placeholder="Nama penjamin / kode"
                                        className="w-full rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                                        value={caripenjab}
                                        onChange={(e) =>
                                            setCariPenjab(e.target.value)
                                        }
                                    />
                                </Field>
                                <Field label="Filter Poli" icon={Building2}>
                                    <input
                                        placeholder="Nama/Kode poli"
                                        className="w-full rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                                        value={crPoli}
                                        onChange={(e) =>
                                            setCrPoli(e.target.value)
                                        }
                                    />
                                </Field>
                                <Field
                                    label="Filter Dokter/Petugas"
                                    icon={User}
                                >
                                    <input
                                        placeholder="Nama/Kode dokter"
                                        className="w-full rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                                        value={crPtg}
                                        onChange={(e) =>
                                            setCrPtg(e.target.value)
                                        }
                                    />
                                </Field>
                                <Field label="Urutan">
                                    <select
                                        className="w-full rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                                        value={order}
                                        onChange={(e) =>
                                            setOrder(e.target.value)
                                        }
                                    >
                                        <option value="terbaru">Terbaru</option>
                                        <option value="terlama">Terlama</option>
                                    </select>
                                </Field>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
                                <Field
                                    label="Status Registrasi"
                                    icon={FileText}
                                >
                                    <select
                                        className="w-full rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    >
                                        {statusOptions.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </Field>
                                <Field label="Status Bayar" icon={CreditCard}>
                                    <select
                                        className="w-full rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                                        value={statusBayar}
                                        onChange={(e) =>
                                            setStatusBayar(e.target.value)
                                        }
                                    >
                                        {statusBayarOptions.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </Field>
                                <div className="flex items-end">
                                    <motion.button
                                        onClick={loadData}
                                        disabled={loading}
                                        className="flex items-center justify-center gap-2 w-full px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        whileHover={{
                                            scale: loading ? 1 : 1.02,
                                        }}
                                        whileTap={{ scale: loading ? 1 : 0.98 }}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Memuat…
                                            </>
                                        ) : (
                                            <>
                                                <RefreshCw className="w-4 h-4" />
                                                Muat Data
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-4 rounded-lg bg-gradient-to-r from-red-50/50 to-rose-50/50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-200/50 dark:border-red-800/50 flex items-center gap-2"
                                >
                                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                    <span className="text-sm font-semibold text-red-700 dark:text-red-300">
                                        {error}
                                    </span>
                                </motion.div>
                            )}
                        </>
                    )}
                </div>
            </motion.div>

            {/* Summary & Table Container */}
            <motion.div
                variants={itemVariants}
                className="flex items-center justify-between mb-4"
            >
                <motion.div
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200/50 dark:border-blue-800/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Total data:{" "}
                        <span className="text-blue-600 dark:text-blue-400">
                            {LCount}
                        </span>
                    </span>
                </motion.div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Maksimal rentang 14 hari
                </div>
            </motion.div>

            {/* Table dengan Glassmorphism */}
            <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
            >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Kode Dokter
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    No. RM
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Poliklinik
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Penanggung Jawab
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Penjamin
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    No. Rawat
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Tgl
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Jam
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Status Bayar
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    No. Tlp
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={12}
                                        className="px-4 py-12 text-center"
                                    >
                                        <motion.div
                                            className="flex flex-col items-center justify-center gap-3"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Memuat data...
                                            </span>
                                        </motion.div>
                                    </td>
                                </tr>
                            ) : (
                                <AnimatePresence>
                                    {filtered.map((r, index) => {
                                        const statusBadgeClass =
                                            r?.status_bayar === "Sudah Bayar"
                                                ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 ring-1 ring-green-200 dark:ring-green-800"
                                                : "bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-700 dark:text-yellow-300 ring-1 ring-yellow-200 dark:ring-yellow-800";

                                        return (
                                            <motion.tr
                                                key={r.no_rawat}
                                                className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200 group"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{
                                                    delay: index * 0.02,
                                                }}
                                                whileHover={{ scale: 1.01 }}
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col">
                                                        <span className="font-mono text-xs font-semibold text-gray-900 dark:text-gray-100">
                                                            {r?.kd_dokter ||
                                                                "-"}
                                                        </span>
                                                        <span className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                                            {r?.dokter
                                                                ?.nm_dokter ||
                                                                "-"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col">
                                                        <span className="font-mono text-xs font-semibold text-gray-900 dark:text-gray-100">
                                                            {r?.no_rkm_medis ||
                                                                "-"}
                                                        </span>
                                                        <span className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                                            {r?.pasien
                                                                ?.nm_pasien ||
                                                                "-"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                    {r?.poliklinik?.nm_poli ||
                                                        "-"}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col">
                                                        <span className="text-gray-900 dark:text-gray-100">
                                                            {r?.p_jawab || "-"}
                                                        </span>
                                                        <span className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                                            {r?.almt_pj || "-"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col">
                                                        <span className="text-gray-900 dark:text-gray-100">
                                                            {r?.penjab
                                                                ?.png_jawab ||
                                                                r?.kd_pj ||
                                                                "-"}
                                                        </span>
                                                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                                                            {currency.format(
                                                                Number(
                                                                    r?.biaya_reg ||
                                                                        0
                                                                )
                                                            )}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <motion.span
                                                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${statusBadgeClass}`}
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                    >
                                                        {r?.stts || "-"}
                                                    </motion.span>
                                                </td>
                                                <td className="px-4 py-3 font-medium">
                                                    <div className="flex flex-col">
                                                        <span className="font-mono text-xs text-gray-900 dark:text-gray-100">
                                                            {formatShortDateId(r?.tgl_registrasi)}{" "}
                                                            {String(r?.jam_reg || "").slice(0, 5)}
                                                        </span>
                                                        <motion.button
                                                            onClick={() => {
                                                                try {
                                                                    const url = route('rawat-jalan.canvas', {
                                                                        no_rawat: r?.no_rawat,
                                                                        no_rkm_medis: r?.no_rkm_medis,
                                                                        kd_poli: r?.kd_poli
                                                                    });
                                                                    router.visit(url);
                                                                } catch {
                                                                    const params = new URLSearchParams({
                                                                        no_rawat: r?.no_rawat || '',
                                                                        no_rkm_medis: r?.no_rkm_medis || '',
                                                                        kd_poli: r?.kd_poli || ''
                                                                    }).toString();
                                                                    router.visit(`/rawat-jalan/canvas?${params}`);
                                                                }
                                                            }}
                                                            className="font-mono text-xs font-bold text-gray-900 dark:text-gray-100 mt-0.5 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                        >
                                                            {r?.no_rawat || "-"}
                                                        </motion.button>
                                                        <span className="text-[11px] truncate text-gray-900 dark:text-white mt-0.5">
                                                            {r?.dokter?.nm_dokter ? `dr. ${r.dokter.nm_dokter}` : "-"}
                                                        </span>
                                                        <span className="text-xs text-gray-600 dark:text-gray-400 font-normal mt-0.5">
                                                            {r?.no_reg || "-"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                    {r?.tgl_registrasi || "-"}
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                    {r?.jam_reg || "-"}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col">
                                                        <motion.span
                                                            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold w-fit ${statusBadgeClass}`}
                                                            whileHover={{
                                                                scale: 1.05,
                                                            }}
                                                        >
                                                            {r?.status_bayar ||
                                                                "-"}
                                                        </motion.span>
                                                        <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                            {r?.status_poli ||
                                                                "-"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col">
                                                        <span className="text-gray-900 dark:text-gray-100">
                                                            {r?.pasien
                                                                ?.no_tlp || "-"}
                                                        </span>
                                                        <span className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                                            {r?.keputusan ||
                                                                "-"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex gap-2">
                                                        <motion.a
                                                            href={`/akutansi/billing?no_rawat=${encodeURIComponent(
                                                                r.no_rawat || ""
                                                            )}`}
                                                            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 text-white text-xs font-semibold shadow-md shadow-slate-500/25 hover:shadow-lg hover:shadow-slate-500/30 transition-all duration-200"
                                                            whileHover={{
                                                                scale: 1.05,
                                                            }}
                                                            whileTap={{
                                                                scale: 0.95,
                                                            }}
                                                        >
                                                            Billing
                                                        </motion.a>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </AnimatePresence>
                            )}
                            {!loading && filtered.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={12}
                                        className="px-4 py-12 text-center"
                                    >
                                        <motion.div
                                            className="flex flex-col items-center justify-center gap-3"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <Database className="w-12 h-12 text-gray-400" />
                                            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                Tidak ada data untuk filter saat
                                                ini.
                                            </span>
                                        </motion.div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
}

KasirRalanPage.layout = (page) => (
    <SidebarKeuangan title="Keuangan">{page}</SidebarKeuangan>
);
