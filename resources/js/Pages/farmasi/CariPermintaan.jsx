import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import PermintaanObatController from "@/actions/App/Http/Controllers/Farmasi/PermintaanObatController";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/tools/toast";

export default function CariPermintaan({ open = false, onClose, onSelect: _onSelect }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [q, setQ] = useState("");
    const todayStr = () => {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
    };
    const [from] = useState(() => todayStr());
    const [to] = useState(() => todayStr());
    const [status, setStatus] = useState("");
    const [total, setTotal] = useState(0);
    const [actionOpen, setActionOpen] = useState(false);
    const [actionRow, setActionRow] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [tanggal, setTanggal] = useState(() => todayStr());

    const isBaru = (row) => String(row?.status || '').trim().toLowerCase() === 'baru';

    const filtered = useMemo(() => {
        const term = String(q || "").toLowerCase();
        if (!term) return items;
        return items.filter((it) => {
            const no = String(it.no_permintaan || "").toLowerCase();
            const asal = String(it.kd_bangsal || "").toLowerCase();
            const tujuan = String(it.kd_bangsaltujuan || "").toLowerCase();
            const petugas = String(it.nip || "").toLowerCase();
            return (
                no.includes(term) ||
                asal.includes(term) ||
                tujuan.includes(term) ||
                petugas.includes(term)
            );
        });
    }, [items, q]);

    useEffect(() => {
        if (!open) return;
        let cancelled = false;
        const load = async () => {
            setLoading(true);
            try {
                const params = {};
                if (tanggal) {
                    params.tanggal = tanggal;
                } else {
                    if (from) params.from = from;
                    if (to) params.to = to;
                }
                if (status) params.status = status;
                const { data } = await axios.get("/farmasi/permintaan/search", {
                    params,
                    headers: { Accept: "application/json" },
                    withCredentials: true,
                });
                if (cancelled) return;
                const rows = Array.isArray(data?.items)
                    ? data.items
                    : Array.isArray(data)
                    ? data
                    : [];
                setItems(rows);
                setTotal(Number(data?.total ?? rows.length) || 0);
            } catch {
                if (!cancelled) {
                    setItems([]);
                    setTotal(0);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => {
            cancelled = true;
        };
    }, [open, from, to, tanggal, status, refreshKey]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape" && open) onClose?.();
        };
        if (open) {
            document.addEventListener("keydown", handleKey);
        }
        return () => document.removeEventListener("keydown", handleKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <motion.div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 10 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] flex flex-col border border-gray-200 dark:border-gray-800"
                    >
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                    Cari Permintaan Obat
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Pilih salah satu permintaan untuk melihat atau menyalin nomornya.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 text-xs font-medium"
                            >
                                Tutup
                            </button>
                        </div>

                        <div className="px-4 py-3 flex flex-wrap gap-3 items-end border-b border-gray-200 dark:border-gray-800">
                            <div className="flex-1 min-w-[10rem]">
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Cari
                                </label>
                                <input
                                    type="text"
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="No permintaan, gudang, atau petugas..."
                                    className="w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                                <input
                                    type="date"
                                    value={tanggal}
                                    onChange={(e) => setTanggal(e.target.value)}
                                    className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
                                >
                                    <option value="">Semua</option>
                                    <option value="Baru">Baru</option>
                                    <option value="Disetujui">Disetujui</option>
                                    <option value="Tidak Disetujui">Tidak Disetujui</option>
                                </select>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {loading ? "Memuat..." : `${total} data`}
                            </div>
                        </div>

                        <div className="flex-1 overflow-auto">
                            <table className="min-w-full text-xs">
                                <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">No Permintaan</th>
                                        <th className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Tanggal</th>
                                        <th className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Gudang Asal</th>
                                        <th className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Gudang Tujuan</th>
                                        <th className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Petugas</th>
                                        <th className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Status</th>
                                        <th className="px-3 py-2 text-right font-semibold text-gray-700 dark:text-gray-200">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {filtered.map((row) => (
                                        <tr key={row.no_permintaan} className="hover:bg-gray-50 dark:hover:bg-gray-800/80">
                                            <td className="px-3 py-1.5 whitespace-nowrap text-gray-900 dark:text-gray-100">
                                                {row.no_permintaan}
                                            </td>
                                            <td className="px-3 py-1.5 whitespace-nowrap text-gray-700 dark:text-gray-200">
                                                {row.tanggal}
                                            </td>
                                            <td className="px-3 py-1.5 whitespace-nowrap text-gray-700 dark:text-gray-200">
                                                {row.nm_bangsal_asal || row.kd_bangsal}
                                            </td>
                                            <td className="px-3 py-1.5 whitespace-nowrap text-gray-700 dark:text-gray-200">
                                                {row.nm_bangsal_tujuan || row.kd_bangsaltujuan}
                                            </td>
                                            <td className="px-3 py-1.5 whitespace-nowrap text-gray-700 dark:text-gray-200">
                                                {row.nama_pegawai || row.nip}
                                            </td>
                                            <td className="px-3 py-1.5 whitespace-nowrap text-gray-700 dark:text-gray-200">
                                                {row.status}
                                            </td>
                                            <td className="px-3 py-1.5 whitespace-nowrap text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => { setActionRow(row); setActionOpen(true); }}
                                                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-indigo-600 text-white text-[11px] font-medium hover:bg-indigo-700"
                                                >
                                                    Aksi
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {!loading && filtered.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-3 py-6 text-center text-xs text-gray-500 dark:text-gray-400"
                                            >
                                                Tidak ada data permintaan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <AnimatePresence>
                            {actionOpen && (
                                <div className="absolute inset-0 z-50 flex items-center justify-center">
                                    <motion.div
                                        className="absolute inset-0 bg-black/40"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setActionOpen(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.96, y: 8 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.96, y: 8 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-sm mx-4 border border-gray-200 dark:border-gray-800"
                                    >
                                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 text-sm font-semibold">Menu Aksi</div>
                                        <div className="p-3 space-y-2">
                                            <button
                                                type="button"
                                                disabled={actionLoading || (actionRow && !isBaru(actionRow))}
                                                onClick={async () => {
                                                    if (!actionRow) return;
                                                    setActionLoading(true);
                                                    try {
                                                        const { url, method } = PermintaanObatController.approveMutasi.patch(actionRow.no_permintaan);
                                                        const res = await axios({ url, method, headers: { Accept: "application/json" }, withCredentials: true });
                                                        if (res?.status >= 200 && res?.status < 300) {
                                                            toast.success("Permintaan disetujui untuk mutasi stok");
                                                            setRefreshKey((k) => k + 1);
                                                            setActionOpen(false);
                                                        } else {
                                                            const msg = res?.data?.message || "Gagal menyetujui mutasi stok";
                                                            toast.error(msg);
                                                        }
                                                    } catch (e) {
                                                        const msg = e?.response?.data?.message || "Aksi belum tersedia atau terjadi kesalahan";
                                                        toast.error(msg);
                                                    } finally {
                                                        setActionLoading(false);
                                                    }
                                                }}
                                                className="w-full inline-flex items-center justify-center px-3 py-2 rounded-md bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 disabled:opacity-50"
                                            >
                                                Setujui (Mutasi Stok)
                                            </button>
                                            <button
                                                type="button"
                                                disabled={actionLoading || (actionRow && actionRow.status !== "Baru")}
                                                onClick={async () => {
                                                    if (!actionRow) return;
                                                    setActionLoading(true);
                                                    try {
                                                        const { url, method } = PermintaanObatController.approveStokKeluar.patch(actionRow.no_permintaan);
                                                        const res = await axios({ url, method, headers: { Accept: "application/json" }, withCredentials: true });
                                                        if (res?.status >= 200 && res?.status < 300) {
                                                            toast.success("Permintaan disetujui untuk stok keluar");
                                                            setRefreshKey((k) => k + 1);
                                                            setActionOpen(false);
                                                        } else {
                                                            const msg = res?.data?.message || "Gagal menyetujui stok keluar";
                                                            toast.error(msg);
                                                        }
                                                    } catch (e) {
                                                        const msg = e?.response?.data?.message || "Aksi belum tersedia atau terjadi kesalahan";
                                                        toast.error(msg);
                                                    } finally {
                                                        setActionLoading(false);
                                                    }
                                                }}
                                                className="w-full inline-flex items-center justify-center px-3 py-2 rounded-md bg-sky-600 text-white text-xs font-medium hover:bg-sky-700 disabled:opacity-50"
                                            >
                                                Setujui (Stok Keluar)
                                            </button>
                                            <button
                                                type="button"
                                                disabled={actionLoading || (actionRow && actionRow.status !== "Baru")}
                                                onClick={async () => {
                                                    if (!actionRow) return;
                                                    setActionLoading(true);
                                                    try {
                                                        const { url, method } = PermintaanObatController.reject.patch(actionRow.no_permintaan);
                                                        const res = await axios({ url, method, data: { status: "Tidak Disetujui" }, headers: { Accept: "application/json" }, withCredentials: true });
                                                        if (res?.status >= 200 && res?.status < 300) {
                                                            toast.success("Permintaan ditandai Tidak Disetujui");
                                                            setRefreshKey((k) => k + 1);
                                                            setActionOpen(false);
                                                        } else {
                                                            const msg = res?.data?.message || "Gagal menandai Tidak Disetujui";
                                                            toast.error(msg);
                                                        }
                                                    } catch (e) {
                                                        const msg = e?.response?.data?.message || "Aksi belum tersedia atau terjadi kesalahan";
                                                        toast.error(msg);
                                                    } finally {
                                                        setActionLoading(false);
                                                    }
                                                }}
                                                className="w-full inline-flex items-center justify-center px-3 py-2 rounded-md bg-amber-500 text-white text-xs font-medium hover:bg-amber-600 disabled:opacity-50"
                                            >
                                                Tidak Disetujui
                                            </button>
                                            
                                            <button
                                                type="button"
                                                disabled={actionLoading || (actionRow && actionRow.status === "Disetujui")}
                                                onClick={async () => {
                                                    if (!actionRow) return;
                                                    setActionLoading(true);
                                                    try {
                                                        const { url, method } = PermintaanObatController.destroy.delete(actionRow.no_permintaan);
                                                        const res = await axios({ url, method, headers: { Accept: "application/json" }, withCredentials: true });
                                                        if (res?.status >= 200 && res?.status < 300) {
                                                            toast.success("Permintaan dihapus");
                                                            setRefreshKey((k) => k + 1);
                                                            setActionOpen(false);
                                                        } else {
                                                            const msg = res?.data?.message || "Gagal menghapus permintaan";
                                                            toast.error(msg);
                                                        }
                                                    } catch (e) {
                                                        const msg = e?.response?.data?.message || "Aksi belum tersedia atau terjadi kesalahan";
                                                        toast.error(msg);
                                                    } finally {
                                                        setActionLoading(false);
                                                    }
                                                }}
                                                className="w-full inline-flex items-center justify-center px-3 py-2 rounded-md bg-red-600 text-white text-xs font-medium hover:bg-red-700 disabled:opacity-50"
                                            >
                                                Hapus Permintaan
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setActionOpen(false)}
                                                className="w-full inline-flex items-center justify-center px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
                                            >
                                                Batal
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
