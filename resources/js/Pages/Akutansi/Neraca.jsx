import React, { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import {
    Scale,
    Search as SearchIcon,
    RefreshCcw,
    Save,
    Edit2,
    Trash2,
    Info,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/Components/ui/Table";

// Card pattern mengikuti UI/UX guide
const Card = ({ title, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
    >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
        {title && (
            <div className="relative px-4 py-3 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50">
                <h2 className="text-base font-semibold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {title}
                </h2>
            </div>
        )}
        <div className="relative p-6">{children}</div>
    </motion.div>
);

const numberFormat = (n) => {
    try {
        const num = Number(n || 0);
        return new Intl.NumberFormat("id-ID", {
            maximumFractionDigits: 2,
        }).format(num);
    } catch (_) {
        return String(n ?? "");
    }
};

// Heuristik kelompok Neraca berdasarkan kode akun (COA): 1=Aktiva, 2=Kewajiban, 3=Ekuitas
const detectKelompok = (kd_rek = "") => {
    const first = String(kd_rek).trim()[0];
    if (first === "1") return "Aktiva";
    if (first === "2") return "Kewajiban";
    return "Ekuitas";
};

export default function NeracaPage() {
    const currentYear = new Date().getFullYear();
    const [thn, setThn] = useState(String(currentYear));
    const [q, setQ] = useState("");
    // Memuat semua akun (R, M, N) untuk tahun terpilih
    const [itemsAll, setItemsAll] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [serverFilters, setServerFilters] = useState(null);

    // Tab: Laba Rugi, Perubahan Modal, Neraca
    const [activeTab, setActiveTab] = useState("neraca");

    // Filter periode: harian, bulanan, tahunan
    const [periode, setPeriode] = useState("tahunan"); // 'harian' | 'bulanan' | 'tahunan'
    const [selectedDate, setSelectedDate] = useState(""); // YYYY-MM-DD
    const [selectedMonth, setSelectedMonth] = useState(
        String(new Date().getMonth() + 1)
    ); // 1..12

    // Form CRUD saldo awal untuk akun Neraca (tipe 'N')
    const [saldoForm, setSaldoForm] = useState({
        kd_rek: "",
        nm_rek: "",
        saldo_awal: "",
    });
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

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
            // Ambil agregasi saldo awal + mutasi via API RekeningTahun
            const params = { thn, q };
            if (periode === "harian") {
                params.period = "day";
                // Pastikan mutasi yang diambil hanya untuk tanggal yang dipilih (bukan akumulasi YTD)
                const d = selectedDate || new Date().toISOString().slice(0, 10);
                params.from = d;
                params.to = d;
            } else if (periode === "bulanan") {
                params.period = "month";
                params.month = Number(selectedMonth || 12);
            } else {
                params.period = "year";
            }
            const res = await axios.get("/api/akutansi/rekeningtahun", {
                params,
            });
            const payload = res.data || {};
            const rows = Array.isArray(payload.items) ? payload.items : [];
            // Simpan semua akun (R, M, N) lalu difilter pada masing-masing tab
            setItemsAll(rows);
            setServerFilters(payload.filters || null);
        } catch (e) {
            console.error("Gagal memuat Neraca:", e);
        } finally {
            setLoading(false);
        }
    };

    // Refetch data setiap kali tahun/periode/bulan/tanggal berubah
    useEffect(() => {
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [thn, periode, selectedMonth, selectedDate]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setRefreshing(true);
        try {
            await fetchItems();
        } finally {
            setRefreshing(false);
        }
    };

    const resetSaldoForm = () => {
        setSaldoForm({ kd_rek: "", nm_rek: "", saldo_awal: "" });
        setErrors({});
    };

    const validateSaldoForm = () => {
        const errs = {};
        if (!saldoForm.kd_rek?.trim()) errs.kd_rek = "Akun wajib diisi";
        if (saldoForm.saldo_awal === "" || saldoForm.saldo_awal === null)
            errs.saldo_awal = "Saldo awal wajib diisi";
        else if (isNaN(Number(saldoForm.saldo_awal)))
            errs.saldo_awal = "Saldo awal harus angka";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSaveSaldoAwal = async (e) => {
        e?.preventDefault?.();
        if (!validateSaldoForm()) return;
        setSaving(true);
        try {
            await axios.post("/api/akutansi/rekeningtahun", {
                thn,
                kd_rek: saldoForm.kd_rek,
                saldo_awal: Number(saldoForm.saldo_awal || 0),
            });
            await fetchItems();
            resetSaldoForm();
            alert("Saldo awal tersimpan");
        } catch (e) {
            console.error("Simpan saldo awal gagal:", e);
            const data = e?.response?.data;
            if (data && typeof data === "object") {
                setErrors(data.errors || {});
                const msg = data.message || "Gagal menyimpan saldo awal";
                alert(msg);
            }
        } finally {
            setSaving(false);
        }
    };

    const handleEditRow = (row) => {
        setSaldoForm({
            kd_rek: row.kd_rek,
            nm_rek: row.nm_rek,
            saldo_awal: row.saldo_awal,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDeleteSaldoAwal = async (row) => {
        if (!confirm(`Hapus saldo awal tahun ${thn} untuk akun ${row.kd_rek}?`))
            return;
        try {
            await axios.delete(
                `/api/akutansi/rekeningtahun/${thn}/${row.kd_rek}`
            );
            await fetchItems();
            alert("Saldo awal dihapus");
        } catch (e) {
            console.error("Hapus saldo awal gagal:", e);
            alert("Gagal menghapus saldo awal");
        }
    };

    // Pisahkan items berdasarkan tipe
    const itemsN = useMemo(
        () => itemsAll.filter((r) => (r.tipe || "").toUpperCase() === "N"),
        [itemsAll]
    );
    const itemsR = useMemo(
        () => itemsAll.filter((r) => (r.tipe || "").toUpperCase() === "R"),
        [itemsAll]
    );
    const itemsM = useMemo(
        () => itemsAll.filter((r) => (r.tipe || "").toUpperCase() === "M"),
        [itemsAll]
    );

    // Laba Rugi
    const pendapatanRows = useMemo(
        () => itemsR.filter((r) => (r.balance || "").toUpperCase() === "K"),
        [itemsR]
    );
    const biayaRows = useMemo(
        () => itemsR.filter((r) => (r.balance || "").toUpperCase() === "D"),
        [itemsR]
    );
    // Deteksi apakah periode saat ini adalah harian (menampilkan transaksi hari ini saja untuk Laba Rugi)
    const isDailyPeriod = useMemo(
        () => (serverFilters?.period || "") === "day",
        [serverFilters]
    );
    // Total untuk tampilan Laba Rugi (harian: gunakan mutasi hari ini; selain itu: gunakan saldo akhir periode)
    const totalPendapatanLR = useMemo(
        () =>
            pendapatanRows.reduce((acc, r) => {
                const amount = isDailyPeriod
                    ? Number(r.mutasi_debet || 0) - Number(r.mutasi_kredit || 0)
                    : Number(r.saldo_akhir || 0);
                return acc + amount;
            }, 0),
        [pendapatanRows, isDailyPeriod]
    );
    const totalBiayaLR = useMemo(
        () =>
            biayaRows.reduce((acc, r) => {
                const amount = isDailyPeriod
                    ? Number(r.mutasi_debet || 0) - Number(r.mutasi_kredit || 0)
                    : Number(r.saldo_akhir || 0);
                return acc + amount;
            }, 0),
        [biayaRows, isDailyPeriod]
    );
    const labaBersihLR = useMemo(
        () => totalPendapatanLR - totalBiayaLR,
        [totalPendapatanLR, totalBiayaLR]
    );

    // Total agregasi YTD (untuk konsistensi perhitungan Modal Akhir di tab Neraca/Perubahan Modal)
    const totalPendapatanYTD = useMemo(
        () =>
            pendapatanRows.reduce(
                (acc, r) => acc + Number(r.saldo_akhir || 0),
                0
            ),
        [pendapatanRows]
    );
    const totalBiayaYTD = useMemo(
        () => biayaRows.reduce((acc, r) => acc + Number(r.saldo_akhir || 0), 0),
        [biayaRows]
    );
    const labaBersihYTD = useMemo(
        () => totalPendapatanYTD - totalBiayaYTD,
        [totalPendapatanYTD, totalBiayaYTD]
    );

    // Label periode untuk UI (menyesuaikan harian/bulanan/tahunan)
    const periodLabel = useMemo(() => {
        if (!serverFilters) return null;
        const p = serverFilters.period;
        const from = serverFilters.from;
        const to = serverFilters.to;
        const y = serverFilters.thn;
        const m = serverFilters.month;
        if (p === "day") {
            // Untuk harian, tampilkan satu tanggal saja agar konsisten dengan kontrol UI
            return `Tanggal: ${to}`;
        }
        if (p === "month") {
            // Untuk bulanan, tampilkan bulan yang dipilih
            const monthNames = [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
            ];
            const idx = Math.max(1, Math.min(12, Number(m || 1))) - 1;
            const nm = monthNames[idx];
            return `Bulan: ${nm} ${y}`;
        }
        // Tahunan
        return `Tahun: ${y}`;
    }, [serverFilters]);

    // Prefix "Per ..." sesuai permintaan user agar tidak muncul lagi "Akumulasi sampai"
    const periodPrefix = useMemo(() => {
        if (!serverFilters) return null;
        switch (serverFilters.period) {
            case "day":
                return "Per Tanggal";
            case "month":
                return "Per Bulan";
            case "year":
                return "Per Tahun";
            default:
                return "Periode";
        }
    }, [serverFilters]);

    // Nilai label periode tanpa awalan "Tanggal/Bulan/Tahun" agar tampil natural: "Per Tanggal: 2025-12-31" dll.
    const periodValueLabel = useMemo(() => {
        if (!serverFilters) return null;
        const p = serverFilters.period;
        const from = serverFilters.from;
        const to = serverFilters.to;
        const y = serverFilters.thn;
        const m = serverFilters.month;
        if (p === "day") {
            return to;
        }
        if (p === "month") {
            const monthNames = [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
            ];
            const idx = Math.max(1, Math.min(12, Number(m || 1))) - 1;
            const nm = monthNames[idx];
            return `${nm} ${y}`;
        }
        if (p === "year") {
            return `${y}`;
        }
        if (from && to) {
            return `${from} s/d ${to}`;
        }
        return null;
    }, [serverFilters]);

    // Perubahan Modal
    // Total Modal (YTD) tetap untuk perhitungan Neraca
    const totalModal = useMemo(
        () => itemsM.reduce((acc, r) => acc + Number(r.saldo_akhir || 0), 0),
        [itemsM]
    );
    // Total Modal untuk tampilan mengikuti pola Laba Rugi (harian: transaksi hari ini)
    const totalModalDisplay = useMemo(
        () =>
            itemsM.reduce((acc, r) => {
                const amount = isDailyPeriod
                    ? Number(r.mutasi_debet || 0) - Number(r.mutasi_kredit || 0)
                    : Number(r.saldo_akhir || 0);
                return acc + amount;
            }, 0),
        [itemsM, isDailyPeriod]
    );
    // Modal Akhir untuk Neraca (agar seimbang) menggunakan laba bersih YTD
    const modalAkhir = useMemo(
        () => totalModal + labaBersihYTD,
        [totalModal, labaBersihYTD]
    );
    // Modal Akhir untuk tampilan Perubahan Modal mengikuti pola Laba Rugi
    const modalAkhirDisplay = useMemo(
        () =>
            isDailyPeriod
                ? totalModalDisplay + labaBersihLR
                : totalModalDisplay + labaBersihYTD,
        [isDailyPeriod, totalModalDisplay, labaBersihLR, labaBersihYTD]
    );

    // Ringkasan Neraca (sesuai Java: Aktiva = N/D, Pasiva = N/K, cek seimbang dengan Pasiva + Modal Akhir)
    const summaryNeraca = useMemo(() => {
        const aktiva = itemsN
            .filter((r) => (r.balance || "").toUpperCase() === "D")
            .reduce((acc, r) => acc + Number(r.saldo_akhir || 0), 0);
        const pasiva = itemsN
            .filter((r) => (r.balance || "").toUpperCase() === "K")
            .reduce((acc, r) => acc + Number(r.saldo_akhir || 0), 0);
        const pasivaPlusModal = pasiva + modalAkhir;
        return {
            Aktiva: aktiva,
            Pasiva: pasiva,
            PasivaPlusModal: pasivaPlusModal,
            keseimbangan: Math.abs(aktiva - pasivaPlusModal) < 0.5,
        };
    }, [itemsN, modalAkhir]);

    return (
        <div>
            <Head title="Keuangan - Laporan Keuangan" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
                className="space-y-6"
            >
                {/* Header & Tabs */}
                <Card>
                    <div className="relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-blue-600/5 to-purple-600/5 dark:from-indigo-500/10 dark:via-blue-500/10 dark:to-purple-500/10" />
                        <div className="relative flex flex-col gap-4">
                            <div className="flex items-center justify-between gap-6">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.2,
                                        }}
                                    >
                                        <Scale className="w-6 h-6 text-white" />
                                    </motion.div>
                                    <motion.h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        Laporan Keuangan
                                    </motion.h1>
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                        Tahun
                                    </label>
                                    <select
                                        value={thn}
                                        onChange={(e) => setThn(e.target.value)}
                                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300"
                                    >
                                        {yearOptions.map((y) => (
                                            <option key={y} value={y}>
                                                {y}
                                            </option>
                                        ))}
                                    </select>

                                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400 ml-4">
                                        Periode
                                    </label>
                                    <select
                                        value={periode}
                                        onChange={(e) => {
                                            setPeriode(e.target.value);
                                        }}
                                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300"
                                    >
                                        <option value="harian">Harian</option>
                                        <option value="bulanan">Bulanan</option>
                                        <option value="tahunan">Tahunan</option>
                                    </select>

                                    {periode === "harian" && (
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            min={`${thn}-01-01`}
                                            max={`${thn}-12-31`}
                                            onChange={(e) => {
                                                setSelectedDate(e.target.value);
                                            }}
                                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300"
                                        />
                                    )}
                                    {periode === "bulanan" && (
                                        <select
                                            value={selectedMonth}
                                            onChange={(e) => {
                                                setSelectedMonth(
                                                    e.target.value
                                                );
                                            }}
                                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300"
                                        >
                                            {Array.from(
                                                { length: 12 },
                                                (_, i) => String(i + 1)
                                            ).map((m) => (
                                                <option
                                                    key={m}
                                                    value={m}
                                                >{`Bulan ${m}`}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {[
                                    { key: "laba", label: "Laba Rugi" },
                                    { key: "modal", label: "Perubahan Modal" },
                                    { key: "neraca", label: "Neraca" },
                                ].map((t) => (
                                    <button
                                        key={t.key}
                                        type="button"
                                        onClick={() => setActiveTab(t.key)}
                                        className={`rounded-lg px-4 py-2 text-sm font-semibold border transition-all ${
                                            activeTab === t.key
                                                ? "bg-indigo-600 text-white border-indigo-600"
                                                : "bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 border-gray-300 hover:bg-gray-50"
                                        }`}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                                <div className="ml-auto text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <Info className="w-4 h-4" />
                                    Pilih tab untuk melihat ringkasan dan
                                    detail.
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Tab: Laba Rugi */}
                {activeTab === "laba" && (
                    <>
                        <Card title="Ringkasan Laba Rugi">
                            {periodPrefix && periodValueLabel && (
                                <div className="mb-4 text-xs text-gray-600 dark:text-gray-400">
                                    {periodPrefix}: {periodValueLabel}
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="rounded-xl p-4 bg-white/70 dark:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50">
                                    <div className="text-xs font-medium text-gray-500">
                                        Total Pendapatan
                                    </div>
                                    <div className="text-2xl font-bold">
                                        Rp {numberFormat(totalPendapatanLR)}
                                    </div>
                                </div>
                                <div className="rounded-xl p-4 bg-white/70 dark:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50">
                                    <div className="text-xs font-medium text-gray-500">
                                        Total Biaya-Biaya
                                    </div>
                                    <div className="text-2xl font-bold">
                                        Rp {numberFormat(totalBiayaLR)}
                                    </div>
                                </div>
                                <div className="rounded-xl p-4 bg-white/70 dark:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50">
                                    <div className="text-xs font-medium text-gray-500">
                                        Laba Bersih
                                    </div>
                                    <div className="text-2xl font-bold">
                                        Rp {numberFormat(labaBersihLR)}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card title="Detail Pendapatan (R/K) & Biaya (R/D)">
                            {periodPrefix && periodValueLabel && (
                                <div className="mb-3 text-xs text-gray-600 dark:text-gray-400">
                                    {periodPrefix}: {periodValueLabel}
                                    {isDailyPeriod && (
                                        <span className="ml-2">
                                            (Hanya transaksi yang terjadi pada
                                            tanggal ini)
                                        </span>
                                    )}
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                                                <TableHead>Kode</TableHead>
                                                <TableHead>
                                                    Nama Rekening
                                                </TableHead>
                                                <TableHead className="text-right">
                                                    {isDailyPeriod
                                                        ? "Transaksi Hari Ini"
                                                        : "Saldo Akhir (Periode)"}
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                                            {loading ? (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={3}
                                                        className="px-4 py-6 text-center text-gray-500"
                                                    >
                                                        Memuat data…
                                                    </TableCell>
                                                </TableRow>
                                            ) : pendapatanRows.length ? (
                                                pendapatanRows.map((row) => (
                                                    <TableRow
                                                        key={`pend-${row.kd_rek}`}
                                                    >
                                                        <TableCell className="font-mono">
                                                            {row.kd_rek}
                                                        </TableCell>
                                                        <TableCell>
                                                            {row.nm_rek}
                                                        </TableCell>
                                                        <TableCell className="text-right font-mono">
                                                            {numberFormat(
                                                                isDailyPeriod
                                                                    ? Number(
                                                                          row.mutasi_debet ||
                                                                              0
                                                                      ) -
                                                                          Number(
                                                                              row.mutasi_kredit ||
                                                                                  0
                                                                          )
                                                                    : Number(
                                                                          row.saldo_akhir ||
                                                                              0
                                                                      )
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={3}
                                                        className="px-4 py-4 text-center text-gray-500"
                                                    >
                                                        Tidak ada data
                                                        pendapatan.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                            <TableRow>
                                                <TableCell
                                                    colSpan={2}
                                                    className="font-semibold"
                                                >
                                                    Total Pendapatan
                                                </TableCell>
                                                <TableCell className="text-right font-mono font-semibold">
                                                    {numberFormat(
                                                        totalPendapatanLR
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                                                <TableHead>Kode</TableHead>
                                                <TableHead>
                                                    Nama Rekening
                                                </TableHead>
                                                <TableHead className="text-right">
                                                    {isDailyPeriod
                                                        ? "Transaksi Hari Ini"
                                                        : "Saldo Akhir (Periode)"}
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                                            {loading ? (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={3}
                                                        className="px-4 py-6 text-center text-gray-500"
                                                    >
                                                        Memuat data…
                                                    </TableCell>
                                                </TableRow>
                                            ) : biayaRows.length ? (
                                                biayaRows.map((row) => (
                                                    <TableRow
                                                        key={`biaya-${row.kd_rek}`}
                                                    >
                                                        <TableCell className="font-mono">
                                                            {row.kd_rek}
                                                        </TableCell>
                                                        <TableCell>
                                                            {row.nm_rek}
                                                        </TableCell>
                                                        <TableCell className="text-right font-mono">
                                                            {numberFormat(
                                                                isDailyPeriod
                                                                    ? Number(
                                                                          row.mutasi_debet ||
                                                                              0
                                                                      ) -
                                                                          Number(
                                                                              row.mutasi_kredit ||
                                                                                  0
                                                                          )
                                                                    : Number(
                                                                          row.saldo_akhir ||
                                                                              0
                                                                      )
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={3}
                                                        className="px-4 py-4 text-center text-gray-500"
                                                    >
                                                        Tidak ada data biaya.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                            <TableRow>
                                                <TableCell
                                                    colSpan={2}
                                                    className="font-semibold"
                                                >
                                                    Total Biaya-Biaya
                                                </TableCell>
                                                <TableCell className="text-right font-mono font-semibold">
                                                    {numberFormat(totalBiayaLR)}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                            <div className="mt-4 rounded-xl p-4 bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-900/40 dark:to-emerald-900/40 border border-green-200/50 dark:border-green-700/50 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                <span className="text-sm">
                                    Laba Bersih = Total Pendapatan - Total
                                    Biaya-Biaya
                                </span>
                                <span className="ml-auto text-sm font-semibold">
                                    Rp {numberFormat(labaBersihLR)}
                                </span>
                            </div>
                        </Card>
                    </>
                )}

                {/* Tab: Perubahan Modal */}
                {activeTab === "modal" && (
                    <>
                        <Card title="Modal Awal">
                            {periodPrefix && periodValueLabel && (
                                <div className="mb-3 text-xs text-gray-600 dark:text-gray-400">
                                    {periodPrefix}: {periodValueLabel}
                                    {isDailyPeriod && (
                                        <span className="ml-2">
                                            (Hanya transaksi yang terjadi pada
                                            tanggal ini)
                                        </span>
                                    )}
                                </div>
                            )}
                            <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                                            <TableHead>Kode</TableHead>
                                            <TableHead>Nama Rekening</TableHead>
                                            <TableHead className="text-right">
                                                {isDailyPeriod
                                                    ? "Transaksi Hari Ini"
                                                    : "Saldo Akhir (Periode)"}
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {loading ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={3}
                                                    className="px-4 py-6 text-center text-gray-500"
                                                >
                                                    Memuat data…
                                                </TableCell>
                                            </TableRow>
                                        ) : itemsM.length ? (
                                            itemsM.map((row) => (
                                                <TableRow
                                                    key={`modal-${row.kd_rek}`}
                                                >
                                                    <TableCell className="font-mono">
                                                        {row.kd_rek}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.nm_rek}
                                                    </TableCell>
                                                    <TableCell className="text-right font-mono">
                                                        {numberFormat(
                                                            isDailyPeriod
                                                                ? Number(
                                                                      row.mutasi_debet ||
                                                                          0
                                                                  ) -
                                                                      Number(
                                                                          row.mutasi_kredit ||
                                                                              0
                                                                      )
                                                                : Number(
                                                                      row.saldo_akhir ||
                                                                          0
                                                                  )
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={3}
                                                    className="px-4 py-4 text-center text-gray-500"
                                                >
                                                    Tidak ada data modal.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        <TableRow>
                                            <TableCell
                                                colSpan={2}
                                                className="font-semibold"
                                            >
                                                Total Modal
                                            </TableCell>
                                            <TableCell className="text-right font-mono font-semibold">
                                                {numberFormat(
                                                    totalModalDisplay
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </Card>

                        <Card>
                            <div className="rounded-xl p-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/40 dark:to-indigo-900/40 border border-blue-200/50 dark:border-blue-700/50 flex items-center gap-2">
                                <Info className="w-5 h-5 text-indigo-600" />
                                <span className="text-sm">
                                    Modal Akhir : Laba Bersih + Total Modal
                                </span>
                                <span className="ml-auto text-sm font-semibold">
                                    Rp {numberFormat(modalAkhirDisplay)}
                                </span>
                            </div>
                        </Card>
                    </>
                )}

                {activeTab === "neraca" && (
                    <>
                        {/* Form: Input / Update Saldo Awal */}
                        <Card title="Input / Update Saldo Awal (Akun Neraca)">
                            <form
                                onSubmit={handleSaveSaldoAwal}
                                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                            >
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Tahun
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <select
                                            value={thn}
                                            onChange={(e) =>
                                                setThn(e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300"
                                        >
                                            {yearOptions.map((y) => (
                                                <option key={y} value={y}>
                                                    {y}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Kode Akun (kd_rek)
                                    </label>
                                    <input
                                        type="text"
                                        value={saldoForm.kd_rek}
                                        onChange={(e) =>
                                            setSaldoForm((f) => ({
                                                ...f,
                                                kd_rek: e.target.value,
                                            }))
                                        }
                                        placeholder="Mis. 110101"
                                        className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                                            errors.kd_rek
                                                ? "border-red-500 focus:ring-red-300"
                                                : "border-gray-300 focus:ring-indigo-300"
                                        }`}
                                    />
                                    {errors.kd_rek && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.kd_rek}
                                        </p>
                                    )}
                                    {saldoForm.kd_rek && (
                                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                            <Info className="w-3 h-3" />
                                            Kelompok:{" "}
                                            {detectKelompok(saldoForm.kd_rek)}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Saldo Awal
                                    </label>
                                    <input
                                        type="number"
                                        value={saldoForm.saldo_awal}
                                        onChange={(e) =>
                                            setSaldoForm((f) => ({
                                                ...f,
                                                saldo_awal: e.target.value,
                                            }))
                                        }
                                        placeholder="Mis. 1000000"
                                        className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                                            errors.saldo_awal
                                                ? "border-red-500 focus:ring-red-300"
                                                : "border-gray-300 focus:ring-indigo-300"
                                        }`}
                                    />
                                    {errors.saldo_awal && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.saldo_awal}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-3 mt-2 flex items-center gap-3">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                                        title="Simpan/Update saldo awal"
                                    >
                                        <Save className="w-4 h-4" /> Simpan
                                        Saldo Awal
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetSaldoForm}
                                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </form>
                        </Card>

                        {/* Ringkasan Neraca */}
                        <Card title="Ringkasan Neraca">
                            {periodLabel && (
                                <div className="mb-3 text-xs text-gray-600 dark:text-gray-400">
                                    {periodPrefix}:{" "}
                                    {periodValueLabel || periodLabel}
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="rounded-xl p-4 bg-white/70 dark:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50">
                                    <div className="text-xs font-medium text-gray-500">
                                        Aktiva (N/D)
                                    </div>
                                    <div className="text-2xl font-bold">
                                        Rp {numberFormat(summaryNeraca.Aktiva)}
                                    </div>
                                </div>
                                <div className="rounded-xl p-4 bg-white/70 dark:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50">
                                    <div className="text-xs font-medium text-gray-500">
                                        Pasiva (N/K)
                                    </div>
                                    <div className="text-2xl font-bold">
                                        Rp {numberFormat(summaryNeraca.Pasiva)}
                                    </div>
                                </div>
                                <div className="rounded-xl p-4 bg-white/70 dark:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50">
                                    <div className="text-xs font-medium text-gray-500">
                                        Pasiva + Modal Akhir
                                    </div>
                                    <div className="text-2xl font-bold">
                                        Rp{" "}
                                        {numberFormat(
                                            summaryNeraca.PasivaPlusModal
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 rounded-xl p-4 bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-900/40 dark:to-emerald-900/40 border border-green-200/50 dark:border-green-700/50 flex items-center gap-2">
                                {summaryNeraca.keseimbangan ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                ) : (
                                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                                )}
                                <span className="text-sm">
                                    {summaryNeraca.keseimbangan
                                        ? "Neraca seimbang (Aktiva ≈ Pasiva + Modal Akhir)."
                                        : "Perhatian: selisih antara Aktiva dan (Pasiva + Modal Akhir) melebihi toleransi."}
                                </span>
                            </div>
                        </Card>

                        {/* Tabel: Akun Neraca */}
                        <Card title="Saldo Awal, Mutasi, dan Saldo Akhir (Akun Neraca)">
                            {periodLabel && (
                                <div className="mb-3 text-xs text-gray-600 dark:text-gray-400">
                                    {periodPrefix}:{" "}
                                    {periodValueLabel || periodLabel}
                                    {isDailyPeriod && (
                                        <span className="ml-2">
                                            (Hanya transaksi yang terjadi pada
                                            tanggal ini)
                                        </span>
                                    )}
                                </div>
                            )}
                            <form
                                onSubmit={handleSearch}
                                className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3"
                            >
                                <div className="flex items-end gap-2 md:col-span-2">
                                    <div className="flex-1">
                                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                                            Pencarian
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={q}
                                                onChange={(e) =>
                                                    setQ(e.target.value)
                                                }
                                                placeholder="Cari kode/nama/balance…"
                                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 pl-9 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300"
                                            />
                                            <SearchIcon className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                                    >
                                        Cari
                                    </button>
                                    <button
                                        type="button"
                                        onClick={fetchItems}
                                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <RefreshCcw className="w-4 h-4" />{" "}
                                        Refresh
                                    </button>
                                </div>
                                <div className="flex items-end gap-2">
                                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
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
                            </form>

                            <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                                            <TableHead>Kode</TableHead>
                                            <TableHead>Nama Rekening</TableHead>
                                            <TableHead>Tipe</TableHead>
                                            <TableHead>Balance</TableHead>
                                            <TableHead className="text-right">
                                                Saldo Awal
                                            </TableHead>
                                            <TableHead className="text-right">
                                                {isDailyPeriod
                                                    ? "Mutasi Debet (Hari Ini)"
                                                    : "Mutasi Debet (Periode)"}
                                            </TableHead>
                                            <TableHead className="text-right">
                                                {isDailyPeriod
                                                    ? "Mutasi Kredit (Hari Ini)"
                                                    : "Mutasi Kredit (Periode)"}
                                            </TableHead>
                                            <TableHead className="text-right">
                                                {isDailyPeriod
                                                    ? "Transaksi Hari Ini"
                                                    : "Saldo Akhir (Periode)"}
                                            </TableHead>
                                            <TableHead className="text-right">
                                                Aksi
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {loading ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={9}
                                                    className="px-4 py-6 text-center text-gray-500"
                                                >
                                                    Memuat data…
                                                </TableCell>
                                            </TableRow>
                                        ) : itemsN.length ? (
                                            <AnimatePresence>
                                                {itemsN.map((row, idx) => (
                                                    <motion.tr
                                                        key={row.kd_rek}
                                                        initial={{
                                                            opacity: 0,
                                                            x: -20,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            x: 20,
                                                        }}
                                                        transition={{
                                                            delay: idx * 0.02,
                                                        }}
                                                        className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-blue-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200"
                                                    >
                                                        <TableCell className="font-mono">
                                                            {row.kd_rek}
                                                        </TableCell>
                                                        <TableCell>
                                                            {row.nm_rek}
                                                        </TableCell>
                                                        <TableCell>
                                                            {row.tipe}
                                                        </TableCell>
                                                        <TableCell>
                                                            {row.balance === "D"
                                                                ? "Debet"
                                                                : row.balance ===
                                                                  "K"
                                                                ? "Kredit"
                                                                : row.balance}
                                                        </TableCell>
                                                        <TableCell className="text-right font-mono">
                                                            {numberFormat(
                                                                row.saldo_awal
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-right font-mono text-blue-700 dark:text-blue-300">
                                                            {numberFormat(
                                                                row.mutasi_debet
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-right font-mono text-red-700 dark:text-red-300">
                                                            {numberFormat(
                                                                row.mutasi_kredit
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-right font-mono font-semibold">
                                                            {numberFormat(
                                                                isDailyPeriod
                                                                    ? Number(
                                                                          row.mutasi_debet ||
                                                                              0
                                                                      ) -
                                                                          Number(
                                                                              row.mutasi_kredit ||
                                                                                  0
                                                                          )
                                                                    : Number(
                                                                          row.saldo_akhir ||
                                                                              0
                                                                      )
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <div className="flex justify-end gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleEditRow(
                                                                            row
                                                                        )
                                                                    }
                                                                    className="rounded-lg border border-indigo-200 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-50 inline-flex items-center gap-1"
                                                                >
                                                                    <Edit2 className="w-3 h-3" />{" "}
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleDeleteSaldoAwal(
                                                                            row
                                                                        )
                                                                    }
                                                                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 inline-flex items-center gap-1"
                                                                >
                                                                    <Trash2 className="w-3 h-3" />{" "}
                                                                    Hapus
                                                                </button>
                                                            </div>
                                                        </TableCell>
                                                    </motion.tr>
                                                ))}
                                            </AnimatePresence>
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={9}
                                                    className="px-4 py-6"
                                                >
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            y: 10,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        className="flex flex-col items-center justify-center gap-2 text-gray-500"
                                                    >
                                                        <AlertCircle className="w-12 h-12" />
                                                        <span>
                                                            Tidak ada data.
                                                        </span>
                                                    </motion.div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </Card>
                    </>
                )}
            </motion.div>
        </div>
    );
}

NeracaPage.layout = (page) => (
    <SidebarKeuangan title="Keuangan" children={page} />
);
