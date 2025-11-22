import React, { useEffect, useMemo, useRef, useState } from "react";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/Components/ui";
import {
    ArrowPathIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    XMarkIcon,
    ArrowsUpDownIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

/**
 * Mapping Dokter PCare
 * - Textbox 1: Pencarian Dokter RS (tabel lokal: dokter)
 * - Textbox 2: Pencarian Dokter BPJS (Referensi Dokter PCare)
 * - Tambahan: Input nama poli BPJS (opsional) untuk nm_poli_pcare
 * - Datatable: daftar mapping dari tabel maping_dokter_pcare
 *
 * Catatan:
 * Pengguna semula meminta "poli BPJS" dari ReferensiDokter.jsx. Berdasarkan kebutuhan kolom
 * maping_dokter_pcare (kd_dokter, kd_dokter_pcare, nm_poli_pcare), textbox kedua lebih tepat
 * untuk mencari Dokter BPJS agar kd_dokter_pcare terisi. nm_poli_pcare disediakan sebagai input
 * opsional. Jika Anda menginginkan textbox kedua menjadi pencarian poli BPJS, beri tahu saya,
 * saya akan menyesuaikan pada endpoint /pcare/api/poli.
 */

// Smooth dropdown animation (menyerupai MappingPoliPcare)
const dropdownVariants = {
    initial: { opacity: 0, y: 8, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15 } },
    exit: { opacity: 0, y: 4, scale: 0.98, transition: { duration: 0.12 } },
};

const containerVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
};

const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
};

export default function MappingDokterPcare() {
    const [rsQuery, setRsQuery] = useState("");
    const [bpjsQuery, setBpjsQuery] = useState("");
    // nm_poli_pcare dihapus dari form sesuai instruksi

    const [rsList, setRsList] = useState([]);
    const [bpjsList, setBpjsList] = useState([]);
    const [mappings, setMappings] = useState([]);

    const [selectedRsDoctor, setSelectedRsDoctor] = useState(null);
    const [selectedBpjsDoctor, setSelectedBpjsDoctor] = useState(null);

    const [showRsDropdown, setShowRsDropdown] = useState(false);
    const [showBpjsDropdown, setShowBpjsDropdown] = useState(false);

    const [loadingRs, setLoadingRs] = useState(false);
    const [loadingBpjs, setLoadingBpjs] = useState(false);

    const [saving, setSaving] = useState(false);
    const [deletingKey, setDeletingKey] = useState(null);

    // Toast notifications
    const [toasts, setToasts] = useState([]);
    const showToast = ({ type = "success", title, message, duration = 3000 }) => {
        setToasts((prev) => [
            ...prev,
            { id: Date.now() + Math.random(), type, title, message, duration },
        ]);
    };

    const rsAutoFetchLockedRef = useRef(false);
    const rsDebounceRef = useRef(null);
    const bpjsDebounceRef = useRef(null);

    const csrfToken = useMemo(() => {
        const el = document.querySelector("meta[name=csrf-token]");
        return el ? el.getAttribute("content") : "";
    }, []);

    // Pagination state
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [mapQuery, setMapQuery] = useState("");

    useEffect(() => {
        // initial load of mappings and bpjs doctors (first page)
        fetchMappings();
        fetchBpjsDoctors("");
        // Load base list Dokter RS agar dropdown tampil dengan data
        rsAutoFetchLockedRef.current = true;
        fetchRsDoctors("")
            .finally(() => {
                setShowRsDropdown(true);
                setTimeout(() => (rsAutoFetchLockedRef.current = false), 500);
            });
    }, []);

    useEffect(() => {
        // Auto-fetch RS doctors when typing at least 2 characters, debounced 300ms
        if (rsAutoFetchLockedRef.current) return;
        if (rsDebounceRef.current) clearTimeout(rsDebounceRef.current);
        rsDebounceRef.current = setTimeout(() => {
            const q = rsQuery.trim();
            if (q.length >= 2) {
                fetchRsDoctors(q);
            } else {
                // Biarkan base list tetap tampil saat query pendek
                setShowRsDropdown(true);
            }
        }, 300);
        return () =>
            rsDebounceRef.current && clearTimeout(rsDebounceRef.current);
    }, [rsQuery]);

    useEffect(() => {
        // Debounced filter for BPJS doctors; fetch base list once, then filter client-side
        if (bpjsDebounceRef.current) clearTimeout(bpjsDebounceRef.current);
        bpjsDebounceRef.current = setTimeout(() => {
            const q = bpjsQuery.trim().toLowerCase();
            if (q === "") {
                // refresh base
                fetchBpjsDoctors("");
            } else {
                // client-side filter on cached list
                setBpjsList((prev) =>
                    prev.filter((d) => {
                        const kd = (
                            d.kdDokter ||
                            d.kd_dokter ||
                            ""
                        ).toLowerCase();
                        const nm = (
                            d.nmDokter ||
                            d.nm_dokter ||
                            ""
                        ).toLowerCase();
                        return kd.includes(q) || nm.includes(q);
                    })
                );
            }
        }, 250);
        return () =>
            bpjsDebounceRef.current && clearTimeout(bpjsDebounceRef.current);
    }, [bpjsQuery]);

    async function fetchRsDoctors(q) {
        setLoadingRs(true);
        try {
            const res = await fetch(
                `/pcare/api/rs/dokter?q=${encodeURIComponent(q)}`,
                {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                    },
                    credentials: "same-origin",
                }
            );
            const json = await res.json();
            setRsList(Array.isArray(json.data) ? json.data : []);
            setShowRsDropdown(true);
        } catch (e) {
            console.error("fetchRsDoctors failed", e);
        } finally {
            setLoadingRs(false);
        }
    }

    async function fetchBpjsDoctors() {
        setLoadingBpjs(true);
        try {
            const res = await fetch(`/pcare/api/dokter?start=0&limit=200`, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                },
                credentials: "same-origin",
            });
            const json = await res.json();
            const list = json?.response?.list || [];
            setBpjsList(Array.isArray(list) ? list : []);
            setShowBpjsDropdown(true);
        } catch (e) {
            console.error("fetchBpjsDoctors failed", e);
        } finally {
            setLoadingBpjs(false);
        }
    }

    async function fetchMappings() {
        try {
            const res = await fetch("/pcare/api/mapping/dokter", {
                headers: { "X-Requested-With": "XMLHttpRequest" },
                credentials: "same-origin",
            });
            const json = await res.json();
            setMappings(Array.isArray(json.data) ? json.data : []);
        } catch (e) {
            console.error("fetchMappings failed", e);
        }
    }

    // Filter & pagination for Data Mapping
    const filteredRows = useMemo(() => {
        const q = mapQuery.trim().toLowerCase();
        if (!q) return mappings;
        return mappings.filter((row) =>
            (row.kd_dokter || "").toLowerCase().includes(q) ||
            (row.kd_dokter_pcare || "").toLowerCase().includes(q) ||
            (row.nm_dokter_pcare || "").toLowerCase().includes(q)
        );
    }, [mappings, mapQuery]);

    // Clamp page when data or perPage changes
    useEffect(() => {
        const total = filteredRows.length;
        const pc = Math.max(1, Math.ceil(total / perPage));
        setPage((prev) => Math.min(prev, pc));
    }, [filteredRows, perPage]);

    const totalRows = filteredRows.length;
    const pageCount = Math.max(1, Math.ceil(totalRows / perPage));
    const startIndex = (page - 1) * perPage;
    const endIndexExclusive = Math.min(startIndex + perPage, totalRows);
    const visibleRows = filteredRows.slice(startIndex, endIndexExclusive);

    function onSelectRsDoctor(item) {
        setSelectedRsDoctor(item);
        setRsQuery(`${item.kd_dokter || ""} — ${item.nm_dokter || ""}`.trim());
        setShowRsDropdown(false);
        // lock auto-fetch briefly to avoid immediate refetch
        rsAutoFetchLockedRef.current = true;
        setTimeout(() => (rsAutoFetchLockedRef.current = false), 500);
    }

    function onSelectBpjsDoctor(item) {
        setSelectedBpjsDoctor(item);
        setBpjsQuery(
            `${item.kdDokter || item.kd_dokter || ""} — ${
                item.nmDokter || item.nm_dokter || ""
            }`.trim()
        );
        setShowBpjsDropdown(false);
    }

    async function onSaveMapping() {
        if (!selectedRsDoctor || !selectedBpjsDoctor) {
            showToast({
                type: "warning",
                title: "Lengkapi Pilihan",
                message: "Pilih Dokter RS dan Dokter BPJS terlebih dahulu",
            });
            return;
        }
        const payload = {
            kd_dokter: selectedRsDoctor.kd_dokter || "",
            kd_dokter_pcare:
                selectedBpjsDoctor.kdDokter ||
                selectedBpjsDoctor.kd_dokter ||
                "",
            nm_dokter_pcare: (
                selectedBpjsDoctor.nmDokter ||
                selectedBpjsDoctor.nm_dokter ||
                ""
            ).slice(0, 50),
        };
        if (!payload.kd_dokter || !payload.kd_dokter_pcare) {
            showToast({
                type: "error",
                title: "Data Tidak Lengkap",
                message: "Kode dokter RS atau BPJS kosong",
            });
            return;
        }
        setSaving(true);
        try {
            const res = await fetch("/pcare/api/mapping/dokter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-TOKEN": csrfToken,
                },
                credentials: "same-origin",
                body: JSON.stringify(payload),
            });
            const json = await res.json();
            if (res.ok) {
                await fetchMappings();
                showToast({
                    type: "success",
                    title: "Mapping Disimpan",
                    message:
                        json?.metaData?.message ||
                        "Berhasil menyimpan mapping dokter",
                });
            } else {
                showToast({
                    type: "error",
                    title: "Gagal Menyimpan",
                    message:
                        json?.metaData?.message ||
                        "Gagal menyimpan mapping dokter",
                });
            }
        } catch (e) {
            console.error("save mapping failed", e);
            showToast({
                type: "error",
                title: "Kesalahan",
                message: "Terjadi kesalahan saat menyimpan",
            });
        } finally {
            setSaving(false);
        }
    }

    async function onDeleteMapping(row) {
        const kd = row.kd_dokter;
        if (!kd) return;
        if (!confirm(`Hapus mapping untuk dokter RS ${kd}?`)) return;
        setDeletingKey(kd);
        try {
            const res = await fetch("/pcare/api/mapping/dokter", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-TOKEN": csrfToken,
                },
                credentials: "same-origin",
                body: JSON.stringify({
                    kd_dokter: kd,
                    kd_dokter_pcare: row.kd_dokter_pcare || "",
                }),
            });
            const json = await res.json();
            if (res.ok) {
                await fetchMappings();
                showToast({
                    type: "success",
                    title: "Mapping Dihapus",
                    message:
                        json?.metaData?.message ||
                        "Berhasil menghapus mapping",
                });
            } else {
                showToast({
                    type: "error",
                    title: "Gagal Menghapus",
                    message:
                        json?.metaData?.message ||
                        "Gagal menghapus mapping",
                });
            }
        } catch (e) {
            console.error("delete mapping failed", e);
            showToast({
                type: "error",
                title: "Kesalahan",
                message: "Terjadi kesalahan saat menghapus",
            });
        } finally {
            setDeletingKey(null);
        }
    }

    async function onEditRow(row) {
        // Populate both textboxes; fetch nama dokter RS agar textbox tampil "kode — nama"
        const bpjsFilled = {
            kdDokter: row.kd_dokter_pcare,
            nmDokter: row.nm_dokter_pcare || row.kd_dokter_pcare,
        };
        setSelectedBpjsDoctor(bpjsFilled);
        setBpjsQuery(`${row.kd_dokter_pcare} — ${bpjsFilled.nmDokter}`);

        // Set awal RS (sementara hanya kode), lalu ambil nama dari endpoint RS dokter
        setSelectedRsDoctor({ kd_dokter: row.kd_dokter, nm_dokter: row.kd_dokter });
        setRsQuery(`${row.kd_dokter}`);

        setShowRsDropdown(false);
        setShowBpjsDropdown(false);

        rsAutoFetchLockedRef.current = true;
        setTimeout(() => (rsAutoFetchLockedRef.current = false), 600);

        try {
            const res = await fetch(`/pcare/api/rs/dokter?q=${encodeURIComponent(row.kd_dokter)}`, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
                credentials: "same-origin",
            });
            const json = await res.json();
            const list = Array.isArray(json.data) ? json.data : [];
            const doc = list.find((d) => d.kd_dokter === row.kd_dokter) || list[0];
            if (doc) {
                setSelectedRsDoctor(doc);
                setRsQuery(`${doc.kd_dokter} — ${doc.nm_dokter}`);
            }
        } catch (e) {
            console.error("fetch RS doctor for edit failed", e);
        }
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="p-4"
        >
            {/* Toast notifications */}
            <Toaster
                toasts={toasts}
                onRemove={(id) =>
                    setToasts((prev) => prev.filter((t) => t.id !== id))
                }
            />
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-4">
                <div className="rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 text-white p-5 shadow">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-xl font-semibold">
                                Mapping Dokter PCare
                            </h1>
                            <p className="text-sm opacity-90">
                                Hubungkan dokter RS ke referensi dokter BPJS
                                PCare.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5">
                                Form
                            </span>
                            <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5">
                                Datatable
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Search Inputs */}
            <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {/* RS Dokter */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-indigo-200 hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm font-semibold text-slate-800">
                                Dokter RS
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => fetchRsDoctors(rsQuery)}
                            className="inline-flex items-center gap-2 rounded-md bg-slate-800 text-white px-3 py-1.5 text-xs shadow hover:bg-slate-700"
                        >
                            <ArrowPathIcon className="h-4 w-4" /> Muat
                        </motion.button>
                    </div>
                    <div className="mt-2 relative">
                        <div className="flex items-center gap-2 group">
                            <MagnifyingGlassIcon className="h-4 w-4 text-slate-500" />
                            <input
                                type="text"
                                value={rsQuery}
                                onChange={(e) => {
                                    setRsQuery(e.target.value);
                                    setShowRsDropdown(true);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter")
                                        fetchRsDoctors(rsQuery);
                                    if (e.key === "Escape")
                                        setShowRsDropdown(false);
                                }}
                                onFocus={() => setShowRsDropdown(true)}
                                placeholder="Cari kode/nama dokter RS…"
                                className="w-full rounded-xl border-2 border-slate-300 text-base px-3 py-2 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                            />
                        </div>
                        <AnimatePresence>
                            {showRsDropdown && (
                                <motion.div
                                    variants={dropdownVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="absolute left-0 right-0 mt-1 z-20 bg-white/95 backdrop-blur border-2 border-slate-200 rounded-xl shadow-lg ring-1 ring-black/5 max-h-56 overflow-y-auto"
                                >
                                    {loadingRs ? (
                                        <div className="p-3 text-sm text-slate-500">
                                            Memuat…
                                        </div>
                                    ) : (rsList || []).length > 0 ? (
                                        rsList.map((it) => (
                                            <motion.button
                                                whileHover={{
                                                    backgroundColor:
                                                        "rgba(99,102,241,0.08)",
                                                }}
                                                type="button"
                                                key={it.kd_dokter}
                                                onClick={() =>
                                                    onSelectRsDoctor(it)
                                                }
                                                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                                                    selectedRsDoctor?.kd_dokter ===
                                                    it.kd_dokter
                                                        ? "bg-slate-100"
                                                        : ""
                                                }`}
                                            >
                                                <div className="font-medium text-slate-800">
                                                    {it.kd_dokter}
                                                </div>
                                                <div className="text-slate-600">
                                                    {it.nm_dokter}
                                                </div>
                                            </motion.button>
                                        ))
                                    ) : (
                                        <div className="p-3 text-sm text-slate-500">
                                            Tidak ada data
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {selectedRsDoctor && (
                            <div className="mt-2 text-xs text-slate-600">
                                Dipilih: {selectedRsDoctor.kd_dokter} —{" "}
                                {selectedRsDoctor.nm_dokter}
                            </div>
                        )}
                    </div>
                </div>

                {/* BPJS Dokter */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-indigo-200 hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm font-semibold text-slate-800">
                                Dokter BPJS
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => fetchBpjsDoctors()}
                            className="inline-flex items-center gap-2 rounded-md bg-slate-800 text-white px-3 py-1.5 text-xs shadow hover:bg-slate-700"
                        >
                            <ArrowPathIcon className="h-4 w-4" /> Muat
                        </motion.button>
                    </div>
                    <div className="mt-2">
                        <div className="flex items-center gap-2 group">
                            <MagnifyingGlassIcon className="h-4 w-4 text-slate-500" />
                            <input
                                type="text"
                                value={bpjsQuery}
                                onChange={(e) => {
                                    setBpjsQuery(e.target.value);
                                    setShowBpjsDropdown(true);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Escape")
                                        setShowBpjsDropdown(false);
                                }}
                                onFocus={() => setShowBpjsDropdown(true)}
                                placeholder="Cari kode/nama dokter BPJS…"
                                className="w-full rounded-xl border-2 border-slate-300 text-base px-3 py-2 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                            />
                        </div>
                        <AnimatePresence>
                            {showBpjsDropdown && (
                                <motion.div
                                    variants={dropdownVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="mt-1 z-20 bg-white/95 backdrop-blur border-2 border-slate-200 rounded-xl shadow-lg ring-1 ring-black/5 max-h-56 overflow-y-auto"
                                >
                                    {loadingBpjs ? (
                                        <div className="p-3 text-sm text-slate-500">
                                            Memuat…
                                        </div>
                                    ) : (bpjsList || []).length > 0 ? (
                                        bpjsList.map((it, idx) => (
                                            <motion.button
                                                whileHover={{
                                                    backgroundColor:
                                                        "rgba(99,102,241,0.08)",
                                                }}
                                                type="button"
                                                key={`${
                                                    it.kdDokter ||
                                                    it.kd_dokter ||
                                                    idx
                                                }`}
                                                onClick={() =>
                                                    onSelectBpjsDoctor(it)
                                                }
                                                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                                                    selectedBpjsDoctor?.kdDokter ===
                                                        it.kdDokter ||
                                                    selectedBpjsDoctor?.kd_dokter ===
                                                        it.kd_dokter
                                                        ? "bg-slate-100"
                                                        : ""
                                                }`}
                                            >
                                                <div className="font-medium text-slate-800">
                                                    {it.kdDokter ||
                                                        it.kd_dokter ||
                                                        "-"}
                                                </div>
                                                <div className="text-slate-600">
                                                    {it.nmDokter ||
                                                        it.nm_dokter ||
                                                        "-"}
                                                </div>
                                            </motion.button>
                                        ))
                                    ) : (
                                        <div className="p-3 text-sm text-slate-500">
                                            Tidak ada data
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {selectedBpjsDoctor && (
                            <div className="mt-2 text-xs text-slate-600">
                                Dipilih:{" "}
                                {selectedBpjsDoctor.kdDokter ||
                                    selectedBpjsDoctor.kd_dokter}{" "}
                                —{" "}
                                {selectedBpjsDoctor.nmDokter ||
                                    selectedBpjsDoctor.nm_dokter}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Action Save */}
            <motion.div
                variants={itemVariants}
                className="mt-3 flex items-center gap-2"
            >
                <motion.button
                    type="button"
                    onClick={onSaveMapping}
                    disabled={
                        saving || !selectedRsDoctor || !selectedBpjsDoctor
                    }
                    className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm shadow ${
                        saving || !selectedRsDoctor || !selectedBpjsDoctor
                            ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                            : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                    whileHover={{
                        scale:
                            saving || !selectedRsDoctor || !selectedBpjsDoctor
                                ? 1
                                : 1.02,
                    }}
                    whileTap={{
                        scale:
                            saving || !selectedRsDoctor || !selectedBpjsDoctor
                                ? 1
                                : 0.97,
                    }}
                >
                    <PlusIcon className="h-4 w-4" />{" "}
                    {saving ? "Menyimpan…" : "Tambah Mapping"}
                </motion.button>
            </motion.div>

            {/* Data Mapping - Card Model */}
            <motion.div
                variants={itemVariants}
                className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-slate-800">
                        Data Mapping
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="inline-flex items-center gap-1">
                            <CheckCircleIcon className="h-4 w-4 text-emerald-600" />{" "}
                            Siap
                        </span>
                    </div>
                </div>
                {/* Toolbar: Cari & Tampilkan */}
                <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex-1 max-w-md">
                        <div className="flex items-center gap-2">
                            <span className="text-sm">Cari mapping:</span>
                            <div className="flex items-center gap-2 flex-1">
                                <MagnifyingGlassIcon className="h-4 w-4 text-slate-500" />
                                <input
                                    type="text"
                                    value={mapQuery}
                                    onChange={(e) => { setMapQuery(e.target.value); setPage(1); }}
                                    placeholder="Cari dokter RS/BPJS…"
                                    className="w-full rounded-xl border-2 border-slate-300 text-sm px-3 py-1.5 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Tampilkan</span>
                        <Select value={String(perPage)} onValueChange={(val) => { setPerPage(Number(val)); setPage(1); }}>
                            <SelectTrigger className="w-[90px] h-8 text-xs">
                                <SelectValue placeholder="Jumlah" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="text-sm">data</span>
                    </div>
                </div>

                {/* Header columns (responsive) */}
                <div className="mt-3 hidden md:grid grid-cols-12 gap-2 text-xs text-slate-600">
                    <div className="col-span-1 px-2 flex items-center gap-1">No <ArrowsUpDownIcon className="h-3 w-3" /></div>
                    <div className="col-span-3 px-2 flex items-center gap-1">Dokter RS <ArrowsUpDownIcon className="h-3 w-3" /></div>
                    <div className="col-span-3 px-2 flex items-center gap-1">Dokter BPJS <ArrowsUpDownIcon className="h-3 w-3" /></div>
                    <div className="col-span-4 px-2">Nama Dokter BPJS</div>
                    <div className="col-span-1 px-2 text-right">Aksi</div>
                </div>

                {/* Card list */}
                <div className="mt-1 space-y-2">
                    {visibleRows.map((row, idx) => (
                        <div
                            key={`${row.kd_dokter}-${row.kd_dokter_pcare || ''}-${idx}`}
                            className="grid grid-cols-12 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm hover:shadow transition"
                        >
                            {/* No */}
                            <div className="col-span-1">
                                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                                    {startIndex + idx + 1}
                                </span>
                            </div>
                            {/* Dokter RS */}
                            <div className="col-span-12 md:col-span-3">
                                <div className="flex items-center gap-2">
                                    <UserCircleIcon className="h-5 w-5 text-slate-500" />
                                    <div className="text-sm font-medium text-slate-800">{row.kd_dokter}</div>
                                </div>
                            </div>
                            {/* Dokter BPJS */}
                            <div className="col-span-6 md:col-span-3">
                                <span className="inline-flex items-center rounded-full bg-sky-100 text-sky-700 px-2 py-0.5 text-xs">
                                    {row.kd_dokter_pcare}
                                </span>
                            </div>
                            {/* Nama Dokter BPJS */}
                            <div className="col-span-6 md:col-span-4">
                                <span className="text-sm text-slate-700">
                                    {row.nm_dokter_pcare || '-'}
                                </span>
                            </div>
                            {/* Aksi */}
                            <div className="col-span-12 md:col-span-1 md:text-right">
                                <div className="flex md:justify-end items-center gap-2">
                                    <motion.button
                                        type="button"
                                        onClick={() => onEditRow(row)}
                                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs bg-sky-600 text-white hover:bg-sky-700"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <PencilSquareIcon className="h-4 w-4" /> Edit
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        onClick={() => onDeleteMapping(row)}
                                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs bg-red-600 text-white hover:bg-red-700"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.97 }}
                                        disabled={deletingKey === row.kd_dokter}
                                    >
                                        <TrashIcon className="h-4 w-4" /> {deletingKey === row.kd_dokter ? 'Menghapus…' : 'Hapus'}
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {!totalRows && (
                        <div className="rounded-lg border border-slate-200 bg-white px-3 py-4 text-center text-slate-500">
                            Belum ada mapping
                        </div>
                    )}
                </div>

                {/* Pagination controls */}
                <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                    <div>
                        Menampilkan {totalRows === 0 ? 0 : startIndex + 1}–{totalRows === 0 ? 0 : endIndexExclusive} dari {totalRows} data
                    </div>
                    <div className="inline-flex items-center gap-1">
                        <button
                            type="button"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page <= 1}
                            className={`px-2 py-1 rounded-md border ${page <= 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                        >
                            Prev
                        </button>
                        <span className="px-2 py-1 rounded-md border bg-white text-slate-700">{page}</span>
                        <button
                            type="button"
                            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                            disabled={page >= pageCount}
                            className={`px-2 py-1 rounded-md border ${page >= pageCount ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

MappingDokterPcare.layout = (page) => (
    <SidebarPengaturan title="Pengaturan" children={page} />
);
