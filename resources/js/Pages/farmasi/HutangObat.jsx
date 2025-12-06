import React, { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import { route } from "ziggy-js";
import axios from "axios";
import SidebarFarmasi from "@/Layouts/SidebarFarmasi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function currency(n) {
    try {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(Number(n || 0));
    } catch (_) {
        return String(n || 0);
    }
}

export default function HutangObat() {
    const [filters, setFilters] = useState({
        q: "",
        status: "Belum Dibayar",
        per_page: 20,
        tgl_dari: "",
        tgl_sampai: "",
    });
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [meta, setMeta] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
    });
    const [selected, setSelected] = useState(null);
    const [akunBayar, setAkunBayar] = useState([]);
    const [kdRekBayar, setKdRekBayar] = useState("");
    const [nominal, setNominal] = useState(0);
    const [staging, setStaging] = useState(null);
    const [postingResult, setPostingResult] = useState(null);
    const [error, setError] = useState("");

    const loadList = async (page = 1) => {
        setLoading(true);
        setError("");
        try {
            const url = route("api.farmasi.hutang.index");
            const { data } = await axios.get(url, {
                params: { ...filters, page },
            });
            setList(Array.isArray(data.data) ? data.data : []);
            setMeta(
                data.meta || { current_page: page, last_page: 1, total: 0 }
            );
        } catch (e) {
            setError(
                e?.response?.data?.message ||
                    e?.message ||
                    "Gagal memuat data hutang"
            );
        } finally {
            setLoading(false);
        }
    };

    const loadAkunBayar = async () => {
        try {
            const url = route("api.pembelian.akun-bayar");
            const { data } = await axios.get(url);
            setAkunBayar(Array.isArray(data.data) ? data.data : []);
        } catch (_) {}
    };

    useEffect(() => {
        loadList(1);
        loadAkunBayar();
    }, []);

    const onSearch = async (e) => {
        e.preventDefault();
        await loadList(1);
    };

    const onSelectRow = (row) => {
        setSelected(row);
        setNominal(Number(row?.tagihan || 0));
        setPostingResult(null);
        setStaging(null);
    };

    const doStage = async () => {
        if (!selected) return;
        if (!kdRekBayar) {
            setError("Pilih Akun Bayar terlebih dahulu");
            return;
        }
        setError("");
        try {
            const url = route("api.farmasi.hutang.stage");
            const { data } = await axios.post(url, {
                no_faktur: selected.no_faktur,
                kd_rek_bayar: kdRekBayar,
                nominal: Number(nominal || 0),
                reset: true,
            });
            setStaging(data.preview || null);
        } catch (e) {
            setError(
                e?.response?.data?.message ||
                    e?.message ||
                    "Gagal menyusun staging pelunasan"
            );
        }
    };

    const doPost = async () => {
        if (!selected) return;
        setError("");
        try {
            const url = route("api.akutansi.jurnal.post");
            const { data } = await axios.post(url, {
                no_bukti: selected.no_faktur,
                keterangan: `Pelunasan Hutang Obat ${selected.no_faktur}`,
                tgl_jurnal: new Date().toISOString().slice(0, 10),
            });
            setPostingResult(data || {});

            const markUrl = route("api.farmasi.hutang.mark-paid", {
                no_faktur: selected.no_faktur,
            });
            await axios.patch(markUrl, {
                tgl_bayar: new Date().toISOString().slice(0, 10),
            });
            await loadList(meta.current_page || 1);
        } catch (e) {
            setError(
                e?.response?.data?.message ||
                    e?.message ||
                    "Gagal posting jurnal pelunasan"
            );
        }
    };

    const badge = (text, cls) => (
        <span
            className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${cls}`}
        >
            {text}
        </span>
    );

    const previewBalanced = useMemo(() => {
        const meta = staging?.meta;
        return !!(meta && meta.balanced);
    }, [staging]);
    const totalTagihanPage = useMemo(
        () => list.reduce((acc, cur) => acc + Number(cur?.tagihan || 0), 0),
        [list]
    );
    const totalFakturPage = useMemo(() => list.length, [list]);

    const akunBayarUnique = useMemo(() => {
        const seen = new Set();
        const res = [];
        for (const a of akunBayar) {
            const key = String(a?.kd_rek || "");
            if (key && !seen.has(key)) {
                seen.add(key);
                res.push(a);
            } else if (!key) {
                res.push(a);
            }
        }
        return res;
    }, [akunBayar]);

    return (
        <SidebarFarmasi title="Farmasi">
            <Head title="Hutang Obat" />
            <div className="p-6">
                <div className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Hutang Obat
                            </h1>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Daftar pemesanan belum dibayar dan proses
                                pelunasan dengan posting jurnal.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            {badge("GET", "bg-blue-600/10 text-blue-700")}
                            {badge("POST", "bg-indigo-600/10 text-indigo-700")}
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-4">
                        <div className="text-xs font-medium text-slate-600">
                            Total Tagihan (halaman ini)
                        </div>
                        <div className="mt-1 text-2xl font-semibold text-slate-900">
                            {currency(totalTagihanPage)}
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-4">
                        <div className="text-xs font-medium text-slate-600">
                            Jumlah Faktur
                        </div>
                        <div className="mt-1 text-2xl font-semibold text-slate-900">
                            {totalFakturPage}
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-0">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                            <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <span className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
                                        <MagnifyingGlassIcon className="w-4 h-4 text-white" />
                                    </span>
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        Filter Hutang Obat
                                    </span>
                                </h3>
                            </div>
                            <div className="p-4">
                                <form
                                    onSubmit={onSearch}
                                    className="grid grid-cols-1 md:grid-cols-6 gap-3"
                                >
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                            Cari
                                        </label>
                                        <input
                                            value={filters.q}
                                            onChange={(e) =>
                                                setFilters((f) => ({
                                                    ...f,
                                                    q: e.target.value,
                                                }))
                                            }
                                            type="text"
                                            placeholder="no faktur / supplier"
                                            className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ease-out hover:border-blue-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                            Status
                                        </label>
                                        <select
                                            value={filters.status}
                                            onChange={(e) =>
                                                setFilters((f) => ({
                                                    ...f,
                                                    status: e.target.value,
                                                }))
                                            }
                                            className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ease-out hover:border-blue-400"
                                        >
                                            {[
                                                "Belum Dibayar",
                                                "Titip Faktur",
                                                "Sudah Dibayar",
                                            ].map((s) => (
                                                <option key={s} value={s}>
                                                    {s}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                            Per Halaman
                                        </label>
                                        <select
                                            value={filters.per_page}
                                            onChange={(e) =>
                                                setFilters((f) => ({
                                                    ...f,
                                                    per_page: Number(
                                                        e.target.value
                                                    ),
                                                }))
                                            }
                                            className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ease-out hover:border-blue-400"
                                        >
                                            {[10, 20, 50].map((n) => (
                                                <option key={n} value={n}>
                                                    {n}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                            Dari Tanggal
                                        </label>
                                        <input
                                            type="date"
                                            value={filters.tgl_dari}
                                            onChange={(e) =>
                                                setFilters((f) => ({
                                                    ...f,
                                                    tgl_dari: e.target.value,
                                                }))
                                            }
                                            className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ease-out hover:border-blue-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                            Sampai Tanggal
                                        </label>
                                        <input
                                            type="date"
                                            value={filters.tgl_sampai}
                                            onChange={(e) =>
                                                setFilters((f) => ({
                                                    ...f,
                                                    tgl_sampai: e.target.value,
                                                }))
                                            }
                                            className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ease-out hover:border-blue-400"
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button
                                            type="submit"
                                            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                                        >
                                            Cari
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-0">
                            <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                No Faktur
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Supplier
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tagihan
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white/70 dark:bg-gray-900/50 divide-y divide-gray-200 dark:divide-gray-700">
                                        {loading ? (
                                            [...Array(6)].map((_, idx) => (
                                                <tr key={`skeleton-${idx}`}>
                                                    <td className="px-4 py-2">
                                                        <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <div className="h-5 w-20 bg-slate-200 rounded-full animate-pulse" />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <div className="h-6 w-16 bg-slate-200 rounded-lg animate-pulse" />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : list.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={6}
                                                    className="px-4 py-6 text-center text-sm text-slate-500"
                                                >
                                                    Tidak ada data
                                                </td>
                                            </tr>
                                        ) : (
                                            list.map((row) => (
                                                <tr
                                                    key={row.no_faktur}
                                                    className={
                                                        selected?.no_faktur ===
                                                        row.no_faktur
                                                            ? "bg-indigo-50"
                                                            : ""
                                                    }
                                                >
                                                    <td className="px-4 py-2 text-sm text-slate-800">
                                                        {row.tgl_pesan || "-"}
                                                    </td>
                                                    <td className="px-4 py-2 text-sm font-semibold text-slate-900">
                                                        {row.no_faktur}
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-slate-800">
                                                        {row.supplier ||
                                                            row.kode_suplier ||
                                                            "-"}
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-slate-800">
                                                        {currency(row.tagihan)}
                                                    </td>
                                                    <td className="px-4 py-2 text-xs">
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${
                                                                row.status ===
                                                                "Belum Dibayar"
                                                                    ? "bg-amber-100 text-amber-700"
                                                                    : row.status ===
                                                                      "Sudah Dibayar"
                                                                    ? "bg-emerald-100 text-emerald-700"
                                                                    : "bg-slate-100 text-slate-700"
                                                            }`}
                                                        >
                                                            {row.status || "-"}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2 text-sm">
                                                        <button
                                                            onClick={() =>
                                                                onSelectRow(row)
                                                            }
                                                            className="rounded-md bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                                                        >
                                                            Pilih
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t">
                                <div className="text-xs text-slate-600">
                                    Halaman {meta.current_page} dari{" "}
                                    {meta.last_page} • Total {meta.total}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() =>
                                            loadList(
                                                Math.max(
                                                    1,
                                                    (meta.current_page || 1) - 1
                                                )
                                            )
                                        }
                                        disabled={
                                            (meta.current_page || 1) <= 1 ||
                                            loading
                                        }
                                        className="rounded-lg bg-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-300 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        Sebelumnya
                                    </button>
                                    <button
                                        onClick={() =>
                                            loadList(
                                                Math.min(
                                                    meta.last_page || 1,
                                                    (meta.current_page || 1) + 1
                                                )
                                            )
                                        }
                                        disabled={
                                            (meta.current_page || 1) >=
                                                (meta.last_page || 1) || loading
                                        }
                                        className="rounded-lg bg-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-300 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        Berikutnya
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-4">
                            <h3 className="text-sm font-semibold text-slate-800">
                                Panel Pelunasan
                            </h3>
                            {!selected ? (
                                <div className="mt-2 text-sm text-slate-500">
                                    Pilih salah satu faktur untuk melanjutkan.
                                </div>
                            ) : (
                                <div className="mt-3 space-y-3">
                                    <div className="text-sm text-slate-700">
                                        No Faktur:{" "}
                                        <span className="font-semibold">
                                            {selected.no_faktur}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                                Akun Bayar
                                            </label>
                                            <select
                                                value={kdRekBayar}
                                                onChange={(e) =>
                                                    setKdRekBayar(
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ease-out hover:border-blue-400"
                                            >
                                                <option value="">
                                                    Pilih akun…
                                                </option>
                                                {akunBayarUnique.map((a) => (
                                                    <option
                                                        key={a.kd_rek}
                                                        value={a.kd_rek}
                                                    >
                                                        {a.nama_bayar ||
                                                            a.nm_rek ||
                                                            a.kd_rek}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                                Nominal
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={nominal}
                                                onChange={(e) =>
                                                    setNominal(e.target.value)
                                                }
                                                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ease-out hover:border-blue-400"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={doStage}
                                            className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                                        >
                                            Stage
                                        </button>
                                        <button
                                            onClick={doPost}
                                            disabled={!previewBalanced}
                                            className={`rounded-md px-3 py-1.5 text-xs font-medium text-white focus:outline-none ${
                                                previewBalanced
                                                    ? "bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500/50"
                                                    : "bg-gray-400 cursor-not-allowed"
                                            }`}
                                        >
                                            Posting
                                        </button>
                                    </div>
                                    {error && (
                                        <div className="text-xs text-rose-600">
                                            {error}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-4">
                            <h3 className="text-sm font-semibold text-slate-800">
                                Preview Jurnal
                            </h3>
                            {!staging ? (
                                <div className="mt-2 text-sm text-slate-500">
                                    Belum ada staging.
                                </div>
                            ) : (
                                <div className="mt-3 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="text-xs text-slate-600">
                                            Debet:{" "}
                                            <span className="font-semibold text-slate-800">
                                                {currency(staging.meta?.debet)}
                                            </span>
                                        </div>
                                        <div className="text-xs text-slate-600">
                                            Kredit:{" "}
                                            <span className="font-semibold text-slate-800">
                                                {currency(staging.meta?.kredit)}
                                            </span>
                                        </div>
                                        <div className="text-xs">
                                            {previewBalanced
                                                ? badge(
                                                      "Balanced",
                                                      "bg-emerald-100 text-emerald-700"
                                                  )
                                                : badge(
                                                      "Unbalanced",
                                                      "bg-rose-100 text-rose-700"
                                                  )}
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                        <table className="min-w-full text-xs">
                                            <thead>
                                                <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                                                    <th className="px-3 py-1 text-left font-medium text-gray-600">
                                                        Akun
                                                    </th>
                                                    <th className="px-3 py-1 text-right font-medium text-gray-600">
                                                        Debet
                                                    </th>
                                                    <th className="px-3 py-1 text-right font-medium text-gray-600">
                                                        Kredit
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                                {(staging.lines || []).map(
                                                    (l, idx) => (
                                                        <tr
                                                            key={`${l.kd_rek}-${idx}`}
                                                        >
                                                            <td className="px-3 py-1">
                                                                {l.kd_rek}{" "}
                                                                {l.nm_rek
                                                                    ? `- ${l.nm_rek}`
                                                                    : ""}
                                                            </td>
                                                            <td className="px-3 py-1 text-right">
                                                                {currency(
                                                                    l.debet
                                                                )}
                                                            </td>
                                                            <td className="px-3 py-1 text-right">
                                                                {currency(
                                                                    l.kredit
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-4">
                            <h3 className="text-sm font-semibold text-slate-800">
                                Hasil Posting
                            </h3>
                            {!postingResult ? (
                                <div className="mt-2 text-sm text-slate-500">
                                    Belum ada hasil posting.
                                </div>
                            ) : (
                                <div className="mt-3 text-sm text-slate-700">
                                    No Jurnal:{" "}
                                    <span className="font-semibold">
                                        {postingResult.no_jurnal || "-"}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </SidebarFarmasi>
    );
}
