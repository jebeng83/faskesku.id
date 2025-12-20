import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";
import { motion } from "framer-motion";
import { CheckCircle2, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "@/tools/toast";

function DashboardHighlightPage({ highlights = [], priorities = [], flash }) {
    const [highlightItems, setHighlightItems] = useState([]);
    const [priorityItems, setPriorityItems] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setHighlightItems(
            Array.isArray(highlights)
                ? highlights.map((h) => ({
                      label: h.label || "",
                      text: h.text || "",
                  }))
                : []
        );
        setPriorityItems(
            Array.isArray(priorities)
                ? priorities.map((p) => ({
                      text: p.text || "",
                  }))
                : []
        );
    }, [highlights, priorities]);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const addHighlight = () => {
        setHighlightItems((prev) => [...prev, { label: "", text: "" }]);
    };

    const addPriority = () => {
        setPriorityItems((prev) => [...prev, { text: "" }]);
    };

    const updateHighlight = (index, field, value) => {
        setHighlightItems((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    const removeHighlight = (index) => {
        setHighlightItems((prev) => prev.filter((_, i) => i !== index));
    };

    const updatePriority = (index, value) => {
        setPriorityItems((prev) =>
            prev.map((item, i) => (i === index ? { text: value } : item))
        );
    };

    const removePriority = (index) => {
        setPriorityItems((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            highlights: highlightItems,
            priorities: priorityItems,
        };

        router.post(route("setting.dashboard.store"), payload, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Konfigurasi dashboard berhasil disimpan");
            },
            onError: () => {
                toast.error("Gagal menyimpan konfigurasi dashboard");
            },
            onFinish: () => {
                setSaving(false);
            },
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Head title="Highlight & Tindakan Prioritas" />
            <div className="w-full px-2 md:px-3 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mb-6 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm"
                >
                    <div className="flex items-center justify-between px-4 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-slate-800 tracking-tight">
                                    Highlight Tim & Tindakan Prioritas
                                </h1>
                                <p className="text-xs text-slate-500">
                                    Atur konten kartu highlight dan daftar
                                    tindakan prioritas di dashboard.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.form
                    onSubmit={onSubmit}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-4"
                >
                    <div className="lg:col-span-2 space-y-4">
                        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                            <div className="px-4 pt-4 pb-3 flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-semibold text-slate-800">
                                        Highlight Tim
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        Set maksimal tiga highlight singkat
                                        dengan label unit.
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={addHighlight}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Tambah Highlight
                                </button>
                            </div>
                            <div className="px-4 pb-4 space-y-3">
                                {highlightItems.length === 0 && (
                                    <div className="text-xs text-slate-500">
                                        Belum ada highlight. Tekan tombol
                                        Tambah Highlight untuk memulai.
                                    </div>
                                )}
                                {highlightItems.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3 flex flex-col gap-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-semibold">
                                                {idx + 1}
                                            </span>
                                            <input
                                                type="text"
                                                value={item.label}
                                                onChange={(e) =>
                                                    updateHighlight(
                                                        idx,
                                                        "label",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Label unit, misal: IGD, Farmasi"
                                                className="flex-1 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeHighlight(idx)
                                                }
                                                className="inline-flex items-center justify-center rounded-md border border-rose-200 bg-rose-50 px-1.5 py-1 text-xs text-rose-600 hover:bg-rose-100"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <textarea
                                            value={item.text}
                                            onChange={(e) =>
                                                updateHighlight(
                                                    idx,
                                                    "text",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Isi highlight, misal: Flow triase baru mulai 08:00 - pastikan form SOAP terisi lengkap."
                                            rows={2}
                                            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
                            <div className="px-4 pt-4 pb-3 flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-semibold text-slate-800">
                                        Tindakan Prioritas
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        Daftar hal yang perlu perhatian hari
                                        ini.
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={addPriority}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Tambah Item
                                </button>
                            </div>
                            <div className="px-4 pb-4 space-y-3">
                                {priorityItems.length === 0 && (
                                    <div className="text-xs text-slate-500">
                                        Belum ada tindakan prioritas. Tambah
                                        minimal satu item agar tampil di
                                        dashboard.
                                    </div>
                                )}
                                {priorityItems.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-2"
                                    >
                                        <div className="mt-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        </div>
                                        <textarea
                                            value={item.text}
                                            onChange={(e) =>
                                                updatePriority(
                                                    idx,
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Isi tindakan prioritas"
                                            rows={2}
                                            className="flex-1 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removePriority(idx)
                                            }
                                            className="mt-1 inline-flex items-center justify-center rounded-md border border-rose-200 bg-rose-50 px-1.5 py-1 text-xs text-rose-600 hover:bg-rose-100"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm px-4 py-4 flex items-center justify-between">
                            <div className="text-xs text-slate-500">
                                Perubahan akan langsung mempengaruhi tampilan
                                kartu di dashboard setelah disimpan.
                            </div>
                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
                            >
                                <Save className="w-4 h-4" />
                                {saving ? "Menyimpan..." : "Simpan Konfigurasi"}
                            </button>
                        </div>
                    </div>
                </motion.form>
            </div>
        </div>
    );
}

DashboardHighlightPage.layout = (page) => (
    <SidebarPengaturan title="Pengaturan" children={page} />
);

export default DashboardHighlightPage;

