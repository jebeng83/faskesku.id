import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LayoutUtama from "@/Pages/LayoutUtama";
import { BridingMenu } from "@/Layouts/SidebarBriding";
import { Card, CardHeader, CardContent } from "@/Components/ui/Card";
import Input from "@/Components/ui/Input";
import Label from "@/Components/ui/Label";
import Button from "@/Components/ui/Button";
import Toaster from "@/Components/ui/Toaster";
import {
    Search,
    User,
    CheckCircle2,
    XCircle,
    RefreshCw,
    Trash2,
    Edit2,
    Plus,
    Loader2,
    Save
} from "lucide-react";


export default function MappingPractitioner() {
    const getCsrfToken = () => {
        const p = `; ${document.cookie}`;
        const r = p.split("; XSRF-TOKEN=");
        const raw = r.length === 2 ? r.pop()?.split(";").shift() ?? "" : "";
        try {
            return raw ? decodeURIComponent(raw) : "";
        } catch {
            return raw || "";
        }
    };

    // State
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]); // List mapping
    const [pagination, setPagination] = useState({});
    const [search, setSearch] = useState("");
    const [toasts, setToasts] = useState([]);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [syncLoading, setSyncLoading] = useState(false);

    // Pegawai Search State (for adding new mapping)
    const [pegawaiSearch, setPegawaiSearch] = useState("");
    const [pegawaiList, setPegawaiList] = useState([]);
    const [selectedPegawai, setSelectedPegawai] = useState(null);

    // Edit State
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ nama: "", nik: "", satusehat_id: "" });

    const addToast = (type = "info", title = "", message = "", duration = 4000) => {
        const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    };
    const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    // Fetch initial data
    useEffect(() => {
        fetchMappings();
    }, [search]); // Re-fetch when search changes (debounce recommended but kept simple)

    const fetchMappings = async (url = "/api/satusehat/practitioner-mapping") => {
        setLoading(true);
        try {
            const query = search ? `?search=${encodeURIComponent(search)}` : "";
            const endpoint = url.includes("?") ? url : `${url}${query}`;

            const res = await fetch(endpoint);
            const json = await res.json();

            if (json.data) {
                setData(json.data);
                setPagination({
                    current_page: json.current_page,
                    last_page: json.last_page,
                    next_page_url: json.next_page_url,
                    prev_page_url: json.prev_page_url,
                    total: json.total
                });
            }
        } catch (_e) {
            addToast("danger", "Error", "Gagal mengambil data mapping");
        } finally {
            setLoading(false);
        }
    };

    // Search Pegawai for Add Modal
    const handleSearchPegawai = async (q) => {
        setPegawaiSearch(q);
        if (q.length < 3) return;

        try {
            const res = await fetch(`/api/satusehat/practitioner-mapping/pegawai-list?search=${encodeURIComponent(q)}`);
            const json = await res.json();
            setPegawaiList(json.data || []);
        } catch (_e) {
            console.error(_e);
        }
    };

    // Sync Logic (The Requirement)
    const handleSyncPegawai = async (pegawai) => {
        if (!pegawai.nik) {
            addToast("danger", "Validasi", "Pegawai ini tidak memiliki NIK!");
            return;
        }

        const csrfToken = getCsrfToken();
        if (!csrfToken) {
            addToast(
                "danger",
                "Sesi kedaluwarsa",
                "CSRF token tidak tersedia. Silakan refresh halaman dan coba lagi."
            );
            return;
        }

        setSyncLoading(true);
        try {
            // Direct call to searchAndCreate
            const res = await fetch("/api/satusehat/practitioner-mapping/search-create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-XSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                },
                credentials: "include",
                body: JSON.stringify({ nik: pegawai.no_ktp })
            });

            if (res.status === 419) {
                addToast("danger", "Sesi kedaluwarsa", "CSRF token expired. Silakan refresh halaman.");
                return;
            }

            const json = await res.json();

            if (res.ok) {
                addToast("success", "Berhasil", `Mapping berhasil dibuat untuk ${json.data.nama}`);
                fetchMappings();
                setIsModalOpen(false);
                setSelectedPegawai(null);
                setPegawaiSearch("");
            } else {
                // If already exists or not found
                addToast(
                    res.status === 404 ? "warning" : "danger",
                    "Gagal",
                    json.message || json.error
                );
            }
        } catch (_e) {
            addToast("danger", "Error", "Gagal menghubungi server");
        } finally {
            setSyncLoading(false);
        }
    };

    // Delete Logic
    const handleDelete = async (id) => {
        if (!confirm("Apakah Anda yakin ingin menghapus mapping ini?")) return;

        try {
            const csrfToken = getCsrfToken();
            if (!csrfToken) {
                addToast(
                    "danger",
                    "Sesi kedaluwarsa",
                    "CSRF token tidak tersedia. Silakan refresh halaman dan coba lagi."
                );
                return;
            }

            const res = await fetch(`/api/satusehat/practitioner-mapping/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "X-XSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                },
                credentials: "include",
            });

            if (res.status === 419) {
                addToast("danger", "Sesi kedaluwarsa", "CSRF token expired. Silakan refresh halaman.");
                return;
            }

            if (res.ok) {
                addToast("success", "Terhapus", "Mapping berhasil dihapus");
                fetchMappings();
            } else {
                addToast("danger", "Gagal", "Gagal menghapus mapping");
            }
        } catch (_e) {
            addToast("danger", "Error", "Terjadi kesalahan");
        }
    };

    // Edit Logic
    const startEdit = (item) => {
        setEditingId(item.id);
        setEditForm({
            nama: item.nama,
            nik: item.nik,
            satusehat_id: item.satusehat_id
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({ nama: "", nik: "", satusehat_id: "" });
    };

    const saveEdit = async () => {
        try {
            const csrfToken = getCsrfToken();
            if (!csrfToken) {
                addToast(
                    "danger",
                    "Sesi kedaluwarsa",
                    "CSRF token tidak tersedia. Silakan refresh halaman dan coba lagi."
                );
                return;
            }

            const res = await fetch(`/api/satusehat/practitioner-mapping/${editingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-XSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                },
                credentials: "include",
                body: JSON.stringify(editForm)
            });

            if (res.status === 419) {
                addToast("danger", "Sesi kedaluwarsa", "CSRF token expired. Silakan refresh halaman.");
                return;
            }

            const json = await res.json();

            if (res.ok) {
                addToast("success", "Tersimpan", "Perubahan berhasil disimpan");
                setEditingId(null);
                fetchMappings();
            } else {
                addToast("danger", "Gagal", json.message || "Gagal menyimpan perubahan");
            }
        } catch (_e) {
            addToast("danger", "Error", "Terjadi kesalahan");
        }
    };

    return (
        <LayoutUtama title="Mapping Practitioner" left={<BridingMenu />}>
            <motion.div
                className="p-4 md:p-6 lg:p-8 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 min-h-screen"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="relative flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Mapping Practitioner
                            </h1>
                            <p className="text-gray-500 text-sm">Kelola mapping NIK Pegawai ke IHS ID SATU SEHAT</p>
                        </div>
                    </div>

                    <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-lg shadow-blue-500/20">
                        <Plus className="w-4 h-4" />
                        Tambah / Sync Manual
                    </Button>
                </motion.div>

                {/* Content */}
                <motion.div variants={itemVariants}>
                    <Card className="overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 shadow-xl shadow-blue-500/5">
                        <CardHeader className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex flex-row items-center justify-between p-6">
                            <div className="relative w-full max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari nama atau NIK..."
                                    className="pl-9 border-gray-200 dark:border-gray-700 focus:ring-blue-500"
                                />
                            </div>
                            <Button variant="outline" size="sm" onClick={() => fetchMappings()} disabled={loading}>
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-500 uppercase bg-gray-50/80 dark:bg-gray-700/50 dark:text-gray-400">
                                        <tr>
                                            <th className="px-6 py-3 font-semibold">Nama Practitioner</th>
                                            <th className="px-6 py-3 font-semibold">NIK</th>
                                            <th className="px-6 py-3 font-semibold">IHS ID (SATU SEHAT)</th>
                                            <th className="px-6 py-3 font-semibold text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {loading && data.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-8 text-center text-gray-400">
                                                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                                    Memuat data...
                                                </td>
                                            </tr>
                                        ) : data.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                                    Tidak ada data mapping ditemukan.
                                                </td>
                                            </tr>
                                        ) : (
                                            data.map((item) => (
                                                <tr key={item.id} className="bg-white hover:bg-gray-50/50 dark:bg-gray-800 dark:hover:bg-gray-700/50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                                                        {editingId === item.id ? (
                                                            <Input
                                                                value={editForm.nama}
                                                                onChange={(e) => setEditForm({ ...editForm, nama: e.target.value })}
                                                                className="h-8 text-sm"
                                                            />
                                                        ) : item.nama}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                        {editingId === item.id ? (
                                                            <Input
                                                                value={editForm.nik}
                                                                onChange={(e) => setEditForm({ ...editForm, nik: e.target.value })}
                                                                className="h-8 text-sm font-mono"
                                                            />
                                                        ) : <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs">{item.nik}</span>}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                        {editingId === item.id ? (
                                                            <Input
                                                                value={editForm.satusehat_id}
                                                                onChange={(e) => setEditForm({ ...editForm, satusehat_id: e.target.value })}
                                                                className="h-8 text-sm font-mono"
                                                            />
                                                        ) : <span className="font-mono text-xs">{item.satusehat_id}</span>}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        {editingId === item.id ? (
                                                            <div className="flex items-center justify-end gap-2">
                                                                <Button size="sm" variant="outline" onClick={cancelEdit} className="h-8 w-8 p-0 text-red-500 hover:text-red-700 border-red-200">
                                                                    <XCircle className="w-4 h-4" />
                                                                </Button>
                                                                <Button size="sm" variant="outline" onClick={saveEdit} className="h-8 w-8 p-0 text-green-500 hover:text-green-700 border-green-200">
                                                                    <Save className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center justify-end gap-2">
                                                                <Button size="sm" variant="ghost" onClick={() => startEdit(item)} className="h-8 w-8 p-0 text-gray-400 hover:text-blue-500">
                                                                    <Edit2 className="w-4 h-4" />
                                                                </Button>
                                                                <Button size="sm" variant="ghost" onClick={() => handleDelete(item.id)} className="h-8 w-8 p-0 text-gray-400 hover:text-red-500">
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {pagination.total > 0 && (
                                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
                                    <span className="text-xs text-gray-500">
                                        Menampilkan {data.length} dari {pagination.total} data
                                    </span>
                                    <div className="flex gap-1">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={!pagination.prev_page_url}
                                            onClick={() => fetchMappings(pagination.prev_page_url)}
                                            className="text-xs h-7 px-2"
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={!pagination.next_page_url}
                                            onClick={() => fetchMappings(pagination.next_page_url)}
                                            className="text-xs h-7 px-2"
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Modal Tambah/Sync */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Search className="w-5 h-5 text-blue-500" />
                                    Cari & Sync Pegawai
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">Cari pegawai dari database lokal, lalu sync ke SATU SEHAT.</p>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <Label>Cari Pegawai (Ketik minimal 3 huruf)</Label>
                                    <Input
                                        value={pegawaiSearch}
                                        onChange={(e) => handleSearchPegawai(e.target.value)}
                                        placeholder="Contoh: Budi..."
                                        className="mt-1.5"
                                        autoFocus
                                    />
                                </div>

                                {/* Search Results */}
                                {pegawaiSearch.length >= 3 && (
                                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg max-h-48 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                                        {pegawaiList.length === 0 ? (
                                            <div className="p-3 text-sm text-gray-500 text-center">Tidak ditemukan.</div>
                                        ) : (
                                            pegawaiList.map(p => (
                                                <div
                                                    key={p.nik}
                                                    onClick={() => handleSyncPegawai(p)}
                                                    className="p-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 flex justify-between items-center group transition-colors"
                                                >
                                                    <div>
                                                        <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{p.nama}</div>
                                                        <div className="text-xs text-gray-500 font-mono">
                                                            No KTP: {p.no_ktp}
                                                        </div>
                                                    </div>
                                                    <Button size="sm" variant="ghost" disabled={syncLoading} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600">
                                                        {syncLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sync"}
                                                    </Button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}

                                {selectedPegawai && (
                                    <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
                                        <div>
                                            <div className="font-bold text-blue-900">{selectedPegawai.nama}</div>
                                            <div className="text-sm text-blue-700">No KTP: {selectedPegawai.no_ktp}</div>
                                        </div>
                                        <CheckCircle2 className="w-6 h-6 text-blue-500" />
                                    </div>
                                )}
                            </div>

                            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
                            </div>
                        </motion.div>
                    </div>
                )}

                <Toaster toasts={toasts} onRemove={removeToast} />
            </motion.div>
        </LayoutUtama>
    );
}
