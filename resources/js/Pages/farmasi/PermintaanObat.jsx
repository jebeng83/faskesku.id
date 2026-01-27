import React, { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import SidebarFarmasi from "@/Layouts/SidebarFarmasi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import CariPermintaan from "@/Pages/farmasi/CariPermintaan";
import { Plus, Save, Search, RefreshCcw, PackageOpen, Trash2 } from "lucide-react";

export default function PermintaanObat() {
    const [noPermintaan, setNoPermintaan] = useState("");
    const [tanggal, setTanggal] = useState(() => {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
    });
    const [bangsal, setBangsal] = useState([]);
    const [kdBangsalAsal, setKdBangsalAsal] = useState("");
    const [kdBangsalTujuan, setKdBangsalTujuan] = useState("");
    const [nmBangsalAsal, setNmBangsalAsal] = useState("");
    const [nmBangsalTujuan, setNmBangsalTujuan] = useState("");
    const [petugas, setPetugas] = useState([]);
    const [kdPetugas, setKdPetugas] = useState("");
    const [items, setItems] = useState([]);
    const [stokMap, setStokMap] = useState({});
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [isPermintaanSearchOpen, setPermintaanSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const [resPetugas, resBangsal] = await Promise.all([
                    fetch("/api/pembelian/petugas", { headers: { Accept: "application/json" } }),
                    fetch("/api/pembelian/lokasi", { headers: { Accept: "application/json" } }),
                ]);
                if (resPetugas.ok) {
                    const pj = await resPetugas.json();
                    const list = Array.isArray(pj?.data) ? pj.data : Array.isArray(pj) ? pj : [];
                    setPetugas(list);
                }
                if (resBangsal.ok) {
                    const bj = await resBangsal.json();
                    const list = Array.isArray(bj?.data) ? bj.data : Array.isArray(bj) ? bj : [];
                    setBangsal(list);
                }
            } catch {}
        };
        fetchDropdowns();
    }, []);

    const defaultBangsal = useMemo(() => {
        if (!bangsal.length) return null;
        const ap = bangsal.find(
            (b) =>
                String(b?.kd_bangsal || "").toUpperCase() === "AP" ||
                String(b?.nm_bangsal || "").toLowerCase().includes("apotek")
        );
        return ap || bangsal[0];
    }, [bangsal]);

    useEffect(() => {
        if (!kdBangsalAsal && defaultBangsal) {
            setKdBangsalAsal(defaultBangsal.kd_bangsal);
            setNmBangsalAsal(defaultBangsal.nm_bangsal || "");
        }
        if (!kdBangsalTujuan && bangsal.length) {
            setKdBangsalTujuan(bangsal[0].kd_bangsal);
            setNmBangsalTujuan(bangsal[0].nm_bangsal || "");
        }
    }, [defaultBangsal, bangsal, kdBangsalAsal, kdBangsalTujuan]);

    useEffect(() => {
        const a = bangsal.find((b) => b.kd_bangsal === kdBangsalAsal);
        setNmBangsalAsal(a ? a.nm_bangsal || "" : "");
        const t = bangsal.find((b) => b.kd_bangsal === kdBangsalTujuan);
        setNmBangsalTujuan(t ? t.nm_bangsal || "" : "");
    }, [kdBangsalAsal, kdBangsalTujuan, bangsal]);

    const addItem = (row) => {
        const kode = row?.kode_brng || row?.kode || "";
        const nama = row?.nama_brng || row?.nama || "";
        const satuan = row?.kode_sat || row?.satuan || "";
        if (!kode) return;
        setItems((prev) => {
            const exists = prev.find((p) => p.kode_brng === kode);
            if (exists) {
                return prev.map((p) =>
                    p.kode_brng === kode ? { ...p, jumlah: (Number(p.jumlah) || 0) + 1 } : p
                );
            }
            return [
                ...prev,
                { kode_brng: kode, nama_brng: nama, satuan, jumlah: 1, keterangan: "" },
            ];
        });
    };

    const removeItem = (kode) => {
        setItems((prev) => prev.filter((p) => p.kode_brng !== kode));
    };

    const fetchBarang = async () => {
        if (!searchQuery || searchQuery.length < 2) {
            setSearchResults([]);
            return;
        }
        try {
            const { data } = await axios.get("/api/barang/search", {
                params: { q: searchQuery, limit: 20 },
            });
            const rows = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
            setSearchResults(rows);
        } catch {
            setSearchResults([]);
        }
    };

    useEffect(() => {
        const q = String(searchQuery || "").trim();
        const handle = setTimeout(() => {
            if (q.length < 2) {
                setSearchResults([]);
                return;
            }
            axios
                .get("/api/barang/search", { params: { q, limit: 20 } })
                .then((res) => {
                    const resp = res?.data;
                    const rows = Array.isArray(resp?.data) ? resp.data : Array.isArray(resp) ? resp : [];
                    setSearchResults(rows);
                })
                .catch(() => {
                    setSearchResults([]);
                });
        }, 300);
        return () => clearTimeout(handle);
    }, [searchQuery]);

    useEffect(() => {
        const codes = Array.from(new Set(items.map((it) => it.kode_brng))).filter(Boolean);
        if (!codes.length) {
            setStokMap({});
            return;
        }
        let cancelled = false;
        const run = async () => {
            try {
                const makeReq = (kode, kd) => axios.post(
                    "/api/obat/cek-stok",
                    { kode_brng: kode, kd_bangsal: kd },
                    { headers: { Accept: "application/json" } }
                ).catch(() => null);

                const asalPromises = kdBangsalAsal ? codes.map((k) => makeReq(k, kdBangsalAsal)) : [];
                const tujuanPromises = kdBangsalTujuan ? codes.map((k) => makeReq(k, kdBangsalTujuan)) : [];

                const [asalResps, tujuanResps] = await Promise.all([
                    Promise.all(asalPromises),
                    Promise.all(tujuanPromises),
                ]);

                const next = {};
                codes.forEach((k, idx) => {
                    const asalVal = Number(asalResps?.[idx]?.data?.data?.stok ?? 0);
                    const tujuanVal = Number(tujuanResps?.[idx]?.data?.data?.stok ?? 0);
                    next[k] = { asal: asalVal, tujuan: tujuanVal };
                });
                if (!cancelled) setStokMap(next);
            } catch {
                if (!cancelled) setStokMap({});
            }
        };
        run();
        return () => { cancelled = true; };
    }, [kdBangsalAsal, kdBangsalTujuan, items.map((it) => it.kode_brng).join(",")]);

    const resetForm = () => {
        setNoPermintaan("");
        setTanggal(() => {
            const d = new Date();
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            return `${y}-${m}-${day}`;
        });
        if (defaultBangsal) {
            setKdBangsalAsal(defaultBangsal.kd_bangsal);
            setNmBangsalAsal(defaultBangsal.nm_bangsal || "");
        }
        if (bangsal.length) {
            setKdBangsalTujuan(bangsal[0].kd_bangsal);
            setNmBangsalTujuan(bangsal[0].nm_bangsal || "");
        }
        setKdPetugas("");
        setItems([]);
    };

    const savePermintaan = async () => {
        if (!kdBangsalTujuan || !kdPetugas) return;
        const validItems = items.filter((it) => Number(it.jumlah) > 0);
        if (!validItems.length) return;
        setLoading(true);
        try {
            const payload = {
                tanggal,
                kd_bangsal_asal: kdBangsalAsal,
                kd_bangsal_tujuan: kdBangsalTujuan,
                kd_petugas: kdPetugas,
                items: validItems.map((it) => ({
                    kode_brng: it.kode_brng,
                    satuan: it.satuan,
                    jumlah: Number(it.jumlah),
                    keterangan: String(it.keterangan || "").replaceAll("'", "").replaceAll('"', ""),
                })),
            };
            const res = await axios.post("/farmasi/permintaan", payload, {
                headers: { Accept: "application/json" },
                withCredentials: true,
            });
            const json = res?.data || {};
            const no = json?.no_permintaan || json?.data?.no_permintaan || "";
            if (no) {
                setNoPermintaan(no);
                setItems([]);
            }
        } catch {}
        finally {
            setLoading(false);
        }
    };

    const goCekStok = () => {
        const url = "/farmasi/cek-stok-obat";
        window.open(url, "_blank");
    };

    const searchPermintaan = () => {
        setPermintaanSearchOpen(true);
    };

    const handleSelectPermintaan = (row) => {
        setNoPermintaan(row?.no_permintaan || "");
        setTanggal(row?.tanggal || tanggal);
        setKdBangsalAsal(row?.kd_bangsal || kdBangsalAsal);
        setKdBangsalTujuan(row?.kd_bangsaltujuan || kdBangsalTujuan);
        setKdPetugas(row?.nip || kdPetugas);
    };

    const metaText = useMemo(() => {
        const asal = kdBangsalAsal ? `${kdBangsalAsal}${nmBangsalAsal ? " — " + nmBangsalAsal : ""}` : "-";
        const tujuan = kdBangsalTujuan ? `${kdBangsalTujuan}${nmBangsalTujuan ? " — " + nmBangsalTujuan : ""}` : "-";
        return `Asal: ${asal} • Tujuan: ${tujuan}`;
    }, [kdBangsalAsal, nmBangsalAsal, kdBangsalTujuan, nmBangsalTujuan]);

    return (
        <SidebarFarmasi title="Farmasi">
            <Head title="Permintaan Obat" />
            <div className="space-y-6">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                                Permintaan Obat
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{metaText}</p>
                        </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200 border border-blue-100 dark:border-blue-900">
                            {noPermintaan ? `No: ${noPermintaan}` : "Nomor otomatis oleh sistem"}
                        </span>
                        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                            Tanggal: {tanggal}
                        </span>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="mx-auto px-4 sm:px-6 lg:px-12 xl:px-16"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        <div className="md:col-span-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-4">
                            <div className="grid grid-cols-1 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                                    <input
                                        type="date"
                                        value={tanggal}
                                        onChange={(e) => setTanggal(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-xs sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gudang Asal</label>
                                    <select
                                        value={kdBangsalAsal}
                                        onChange={(e) => setKdBangsalAsal(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-xs sm:text-sm"
                                    >
                                        <option value="">Pilih Lokasi</option>
                                        {bangsal.map((lokasi) => (
                                            <option key={lokasi.kd_bangsal} value={lokasi.kd_bangsal}>
                                                {lokasi.kd_bangsal} — {lokasi.nm_bangsal}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gudang Tujuan</label>
                                    <select
                                        value={kdBangsalTujuan}
                                        onChange={(e) => setKdBangsalTujuan(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-xs sm:text-sm"
                                    >
                                        <option value="">Pilih Lokasi</option>
                                        {bangsal.map((lokasi) => (
                                            <option key={lokasi.kd_bangsal} value={lokasi.kd_bangsal}>
                                                {lokasi.kd_bangsal} — {lokasi.nm_bangsal}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Petugas</label>
                                    <select
                                        value={kdPetugas}
                                        onChange={(e) => setKdPetugas(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-xs sm:text-sm"
                                    >
                                        <option value="">Pilih Petugas</option>
                                        {petugas.filter((p) => p && p.nip).map((p) => (
                                            <option key={p.nip} value={p.nip}>
                                                {`${p.nip} — ${p.nama ?? ""}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={savePermintaan}
                                        disabled={loading || !kdBangsalTujuan || !kdPetugas || !items.length}
                                        className="w-full sm:w-auto inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-700 hover:via-blue-700 hover:to-purple-700 hover:shadow-xl hover:shadow-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Save className="h-4 w-4 mr-2" />
                                        Simpan
                                    </button>
                                    <button
                                        type="button"
                                        onClick={searchPermintaan}
                                        className="w-full sm:w-auto inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <Search className="h-4 w-4 mr-2" />
                                        Cari Permintaan
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="w-full sm:w-auto inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <RefreshCcw className="h-4 w-4 mr-2" />
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Daftar Item</h3>
                                <div className="flex items-center flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(true)}
                                        className="w-full sm:w-auto inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 hover:shadow-xl hover:shadow-emerald-500/30 transition-all"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Tambah Item
                                    </button>
                                    <button
                                        type="button"
                                        onClick={goCekStok}
                                        className="w-full sm:w-auto inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Cek Stok
                                    </button>
                                </div>
                            </div>
                            {items.length ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-[56rem] sm:min-w-full border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50 dark:bg-gray-800">
                                                <th className="px-3 py-2 text-left text-xs sm:text-xs font-semibold text-gray-700 dark:text-gray-200 border-b">Kode</th>
                                                <th className="px-3 py-2 text-left text-xs sm:text-xs font-semibold text-gray-700 dark:text-gray-200 border-b">Nama</th>
                                                <th className="px-3 py-2 text-left text-xs sm:text-xs font-semibold text-gray-700 dark:text-gray-200 border-b">Satuan</th>
                                                <th className="px-3 py-2 text-right text-xs sm:text-xs font-semibold text-gray-700 dark:text-gray-200 border-b">Stok Asal</th>
                                                <th className="px-3 py-2 text-right text-xs sm:text-xs font-semibold text-gray-700 dark:text-gray-200 border-b">Stok Tujuan</th>
                                                <th className="px-3 py-2 text-right text-xs sm:text-xs font-semibold text-gray-700 dark:text-gray-200 border-b">Jml</th>
                                                <th className="px-3 py-2 text-left text-xs sm:text-xs font-semibold text-gray-700 dark:text-gray-200 border-b">Keterangan</th>
                                                <th className="px-3 py-2 text-right text-xs sm:text-xs font-semibold text-gray-700 dark:text-gray-200 border-b">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((row) => (
                                                <tr key={row.kode_brng} className="border-b border-gray-100 dark:border-gray-800 odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800">
                                                    <td className="px-3 py-2 text-[11px] sm:text-sm">{row.kode_brng}</td>
                                                    <td className="px-3 py-2 text-[11px] sm:text-sm">{row.nama_brng}</td>
                                                    <td className="px-3 py-2 text-[11px] sm:text-sm">{row.satuan}</td>
                                                    <td className="px-3 py-2 text-[11px] sm:text-sm text-right">{typeof stokMap[row.kode_brng]?.asal === "number" ? stokMap[row.kode_brng].asal : "-"}</td>
                                                    <td className="px-3 py-2 text-[11px] sm:text-sm text-right">{typeof stokMap[row.kode_brng]?.tujuan === "number" ? stokMap[row.kode_brng].tujuan : "-"}</td>
                                                    <td className="px-3 py-2 text-[11px] sm:text-sm text-right">
                                                        <input
                                                            type="number"
                                                            min={0}
                                                            value={row.jumlah}
                                                            onChange={(e) => {
                                                                const v = e.target.value;
                                                                setItems((prev) => prev.map((p) => p.kode_brng === row.kode_brng ? { ...p, jumlah: v } : p));
                                                            }}
                                                            className="w-20 sm:w-24 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-[11px] sm:text-sm text-right"
                                                        />
                                                    </td>
                                                    <td className="px-3 py-2 text-[11px] sm:text-sm">
                                                        <input
                                                            value={row.keterangan}
                                                            onChange={(e) => {
                                                                const v = e.target.value;
                                                                setItems((prev) => prev.map((p) => p.kode_brng === row.kode_brng ? { ...p, keterangan: v } : p));
                                                            }}
                                                            className="w-full px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-[11px] sm:text-sm"
                                                        />
                                                    </td>
                                                    <td className="px-3 py-2 text-[11px] sm:text-sm text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeItem(row.kode_brng)}
                                                            className="inline-flex items-center rounded-md px-2.5 py-1.5 text-xs font-semibold bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300 border border-red-100 dark:border-red-900 hover:bg-red-100 dark:hover:bg-red-800/30"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <PackageOpen className="mx-auto h-9 w-9 text-gray-400" />
                                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Belum ada item. Klik "Tambah Item" untuk memilih.</div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {modalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                            onClick={() => setModalOpen(false)}
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {modalOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
                        >
                            <div className="w-full max-w-3xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl">
                                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                    <h4 className="text-sm font-semibold">Cari Item</h4>
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(false)}
                                        className="rounded-md px-2 py-1 text-xs font-semibold bg-white/90 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-700/50"
                                    >
                                        Tutup
                                    </button>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center gap-2">
                                        <input
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === "Enter") fetchBarang(); }}
                                            placeholder="Kode/Nama/Kategori/Satuan"
                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={fetchBarang}
                                            className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white"
                                        >
                                            <Search className="h-4 w-4 mr-2" />
                                            Cari
                                        </button>
                                    </div>
                                    <div className="mt-4 max-h-72 overflow-y-auto">
                                        {searchResults.length ? (
                                            <table className="min-w-full border-collapse">
                                                <thead>
                                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                                        <th className="px-3 py-2 text-left text-xs font-semibold">Kode</th>
                                                        <th className="px-3 py-2 text-left text-xs font-semibold">Nama</th>
                                                        <th className="px-3 py-2 text-left text-xs font-semibold">Satuan</th>
                                                        <th className="px-3 py-2 text-right text-xs font-semibold">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {searchResults.map((r, idx) => (
                                                        <tr key={idx} className="border-b border-gray-100 dark:border-gray-800">
                                                            <td className="px-3 py-2 text-sm">{r.kode_brng || r.kode || ""}</td>
                                                            <td className="px-3 py-2 text-sm">{r.nama_brng || r.nama || ""}</td>
                                                            <td className="px-3 py-2 text-sm">{r.kode_sat || r.satuan || ""}</td>
                                                            <td className="px-3 py-2 text-sm text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() => { addItem(r); setModalOpen(false); }}
                                                        className="inline-flex items-center rounded-md px-2.5 py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900 hover:bg-emerald-100 dark:hover:bg-emerald-800/30"
                                                    >
                                                                    Tambah
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">
                                                Tidak ada hasil.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <CariPermintaan
                    open={isPermintaanSearchOpen}
                    onClose={() => setPermintaanSearchOpen(false)}
                    onSelect={handleSelectPermintaan}
                />
            </div>
        </SidebarFarmasi>
    );
}
