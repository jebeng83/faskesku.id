import React from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    RefreshCw,
    Calendar,
    Clock,
    User,
    Building2,
    CreditCard,
    FileText,
    Loader2,
    AlertCircle,
    Database,
} from "lucide-react";
import LayoutUtama from "@/Pages/LayoutUtama";
import SidebarKeuanganMenu from "@/Components/SidebarKeuanganMenu";
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
    const [page, setPage] = React.useState(1);
    const [perPage, setPerPage] = React.useState(25);

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

    React.useEffect(() => {
        setPage(1);
    }, [startDate, endDate, caripenjab, crPoli, crPtg, status, statusBayar, q, order]);

    const resetFilters = React.useCallback(() => {
        const today = todayDateString();
        setStartDate(today);
        setEndDate(today);
        setCariPenjab("");
        setCrPoli("");
        setCrPtg("");
        setStatus("Semua");
        setStatusBayar("Semua");
        setQ("");
        setOrder("terbaru");
        setPage(1);
    }, []);

    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
    const safePage = Math.min(page, totalPages);
    const pagedRows = React.useMemo(() => {
        const start = (safePage - 1) * perPage;
        return filtered.slice(start, start + perPage);
    }, [filtered, safePage, perPage]);
    const from = totalItems === 0 ? 0 : (safePage - 1) * perPage + 1;
    const to = Math.min(safePage * perPage, totalItems);
    const pageItems = React.useMemo(() => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        const items = [];
        const addUnique = (val) => {
            if (!items.includes(val)) items.push(val);
        };
        addUnique(1);
        const start = Math.max(2, safePage - 1);
        const end = Math.min(totalPages - 1, safePage + 1);
        if (start > 2) items.push("...");
        for (let i = start; i <= end; i += 1) addUnique(i);
        if (end < totalPages - 1) items.push("...");
        addUnique(totalPages);
        return items;
    }, [safePage, totalPages]);

    React.useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages);
        }
    }, [page, totalPages]);

    const stats = React.useMemo(() => {
        const sudahBayar = filtered.filter((r) => r?.status_bayar === "Sudah Bayar").length;
        const belumBayar = filtered.filter((r) => r?.status_bayar === "Belum Bayar").length;
        const batal = filtered.filter((r) => r?.stts === "Batal").length;
        return {
            total: filtered.length,
            sudahBayar,
            belumBayar,
            batal,
        };
    }, [filtered]);

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
    const hasActiveFilters =
        startDate !== defaults.start ||
        endDate !== defaults.end ||
        status !== "Semua" ||
        statusBayar !== "Semua" ||
        q.trim() !== "" ||
        caripenjab.trim() !== "" ||
        crPoli.trim() !== "" ||
        crPtg.trim() !== "" ||
        order !== "terbaru";

    return (
        <LayoutUtama title="Keuangan" left={<SidebarKeuanganMenu title="Keuangan" />}>
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 px-4 sm:px-6 lg:px-12 xl:px-16 py-6 md:py-8"
        >
            <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header Compact dengan Gradien */}
            <motion.div
                variants={itemVariants}
                className="relative px-6 py-5 border border-gray-200/60 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-2xl"
            >
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                    <div className="space-y-1">
                        <motion.h1
                            className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Kasir Rawat Jalan
                        </motion.h1>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                            Ringkasan kunjungan, status bayar, dan akses billing dalam satu layar.
                        </p>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Maksimal rentang 14 hari
                    </div>
                </div>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
            >
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col gap-4">
                        <motion.div
                            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <motion.div
                                className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-black p-1 rounded-sm border border-white/10"
                                whileHover={{ scale: 1.02, y: -2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Database className="w-3 h-3 text-white/80" />
                                        <p className="text-xs font-medium text-white/80">Total</p>
                                    </div>
                                    <p className="text-sm font-bold text-white">{stats.total}</p>
                                </div>
                            </motion.div>
                            <motion.div
                                className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-black p-1 rounded-sm border border-white/10"
                                whileHover={{ scale: 1.02, y: -2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <CreditCard className="w-3 h-3 text-white/80" />
                                        <p className="text-xs font-medium text-white/80">Sudah Bayar</p>
                                    </div>
                                    <p className="text-sm font-bold text-white">{stats.sudahBayar}</p>
                                </div>
                            </motion.div>
                            <motion.div
                                className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-black p-1 rounded-sm border border-white/10"
                                whileHover={{ scale: 1.02, y: -2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3 text-white/80" />
                                        <p className="text-xs font-medium text-white/80">Belum Bayar</p>
                                    </div>
                                    <p className="text-sm font-bold text-white">{stats.belumBayar}</p>
                                </div>
                            </motion.div>
                            <motion.div
                                className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-black p-1 rounded-sm border border-white/10"
                                whileHover={{ scale: 1.02, y: -2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <FileText className="w-3 h-3 text-white/80" />
                                        <p className="text-xs font-medium text-white/80">Batal</p>
                                    </div>
                                    <p className="text-sm font-bold text-white">{stats.batal}</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full">
                            <div className="relative shrink-0">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                                <input
                                    type="text"
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Cari pasien..."
                                    className="pl-6 pr-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white w-32"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={loadData}
                                disabled={loading}
                                className="p-1 rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                                aria-label="Reload data kasir"
                            >
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <RefreshCw className="w-4 h-4" />
                                )}
                            </button>
                            <div className="flex items-center gap-2 shrink-0">
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                />
                                <span className="text-xs text-gray-500">s/d</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                />
                            </div>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white shrink-0"
                            >
                                {statusOptions.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={statusBayar}
                                onChange={(e) => setStatusBayar(e.target.value)}
                                className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white shrink-0"
                            >
                                {statusBayarOptions.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                value={caripenjab}
                                onChange={(e) => setCariPenjab(e.target.value)}
                                placeholder="Penjamin..."
                                className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white shrink-0 w-28"
                            />
                            <input
                                type="text"
                                value={crPoli}
                                onChange={(e) => setCrPoli(e.target.value)}
                                placeholder="Poli..."
                                className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white shrink-0 w-28"
                            />
                            <input
                                type="text"
                                value={crPtg}
                                onChange={(e) => setCrPtg(e.target.value)}
                                placeholder="Dokter..."
                                className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white shrink-0 w-28"
                            />
                            <select
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
                                className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white shrink-0"
                            >
                                <option value="terbaru">Terbaru</option>
                                <option value="terlama">Terlama</option>
                            </select>
                            {hasActiveFilters && (
                                <button
                                    onClick={resetFilters}
                                    className="ml-2 px-2 py-1 text-xs text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors shrink-0"
                                    title="Reset filters"
                                >
                                    ✕
                                </button>
                            )}
                            <div className="text-[11px] text-gray-500 dark:text-gray-400 shrink-0">
                                Maksimal rentang 14 hari
                            </div>
                        </div>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 rounded-lg bg-gradient-to-r from-red-50/50 to-rose-50/50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-200/50 dark:border-red-800/50 flex items-center gap-2"
                            >
                                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                                <span className="text-xs font-semibold text-red-700 dark:text-red-300">
                                    {error}
                                </span>
                            </motion.div>
                        )}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Aksi
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Nama Pasien
                                    </div>
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="w-4 h-4" />
                                        Penjamin
                                    </div>
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    No. RM
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        No. Rawat
                                    </div>
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Alamat
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="w-4 h-4" />
                                        Poliklinik
                                    </div>
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Nama Dokter
                                    </div>
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Status Periksa
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Tanggal
                                    </div>
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        Jam
                                    </div>
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Status Bayar
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    No. Tlp
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={13}
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
                                    {pagedRows.map((r, index) => {
                                        const statusBadgeClass =
                                            r?.status_bayar === "Sudah Bayar"
                                                ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 ring-1 ring-green-200 dark:ring-green-800"
                                                : "bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-700 dark:text-yellow-300 ring-1 ring-yellow-200 dark:ring-yellow-800";

                                        return (
                                            <motion.tr
                                                key={r.no_rawat}
                                                className="group transition-all duration-200 hover:bg-blue-50/50 dark:hover:bg-gray-800/60"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{
                                                    delay: index * 0.02,
                                                }}
                                                whileHover={{ scale: 1.01 }}
                                            >
                                                <td className="px-4 py-2 whitespace-nowrap">
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
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <div className="flex flex-col">
                                                        <span className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors duration-200">
                                                            {r?.pasien?.nm_pasien || "-"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                    {(() => {
                                                        const penjamin = r?.penjab?.png_jawab || r?.kd_pj || "-";
                                                        const isBpjs = penjamin && String(penjamin).toUpperCase().includes("BPJS");
                                                        return (
                                                            <div className="flex flex-col gap-1">
                                                                <div
                                                                    className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium border ${
                                                                        isBpjs
                                                                            ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700"
                                                                            : "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700"
                                                                    }`}
                                                                >
                                                                    {penjamin}
                                                                </div>
                                                            </div>
                                                        );
                                                    })()}
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <span className="font-mono text-xs text-gray-700 dark:text-gray-300">
                                                        {r?.no_rkm_medis || "-"}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <div className="flex flex-col">
                                                        <motion.button
                                                            onClick={() => {
                                                                try {
                                                                    const url = route("rawat-jalan.canvas", {
                                                                        no_rawat: r?.no_rawat,
                                                                        no_rkm_medis: r?.no_rkm_medis,
                                                                        kd_poli: r?.kd_poli,
                                                                    });
                                                                    router.visit(url);
                                                                } catch {
                                                                    const params = new URLSearchParams({
                                                                        no_rawat: r?.no_rawat || "",
                                                                        no_rkm_medis: r?.no_rkm_medis || "",
                                                                        kd_poli: r?.kd_poli || "",
                                                                    }).toString();
                                                                    router.visit(`/rawat-jalan/canvas?${params}`);
                                                                }
                                                            }}
                                                            className="font-mono text-xs font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                        >
                                                            {r?.no_rawat || "-"}
                                                        </motion.button>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                    <span className="block truncate" title={r?.almt_pj || "-"}>
                                                        {r?.almt_pj || "-"}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                    {r?.poliklinik?.nm_poli || "-"}
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                    <div className="flex flex-col">
                                                        <span>{r?.dokter?.nm_dokter || "-"}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <motion.span
                                                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${statusBadgeClass}`}
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                    >
                                                        {r?.stts || "-"}
                                                    </motion.span>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                        <Calendar className="w-4 h-4 text-blue-500" />
                                                        {formatShortDateId(r?.tgl_registrasi)}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                        <Clock className="w-4 h-4 text-green-500" />
                                                        {String(r?.jam_reg || "").slice(0, 5) || "-"}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
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
                                                <td className="px-4 py-2 whitespace-nowrap">
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
                                            </motion.tr>
                                        );
                                    })}
                                </AnimatePresence>
                            )}
                            {!loading && pagedRows.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={13}
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
                {totalItems > 0 && (
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                        <div className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${loading ? "opacity-70" : ""}`}>
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span>Menampilkan</span>
                                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                                        {from}-{to}
                                    </span>
                                    <span>dari</span>
                                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                                        {totalItems}
                                    </span>
                                    <span>data</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span>Tampilkan:</span>
                                    <select
                                        value={perPage}
                                        onChange={(e) => {
                                            setPerPage(Number(e.target.value));
                                            setPage(1);
                                        }}
                                        className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                    >
                                        {[25, 50, 75, 100].map((size) => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                                    className={`px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                                        safePage === 1
                                            ? "bg-white text-gray-400 dark:bg-gray-800 dark:text-gray-500 border border-gray-200 dark:border-gray-600 cursor-not-allowed"
                                            : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600"
                                    }`}
                                    disabled={safePage === 1}
                                >
                                    ‹
                                </button>
                                {pageItems.map((item, index) =>
                                    item === "..." ? (
                                        <span
                                            key={`ellipsis-${index}`}
                                            className="px-3 py-2 text-sm rounded-lg font-medium text-gray-500 dark:text-gray-400"
                                        >
                                            …
                                        </span>
                                    ) : (
                                        <button
                                            key={`page-${item}`}
                                            type="button"
                                            onClick={() => setPage(item)}
                                            className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                                                safePage === item
                                                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105"
                                                    : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600"
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    )
                                )}
                                <button
                                    type="button"
                                    onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                                    className={`px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                                        safePage === totalPages
                                            ? "bg-white text-gray-400 dark:bg-gray-800 dark:text-gray-500 border border-gray-200 dark:border-gray-600 cursor-not-allowed"
                                            : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600"
                                    }`}
                                    disabled={safePage === totalPages}
                                >
                                    ›
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
            </div>
        </motion.div>
        </LayoutUtama>
    );
}

 
