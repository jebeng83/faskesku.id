import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ClipboardList,
    Plus,
    Edit2,
    Trash2,
    Loader2,
    Calendar,
    Clock,
    Save,
    Search,
    User,
    FileText,
} from "lucide-react";
import Button from "@/Components/ui/Button";
import Input from "@/Components/ui/Input";
import Label from "@/Components/ui/Label";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/Components/ui/Table";
import Modal from "@/Components/Modal";
import Toaster from "@/Components/ui/Toaster";
import SearchableSelect from "@/Components/SearchableSelect";
import LayoutUtama from "@/Pages/LayoutUtama";
import SidebarRawatInap from "@/Layouts/SidebarRawatInap";
import axios from "axios";

export default function CatatanKeperawatanRanap({ noRawat = "", useLayout = false }) {
    const [toasts, setToasts] = useState([]);
    const addToast = (type = "info", title = "", message = "", duration = 4000) => {
        const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    };
    const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Form State
    const [formData, setFormData] = useState({
        tanggal: new Date().toISOString().split("T")[0],
        jam: new Date().toTimeString().split(" ")[0].substring(0, 5),
        uraian: "",
        nip: "",
        nm_petugas: "",
    });

    const normalizeJam = (value) => {
        const s = String(value || "").trim();
        if (/^\d{2}:\d{2}:\d{2}$/.test(s)) return s;
        if (/^\d{2}:\d{2}$/.test(s)) return `${s}:00`;
        return s;
    };

    const loadRecords = async () => {
        const nr = String(noRawat || "").trim();
        if (!nr) return;
        setLoading(true);
        try {
            const res = await axios.get(
                `/rawat-inap/catatan-keperawatan?no_rawat=${encodeURIComponent(nr)}`,
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            setRecords(res.data?.data || []);
        } catch (e) {
            const message = e.response?.data?.message || e.message;
            addToast("danger", "Gagal memuat data", message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRecords();
    }, [noRawat]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const openAddModal = () => {
        setEditingRecord(null);
        setFormData({
            tanggal: new Date().toISOString().split("T")[0],
            jam: new Date().toTimeString().split(" ")[0].substring(0, 5),
            uraian: "",
            nip: "",
            nm_petugas: "",
        });
        setShowModal(true);
    };

    const openEditModal = (record) => {
        setEditingRecord(record);
        setFormData({
            ...record,
            jam: String(record.jam).substring(0, 5),
            nm_petugas: record.petugas?.nama || "",
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const url = "/rawat-inap/catatan-keperawatan";
            const method = editingRecord ? "put" : "post";
            const payload = { ...formData, no_rawat: String(noRawat || "").trim() };
            payload.jam = normalizeJam(payload.jam);

            const res = await axios({
                method,
                url,
                data: payload,
                headers: {
                    Accept: "application/json",
                },
            });

            addToast("success", "Berhasil", res.data?.message || "Catatan keperawatan tersimpan");
            setShowModal(false);
            await loadRecords();
        } catch (e) {
            const message = e.response?.data?.message || e.message;
            addToast("danger", "Gagal menyimpan", message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (record) => {
        if (!confirm("Apakah Anda yakin ingin menghapus catatan ini?")) return;

        try {
            const res = await axios.delete("/rawat-inap/catatan-keperawatan", {
                data: {
                    no_rawat: record.no_rawat,
                    tanggal: record.tanggal,
                    jam: record.jam,
                },
                headers: {
                    Accept: "application/json",
                },
            });

            addToast("success", "Berhasil", res.data?.message);
            loadRecords();
        } catch (e) {
            const message = e.response?.data?.message || e.message;
            addToast("danger", "Gagal menghapus", message);
        }
    };

    const filteredRecords = useMemo(() => {
        if (!searchTerm) return records;
        return records.filter(r =>
            r.uraian?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.petugas?.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.nip?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [records, searchTerm]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const content = (
        <div className="space-y-6">
            <Toaster toasts={toasts} onRemove={removeToast} />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
            >
                {/* Header Section */}
                <motion.div
                    variants={itemVariants}
                    className="relative px-6 py-6 border border-white/20 dark:border-gray-700/50 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/5 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
                    <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/20">
                                <ClipboardList className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                                    Catatan Keperawatan
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                    Dokumentasi asuhan keperawatan pasien rawat inap
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Cari uraian atau petugas..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 text-sm bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full md:w-64 outline-none"
                                />
                            </div>
                            <Button
                                onClick={openAddModal}
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 rounded-xl px-6"
                            >
                                <Plus className="w-4 h-4 mr-2 stroke-[3]" />
                                <span className="font-bold">Tambah Catatan</span>
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Area */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6">
                    <div className="overflow-hidden rounded-3xl border border-white/20 dark:border-gray-700/50 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl shadow-2xl shadow-blue-500/5">
                        <div className="overflow-x-auto">
                            <Table className="text-sm">
                                <TableHeader>
                                    <TableRow className="bg-gray-50/50 dark:bg-gray-900/50 border-b-0">
                                        <TableHead className="py-5 px-6 font-bold text-gray-700 dark:text-gray-300">Waktu & Petugas</TableHead>
                                        <TableHead className="py-5 px-6 font-bold text-gray-700 dark:text-gray-300">Uraian Keperawatan</TableHead>
                                        <TableHead className="py-5 px-6 font-bold text-gray-700 dark:text-gray-300 text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <AnimatePresence mode="popLayout">
                                        {filteredRecords.map((row, idx) => (
                                            <motion.tr
                                                key={`${row.tanggal}-${row.jam}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ delay: idx * 0.03 }}
                                                className="group border-b border-gray-100/30 dark:border-gray-700/30 hover:bg-indigo-50/20 dark:hover:bg-indigo-900/10 transition-colors"
                                            >
                                                <TableCell className="py-6 px-6 align-top w-64">
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            <span>{row.tanggal}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium text-xs">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            <span>{String(row.jam).substring(0, 5)} WIB</span>
                                                        </div>
                                                        <div className="pt-2 flex items-start gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                                                                <User className="w-4 h-4" />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-xs text-gray-700 dark:text-gray-200">{row.petugas?.nama || "-"}</span>
                                                                <span className="text-[10px] text-gray-400 uppercase tracking-widest">{row.nip}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-6 px-6 align-top">
                                                    <div className="p-4 rounded-2xl bg-white/50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-700/50 whitespace-pre-wrap leading-relaxed text-gray-600 dark:text-gray-300 italic font-medium">
                                                        {row.uraian}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-6 px-6 align-top text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => openEditModal(row)}
                                                            className="h-9 w-9 rounded-xl text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDelete(row)}
                                                            className="h-9 w-9 rounded-xl text-red-600 hover:bg-red-100 dark:hover:bg-red-900/40"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                    {filteredRecords.length === 0 && !loading && (
                                        <TableRow>
                                            <TableCell colSpan={3} className="py-24 text-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="p-6 rounded-full bg-gray-50 dark:bg-gray-900/50 border-2 border-dashed border-gray-200 dark:border-gray-700">
                                                        <FileText className="w-12 h-12 text-gray-200 dark:text-gray-700" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h3 className="text-lg font-bold text-gray-400">Belum ada catatan</h3>
                                                        <p className="text-gray-400 text-sm max-w-xs mx-auto">Klik tombol "Tambah Catatan" untuk mulai mendokumentasikan asuhan keperawatan.</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {loading && (
                                        <TableRow>
                                            <TableCell colSpan={3} className="py-24 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
                                                    <span className="text-sm text-gray-400 font-bold animate-pulse">Menghubungkan ke pusat data...</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Modal Form */}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                title={editingRecord ? "Edit Catatan Keperawatan" : "Catatan Keperawatan Baru"}
                size="lg"
            >
                <form onSubmit={handleSubmit} className="space-y-8 p-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label className="font-bold text-xs uppercase tracking-wider text-gray-400">Tanggal Dokumentasi</Label>
                            <div className="relative group">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-colors group-focus-within:text-indigo-500" />
                                <Input
                                    type="date"
                                    name="tanggal"
                                    value={formData.tanggal}
                                    onChange={handleInputChange}
                                    className="pl-12 h-12 rounded-2xl border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 focus:ring-4 focus:ring-indigo-500/10 font-bold"
                                    required
                                    disabled={!!editingRecord}
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label className="font-bold text-xs uppercase tracking-wider text-gray-400">Jam Dokumentasi</Label>
                            <div className="relative group">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-colors group-focus-within:text-indigo-500" />
                                <Input
                                    type="time"
                                    name="jam"
                                    value={formData.jam}
                                    onChange={handleInputChange}
                                    className="pl-12 h-12 rounded-2xl border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 focus:ring-4 focus:ring-indigo-500/10 font-bold"
                                    required
                                    disabled={!!editingRecord}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="font-bold text-xs uppercase tracking-wider text-gray-400 text-indigo-500">Uraian Asuhan Keperawatan</Label>
                        <div className="relative">
                            <textarea
                                name="uraian"
                                value={formData.uraian}
                                onChange={handleInputChange}
                                rows={6}
                                className="w-full p-6 text-sm bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all leading-relaxed font-medium placeholder:italic placeholder:text-gray-300"
                                placeholder="Tuliskan uraian asuhan keperawatan secara detail di sini..."
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="font-bold text-xs uppercase tracking-wider text-gray-400">Petugas / Perawat</Label>
                        <div className="relative">
                            <SearchableSelect
                                source="petugas"
                                value={formData.nip}
                                onChange={(val) => setFormData(prev => ({ ...prev, nip: val }))}
                                onSelect={(opt) => setFormData(prev => ({ ...prev, nm_petugas: opt?.label || "" }))}
                                placeholder="Pilih perawat pelaksana..."
                                defaultDisplay={formData.nm_petugas}
                                className="h-12 rounded-2xl"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-8 border-t border-gray-100 dark:border-gray-800">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                            className="rounded-2xl px-6 h-12 font-bold"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={saving}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white min-w-[160px] rounded-2xl h-12 shadow-xl shadow-indigo-500/20"
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                                <Save className="w-4 h-4 mr-2" />
                            )}
                            <span className="font-bold">{editingRecord ? "Update Catatan" : "Simpan Catatan"}</span>
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );

    if (useLayout) {
        return (
            <SidebarRawatInap title="Rawat Inap">
                <LayoutUtama title="Catatan Keperawatan" chrome={false}>
                    {content}
                </LayoutUtama>
            </SidebarRawatInap>
        );
    }

    return content;
}
