import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Activity,
    Plus,
    Edit2,
    Trash2,
    ChartColumn,
    Loader2,
    Info,
    Calendar,
    Clock,
    Thermometer,
    Wind,
    Heart,
    Zap,
    Save,
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
import VitalSignsChart from "@/Pages/RawatJalan/components/VitalSignsChart";

export default function CatatanObservasiRanap({ noRawat = "", useLayout = false }) {
    const getCsrfToken = () => {
        return (
            document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") ||
            ""
        );
    };

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
    const [showVitalChart, setShowVitalChart] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        tgl_perawatan: new Date().toISOString().split("T")[0],
        jam_rawat: new Date().toTimeString().split(" ")[0].substring(0, 5),
        gcs: "",
        td: "",
        hr: "",
        rr: "",
        suhu: "",
        spo2: "",
        nip: "",
        nm_petugas: "",
    });

    const normalizeJamRawat = (value) => {
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
            const res = await fetch(
                `/rawat-inap/catatan-observasi?no_rawat=${encodeURIComponent(nr)}`,
                {
                    headers: {
                        Accept: "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                    },
                    cache: "no-store",
                }
            );

            let json = null;
            try {
                json = await res.json();
            } catch {
                json = null;
            }

            if (!res.ok) {
                const message = (json && (json.message || json.error)) || `HTTP ${res.status}`;
                addToast("danger", "Gagal memuat data", message);
                return;
            }

            setRecords((json && json.data) || []);
        } catch (e) {
            addToast("danger", "Gagal memuat data", e.message);
        } finally {
            setLoading(false);
        }
    };

    const vitalChartData = useMemo(() => {
        if (!Array.isArray(records) || records.length === 0) return [];

        return records.map((r) => ({
            no_rawat: r.no_rawat,
            tgl_perawatan: r.tgl_perawatan,
            jam_rawat: r.jam_rawat,
            suhu_tubuh: r.suhu,
            tensi: r.td,
            nadi: r.hr,
            respirasi: r.rr,
            spo2: r.spo2,
            gcs: r.gcs,
        }));
    }, [records]);

    const openVitalChart = async () => {
        setShowVitalChart(true);
        const nr = String(noRawat || "").trim();
        if (!nr) return;
        if (!Array.isArray(records) || records.length === 0) {
            await loadRecords();
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
            tgl_perawatan: new Date().toISOString().split("T")[0],
            jam_rawat: new Date().toTimeString().split(" ")[0].substring(0, 5),
            gcs: "",
            td: "",
            hr: "",
            rr: "",
            suhu: "",
            spo2: "",
            nip: "",
            nm_petugas: "",
        });
        setShowModal(true);
    };

    const openEditModal = (record) => {
        setEditingRecord(record);
        setFormData({
            ...record,
            jam_rawat: String(record.jam_rawat).substring(0, 5),
            nm_petugas: record.petugas?.nm_petugas || "",
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const csrfToken = getCsrfToken();

        try {
            const url = "/rawat-inap/catatan-observasi";
            const method = editingRecord ? "PUT" : "POST";
            const payload = { ...formData, no_rawat: String(noRawat || "").trim() };
            payload.jam_rawat = normalizeJamRawat(payload.jam_rawat);

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            let json = null;
            try {
                json = await res.json();
            } catch {
                json = null;
            }

            if (res.ok) {
                addToast("success", "Berhasil", (json && json.message) || "Catatan observasi tersimpan");
                setShowModal(false);
                if (!editingRecord) {
                    setRecords((prev) => {
                        const next = [
                            {
                                ...payload,
                                petugas: payload.nm_petugas
                                    ? { nm_petugas: payload.nm_petugas }
                                    : undefined,
                            },
                            ...prev,
                        ];

                        next.sort((a, b) => {
                            const aKey = `${a.tgl_perawatan || ""} ${normalizeJamRawat(a.jam_rawat)}`;
                            const bKey = `${b.tgl_perawatan || ""} ${normalizeJamRawat(b.jam_rawat)}`;
                            return bKey.localeCompare(aKey);
                        });
                        return next;
                    });
                }
                await loadRecords();
            } else {
                const message =
                    (json && (json.message || json.error)) ||
                    `HTTP ${res.status}`;
                addToast("danger", "Gagal menyimpan", message);
            }
        } catch (e) {
            addToast("danger", "Gagal menghubungkan ke server", e.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (record) => {
        if (!confirm("Apakah Anda yakin ingin menghapus catatan ini?")) return;

        const csrfToken = getCsrfToken();
        try {
            const res = await fetch("/rawat-inap/catatan-observasi", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    no_rawat: record.no_rawat,
                    tgl_perawatan: record.tgl_perawatan,
                    jam_rawat: record.jam_rawat,
                }),
            });

            const json = await res.json();
            if (res.ok) {
                addToast("success", "Berhasil", json.message);
                loadRecords();
            } else {
                addToast("danger", "Gagal menghapus", json.message || "Terjadi kesalahan");
            }
        } catch (e) {
            addToast("danger", "Gagal menghubungkan ke server", e.message);
        }
    };

    // Variants for animation
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
                    className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-xl"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
                                <Activity className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Catatan Observasi Pasien (Ranap)
                            </h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="secondary"
                                onClick={openVitalChart}
                                disabled={loading || !String(noRawat || "").trim()}
                                size="sm"
                                className="bg-white/90 dark:bg-gray-800/90"
                            >
                                <ChartColumn className="w-4 h-4 mr-2" />
                                Grafik Vital Sign
                            </Button>
                            <Button
                                onClick={openAddModal}
                                size="sm"
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Observasi
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* List Records */}
                <motion.div variants={itemVariants}>
                    <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl shadow-blue-500/5">
                        <Table className="text-sm">
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80">
                                    <TableHead className="py-4 px-4 font-bold">Waktu</TableHead>
                                    <TableHead className="py-4 px-4 font-bold">GCS</TableHead>
                                    <TableHead className="py-4 px-4 font-bold">TD</TableHead>
                                    <TableHead className="py-4 px-4 font-bold">HR</TableHead>
                                    <TableHead className="py-4 px-4 font-bold">RR</TableHead>
                                    <TableHead className="py-4 px-4 font-bold">Suhu</TableHead>
                                    <TableHead className="py-4 px-4 font-bold">SpO2</TableHead>
                                    <TableHead className="py-4 px-4 font-bold">Petugas</TableHead>
                                    <TableHead className="py-4 px-4 font-bold text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <AnimatePresence mode="popLayout">
                                    {records.map((row, idx) => (
                                        <motion.tr
                                            key={`${row.tgl_perawatan}-${row.jam_rawat}`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-colors"
                                        >
                                            <TableCell className="py-4 px-4">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold">{row.tgl_perawatan}</span>
                                                    <span className="text-xs text-gray-500">{String(row.jam_rawat).substring(0, 5)}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4 px-4 uppercase font-mono">{row.gcs || "-"}</TableCell>
                                            <TableCell className="py-4 px-4 font-mono">{row.td || "-"}</TableCell>
                                            <TableCell className="py-4 px-4 font-mono">{row.hr || "-"}</TableCell>
                                            <TableCell className="py-4 px-4 font-mono">{row.rr || "-"}</TableCell>
                                            <TableCell className="py-4 px-4 font-mono">{row.suhu || "-"}</TableCell>
                                            <TableCell className="py-4 px-4">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold text-xs">
                                                    {row.spo2}%
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-4 px-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-xs">{row.petugas?.nm_petugas || "-"}</span>
                                                    <span className="text-[10px] text-gray-400">{row.nip}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openEditModal(row)}
                                                        className="h-8 w-8 text-blue-600 hover:bg-blue-50"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(row)}
                                                        className="h-8 w-8 text-red-600 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                                {records.length === 0 && !loading && (
                                    <TableRow>
                                        <TableCell colSpan={9} className="py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <Info className="w-12 h-12 text-gray-200" />
                                                <p>Belum ada catatan observasi untuk pasien ini.</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {loading && (
                                    <TableRow>
                                        <TableCell colSpan={9} className="py-12 text-center">
                                            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </motion.div>
            </motion.div>

            <Modal
                show={showVitalChart}
                onClose={() => setShowVitalChart(false)}
                title="Grafik Vital Sign"
                size="wide"
            >
                {loading ? (
                    <div className="py-12 text-center">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
                    </div>
                ) : (
                    <VitalSignsChart variant="cards" data={vitalChartData} />
                )}
            </Modal>

            {/* Modal Form */}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                title={editingRecord ? "Edit Observasi" : "Tambah Observasi Baru"}
                size="lg"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label required>Tanggal Perawatan</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                <Input
                                    type="date"
                                    name="tgl_perawatan"
                                    value={formData.tgl_perawatan}
                                    onChange={handleInputChange}
                                    className="pl-10 h-10"
                                    required
                                    disabled={!!editingRecord}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label required>Jam Rawat</Label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                <Input
                                    type="time"
                                    name="jam_rawat"
                                    value={formData.jam_rawat}
                                    onChange={handleInputChange}
                                    className="pl-10 h-10"
                                    required
                                    disabled={!!editingRecord}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label>GCS (E,V,M)</Label>
                            <Input
                                name="gcs"
                                value={formData.gcs}
                                onChange={handleInputChange}
                                className="h-10 text-center font-mono"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label required>Tensi (mmHg)</Label>
                            <Input
                                name="td"
                                value={formData.td}
                                onChange={handleInputChange}
                                className="h-10 text-center font-mono"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Nadi (bpm)</Label>
                            <div className="relative">
                                <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
                                <Input
                                    name="hr"
                                    value={formData.hr}
                                    onChange={handleInputChange}
                                    className="pl-10 h-10 text-center font-mono"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Resp (x/mnt)</Label>
                            <div className="relative">
                                <Wind className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                                <Input
                                    name="rr"
                                    value={formData.rr}
                                    onChange={handleInputChange}
                                    className="pl-10 h-10 text-center font-mono"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Suhu (°C)</Label>
                            <div className="relative">
                                <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                                <Input
                                    name="suhu"
                                    value={formData.suhu}
                                    onChange={handleInputChange}
                                    className="pl-10 h-10 text-center font-mono"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label required>SpO2 (%)</Label>
                            <div className="relative">
                                <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-500" />
                                <Input
                                    name="spo2"
                                    value={formData.spo2}
                                    onChange={handleInputChange}
                                    className="pl-10 h-10 text-center font-mono"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2 md:col-span-1">
                            <Label required>Petugas</Label>
                            <div className="relative">
                                <SearchableSelect
                                    source="petugas"
                                    value={formData.nip}
                                    onChange={(val) => setFormData(prev => ({ ...prev, nip: val }))}
                                    onSelect={(opt) => setFormData(prev => ({ ...prev, nm_petugas: opt?.label || "" }))}
                                    placeholder="Pilih petugas"
                                    defaultDisplay={formData.nm_petugas}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={saving}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white min-w-[120px]"
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                                <Save className="w-4 h-4 mr-2" />
                            )}
                            {editingRecord ? "Update Data" : "Simpan Data"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );

    if (useLayout) {
        return (
            <SidebarRawatInap title="Rawat Inap">
                <LayoutUtama title="Catatan Observasi" chrome={false}>
                    {content}
                </LayoutUtama>
            </SidebarRawatInap>
        );
    }

    return content;
}
