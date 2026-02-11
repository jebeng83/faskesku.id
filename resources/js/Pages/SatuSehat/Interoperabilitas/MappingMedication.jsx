import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LayoutUtama from "@/Pages/LayoutUtama";
import { BridingMenu } from "@/Layouts/SidebarBriding";
import { Card, CardHeader, CardContent } from "@/Components/ui/Card";
import Input from "@/Components/ui/Input";
import Label from "@/Components/ui/Label";
import Button from "@/Components/ui/Button";
import Toaster from "@/Components/ui/Toaster";
import {
    Search,
    Pill,
    RefreshCw,
    Trash2,
    Edit2,
    Plus,
    Loader2,
    Save,
    X,
    Filter,
    Layers
} from "lucide-react";

export default function MappingMedication() {
    // State
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [search, setSearch] = useState("");
    const [toasts, setToasts] = useState([]);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    // Form State (Selection & Mapping)
    const [form, setForm] = useState({
        kode_brng: "",
        nama_brng: "",
        obat_code: "",
        obat_system: "http://sys-ids.kemkes.go.id/kfa",
        obat_display: "",
        form_code: "",
        form_system: "http://terminology.kemkes.go.id/CodeSystem/medication-form",
        form_display: "",
        route_code: "",
        route_system: "http://standard-terminology.kemkes.go.id/CodeSystem/medication-route",
        route_display: "",
    });

    // Local Barang Search
    const [barangSearch, setBarangSearch] = useState("");
    const [barangList, setBarangList] = useState([]);
    const [isSearchingBarang, setIsSearchingBarang] = useState(false);

    const addToast = (type = "info", title = "", message = "", duration = 4000) => {
        const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    };
    const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

    useEffect(() => {
        const handle = setTimeout(() => {
            fetchMappings();
        }, 500);
        return () => clearTimeout(handle);
    }, [search]);

    const fetchMappings = async (url = "/api/satusehat/mapping-obat") => {
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

    const handleSearchBarang = async (q) => {
        setBarangSearch(q);
        if (q.length < 3) {
            setBarangList([]);
            return;
        }

        setIsSearchingBarang(true);
        try {
            const res = await fetch(`/api/satusehat/mapping-obat/search-barang?q=${encodeURIComponent(q)}`);
            const json = await res.json();
            setBarangList(json || []);
        } catch (_e) {
            console.error(_e);
        } finally {
            setIsSearchingBarang(false);
        }
    };

    const selectBarang = (barang) => {
        setForm({
            ...form,
            kode_brng: barang.kode_brng,
            nama_brng: barang.nama_brng
        });
        setBarangList([]);
        setBarangSearch("");
    };

    const handleSubmitWithSync = async (sync = false) => {
        if (!form.kode_brng || !form.obat_code) {
            addToast("warning", "Validasi", "Kode Barang dan Kode KFA wajib diisi");
            return;
        }

        setSaving(true);
        try {
            const res = await fetch("/api/satusehat/mapping-obat" + (sync ? "?sync=1" : ""), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ""
                },
                body: JSON.stringify(form)
            });

            const json = await res.json();
            if (res.ok) {
                let msg = "Mapping obat berhasil disimpan";
                if (json.sync) {
                    if (json.sync.ok) {
                        msg += " & Sinkron SATUSEHAT Berhasil";
                    } else {
                        msg += " & Sinkron SATUSEHAT Gagal: " + (json.sync.error || 'Unknown Error');
                    }
                }
                addToast(json.sync?.ok === false ? "warning" : "success", "Berhasil", msg);
                setIsModalOpen(false);
                resetForm();
                fetchMappings();
            } else {
                addToast("danger", "Gagal", json.message || "Gagal menyimpan mapping");
            }
        } catch (_e) {
            addToast("danger", "Error", "Gagal menghubungi server");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (item) => {
        setForm({
            kode_brng: item.kode_brng,
            nama_brng: item.barang?.nama_brng || "",
            obat_code: item.obat_code,
            obat_system: item.obat_system,
            obat_display: item.obat_display,
            form_code: item.form_code || "",
            form_system: item.form_system || "http://terminology.kemkes.go.id/CodeSystem/medication-form",
            form_display: item.form_display || "",
            route_code: item.route_code || "",
            route_system: item.route_system || "http://standard-terminology.kemkes.go.id/CodeSystem/medication-route",
            route_display: item.route_display || "",
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (kode) => {
        if (!confirm("Hapus mapping ini?")) return;
        try {
            const res = await fetch(`/api/satusehat/mapping-obat/${kode}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ""
                }
            });
            if (res.ok) {
                addToast("success", "Berhasil", "Mapping dihapus");
                fetchMappings();
            }
        } catch (_e) {
            addToast("danger", "Error", "Gagal menghapus mapping");
        }
    };

    const resetForm = () => {
        setForm({
            kode_brng: "",
            nama_brng: "",
            obat_code: "",
            obat_system: "http://sys-ids.kemkes.go.id/kfa",
            obat_display: "",
            form_code: "",
            form_system: "http://terminology.kemkes.go.id/CodeSystem/medication-form",
            form_display: "",
            route_code: "",
            route_system: "http://standard-terminology.kemkes.go.id/CodeSystem/medication-route",
            route_display: "",
        });
        setBarangSearch("");
    };

    return (
        <LayoutUtama title="Mapping Medication (KFA)" left={<BridingMenu />}>
            <motion.div
                className="p-4 md:p-6 lg:p-8 space-y-6 bg-slate-50 dark:bg-gray-900 min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/20 text-white">
                            <Pill className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mapping Medication</h1>
                            <p className="text-sm text-gray-500">Pemetaan Obat Lokal ke Kode KFA (SATUSEHAT)</p>
                        </div>
                    </div>
                    <Button onClick={() => { resetForm(); setIsModalOpen(true); }} className="bg-indigo-600 hover:bg-indigo-700">
                        <Plus className="w-4 h-4 mr-2" /> Tambah Mapping
                    </Button>
                </div>

                <Card className="border-none shadow-sm overflow-hidden">
                    <CardHeader className="bg-white dark:bg-gray-800 border-b p-4">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="relative w-full max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari Obat atau Kode KFA..."
                                    className="pl-9"
                                />
                            </div>
                            <Button variant="outline" onClick={() => fetchMappings()} disabled={loading}>
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 bg-white dark:bg-gray-800">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        <th className="px-6 py-4">Obat Lokal</th>
                                        <th className="px-6 py-4">KFA Product (Medication)</th>
                                        <th className="px-6 py-4">Dose Form & Route</th>
                                        <th className="px-6 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y dark:divide-gray-700">
                                    {loading && data.length === 0 ? (
                                        <tr><td colSpan="4" className="p-8 text-center text-gray-400">Memuat...</td></tr>
                                    ) : data.length === 0 ? (
                                        <tr><td colSpan="4" className="p-8 text-center text-gray-400">Data tidak ditemukan</td></tr>
                                    ) : (
                                        data.map((item) => (
                                            <tr key={item.kode_brng} className="hover:bg-gray-50 dark:hover:bg-gray-700 group transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-900 dark:text-gray-100">{item.barang?.nama_brng || 'N/A'}</div>
                                                    <div className="text-xs text-gray-500 font-mono">{item.kode_brng}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 italic">{item.obat_display}</div>
                                                    <div className="text-[10px] font-mono bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded inline-block mt-1">
                                                        KFA: {item.obat_code}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        {item.form_display && (
                                                            <div className="text-xs flex items-center gap-1.5">
                                                                <Layers className="w-3 h-3 text-gray-400" />
                                                                <span className="text-gray-600 dark:text-gray-400">{item.form_display}</span>
                                                            </div>
                                                        )}
                                                        {item.route_display && (
                                                            <div className="text-xs flex items-center gap-1.5">
                                                                <Filter className="w-3 h-3 text-gray-400" />
                                                                <span className="text-gray-600 dark:text-gray-400">{item.route_display}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button size="icon" variant="ghost" onClick={() => handleEdit(item)}>
                                                            <Edit2 className="w-4 h-4 text-blue-500" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" onClick={() => handleDelete(item.kode_brng)}>
                                                            <Trash2 className="w-4 h-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {pagination.total > 0 && (
                            <div className="p-4 flex items-center justify-between border-t">
                                <span className="text-xs text-gray-500">Total {pagination.total} Obat</span>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" disabled={!pagination.prev_page_url} onClick={() => fetchMappings(pagination.prev_page_url)}>Prev</Button>
                                    <Button size="sm" variant="outline" disabled={!pagination.next_page_url} onClick={() => fetchMappings(pagination.next_page_url)}>Next</Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* MODAL FORM */}
                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                                onClick={() => setIsModalOpen(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative bg-white dark:bg-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-white/20"
                            >
                                <div className="p-6 border-b flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                        <Pill className="text-indigo-600" />
                                        {form.kode_brng ? 'Edit Mapping Obat' : 'Tambah Mapping Obat'}
                                    </h2>
                                    <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>

                                <form onSubmit={(e) => { e.preventDefault(); handleSubmitWithSync(true); }} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                                    <div className="p-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/30 space-y-3">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                                            Data Obat Lokal
                                        </h3>
                                        {!form.kode_brng ? (
                                            <div className="relative">
                                                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                <Input
                                                    placeholder="Cari kode atau nama obat lokal..."
                                                    className="pl-9 h-11"
                                                    value={barangSearch}
                                                    onChange={(e) => handleSearchBarang(e.target.value)}
                                                />
                                                {isSearchingBarang && <Loader2 className="absolute right-3 top-3.5 w-4 h-4 animate-spin text-indigo-500" />}
                                                {barangList.length > 0 && (
                                                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border rounded-lg shadow-xl max-h-48 overflow-y-auto divide-y dark:divide-gray-600">
                                                        {barangList.map(b => (
                                                            <div
                                                                key={b.kode_brng}
                                                                onClick={() => selectBarang(b)}
                                                                className="p-3 hover:bg-indigo-50 dark:hover:bg-gray-600 cursor-pointer flex justify-between items-center group"
                                                            >
                                                                <div className="text-sm">
                                                                    <div className="font-bold">{b.nama_brng}</div>
                                                                    <div className="text-xs text-gray-500 font-mono">{b.kode_brng}</div>
                                                                </div>
                                                                <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 text-indigo-600" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-lg border shadow-sm">
                                                <div>
                                                    <div className="font-bold text-sm">{form.nama_brng}</div>
                                                    <div className="text-xs text-gray-500 font-mono">{form.kode_brng}</div>
                                                </div>
                                                {!form.obat_code && <Button type="button" variant="ghost" size="sm" onClick={() => resetForm()} className="text-red-500">Ganti</Button>}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4 pt-2">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                            Informasi KFA (SATUSEHAT)
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label>Kode KFA Product</Label>
                                                <Input
                                                    required
                                                    placeholder="93000..."
                                                    value={form.obat_code}
                                                    onChange={(e) => setForm({ ...form, obat_code: e.target.value })}
                                                    className="font-mono text-xs h-10"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>Nama KFA Display</Label>
                                                <Input
                                                    required
                                                    placeholder="Amoxicillin 500mg Oral..."
                                                    value={form.obat_display}
                                                    onChange={(e) => setForm({ ...form, obat_display: e.target.value })}
                                                    className="h-10 text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                            <div className="space-y-1.5">
                                                <Label className="flex items-center gap-1.5">
                                                    <Layers className="w-3.5 h-3.5" /> Dose Form Code
                                                </Label>
                                                <Input
                                                    placeholder="POWDER..."
                                                    value={form.form_code}
                                                    onChange={(e) => setForm({ ...form, form_code: e.target.value })}
                                                    className="font-mono text-xs h-10"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>Dose Form Display</Label>
                                                <Input
                                                    placeholder="Puyuh..."
                                                    value={form.form_display}
                                                    onChange={(e) => setForm({ ...form, form_display: e.target.value })}
                                                    className="h-10 text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                            <div className="space-y-1.5">
                                                <Label className="flex items-center gap-1.5">
                                                    <Filter className="w-3.5 h-3.5" /> Route Code
                                                </Label>
                                                <Input
                                                    placeholder="ORAL..."
                                                    value={form.route_code}
                                                    onChange={(e) => setForm({ ...form, route_code: e.target.value })}
                                                    className="font-mono text-xs h-10"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>Route Display</Label>
                                                <Input
                                                    placeholder="Oral..."
                                                    value={form.route_display}
                                                    onChange={(e) => setForm({ ...form, route_display: e.target.value })}
                                                    className="h-10 text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 border-t bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
                                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                                            Batal
                                        </Button>
                                        <Button type="submit" disabled={saving} className="bg-indigo-600 min-w-[150px]">
                                            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                            Simpan
                                        </Button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <Toaster toasts={toasts} onRemove={removeToast} />
            </motion.div>
        </LayoutUtama>
    );
}
