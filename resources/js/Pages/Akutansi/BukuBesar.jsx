import React, { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    Calendar,
    Search,
    Filter,
    RefreshCcw,
    Info,
    Loader2,
} from "lucide-react";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/Components/ui/Table";

/**
 * Buku Besar (General Ledger) – Inertia React Page
 * Mengacu pada logika KeuanganBubes.java:
 * - Pilih Akun (kd_rek)
 * - Pilih Tahun, opsi Bulan dan Tanggal
 * - Hitung saldo awal periode dari rekeningtahun + akumulasi transaksi sebelumnya
 * - Tampilkan baris jurnal (tgl, no_jurnal, no_bukti, keterangan, debet, kredit) dengan saldo berjalan
 * UI mengikuti pedoman di docs/UI_UX_IMPROVEMENTS_GUIDE.md (aksesibilitas, responsif, feedback loading & error, validasi jelas).
 */

const monthOptions = [
    { value: "", label: "Sepanjang Tahun" },
    { value: "01", label: "Januari" },
    { value: "02", label: "Februari" },
    { value: "03", label: "Maret" },
    { value: "04", label: "April" },
    { value: "05", label: "Mei" },
    { value: "06", label: "Juni" },
    { value: "07", label: "Juli" },
    { value: "08", label: "Agustus" },
    { value: "09", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
];

function formatNumber(n) {
    try {
        return new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n || 0);
    } catch (_e) {
        return (n || 0).toFixed(2);
    }
}

function yearNow() {
    return new Date().getFullYear().toString();
}

export default function BukuBesarPage() {
    const [rekeningList, setRekeningList] = useState([]);
    const [rekeningQuery, setRekeningQuery] = useState("");
    const [kdRek, setKdRek] = useState("");
    const [nmRek, setNmRek] = useState("");
    const [year, setYear] = useState(yearNow());
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [rows, setRows] = useState([]);
    const [meta, setMeta] = useState(null);
    const [totals, setTotals] = useState(null);

    // Fetch rekening list (typeahead basic)
    useEffect(() => {
        let alive = true;
        const fetchAccounts = async () => {
            try {
                const q = rekeningQuery.trim();
                const resp = await axios.get("/api/akutansi/rekening", {
                    params: { per_page: 50, q },
                });
                if (!alive) return;
                setRekeningList(resp.data?.data || []);
            } catch (_e) {
                /* ignore */
            }
        };
        fetchAccounts();
        return () => {
            alive = false;
        };
    }, [rekeningQuery]);

    const canSearch = useMemo(() => kdRek && year, [kdRek, year]);

    const searchLedger = async () => {
        setError("");
        if (!canSearch) {
            setError("Pilih Rekening dan Tahun terlebih dahulu");
            return;
        }
        setLoading(true);
        try {
            const params = { kd_rek: kdRek, year };
            if (month) params.month = month;
            if (month && day) params.day = day.padStart(2, "0");
            const resp = await axios.get("/api/akutansi/buku-besar", {
                params,
            });
            setRows(resp.data?.rows || []);
            setMeta(resp.data?.meta || null);
            setTotals(resp.data?.totals || null);
        } catch (_e) {
            const msg =
                _e?.response?.data?.message ||
                _e?.message ||
                "Gagal memuat Buku Besar";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const onSelectRekening = (rek) => {
        setKdRek(rek.kd_rek);
        setNmRek(rek.nm_rek);
    };

    const resetFilters = () => {
        setMonth("");
        setDay("");
    };

    return (
        <div className="min-h-[calc(100vh-64px)] p-4 md:p-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
            <Head title="Akutansi • Buku Besar" />

            {/* Container variants for staggered entrance */}
            {(() => {
                const containerVariants = {
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.08,
                            delayChildren: 0.1,
                        },
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

                return (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        {/* Header */}
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-6 md:p-8"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
                            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.2,
                                        }}
                                    >
                                        <BookOpen
                                            className="w-6 h-6 text-white"
                                            aria-hidden="true"
                                        />
                                    </motion.div>
                                    <div>
                                        <motion.h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                            Buku Besar (General Ledger)
                                        </motion.h1>
                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                            <Info className="w-4 h-4" />
                                            Lihat transaksi per akun dengan
                                            saldo berjalan. Sumber saldo awal:
                                            rekeningtahun.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-gray-700/90 border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm">
                                        <Calendar className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm font-mono">
                                            {year}
                                            {month ? `-${month}` : ""}
                                            {month && day
                                                ? `-${day.padStart(2, "0")}`
                                                : ""}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Filter Card */}
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                        Cari & Pilih Rekening
                                    </label>
                                    <div className="relative">
                                        <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md pl-9 pr-3 py-2 bg-white/90 dark:bg-gray-800/90 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                            placeholder="Cari kode/nama akun..."
                                            value={rekeningQuery}
                                            onChange={(e) =>
                                                setRekeningQuery(e.target.value)
                                            }
                                            aria-label="Cari akun berdasarkan kode atau nama"
                                        />
                                    </div>
                                    <div className="mt-3 max-h-48 overflow-auto rounded-lg border border-gray-200/60 dark:border-gray-700/60 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                                        <AnimatePresence>
                                            {rekeningList.map((rek, idx) => (
                                                <motion.button
                                                    key={rek.kd_rek}
                                                    className={`w-full text-left px-3 py-2 transition-all duration-200 ${
                                                        rek.kd_rek === kdRek
                                                            ? "bg-gradient-to-r from-blue-50/70 to-indigo-50/70 dark:from-gray-700/50 dark:to-gray-700/50"
                                                            : "hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-700/50"
                                                    }`}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    transition={{
                                                        delay: idx * 0.02,
                                                    }}
                                                    onClick={() =>
                                                        onSelectRekening(rek)
                                                    }
                                                    aria-label={`Pilih akun ${rek.kd_rek} ${rek.nm_rek}`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-mono text-xs sm:text-sm">
                                                            {rek.kd_rek}
                                                        </span>
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800 font-mono text-[11px] font-bold">
                                                            {rek.balance}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-gray-700 dark:text-gray-200">
                                                        {rek.nm_rek}
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </AnimatePresence>
                                        {rekeningList.length === 0 && (
                                            <div className="p-3 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                                <Info className="w-4 h-4" />
                                                Tidak ada hasil. Ketik kata
                                                kunci untuk mencari.
                                            </div>
                                        )}
                                    </div>
                                    {kdRek && (
                                        <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                                            Dipilih:{" "}
                                            <span className="font-mono">
                                                {kdRek}
                                            </span>{" "}
                                            — {nmRek}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                        Tahun
                                    </label>
                                    <input
                                        type="text"
                                        value={year}
                                        onChange={(e) =>
                                            setYear(e.target.value)
                                        }
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white/90 dark:bg-gray-800/90 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                        placeholder="YYYY"
                                        aria-label="Tahun"
                                    />

                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-4 mb-2 block">
                                        Bulan (opsional)
                                    </label>
                                    <div className="relative">
                                        <Filter className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                                        <select
                                            value={month}
                                            onChange={(e) => {
                                                setMonth(e.target.value);
                                                if (!e.target.value) setDay("");
                                            }}
                                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md pl-9 pr-3 py-2 bg-white/90 dark:bg-gray-800/90 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                            aria-label="Bulan"
                                        >
                                            {monthOptions.map((o) => (
                                                <option
                                                    key={o.value}
                                                    value={o.value}
                                                >
                                                    {o.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-4 mb-2 block">
                                        Tanggal (opsional, aktif bila Bulan
                                        dipilih)
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={31}
                                        value={day}
                                        onChange={(e) => setDay(e.target.value)}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white/90 dark:bg-gray-800/90 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                        placeholder="DD"
                                        disabled={!month}
                                        aria-label="Tanggal"
                                    />
                                </div>

                                <div className="flex flex-col gap-3 justify-end">
                                    <button
                                        onClick={searchLedger}
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold"
                                        disabled={loading || !canSearch}
                                        aria-label="Terapkan Filter dan Muat Buku Besar"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Search className="w-4 h-4" />
                                        )}
                                        {loading
                                            ? "Memuat…"
                                            : "Terapkan Filter & Muat"}
                                    </button>
                                    <button
                                        onClick={resetFilters}
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-100"
                                        disabled={loading}
                                        aria-label="Reset Bulan dan Tanggal"
                                    >
                                        <RefreshCcw className="w-4 h-4" />
                                        Reset Bulan/Tanggal
                                    </button>
                                    {error && (
                                        <div
                                            className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
                                            role="alert"
                                        >
                                            <Info className="w-4 h-4" />
                                            {error}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Meta & Totals */}
                        {meta && (
                            <motion.div
                                variants={itemVariants}
                                className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-6"
                            >
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Akun
                                        </span>
                                        <div className="font-mono">
                                            {meta.kd_rek}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Nama
                                        </span>
                                        <div>{meta.nm_rek}</div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Balance
                                        </span>
                                        <div>{meta.balance}</div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Periode
                                        </span>
                                        <div>
                                            {meta.year}
                                            {meta.month ? `-${meta.month}` : ""}
                                            {meta.day ? `-${meta.day}` : ""}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50/70 to-indigo-50/70 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-800/50">
                                        <div className="text-xs text-gray-600 dark:text-gray-300">
                                            Saldo Awal
                                        </div>
                                        <div className="text-lg font-semibold">
                                            {formatNumber(meta.saldo_awal)}
                                        </div>
                                    </div>
                                    {totals && (
                                        <div className="p-3 rounded-xl bg-gradient-to-r from-green-50/70 to-emerald-50/70 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-800/50">
                                            <div className="text-xs text-gray-600 dark:text-gray-300">
                                                Total Debet
                                            </div>
                                            <div className="text-lg font-semibold">
                                                {formatNumber(totals.debet)}
                                            </div>
                                        </div>
                                    )}
                                    {totals && (
                                        <div className="p-3 rounded-xl bg-gradient-to-r from-amber-50/70 to-yellow-50/70 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200/50 dark:border-amber-800/50">
                                            <div className="text-xs text-gray-600 dark:text-gray-300">
                                                Total Kredit
                                            </div>
                                            <div className="text-lg font-semibold">
                                                {formatNumber(totals.kredit)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Data Table */}
                        <motion.div
                            variants={itemVariants}
                            className="overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                        >
                            <Table className="text-sm">
                                <TableHeader>
                                    <TableRow className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                                        <TableHead>Tgl. Jurnal</TableHead>
                                        <TableHead>No. Jurnal</TableHead>
                                        <TableHead>No. Bukti</TableHead>
                                        <TableHead>Keterangan</TableHead>
                                        <TableHead className="text-right">
                                            Saldo Awal
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Debet
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Kredit
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Saldo Akhir
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <AnimatePresence>
                                        {rows.map((r, idx) => (
                                            <motion.tr
                                                key={`${r.no_jurnal}_${idx}`}
                                                className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{
                                                    delay: idx * 0.02,
                                                }}
                                            >
                                                <TableCell className="font-mono whitespace-nowrap">
                                                    {r.tgl_jurnal}{" "}
                                                    {r.jam_jurnal}
                                                </TableCell>
                                                <TableCell className="font-mono">
                                                    {r.no_jurnal}
                                                </TableCell>
                                                <TableCell className="font-mono">
                                                    {r.no_bukti || "-"}
                                                </TableCell>
                                                <TableCell className="text-gray-800 dark:text-gray-200">
                                                    {r.keterangan}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {formatNumber(r.saldo_awal)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {formatNumber(r.debet)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {formatNumber(r.kredit)}
                                                </TableCell>
                                                <TableCell className="text-right font-semibold">
                                                    {formatNumber(
                                                        r.saldo_akhir
                                                    )}
                                                </TableCell>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>

                                    {rows.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={8}
                                                className="text-center py-6 text-gray-500 dark:text-gray-400"
                                            >
                                                Tidak ada data. Pilih akun dan
                                                periode lalu klik "Terapkan
                                                Filter & Muat".
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            {totals && (
                                <div className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 border-t border-gray-200/50 dark:border-gray-700/50 px-6 py-4 flex items-center justify-end gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Total Debet
                                        </span>
                                        <span className="font-semibold">
                                            {formatNumber(totals.debet)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Total Kredit
                                        </span>
                                        <span className="font-semibold">
                                            {formatNumber(totals.kredit)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Saldo Akhir
                                        </span>
                                        <span className="font-semibold">
                                            {formatNumber(totals.saldo_akhir)}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                );
            })()}
        </div>
    );
}

// Gunakan layout SidebarKeuangan agar konsisten dengan modul Akutansi
BukuBesarPage.layout = (page) => (
    <SidebarKeuangan title="Keuangan" children={page} />
);
