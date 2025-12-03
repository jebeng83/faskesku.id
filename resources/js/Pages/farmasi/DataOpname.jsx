import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Head, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarFarmasi from "@/Layouts/SidebarFarmasi";
import { toast } from "@/tools/toast";
import {
    Search,
    RefreshCcw,
    Printer,
    Trash2,
    XCircle,
    Plus,
} from "lucide-react";
import axios from "axios";

// Simple UI wrappers (fallback if shadcn components not present)
function Card({ children, className = "" }) {
    return (
        <motion.div
            className={`rounded-xl border border-white/60 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl shadow-lg ${className}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}
function CardHeader({ children, className = "" }) {
    return (
        <div
            className={`px-4 py-2.5 border-b border-gray-200/60 dark:border-gray-700/50 ${className}`}
        >
            {children}
        </div>
    );
}
function CardTitle({ children }) {
    return (
        <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            {children}
        </h3>
    );
}
function CardContent({ children, className = "" }) {
    return <div className={`p-4 ${className}`}>{children}</div>;
}
function Button({ children, className = "", ...props }) {
    return (
        <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            {...props}
            className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-gray-50 ${className}`}
        >
            {children}
        </motion.button>
    );
}
function Input({ className = "", ...props }) {
    return (
        <input
            {...props}
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
        />
    );
}
function Select({ className = "", ...props }) {
    return (
        <select
            {...props}
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
        />
    );
}

const columns = [
    "Pilih",
    "Kode Barang",
    "Nama Barang",
    "Harga Beli",
    "Satuan",
    "Tanggal",
    "Stok",
    "Real",
    "Selisih",
    "Lebih",
    "Total Real",
    "Nominal Hilang(Rp)",
    "Nominal Lebih(Rp)",
    "Keterangan",
    "Kode Lokasi",
    "Nama Lokasi",
    "No.Batch",
    "No.Faktur",
];

export default function DataOpname({ auth }) {
    const appTz =
        typeof document !== "undefined"
            ? document
                  .querySelector('meta[name="app-timezone"]')
                  ?.getAttribute("content") || "Asia/Jakarta"
            : "Asia/Jakarta";
    const fmtDate = (d) => {
        try {
            return new Date(d).toLocaleDateString("en-CA", { timeZone: appTz });
        } catch {
            return new Date(d).toISOString().slice(0, 10);
        }
    };
    const today = new Date();
    const [filters, setFilters] = useState({
        tanggal_dari: fmtDate(today),
        tanggal_sampai: fmtDate(today),
        kd_bangsal: "",
        keyword: "",
    });
    const [lokasi, setLokasi] = useState([]);
    const [jenisList, setJenisList] = useState([]);
    const [kategoriList, setKategoriList] = useState([]);
    const [golonganList, setGolonganList] = useState([]);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(new Set());
    const [appSetting, setAppSetting] = useState(null);

    // Modal Tambah Obat
    const [showAddObatModal, setShowAddObatModal] = useState(false);
    const [savingObat, setSavingObat] = useState(false);
    const [obatForm, setObatForm] = useState({
        kode_brng: "",
        nama_brng: "",
        kode_sat: "",
        kode_satbesar: "UNIT",
        letak_barang: "Apotek",
        dasar: "",
        h_beli: "",
        ralan: "",
        kelas1: "",
        kelas2: "",
        kelas3: "",
        utama: "",
        vip: "",
        vvip: "",
        beliluar: "",
        jualbebas: "",
        karyawan: "",
        stokminimal: "",
        kdjns: "",
        isi: "1",
        kapasitas: "0",
        expire: "",
        status: "1",
        kode_industri: "",
        kode_kategori: "",
        kode_golongan: "",
    });

    function openAddObatModal() {
        setShowAddObatModal(true);
    }
    function closeAddObatModal() {
        setShowAddObatModal(false);
    }
    function handleObatChange(field, value) {
        setObatForm((prev) => ({ ...prev, [field]: value }));
    }

    async function submitObatBaru() {
        // Validasi minimal: kode_brng, nama_brng, dasar, kode_satbesar
        if (
            !obatForm.kode_brng ||
            !obatForm.nama_brng ||
            !obatForm.dasar ||
            !obatForm.kode_satbesar
        ) {
            toast(
                "Kode barang, Nama barang, Harga dasar, dan Kode satuan besar wajib diisi",
                "error"
            );
            return;
        }
        try {
            setSavingObat(true);
            const payload = {
                ...obatForm,
                dasar: parseFloat(obatForm.dasar) || 0,
                h_beli: obatForm.h_beli
                    ? parseFloat(obatForm.h_beli)
                    : undefined,
                ralan: obatForm.ralan ? parseFloat(obatForm.ralan) : undefined,
                kelas1: obatForm.kelas1
                    ? parseFloat(obatForm.kelas1)
                    : undefined,
                kelas2: obatForm.kelas2
                    ? parseFloat(obatForm.kelas2)
                    : undefined,
                kelas3: obatForm.kelas3
                    ? parseFloat(obatForm.kelas3)
                    : undefined,
                utama: obatForm.utama ? parseFloat(obatForm.utama) : undefined,
                vip: obatForm.vip ? parseFloat(obatForm.vip) : undefined,
                vvip: obatForm.vvip ? parseFloat(obatForm.vvip) : undefined,
                beliluar: obatForm.beliluar
                    ? parseFloat(obatForm.beliluar)
                    : undefined,
                jualbebas: obatForm.jualbebas
                    ? parseFloat(obatForm.jualbebas)
                    : undefined,
                karyawan: obatForm.karyawan
                    ? parseFloat(obatForm.karyawan)
                    : undefined,
                stokminimal: obatForm.stokminimal
                    ? parseFloat(obatForm.stokminimal)
                    : undefined,
                isi: obatForm.isi ? parseFloat(obatForm.isi) : 1,
                kapasitas: obatForm.kapasitas
                    ? parseFloat(obatForm.kapasitas)
                    : 0,
                status: obatForm.status || "1",
            };
            const res = await axios.post("/farmasi/data-obat", payload);
            if (
                res?.data?.success ||
                res?.status === 302 ||
                res?.status === 200
            ) {
                toast("Obat berhasil ditambahkan", "success");
                setShowAddObatModal(false);
                setObatForm({
                    kode_brng: "",
                    nama_brng: "",
                    kode_sat: "",
                    kode_satbesar: "UNIT",
                    letak_barang: "Apotek",
                    dasar: "",
                    h_beli: "",
                    ralan: "",
                    kelas1: "",
                    kelas2: "",
                    kelas3: "",
                    utama: "",
                    vip: "",
                    vvip: "",
                    beliluar: "",
                    jualbebas: "",
                    karyawan: "",
                    stokminimal: "",
                    kdjns: "",
                    isi: "1",
                    kapasitas: "0",
                    expire: "",
                    status: "1",
                    kode_industri: "",
                    kode_kategori: "",
                    kode_golongan: "",
                });
            } else {
                toast(res?.data?.message || "Gagal menambahkan obat", "error");
            }
        } catch (error) {
            console.error("Error tambah obat:", error);
            const msg =
                error?.response?.data?.message ||
                "Terjadi kesalahan saat menambahkan obat";
            toast(msg, "error");
        } finally {
            setSavingObat(false);
        }
    }

    useEffect(() => {
        loadLokasi();
        loadDropdowns();
    }, []);

    async function loadLokasi() {
        try {
            const r = await fetch("/api/opname/lokasi");
            if (!r.ok) throw new Error("HTTP " + r.status);
            const json = await r.json();
            if (json.success) setLokasi(json.data || []);
        } catch (e) {
            console.error("Load lokasi error:", e);
            toast("Gagal memuat data lokasi", "error");
        }
    }

    async function loadDropdowns() {
        try {
            // Ambil Jenis dari tabel `jenis`
            const rJenis = await fetch("/farmasi/jenis-obat", {
                headers: { Accept: "application/json" },
            });
            const jJenis = await rJenis.json().catch(() => ({}));
            const itemsJenis = Array.isArray(jJenis.items) ? jJenis.items : [];
            setJenisList(itemsJenis);

            // Ambil Kategori dari tabel `kategori_barang`
            const rKat = await fetch("/farmasi/kategori-obat", {
                headers: { Accept: "application/json" },
            });
            const jKat = await rKat.json().catch(() => ({}));
            const itemsKat = Array.isArray(jKat.items) ? jKat.items : [];
            setKategoriList(itemsKat);

            // Ambil Golongan dari tabel `golongan_barang`
            const rGol = await fetch("/farmasi/golongan-obat", {
                headers: { Accept: "application/json" },
            });
            const jGol = await rGol.json().catch(() => ({}));
            const itemsGol = Array.isArray(jGol.items) ? jGol.items : [];
            setGolonganList(itemsGol);
        } catch (e) {
            console.error("Load dropdowns error:", e);
        }
    }

    function formatIDR(n) {
        try {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(Number(n || 0));
        } catch {
            return n;
        }
    }

    function handlePrint() {
        const qs = {
            tanggal_dari: filters.tanggal_dari,
            tanggal_sampai: filters.tanggal_sampai,
            kd_bangsal: filters.kd_bangsal || "",
        };
        router.get(route("farmasi.cetak.data-opname"), qs, {
            preserveState: true,
        });
    }

    const totals = useMemo(() => {
        let totalreal = 0,
            totalHilang = 0,
            totalLebih = 0;
        rows.forEach((r) => {
            totalreal += Number(r.totalreal || 0);
            totalHilang += Number(r.nomihilang || 0);
            totalLebih += Number(r.nomilebih || 0);
        });
        return { totalreal, totalHilang, totalLebih };
    }, [rows]);

    async function fetchList() {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                tanggal_dari: filters.tanggal_dari,
                tanggal_sampai: filters.tanggal_sampai,
                kd_bangsal: filters.kd_bangsal || "",
            }).toString();
            const r = await fetch(`/api/opname/list?${params}`);
            const json = await r.json();
            if (json.success) setRows(normalizeRows(json.data || []));
            else toast(json.message || "Gagal memuat data opname", "error");
        } catch (e) {
            console.error("Fetch list error:", e);
            toast("Gagal memuat data opname", "error");
        } finally {
            setLoading(false);
        }
    }

    async function doSearch() {
        if (!filters.kd_bangsal) {
            toast("Pilih lokasi terlebih dahulu", "warning");
            return;
        }
        setLoading(true);
        try {
            const params = new URLSearchParams({
                kd_bangsal: filters.kd_bangsal,
                search: filters.keyword,
            }).toString();
            const r = await fetch(`/api/opname/search?${params}`);
            const json = await r.json();
            if (json.success) setRows(normalizeRows(json.data || []));
        } catch (e) {
            console.error("Search error:", e);
        } finally {
            setLoading(false);
        }
    }

    function resetFilters() {
        const now = new Date();
        setFilters({
            tanggal_dari: fmtDate(now),
            tanggal_sampai: fmtDate(now),
            kd_bangsal: "",
            keyword: "",
        });
        setRows([]);
        setSelected(new Set());
    }

    function normalizeRows(arr) {
        return (arr || []).map((r) => ({
            ...r,
            h_beli: r.h_beli ?? r.harga ?? 0,
            kode_sat: r.kode_sat ?? r.satuan ?? "",
            totalreal:
                r.totalreal ??
                Number(r.real || 0) * Number(r.h_beli ?? r.harga ?? 0),
            kd_bangsal: r.kd_bangsal ?? r.kd_bangsal ?? "",
        }));
    }

    function rowKey(r) {
        const t = (r.tanggal || "").slice(0, 10);
        return `${r.kode_brng}|${r.kd_bangsal}|${t}|${r.no_batch || ""}|${
            r.no_faktur || ""
        }`;
    }

    function toggleSelectAll(e) {
        const checked = e.target.checked;
        if (checked) {
            const next = new Set(rows.map(rowKey));
            setSelected(next);
        } else {
            setSelected(new Set());
        }
    }

    function toggleSelectRow(key, checked) {
        const next = new Set(selected);
        if (checked) next.add(key);
        else next.delete(key);
        setSelected(next);
    }

    async function deleteSelected() {
        if (selected.size === 0) return;
        try {
            const items = rows
                .filter((r) => selected.has(rowKey(r)))
                .map((r) => ({
                    kd_bangsal: r.kd_bangsal,
                    tanggal: (r.tanggal || "").slice(0, 10),
                    kode_brng: r.kode_brng,
                    no_batch: r.no_batch || "",
                    no_faktur: r.no_faktur || "",
                }));
            const resp = await fetch("/api/opname/delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items }),
            });
            const json = await resp.json();
            if (!resp.ok || !json.success) {
                toast(json.message || "Gagal menghapus data opname", "error");
                return;
            }
            // Hapus baris terpilih dari state
            const nextRows = rows.filter((r) => !selected.has(rowKey(r)));
            setRows(nextRows);
            setSelected(new Set());
            toast(
                `Berhasil menghapus ${json.deleted_count ?? items.length} data`,
                "success"
            );
        } catch (e) {
            console.error("Delete error:", e);
            toast("Terjadi kesalahan saat menghapus", "error");
        }
    }

    return (
        <SidebarFarmasi title="Farmasi">
            <Head title="Data Opname" />
            <div className="screen-only">
                <div className="px-6 py-4 rounded-xl bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 ring-1 ring-black/5">
                    <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                        Data Opname
                    </h2>
                </div>
                <div className="py-6">
                    <div className="mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
                        <Card className="mb-4">
                            <CardHeader>
                                <CardTitle>Filter</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* Baris pertama: Jenis, Kategori, Golongan */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600">
                                            Jenis
                                        </label>
                                        <Select
                                            value={filters.kdjns || ""}
                                            onChange={(e) =>
                                                setFilters((f) => ({
                                                    ...f,
                                                    kdjns: e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="">
                                                Semua Jenis
                                            </option>
                                            {jenisList.map((j) => (
                                                <option
                                                    key={j.kdjns}
                                                    value={j.kdjns}
                                                >
                                                    {j.kdjns} — {j.nama}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600">
                                            Kategori
                                        </label>
                                        <Select
                                            value={filters.kategori || ""}
                                            onChange={(e) =>
                                                setFilters((f) => ({
                                                    ...f,
                                                    kategori: e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="">
                                                Semua Kategori
                                            </option>
                                            {kategoriList.map((k) => (
                                                <option
                                                    key={k.kode}
                                                    value={k.kode}
                                                >
                                                    {k.kode} — {k.nama}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600">
                                            Golongan
                                        </label>
                                        <Select
                                            value={filters.golongan || ""}
                                            onChange={(e) =>
                                                setFilters((f) => ({
                                                    ...f,
                                                    golongan: e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="">
                                                Semua Golongan
                                            </option>
                                            {golonganList.map((g) => (
                                                <option
                                                    key={g.kode}
                                                    value={g.kode}
                                                >
                                                    {g.kode} — {g.nama}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600">
                                            Tanggal Dari
                                        </label>
                                        <Input
                                            type="date"
                                            value={filters.tanggal_dari}
                                            onChange={(e) =>
                                                setFilters((f) => ({
                                                    ...f,
                                                    tanggal_dari:
                                                        e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600">
                                            Tanggal Sampai
                                        </label>
                                        <Input
                                            type="date"
                                            value={filters.tanggal_sampai}
                                            onChange={(e) =>
                                                setFilters((f) => ({
                                                    ...f,
                                                    tanggal_sampai:
                                                        e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600">
                                            Lokasi
                                        </label>
                                        <Select
                                            value={filters.kd_bangsal}
                                            onChange={(e) =>
                                                setFilters((f) => ({
                                                    ...f,
                                                    kd_bangsal: e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="">
                                                Semua Lokasi
                                            </option>
                                            {lokasi.map((l) => (
                                                <option
                                                    key={l.kd_bangsal}
                                                    value={l.kd_bangsal}
                                                >
                                                    {l.nm_bangsal}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-600">
                                            Kata Kunci
                                        </label>
                                        <div className="flex gap-2">
                                            <Input
                                                value={filters.keyword}
                                                onChange={(e) =>
                                                    setFilters((f) => ({
                                                        ...f,
                                                        keyword: e.target.value,
                                                    }))
                                                }
                                                placeholder="Cari nama/kode barang"
                                            />
                                            <Button
                                                title="Cari berdasarkan kata kunci"
                                                aria-label="Cari berdasarkan kata kunci"
                                                onClick={doSearch}
                                                className="bg-indigo-50 border-indigo-300 text-indigo-700"
                                            >
                                                <Search className="w-4 h-4" />{" "}
                                                Cari
                                            </Button>
                                            <Button
                                                title="Bersihkan kata kunci"
                                                aria-label="Bersihkan kata kunci"
                                                onClick={() =>
                                                    setFilters((f) => ({
                                                        ...f,
                                                        keyword: "",
                                                    }))
                                                }
                                                className="border-gray-300 text-gray-700"
                                            >
                                                <XCircle className="w-4 h-4" />{" "}
                                                Bersihkan
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 flex gap-2">
                                    <Button
                                        onClick={fetchList}
                                        className="bg-blue-50 border-blue-300 text-blue-700"
                                    >
                                        Tampilkan
                                    </Button>
                                    <Button onClick={resetFilters}>
                                        <RefreshCcw className="w-4 h-4" /> Reset
                                    </Button>
                                    <Button onClick={handlePrint}>
                                        <Printer className="w-4 h-4" /> Cetak
                                    </Button>
                                    <Button
                                        onClick={deleteSelected}
                                        disabled={selected.size === 0}
                                        className={`border-red-300 ${
                                            selected.size === 0
                                                ? "text-red-300"
                                                : "text-red-600"
                                        }`}
                                    >
                                        <Trash2 className="w-4 h-4" /> Hapus
                                    </Button>
                                    <Button
                                        onClick={openAddObatModal}
                                        className="bg-violet-50 border-violet-300 text-violet-700"
                                    >
                                        <Plus className="w-4 h-4" /> + Obat
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Daftar Data Opname</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-auto rounded-lg ring-1 ring-black/5 dark:ring-white/10">
                                    <table className="min-w-full text-sm">
                                        <thead>
                                            <tr className="sticky top-0 z-10 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm">
                                                <th className="px-2 py-2 text-left">
                                                    <input
                                                        type="checkbox"
                                                        aria-label="Pilih semua"
                                                        onChange={
                                                            toggleSelectAll
                                                        }
                                                        checked={
                                                            rows.length > 0 &&
                                                            selected.size ===
                                                                rows.length
                                                        }
                                                    />
                                                </th>
                                                {columns.slice(1).map((c) => (
                                                    <th
                                                        key={c}
                                                        className="px-2 py-2 text-left whitespace-nowrap"
                                                    >
                                                        {c}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                <tr>
                                                    <td
                                                        colSpan={columns.length}
                                                        className="text-center py-6"
                                                    >
                                                        Memuat...
                                                    </td>
                                                </tr>
                                            ) : rows.length === 0 ? (
                                                <tr>
                                                    <td
                                                        colSpan={columns.length}
                                                        className="text-center py-6"
                                                    >
                                                        Tidak ada data
                                                    </td>
                                                </tr>
                                            ) : (
                                                rows.map((r, idx) => {
                                                    const key = rowKey(r);
                                                    const checked =
                                                        selected.has(key);
                                                    return (
                                                        <tr
                                                            key={key}
                                                            className="odd:bg-white even:bg-gray-50/60 hover:bg-indigo-50/50 dark:odd:bg-gray-900 dark:even:bg-gray-800"
                                                        >
                                                            <td className="px-2 py-1">
                                                                <input
                                                                    type="checkbox"
                                                                    aria-label={`Pilih ${r.kode_brng}`}
                                                                    checked={
                                                                        checked
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        toggleSelectRow(
                                                                            key,
                                                                            e
                                                                                .target
                                                                                .checked
                                                                        )
                                                                    }
                                                                />
                                                            </td>
                                                            <td className="px-2 py-1 font-mono">
                                                                {r.kode_brng}
                                                            </td>
                                                            <td className="px-2 py-1">
                                                                {r.nama_brng}
                                                            </td>
                                                            <td className="px-2 py-1 text-right">
                                                                {formatIDR(
                                                                    r.h_beli
                                                                )}
                                                            </td>
                                                            <td className="px-2 py-1">
                                                                {r.kode_sat}
                                                            </td>
                                                            <td className="px-2 py-1 whitespace-nowrap">
                                                                {r.tanggal?.slice(
                                                                    0,
                                                                    10
                                                                )}
                                                            </td>
                                                            <td className="px-2 py-1 text-right">
                                                                {r.stok}
                                                            </td>
                                                            <td className="px-2 py-1 text-right">
                                                                {r.real}
                                                            </td>
                                                            <td className="px-2 py-1 text-right">
                                                                {r.selisih}
                                                            </td>
                                                            <td className="px-2 py-1 text-right">
                                                                {r.lebih}
                                                            </td>
                                                            <td className="px-2 py-1 text-right">
                                                                {formatIDR(
                                                                    r.totalreal
                                                                )}
                                                            </td>
                                                            <td className="px-2 py-1 text-right text-red-700">
                                                                {formatIDR(
                                                                    r.nomihilang
                                                                )}
                                                            </td>
                                                            <td className="px-2 py-1 text-right text-green-700">
                                                                {formatIDR(
                                                                    r.nomilebih
                                                                )}
                                                            </td>
                                                            <td className="px-2 py-1">
                                                                {r.keterangan ||
                                                                    "-"}
                                                            </td>
                                                            <td className="px-2 py-1 font-mono">
                                                                {r.kd_bangsal}
                                                            </td>
                                                            <td className="px-2 py-1">
                                                                {r.nm_bangsal}
                                                            </td>
                                                            <td className="px-2 py-1">
                                                                {r.no_batch ||
                                                                    "-"}
                                                            </td>
                                                            <td className="px-2 py-1">
                                                                {r.no_faktur ||
                                                                    "-"}
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                                    <div>
                                        <strong>Record:</strong> {rows.length}
                                    </div>
                                    <div>
                                        <strong>Total Real:</strong>{" "}
                                        {formatIDR(totals.totalreal)}
                                    </div>
                                    <div className="text-red-700">
                                        <strong>Hilang:</strong>{" "}
                                        {formatIDR(totals.totalHilang)}
                                    </div>
                                    <div className="text-green-700">
                                        <strong>Lebih:</strong>{" "}
                                        {formatIDR(totals.totalLebih)}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            {/* Modal Tambah Obat: tampilkan semua field tabel databarang */}
            <AnimatePresence>
                {showAddObatModal && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm overflow-y-auto p-4 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 40, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 220,
                                damping: 20,
                            }}
                            className="mx-4 w-full max-w-4xl rounded-xl border border-white/60 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl p-6 shadow-xl"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Tambah Obat (databarang)
                                </h3>
                                <button
                                    onClick={closeAddObatModal}
                                    className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300"
                                    aria-label="Tutup"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Kode Barang
                                    </label>
                                    <Input
                                        value={obatForm.kode_brng}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "kode_brng",
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                        placeholder="Mis. A000000001"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Nama Barang
                                    </label>
                                    <Input
                                        value={obatForm.nama_brng}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "nama_brng",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Nama obat"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Kode Satuan
                                    </label>
                                    <Input
                                        value={obatForm.kode_sat}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "kode_sat",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Mis. UNIT"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Kode Satuan Besar
                                    </label>
                                    <Input
                                        value={obatForm.kode_satbesar}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "kode_satbesar",
                                                e.target.value
                                            )
                                        }
                                        placeholder="UNIT"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Letak Barang
                                    </label>
                                    <Input
                                        value={obatForm.letak_barang}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "letak_barang",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Apotek"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Harga Dasar
                                    </label>
                                    <Input
                                        type="number"
                                        value={obatForm.dasar}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "dasar",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Harga Beli
                                    </label>
                                    <Input
                                        type="number"
                                        value={obatForm.h_beli}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "h_beli",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Ralan
                                    </label>
                                    <Input
                                        type="number"
                                        value={obatForm.ralan}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "ralan",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Kelas 1
                                    </label>
                                    <Input
                                        type="number"
                                        value={obatForm.kelas1}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "kelas1",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Kelas 2
                                    </label>
                                    <Input
                                        type="number"
                                        value={obatForm.kelas2}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "kelas2",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Kelas 3
                                    </label>
                                    <Input
                                        type="number"
                                        value={obatForm.kelas3}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "kelas3",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Utama
                                    </label>
                                    <Input
                                        type="number"
                                        value={obatForm.utama}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "utama",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        VIP
                                    </label>
                                    <Input
                                        type="number"
                                        value={obatForm.vip}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "vip",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        VVIP
                                    </label>
                                    <Input
                                        type="number"
                                        value={obatForm.vvip}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "vvip",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Beli Luar
                                    </label>
                                    <Input
                                        type="number"
                                        value={obatForm.beliluar}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "beliluar",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Jual Bebas
                                    </label>
                                    <Input
                                        type="number"
                                        value={obatForm.jualbebas}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "jualbebas",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Karyawan
                                    </label>
                                    <Input
                                        type="number"
                                        value={obatForm.karyawan}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "karyawan",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Stok Minimal
                                    </label>
                                    <Input
                                        type="number"
                                        value={obatForm.stokminimal}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "stokminimal",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Jenis Obat (kdjns)
                                    </label>
                                    <Select
                                        value={obatForm.kdjns}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "kdjns",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Pilih Jenis</option>
                                        {jenisList.map((j) => (
                                            <option
                                                key={j.kdjns}
                                                value={j.kdjns}
                                            >
                                                {j.kdjns} — {j.nama}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Isi
                                    </label>
                                    <Input
                                        type="number"
                                        value={obatForm.isi}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "isi",
                                                e.target.value
                                            )
                                        }
                                        placeholder="1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Kapasitas
                                    </label>
                                    <Input
                                        type="number"
                                        value={obatForm.kapasitas}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "kapasitas",
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Expire
                                    </label>
                                    <Input
                                        type="date"
                                        value={obatForm.expire}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "expire",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Status (0/1)
                                    </label>
                                    <Input
                                        value={obatForm.status}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "status",
                                                e.target.value
                                            )
                                        }
                                        placeholder="1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Kode Industri
                                    </label>
                                    <Input
                                        value={obatForm.kode_industri}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "kode_industri",
                                                e.target.value
                                            )
                                        }
                                        placeholder=""
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Kode Kategori
                                    </label>
                                    <Select
                                        value={obatForm.kode_kategori}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "kode_kategori",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {kategoriList.map((k) => (
                                            <option key={k.kode} value={k.kode}>
                                                {k.kode} — {k.nama}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">
                                        Kode Golongan
                                    </label>
                                    <Select
                                        value={obatForm.kode_golongan}
                                        onChange={(e) =>
                                            handleObatChange(
                                                "kode_golongan",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Pilih Golongan</option>
                                        {golonganList.map((g) => (
                                            <option key={g.kode} value={g.kode}>
                                                {g.kode} — {g.nama}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <Button
                                    onClick={closeAddObatModal}
                                    className="border-gray-300 text-gray-700"
                                >
                                    Batal
                                </Button>
                                <Button
                                    onClick={submitObatBaru}
                                    className="bg-indigo-50 border-indigo-300 text-indigo-700"
                                    disabled={savingObat}
                                >
                                    {savingObat ? "Menyimpan..." : "Simpan"}
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <style>{`
        @page { size: A4 landscape; margin: 12mm; }
        @media print {
          .print-area { display: block; }
          .screen-only { display: none !important; }
          body { background: #ffffff; }
        }
      `}</style>
            <div className="print-area hidden">
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                    }}
                >
                    {appSetting?.nama_instansi ? (
                        <img
                            src={`/setting/app/${encodeURIComponent(
                                appSetting.nama_instansi
                            )}/logo`}
                            alt="Logo"
                            style={{ height: "60px", objectFit: "contain" }}
                        />
                    ) : (
                        <div
                            style={{
                                width: "60px",
                                height: "60px",
                                border: "1px solid #ddd",
                            }}
                        />
                    )}
                    <div style={{ fontSize: "20px", fontWeight: 700 }}>
                        {appSetting?.nama_instansi || "Nama Instansi"}
                    </div>
                </div>
                <div
                    style={{ marginTop: "8px", borderTop: "1px solid #000" }}
                />
                <div
                    style={{
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: 700,
                        padding: "6px 0",
                    }}
                >
                    DATA STOK OPNAME
                </div>
                <div style={{ borderBottom: "1px solid #000" }} />
                <div style={{ marginTop: "12px", fontWeight: 600 }}>
                    Daftar Data Opname
                </div>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "8px",
                        fontSize: "12px",
                    }}
                >
                    <thead>
                        <tr>
                            {columns.slice(1).map((c) => (
                                <th
                                    key={c}
                                    style={{
                                        border: "1px solid #000",
                                        padding: "4px",
                                        textAlign: "left",
                                    }}
                                >
                                    {c}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r) => (
                            <tr key={rowKey(r)}>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "4px",
                                    }}
                                >
                                    {r.kode_brng}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "4px",
                                    }}
                                >
                                    {r.nama_brng}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "4px",
                                        textAlign: "right",
                                    }}
                                >
                                    {formatIDR(r.h_beli)}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "4px",
                                    }}
                                >
                                    {r.kode_sat}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "4px",
                                    }}
                                >
                                    {r.tanggal?.slice(0, 10)}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "4px",
                                        textAlign: "right",
                                    }}
                                >
                                    {r.stok}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "4px",
                                        textAlign: "right",
                                    }}
                                >
                                    {r.real}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "4px",
                                        textAlign: "right",
                                    }}
                                >
                                    {r.selisih}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "4px",
                                        textAlign: "right",
                                    }}
                                >
                                    {r.lebih}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "4px",
                                        textAlign: "right",
                                    }}
                                >
                                    {formatIDR(r.totalreal)}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "4px",
                                        textAlign: "right",
                                    }}
                                >
                                    {formatIDR(r.nomihilang)}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "4px",
                                        textAlign: "right",
                                    }}
                                >
                                    {formatIDR(r.nomilebih)}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "4px",
                                    }}
                                >
                                    {r.keterangan || "-"}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "4px",
                                    }}
                                >
                                    {r.kd_bangsal}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "4px",
                                    }}
                                >
                                    {r.nm_bangsal}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "4px",
                                    }}
                                >
                                    {r.no_batch || "-"}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "4px",
                                    }}
                                >
                                    {r.no_faktur || "-"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </SidebarFarmasi>
    );
}
