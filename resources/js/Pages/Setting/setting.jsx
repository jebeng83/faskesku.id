import React, { useEffect, useMemo, useState } from "react";
import { Head, useForm, Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";
import { motion, AnimatePresence } from "framer-motion";
import {
    Save,
    Building2,
    Phone,
    Mail,
    MapPin,
    Hash,
    Image as ImageIcon,
    CheckCircle,
    Pencil,
    Trash2,
    Search,
} from "lucide-react";
import { toast } from "@/tools/toast";

// Halaman CRUD Setting Aplikasi
// - Sumber data: tabel `setting` (fallback ke `settings` jika ada)
// - Fitur: list, tambah, edit inline, hapus, dan describe struktur tabel

export default function SettingIndex({ settings = [], table, flash }) {
    // Animasi Framer Motion
    const cardVariants = {
        hidden: { opacity: 0, y: 8 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.35, ease: "easeOut" },
        },
    };
    const rowVariants = {
        hidden: { opacity: 0, y: 4 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
        exit: { opacity: 0, y: -4, transition: { duration: 0.15 } },
    };
    const MotionCard = ({ children, className = "" }) => (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className={`rounded-2xl border bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow ${className}`}
        >
            {children}
        </motion.div>
    );
    const formatBytes = (bytes) => {
        if (!bytes || bytes <= 0) return "-";
        const units = ["B", "KB", "MB", "GB"];
        let i = 0;
        let val = bytes;
        while (val >= 1024 && i < units.length - 1) {
            val /= 1024;
            i++;
        }
        return `${val.toFixed(val >= 10 ? 0 : 1)} ${units[i]}`;
    };
    const [query, setQuery] = useState("");
    const [groupFilter, setGroupFilter] = useState("");
    // Data untuk card "Setting Aplikasi" (legacy table `setting`)
    const [appRecords, setAppRecords] = useState([]);
    const [appLoading, setAppLoading] = useState(false);
    const [editingNama, setEditingNama] = useState(null);
    const [recordQuery, setRecordQuery] = useState("");
    // Struktur tabel
    const [tableStructure, setTableStructure] = useState(null);
    const [showStructure, setShowStructure] = useState(false);
    const appForm = useForm({
        nama_instansi: "",
        alamat_instansi: "",
        kabupaten: "",
        propinsi: "",
        kontak: "",
        email: "",
        aktifkan: "Yes",
        kode_ppk: "",
        kode_ppkinkhealth: "",
        kode_ppkkemenkes: "",
        wallpaper: null,
        logo: null,
    });

    const groups = useMemo(() => {
        const set = new Set((settings || []).map((s) => s.group || ""));
        return Array.from(set).filter(Boolean);
    }, [settings]);

    // Hapus card Struktur Tabel: tidak perlu describe tabel legacy di UI

    useEffect(() => {
        // Ambil data dari tabel legacy `setting`
        const loadApp = async () => {
            setAppLoading(true);
            try {
                const res = await fetch(route("setting.app.index", [], false));
                if (res.ok) {
                    const json = await res.json();
                    setAppRecords(json.data || []);
                }
            } catch (e) {
                console.warn("Gagal memuat data Setting Aplikasi", e);
            } finally {
                setAppLoading(false);
            }
        };
        loadApp();
    }, []);

    // Load struktur tabel setting
    const loadTableStructure = async () => {
        try {
            const res = await fetch(route("setting.describe", [], false));
            if (res.ok) {
                const json = await res.json();
                setTableStructure(json);
                setShowStructure(true);
            }
        } catch (e) {
            console.warn("Gagal memuat struktur tabel", e);
            toast.error("Gagal memuat struktur tabel");
        }
    };

    // Pencarian untuk tabel existing records
    const filteredRecords = useMemo(() => {
        const q = (recordQuery || "").toLowerCase().trim();
        if (!q) return appRecords;
        return (appRecords || []).filter((r) => {
            const fields = [
                r?.nama_instansi,
                r?.alamat_instansi,
                r?.kabupaten,
                r?.propinsi,
                r?.kontak,
                r?.email,
                r?.kode_ppk,
                // dukung variasi kolom kode ppk eksternal
                r?.kode_ppkinkhealth ?? r?.kode_ppkinhealth,
                r?.kode_ppkkemenkes,
            ];
            return fields.some((v) => (v || "").toLowerCase().includes(q));
        });
    }, [appRecords, recordQuery]);

    // Form tambah setting baru
    const { data, setData, post, processing, errors, reset } = useForm({
        group: "app",
        key: "",
        type: "string",
        value: "",
        description: "",
    });

    const onCreate = (e) => {
        e.preventDefault();
        post(route("setting.store"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Setting berhasil ditambahkan");
                reset();
                router.get(route("setting.index"));
            },
            onError: (errors) => {
                toast.error(
                    errors?.message || "Gagal menambahkan setting"
                );
            },
        });
    };

    const filtered = useMemo(() => {
        const q = query.toLowerCase();
        return (settings || []).filter((s) => {
            const matchesQ =
                !q ||
                (s.key || "").toLowerCase().includes(q) ||
                (s.value || "").toString().toLowerCase().includes(q) ||
                (s.description || "").toLowerCase().includes(q);
            const matchesGroup =
                !groupFilter || (s.group || "") === groupFilter;
            return matchesQ && matchesGroup;
        });
    }, [settings, query, groupFilter]);

    const handleDelete = (id) => {
        if (!confirm("Hapus setting ini?")) return;
        router.post(route("setting.destroy", id), { _method: "DELETE" }, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Setting berhasil dihapus");
                router.get(route("setting.index"));
            },
            onError: (errors) => {
                toast.error(
                    errors?.message || "Gagal menghapus setting"
                );
            },
        });
    };

    const Row = ({ item }) => {
        const [editing, setEditing] = useState(false);
        const [form, setForm] = useState({
            key: item.key || "",
            value: item.value ?? "",
            type: item.type || "string",
            group: item.group || "app",
            description: item.description || "",
        });

        const onSave = (e) => {
            e.preventDefault();
            // Perbaikan 405 PUT: gunakan method spoofing (POST + _method=PUT) jika ID tersedia,
            // dan fallback ke store (POST) bila record dari tabel legacy `setting` tidak memiliki kolom id.
            const hasId = item?.id !== undefined && item?.id !== null;
            if (hasId) {
                        const updateUrl = route("setting.update", item.id);
                        router.post(
                            updateUrl,
                            { ...form, _method: "PUT" },
                            {
                                preserveScroll: true,
                                forceFormData: true,
                                onSuccess: () => {
                                    toast.success("Setting berhasil diperbarui");
                                    setEditing(false);
                                    router.get(route("setting.index"));
                                },
                                onError: (errors) => {
                                    toast.error(
                                        errors?.message || "Gagal memperbarui setting"
                                    );
                                },
                            }
                        );
                    } else {
                        // Tabel `setting` (legacy) tidak memiliki kolom id. Lakukan upsert via store (POST) berdasarkan key.
                        router.post(
                            route("setting.store"),
                            { ...form },
                            {
                                preserveScroll: true,
                                onSuccess: () => {
                                    toast.success("Setting berhasil diperbarui");
                                    setEditing(false);
                                    router.get(route("setting.index"));
                                },
                                onError: (errors) => {
                                    toast.error(
                                        errors?.message || "Gagal memperbarui setting"
                                    );
                                },
                            }
                        );
                    }
        };

        return (
            <motion.tr
                className="border-t border-slate-200"
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <td className="px-3 py-2 text-[11px] text-slate-500">
                    {item.id}
                </td>
                <td className="px-3 py-2">
                    {editing ? (
                        <input
                            value={form.group}
                            onChange={(e) =>
                                setForm({ ...form, group: e.target.value })
                            }
                            className="w-full rounded-md border-slate-300 text-xs"
                        />
                    ) : (
                        <span className="text-xs text-slate-700">
                            {item.group}
                        </span>
                    )}
                </td>
                <td className="px-3 py-2">
                    {editing ? (
                        <input
                            value={form.key}
                            onChange={(e) =>
                                setForm({ ...form, key: e.target.value })
                            }
                            className="w-full rounded-md border-slate-300 text-xs"
                        />
                    ) : (
                        <code className="text-[11px] bg-slate-50 px-1 py-0.5 rounded border border-slate-200 text-slate-800">
                            {item.key}
                        </code>
                    )}
                </td>
                <td className="px-3 py-2">
                    {editing ? (
                        <select
                            value={form.type}
                            onChange={(e) =>
                                setForm({ ...form, type: e.target.value })
                            }
                            className="w-full rounded-md border-slate-300 text-xs"
                        >
                            <option value="string">string</option>
                            <option value="number">number</option>
                            <option value="boolean">boolean</option>
                            <option value="json">json</option>
                        </select>
                    ) : (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700">
                            {item.type}
                        </span>
                    )}
                </td>
                <td className="px-3 py-2">
                    {editing ? (
                        <input
                            value={form.value}
                            onChange={(e) =>
                                setForm({ ...form, value: e.target.value })
                            }
                            className="w-full rounded-md border-slate-300 text-xs"
                        />
                    ) : (
                        <span className="text-xs text-slate-700 break-all">
                            {String(item.value ?? "")}
                        </span>
                    )}
                </td>
                <td className="px-3 py-2">
                    {editing ? (
                        <input
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                            className="w-full rounded-md border-slate-300 text-xs"
                        />
                    ) : (
                        <span className="text-[11px] text-slate-500">
                            {item.description || "-"}
                        </span>
                    )}
                </td>
                <td className="px-3 py-2 text-right">
                    {editing ? (
                        <div className="flex items-center gap-2 justify-end">
                            <button
                                onClick={onSave}
                                className="rounded-md bg-emerald-600 px-2 py-1 text-xs text-white hover:bg-emerald-700"
                            >
                                Simpan
                            </button>
                            <button
                                onClick={() => setEditing(false)}
                                className="rounded-md bg-slate-200 px-2 py-1 text-xs text-slate-700 hover:bg-slate-300"
                            >
                                Batal
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 justify-end">
                            <button
                                onClick={() => setEditing(true)}
                                className="rounded-md bg-sky-600 px-2 py-1 text-xs text-white hover:bg-sky-700"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="rounded-md bg-rose-600 px-2 py-1 text-xs text-white hover:bg-rose-700"
                            >
                                Hapus
                            </button>
                        </div>
                    )}
                </td>
            </motion.tr>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Head title="Setting Aplikasi" />
            <div className="w-full px-2 md:px-3 py-8">
                {/* Header */}
                <MotionCard className="mb-6 p-4 border-slate-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-600 text-white shadow">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                >
                                    <path d="M4 6h16M4 12h10M4 18h7" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-slate-800 tracking-tight">
                                    Setting Aplikasi
                                </h1>
                            </div>
                        </div>
                        <Link
                            href={route("profile.menu")}
                            className="text-xs inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200 transition-colors"
                        >
                            ← Kembali ke Profil
                        </Link>
                    </div>
                </MotionCard>

                {/* Flash success */}
                {flash?.success && (
                    <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-emerald-700 shadow-sm">
                        {flash.success}
                    </div>
                )}

                {/* Form tambah */}
                <div className="mb-5">
                    <MotionCard className="p-4 border-slate-200">
                        <form onSubmit={onCreate} className="space-y-3">
                            <div className="text-slate-800 font-medium">
                                Tambah Setting
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                <div>
                                    <label className="block text-xs text-slate-600">
                                        Group
                                    </label>
                                    <input
                                        type="text"
                                        value={data.group}
                                        onChange={(e) =>
                                            setData("group", e.target.value)
                                        }
                                        className="mt-1 w-full rounded-md border-slate-300 text-xs"
                                        placeholder="app/ui/integrasi"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs text-slate-600">
                                        Key
                                    </label>
                                    <input
                                        type="text"
                                        value={data.key}
                                        onChange={(e) =>
                                            setData("key", e.target.value)
                                        }
                                        className="mt-1 w-full rounded-md border-slate-300 text-xs"
                                        placeholder="app.name, ui.theme"
                                        required
                                    />
                                    {errors.key && (
                                        <p className="mt-1 text-[11px] text-red-600">
                                            {errors.key}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-600">
                                        Tipe
                                    </label>
                                    <select
                                        value={data.type}
                                        onChange={(e) =>
                                            setData("type", e.target.value)
                                        }
                                        className="mt-1 w-full rounded-md border-slate-300 text-xs"
                                    >
                                        <option value="string">string</option>
                                        <option value="number">number</option>
                                        <option value="boolean">boolean</option>
                                        <option value="json">json</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="md:col-span-2">
                                    <label className="block text-xs text-slate-600">
                                        Value
                                    </label>
                                    <input
                                        type="text"
                                        value={data.value}
                                        onChange={(e) =>
                                            setData("value", e.target.value)
                                        }
                                        className="mt-1 w-full rounded-md border-slate-300 text-xs"
                                        placeholder="Isi nilai setting"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-600">
                                        Deskripsi
                                    </label>
                                    <input
                                        type="text"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 w-full rounded-md border-slate-300 text-xs"
                                        placeholder="Keterangan singkat"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs text-white hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Simpan Setting
                                </button>
                                <button
                                    type="button"
                                    onClick={() => reset()}
                                    className="rounded-md bg-slate-200 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-300"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </MotionCard>
                </div>

                {/* Filter & Tabel */}
                <MotionCard className="p-4 border-slate-200">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                        <div className="text-slate-800 font-medium">
                            Daftar Setting
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <button
                                onClick={loadTableStructure}
                                className="rounded-md bg-slate-100 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-200"
                            >
                                Lihat Struktur Tabel
                            </button>
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Cari key/desc/value..."
                                className="rounded-md border-slate-300 text-xs"
                            />
                            <select
                                value={groupFilter}
                                onChange={(e) => setGroupFilter(e.target.value)}
                                className="rounded-md border-slate-300 text-xs"
                            >
                                <option value="">Semua Group</option>
                                {groups.map((g) => (
                                    <option key={g} value={g}>
                                        {g}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* Modal Struktur Tabel */}
                    {showStructure && tableStructure && (
                        <div className="fixed inset-0 z-50 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4">
                                <div
                                    className="fixed inset-0 bg-gray-500/75 transition-opacity"
                                    onClick={() => setShowStructure(false)}
                                ></div>
                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-2xl">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-medium text-gray-900">
                                                Struktur Tabel: {tableStructure.table}
                                            </h3>
                                            <button
                                                onClick={() => setShowStructure(false)}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                ×
                                            </button>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full text-sm">
                                                <thead>
                                                    <tr className="bg-slate-50">
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-700">
                                                            Field
                                                        </th>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-700">
                                                            Type
                                                        </th>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-700">
                                                            Null
                                                        </th>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-700">
                                                            Key
                                                        </th>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-700">
                                                            Default
                                                        </th>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-700">
                                                            Extra
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableStructure.columns?.map((col, idx) => (
                                                        <tr
                                                            key={idx}
                                                            className="border-t border-slate-200"
                                                        >
                                                            <td className="px-3 py-2 text-xs text-slate-800">
                                                                <code className="bg-slate-50 px-1 py-0.5 rounded">
                                                                    {col.Field}
                                                                </code>
                                                            </td>
                                                            <td className="px-3 py-2 text-xs text-slate-600">
                                                                {col.Type}
                                                            </td>
                                                            <td className="px-3 py-2 text-xs text-slate-600">
                                                                {col.Null}
                                                            </td>
                                                            <td className="px-3 py-2 text-xs text-slate-600">
                                                                {col.Key || "-"}
                                                            </td>
                                                            <td className="px-3 py-2 text-xs text-slate-600">
                                                                {col.Default !== null
                                                                    ? col.Default
                                                                    : "NULL"}
                                                            </td>
                                                            <td className="px-3 py-2 text-xs text-slate-600">
                                                                {col.Extra || "-"}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            onClick={() => setShowStructure(false)}
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                                        >
                                            Tutup
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="text-left text-[11px] text-slate-500">
                                    <th className="px-3 py-2">ID</th>
                                    <th className="px-3 py-2">Group</th>
                                    <th className="px-3 py-2">Key</th>
                                    <th className="px-3 py-2">Type</th>
                                    <th className="px-3 py-2">Value</th>
                                    <th className="px-3 py-2">Deskripsi</th>
                                    <th className="px-3 py-2 text-right">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence initial={false}>
                                    {filtered.length ? (
                                        filtered.map((item) => (
                                            <Row key={item.id} item={item} />
                                        ))
                                    ) : (
                                        <tr key="empty">
                                            <td
                                                className="px-3 py-4 text-[12px] text-slate-500"
                                                colSpan={7}
                                            >
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </MotionCard>
            </div>

            {/* Card: Setting Aplikasi (CRUD tabel legacy `setting`) */}
            <div className="w-full px-2 md:px-3 pb-10">
                {/* Catatan: Menggunakan <div> biasa untuk menghindari isu fokus/blur saat mengetik di input.
                   Sebelumnya card ini dibungkus MotionCard (framer-motion) yang berpotensi me-recreate
                   node DOM pada setiap perubahan state sehingga input kehilangan fokus setelah 1 karakter. */}
                <div className="p-6 border-slate-200 mt-6 rounded-2xl border bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-600 text-white shadow">
                                <Building2 className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-slate-800 font-semibold">
                                    Setting Aplikasi
                                </div>
                                <p className="text-[11px] text-slate-500">
                                    Kelola identitas instansi, integrasi, dan
                                    branding
                                </p>
                            </div>
                        </div>
                        {editingNama && (
                            <span className="text-[11px] text-slate-600">
                                Mode edit: {editingNama}
                            </span>
                        )}
                    </div>

                    {/* Form create/update */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (editingNama) {
                                // Perbaikan upload file: gunakan appForm.transform() dan appForm.post()
                                // untuk memastikan FormData dibuat dengan benar untuk file upload
                                const updateUrl = `/setting/app/${encodeURIComponent(editingNama)}`;
                                
                                // Simpan info file yang akan di-update SEBELUM transform/reset
                                const hasWallpaperUpdate = appForm.data.wallpaper instanceof File;
                                const hasLogoUpdate = appForm.data.logo instanceof File;
                                
                                // Debug: log data sebelum transform
                                console.log('Form data before submit:', {
                                    wallpaper: appForm.data.wallpaper ? {
                                        name: appForm.data.wallpaper.name,
                                        size: appForm.data.wallpaper.size,
                                        type: appForm.data.wallpaper.type,
                                        isFile: appForm.data.wallpaper instanceof File,
                                    } : null,
                                    logo: appForm.data.logo ? {
                                        name: appForm.data.logo.name,
                                        size: appForm.data.logo.size,
                                        type: appForm.data.logo.type,
                                        isFile: appForm.data.logo instanceof File,
                                    } : null,
                                });
                                
                                // Transform hanya untuk menambahkan _method, pastikan file tetap ada
                                appForm.transform((data) => {
                                    const transformed = {
                                        nama_instansi: data.nama_instansi,
                                        alamat_instansi: data.alamat_instansi,
                                        kabupaten: data.kabupaten,
                                        propinsi: data.propinsi,
                                        kontak: data.kontak,
                                        email: data.email,
                                        aktifkan: data.aktifkan,
                                        kode_ppk: data.kode_ppk,
                                        kode_ppkinkhealth: data.kode_ppkinkhealth,
                                        kode_ppkkemenkes: data.kode_ppkkemenkes,
                                        _method: "PUT",
                                    };
                                    // Hanya tambahkan file jika benar-benar ada (instanceof File)
                                    if (data.wallpaper instanceof File) {
                                        transformed.wallpaper = data.wallpaper;
                                        console.log('Wallpaper file included in transform');
                                    } else {
                                        console.log('Wallpaper is not a File instance:', typeof data.wallpaper, data.wallpaper);
                                    }
                                    if (data.logo instanceof File) {
                                        transformed.logo = data.logo;
                                        console.log('Logo file included in transform');
                                    }
                                    console.log('Transformed data keys:', Object.keys(transformed));
                                    return transformed;
                                });
                                appForm.post(updateUrl, {
                                    preserveScroll: true,
                                    forceFormData: true,
                                    onSuccess: () => {
                                        toast.success("Setting aplikasi berhasil diperbarui");
                                        setEditingNama(null);
                                        appForm.reset();
                                        appForm.transform((data) => data); // Reset transform
                                        
                                        // Reload data setelah update dengan delay untuk memastikan DB sudah ter-update
                                        setTimeout(() => {
                                            fetch(route("setting.app.index", [], false))
                                                .then((r) => r.json())
                                                .then((j) => {
                                                    setAppRecords(j.data || []);
                                                    // Force reload halaman untuk clear cache gambar
                                                    // Tapi hanya jika wallpaper/logo di-update
                                                    if (hasWallpaperUpdate || hasLogoUpdate) {
                                                        console.log('File di-update, reload halaman untuk clear cache...');
                                                        // Reload setelah 1 detik untuk memastikan data ter-update
                                                        setTimeout(() => {
                                                            window.location.reload();
                                                        }, 1000);
                                                    }
                                                });
                                        }, 500);
                                    },
                                    onFinish: () => {
                                        // Reset transform setelah selesai
                                        appForm.transform((data) => data);
                                    },
                                    onError: (errors) => {
                                        console.error('Update error:', errors);
                                        toast.error(
                                            errors?.message ||
                                                "Gagal memperbarui setting aplikasi"
                                        );
                                    },
                                });
                            } else {
                                appForm.post(route("setting.app.store", [], false), {
                                    preserveScroll: true,
                                    forceFormData: true,
                                    onSuccess: () => {
                                        toast.success("Setting aplikasi berhasil ditambahkan");
                                        appForm.reset();
                                        fetch(route("setting.app.index", [], false))
                                            .then((r) => r.json())
                                            .then((j) =>
                                                setAppRecords(j.data || [])
                                            );
                                    },
                                    onError: (errors) => {
                                        toast.error(
                                            errors?.message ||
                                                "Gagal menambahkan setting aplikasi"
                                        );
                                    },
                                });
                            }
                        }}
                        className="space-y-5"
                    >
                        {/* Section: Identitas Instansi */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-2 text-sm text-slate-700 font-semibold">
                                <Building2 className="w-4 h-4 text-indigo-600" />{" "}
                                Identitas Instansi
                            </div>
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                                        <Building2 className="w-3.5 h-3.5 text-indigo-600" />{" "}
                                        Nama Instansi
                                    </label>
                                    <input
                                        id="nama_instansi"
                                        name="nama_instansi"
                                        type="text"
                                        value={appForm.data.nama_instansi}
                                        onChange={(e) =>
                                            appForm.setData(
                                                "nama_instansi",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                        placeholder="Nama instansi"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                                        <Phone className="w-3.5 h-3.5 text-indigo-600" />{" "}
                                        Kontak
                                    </label>
                                    <input
                                        id="kontak"
                                        name="kontak"
                                        type="text"
                                        value={appForm.data.kontak}
                                        onChange={(e) =>
                                            appForm.setData(
                                                "kontak",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                        placeholder="Nomor telepon"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                                        <Mail className="w-3.5 h-3.5 text-indigo-600" />{" "}
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={appForm.data.email}
                                        onChange={(e) =>
                                            appForm.setData(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                        placeholder="email@instansi.id"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Alamat & Status */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-2 text-sm text-slate-700 font-semibold">
                                <MapPin className="w-4 h-4 text-indigo-600" />{" "}
                                Alamat & Status
                            </div>
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2">
                                    <label className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                                        <MapPin className="w-3.5 h-3.5 text-indigo-600" />{" "}
                                        Alamat Instansi
                                    </label>
                                    <input
                                        id="alamat_instansi"
                                        name="alamat_instansi"
                                        type="text"
                                        value={appForm.data.alamat_instansi}
                                        onChange={(e) =>
                                            appForm.setData(
                                                "alamat_instansi",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                        placeholder="Alamat lengkap"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                                        <CheckCircle className="w-3.5 h-3.5 text-indigo-600" />{" "}
                                        Aktifkan
                                    </label>
                                    <select
                                        id="aktifkan"
                                        name="aktifkan"
                                        value={appForm.data.aktifkan}
                                        onChange={(e) =>
                                            appForm.setData(
                                                "aktifkan",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                    >
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section: Wilayah & Kode */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-2 text-sm text-slate-700 font-semibold">
                                <Hash className="w-4 h-4 text-indigo-600" />{" "}
                                Wilayah & Kode
                            </div>
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm text-slate-700 font-medium">
                                        Kabupaten
                                    </label>
                                    <input
                                        id="kabupaten"
                                        name="kabupaten"
                                        type="text"
                                        value={appForm.data.kabupaten}
                                        onChange={(e) =>
                                            appForm.setData(
                                                "kabupaten",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Kabupaten"
                                        className="mt-1 w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-700 font-medium">
                                        Propinsi
                                    </label>
                                    <input
                                        id="propinsi"
                                        name="propinsi"
                                        type="text"
                                        value={appForm.data.propinsi}
                                        onChange={(e) =>
                                            appForm.setData(
                                                "propinsi",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Propinsi"
                                        className="mt-1 w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                                        <Hash className="w-3.5 h-3.5 text-indigo-600" />{" "}
                                        Kode PPK
                                    </label>
                                    <input
                                        id="kode_ppk"
                                        name="kode_ppk"
                                        type="text"
                                        value={appForm.data.kode_ppk}
                                        onChange={(e) =>
                                            appForm.setData(
                                                "kode_ppk",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Masukkan kode PPK"
                                        className="mt-1 w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Integrasi & Branding */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-2 text-sm text-slate-700 font-semibold">
                                <Hash className="w-4 h-4 text-indigo-600" />{" "}
                                Integrasi & Branding
                            </div>
                            <p className="mt-1 text-xs text-slate-500">Konfigurasi kode PPK untuk layanan eksternal dan aset branding aplikasi.</p>
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                                        <Hash className="w-3.5 h-3.5 text-indigo-600" />{" "}
                                        Kode PPK InKHealth
                                    </label>
                                    <input
                                        id="kode_ppkinkhealth"
                                        name="kode_ppkinkhealth"
                                        type="text"
                                        value={appForm.data.kode_ppkinkhealth}
                                        onChange={(e) =>
                                            appForm.setData(
                                                "kode_ppkinkhealth",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Masukkan kode PPK InKHealth"
                                        className="mt-1 w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                                        <Hash className="w-3.5 h-3.5 text-indigo-600" />{" "}
                                        Kode PPK Kemenkes
                                    </label>
                                    <input
                                        id="kode_ppkkemenkes"
                                        name="kode_ppkkemenkes"
                                        type="text"
                                        value={appForm.data.kode_ppkkemenkes}
                                        onChange={(e) =>
                                            appForm.setData(
                                                "kode_ppkkemenkes",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Masukkan kode PPK Kemenkes"
                                        className="mt-1 w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                                        <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />{" "}
                                        Wallpaper
                                    </label>
                                    <input
                                        key={`wallpaper-${editingNama || 'new'}`}
                                        id="wallpaper"
                                        name="wallpaper"
                                        type="file"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] ?? null;
                                            if (file) {
                                                console.log('Wallpaper file selected:', {
                                                    name: file.name,
                                                    size: file.size,
                                                    type: file.type,
                                                });
                                                // Pastikan file benar-benar ter-set
                                                appForm.setData("wallpaper", file);
                                                // Verifikasi setelah set
                                                setTimeout(() => {
                                                    console.log('Wallpaper setelah setData:', appForm.data.wallpaper);
                                                }, 100);
                                            } else {
                                                appForm.setData("wallpaper", null);
                                            }
                                        }}
                                        className="mt-1 w-full rounded-xl border-2 border-slate-300 bg-white text-sm file:mr-2 file:px-3 file:py-1.5 file:text-sm file:bg-slate-100 file:border-0 file:rounded-md"
                                        accept="image/*"
                                    />
                                    {appForm.data.wallpaper && (
                                        <p className="mt-1 text-[11px] text-emerald-600">
                                            File dipilih: {appForm.data.wallpaper.name} ({formatBytes(appForm.data.wallpaper.size)})
                                        </p>
                                    )}
                                    <p className="mt-1 text-[11px] text-slate-500">
                                        Format: JPG/PNG • Disarankan ≤ 2MB
                                    </p>
                                </div>
                            </div>
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                                        <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />{" "}
                                        Logo
                                    </label>
                                    <input
                                        key={`logo-${editingNama || 'new'}`}
                                        id="logo"
                                        name="logo"
                                        type="file"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] ?? null;
                                            if (file) {
                                                console.log('Logo file selected:', {
                                                    name: file.name,
                                                    size: file.size,
                                                    type: file.type,
                                                });
                                                // Pastikan file benar-benar ter-set
                                                appForm.setData("logo", file);
                                                // Verifikasi setelah set
                                                setTimeout(() => {
                                                    console.log('Logo setelah setData:', appForm.data.logo);
                                                }, 100);
                                            } else {
                                                appForm.setData("logo", null);
                                            }
                                        }}
                                        className="mt-1 w-full rounded-xl border-2 border-slate-300 bg-white text-sm file:mr-2 file:px-3 file:py-1.5 file:text-sm file:bg-slate-100 file:border-0 file:rounded-md"
                                        accept="image/*"
                                    />
                                    {appForm.data.logo && (
                                        <p className="mt-1 text-[11px] text-emerald-600">
                                            File dipilih: {appForm.data.logo.name} ({formatBytes(appForm.data.logo.size)})
                                        </p>
                                    )}
                                    <p className="mt-1 text-[11px] text-slate-500">
                                        Format: SVG/PNG • Disarankan ≤ 1MB
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="submit"
                                disabled={appForm.processing}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs text-white hover:bg-indigo-700 disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />{" "}
                                {editingNama
                                    ? "Simpan Perubahan"
                                    : "Tambah Setting"}
                            </button>
                            <button
                                type="button"
                                className="rounded-lg bg-slate-200 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-300"
                                onClick={() => {
                                    appForm.reset();
                                    setEditingNama(null);
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    </form>

                    {/* Tabel existing records */}
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <Building2 className="w-4 h-4 text-indigo-600" /> Data Tersimpan
                            </div>
                            <div className="relative w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    value={recordQuery}
                                    onChange={(e) => setRecordQuery(e.target.value)}
                                    placeholder="Cari data (instansi, wilayah, email)"
                                    className="w-full rounded-xl border-2 border-slate-300 bg-white pl-8 pr-3 py-2 text-sm placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="text-left text-xs text-slate-600 bg-slate-50">
                                        <th className="px-3.5 py-2.5 font-medium">Nama Instansi</th>
                                        <th className="px-3.5 py-2.5 font-medium">Alamat</th>
                                        <th className="px-3.5 py-2.5 font-medium">Kabupaten</th>
                                        <th className="px-3.5 py-2.5 font-medium">Propinsi</th>
                                        <th className="px-3.5 py-2.5 font-medium">Kontak</th>
                                        <th className="px-3.5 py-2.5 font-medium">Email</th>
                                        <th className="px-3.5 py-2.5 font-medium">Aktifkan</th>
                                        <th className="px-3.5 py-2.5 font-medium">Kode PPK</th>
                                        <th className="px-3.5 py-2.5 font-medium">Wallpaper</th>
                                        <th className="px-3.5 py-2.5 font-medium">Logo</th>
                                        <th className="px-3.5 py-2.5 font-medium text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appLoading ? (
                                        <tr>
                                            <td className="px-3 py-4 text-[12px] text-slate-500" colSpan={11}>
                                                Memuat...
                                            </td>
                                        </tr>
                                    ) : filteredRecords?.length ? (
                                        filteredRecords.map((r, idx) => (
                                            <motion.tr
                                                key={r.nama_instansi}
                                                className="border-t border-slate-200 odd:bg-white even:bg-slate-50/30 hover:bg-slate-50/60 transition-colors"
                                                variants={rowVariants}
                                                initial="hidden"
                                                animate="visible"
                                                transition={{ delay: idx * 0.02 }}
                                            >
                                                <td className="px-3 py-2 text-slate-800">{r.nama_instansi}</td>
                                                <td className="px-3 py-2">{r.alamat_instansi || "-"}</td>
                                                <td className="px-3 py-2">{r.kabupaten || "-"}</td>
                                                <td className="px-3 py-2">{r.propinsi || "-"}</td>
                                                <td className="px-3 py-2">{r.kontak || "-"}</td>
                                                <td className="px-3 py-2">{r.email || "-"}</td>
                                                <td className="px-3 py-2 text-[11px]">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2 py-0.5 ${
                                                            r.aktifkan === "Yes"
                                                                ? "bg-emerald-100 text-emerald-700"
                                                                : "bg-rose-100 text-rose-700"
                                                        }`}
                                                    >
                                                        {r.aktifkan}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2">{r.kode_ppk || "-"}</td>
                                                <td className="px-3 py-2">
                                                    {r.wallpaper_size > 0 ? (
                                                        <a
                                                            href={`/setting/app/${encodeURIComponent(r.nama_instansi)}/wallpaper?t=${Date.now()}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sky-700 hover:underline"
                                                            onClick={(e) => {
                                                                // Force reload dengan cache busting
                                                                e.preventDefault();
                                                                const url = `/setting/app/${encodeURIComponent(r.nama_instansi)}/wallpaper?t=${Date.now()}`;
                                                                window.open(url, '_blank');
                                                            }}
                                                        >
                                                            {formatBytes(r.wallpaper_size)} • Lihat
                                                        </a>
                                                    ) : (
                                                        <span className="text-slate-500">-</span>
                                                    )}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {r.logo_size > 0 ? (
                                                        <a
                                                            href={`/setting/app/${encodeURIComponent(r.nama_instansi)}/logo?t=${Date.now()}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sky-700 hover:underline"
                                                            onClick={(e) => {
                                                                // Force reload dengan cache busting
                                                                e.preventDefault();
                                                                const url = `/setting/app/${encodeURIComponent(r.nama_instansi)}/logo?t=${Date.now()}`;
                                                                window.open(url, '_blank');
                                                            }}
                                                        >
                                                            {formatBytes(r.logo_size)} • Lihat
                                                        </a>
                                                    ) : (
                                                        <span className="text-slate-500">-</span>
                                                    )}
                                                </td>
                                                <td className="px-3 py-2 text-right">
                                                    <div className="flex items-center gap-2 justify-end">
                                                        <button
                                                            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-2.5 py-1 text-xs text-white hover:bg-sky-700"
                                                            onClick={() => {
                                                                setEditingNama(r.nama_instansi);
                                                                appForm.setData({
                                                                    nama_instansi: r.nama_instansi || "",
                                                                    alamat_instansi: r.alamat_instansi || "",
                                                                    kabupaten: r.kabupaten || "",
                                                                    propinsi: r.propinsi || "",
                                                                    kontak: r.kontak || "",
                                                                    email: r.email || "",
                                                                    aktifkan: r.aktifkan || "Yes",
                                                                    kode_ppk: r.kode_ppk || "",
                                                                    // Fallback untuk perbedaan nama kolom: kode_ppkinkhealth vs kode_ppkinhealth
                                                                    kode_ppkinkhealth: (r.kode_ppkinkhealth ?? r.kode_ppkinhealth) || "",
                                                                    kode_ppkkemenkes: r.kode_ppkkemenkes || "",
                                                                    wallpaper: null,
                                                                    logo: null,
                                                                });
                                                            }}
                                                        >
                                                            <Pencil className="w-3.5 h-3.5" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-2.5 py-1 text-xs text-white hover:bg-rose-700"
                                                                onClick={() => {
                                                                    if (!confirm(`Hapus data ${r.nama_instansi}?`)) return;
                                                                router.post(`/setting/app/${encodeURIComponent(r.nama_instansi)}`, { _method: "DELETE" }, {
                                                                    forceFormData: true,
                                                                    preserveScroll: true,
                                                                    onSuccess: () => {
                                                                        toast.success("Setting aplikasi berhasil dihapus");
                                                                        fetch(route("setting.app.index", [], false))
                                                                            .then((rr) => rr.json())
                                                                            .then((j) => setAppRecords(j.data || []));
                                                                    },
                                                                    onError: (errors) => {
                                                                        toast.error(
                                                                            errors?.message || "Gagal menghapus setting aplikasi"
                                                                        );
                                                                    },
                                                                });
                                                            }}
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="px-3 py-4 text-[12px] text-slate-500" colSpan={11}>
                                                Belum ada data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Render dalam SidebarPengaturan
SettingIndex.layout = (page) => (
    <SidebarPengaturan title="Pengaturan" children={page} />
);
