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

export default function RiwayatTransaksiGudang() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [q, setQ] = useState("");
    const [kodeBrng, setKodeBrng] = useState("");
    const [kdBangsal, setKdBangsal] = useState("");
    const [namaBrng, setNamaBrng] = useState("");
    const [nmBangsal, setNmBangsal] = useState("");
    const [jenisTransaksi, setJenisTransaksi] = useState("");
    const [sumberTransaksi, setSumberTransaksi] = useState("");
    const [noBatch, setNoBatch] = useState("");
    const [noFaktur, setNoFaktur] = useState("");
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
                "/farmasi/riwayat-transaksi-gudang/data",
                {
                    params: {
                        from,
                        to,
                        q,
                        kode_brng: kodeBrng,
                        kd_bangsal: kdBangsal,
                        nama_brng: namaBrng,
                        nm_bangsal: nmBangsal,
                        jenis_transaksi: jenisTransaksi,
                        sumber_transaksi: sumberTransaksi,
                        no_batch: noBatch,
                        no_faktur: noFaktur,
                        page,
                        perPage,
                        ...opts,
                    },
                    headers: { Accept: "application/json" },
                    withCredentials: true,
                }
            );
            setItems(Array.isArray(data?.items) ? data.items : []);
            setTotal(Number(data?.total ?? 0));
        } catch {
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
        setFrom("");
        setTo("");
        setQ("");
        setKodeBrng("");
        setKdBangsal("");
        setNamaBrng("");
        setNmBangsal("");
        setJenisTransaksi("");
        setSumberTransaksi("");
        setNoBatch("");
        setNoFaktur("");
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
            <Head title="Riwayat Transaksi Gudang" />
            <div className="space-y-6">
                <PageHeader
                    title="Riwayat Transaksi Gudang"
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
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filter</h3>
                    </div>
                    <div className="relative p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Tanggal Awal</label>
                                <input
                                    type="date"
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Tanggal Akhir</label>
                                <input
                                    type="date"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Cari Cepat</label>
                                <input
                                    type="text"
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Kode/Nama/Batch/Faktur/Bangsal/User/Keterangan"
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Per Halaman</label>
                                <select
                                    value={perPage}
                                    onChange={(e) => changePerPage(e.target.value)}
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                >
                                    {[10, 25, 50, 100].map((n) => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Kode Barang</label>
                                <input
                                    type="text"
                                    value={kodeBrng}
                                    onChange={(e) => setKodeBrng(e.target.value)}
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Nama Barang</label>
                                <input
                                    type="text"
                                    value={namaBrng}
                                    onChange={(e) => setNamaBrng(e.target.value)}
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Kode Bangsal</label>
                                <input
                                    type="text"
                                    value={kdBangsal}
                                    onChange={(e) => setKdBangsal(e.target.value)}
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Nama Bangsal</label>
                                <input
                                    type="text"
                                    value={nmBangsal}
                                    onChange={(e) => setNmBangsal(e.target.value)}
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Jenis Transaksi</label>
                                <select
                                    value={jenisTransaksi}
                                    onChange={(e) => setJenisTransaksi(e.target.value)}
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                >
                                    <option value="">Semua</option>
                                    <option value="INSERT">INSERT</option>
                                    <option value="UPDATE">UPDATE</option>
                                    <option value="DELETE">DELETE</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Sumber Transaksi</label>
                                <input
                                    type="text"
                                    value={sumberTransaksi}
                                    onChange={(e) => setSumberTransaksi(e.target.value)}
                                    placeholder="Contoh: rawat_jalan, pembelian, opname"
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">No. Batch</label>
                                <input
                                    type="text"
                                    value={noBatch}
                                    onChange={(e) => setNoBatch(e.target.value)}
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">No. Faktur</label>
                                <input
                                    type="text"
                                    value={noFaktur}
                                    onChange={(e) => setNoFaktur(e.target.value)}
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
                    <div className="relative p-2 overflow-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700/50">
                                    <th className="px-3 py-2 text-left font-semibold">Barang</th>
                                    <th className="px-3 py-2 text-left font-semibold">Bangsal</th>
                                    <th className="px-3 py-2 text-left font-semibold">Batch</th>
                                    <th className="px-3 py-2 text-left font-semibold">Faktur</th>
                                    <th className="px-3 py-2 text-left font-semibold">Jenis</th>
                                    <th className="px-3 py-2 text-right font-semibold">Stok Sebelum</th>
                                    <th className="px-3 py-2 text-right font-semibold">Stok Sesudah</th>
                                    <th className="px-3 py-2 text-right font-semibold">Selisih</th>
                                    <th className="px-3 py-2 text-left font-semibold">Sumber</th>
                                    <th className="px-3 py-2 text-left font-semibold">User</th>
                                    <th className="px-3 py-2 text-left font-semibold">Waktu</th>
                                    <th className="px-3 py-2 text-left font-semibold">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading &&
                                    [...Array(5).keys()].map((i) => (
                                        <tr key={`s-${i}`} className="animate-pulse">
                                            {[...Array(12).keys()].map((j) => (
                                                <td key={j} className="px-3 py-2">
                                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                {!loading && items.length === 0 && (
                                    <tr>
                                        <td colSpan={12} className="px-3 py-4 text-center text-gray-600 dark:text-gray-300">
                                            Tidak ada data
                                        </td>
                                    </tr>
                                )}
                                <AnimatePresence>
                                    {!loading &&
                                        items.map((row, idx) => (
                                            <motion.tr
                                                key={`${row.kode_brng}_${row.kd_bangsal}_${row.no_batch}_${row.no_faktur}_${idx}`}
                                                className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200 cursor-pointer"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ delay: idx * 0.02 }}
                                                whileHover={{ scale: 1.01 }}
                                            >
                                                <td className="px-3 py-2">{row.kode_brng} {row.nama_brng}</td>
                                                <td className="px-3 py-2">{row.kd_bangsal} {row.nm_bangsal}</td>
                                                <td className="px-3 py-2">{row.no_batch || ''}</td>
                                                <td className="px-3 py-2">{row.no_faktur || ''}</td>
                                                <td className="px-3 py-2">{row.jenis_transaksi}</td>
                                                <td className="px-3 py-2 text-right">{row.stok_sebelum ?? 0}</td>
                                                <td className="px-3 py-2 text-right">{row.stok_sesudah ?? 0}</td>
                                                <td className="px-3 py-2 text-right">{row.selisih ?? 0}</td>
                                                <td className="px-3 py-2">{row.sumber_transaksi}</td>
                                                <td className="px-3 py-2">{row.user_name || '-'}</td>
                                                <td className="px-3 py-2">{row.waktu_transaksi}</td>
                                                <td className="px-3 py-2">{row.keterangan || ''}</td>
                                            </motion.tr>
                                        ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between p-4 border-t border-gray-100 dark:border-gray-700/50">
                        <div className="text-sm text-gray-600 dark:text-gray-300">Halaman {page} dari {Math.max(1, Math.ceil((total || 0) / perPage))}</div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={prevPage}
                                className="px-3 py-1.5 rounded border text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                Sebelumnya
                            </button>
                            <button
                                onClick={nextPage}
                                className="px-3 py-1.5 rounded border text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                Berikutnya
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarFarmasi>
    );
}
