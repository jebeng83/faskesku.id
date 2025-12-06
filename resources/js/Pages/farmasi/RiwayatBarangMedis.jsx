import React, { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import SidebarFarmasi from "@/Layouts/SidebarFarmasi";
import { motion, AnimatePresence } from "framer-motion";

const PageHeader = ({ title, meta, right }) => (
    <motion.div
        className="relative px-6 py-4 mb-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
        <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
                <motion.h1
                    className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {title}
                </motion.h1>
                {meta && (
                    <div className="mt-0.5 text-xs text-gray-600 dark:text-gray-300 truncate">
                        {meta}
                    </div>
                )}
            </div>
            {right}
        </div>
    </motion.div>
);

const nowDate = () => new Date().toISOString().slice(0, 10);

export default function RiwayatBarangMedis() {
    const [from, setFrom] = useState(nowDate());
    const [to, setTo] = useState(nowDate());
    const [q, setQ] = useState("");
    const [kodeBrng, setKodeBrng] = useState("");
    const [kdBangsal, setKdBangsal] = useState("");
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [loading, setLoading] = useState(false);

    const metaText = useMemo(() => `Total ${total} baris`, [total]);

    const fetchData = async (opts) => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                "/farmasi/riwayat-barang-medis/data",
                {
                    params: {
                        from,
                        to,
                        q,
                        kode_brng: kodeBrng,
                        kd_bangsal: kdBangsal,
                        page,
                        perPage,
                        ...opts,
                    },
                }
            );
            setItems(Array.isArray(data?.items) ? data.items : []);
            setTotal(Number(data?.total ?? 0));
        } catch (e) {
            setItems([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const triggerSearch = () => {
        setPage(1);
        fetchData({ page: 1 });
    };

    const resetFilters = () => {
        setFrom(nowDate());
        setTo(nowDate());
        setQ("");
        setKodeBrng("");
        setKdBangsal("");
        setPage(1);
        setPerPage(25);
        fetchData({ page: 1, perPage: 25 });
    };

    const changePerPage = (val) => {
        const n = Number(val);
        setPerPage(n);
        setPage(1);
        fetchData({ perPage: n, page: 1 });
    };

    const prevPage = () => {
        if (page <= 1) return;
        const p = page - 1;
        setPage(p);
        fetchData({ page: p });
    };

    const nextPage = () => {
        const maxPage = Math.ceil((total || 0) / perPage);
        if (page >= maxPage) return;
        const p = page + 1;
        setPage(p);
        fetchData({ page: p });
    };

    return (
        <SidebarFarmasi title="Farmasi">
            <Head title="Riwayat Barang Medis" />
            <div className="space-y-6">
                <PageHeader
                    title="Riwayat Barang Medis"
                    meta={metaText}
                    right={
                        <div className="flex items-center gap-2">
                            <button
                                onClick={triggerSearch}
                                className="rounded-lg px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
                            >
                                Cari
                            </button>
                            <button
                                onClick={resetFilters}
                                className="rounded-lg px-4 py-2.5 text-sm font-semibold bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Reset
                            </button>
                        </div>
                    }
                />

                <motion.div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                    <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Filter
                        </h3>
                    </div>
                    <div className="relative p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Tanggal Awal
                                </label>
                                <input
                                    type="date"
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Tanggal Akhir
                                </label>
                                <input
                                    type="date"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Kata Kunci
                                </label>
                                <input
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Kode/Nama/Petugas/Lokasi..."
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                        Kode Barang
                                    </label>
                                    <input
                                        value={kodeBrng}
                                        onChange={(e) =>
                                            setKodeBrng(e.target.value)
                                        }
                                        placeholder="Mis. OB001"
                                        className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                        Kode Lokasi
                                    </label>
                                    <input
                                        value={kdBangsal}
                                        onChange={(e) =>
                                            setKdBangsal(e.target.value)
                                        }
                                        placeholder="Mis. GD01"
                                        className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                            Baris per halaman
                        </span>
                        <select
                            value={perPage}
                            onChange={(e) => changePerPage(e.target.value)}
                            className="rounded-lg border px-3 py-2 text-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                        >
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={prevPage}
                            className="rounded-lg px-3 py-1.5 text-sm bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Sebelumnya
                        </button>
                        <span className="text-sm text-gray-600">
                            Hal {page} dari{" "}
                            {Math.max(1, Math.ceil((total || 0) / perPage))}
                        </span>
                        <button
                            onClick={nextPage}
                            className="rounded-lg px-3 py-1.5 text-sm bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Berikutnya
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                                <th className="px-3 py-2 text-left font-semibold">
                                    Barang
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Awal
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Masuk
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Keluar
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Akhir
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Posisi
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Tanggal
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Jam
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Petugas
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Lokasi
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Status
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    No.Batch
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    No.Faktur
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Keterangan
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading &&
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr
                                        key={`s-${i}`}
                                        className="animate-pulse"
                                    >
                                        {Array.from({ length: 14 }).map(
                                            (__, j) => (
                                                <td
                                                    key={j}
                                                    className="px-3 py-2"
                                                >
                                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                ))}
                            {!loading && items.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={14}
                                        className="px-3 py-4 text-center text-gray-600 dark:text-gray-300"
                                    >
                                        Tidak ada data
                                    </td>
                                </tr>
                            )}
                            <AnimatePresence>
                                {!loading &&
                                    items.map((row, idx) => (
                                        <motion.tr
                                            key={`${row.kode_brng}_${idx}`}
                                            className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200 cursor-pointer"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ delay: idx * 0.02 }}
                                            whileHover={{ scale: 1.01 }}
                                        >
                                            <td className="px-3 py-2">
                                                {row.kode_brng} {row.nama_brng}
                                            </td>
                                            <td className="px-3 py-2">
                                                {row.stok_awal}
                                            </td>
                                            <td className="px-3 py-2">
                                                {row.masuk}
                                            </td>
                                            <td className="px-3 py-2">
                                                {row.keluar}
                                            </td>
                                            <td className="px-3 py-2">
                                                {row.stok_akhir}
                                            </td>
                                            <td className="px-3 py-2">
                                                {row.posisi}
                                            </td>
                                            <td className="px-3 py-2">
                                                {row.tanggal}
                                            </td>
                                            <td className="px-3 py-2">
                                                {row.jam}
                                            </td>
                                            <td className="px-3 py-2">
                                                {row.petugas}
                                            </td>
                                            <td className="px-3 py-2">
                                                {row.kd_bangsal}{" "}
                                                {row.nm_bangsal}
                                            </td>
                                            <td className="px-3 py-2">
                                                {row.status}
                                            </td>
                                            <td className="px-3 py-2">
                                                {row.no_batch}
                                            </td>
                                            <td className="px-3 py-2">
                                                {row.no_faktur}
                                            </td>
                                            <td className="px-3 py-2">
                                                {row.keterangan}
                                            </td>
                                        </motion.tr>
                                    ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </SidebarFarmasi>
    );
}
