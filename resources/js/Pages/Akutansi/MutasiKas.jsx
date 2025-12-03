import React, { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import {
    Wallet,
    RefreshCcw,
    Download,
    Search as SearchIcon,
    Calendar,
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

const nf = (n) => {
    try {
        return new Intl.NumberFormat("id-ID", {
            maximumFractionDigits: 2,
        }).format(Number(n || 0));
    } catch (_) {
        return String(n ?? "");
    }
};

export default function MutasiKasPage() {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(String(currentYear));
    const [periode, setPeriode] = useState("tahunan");
    const [month, setMonth] = useState(String(new Date().getMonth() + 1));
    const [day, setDay] = useState(
        String(new Date().getDate()).padStart(2, "0")
    );
    const [q, setQ] = useState("kas");
    const [rekeningOptions, setRekeningOptions] = useState([]);
    const [selectedRek, setSelectedRek] = useState("");
    const [rows, setRows] = useState([]);
    const [meta, setMeta] = useState(null);
    const [totals, setTotals] = useState({
        debet: 0,
        kredit: 0,
        saldo_akhir: 0,
    });
    const [loading, setLoading] = useState(false);

    const yearOptions = useMemo(() => {
        const start = currentYear - 5;
        const end = currentYear + 1;
        const list = [];
        for (let y = end; y >= start; y--) list.push(String(y));
        return list;
    }, [currentYear]);

    const fetchRekening = async (term = q) => {
        try {
            const res = await axios.get("/api/akutansi/rekening", {
                params: { q: term, per_page: 100 },
            });
            const items = (res.data?.data || []).filter((it) => {
                const name = String(it.nm_rek || "").toLowerCase();
                return name.includes("kas") || name.includes("bank");
            });
            setRekeningOptions(items);
            if (!selectedRek && items.length) setSelectedRek(items[0].kd_rek);
        } catch (e) {
            setRekeningOptions([]);
        }
    };

    const fetchLedger = async () => {
        if (!selectedRek) return;
        setLoading(true);
        try {
            const params = { kd_rek: selectedRek, year };
            if (periode === "bulanan")
                params.month = String(month).padStart(2, "0");
            if (periode === "harian") {
                params.month = String(month).padStart(2, "0");
                params.day = String(day).padStart(2, "0");
            }
            const res = await axios.get("/api/akutansi/buku-besar", { params });
            setRows(res.data?.rows || []);
            setMeta(res.data?.meta || null);
            setTotals(
                res.data?.totals || { debet: 0, kredit: 0, saldo_akhir: 0 }
            );
        } catch (e) {
            setRows([]);
            setMeta(null);
            setTotals({ debet: 0, kredit: 0, saldo_akhir: 0 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRekening();
    }, []);

    useEffect(() => {
        if (selectedRek) fetchLedger();
    }, [selectedRek]);

    const exportCSV = () => {
        const headers = [
            "tgl_jurnal",
            "jam_jurnal",
            "no_jurnal",
            "no_bukti",
            "keterangan",
            "debet",
            "kredit",
            "saldo_awal",
            "saldo_akhir",
        ];
        const rowsCsv = (rows || []).map((r) => headers.map((h) => r[h]));
        const csv = [
            headers.join(","),
            ...rowsCsv.map((r) => r.join(",")),
        ].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `mutasi_kas_${selectedRek || "-"}_${year}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const periodLabel = useMemo(() => {
        if (periode === "tahunan") return `Tahunan: ${year}`;
        if (periode === "bulanan")
            return `Bulanan: ${year}-${String(month).padStart(2, "0")}`;
        return `Harian: ${year}-${String(month).padStart(2, "0")}-${String(
            day
        ).padStart(2, "0")}`;
    }, [periode, year, month, day]);

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6">
            <Head title="Mutasi Kas" />
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
                                Mutasi Kas
                            </h1>
                            <p className="text-sm text-slate-600">
                                Pergerakan kas per akun berdasarkan periode.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={fetchLedger}
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow hover:from-indigo-700 hover:to-blue-700"
                                disabled={loading}
                            >
                                <RefreshCcw className="w-4 h-4" />
                                {loading ? "Memuat…" : "Refresh"}
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
                            Akun Kas
                        </label>
                        <div className="flex gap-2">
                            <select
                                value={selectedRek}
                                onChange={(e) => setSelectedRek(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300"
                            >
                                <option value="">Pilih akun…</option>
                                {rekeningOptions.map((r) => (
                                    <option key={r.kd_rek} value={r.kd_rek}>
                                        {r.kd_rek} — {r.nm_rek}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Cari akun kas/bank"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300"
                                />
                                <SearchIcon className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                            </div>
                            <button
                                type="button"
                                onClick={() => fetchRekening(q)}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow hover:from-indigo-700 hover:to-blue-700"
                            >
                                Cari
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Tahun
                        </label>
                        <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
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
                        </select>
                    </div>
                    {periode !== "tahunan" && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {periode === "bulanan" ? "Bulan" : "Tanggal"}
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <select
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
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
                                {periode === "harian" && (
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min="1"
                                            max="31"
                                            value={day}
                                            onChange={(e) =>
                                                setDay(
                                                    String(
                                                        e.target.value
                                                    ).padStart(2, "0")
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300"
                                        />
                                        <Calendar className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {selectedRek && (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Periode aktif: {periodLabel}
                    </p>
                )}
            </Card>

            <Card
                title="Daftar Mutasi Kas"
                footer={
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="rounded-lg p-3 bg-emerald-50/60 dark:bg-emerald-900/30 border border-emerald-200/60 dark:border-emerald-800/60">
                            <div className="text-xs text-slate-600">
                                Total Debet
                            </div>
                            <div className="text-lg font-semibold text-emerald-700">
                                {nf(totals.debet)}
                            </div>
                        </div>
                        <div className="rounded-lg p-3 bg-rose-50/60 dark:bg-rose-900/30 border border-rose-200/60 dark:border-rose-800/60">
                            <div className="text-xs text-slate-600">
                                Total Kredit
                            </div>
                            <div className="text-lg font-semibold text-rose-700">
                                {nf(totals.kredit)}
                            </div>
                        </div>
                        <div className="rounded-lg p-3 bg-sky-50/60 dark:bg-sky-900/30 border border-sky-200/60 dark:border-sky-800/60">
                            <div className="text-xs text-slate-600">
                                Saldo Akhir
                            </div>
                            <div className="text-lg font-semibold">
                                {nf(totals.saldo_akhir)}
                            </div>
                        </div>
                    </div>
                }
            >
                <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                                <TableHead className="w-36">Tanggal</TableHead>
                                <TableHead className="w-28">No Bukti</TableHead>
                                <TableHead>Keterangan</TableHead>
                                <TableHead className="text-right">
                                    Debet
                                </TableHead>
                                <TableHead className="text-right">
                                    Kredit
                                </TableHead>
                                <TableHead className="text-right">
                                    Saldo
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="px-4 py-6 text-center text-gray-500"
                                    >
                                        Memuat data…
                                    </TableCell>
                                </TableRow>
                            ) : rows && rows.length ? (
                                rows.map((r, idx) => (
                                    <TableRow key={`${r.no_jurnal}-${idx}`}>
                                        <TableCell className="font-mono">
                                            {r.tgl_jurnal} {r.jam_jurnal}
                                        </TableCell>
                                        <TableCell className="font-mono">
                                            {r.no_bukti || "-"}
                                        </TableCell>
                                        <TableCell>
                                            {r.keterangan || "-"}
                                        </TableCell>
                                        <TableCell className="text-right font-mono text-emerald-700">
                                            {nf(r.debet)}
                                        </TableCell>
                                        <TableCell className="text-right font-mono text-rose-700">
                                            {nf(r.kredit)}
                                        </TableCell>
                                        <TableCell className="text-right font-mono">
                                            {nf(r.saldo_akhir)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="px-4 py-4 text-center text-gray-500"
                                    >
                                        Tidak ada data untuk periode ini.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {meta && (
                    <div className="mt-4 rounded-xl p-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/40 dark:to-indigo-900/40 border border-blue-200/50 dark:border-blue-700/50 flex items-center gap-2">
                        <Wallet className="w-4 h-4" />
                        <span className="text-sm">
                            Akun: {meta.kd_rek} — {meta.nm_rek} • Balance:{" "}
                            {meta.balance} • Saldo Awal Periode:{" "}
                            {nf(meta.saldo_awal)}
                        </span>
                    </div>
                )}
            </Card>
        </div>
    );
}

MutasiKasPage.layout = (page) => (
    <SidebarKeuangan title="Keuangan" children={page} />
);
