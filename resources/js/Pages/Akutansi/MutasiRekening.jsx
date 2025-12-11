import React, { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import {
    Calendar,
    Info,
    RefreshCcw,
    Save,
    Search as SearchIcon,
    Download,
} from "lucide-react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/Components/ui/Table";

const Card = ({ title, children, footer }) => (
    <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
    >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500" />
        {title && (
            <div className="relative px-4 py-3 bg-gradient-to-r from-indigo-50/80 via-sky-50/80 to-cyan-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50">
                <h2 className="text-base font-semibold tracking-tight bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
                    {title}
                </h2>
            </div>
        )}
        <div className="relative p-6">{children}</div>
        {footer && <div className="px-6 pb-6">{footer}</div>}
    </motion.div>
);

const formatNumber = (n) => {
    try {
        return new Intl.NumberFormat("id-ID", {
            maximumFractionDigits: 2,
        }).format(Number(n || 0));
    } catch (_) {
        return String(n ?? "");
    }
};

export default function MutasiRekeningPage() {
    const currentYear = new Date().getFullYear();
    const [thn, setThn] = useState(String(currentYear));
    const [q, setQ] = useState("");
    const [periode, setPeriode] = useState("tahunan");
    const [selectedMonth, setSelectedMonth] = useState(
        String(new Date().getMonth() + 1)
    );
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [fromDate, setFromDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 10));
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [serverFilters, setServerFilters] = useState(null);

    const yearOptions = useMemo(() => {
        const start = currentYear - 5;
        const end = currentYear + 1;
        const list = [];
        for (let y = end; y >= start; y--) list.push(String(y));
        return list;
    }, [currentYear]);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const params = { thn, q };
            if (periode === "harian") {
                params.period = "day";
                params.from = selectedDate;
                params.to = selectedDate;
            } else if (periode === "bulanan") {
                params.period = "month";
                params.month = Number(selectedMonth || 12);
            } else if (periode === "rentang") {
                params.period = "range";
                params.from = fromDate;
                params.to = toDate;
            } else {
                params.period = "year";
            }
            const res = await axios.get("/api/akutansi/rekeningtahun", {
                params,
            });
            setItems(res.data.items || []);
            setServerFilters(res.data.filters || null);
        } catch (e) {
            setItems([]);
            setServerFilters(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const totalMutasiDebet = useMemo(
        () =>
            (items || []).reduce(
                (acc, it) => acc + Number(it.mutasi_debet || 0),
                0
            ),
        [items]
    );
    const totalMutasiKredit = useMemo(
        () =>
            (items || []).reduce(
                (acc, it) => acc + Number(it.mutasi_kredit || 0),
                0
            ),
        [items]
    );
    const totalSaldoAwal = useMemo(
        () =>
            (items || []).reduce(
                (acc, it) => acc + Number(it.saldo_awal || 0),
                0
            ),
        [items]
    );
    const totalSaldoAkhir = useMemo(
        () =>
            (items || []).reduce(
                (acc, it) => acc + Number(it.saldo_akhir || 0),
                0
            ),
        [items]
    );
    const balanced =
        Math.round(totalMutasiDebet * 100) ===
        Math.round(totalMutasiKredit * 100);

    const exportCSV = () => {
        const headers = [
            "thn",
            "kd_rek",
            "nm_rek",
            "tipe",
            "balance",
            "saldo_awal",
            "mutasi_debet",
            "mutasi_kredit",
            "saldo_akhir",
        ];
        const rows = (items || []).map((it) => headers.map((h) => it[h]));
        const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join(
            "\n"
        );
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `mutasi_rekening_${thn}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const periodLabel = useMemo(() => {
        if (!serverFilters) return "";
        const f = serverFilters;
        if (periode === "harian") return `Harian: ${f.from}`;
        if (periode === "bulanan")
            return `Bulanan: ${thn}-${String(selectedMonth).padStart(2, "0")}`;
        if (periode === "rentang") return `Rentang: ${f.from} s.d. ${f.to}`;
        return `Tahunan: ${thn}`;
    }, [serverFilters, periode, thn, selectedMonth]);

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6">
            <Head title="Mutasi Rekening" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
            >
                <div className="backdrop-blur-md bg-white/70 dark:bg-slate-900/50 border border-white/60 dark:border-slate-800 rounded-xl shadow-sm">
                    <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-500">
                                Mutasi Rekening
                            </h1>
                            <p className="text-sm text-slate-600">
                                Ringkasan mutasi debet/kredit dan saldo akun
                                berdasarkan periode.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={fetchItems}
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow hover:from-indigo-700 hover:to-blue-700"
                                disabled={loading}
                            >
                                <RefreshCcw className="w-4 h-4" />
                                {loading ? "Memuat…" : "Refresh"}
                            </button>
                            <button
                                type="button"
                                onClick={() => window.print()}
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-slate-700 border border-slate-200 shadow hover:bg-slate-50"
                            >
                                <Save className="w-4 h-4" /> Cetak
                            </button>
                            <button
                                type="button"
                                onClick={exportCSV}
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-slate-700 border border-slate-200 shadow hover:bg-slate-50"
                            >
                                <Download className="w-4 h-4" /> Ekspor CSV
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            <Card title="Filter">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Tahun
                        </label>
                        <select
                            value={thn}
                            onChange={(e) => setThn(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300"
                        >
                            {yearOptions.map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Periode
                        </label>
                        <select
                            value={periode}
                            onChange={(e) => setPeriode(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300"
                        >
                            <option value="tahunan">Tahunan</option>
                            <option value="bulanan">Bulanan</option>
                            <option value="harian">Harian</option>
                            <option value="rentang">Rentang</option>
                        </select>
                    </div>
                    {periode === "bulanan" && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Bulan
                            </label>
                            <select
                                value={selectedMonth}
                                onChange={(e) =>
                                    setSelectedMonth(e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300"
                            >
                                {Array.from({ length: 12 }, (_, i) =>
                                    String(i + 1)
                                ).map((m) => (
                                    <option key={m} value={m}>
                                        {m}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    {periode === "harian" && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Tanggal
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) =>
                                        setSelectedDate(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300"
                                />
                                <Calendar className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                            </div>
                        </div>
                    )}
                    {periode === "rentang" && (
                        <>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Dari
                                </label>
                                <input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) =>
                                        setFromDate(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Sampai
                                </label>
                                <input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300"
                                />
                            </div>
                        </>
                    )}
                    <div className="md:col-span-2 lg:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Cari Akun
                        </label>
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Cari kd_rek atau nama rekening"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300"
                                />
                                <SearchIcon className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                            </div>
                            <button
                                type="button"
                                onClick={fetchItems}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow hover:from-indigo-700 hover:to-blue-700"
                                disabled={loading}
                            >
                                Tampilkan
                            </button>
                        </div>
                        {serverFilters && (
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <Info className="w-3 h-3" /> Periode aktif:{" "}
                                {periodLabel}
                            </p>
                        )}
                    </div>
                </div>
            </Card>

            <Card
                title="Daftar Mutasi Rekening"
                footer={
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="rounded-lg p-3 bg-indigo-50/60 dark:bg-indigo-900/30 border border-indigo-200/60 dark:border-indigo-800/60">
                            <div className="text-xs text-slate-600">
                                Total Saldo Awal
                            </div>
                            <div className="text-lg font-semibold">
                                {formatNumber(totalSaldoAwal)}
                            </div>
                        </div>
                        <div className="rounded-lg p-3 bg-emerald-50/60 dark:bg-emerald-900/30 border border-emerald-200/60 dark:border-emerald-800/60">
                            <div className="text-xs text-slate-600">
                                Total Mutasi Debet
                            </div>
                            <div className="text-lg font-semibold text-emerald-700">
                                {formatNumber(totalMutasiDebet)}
                            </div>
                        </div>
                        <div className="rounded-lg p-3 bg-rose-50/60 dark:bg-rose-900/30 border border-rose-200/60 dark:border-rose-800/60">
                            <div className="text-xs text-slate-600">
                                Total Mutasi Kredit
                            </div>
                            <div className="text-lg font-semibold text-rose-700">
                                {formatNumber(totalMutasiKredit)}
                            </div>
                        </div>
                        <div className="rounded-lg p-3 bg-sky-50/60 dark:bg-sky-900/30 border border-sky-200/60 dark:border-sky-800/60">
                            <div className="text-xs text-slate-600">
                                Total Saldo Akhir
                            </div>
                            <div className="text-lg font-semibold">
                                {formatNumber(totalSaldoAkhir)}
                            </div>
                        </div>
                    </div>
                }
            >
                <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                                <TableHead className="w-20">Kode</TableHead>
                                <TableHead>Nama Rekening</TableHead>
                                <TableHead className="w-28">Tipe</TableHead>
                                <TableHead className="w-24">Balance</TableHead>
                                <TableHead className="text-right">
                                    Saldo Awal
                                </TableHead>
                                <TableHead className="text-right">
                                    Mutasi Debet
                                </TableHead>
                                <TableHead className="text-right">
                                    Mutasi Kredit
                                </TableHead>
                                <TableHead className="text-right">
                                    Saldo Akhir
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="px-4 py-6 text-center text-gray-500"
                                    >
                                        Memuat data…
                                    </TableCell>
                                </TableRow>
                            ) : items && items.length ? (
                                items.map((row) => (
                                    <TableRow key={row.kd_rek}>
                                        <TableCell className="font-mono">
                                            {row.kd_rek}
                                        </TableCell>
                                        <TableCell>{row.nm_rek}</TableCell>
                                        <TableCell>{row.tipe}</TableCell>
                                        <TableCell>{row.balance}</TableCell>
                                        <TableCell className="text-right font-mono">
                                            {formatNumber(row.saldo_awal)}
                                        </TableCell>
                                        <TableCell className="text-right font-mono text-emerald-700">
                                            {formatNumber(row.mutasi_debet)}
                                        </TableCell>
                                        <TableCell className="text-right font-mono text-rose-700">
                                            {formatNumber(row.mutasi_kredit)}
                                        </TableCell>
                                        <TableCell className="text-right font-mono">
                                            {formatNumber(row.saldo_akhir)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="px-4 py-4 text-center text-gray-500"
                                    >
                                        Tidak ada data untuk periode ini.
                                    </TableCell>
                                </TableRow>
                            )}
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="font-semibold"
                                >
                                    Total
                                </TableCell>
                                <TableCell className="text-right font-mono font-semibold">
                                    {formatNumber(totalSaldoAwal)}
                                </TableCell>
                                <TableCell className="text-right font-mono font-semibold text-emerald-700">
                                    {formatNumber(totalMutasiDebet)}
                                </TableCell>
                                <TableCell className="text-right font-mono font-semibold text-rose-700">
                                    {formatNumber(totalMutasiKredit)}
                                </TableCell>
                                <TableCell className="text-right font-mono font-semibold">
                                    {formatNumber(totalSaldoAkhir)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className="mt-4 rounded-xl p-4 bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-900/40 dark:to-emerald-900/40 border border-green-200/50 dark:border-green-700/50 flex items-center gap-2">
                    <span
                        className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${
                            balanced ? "bg-green-600" : "bg-yellow-600"
                        }`}
                    ></span>
                    <span className="text-sm">
                        {balanced
                            ? "Mutasi seimbang (Debet ≈ Kredit)."
                            : "Perhatian: mutasi Debet dan Kredit tidak seimbang."}
                    </span>
                </div>
            </Card>
        </div>
    );
}

MutasiRekeningPage.layout = (page) => (
    <SidebarKeuangan title="Keuangan" children={page} />
);
