import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarBriding from "@/Layouts/SidebarBriding";
import { Card, CardHeader, CardContent } from "@/Components/ui/Card";
import Input from "@/Components/ui/Input";
import Label from "@/Components/ui/Label";
import Button from "@/Components/ui/Button";
import Toaster from "@/Components/ui/Toaster";
import {
    Search,
    ShieldAlert,
    CheckCircle2,
    XCircle,
    RefreshCw,
    Trash2,
    Edit2,
    Plus,
    Loader2,
    Save,
    Database,
    ChevronDown
} from "lucide-react";

export default function MappingAlergiPasien({ initialMappings = [], itemAlergi = [] }) {
    // State
    const [loading, setLoading] = useState(false);
    const [mappings, setMappings] = useState(initialMappings);
    const [search, setSearch] = useState("");
    const [toasts, setToasts] = useState([]);

    const [showAlergiDropdown, setShowAlergiDropdown] = useState(false);
    const [alergiSearchQuery, setAlergiSearchQuery] = useState("");

    const [showSubstanceDropdown, setShowSubstanceDropdown] = useState(false);
    const [substanceSearchQuery, setSubstanceSearchQuery] = useState("");
    const [substanceOptions, setSubstanceOptions] = useState([]);
    const [searchingSubstance, setSearchingSubstance] = useState(false);

    const [showManifestationDropdown, setShowManifestationDropdown] = useState(false);
    const [manifestationSearchQuery, setManifestationSearchQuery] = useState("");
    const [manifestationOptions, setManifestationOptions] = useState([]);
    const [searchingManifestation, setSearchingManifestation] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [formData, setFormData] = useState({
        alergi_kode: "",
        nama_alergi: "",
        kfa_code: "",
        kfa_display: "",
        snomed_code: "",
        snomed_display: "",
        manifestation_code: "",
        manifestation_display: "",
        category: "environment",
        criticality: "unable-to-assess"
    });

    const filteredItemAlergi = itemAlergi.filter(item =>
        item.nm_alergi.toLowerCase().includes(alergiSearchQuery.toLowerCase()) ||
        item.kd_alergi.toLowerCase().includes(alergiSearchQuery.toLowerCase())
    );

    const addToast = (type = "info", title = "", message = "", duration = 4000) => {
        const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    };
    const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

    const fetchMappings = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/satusehat/mapping-alergi/data");
            const json = await res.json();
            setMappings(json);
        } catch (_e) {
            addToast("danger", "Error", "Gagal mengambil data mapping");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectAlergi = (item) => {
        setFormData({
            ...formData,
            alergi_kode: item.kd_alergi,
            nama_alergi: item.nm_alergi
        });
        setAlergiSearchQuery(item.nm_alergi);
        setShowAlergiDropdown(false);

        // Trigger auto search
        handleAutoSearch(item.nm_alergi);
    };

    const handleAutoSearch = async (query) => {
        if (!query) return;

        try {
            const res = await fetch(`/api/satusehat/mapping-alergi/lookup?q=${encodeURIComponent(query)}`);
            const json = await res.json();

            if (json) {
                setFormData(prev => ({
                    ...prev,
                    kfa_code: json.kfa?.code || prev.kfa_code,
                    kfa_display: json.kfa?.display || prev.kfa_display,
                    snomed_code: json.snomed?.code || prev.snomed_code,
                    snomed_display: json.snomed?.display || prev.snomed_display,
                    category: json.category || prev.category,
                    criticality: json.criticality || prev.criticality
                }));
            }
        } catch (error) {
            console.error("Lookup error:", error);
        }
    };

    const searchSubstances = async (q) => {
        if (q.length < 2) return;
        setSearchingSubstance(true);
        try {
            const res = await fetch(`/api/satusehat/mapping-alergi/substance?q=${encodeURIComponent(q)}`);
            const json = await res.json();
            setSubstanceOptions(json);
        } catch (error) {
            console.error("Substance search error:", error);
        } finally {
            setSearchingSubstance(false);
        }
    };

    const searchManifestations = async (q) => {
        if (q.length < 2) return;
        setSearchingManifestation(true);
        try {
            const res = await fetch(`/api/satusehat/mapping-alergi/manifestation?q=${encodeURIComponent(q)}`);
            const json = await res.json();
            setManifestationOptions(json);
        } catch (error) {
            console.error("Manifestation search error:", error);
        } finally {
            setSearchingManifestation(false);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            const res = await fetch("/api/satusehat/mapping-alergi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const json = await res.json();
            if (res.ok) {
                addToast("success", "Berhasil", "Mapping berhasil disimpan");
                setIsModalOpen(false);
                resetForm();
                fetchMappings();
            } else {
                addToast("danger", "Gagal", json.message || "Gagal menyimpan mapping");
            }
        } catch (_e) {
            addToast("danger", "Error", "Terjadi kesalahan koneksi");
        } finally {
            setFormLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            alergi_kode: "",
            nama_alergi: "",
            kfa_code: "",
            kfa_display: "",
            snomed_code: "",
            snomed_display: "",
            manifestation_code: "",
            manifestation_display: "",
            category: "environment",
            criticality: "unable-to-assess"
        });
        setAlergiSearchQuery("");
        setSubstanceSearchQuery("");
        setManifestationSearchQuery("");
    };

    const handleDelete = async (id) => {
        if (!confirm("Hapus mapping ini?")) return;
        try {
            const res = await fetch(`/api/satusehat/mapping-alergi/${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                addToast("success", "Terhapus", "Mapping berhasil dihapus");
                fetchMappings();
            }
        } catch (_e) {
            addToast("danger", "Error", "Gagal menghapus");
        }
    };


    const filteredMappings = mappings.filter(m =>
        m.nama_alergi.toLowerCase().includes(search.toLowerCase()) ||
        m.alergi_kode.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SidebarBriding title="Mapping Alergi Satu Sehat">
            <div className="p-4 md:p-8 space-y-6 bg-slate-50 min-h-screen">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <ShieldAlert className="text-red-500 w-7 h-7" />
                            Mapping Alergi Pasien
                        </h1>
                        <p className="text-gray-500">Mapping master alergi lokal ke kode standar KFA & SNOMED CT</p>
                    </div>
                    <Button
                        onClick={() => {
                            resetForm();
                            setIsModalOpen(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah Mapping
                    </Button>
                </div>

                {/* Table Section */}
                <Card className="border-none shadow-sm overflow-hidden">
                    <CardHeader className="bg-white border-b p-4 flex flex-row items-center justify-between">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari mapping..."
                                className="pl-10"
                            />
                        </div>
                        <Button variant="ghost" onClick={fetchMappings} disabled={loading}>
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold text-left">Alergi Lokal</th>
                                        <th className="px-6 py-3 font-semibold text-left">KFA ID (Substansi)</th>
                                        <th className="px-6 py-3 font-semibold text-left">SNOMED ID (Reaksi)</th>
                                        <th className="px-6 py-3 font-semibold text-left">Kategori/Crit</th>
                                        <th className="px-6 py-3 font-semibold text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {filteredMappings.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="py-10 text-center text-gray-400">
                                                Belum ada data mapping.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredMappings.map((m) => (
                                            <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-900">{m.nama_alergi}</div>
                                                    <div className="text-xs text-slate-400 font-mono italic">{m.alergi_kode}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {m.kfa_code ? (
                                                        <div>
                                                            <div className="text-blue-600 font-medium truncate max-w-[200px]" title={m.kfa_display}>{m.kfa_display}</div>
                                                            <div className="text-[10px] font-mono bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded w-fit mt-1">CODE: {m.kfa_code}</div>
                                                        </div>
                                                    ) : <span className="text-gray-300">-</span>}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {m.manifestation_code ? (
                                                        <div>
                                                            <div className="text-teal-600 font-medium truncate max-w-[200px]" title={m.manifestation_display}>{m.manifestation_display}</div>
                                                            <div className="text-[10px] font-mono bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded w-fit mt-1">SCT: {m.manifestation_code}</div>
                                                        </div>
                                                    ) : <span className="text-gray-300">-</span>}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase w-fit ${m.category === 'medication' ? 'bg-purple-100 text-purple-700' :
                                                            m.category === 'food' ? 'bg-orange-100 text-orange-700' :
                                                                'bg-slate-100 text-slate-700'
                                                            }`}>
                                                            {m.category}
                                                        </span>
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase w-fit ${m.criticality === 'high' ? 'bg-red-100 text-red-700' :
                                                            m.criticality === 'low' ? 'bg-emerald-100 text-emerald-700' :
                                                                'bg-gray-100 text-gray-700'
                                                            }`}>
                                                            {m.criticality}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => {
                                                                setFormData(m);
                                                                setAlergiSearchQuery(m.nama_alergi);
                                                                setSubstanceSearchQuery(m.kfa_display || "");
                                                                setManifestationSearchQuery(m.manifestation_display || "");
                                                                setIsModalOpen(true);
                                                            }}
                                                        >
                                                            <Edit2 className="w-4 h-4 text-slate-400" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDelete(m.id)}
                                                        >
                                                            <Trash2 className="w-4 h-4 text-red-400" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Modal Form */}
                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
                            >
                                <div className="p-6 border-b bg-slate-50/50 flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                        <Database className="w-5 h-5 text-blue-500" />
                                        Form Mapping Alergi
                                    </h2>
                                    <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                        <XCircle className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Row 1: Alergi Lokal */}
                                        <div className="space-y-2 md:col-span-2 relative">
                                            <Label className="text-slate-700 font-semibold">Pilih Alergi Lokal</Label>
                                            <div className="relative">
                                                <Input
                                                    value={alergiSearchQuery}
                                                    onChange={(e) => {
                                                        setAlergiSearchQuery(e.target.value);
                                                        setShowAlergiDropdown(true);
                                                    }}
                                                    onFocus={() => setShowAlergiDropdown(true)}
                                                    placeholder="Cari Master Alergi..."
                                                    className="pr-10"
                                                />
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                                            </div>

                                            {showAlergiDropdown && (
                                                <div className="absolute z-[70] mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                                                    {filteredItemAlergi.length === 0 ? (
                                                        <div className="p-3 text-slate-400 text-sm text-center italic">Alergi tidak ditemukan.</div>
                                                    ) : (
                                                        filteredItemAlergi.map((item) => (
                                                            <button
                                                                key={item.kd_alergi}
                                                                type="button"
                                                                onClick={() => handleSelectAlergi(item)}
                                                                className="w-full text-left p-3 hover:bg-slate-50 transition-colors border-b border-slate-50 flex flex-col items-start gap-1"
                                                            >
                                                                <span className="font-semibold text-slate-800 text-sm">{item.nm_alergi}</span>
                                                                <span className="text-[10px] font-mono text-slate-400 italic font-medium">{item.kd_alergi}</span>
                                                            </button>
                                                        ))
                                                    )}
                                                </div>
                                            )}
                                        </div>


                                        {/* Row 2: Category */}
                                        <div className="space-y-2 md:col-span-2">
                                            <Label className="text-slate-700 font-semibold">Kategori Alergi (FHIR)</Label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                {['medication', 'food', 'environment', 'biologic'].map((cat) => (
                                                    <label key={cat} className={`border rounded-xl p-2.5 flex items-center gap-2 cursor-pointer transition-all ${formData.category === cat ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'hover:bg-slate-50'
                                                        }`}>
                                                        <input
                                                            type="radio"
                                                            name="category"
                                                            value={cat}
                                                            checked={formData.category === cat}
                                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                            className="sr-only"
                                                        />
                                                        {formData.category === cat ? <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> : <div className="w-3.5 h-3.5 border rounded-full" />}
                                                        <span className="text-[10px] font-bold uppercase text-slate-600">{cat}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Row: Criticality */}
                                        <div className="space-y-2 md:col-span-2">
                                            <Label className="text-slate-700 font-semibold">Criticality (Risiko)</Label>
                                            <div className="flex gap-2">
                                                {['low', 'high', 'unable-to-assess'].map((crit) => (
                                                    <label key={crit} className={`flex-1 border rounded-xl p-2.5 flex items-center gap-2 cursor-pointer transition-all ${formData.criticality === crit ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500' : 'hover:bg-slate-50'
                                                        }`}>
                                                        <input
                                                            type="radio"
                                                            name="criticality"
                                                            value={crit}
                                                            checked={formData.criticality === crit}
                                                            onChange={(e) => setFormData({ ...formData, criticality: e.target.value })}
                                                            className="sr-only"
                                                        />
                                                        {formData.criticality === crit ? <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> : <div className="w-3.5 h-3.5 border rounded-full" />}
                                                        <span className="text-[10px] font-bold uppercase text-slate-600">{crit}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Row 3: KFA ID (Searchable Substance) */}
                                        <div className="space-y-3 md:col-span-2 relative bg-blue-50/30 p-4 rounded-xl border border-blue-100">
                                            <Label className="text-blue-800 font-bold uppercase text-[10px] underline decoration-blue-200">Cari KFA ID (Substansi)</Label>
                                            <div className="relative">
                                                <Input
                                                    value={substanceSearchQuery}
                                                    onChange={(e) => {
                                                        const q = e.target.value;
                                                        setSubstanceSearchQuery(q);
                                                        setShowSubstanceDropdown(true);
                                                        searchSubstances(q);
                                                    }}
                                                    onFocus={() => setShowSubstanceDropdown(true)}
                                                    placeholder="Cari kode/nama dari satu_sehat_ref_allergy..."
                                                    className="pr-10 bg-white h-9 border-blue-200"
                                                />
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                    {searchingSubstance ? <Loader2 className="w-4 h-4 animate-spin text-slate-400" /> : <Search className="text-slate-400 w-4 h-4" />}
                                                </div>
                                            </div>

                                            {showSubstanceDropdown && substanceSearchQuery.length >= 2 && (
                                                <div className="absolute z-[70] mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                                                    {substanceOptions.length === 0 && !searchingSubstance ? (
                                                        <div className="p-3 text-slate-400 text-sm text-center italic">Tidak ditemukan.</div>
                                                    ) : (
                                                        substanceOptions.map((opt) => (
                                                            <button
                                                                key={opt.kode}
                                                                type="button"
                                                                onClick={() => {
                                                                    setFormData({ ...formData, kfa_code: opt.kode, kfa_display: opt.display });
                                                                    setSubstanceSearchQuery(opt.display);
                                                                    setShowSubstanceDropdown(false);
                                                                }}
                                                                className="w-full text-left p-2.5 hover:bg-slate-50 transition-colors border-b border-slate-50 flex flex-col"
                                                            >
                                                                <span className="font-semibold text-slate-800 text-xs">{opt.display}</span>
                                                                <span className="text-[10px] font-mono text-slate-400">{opt.kode}</span>
                                                            </button>
                                                        ))
                                                    )}
                                                </div>
                                            )}
                                            {formData.kfa_code && (
                                                <div className="flex items-center gap-2 bg-white/80 p-2 rounded-lg mt-1 border border-blue-100">
                                                    <div className="flex-1">
                                                        <div className="text-xs font-bold text-blue-700">{formData.kfa_display}</div>
                                                        <div className="text-[10px] text-blue-500 font-mono italic">KODE: {formData.kfa_code}</div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData({ ...formData, kfa_code: "", kfa_display: "" });
                                                            setSubstanceSearchQuery("");
                                                        }}
                                                        className="text-red-400 hover:text-red-600 p-1"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Row 4: SNOMED ID (Searchable Reaction) */}
                                        <div className="space-y-3 md:col-span-2 relative bg-teal-50/30 p-4 rounded-xl border border-teal-100">
                                            <Label className="text-teal-800 font-bold uppercase text-[10px] underline decoration-teal-200">Cari SNOMED ID (Reaksi)</Label>
                                            <div className="relative">
                                                <Input
                                                    value={manifestationSearchQuery}
                                                    onChange={(e) => {
                                                        const q = e.target.value;
                                                        setManifestationSearchQuery(q);
                                                        setShowManifestationDropdown(true);
                                                        searchManifestations(q);
                                                    }}
                                                    onFocus={() => setShowManifestationDropdown(true)}
                                                    placeholder="Cari manifestasi dari satu_sehat_ref_allergy_reaction..."
                                                    className="pr-10 bg-white h-9 border-teal-200"
                                                />
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                    {searchingManifestation ? <Loader2 className="w-4 h-4 animate-spin text-slate-400" /> : <Search className="text-slate-400 w-4 h-4" />}
                                                </div>
                                            </div>

                                            {showManifestationDropdown && manifestationSearchQuery.length >= 2 && (
                                                <div className="absolute z-[70] mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                                                    {manifestationOptions.length === 0 && !searchingManifestation ? (
                                                        <div className="p-3 text-slate-400 text-sm text-center italic">Tidak ditemukan.</div>
                                                    ) : (
                                                        manifestationOptions.map((opt) => (
                                                            <button
                                                                key={opt.kode}
                                                                type="button"
                                                                onClick={() => {
                                                                    setFormData({ ...formData, manifestation_code: opt.kode, manifestation_display: opt.display });
                                                                    setManifestationSearchQuery(opt.display);
                                                                    setShowManifestationDropdown(false);
                                                                }}
                                                                className="w-full text-left p-2.5 hover:bg-slate-50 transition-colors border-b border-slate-50 flex flex-col"
                                                            >
                                                                <span className="font-semibold text-slate-800 text-xs">{opt.display}</span>
                                                                <span className="text-[10px] font-mono text-slate-400">{opt.kode}</span>
                                                            </button>
                                                        ))
                                                    )}
                                                </div>
                                            )}
                                            {formData.manifestation_code && (
                                                <div className="flex items-center gap-2 bg-white/80 p-2 rounded-lg mt-1 border border-teal-100">
                                                    <div className="flex-1">
                                                        <div className="text-xs font-bold text-teal-700">{formData.manifestation_display}</div>
                                                        <div className="text-[10px] text-teal-500 font-mono italic italic">SCT: {formData.manifestation_code}</div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData({ ...formData, manifestation_code: "", manifestation_display: "" });
                                                            setManifestationSearchQuery("");
                                                        }}
                                                        className="text-red-400 hover:text-red-600 p-1"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4 border-t sticky bottom-0 bg-white">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Batal
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
                                            disabled={formLoading || !formData.alergi_kode}
                                        >
                                            {formLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                            Simpan Mapping
                                        </Button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <Toaster toasts={toasts} onRemove={removeToast} />
            </div>
        </SidebarBriding>
    );
}
