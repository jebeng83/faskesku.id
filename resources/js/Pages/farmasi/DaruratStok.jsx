import React, { useEffect, useMemo, useRef, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import SidebarFarmasi from "@/Layouts/SidebarFarmasi";
import SearchableSelect from "@/Components/SearchableSelect";
import { motion } from "motion/react";

export default function DaruratStok() {
    const [jenis, setJenis] = useState("");
    const [kategori, setKategori] = useState("");
    const [golongan, setGolongan] = useState("");
    const [q, setQ] = useState("");
    const [kdBangsal, setKdBangsal] = useState("");
    const [nmBangsal, setNmBangsal] = useState("");
    const [batchOn, setBatchOn] = useState(false);
    const [gudangs, setGudangs] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const requestIdRef = useRef(0);
    const controllerRef = useRef(null);

    const fetchData = async (opts) => {
        const id = requestIdRef.current + 1;
        requestIdRef.current = id;
        if (controllerRef.current) {
            try {
                controllerRef.current.abort();
            } catch {}
        }
        const ac = new AbortController();
        controllerRef.current = ac;
        setLoading(true);
        try {
            const { data } = await axios.get("/farmasi/darurat-stok/data", {
                params: {
                    jenis,
                    kategori,
                    golongan,
                    q,
                    kd_bangsal: kdBangsal,
                    batch: batchOn ? "on" : "off",
                    page: opts && opts.page ? opts.page : page,
                    per_page: opts && opts.per_page ? opts.per_page : perPage,
                },
                headers: { Accept: "application/json" },
                withCredentials: true,
                signal: ac.signal,
            });
            if (id !== requestIdRef.current) return;
            const gs = Array.isArray(data?.gudangs) ? data.gudangs : [];
            const it = data?.items ?? [];
            setGudangs(gs);
            setItems(it);
        } catch (e) {
            if (id !== requestIdRef.current) return;
            setGudangs([]);
            setItems([]);
        } finally {
            if (id === requestIdRef.current) setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setPage(1);
        fetchData({ page: 1 });
    }, [kdBangsal]);

    const triggerSearch = () => {
        setPage(1);
        fetchData({ page: 1 });
    };

    const resetFilters = () => {
        setJenis("");
        setKategori("");
        setGolongan("");
        setQ("");
        setKdBangsal("");
        setNmBangsal("");
        setPage(1);
        fetchData({ jenis: "", kategori: "", golongan: "", q: "", page: 1 });
    };

    const cols = useMemo(() => {
        const awal = [
            { key: "kode_brng", label: "Kode Barang" },
            { key: "nama_brng", label: "Nama Barang" },
            { key: "lokasi", label: "Lokasi" },
        ];
        const akhir = [
            { key: "satuan", label: "Satuan" },
            { key: "jenis", label: "Jenis" },
            { key: "stok_minimal", label: "Minimal" },
        ];
        if (kdBangsal) {
            return [
                ...awal,
                ...akhir,
                { key: "stok_saat_ini", label: "Saat Ini" },
            ];
        }
        const dynamic = (gudangs || []).map((g) => ({
            key: `gd_${g.kd_bangsal}`,
            label: g.nm_bangsal,
        }));
        return [
            ...awal,
            ...akhir,
            ...dynamic,
            { key: "stok_saat_ini", label: "Saat Ini" },
        ];
    }, [gudangs, kdBangsal]);

    const rows = useMemo(() => {
        const base = Array.isArray(items)
            ? items
            : items && Array.isArray(items.data)
            ? items.data
            : [];
        return base.filter((row) => Number(row.stok_minimal || 0) > 0);
    }, [items]);

    const paginator = useMemo(() => {
        return Array.isArray(items) ? null : items;
    }, [items]);

    const pageLinks = useMemo(() => {
        if (
            paginator &&
            Array.isArray(paginator.links) &&
            paginator.links.length > 0
        ) {
            return paginator.links;
        }
        if (
            paginator &&
            typeof paginator.current_page === "number" &&
            typeof paginator.last_page === "number" &&
            paginator.last_page > 1
        ) {
            const arr = [];
            for (let n = 1; n <= paginator.last_page; n++) {
                arr.push({
                    url: `?page=${n}`,
                    label: String(n),
                    active: paginator.current_page === n,
                });
            }
            return arr;
        }
        return [];
    }, [paginator]);

    const gotoPageFromUrl = (url) => {
        if (!url) return;
        try {
            const u = new URL(url, window.location.origin);
            const p = Number(u.searchParams.get("page")) || 1;
            setPage(p);
            fetchData({ page: p });
        } catch {}
    };

    return (
        <SidebarFarmasi title="Farmasi">
            <Head title="Darurat Stok" />
            <div className="space-y-6">
                <div className="px-6 py-4 mb-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 rounded-lg">
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                :: Data Obat Kurang Dari Stok Minimal ::
                            </h1>
                            <div className="mt-2 flex flex-wrap gap-2">
                                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200 border border-blue-100 dark:border-blue-900">
                                    {kdBangsal
                                        ? `${kdBangsal}${nmBangsal ? " — " + nmBangsal : ""}`
                                        : "Lokasi belum dipilih"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 border border-white/20 dark:border-gray-700/50">
                    <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filter</h3>
                    </div>
                    <div className="relative p-6">
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Jenis</label>
                                <SearchableSelect
                                    source="farmasi_jenis"
                                    value={jenis}
                                    onChange={setJenis}
                                    placeholder="Pilih jenis obat"
                                    searchPlaceholder="Ketik nama atau kode jenis..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Kategori</label>
                                <SearchableSelect
                                    source="farmasi_kategori"
                                    value={kategori}
                                    onChange={setKategori}
                                    placeholder="Pilih kategori obat"
                                    searchPlaceholder="Ketik nama atau kode kategori..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Golongan</label>
                                <SearchableSelect
                                    source="farmasi_golongan"
                                    value={golongan}
                                    onChange={setGolongan}
                                    placeholder="Pilih golongan obat"
                                    searchPlaceholder="Ketik nama atau kode golongan..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Lokasi</label>
                                <SearchableSelect
                                    source="bangsal"
                                    value={kdBangsal}
                                    onChange={setKdBangsal}
                                    onSelect={(opt) => {
                                        const label = typeof opt === "string" ? opt : opt?.label || "";
                                        const parts = label.split(" — ");
                                        setNmBangsal(parts.length > 1 ? parts[1] : "");
                                    }}
                                    placeholder="Pilih lokasi gudang/depo"
                                    searchPlaceholder="Ketik nama lokasi"
                                    defaultDisplay={kdBangsal && nmBangsal ? `${kdBangsal} — ${nmBangsal}` : null}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Kata Kunci</label>
                                <input
                                    type="text"
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Cari kode/nama/jenis barang"
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                    aria-label="Cari barang"
                                />
                            </div>
                            <div className="flex flex-wrap items-end justify-end gap-2">
                                <button
                                    onClick={triggerSearch}
                                    className="rounded-lg px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white"
                                    aria-label="Cari data"
                                >
                                    Cari
                                </button>
                                <button
                                    onClick={resetFilters}
                                    className="rounded-lg px-4 py-2.5 text-sm font-semibold bg-white/90 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-200"
                                    aria-label="Reset filter"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                                {cols.map((c) => (
                                    <th key={c.key} className="px-3 py-2 text-left font-semibold">{c.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr className="animate-pulse">
                                    {cols.map((c) => (
                                        <td key={c.key} className="px-3 py-2"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" /></td>
                                    ))}
                                </tr>
                            )}
                            {!loading && rows.length === 0 && (
                                <tr>
                                    <td colSpan={cols.length} className="px-3 py-4 text-center text-gray-600 dark:text-gray-300">Tidak ada data</td>
                                </tr>
                            )}
                            {!loading && rows.map((row, idx) => (
                                <motion.tr
                                    key={`${row.kode_brng || idx}_${idx}`}
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ type: "spring", bounce: 0.15, visualDuration: 0.35, delay: Math.min(idx * 0.02, 0.2) }}
                                    className="border-b border-gray-100/50 dark:border-gray-700/30"
                                >
                                    <td className="px-3 py-2">{row.kode_brng}</td>
                                    <td className="px-3 py-2">{row.nama_brng}</td>
                                    <td className="px-3 py-2">{kdBangsal ? `${kdBangsal}${nmBangsal ? " — " + nmBangsal : ""}` : "Semua Lokasi"}</td>
                                    <td className="px-3 py-2">{row.satuan}</td>
                                    <td className="px-3 py-2">{row.jenis}</td>
                                    <td className="px-3 py-2">{Number(row.stok_minimal || 0).toLocaleString()}</td>
                                    {!kdBangsal && gudangs.map((g) => (
                                        <td key={`gd_${g.kd_bangsal}`} className="px-3 py-2">
                                            {Number((row.stok_per_gudang || {})[g.kd_bangsal] || 0).toLocaleString()}
                                        </td>
                                    ))}
                                    <td className="px-3 py-2">{Number(row.stok_saat_ini || 0).toLocaleString()}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {paginator && pageLinks.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-3">
                            <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                                <input
                                    type="checkbox"
                                    checked={batchOn}
                                    onChange={(e) => setBatchOn(e.target.checked)}
                                />
                                Mode Batch
                            </label>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-gray-600">Baris per halaman</span>
                                <select
                                    value={perPage}
                                    onChange={(e) => {
                                        const val = Number(e.target.value);
                                        setPerPage(val);
                                        setPage(1);
                                        fetchData({ per_page: val, page: 1 });
                                    }}
                                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300 dark:border-gray-600"
                                >
                                    {[10, 20, 50].map((n) => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                            </div>
                            <p className="text-xs text-gray-600">Menampilkan {items?.from ?? 0}-{items?.to ?? 0} dari {items?.total ?? 0} data</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {pageLinks.map((link, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => gotoPageFromUrl(link.url)}
                                    className={`rounded-lg px-3 py-1.5 text-xs ${link.active ? "bg-indigo-600 text-white" : "bg-white text-gray-700 border"} ${!link.url ? "pointer-events-none opacity-50" : ""}`}
                                    dangerouslySetInnerHTML={{ __html: String(link.label) }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </SidebarFarmasi>
    );
}
