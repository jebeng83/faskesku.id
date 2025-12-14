import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import { Info, ChevronDown, ChevronRight } from "lucide-react";
import Switch from "@/Components/Switch";

const Card = ({ title, children }) => (
    <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
        {title && (
            <div className="relative px-4 py-3 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50">
                <h2 className="text-base font-semibold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {title}
                </h2>
            </div>
        )}
        <div className="relative p-6">{children}</div>
    </div>
);

export default function RekeningPage() {
    const [form, setForm] = useState({
        kd_rek: "",
        tipe: "N",
        balance: "Debet",
        nm_rek: "",
    });
    const [mode, setMode] = useState("utama"); // 'utama' | 'sub'
    const [indukKd, setIndukKd] = useState("");
    const [errors, setErrors] = useState({});
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingKey, setEditingKey] = useState(null);
    const [q, setQ] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [meta, setMeta] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 20,
    });
    const [indukList, setIndukList] = useState([]);
    const [settingParentFor, setSettingParentFor] = useState(null); // kd_rek yang akan dijadikan sub

    // Tree view state
    const [showTree, setShowTree] = useState(false);
    const [indukHier, setIndukHier] = useState([]);
    const [expanded, setExpanded] = useState({});
    const [childrenMap, setChildrenMap] = useState({}); // { [parentKd]: Rekening[] }

    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/akutansi/rekening", {
                params: { q, page, per_page: perPage },
            });
            const payload = res.data || {};
            setItems(payload.data || []);
            if (payload.meta) setMeta(payload.meta);
        } catch (e) {
            console.error("Gagal memuat rekening:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [page, perPage]);

    const fetchIndukList = async () => {
        try {
            const res = await axios.get("/api/akutansi/rekening", {
                params: { level: "0", per_page: 50 },
            });
            const payload = res.data || {};
            setIndukList(payload.data || []);
        } catch (e) {
            console.error("Gagal memuat daftar akun induk:", e);
        }
    };
    useEffect(() => {
        fetchIndukList();
    }, []);

    // Hierarchical loaders
    const loadIndukHier = async () => {
        try {
            const res = await axios.get("/api/akutansi/rekening", {
                params: { level: "0", per_page: 1000 },
            });
            const payload = res.data || {};
            setIndukHier(payload.data || []);
        } catch (e) {
            console.error("Gagal memuat induk untuk hierarki:", e);
        }
    };
    useEffect(() => {
        if (showTree) loadIndukHier();
    }, [showTree]);

    const fetchChildren = async (parentKd) => {
        if (!parentKd) return;
        if (childrenMap[parentKd]) return; // sudah ada
        try {
            const res = await axios.get(
                `/api/akutansi/rekening/${encodeURIComponent(
                    parentKd
                )}/children`
            );
            const payload = res.data || {};
            setChildrenMap((prev) => ({
                ...prev,
                [parentKd]: payload.data || [],
            }));
        } catch (e) {
            console.error("Gagal memuat anak untuk", parentKd, e);
        }
    };

    const toggleExpand = async (kd) => {
        const isExpanded = !!expanded[kd];
        if (!isExpanded) {
            await fetchChildren(kd);
        }
        setExpanded((prev) => ({ ...prev, [kd]: !isExpanded }));
    };

    const validate = () => {
        const errs = {};
        if (!form.kd_rek?.trim()) errs.kd_rek = "Kode Rekening wajib diisi";
        if (!form.nm_rek?.trim()) errs.nm_rek = "Nama Rekening wajib diisi";
        if (!["N", "R", "M"].includes(form.tipe))
            errs.tipe = "Tipe tidak valid";
        if (!["Debet", "Kredit"].includes(form.balance))
            errs.balance = "Balance tidak valid";
        if (mode === "sub") {
            if (!indukKd?.trim()) errs.indukKd = "Pilih akun induk";
            if (indukKd?.trim() === form.kd_rek?.trim())
                errs.indukKd = "Induk tidak boleh sama dengan akun";
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const resetForm = () => {
        setForm({ kd_rek: "", tipe: "N", balance: "Debet", nm_rek: "" });
        setMode("utama");
        setIndukKd("");
        setErrors({});
        setEditingKey(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setSaving(true);
        try {
            if (editingKey) {
                await axios.put(
                    `/api/akutansi/rekening/${encodeURIComponent(editingKey)}`,
                    {
                        tipe: form.tipe,
                        // Map UI value to code for storage: Debet -> D, Kredit -> K
                        balance: form.balance === "Debet" ? "D" : "K",
                        nm_rek: form.nm_rek,
                        // Jangan paksa level saat edit; dibiarkan sesuai kondisi
                    }
                );
            } else {
                const payload = {
                    kd_rek: form.kd_rek,
                    tipe: form.tipe,
                    balance: form.balance === "Debet" ? "D" : "K",
                    nm_rek: form.nm_rek,
                };
                if (mode === "sub") {
                    payload.parent_kd_rek = indukKd;
                }
                await axios.post("/api/akutansi/rekening", payload);
            }
            await fetchItems();
            resetForm();
        } catch (e) {
            // Map validation errors jika ada
            const data = e?.response?.data;
            if (data && typeof data === "object") {
                setErrors(data.errors || {});
            }
            console.error("Simpan rekening gagal:", e);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (item) => {
        setEditingKey(item.kd_rek);
        setForm({
            kd_rek: item.kd_rek || "",
            tipe: item.tipe || "N",
            // Normalize stored code/value to UI label
            balance:
                item.balance === "K" || item.balance === "Kredit"
                    ? "Kredit"
                    : "Debet",
            nm_rek: item.nm_rek || "",
        });
        setMode(item.level === "1" ? "sub" : "utama");
        // Preselect induk jika diketahui
        setIndukKd("");
    };

    const handleDelete = async (item) => {
        if (!item?.kd_rek) return;
        if (!confirm(`Hapus rekening ${item.kd_rek} - ${item.nm_rek}?`)) return;
        try {
            await axios.delete(
                `/api/akutansi/rekening/${encodeURIComponent(item.kd_rek)}`
            );
            await fetchItems();
            if (editingKey === item.kd_rek) resetForm();
        } catch (e) {
            console.error("Hapus rekening gagal:", e);
            const msg =
                e?.response?.data?.message ||
                "Gagal menghapus rekening. Periksa konsol untuk detail.";
            alert(msg);
        }
    };

    const handleMakeSub = (item) => {
        setSettingParentFor(item.kd_rek);
        fetchIndukList();
    };

    const submitMakeSub = async () => {
        if (!settingParentFor || !indukKd) return;
        try {
            await axios.post(
                `/api/akutansi/rekening/${encodeURIComponent(
                    settingParentFor
                )}/make-sub`,
                {
                    induk_kd: indukKd,
                }
            );
            setSettingParentFor(null);
            setIndukKd("");
            await fetchItems();
        } catch (e) {
            alert(e?.response?.data?.message || "Gagal menjadikan sub-akun");
        }
    };

    const cancelMakeSub = () => {
        setSettingParentFor(null);
        setIndukKd("");
    };

    const handleMakeInduk = async (item) => {
        try {
            await axios.post(
                `/api/akutansi/rekening/${encodeURIComponent(
                    item.kd_rek
                )}/make-induk`
            );
            await fetchItems();
        } catch (e) {
            alert(e?.response?.data?.message || "Gagal menjadikan akun utama");
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setPage(1);
        await fetchItems();
    };

    return (
        <div>
            <Head title="Keuangan - Rekening" />
            <div className="space-y-6">
                {/* Card 1: Form Input */}
                <Card
                    title={
                        editingKey
                            ? `Edit Rekening (${editingKey})`
                            : "Input Rekening"
                    }
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kode Rekening</label>
                                <input
                                    type="text"
                                    value={form.kd_rek}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            kd_rek: e.target.value.toUpperCase(),
                                        })
                                    }
                                    placeholder="Mis. 1001"
                                    maxLength={20}
                                    disabled={!!editingKey}
                                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                                        errors.kd_rek
                                            ? "border-red-500 focus:ring-red-300"
                                            : "border-gray-300 focus:ring-blue-300"
                                    }`}
                                />
                                {errors.kd_rek && (
                                    <p className="mt-1 text-xs text-red-600">{errors.kd_rek}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mode Akun</label>
                                <select
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value)}
                                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                                        errors.indukKd
                                            ? "border-red-500 focus:ring-red-300"
                                            : "border-gray-300 focus:ring-blue-300"
                                    }`}
                                >
                                    <option value="utama">Akun Utama (Induk)</option>
                                    <option value="sub">Sub Akun</option>
                                </select>
                                {mode === "sub" && (
                                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                        <Info className="w-3 h-3" />
                                        Sub Akun membutuhkan induk. Pilih akun induk di kolom berikut.
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipe</label>
                                <select
                                    value={form.tipe}
                                    onChange={(e) => setForm({ ...form, tipe: e.target.value })}
                                    title="Tipe laporan: N=Neraca, R=Rugi/Laba, M=Perubahan Modal"
                                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                                        errors.tipe
                                            ? "border-red-500 focus:ring-red-300"
                                            : "border-gray-300 focus:ring-blue-300"
                                    }`}
                                >
                                    <option value="N">N (Neraca)</option>
                                    <option value="R">R (Rugi/Laba)</option>
                                    <option value="M">M (Perubahan Modal)</option>
                                </select>
                                {errors.tipe && (
                                    <p className="mt-1 text-xs text-red-600">{errors.tipe}</p>
                                )}
                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    <Info className="w-3 h-3" />
                                    Pilih tipe sesuai jenis akun: Neraca (aset/kewajiban/ekuitas), Rugi/Laba (pendapatan/biaya), Perubahan Modal.
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Balance</label>
                                <div className="mt-1 flex items-center gap-2">
                                    <Switch
                                        checked={form.balance === "Kredit"}
                                        onChange={(v) =>
                                            setForm({
                                                ...form,
                                                balance: v ? "Kredit" : "Debet",
                                            })
                                        }
                                        onLabel="Kredit"
                                        offLabel="Debet"
                                        size="md"
                                    />
                                </div>
                                {errors.balance && (
                                    <p className="mt-1 text-xs text-red-600">{errors.balance}</p>
                                )}
                            </div>
                        </div>

                        {mode === "sub" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Induk</label>
                                <select
                                    value={indukKd}
                                    onChange={(e) => setIndukKd(e.target.value)}
                                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                                        errors.indukKd
                                            ? "border-red-500 focus:ring-red-300"
                                            : "border-gray-300 focus:ring-blue-300"
                                    }`}
                                >
                                    <option value="">-- Pilih Akun Induk --</option>
                                    {indukList.map((induk) => (
                                        <option key={induk.kd_rek} value={induk.kd_rek}>
                                            {induk.kd_rek} — {induk.nm_rek}
                                        </option>
                                    ))}
                                </select>
                                {errors.indukKd && (
                                    <p className="mt-1 text-xs text-red-600">{errors.indukKd}</p>
                                )}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Rekening</label>
                                <input
                                    type="text"
                                    value={form.nm_rek}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            nm_rek: e.target.value,
                                        })
                                    }
                                    placeholder="Mis. Kas, Piutang Usaha"
                                    maxLength={100}
                                    className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                                        errors.nm_rek
                                            ? "border-red-500 focus:ring-red-300"
                                            : "border-gray-300 focus:ring-blue-300"
                                    }`}
                                />
                                {errors.nm_rek && (
                                    <p className="mt-1 text-xs text-red-600">{errors.nm_rek}</p>
                                )}
                            </div>
                            <div className="flex gap-3 justify-end">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {editingKey ? "Simpan Perubahan" : "Simpan"}
                                </button>
                                {editingKey && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Batal Edit
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </Card>

                {/* Toolbar tampilan */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setShowTree(false)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold border ${
                            !showTree
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                        Tampilan Daftar
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowTree(true)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold border ${
                            showTree
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                        Tampilan Hierarkis
                    </button>
                </div>

                {/* Card 2: Tabel Data Rekening */}
                {!showTree && (
                    <Card title="Data Rekening">
                        <form
                            onSubmit={handleSearch}
                            className="mb-3 flex items-end gap-2"
                        >
                            <div className="flex-1">
                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                                    Pencarian
                                </label>
                                <input
                                    type="text"
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Cari kode/nama/tipe/balance..."
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-300"
                                />
                            </div>
                            <button
                                type="submit"
                                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                Cari
                            </button>
                            <button
                                type="button"
                                onClick={fetchItems}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Refresh
                            </button>
                        </form>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                            Kode
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                            Nama Rekening
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                            Tipe
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                            Balance
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                            Level
                                        </th>
                                        <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {loading ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-4 py-6 text-center text-sm text-gray-500"
                                            >
                                                Memuat data...
                                            </td>
                                        </tr>
                                    ) : items.length ? (
                                        items.map((item) => (
                                            <tr
                                                key={item.kd_rek}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                            >
                                                <td className="px-4 py-2 text-sm font-mono">
                                                    {item.kd_rek}
                                                </td>
                                                <td className="px-4 py-2 text-sm">
                                                    {item.nm_rek}
                                                </td>
                                                <td className="px-4 py-2 text-sm">
                                                    {item.tipe}
                                                </td>
                                                <td className="px-4 py-2 text-sm">
                                                    {item.balance === "K" ||
                                                    item.balance === "Kredit"
                                                        ? "Kredit"
                                                        : item.balance ===
                                                              "D" ||
                                                          item.balance ===
                                                              "Debet"
                                                        ? "Debet"
                                                        : item.balance ?? "-"}
                                                </td>
                                                <td className="px-4 py-2 text-sm">
                                                    {item.level ?? "-"}
                                                </td>
                                                <td className="px-4 py-2 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() =>
                                                                handleEdit(item)
                                                            }
                                                            className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item
                                                                )
                                                            }
                                                            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                                                        >
                                                            Hapus
                                                        </button>
                                                        {item.level === "0" && (
                                                            <button
                                                                onClick={() =>
                                                                    handleMakeSub(
                                                                        item
                                                                    )
                                                                }
                                                                className="rounded-lg border border-indigo-200 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-50"
                                                            >
                                                                Jadikan Sub
                                                            </button>
                                                        )}
                                                        {item.level === "1" && (
                                                            <button
                                                                onClick={() =>
                                                                    handleMakeInduk(
                                                                        item
                                                                    )
                                                                }
                                                                className="rounded-lg border border-green-200 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-50"
                                                            >
                                                                Jadikan Utama
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-4 py-6 text-center text-sm text-gray-500"
                                            >
                                                Tidak ada data.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {settingParentFor && (
                            <div className="mt-4 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Info className="w-4 h-4 text-indigo-600" />
                                    <span className="text-sm">
                                        Pilih akun induk untuk menjadikan{" "}
                                        <span className="font-semibold">
                                            {settingParentFor}
                                        </span>{" "}
                                        sebagai sub-akun.
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={indukKd}
                                        onChange={(e) =>
                                            setIndukKd(e.target.value)
                                        }
                                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300"
                                    >
                                        <option value="">
                                            -- Pilih Akun Induk --
                                        </option>
                                        {indukList.map((induk) => (
                                            <option
                                                key={induk.kd_rek}
                                                value={induk.kd_rek}
                                            >
                                                {induk.kd_rek} — {induk.nm_rek}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={submitMakeSub}
                                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                                    >
                                        Simpan
                                    </button>
                                    <button
                                        onClick={cancelMakeSub}
                                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Pagination Controls */}
                        <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-3">
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                Halaman {meta.current_page} dari{" "}
                                {meta.last_page} • Total {meta.total} data
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPage((p) => Math.max(1, p - 1))
                                    }
                                    disabled={meta.current_page <= 1}
                                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Prev
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPage((p) =>
                                            Math.min(meta.last_page, p + 1)
                                        )
                                    }
                                    disabled={
                                        meta.current_page >= meta.last_page
                                    }
                                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Next
                                </button>
                                <select
                                    value={perPage}
                                    onChange={(e) => {
                                        setPerPage(Number(e.target.value));
                                        setPage(1);
                                    }}
                                    className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs shadow-sm"
                                >
                                    {[10, 20, 30, 50].map((n) => (
                                        <option key={n} value={n}>
                                            {n}/halaman
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </Card>
                )}

                {showTree && (
                    <Card title="Tampilan Hierarkis (Tree View)">
                        <div className="space-y-1">
                            {indukHier.length === 0 ? (
                                <div className="text-sm text-gray-500">
                                    Tidak ada akun induk atau belum dimuat.
                                </div>
                            ) : (
                                indukHier.map((induk) => (
                                    <div key={induk.kd_rek} className="">
                                        <div className="flex items-center gap-2 py-1">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleExpand(induk.kd_rek)
                                                }
                                                className="rounded-md border border-gray-300 px-1 py-0.5 text-xs hover:bg-gray-50"
                                                title={
                                                    expanded[induk.kd_rek]
                                                        ? "Collapse"
                                                        : "Expand"
                                                }
                                            >
                                                {expanded[induk.kd_rek] ? (
                                                    <ChevronDown className="w-3 h-3" />
                                                ) : (
                                                    <ChevronRight className="w-3 h-3" />
                                                )}
                                            </button>
                                            <span className="font-mono text-xs">
                                                {induk.kd_rek}
                                            </span>
                                            <span className="text-sm">
                                                {induk.nm_rek}
                                            </span>
                                            <span className="ml-auto text-[11px] px-2 py-0.5 rounded bg-gray-100 border">
                                                Induk
                                            </span>
                                        </div>
                                        {expanded[induk.kd_rek] && (
                                            <div className="ml-6 border-l pl-3">
                                                {(
                                                    childrenMap[induk.kd_rek] ||
                                                    []
                                                ).length === 0 ? (
                                                    <div className="text-xs text-gray-400">
                                                        (Tidak ada sub-akun)
                                                    </div>
                                                ) : (
                                                    (
                                                        childrenMap[
                                                            induk.kd_rek
                                                        ] || []
                                                    ).map((child) => (
                                                        <TreeRow
                                                            key={child.kd_rek}
                                                            node={child}
                                                            level={1}
                                                        />
                                                    ))
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}

// Row komponen untuk node tree dengan lazy-load children saat expand
function TreeRow({ node, level }) {
    const [expanded, setExpanded] = React.useState(false);
    const [children, setChildren] = React.useState([]);

    const fetchChildren = async () => {
        try {
            const res = await axios.get(
                `/api/akutansi/rekening/${encodeURIComponent(
                    node.kd_rek
                )}/children`
            );
            const payload = res.data || {};
            setChildren(payload.data || []);
        } catch (e) {
            console.error("Gagal memuat anak untuk", node.kd_rek, e);
        }
    };

    const toggle = async () => {
        if (!expanded) {
            await fetchChildren();
        }
        setExpanded((v) => !v);
    };

    return (
        <div className="py-1">
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={toggle}
                    className="rounded-md border border-gray-300 px-1 py-0.5 text-xs hover:bg-gray-50"
                    title={expanded ? "Collapse" : "Expand"}
                >
                    {expanded ? (
                        <ChevronDown className="w-3 h-3" />
                    ) : (
                        <ChevronRight className="w-3 h-3" />
                    )}
                </button>
                <span className="font-mono text-xs">{node.kd_rek}</span>
                <span className="text-sm">{node.nm_rek}</span>
                <span className="ml-auto text-[11px] px-2 py-0.5 rounded bg-gray-50 border">
                    Sub
                </span>
            </div>
            {expanded && (
                <div className="ml-6 border-l pl-3">
                    {children.length === 0 ? (
                        <div className="text-xs text-gray-400">
                            (Tidak ada sub-akun)
                        </div>
                    ) : (
                        children.map((c) => (
                            <TreeRow
                                key={c.kd_rek}
                                node={c}
                                level={(level || 1) + 1}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

RekeningPage.layout = (page) => (
    <SidebarKeuangan title="Keuangan" children={page} />
);
