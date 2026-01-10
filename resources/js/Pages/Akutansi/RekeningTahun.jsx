import React, { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import SearchableSelect from "@/Components/SearchableSelect";
import {
    Calendar,
    Search as SearchIcon,
    RefreshCcw,
    Save,
    Edit2,
    Info,
    AlertCircle,
} from "lucide-react";

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

export default function RekeningTahunPage() {
    const currentYear = new Date().getFullYear();
    const [thn, setThn] = useState(String(currentYear));
    const [q, setQ] = useState("");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form tambah/edit saldo awal
    const [saldoForm, setSaldoForm] = useState({
        kd_rek: "",
        nm_rek: "",
        saldo_awal: "",
    });
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    const yearOptions = useMemo(() => {
        // Range tahun sederhana: currentYear-5 .. currentYear+1
        const start = currentYear - 5;
        const end = currentYear + 1;
        const list = [];
        for (let y = end; y >= start; y--) list.push(String(y));
        return list;
    }, [currentYear]);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/akutansi/rekeningtahun", {
                params: { thn, q },
            });
            const payload = res.data || {};
            const rows = Array.isArray(payload.items) ? payload.items : [];
            setItems(rows);
        } catch (e) {
            console.error("Gagal memuat Rekening Tahun:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [thn]);

    const handleSearch = async (e) => {
        e.preventDefault();
        await fetchItems();
    };

    const resetSaldoForm = () => {
        setSaldoForm({ kd_rek: "", nm_rek: "", saldo_awal: "" });
        setErrors({});
    };

    const validateSaldoForm = () => {
        const errs = {};
        if (!saldoForm.kd_rek?.trim()) errs.kd_rek = "Akun wajib dipilih";
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

    return (
        <div>
            <Head title="Keuangan - Rekening Tahun" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
                className="space-y-6"
            >
                {/* Header Card */}
                <Card>
                    <div className="relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
                        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="flex items-center gap-3">
                                <motion.div
                                    className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <Calendar className="w-6 h-6 text-white" />
                                </motion.div>
                                <motion.h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Rekening Tahun
                                </motion.h1>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                <Info className="w-4 h-4" />
                                Kelola saldo awal per tahun dan lihat mutasi
                                debet/kredit serta saldo akhir per akun.
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Form: Input/Update Saldo Awal */}
                <Card title="Input / Update Saldo Awal">
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
                                    onChange={(e) => setThn(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-300"
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
                                Akun Rekening
                            </label>
                            <SearchableSelect
                                source="rekening"
                                value={saldoForm.kd_rek}
                                onChange={(val) =>
                                    setSaldoForm((f) => ({ ...f, kd_rek: val }))
                                }
                                onSelect={(opt) =>
                                    setSaldoForm((f) => ({
                                        ...f,
                                        kd_rek: opt?.kd_rek || "",
                                        nm_rek: opt?.nm_rek || "",
                                    }))
                                }
                                placeholder="Pilih akun…"
                                searchPlaceholder="Cari kode/nama akun…"
                                error={!!errors.kd_rek}
                                className="bg-white/90 dark:bg-gray-700/90"
                            />
                            {errors.kd_rek && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.kd_rek}
                                </p>
                            )}
                            {saldoForm.nm_rek && (
                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    <Info className="w-3 h-3" />
                                    {saldoForm.kd_rek} — {saldoForm.nm_rek}
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
                                        : "border-gray-300 focus:ring-blue-300"
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
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                                title="Simpan/Update saldo awal"
                            >
                                <Save className="w-4 h-4" /> Simpan Saldo Awal
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

                {/* Tabel: Rekening Tahun */}
                <Card title="Saldo Awal, Mutasi, dan Saldo Akhir">
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
                                        onChange={(e) => setQ(e.target.value)}
                                        placeholder="Cari kode/nama/tipe/balance…"
                                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 pl-9 text-sm shadow-sm focus:ring-2 focus:ring-blue-300"
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
                                <RefreshCcw className="w-4 h-4" /> Refresh
                            </button>
                        </div>
                        <div className="flex items-end gap-2">
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                                Tahun
                            </label>
                            <select
                                value={thn}
                                onChange={(e) => setThn(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-300"
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
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        Kode
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        Nama Rekening
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        Tipe
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        Balance
                                    </th>
                                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        Saldo Awal
                                    </th>
                                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        Mutasi Debet
                                    </th>
                                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        Mutasi Kredit
                                    </th>
                                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        Saldo Akhir
                                    </th>
                                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="px-4 py-6 text-center text-gray-500"
                                        >
                                            Memuat data…
                                        </td>
                                    </tr>
                                ) : items.length ? (
                                    <AnimatePresence>
                                        {items.map((row, idx) => (
                                            <motion.tr
                                                key={row.kd_rek}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{
                                                    delay: idx * 0.02,
                                                }}
                                                className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200"
                                            >
                                                <td className="px-4 py-2 font-mono">
                                                    {row.kd_rek}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {row.nm_rek}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {row.tipe}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {row.balance === "D"
                                                        ? "Debet"
                                                        : row.balance === "K"
                                                        ? "Kredit"
                                                        : row.balance}
                                                </td>
                                                <td className="px-4 py-2 text-right font-mono">
                                                    {numberFormat(
                                                        row.saldo_awal
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 text-right font-mono text-blue-700 dark:text-blue-300">
                                                    {numberFormat(
                                                        row.mutasi_debet
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 text-right font-mono text-red-700 dark:text-red-300">
                                                    {numberFormat(
                                                        row.mutasi_kredit
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 text-right font-mono font-semibold">
                                                    {numberFormat(
                                                        row.saldo_akhir
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleEditRow(row)
                                                        }
                                                        className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50 inline-flex items-center gap-1"
                                                    >
                                                        <Edit2 className="w-3 h-3" />{" "}
                                                        Edit Saldo Awal
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                ) : (
                                    <tr>
                                        <td colSpan={9} className="px-4 py-6">
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex flex-col items-center justify-center gap-2 text-gray-500"
                                            >
                                                <AlertCircle className="w-12 h-12" />
                                                <span>Tidak ada data.</span>
                                            </motion.div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}

RekeningTahunPage.layout = (page) => (
    <SidebarKeuangan title="Keuangan" children={page} />
);
