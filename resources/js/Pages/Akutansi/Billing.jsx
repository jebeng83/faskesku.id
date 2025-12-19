import React from "react";
import axios from "axios";
import { Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { motion, AnimatePresence } from "framer-motion";
import {
    Receipt,
    Search,
    Plus,
    Pencil,
    Trash2,
    Info,
    Wallet,
    Check,
    Calendar,
    FileText,
    Tag,
    DollarSign,
    Hash,
    X,
    Loader2,
    AlertCircle,
    Database,
    RefreshCw,
    CreditCard,
} from "lucide-react";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import SearchableSelect from "@/Components/SearchableSelect";
import {
    todayDateString,
    getAppTimeZone,
    nowDateTimeString,
} from "@/tools/datetime";
import { toast } from "@/tools/toast";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
        scale: 1.01,
        y: -4,
        transition: { duration: 0.3, ease: "easeOut" },
    },
};

const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
});
const number = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 });

// Fungsi helper untuk membulatkan angka ke n desimal
function round(value, decimals = 2) {
    return (
        Math.round((value + Number.EPSILON) * Math.pow(10, decimals)) /
        Math.pow(10, decimals)
    );
}

function formatIDR(n) {
    const v = Number(n) || 0;
    return currency.format(v);
}

function parseIDRInput(s) {
    const d = String(s || "").replace(/[^0-9]/g, "");
    return Number(d || 0);
}

// Fungsi untuk normalisasi tanggal ke format yyyy-MM-dd untuk input type="date"
// Menggunakan timezone aplikasi (Asia/Jakarta) untuk konsistensi
function normalizeDateForInput(dateValue, useAppTimezone = true) {
    if (!dateValue) return "";
    // Jika sudah format yyyy-MM-dd, return langsung
    if (
        typeof dateValue === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(dateValue)
    ) {
        return dateValue;
    }
    // Jika format ISO datetime string, ambil bagian tanggal saja dengan timezone
    if (typeof dateValue === "string" && dateValue.includes("T")) {
        if (useAppTimezone) {
            try {
                const tz = getAppTimeZone();
                const date = new Date(dateValue);
                return date.toLocaleDateString("en-CA", { timeZone: tz });
            } catch (e) {
                // Fallback ke split jika parsing gagal
                return dateValue.split("T")[0];
            }
        }
        return dateValue.split("T")[0];
    }
    // Jika Date object, konversi ke yyyy-MM-dd dengan timezone
    if (dateValue instanceof Date) {
        if (useAppTimezone) {
            try {
                const tz = getAppTimeZone();
                return dateValue.toLocaleDateString("en-CA", { timeZone: tz });
            } catch (e) {
                // Fallback ke ISO jika parsing gagal
                return dateValue.toISOString().slice(0, 10);
            }
        }
        return dateValue.toISOString().slice(0, 10);
    }
    // Coba parse sebagai tanggal
    try {
        const date = new Date(dateValue);
        if (!isNaN(date.getTime())) {
            if (useAppTimezone) {
                try {
                    const tz = getAppTimeZone();
                    return date.toLocaleDateString("en-CA", { timeZone: tz });
                } catch (e) {
                    // Fallback ke ISO jika parsing gagal
                    return date.toISOString().slice(0, 10);
                }
            }
            return date.toISOString().slice(0, 10);
        }
    } catch (e) {
        // Ignore
    }
    return "";
}

// Fungsi untuk format tanggal menjadi format Indonesia (DD/MM/YYYY)
function formatTanggal(dateString) {
    if (!dateString) return "-";

    try {
        // Handle berbagai format input
        let date;

        // Jika format ISO dengan timezone (2025-11-24T17:00:00.000000Z)
        if (dateString.includes("T")) {
            date = new Date(dateString);
        }
        // Jika format YYYY-MM-DD
        else if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
            date = new Date(dateString + "T00:00:00");
        }
        // Format lainnya, coba parse langsung
        else {
            date = new Date(dateString);
        }

        // Validasi apakah date valid
        if (isNaN(date.getTime())) {
            return dateString; // Return as-is jika tidak bisa di-parse
        }

        // Format menjadi DD/MM/YYYY
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    } catch (e) {
        // Jika error, return as-is
        return dateString;
    }
}

function Field({ label, children, icon: Icon }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {label}
            </label>
            {children}
        </div>
    );
}

function BillingForm({ initial = {}, statusOptions = [], onSubmit, onCancel }) {
    const [form, setForm] = React.useState({
        no_rawat: initial.no_rawat || "",
        tgl_byr: normalizeDateForInput(initial.tgl_byr) || todayDateString(),
        no: initial.no || "",
        nm_perawatan: initial.nm_perawatan || "",
        pemisah: initial.pemisah ?? "-",
        biaya: initial.biaya ?? 0,
        jumlah: initial.jumlah ?? 1,
        tambahan: initial.tambahan ?? 0,
        status: initial.status || "",
    });
    const [saving, setSaving] = React.useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({
            ...f,
            [name]:
                name === "biaya" || name === "jumlah" || name === "tambahan"
                    ? value === ""
                        ? ""
                        : Number(value)
                    : value,
        }));
    };

    const total =
        (Number(form.biaya) || 0) * (Number(form.jumlah) || 0) +
        (Number(form.tambahan) || 0);

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await onSubmit({ ...form, totalbiaya: total });
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Field label="No. Rawat" icon={Hash}>
                    <input
                        name="no_rawat"
                        value={form.no_rawat}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                    />
                </Field>
                <Field label="Tanggal" icon={Calendar}>
                    <input
                        type="date"
                        name="tgl_byr"
                        value={form.tgl_byr}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                    />
                </Field>
                <Field label="Keterangan (No)" icon={Tag}>
                    <input
                        name="no"
                        value={form.no}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                    />
                </Field>
                <Field label="Kategori (Status)" icon={FileText}>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                    >
                        <option value="">Pilih Kategori…</option>
                        {statusOptions.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                </Field>
                <Field label="Nama Item (nm_perawatan)" icon={FileText}>
                    <input
                        name="nm_perawatan"
                        value={form.nm_perawatan}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                    />
                </Field>
                <Field label="Pemisah" icon={Tag}>
                    <input
                        name="pemisah"
                        value={form.pemisah}
                        onChange={handleChange}
                        maxLength={1}
                        className="w-full rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                    />
                </Field>
            </div>
            <div className="grid grid-cols-3 gap-4 md:gap-6">
                <Field label="Biaya" icon={DollarSign}>
                    <input
                        type="number"
                        step="0.01"
                        name="biaya"
                        value={form.biaya}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                    />
                </Field>
                <Field label="Jumlah" icon={Hash}>
                    <input
                        type="number"
                        step="0.01"
                        name="jumlah"
                        value={form.jumlah}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                    />
                </Field>
                <Field label="Tambahan" icon={DollarSign}>
                    <input
                        type="number"
                        step="0.01"
                        name="tambahan"
                        value={form.tambahan}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                    />
                </Field>
            </div>
            <motion.div
                className="flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200/50 dark:border-blue-800/50 px-6 py-4 backdrop-blur-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    Total Per Item
                </div>
                <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {currency.format(total || 0)}
                </div>
            </motion.div>
            <div className="flex items-center justify-end gap-3">
                <motion.button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2.5 rounded-lg bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Batal
                </motion.button>
                <motion.button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: saving ? 1 : 1.02 }}
                    whileTap={{ scale: saving ? 1 : 0.98 }}
                >
                    {saving ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Menyimpan…
                        </>
                    ) : (
                        <>
                            <Check className="w-4 h-4" />
                            Simpan
                        </>
                    )}
                </motion.button>
            </div>
        </form>
    );
}

function Modal({ title, children, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />
            <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/10 p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {title}
                    </h3>
                    <motion.button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </motion.button>
                </div>
                {children}
            </motion.div>
        </div>
    );
}

export default function BillingPage({
    statusOptions = [],
    initialNoRawat,
    dataKasirRouteName = "akutansi.kasir-ralan.page",
    billingApiPath = "/api/akutansi/billing",
}) {
    const [noRawat, setNoRawat] = React.useState(initialNoRawat || "");
    const [invoice, setInvoice] = React.useState(null);
    const [items, setItems] = React.useState([]);
    const [summary, setSummary] = React.useState({
        by_status: {},
        grand_total: 0,
    });
    const [loading, setLoading] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [showCreate, setShowCreate] = React.useState(false);
    const [editItem, setEditItem] = React.useState(null);
    const [q, setQ] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("");
    const [activeTab, setActiveTab] = React.useState("tagihan"); // tagihan | pembayaran | permintaan

    // Status Permintaan (Lab, Radiologi, Resep)
    const [labRequests, setLabRequests] = React.useState([]);
    const [radRequests, setRadRequests] = React.useState([]);
    const [resepRequests, setResepRequests] = React.useState([]);
    const [loadingRequests, setLoadingRequests] = React.useState(false);
    // Preview tambahan dari resep obat (ketika belum ada snapshot billing)
    const [mergingObatPreview, setMergingObatPreview] = React.useState(false);
    const [mergeError, setMergeError] = React.useState(null);

    // Pemetaan kategori UI -> status billing (dipakai bersama oleh PembayaranTab dan handleSnapshot)
    const CATEGORY_MAP = [
        { label: "Laboratorium", keys: ["Laborat", "TtlLaborat"] },
        { label: "Radiologi", keys: ["Radiologi", "TtlRadiologi"] },
        {
            label: "Tarif Dokter",
            keys: [
                "Ralan Dokter",
                "Ranap Dokter",
                "TtlRalan Dokter",
                "TtlRanap Dokter",
                "Dokter",
                "Ralan Dokter Paramedis",
            ],
        },
        {
            label: "Tarif Paramedis",
            keys: [
                "Ralan Paramedis",
                "Ralan Dokter Paramedis",
                "Ranap Dokter Paramedis",
                "Ranap Paramedis",
                "TtlRalan Paramedis",
                "Perawat",
            ],
        },
        {
            label: "Obat",
            keys: [
                "Obat",
                "Resep Pulang",
                "TtlObat",
                "TtlResep Pulang",
                "Retur Obat",
                "TtlRetur Obat",
            ],
        },
        { label: "Tambahan", keys: ["Tambahan", "TtlTambahan"] },
        { label: "Potongan", keys: ["Potongan", "TtlPotongan"] },
        {
            label: "Administrasi",
            keys: ["Administrasi", "Registrasi", "Service"],
        },
        { label: "Sarpras", keys: ["Kamar", "TtlKamar", "Harian"] },
    ];

    const buildUrl = (path, params = {}) => {
        try {
            const u = new URL(path, window.location.origin);
            Object.entries(params).forEach(([k, v]) => {
                if (v !== undefined && v !== null && v !== "")
                    u.searchParams.set(k, String(v));
            });
            return u.pathname + u.search + u.hash;
        } catch {
            const qs = Object.entries(params)
                .filter(([, v]) => v !== undefined && v !== null && v !== "")
                .map(
                    ([k, v]) =>
                        `${encodeURIComponent(k)}=${encodeURIComponent(
                            String(v)
                        )}`
                )
                .join("&");
            return path + (qs ? `?${qs}` : "");
        }
    };

    const loadData = async () => {
        if (!noRawat || noRawat.trim() === "") {
            console.log("loadData: noRawat kosong, skip loading");
            return;
        }

        console.log("loadData: Memuat data untuk no_rawat:", noRawat);
        setLoading(true);
        setError(null);
        try {
            // Header info invoice (visit + nota)
            // Gunakan encodeURI agar karakter '/' pada no_rawat tidak di-encode menjadi %2F
            const invUrl = buildUrl(`/akutansi/invoice/${encodeURI(noRawat)}`);
            console.log("loadData: Fetching invoice dari:", invUrl);
            const invRes = await axios.get(invUrl, {
                headers: { Accept: "application/json" },
            });
            setInvoice(invRes.data);
            console.log("loadData: Invoice data diterima:", invRes.data);

            // Items untuk CRUD (butuh noindex)
            // Tambahkan filter tanggal hari ini untuk memastikan hanya data hari ini yang ditampilkan
            const today = todayDateString();
            const apiUrl = buildUrl(billingApiPath, {
                no_rawat: noRawat,
                q,
                status: statusFilter,
                start_date: today, // Filter mulai dari tanggal hari ini
                end_date: today, // Filter sampai tanggal hari ini
            });
            console.log("loadData: Fetching billing dari:", apiUrl);
            const apiRes = await axios.get(apiUrl);
            console.log("loadData: Billing response:", {
                itemsCount: apiRes.data.items?.length || 0,
                items: apiRes.data.items,
                summary: apiRes.data.summary,
            });
            let baseItems = apiRes.data.items || [];

            // Normalisasi no_rawat untuk perbandingan (decode jika ada encoding)
            const normalizedNoRawat = decodeURIComponent(noRawat || "").trim();

            // Validasi: Pastikan hanya item dengan no_rawat yang sesuai yang ditampilkan
            // Filter ketat untuk mencegah duplikasi dari tanggal lain
            baseItems = baseItems.filter((item) => {
                // Normalisasi no_rawat dari item
                const itemNoRawat = (item.no_rawat || "").trim();

                // Pastikan no_rawat sesuai dengan yang diminta (perbandingan case-sensitive)
                if (itemNoRawat !== normalizedNoRawat) {
                    console.warn(
                        `Item dengan no_rawat tidak sesuai diabaikan:`,
                        {
                            expected: normalizedNoRawat,
                            actual: itemNoRawat,
                            item: item,
                        }
                    );
                    return false;
                }
                return true;
            });

            // Deduplication: Hapus item duplikat berdasarkan kombinasi field unik
            // PRIORITAS: Gunakan kombinasi no + status + tgl_byr + nm_perawatan + biaya + jumlah + tambahan
            // karena data bisa duplikat dengan noindex berbeda di database
            const seenItems = new Map();
            const deduplicatedItems = [];

            baseItems.forEach((item) => {
                // Normalisasi field untuk konsistensi
                const tglByr = String(item.tgl_byr || "").trim();
                const no = String(item.no || "").trim();
                const status = String(item.status || "").trim();
                const nmPerawatan = String(item.nm_perawatan || "").trim();
                const biaya = Number(item.biaya || 0);
                const jumlah = Number(item.jumlah || 0);
                const tambahan = Number(item.tambahan || 0);

                // Buat key unik berdasarkan kombinasi field (bukan noindex karena bisa berbeda untuk duplikat)
                const uniqueKey = `${no}_${status}_${tglByr}_${nmPerawatan}_${biaya}_${jumlah}_${tambahan}`;

                // Cek apakah item sudah pernah muncul
                if (!seenItems.has(uniqueKey)) {
                    seenItems.set(uniqueKey, item); // Simpan item pertama yang ditemukan
                    deduplicatedItems.push(item);
                } else {
                    const existingItem = seenItems.get(uniqueKey);
                    console.warn("Item duplikat diabaikan:", {
                        uniqueKey,
                        existing_noindex: existingItem?.noindex,
                        duplicate_noindex: item.noindex,
                        item: {
                            no: item.no,
                            status: item.status,
                            nm_perawatan: item.nm_perawatan,
                            tgl_byr: item.tgl_byr,
                            biaya: item.biaya,
                            jumlah: item.jumlah,
                            tambahan: item.tambahan,
                        },
                    });
                }
            });

            baseItems = deduplicatedItems;
            const duplicatesRemoved =
                (apiRes.data.items?.length || 0) - baseItems.length;
            console.log(
                `✅ Deduplication: ${apiRes.data.items?.length || 0} items -> ${
                    baseItems.length
                } items (${duplicatesRemoved} duplikat dihapus)`
            );

            if (duplicatesRemoved > 0) {
                console.warn(
                    `⚠️ Peringatan: ${duplicatesRemoved} item duplikat ditemukan dan dihapus. Periksa database untuk data duplikat.`
                );
            }

            const baseSummary = apiRes.data.summary || {
                by_status: {},
                grand_total: 0,
            };

            // Recalculate summary berdasarkan items yang sudah difilter
            const recalculatedSummary = baseItems.reduce(
                (acc, item) => {
                    const status = item.status || "-";
                    const totalbiaya = Number(item.totalbiaya || 0);
                    if (!acc.by_status[status]) {
                        acc.by_status[status] = { count: 0, total: 0 };
                    }
                    acc.by_status[status].count += 1;
                    acc.by_status[status].total += totalbiaya;
                    acc.grand_total += totalbiaya;
                    return acc;
                },
                { by_status: {}, grand_total: 0 }
            );

            console.log(
                "loadData: Setelah filter, baseItems count:",
                baseItems.length
            );
            console.log("loadData: Recalculated summary:", recalculatedSummary);
            console.log(
                "loadData: Sample items totalbiaya:",
                baseItems.slice(0, 3).map((i) => ({
                    nm: i.nm_perawatan,
                    status: i.status,
                    totalbiaya: i.totalbiaya,
                }))
            );

            // DEBUG: Log item obat yang diterima dari backend
            const obatItemsFromBackend = baseItems.filter(
                (item) => item.status === "Obat"
            );
            console.log("🔍 DEBUG: Item obat dari backend", {
                total_obat_items: obatItemsFromBackend.length,
                items: obatItemsFromBackend.map((item) => ({
                    no: item.no,
                    kode_brng: item.kode_brng,
                    nm_perawatan: item.nm_perawatan,
                    no_faktur: item.no_faktur,
                    tgl_byr: item.tgl_byr,
                    jam: item.jam,
                    jumlah: item.jumlah,
                    totalbiaya: item.totalbiaya,
                    source: item.source,
                })),
            });

            // Set items - useEffect akan menghitung ulang summary secara otomatis
            setItems(baseItems);

            console.log("loadData: Data berhasil dimuat:", {
                itemsCount: baseItems.length,
                expectedGrandTotal: round(recalculatedSummary.grand_total, 2),
            });

            // Refresh status permintaan jika tab aktif (setelah billing data ter-load)
            // Note: useEffect akan handle refresh otomatis saat items.length berubah

            // PERBAIKAN: Nonaktifkan buildObatPreview karena mengambil data dari resep yang belum diserahkan
            // Data obat sudah diambil di backend dari detail_pemberian_obat yang berarti sudah diserahkan
            // Item obat hanya akan tampil setelah diserahkan (setelah masuk ke detail_pemberian_obat)
            //
            // Catatan: buildObatPreview mengambil dari API resep yang bisa termasuk resep belum diserahkan,
            // sehingga menyebabkan item obat muncul padahal belum diserahkan.
            //
            // const isPreviewMode = baseItems.length === 0 || (baseItems.length > 0 && baseItems[0]?.source === "preview");
            // if (isPreviewMode) {
            //     ... buildObatPreview code disabled ...
            // }
        } catch (e) {
            setError(
                e?.response?.data?.message || e?.message || "Gagal memuat data"
            );
        } finally {
            setLoading(false);
        }
    };

    const notify = (msg) => {
        if (!msg) return;
        try {
            toast.success(String(msg));
        } catch (e) {
            alert(String(msg));
        }
    };
    const notifyError = (msg) => {
        if (!msg) return;
        try {
            toast.error(String(msg));
        } catch (e) {
            alert(String(msg));
        }
    };
    const notifyWarning = (msg) => {
        if (!msg) return;
        try {
            toast.warning(String(msg));
        } catch (e) {
            alert(String(msg));
        }
    };
    const notifyInfo = (msg) => {
        if (!msg) return;
        try {
            toast.info(String(msg));
        } catch (e) {
            alert(String(msg));
        }
    };

    // Validasi ringan sebelum simpan item billing + cek keberadaan nota_jalan
    const validateBeforeSave = async (payload) => {
        if (!payload?.no_rawat) {
            notifyWarning("No. Rawat wajib diisi sebelum simpan.");
            return false;
        }
        if (!payload?.status) {
            notifyWarning("Kategori (Status) wajib dipilih.");
            return false;
        }
        try {
            const existsUrl = buildUrl("/api/akutansi/nota-jalan/exists", {
                no_rawat: payload.no_rawat,
            });
            const existsRes = await axios.get(existsUrl);
            const count = Number(existsRes?.data?.count || 0);
            if (count > 0) {
                // Ikuti perilaku Java: jika nota sudah ada, blokir simpan baru
                notifyWarning(
                    "Tagihan sudah pernah disimpan (nota_jalan sudah ada). Tidak bisa menyimpan ulang."
                );
                return false;
            }
        } catch (e) {
            // Jika gagal cek, tetap lanjut tapi beri peringatan
            console.warn("Gagal cek nota_jalan exists:", e?.message);
        }
        return true;
    };

    // Validasi sebelum melakukan snapshot (Posting Billing dari tab Pembayaran)
    const validateBeforeSnapshot = async ({
        selectedCategories,
        bayar,
        totalWithPpn,
        akunBayar,
        akunPiutang,
        piutang,
    }) => {
        if (!noRawat) {
            notifyWarning(
                "Masukkan No. Rawat terlebih dahulu sebelum menyimpan."
            );
            return false;
        }
        if (
            !Array.isArray(selectedCategories) ||
            selectedCategories.length === 0
        ) {
            notifyWarning(
                "Pilih minimal satu komponen biaya sebelum menyimpan."
            );
            return false;
        }
        // Validasi pembayaran & piutang dasar
        const nominalBayar = Number(bayar) || 0;
        const nominalPiutang = Number(piutang) || 0;
        const totalTagihan = Number(totalWithPpn) || 0;

        // Hitung uang kembali dan piutang yang seharusnya
        const uangKembaliHitung =
            nominalBayar > totalTagihan ? nominalBayar - totalTagihan : 0;
        const piutangHitung =
            nominalBayar < totalTagihan ? totalTagihan - nominalBayar : 0;

        // Validasi: jika ada piutang, nominal piutang harus sesuai dengan perhitungan
        if (
            nominalPiutang > 0 &&
            Math.abs(nominalPiutang - piutangHitung) > 0.01
        ) {
            notifyWarning(
                `Piutang yang diisi (${currency.format(
                    nominalPiutang
                )}) tidak sesuai dengan perhitungan (${currency.format(
                    piutangHitung
                )}).`
            );
            return false;
        }

        // Validasi: jika ada uang kembali, harus sesuai dengan perhitungan
        if (uangKembaliHitung > 0 && nominalPiutang > 0) {
            notifyWarning(
                "Tidak boleh ada uang kembali dan piutang sekaligus. Periksa kembali nominal bayar."
            );
            return false;
        }

        // Izinkan uang kembali; nominal akan dinormalisasi saat snapshot
        if ((Number(bayar) || 0) > 0 && !akunBayar) {
            notifyWarning(
                "Akun Bayar wajib dipilih ketika nominal bayar > 0 (Kas/Bank)."
            );
            return false;
        }
        if ((Number(piutang) || 0) > 0 && !akunPiutang) {
            notifyWarning(
                "Akun Piutang wajib dipilih ketika ada sisa piutang."
            );
            return false;
        }
        // Akun pendapatan tidak perlu dipilih di UI. Sistem akan memilih otomatis dari master rekening (rekening & subrekening)
        // berdasarkan status layanan (Ranap/Ralan → prefix 41/42) atau fallback prefix 43 jika tidak tersedia.
        try {
            const existsUrl = buildUrl("/api/akutansi/nota-jalan/exists", {
                no_rawat: noRawat,
            });
            const existsRes = await axios.get(existsUrl);
            const count = Number(existsRes?.data?.count || 0);
            if (count > 0) {
                notifyWarning(
                    "Tagihan sudah pernah disimpan (nota_jalan sudah ada). Snapshot tidak diizinkan."
                );
                return false;
            }
        } catch (e) {
            console.warn("Gagal cek nota_jalan exists:", e?.message);
        }
        return true;
    };

    /**
     * Bangun item preview "Obat" dari data resep untuk no_rawat ini.
     * Mengacu pada DlgBilingRalan.sqlpscariobat: agregasi per obat (kode_brng) dengan jumlah, tambahan (embalase+tuslah), dan total biaya.
     * Sumber data: GET /api/resep/rawat?no_rawat={no_rawat} -> daftar resep; lalu GET /api/resep/{no_resep} untuk detail biaya.
     */
    const buildObatPreview = async (rawatNo) => {
        // Penting: jangan gunakan encodeURIComponent untuk path param yang mengandung '/'
        // karena Laravel akan menganggap %2F tidak valid dan bisa memetakan route secara keliru.
        // Gunakan encodeURI agar '/' tetap utuh.
        const listRes = await axios.get(
            `/api/resep/rawat?no_rawat=${encodeURIComponent(rawatNo)}`
        );
        const resepList = listRes?.data?.data || [];
        if (!Array.isArray(resepList) || resepList.length === 0)
            return { extraItems: [], extraSummary: { total: 0, count: 0 } };

        // Ambil detail tiap resep secara paralel lalu agregasi per kode_brng
        const detailPromises = resepList.map((r) =>
            axios
                .get(`/api/resep/${encodeURI(r.no_resep)}`)
                .then((res) => ({ ok: true, data: res?.data?.data, resep: r }))
                .catch((err) => ({ ok: false, error: err, resep: r }))
        );
        const details = await Promise.all(detailPromises);

        // Map agregasi: key = kode_brng
        const agg = new Map();
        let totalObatAll = 0;
        let countItems = 0;

        const addDetail = (d, resepMeta) => {
            // d: { kode_brng, nama_brng, jml, tarif, subtotal, embalase, tuslah }
            const kode = d.kode_brng;
            if (!kode) return;
            const prev = agg.get(kode) || {
                kode_brng: kode,
                nama_brng: d.nama_brng || kode,
                tarif: Number(d.tarif || 0),
                jml: 0,
                tambahan: 0, // embalase + tuslah
                tgl_byr: resepMeta?.tgl_peresepan || "",
                no_resep_concat: new Set(),
            };
            prev.jml += Number(d.jml || 0);
            // Tambahan mengikuti DlgBilingRalan: sum(embalase+tuslah)
            const embTus = Number(d.embalase || 0) + Number(d.tuslah || 0);
            prev.tambahan += embTus;
            prev.no_resep_concat.add(resepMeta?.no_resep);
            // Tarif: jika sebelumnya 0 dan sekarang ada, gunakan yang terbaru
            if (!prev.tarif && d.tarif) prev.tarif = Number(d.tarif);
            agg.set(kode, prev);
        };

        for (const it of details) {
            if (!it.ok || !it.data) continue;
            const resepMeta = it.resep;
            const nonRacikan = Array.isArray(it.data.detail_obat)
                ? it.data.detail_obat
                : [];
            nonRacikan.forEach((d) => addDetail(d, resepMeta));
            const racikanGroups = Array.isArray(it.data.racikan)
                ? it.data.racikan
                : [];
            racikanGroups.forEach((g) => {
                const arr = Array.isArray(g.details) ? g.details : [];
                arr.forEach((d) => addDetail(d, resepMeta));
            });
        }

        const extraItems = [];
        for (const [, val] of agg.entries()) {
            const total = Math.round(
                Number(val.tarif || 0) * Number(val.jml || 0) +
                    Number(val.tambahan || 0)
            );
            totalObatAll += total;
            countItems += 1;
            // Gabungkan nomor resep untuk kolom keterangan (no)
            const noKeterangan = Array.from(val.no_resep_concat || []).join(
                ", "
            );
            extraItems.push({
                noindex: `preview-obat-${val.kode_brng}`,
                source: "preview",
                no_rawat: rawatNo,
                tgl_byr:
                    normalizeDateForInput(val.tgl_byr) || todayDateString(),
                no: noKeterangan || "-",
                nm_perawatan: val.nama_brng || val.kode_brng,
                pemisah: "-",
                biaya: Number(val.tarif || 0),
                jumlah: Number(val.jml || 0),
                tambahan: Number(val.tambahan || 0),
                totalbiaya: total,
                status: "Obat",
            });
        }

        return {
            extraItems,
            extraSummary: { total: totalObatAll, count: countItems },
        };
    };

    const loadRequests = async () => {
        if (!noRawat) return;
        setLoadingRequests(true);
        try {
            // Ambil permintaan lab, radiologi, dan resep
            // Backend sudah memfilter berdasarkan billing/preview (hanya menampilkan yang sesuai tagihan nota)
            const [labRes, radRes, resepRes] = await Promise.all([
                axios.get(`/api/permintaan-lab/rawat/${encodeURI(noRawat)}`),
                axios.get(
                    `/api/permintaan-radiologi/rawat/${encodeURI(noRawat)}`
                ),
                axios.get(
                    `/api/resep/rawat?no_rawat=${encodeURIComponent(noRawat)}`
                ),
            ]);
            setLabRequests(labRes.data?.data || []);
            setRadRequests(radRes.data?.data || []);
            setResepRequests(resepRes.data?.data || []);
        } catch (e) {
            console.warn("Gagal memuat status permintaan:", e?.message);
        } finally {
            setLoadingRequests(false);
        }
    };

    const handleCreate = async (payload) => {
        // Preflight validation (mirroring sebagian BtnSimpanActionPerformed)
        const ok = await validateBeforeSave(payload);
        if (!ok) return;

        // 1) Simpan item billing terlebih dahulu
        await axios.post("/api/akutansi/billing", payload);
        notify("Item billing tersimpan");

        // 2) Buat nota_jalan jika belum ada, nomor otomatis per tanggal
        let noNota = invoice?.nota?.no_nota || null;
        try {
            const createNotaRes = await axios.post("/api/akutansi/nota-jalan", {
                no_rawat: payload.no_rawat,
                tanggal: payload.tgl_byr,
                jam:
                    nowDateTimeString().split(" ")[1] ||
                    new Date().toTimeString().slice(0, 8),
            });
            noNota = createNotaRes?.data?.no_nota || noNota;
        } catch (e) {
            const errorMsg =
                e?.response?.data?.message ||
                e?.message ||
                "Gagal membuat nota_jalan";
            console.error(
                "Gagal membuat nota_jalan:",
                errorMsg,
                e?.response?.data
            );
            notifyError(`Gagal membuat nota_jalan: ${errorMsg}`);
            // Jangan lanjut jika gagal membuat nota_jalan
            return;
        }

        // 3) Stage jurnal dari total billing pasien ini
        let stagingSuccess = false;
        try {
            const stageRes = await axios.post(
                "/api/akutansi/jurnal/stage-from-billing",
                {
                    no_rawat: payload.no_rawat,
                }
            );
            stagingSuccess = true;
        } catch (e) {
            const errorMsg =
                e?.response?.data?.message ||
                "Gagal menyiapkan staging jurnal. Pastikan mapping rekening debet/kredit di config/akutansi.php.";
            notifyError(errorMsg);
            console.error("Error staging jurnal:", e?.response?.data);
            // Jangan lanjut ke posting jika staging gagal
            return;
        }

        // 4) Posting jurnal (balik) dengan no_bukti = no_nota (jika ada)
        // Hanya posting jika staging berhasil
        if (stagingSuccess) {
            try {
                const bukti = noNota || `BILL-${payload.no_rawat}`;
                const postRes = await axios.post(
                    "/api/akutansi/jurnal/post-staging",
                    {
                        no_bukti: bukti,
                        jenis: "U",
                        keterangan: `Posting otomatis Billing ${payload.no_rawat}`,
                    }
                );
                if (postRes?.data?.no_jurnal) {
                    notify(
                        `Posting jurnal berhasil: ${postRes.data.no_jurnal}`
                    );
                }
            } catch (e) {
                const errorMsg =
                    e?.response?.data?.message ||
                    "Posting jurnal gagal. Periksa keseimbangan debet/kredit atau data staging.";
                notifyError(errorMsg);
                console.error("Error posting jurnal:", e?.response?.data);
                // Log detail error untuk debugging
                if (e?.response?.status === 400) {
                    console.error("Detail error 400:", {
                        status: e?.response?.status,
                        data: e?.response?.data,
                        message: e?.response?.data?.message,
                    });
                }
            }
        }

        // Refresh UI
        setShowCreate(false);
        await loadData();

        // Refresh status permintaan jika tab aktif
        if (activeTab === "permintaan") {
            await loadRequests();
        }
    };

    // Flow: Snapshot billing dari pilihan kategori, buat nota_jalan, lalu stage & post jurnal
    const handleSnapshot = async ({
        selectedCategories,
        ppnPercent,
        bayar,
        subtotal,
        totalWithPpn,
        kembali,
        piutang,
        akunBayar,
        akunPiutang,
        setBayar, // Tambahkan setBayar untuk menyesuaikan nominal bayar setelah snapshot
        setPiutang,
    }) => {
        const ok = await validateBeforeSnapshot({
            selectedCategories,
            bayar,
            totalWithPpn,
            akunBayar,
            akunPiutang,
            piutang,
        });
        if (!ok) return;

        const totalNominal = Number(totalWithPpn) || 0;
        const bayarRaw = Number(bayar) || 0;
        const bayarNormalized = Math.min(bayarRaw, totalNominal);
        const piutangNormalized = Math.max(totalNominal - bayarNormalized, 0);
        const kembaliNormalized = Math.max(bayarRaw - totalNominal, 0);

        // Bangun objek toggles: label -> boolean
        const toggles = {};
        for (const label of selectedCategories) {
            toggles[label] = true;
        }

        // 1) Snapshot ke tabel billing berdasarkan kategori yang dipilih
        // Terjemahkan kategori terpilih menjadi daftar status yang diizinkan
        const allowedStatus = {};
        CATEGORY_MAP.forEach((cat) => {
            if (selectedCategories.includes(cat.label)) {
                cat.keys.forEach((k) => (allowedStatus[k] = true));
            }
        });

        // Filter items yang sedang ditampilkan di halaman Billing sesuai status pilih
        // Pastikan tidak ada duplikasi berdasarkan kombinasi no + status
        const seenItems = new Set();
        const selectedItems = (items || [])
            .filter((it) => {
                // Filter berdasarkan status yang diizinkan
                if (!allowedStatus[it?.status ?? "-"]) {
                    return false;
                }
                // Cegah duplikasi berdasarkan kombinasi no + status
                const key = `${it.no || ""}_${it.status || "-"}`;
                if (seenItems.has(key)) {
                    return false;
                }
                seenItems.add(key);
                return true;
            })
            .map((it) => ({
                no_rawat: noRawat,
                tgl_byr: normalizeDateForInput(it.tgl_byr) || todayDateString(),
                no: it.no || null,
                nm_perawatan: it.nm_perawatan || (it.no ?? "Item"),
                pemisah: it.pemisah || "-",
                biaya: Number(it.biaya || 0),
                jumlah: Number(it.jumlah || 1),
                tambahan: Number(it.tambahan || 0),
                status: it.status || "-",
            }));

        // Hitung subtotal dari selectedItems untuk validasi
        const calculatedSubtotal = selectedItems.reduce((sum, it) => {
            const total =
                Number(it.biaya || 0) * Number(it.jumlah || 1) +
                Number(it.tambahan || 0);
            return sum + total;
        }, 0);

        try {
            const snapRes = await axios.post(
                "/api/akutansi/nota-jalan/snapshot",
                {
                    no_rawat: noRawat,
                    toggles,
                    selected_statuses: Object.keys(allowedStatus),
                    items: selectedItems,
                }
            );
            const inserted = Number(snapRes?.data?.inserted || 0);
            const gt = Number(snapRes?.data?.grand_total || 0);
            notify(
                `Snapshot billing tersimpan: ${inserted} item, total ${currency.format(
                    gt
                )}.`
            );

            // PERBAIKAN: Reload data dari backend setelah snapshot untuk mendapatkan total yang benar
            // Ini memastikan bahwa frontend menggunakan total yang sama dengan backend
            await loadData();

            // PERBAIKAN: Jika total snapshot berbeda dengan perhitungan UI, peringatkan user
            // dan sesuaikan nominal bayar jika diperlukan
            if (Math.abs(gt - calculatedSubtotal) > 0.01) {
                const difference = gt - calculatedSubtotal;
                console.warn("Detail perbedaan total snapshot vs UI:", {
                    snapshotTotal: gt,
                    uiTotal: calculatedSubtotal,
                    difference: difference,
                    selectedItemsCount: selectedItems.length,
                });

                // Jika total snapshot lebih kecil dari UI, dan bayar sudah diisi sesuai UI total,
                // sesuaikan bayar ke total snapshot untuk menghindari error validasi
                if (difference < 0 && bayarNormalized > 0) {
                    const newTotalWithPpn = Math.round(
                        gt * (1 + (Number(ppnPercent) || 0) / 100)
                    );
                    if (
                        Math.abs(
                            bayarNormalized -
                                calculatedSubtotal *
                                    (1 + (Number(ppnPercent) || 0) / 100)
                        ) < 0.01
                    ) {
                        // User memasukkan bayar sesuai dengan total UI lama, sesuaikan ke total baru
                        if (typeof setBayar === "function") setBayar(newTotalWithPpn);
                        if (typeof setPiutang === "function") setPiutang(0);
                        notifyInfo(
                            `Total tagihan berubah setelah snapshot (${currency.format(
                                calculatedSubtotal
                            )} -> ${currency.format(
                                gt
                            )}). Nominal bayar telah disesuaikan.`
                        );
                    }
                }
            }
        } catch (e) {
            notifyError(
                e?.response?.data?.message ||
                    "Snapshot billing gagal. Pastikan data sumber tersedia dan belum ada nota_jalan."
            );
            return;
        }

        // 2) Buat nota_jalan baru
        let noNota = null;
        try {
            const createNotaRes = await axios.post("/api/akutansi/nota-jalan", {
                no_rawat: noRawat,
                tanggal: todayDateString(),
                jam:
                    nowDateTimeString().split(" ")[1] ||
                    new Date().toTimeString().slice(0, 8),
            });
            noNota = createNotaRes?.data?.no_nota || null;
            if (noNota) notify(`Nota jalan dibuat: ${noNota}`);
        } catch (e) {
            const errorMsg =
                e?.response?.data?.message ||
                e?.message ||
                "Gagal membuat nota_jalan setelah snapshot";
            console.error(
                "Gagal membuat nota_jalan setelah snapshot:",
                errorMsg,
                e?.response?.data
            );
            notifyError(
                `Gagal membuat nota_jalan: ${errorMsg}. Anda dapat membuatnya manual dari menu terkait.`
            );
            // Jangan lanjut jika gagal membuat nota_jalan
            return;
        }

        // 3) Stage jurnal dari total billing dengan pemecahan debit & PPN
        let stagingSuccess = false;
        try {
            const stageRes = await axios.post(
                "/api/akutansi/jurnal/stage-from-billing",
                {
                    no_rawat: noRawat,
                    akun_bayar: akunBayar || null,
                    akun_piutang: akunPiutang || null,
                    bayar: bayarNormalized,
                    piutang: piutangNormalized,
                    ppn_percent: Number(ppnPercent) || 0,
                    // Akun Pendapatan (kredit) tidak dikirim dari UI; backend akan memilih otomatis dari master rekening
                }
            );
            stagingSuccess = true;
        } catch (e) {
            const errorMsg =
                e?.response?.data?.message ||
                "Gagal menyiapkan staging jurnal. Pastikan mapping rekening debet/kredit di config/akutansi.php.";
            notifyError(errorMsg);
            console.error("Error staging jurnal:", e?.response?.data);
            // Jangan lanjut ke posting jika staging gagal
            return;
        }

        // 4) Posting jurnal dengan no_bukti = no_nota (jika ada)
        // Hanya posting jika staging berhasil
        if (stagingSuccess) {
            try {
                const bukti = noNota || `BILL-${noRawat}`;
                const postRes = await axios.post(
                    "/api/akutansi/jurnal/post-staging",
                    {
                        no_bukti: bukti,
                        jenis: "U",
                        keterangan: `Posting otomatis Billing ${noRawat}`,
                    }
                );
                if (postRes?.data?.no_jurnal) {
                    notify(
                        `Posting jurnal berhasil: ${postRes.data.no_jurnal}`
                    );

                    // Update reg_periksa.status_bayar menjadi "Sudah Bayar" setelah posting jurnal berhasil
                    try {
                        await axios.put(
                            `/api/reg-periksa/${encodeURIComponent(
                                noRawat
                            )}/status-bayar`,
                            {
                                status_bayar: "Sudah Bayar",
                            }
                        );
                    } catch (updateError) {
                        console.warn(
                            "Gagal update status_bayar di reg_periksa:",
                            updateError?.response?.data
                        );
                        // Jangan gagalkan proses jika update status_bayar gagal
                    }
                }
            } catch (e) {
                const errorMsg =
                    e?.response?.data?.message ||
                    "Posting jurnal gagal. Periksa keseimbangan debet/kredit atau data staging.";
                notifyError(errorMsg);
                console.error("Error posting jurnal:", e?.response?.data);
                // Log detail error untuk debugging
                if (e?.response?.status === 400) {
                    console.error("Detail error 400:", {
                        status: e?.response?.status,
                        data: e?.response?.data,
                        message: e?.response?.data?.message,
                    });
                }
            }
        }

        // 5) Pesan tambahan sesuai kondisi pembayaran (placeholder untuk aturan Java)
        if (piutangNormalized > 0) {
            notifyInfo(
                `Terdapat piutang sebesar ${currency.format(
                    piutangNormalized
                )}. Pastikan penagihan/rekonsiliasi dilakukan.`
            );
        }
        if (kembaliNormalized > 0) {
            notifyWarning(
                `Uang kembali sebesar ${currency.format(
                    kembaliNormalized
                )}. Catatan: fitur multi-cara bayar belum didukung di UI ini, dan pada Java jika cara bayar > 1 maka kembali wajib 0.`
            );
        }

        if (typeof setBayar === "function") setBayar(bayarNormalized);
        if (typeof setPiutang === "function") setPiutang(piutangNormalized);

        // Refresh UI
        await loadData();

        // Refresh status permintaan jika tab aktif
        if (activeTab === "permintaan") {
            await loadRequests();
        }
    };

    const handleUpdate = async (noindex, payload) => {
        await axios.put(`/api/akutansi/billing/${noindex}`, payload);
        notify("Item billing diperbarui");
        setEditItem(null);
        await loadData();

        // Refresh status permintaan jika tab aktif
        if (activeTab === "permintaan") {
            await loadRequests();
        }
    };

    const handleDelete = async (row) => {
        if (row?.source !== "billing" || !row?.noindex) {
            notifyInfo(
                "Item ini berasal dari preview otomatis (belum ada snapshot billing). Silakan lakukan Posting Billing di kasir untuk membuat snapshot sebelum bisa edit/hapus di sini."
            );
            return;
        }
        if (!confirm(`Hapus item "${row.nm_perawatan}"?`)) return;
        await axios.delete(`/api/akutansi/billing/${row.noindex}`);
        notify("Item billing dihapus");
        await loadData();

        // Refresh status permintaan jika tab aktif
        if (activeTab === "permintaan") {
            await loadRequests();
        }
    };

    const handleRowClick = (row) => {
        setSelectedRow(row);
    };

    // Recalculate summary setiap kali items berubah untuk memastikan Grand Total selalu akurat
    React.useEffect(() => {
        if (items.length === 0) {
            setSummary({
                by_status: {},
                grand_total: 0,
            });
            return;
        }

        const recalculated = items.reduce(
            (acc, item) => {
                const status = item.status || "-";
                const totalbiaya = Number(item.totalbiaya || 0);
                if (!acc.by_status[status]) {
                    acc.by_status[status] = { count: 0, total: 0 };
                }
                acc.by_status[status].count += 1;
                acc.by_status[status].total += totalbiaya;
                acc.grand_total += totalbiaya;
                return acc;
            },
            { by_status: {}, grand_total: 0 }
        );

        console.log("useEffect summary: Recalculated dari items:", {
            itemsCount: items.length,
            grandTotal: recalculated.grand_total,
            byStatus: recalculated.by_status,
        });

        setSummary({
            by_status: recalculated.by_status,
            grand_total: round(recalculated.grand_total, 2),
        });
    }, [items]);

    React.useEffect(() => {
        if (initialNoRawat) {
            // Normalisasi no_rawat dari props (decode jika ada encoding)
            const normalized = decodeURIComponent(initialNoRawat || "").trim();
            setNoRawat(normalized);
        }
    }, [initialNoRawat]);

    // Load data otomatis saat noRawat berubah atau saat component mount dengan initialNoRawat
    // Catatan: loadData tidak dimasukkan ke dependency untuk menghindari infinite loop
    // karena loadData menggunakan q dan statusFilter yang bisa berubah
    React.useEffect(() => {
        if (noRawat && noRawat.trim() !== "") {
            console.log(
                "useEffect: noRawat berubah, memanggil loadData untuk:",
                noRawat
            );
            loadData();
        } else {
            console.log("useEffect: noRawat kosong atau tidak valid");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noRawat]);

    // Refresh status permintaan setiap kali tab dibuka, noRawat berubah, atau items billing berubah
    React.useEffect(() => {
        if (activeTab === "permintaan" && noRawat) {
            // Refresh setiap kali tab dibuka, noRawat berubah, atau items billing berubah
            loadRequests();
        }
    }, [activeTab, noRawat, items.length]); // Trigger saat tab/noRawat/items berubah

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 px-4 sm:px-6 lg:px-12 xl:px-16 py-6 md:py-8 space-y-6"
        >
            {/* Header */}
            <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-6 md:p-8"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <motion.div
                            className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Receipt className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                            <motion.h1
                                className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                Billing Pasien
                            </motion.h1>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-stretch gap-3">
                        <div className="relative">
                            <input
                                placeholder="Masukkan No. Rawat (contoh: 2024/11/22/0001)"
                                value={noRawat}
                                onChange={(e) => setNoRawat(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") loadData();
                                }}
                                className="w-full md:w-[420px] rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2.5 pl-10 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                        {dataKasirRouteName && (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    href={route(dataKasirRouteName)}
                                    className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 text-white font-semibold text-sm"
                                >
                                    <CreditCard className="w-4 h-4" />
                                    Data Kasir
                                </Link>
                            </motion.div>
                        )}
                        <motion.button
                            onClick={loadData}
                            disabled={loading}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Memuat…
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="w-4 h-4" />
                                    Muat Data
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>
                {invoice && (
                    <motion.div
                        className="relative mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <motion.div
                            className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200/50 dark:border-blue-800/50 p-4 backdrop-blur-sm"
                            variants={cardHoverVariants}
                            initial="rest"
                            whileHover="hover"
                        >
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                                Kunjungan
                            </p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white font-mono">
                                {invoice.visit?.no_rawat}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {invoice.visit?.tgl_registrasi}
                            </p>
                        </motion.div>
                        <motion.div
                            className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-50/80 to-purple-50/80 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200/50 dark:border-indigo-800/50 p-4 backdrop-blur-sm"
                            variants={cardHoverVariants}
                            initial="rest"
                            whileHover="hover"
                        >
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                                Pasien
                            </p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                                {invoice.visit?.pasien}{" "}
                                <span className="text-gray-500 font-normal">
                                    ({invoice.visit?.no_rkm_medis})
                                </span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Dokter: {invoice.visit?.dokter} • Poli:{" "}
                                {invoice.visit?.poli}
                            </p>
                        </motion.div>
                        <motion.div
                            className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200/50 dark:border-purple-800/50 p-4 backdrop-blur-sm"
                            variants={cardHoverVariants}
                            initial="rest"
                            whileHover="hover"
                        >
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                                Penjamin
                            </p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                                {invoice.visit?.penjamin}
                            </p>
                            {invoice.nota && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Nota {invoice.nota?.jenis}:{" "}
                                    {invoice.nota?.no_nota} •{" "}
                                    {invoice.nota?.tanggal} {invoice.nota?.jam}
                                </p>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>

            {/* Tabs */}
            <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-6"
            >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                <div className="border-b border-gray-200/50 dark:border-gray-700/50 mb-6">
                    <div className="flex items-center gap-6">
                        <motion.button
                            className={`relative px-4 pb-3 text-sm font-semibold transition-colors ${
                                activeTab === "tagihan"
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                            }`}
                            onClick={() => setActiveTab("tagihan")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Data Tagihan
                            {activeTab === "tagihan" && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"
                                    layoutId="activeTab"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </motion.button>
                        <motion.button
                            className={`relative px-4 pb-3 text-sm font-semibold transition-colors ${
                                activeTab === "pembayaran"
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                            }`}
                            onClick={() => setActiveTab("pembayaran")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Pembayaran
                            {activeTab === "pembayaran" && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"
                                    layoutId="activeTab"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </motion.button>
                        <motion.button
                            className={`relative px-4 pb-3 text-sm font-semibold transition-colors ${
                                activeTab === "permintaan"
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                            }`}
                            onClick={() => setActiveTab("permintaan")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Status Permintaan
                            {activeTab === "permintaan" && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"
                                    layoutId="activeTab"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </motion.button>
                    </div>
                </div>

                {activeTab === "tagihan" && (
                    <div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <motion.button
                                    onClick={() => setShowCreate(true)}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Plus className="w-4 h-4" />
                                    Tambah Item
                                </motion.button>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) =>
                                            setStatusFilter(e.target.value)
                                        }
                                        className="rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                                    >
                                        <option value="">Semua Kategori</option>
                                        {statusOptions.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="relative">
                                        <input
                                            value={q}
                                            onChange={(e) =>
                                                setQ(e.target.value)
                                            }
                                            placeholder="Cari item…"
                                            className="rounded-lg border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-3 py-2 pl-9 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                                        />
                                        <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                                    </div>
                                    <motion.button
                                        onClick={loadData}
                                        className="px-4 py-2 rounded-lg bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Terapkan
                                    </motion.button>
                                </div>
                            </div>
                            <motion.div
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-indigo-50/80 to-purple-50/80 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200/50 dark:border-indigo-800/50 backdrop-blur-sm"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <Wallet className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Grand Total:
                                </span>
                                <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    {currency.format(summary.grand_total || 0)}
                                </span>
                            </motion.div>
                        </div>
                        {/* Status proses preview obat / pesan error saja (tanpa pesan info panjang) */}
                        {items.length > 0 &&
                            items[0]?.source === "preview" &&
                            (mergingObatPreview || mergeError) && (
                                <motion.div
                                    className="mt-4 rounded-lg bg-gradient-to-r from-amber-50/50 to-yellow-50/50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200/50 dark:border-amber-800/50 p-4 backdrop-blur-sm"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {mergingObatPreview && (
                                        <div className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-200">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Memuat preview obat dari resep…
                                        </div>
                                    )}
                                    {mergeError && (
                                        <div className="flex items-center gap-2 text-sm text-red-700 dark:text-red-300">
                                            <AlertCircle className="w-4 h-4" />
                                            {mergeError}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                    </div>
                )}

                {activeTab === "pembayaran" && (
                    <PembayaranTab
                        summary={summary}
                        categoryMap={CATEGORY_MAP}
                        noRawat={noRawat}
                        invoice={invoice}
                        onSave={({
                            selectedCategories,
                            ppnPercent,
                            bayar,
                            subtotal,
                            totalWithPpn,
                            kembali,
                            piutang,
                            akunBayar,
                            akunPiutang,
                            setBayar, // Tambahkan setBayar dari PembayaranTab
                            setPiutang,
                        }) =>
                            handleSnapshot({
                                selectedCategories,
                                ppnPercent,
                                bayar,
                                subtotal,
                                totalWithPpn,
                                kembali,
                                piutang,
                                akunBayar,
                                akunPiutang,
                                setBayar, // Tambahkan setBayar untuk menyesuaikan nominal bayar setelah snapshot
                                setPiutang,
                            })
                        }
                    />
                )}

                {activeTab === "permintaan" && (
                    <StatusPermintaanTab
                        noRawat={noRawat}
                        lab={labRequests}
                        rad={radRequests}
                        resep={resepRequests}
                        loading={loadingRequests}
                        onRefresh={() => loadRequests()}
                    />
                )}
            </motion.div>

            {/* Table - hanya tampil di Tab Data Tagihan */}
            {activeTab === "tagihan" && (
                <motion.div
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 overflow-x-auto"
                >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Tanggal
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Tagihan/Tindakan/Terapi
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Biaya
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Jml
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Tambahan
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center">
                                        <motion.div
                                            className="flex flex-col items-center justify-center gap-3"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Memuat data...
                                            </span>
                                        </motion.div>
                                    </td>
                                </tr>
                            ) : items.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12">
                                        <motion.div
                                            className="flex flex-col items-center justify-center gap-3"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <Database className="w-12 h-12 text-gray-400" />
                                            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                Tidak ada item billing untuk no.
                                                rawat ini.
                                            </span>
                                        </motion.div>
                                    </td>
                                </tr>
                            ) : (
                                <AnimatePresence>
                                    {(() => {
                                        const normalizedNoRawat =
                                            decodeURIComponent(
                                                noRawat || ""
                                            ).trim();
                                        const visibleItems = items.filter(
                                            (row) => {
                                                const rowNoRawat = (
                                                    row.no_rawat || ""
                                                ).trim();
                                                if (
                                                    rowNoRawat !==
                                                    normalizedNoRawat
                                                ) {
                                                    console.warn(
                                                        "Item dengan no_rawat tidak sesuai diabaikan di tabel:",
                                                        {
                                                            expected:
                                                                normalizedNoRawat,
                                                            actual: rowNoRawat,
                                                            item: row,
                                                        }
                                                    );
                                                    return false;
                                                }
                                                return true;
                                            }
                                        );

                                        const groups = [];
                                        const usedIndexes = new Set();

                                        CATEGORY_MAP.forEach((cat) => {
                                            const rows = [];
                                            visibleItems.forEach((row, idx) => {
                                                if (
                                                    cat.keys.includes(
                                                        row.status
                                                    )
                                                ) {
                                                    rows.push({
                                                        row,
                                                        idx,
                                                    });
                                                    usedIndexes.add(idx);
                                                }
                                            });
                                            if (rows.length > 0) {
                                                groups.push({
                                                    label: cat.label,
                                                    rows,
                                                });
                                            }
                                        });

                                        const otherRows = [];
                                        visibleItems.forEach((row, idx) => {
                                            if (!usedIndexes.has(idx)) {
                                                otherRows.push({ row, idx });
                                            }
                                        });
                                        if (otherRows.length > 0) {
                                            groups.push({
                                                label: "Lain-lain",
                                                rows: otherRows,
                                            });
                                        }

                                        groups.sort((a, b) => {
                                            const aLabel = String(
                                                a.label || "",
                                            ).toLocaleLowerCase();
                                            const bLabel = String(
                                                b.label || "",
                                            ).toLocaleLowerCase();

                                            if (aLabel === "lain-lain") {
                                                if (bLabel === "lain-lain") {
                                                    return 0;
                                                }

                                                return 1;
                                            }

                                            if (bLabel === "lain-lain") {
                                                return -1;
                                            }

                                            return aLabel.localeCompare(bLabel);
                                        });

                                        return groups.flatMap((group, gIndex) => {
                                            const headerRow = (
                                                <tr
                                                    key={`group-${group.label}-${gIndex}`}
                                                    className="bg-gray-50/80 dark:bg-gray-900/60 border-t border-gray-200/60 dark:border-gray-700/60"
                                                >
                                                    <td
                                                        colSpan={6}
                                                        className="px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-200 tracking-widest uppercase"
                                                    >
                                                        {group.label}
                                                    </td>
                                                </tr>
                                            );

                                            const itemRows = group.rows.map(
                                                ({ row, idx }) => {
                                                    let reactKey;
                                                    if (row.noindex) {
                                                        reactKey = `noindex-${row.noindex}`;
                                                    } else {
                                                        const tglByr =
                                                            row.tgl_byr || "";
                                                        const no =
                                                            row.no || "";
                                                        const status =
                                                            row.status || "";
                                                        const nmPerawatan =
                                                            row.nm_perawatan ||
                                                            "";
                                                        const biaya =
                                                            row.biaya || 0;
                                                        const jumlah =
                                                            row.jumlah || 0;
                                                        reactKey = `temp-${no}-${status}-${tglByr}-${nmPerawatan}-${biaya}-${jumlah}-${idx}`;
                                                    }

                                                    return (
                                                        <motion.tr
                                                            key={reactKey}
                                                            className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200 group cursor-pointer"
                                                            initial={{
                                                                opacity: 0,
                                                                x: -20,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                x: 0,
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                                x: 20,
                                                            }}
                                                            transition={{
                                                                delay:
                                                                    idx * 0.02,
                                                            }}
                                                            whileHover={{
                                                                scale: 1.01,
                                                            }}
                                                            onClick={() =>
                                                                handleRowClick(
                                                                    row
                                                                )
                                                            }
                                                        >
                                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                                {formatTanggal(
                                                                    row.tgl_byr
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-3 pl-10 font-medium text-gray-900 dark:text-white">
                                                                {row.nm_perawatan}
                                                            </td>
                                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                                {currency.format(
                                                                    row.biaya ||
                                                                        0
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                                {number.format(
                                                                    row.jumlah ||
                                                                        0
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                                {currency.format(
                                                                    row.tambahan ||
                                                                        0
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">
                                                                {currency.format(
                                                                    row.totalbiaya ||
                                                                        0
                                                                )}
                                                            </td>
                                                        </motion.tr>
                                                    );
                                                }
                                            );

                                            return [headerRow, ...itemRows];
                                        });
                                    })()}
                                </AnimatePresence>
                            )}
                        </tbody>
                    </table>
                </motion.div>
            )}

            {/* Summary By Status - hanya untuk Tab Data Tagihan */}
            {activeTab === "tagihan" && (
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
                >
                    {Object.entries(summary.by_status || {}).map(
                        ([key, val], idx) => (
                            <motion.div
                                key={key}
                                className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200/50 dark:border-blue-800/50 p-4 backdrop-blur-sm"
                                variants={cardHoverVariants}
                                initial="rest"
                                whileHover="hover"
                                transition={{ delay: idx * 0.1 }}
                            >
                                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                    {key}
                                </p>
                                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-1">
                                    {currency.format(val.total || 0)}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {val.count || 0} item
                                </p>
                            </motion.div>
                        )
                    )}
                </motion.div>
            )}

            <AnimatePresence>
                {selectedRow && (
                    <Modal
                        title="Detail Item Billing"
                        onClose={() => setSelectedRow(null)}
                    >
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">
                                    Tanggal
                                </span>
                                <span className="font-medium">
                                    {formatTanggal(selectedRow.tgl_byr)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">
                                    Deskripsi
                                </span>
                                <span className="font-medium text-right">
                                    {selectedRow.nm_perawatan}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">
                                    Biaya
                                </span>
                                <span className="font-medium">
                                    {currency.format(selectedRow.biaya || 0)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">
                                    Jumlah
                                </span>
                                <span className="font-medium">
                                    {number.format(selectedRow.jumlah || 0)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">
                                    Tambahan
                                </span>
                                <span className="font-medium">
                                    {currency.format(selectedRow.tambahan || 0)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm border-t border-gray-200 dark:border-gray-700 pt-3 mt-2">
                                <span className="text-gray-700 dark:text-gray-300 font-semibold">
                                    Total
                                </span>
                                <span className="font-bold text-blue-600 dark:text-blue-400">
                                    {currency.format(
                                        selectedRow.totalbiaya || 0
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <motion.button
                                onClick={() => {
                                    if (
                                        !selectedRow ||
                                        selectedRow.source !== "billing" ||
                                        !selectedRow.noindex
                                    ) {
                                        notifyInfo(
                                            "Item ini berasal dari preview otomatis (belum ada snapshot billing). Silakan lakukan Posting Billing di kasir untuk membuat snapshot sebelum bisa edit/hapus di sini."
                                        );
                                        return;
                                    }
                                    setEditItem(selectedRow);
                                    setSelectedRow(null);
                                }}
                                disabled={
                                    !selectedRow ||
                                    selectedRow.source !== "billing" ||
                                    !selectedRow.noindex
                                }
                                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Edit
                            </motion.button>
                            <motion.button
                                onClick={async () => {
                                    if (!selectedRow) return;
                                    await handleDelete(selectedRow);
                                    setSelectedRow(null);
                                }}
                                disabled={
                                    !selectedRow ||
                                    selectedRow.source !== "billing" ||
                                    !selectedRow.noindex
                                }
                                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Hapus
                            </motion.button>
                        </div>
                    </Modal>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showCreate && (
                    <Modal
                        title="Tambah Item Billing"
                        onClose={() => setShowCreate(false)}
                    >
                        <BillingForm
                            initial={{ no_rawat: noRawat }}
                            statusOptions={statusOptions}
                            onSubmit={handleCreate}
                            onCancel={() => setShowCreate(false)}
                        />
                    </Modal>
                )}

                {editItem && (
                    <Modal
                        title="Edit Item Billing"
                        onClose={() => setEditItem(null)}
                    >
                        <BillingForm
                            initial={{
                                no_rawat: editItem.no_rawat,
                                tgl_byr: normalizeDateForInput(
                                    editItem.tgl_byr
                                ),
                                no: editItem.no,
                                nm_perawatan: editItem.nm_perawatan,
                                pemisah: editItem.pemisah,
                                biaya: editItem.biaya,
                                jumlah: editItem.jumlah,
                                tambahan: editItem.tambahan,
                                status: editItem.status,
                            }}
                            statusOptions={statusOptions}
                            onSubmit={(payload) =>
                                handleUpdate(editItem.noindex, payload)
                            }
                            onCancel={() => setEditItem(null)}
                        />
                    </Modal>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

BillingPage.layout = (page) => (
    <SidebarKeuangan title="Keuangan">{page}</SidebarKeuangan>
);

/**
 * Tab: Pembayaran
 * Menampilkan rangkuman pembayaran dengan pilihan komponen biaya yang disertakan.
 */
function PembayaranTab({ summary, categoryMap, onSave, noRawat, invoice }) {
    const [selected, setSelected] = React.useState(() =>
        // Default: semua komponen aktif (mirip notaralan=="Yes")
        (Array.isArray(categoryMap) ? categoryMap : []).map((c) => c.label)
    );
    const toggle = (label) => {
        setSelected((prev) =>
            prev.includes(label)
                ? prev.filter((l) => l !== label)
                : [...prev, label]
        );
    };

    const subtotal = React.useMemo(() => {
        let total = 0;
        for (const cat of categoryMap) {
            if (!selected.includes(cat.label)) continue;
            for (const key of cat.keys) {
                const val = summary?.by_status?.[key];
                if (val?.total) total += Number(val.total);
            }
        }
        return total;
    }, [selected, summary, categoryMap]);

    const [ppnPercent, setPpnPercent] = React.useState(0);
    const [bayar, setBayar] = React.useState(0);
    const [piutang, setPiutang] = React.useState(0);
    const [bayarText, setBayarText] = React.useState("");
    const [piutangText, setPiutangText] = React.useState("");
    // Akun bayar (Kas/Bank) dan akun piutang yang dipilih melalui SearchableSelect
    const [akunBayar, setAkunBayar] = React.useState("");
    const [akunBayarData, setAkunBayarData] = React.useState(null);
    const [akunPiutang, setAkunPiutang] = React.useState("");
    const [akunPiutangData, setAkunPiutangData] = React.useState(null);
    // Akun pendapatan (kredit) dipilih otomatis di backend dari master rekening (rekening & subrekening); UI tidak perlu mengirimnya

    const totalWithPpn = React.useMemo(() => {
        const t = subtotal || 0;
        const p = Number(ppnPercent) || 0;
        const ppnNominal = Math.round(t * (p / 100) * 100) / 100;
        return Math.round((t + ppnNominal) * 100) / 100;
    }, [subtotal, ppnPercent]);

    React.useEffect(() => {
        const b = totalWithPpn || 0;
        setBayar(b);
        setPiutang(0);
        setBayarText(formatIDR(b));
        setPiutangText(formatIDR(0));
    }, [totalWithPpn]);

    React.useEffect(() => {
        (async () => {
            try {
                if (akunBayar) return;
                const res = await axios.get(
                    "/api/akutansi/akun-bayar",
                    { params: { per_page: 50, q: "Kas Kasir" } }
                );
                const items = Array.isArray(res?.data?.data)
                    ? res.data.data
                    : [];
                const found = items.find(
                    (it) =>
                        (it?.nama_bayar || "")
                            .toLowerCase()
                            .includes("kas kasir")
                );
                if (found && found.kd_rek) {
                    const opt = {
                        value: found.kd_rek,
                        kd_rek: found.kd_rek,
                        nm_rek: found.nm_rek || "",
                        nama_bayar: found.nama_bayar || "",
                        ppn:
                            typeof found.ppn === "number"
                                ? found.ppn
                                : Number(found.ppn) || 0,
                        label: `${found.nama_bayar || ""} — ${found.kd_rek}$${
                            found.nm_rek ? " — " + found.nm_rek : ""
                        }`.replace("$$", ""),
                    };
                    setAkunBayar(found.kd_rek);
                    setAkunBayarData(opt);
                    if (typeof opt.ppn === "number") {
                        setPpnPercent(opt.ppn);
                    }
                }
            } catch (e) {
                // ignore default failure
            }
        })();
    }, [akunBayar]);

    const kembali = React.useMemo(() => {
        const k = Number(bayar) - (totalWithPpn || 0);
        return k > 0 ? k : 0;
    }, [bayar, totalWithPpn]);

    return (
        <div className="space-y-4">
            {/* Pilihan komponen biaya */}
            <div className="flex flex-wrap gap-2">
                {categoryMap.map((c) => (
                    <label
                        key={c.label}
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm cursor-pointer ${
                            selected.includes(c.label)
                                ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200"
                                : "bg-white border-gray-200 text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                        }`}
                    >
                        <input
                            type="checkbox"
                            checked={selected.includes(c.label)}
                            onChange={() => toggle(c.label)}
                        />
                        {c.label}
                    </label>
                ))}
            </div>

            {/* Ringkasan pembayaran */}
            <div className="space-y-3">
                {/* Baris tunggal: Total Tagihan, PPN (%), Tagihan + PPN dengan komposisi kolom 2-1-2 */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <div className="md:col-span-2">
                        <Field label="Total Tagihan">
                            <input
                                readOnly
                                value={currency.format(subtotal || 0)}
                                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm"
                            />
                        </Field>
                    </div>
                    <div className="md:col-span-1">
                        <Field label="PPN (%)">
                            <input
                                type="number"
                                step="0.1"
                                value={ppnPercent}
                                onChange={(e) =>
                                    setPpnPercent(Number(e.target.value) || 0)
                                }
                                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm"
                            />
                        </Field>
                    </div>
                    <div className="md:col-span-2">
                        <Field label="Tagihan + PPN">
                            <input
                                readOnly
                                value={currency.format(totalWithPpn || 0)}
                                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm"
                            />
                        </Field>
                    </div>
                </div>
                {/* Baris Bayar: nominal + pilih akun bayar + tombol cek */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-2">
                    <Field label="Bayar : Rp">
                        <input
                            type="text"
                            inputMode="numeric"
                            value={bayarText}
                            onChange={(e) => {
                                const raw = e.target.value;
                                const val = parseIDRInput(raw);
                                setBayar(val);
                                setBayarText(formatIDR(val));
                                const sisa = (totalWithPpn || 0) - val;
                                const p = sisa > 0 ? sisa : 0;
                                setPiutang(p);
                                setPiutangText(formatIDR(p));
                            }}
                            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm"
                        />
                    </Field>
                    <Field label="Akun Bayar">
                        <SearchableSelect
                            source="akun_bayar"
                            value={akunBayar}
                            onChange={(v) => setAkunBayar(v || "")}
                            onSelect={(opt) => {
                                setAkunBayarData(opt || null);
                                // Selaraskan dengan DlgBilingRalan: gunakan PPN dari akun bayar terpilih sebagai default
                                if (opt && typeof opt.ppn === "number") {
                                    setPpnPercent(opt.ppn);
                                }
                            }}
                            placeholder="Pilih akun bayar (Kas/Bank)"
                            defaultDisplay={akunBayarData?.label || null}
                            className="min-w-[180px]"
                        />
                    </Field>
                    <button
                        onClick={() => {
                            const b = totalWithPpn || 0;
                            setBayar(b);
                            setPiutang(0);
                            setBayarText(formatIDR(b));
                            setPiutangText(formatIDR(0));
                        }}
                        className="self-end px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800"
                        title="Bayar penuh"
                    >
                        <Check className="w-4 h-4" />
                    </button>
                </div>
                {/* Baris Piutang: tampilan sisa + pilih akun piutang + tombol cek */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-2">
                    <Field label="Piutang : Rp">
                        <input
                            type="text"
                            inputMode="numeric"
                            value={piutangText}
                            onChange={(e) => {
                                const raw = e.target.value;
                                const val = parseIDRInput(raw);
                                setPiutang(val);
                                setPiutangText(formatIDR(val));
                                const bayarBaru = (totalWithPpn || 0) - val;
                                const b = bayarBaru > 0 ? bayarBaru : 0;
                                setBayar(b);
                                setBayarText(formatIDR(b));
                            }}
                            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm"
                        />
                    </Field>
                    <Field label="Akun Piutang">
                        <SearchableSelect
                            source="akun_piutang"
                            value={akunPiutang}
                            onChange={(v) => setAkunPiutang(v || "")}
                            onSelect={(opt) => setAkunPiutangData(opt || null)}
                            placeholder="Pilih akun piutang"
                            defaultDisplay={akunPiutangData?.label || null}
                            className="min-w-[180px]"
                        />
                    </Field>
                    <button
                        onClick={() => {
                            const p = totalWithPpn || 0;
                            setBayar(0);
                            setPiutang(p);
                            setBayarText(formatIDR(0));
                            setPiutangText(formatIDR(p));
                        }}
                        className="self-end px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800"
                        title="Jadikan semua piutang"
                    >
                        <Check className="w-4 h-4" />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                    <Field label="Kembali : Rp">
                        <input
                            readOnly
                            value={currency.format(kembali || 0)}
                            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm"
                        />
                    </Field>
                </div>
            </div>

            {/* Tombol aksi */}
            <div className="flex items-center gap-3 mt-4">
                <button
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 disabled:opacity-50"
                    disabled={!onSave}
                    onClick={() =>
                        onSave?.({
                            selectedCategories: selected,
                            ppnPercent,
                            bayar,
                            subtotal,
                            totalWithPpn,
                            kembali,
                            piutang,
                            setBayar, // Tambahkan setBayar untuk menyesuaikan nominal bayar setelah snapshot
                            setPiutang,
                            // Kirim detail akun sesuai sumber Akun Bayar/Akun Piutang
                            akunBayar: akunBayar
                                ? {
                                      kd_rek: akunBayar,
                                      nama_bayar:
                                          akunBayarData?.nama_bayar || null,
                                      nm_rek: akunBayarData?.nm_rek || null,
                                      ppn:
                                          typeof akunBayarData?.ppn === "number"
                                              ? akunBayarData.ppn
                                              : null,
                                  }
                                : null,
                            akunPiutang: akunPiutang
                                ? {
                                      kd_rek: akunPiutang,
                                      nama_bayar:
                                          akunPiutangData?.nama_bayar || null,
                                      nm_rek: akunPiutangData?.nm_rek || null,
                                      kd_pj: akunPiutangData?.kd_pj || null,
                                      png_jawab:
                                          akunPiutangData?.png_jawab || null,
                                  }
                                : null,
                            // Akun pendapatan tidak dikirim dari UI; backend akan menentukan otomatis
                        })
                    }
                >
                    Simpan
                </button>
                <button
                    className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!noRawat || !invoice?.nota?.no_nota}
                    onClick={() => {
                        if (noRawat) {
                            router.visit(
                                `/akutansi/nota-jalan?no_rawat=${encodeURIComponent(
                                    noRawat
                                )}`
                            );
                        }
                    }}
                    title={
                        !noRawat || !invoice?.nota?.no_nota
                            ? "Nota belum tersedia. Simpan terlebih dahulu."
                            : "Cetak Nota"
                    }
                >
                    Nota
                </button>
                <button
                    className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800"
                    disabled
                >
                    Lihat
                </button>
                <button
                    className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => window.history.back()}
                >
                    Keluar
                </button>
            </div>
        </div>
    );
}

/**
 * Tab: Status Permintaan
 * Menampilkan daftar permintaan Laborat, Radiologi, dan Resep untuk no_rawat.
 */
function StatusPermintaanTab({
    noRawat,
    lab = [],
    rad = [],
    resep = [],
    loading,
    onRefresh,
}) {
    return (
        <div className="space-y-6">
            {/* Header dengan tombol refresh */}
            <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Status Permintaan untuk No. Rawat:{" "}
                    <span className="font-mono">{noRawat}</span>
                </div>
                {onRefresh && (
                    <motion.button
                        onClick={onRefresh}
                        disabled={loading || !noRawat}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: loading || !noRawat ? 1 : 1.02 }}
                        whileTap={{ scale: loading || !noRawat ? 1 : 0.98 }}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Memuat…
                            </>
                        ) : (
                            <>
                                <RefreshCw className="w-4 h-4" />
                                Refresh
                            </>
                        )}
                    </motion.button>
                )}
            </div>

            {loading && (
                <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memuat status permintaan…
                </div>
            )}
            {!loading && !noRawat && (
                <div className="text-sm text-gray-600 dark:text-gray-300">
                    Masukkan No. Rawat lalu klik "Muat" untuk melihat status
                    permintaan.
                </div>
            )}

            <div>
                <h3 className="text-sm font-semibold mb-2">
                    1. Permintaan Laborat:
                </h3>
                {lab.length === 0 ? (
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        Tidak ada data permintaan laboratorium.
                    </div>
                ) : (
                    <div className="space-y-2">
                        {lab.map((p) => {
                            // Tentukan status untuk ditampilkan: gunakan status dari backend jika ada, atau cek tgl_hasil
                            const statusDisplay =
                                p.status ||
                                (p.sudah_dilayani
                                    ? "Sudah Dilayani"
                                    : "Belum Dilayani");
                            const isSudahDilayani =
                                p.sudah_dilayani ||
                                (p.tgl_hasil &&
                                    p.tgl_hasil !== "0000-00-00" &&
                                    p.tgl_hasil !== null);

                            return (
                                <div
                                    key={`lab-${p.noorder}`}
                                    className={`rounded-xl border p-3 ${
                                        isSudahDilayani
                                            ? "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20"
                                            : "border-gray-200 dark:border-gray-700"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm font-semibold">
                                            Order {p.noorder} •{" "}
                                            {formatTanggal(p.tgl_permintaan)}{" "}
                                            {p.jam_permintaan
                                                ? typeof p.jam_permintaan ===
                                                      "string" &&
                                                  p.jam_permintaan.includes("T")
                                                    ? new Date(
                                                          p.jam_permintaan
                                                      ).toLocaleTimeString(
                                                          "id-ID",
                                                          {
                                                              hour: "2-digit",
                                                              minute: "2-digit",
                                                          }
                                                      )
                                                    : p.jam_permintaan
                                                : ""}
                                        </div>
                                        <div
                                            className={`text-xs font-semibold px-2 py-1 rounded ${
                                                isSudahDilayani
                                                    ? "text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50"
                                                    : "text-gray-500 bg-gray-100 dark:bg-gray-800"
                                            }`}
                                        >
                                            Status: {statusDisplay}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                        {p.diagnosa_klinis || "-"}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div>
                <h3 className="text-sm font-semibold mb-2">
                    2. Permintaan Radiologi:
                </h3>
                {rad.length === 0 ? (
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        Tidak ada data permintaan radiologi.
                    </div>
                ) : (
                    <div className="space-y-2">
                        {rad.map((p) => (
                            <div
                                key={`rad-${p.noorder}`}
                                className="rounded-xl border border-gray-200 dark:border-gray-700 p-3"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="text-sm font-semibold">
                                        Order {p.noorder} • {p.tgl_permintaan}{" "}
                                        {p.jam_permintaan}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Status: {p.status}
                                    </div>
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    {p.diagnosa_klinis}
                                </div>
                                <ul className="mt-2 text-sm list-disc pl-6">
                                    {p.pemeriksaan?.map((d, idx) => (
                                        <li
                                            key={`rad-${p.noorder}-${d.kd_jenis_prw}-${idx}`}
                                        >
                                            {
                                                d.jns_perawatan_radiologi
                                                    ?.nm_perawatan
                                            }{" "}
                                            • {d.stts_bayar}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <h3 className="text-sm font-semibold mb-2">
                    3. Permintaan Resep:
                </h3>
                {resep.length === 0 ? (
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        Tidak ada resep.
                    </div>
                ) : (
                    <div className="space-y-2">
                        {resep.map((r) => (
                            <div
                                key={`resep-${r.no_resep}`}
                                className="rounded-xl border border-gray-200 dark:border-gray-700 p-3"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="text-sm font-semibold">
                                        Resep {r.no_resep} • {r.tgl_peresepan}{" "}
                                        {r.jam_peresepan}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Status: {r.status}
                                    </div>
                                </div>
                                <ul className="mt-2 text-sm list-disc pl-6">
                                    {r.detail_obat?.map((d, idx) => (
                                        <li
                                            key={`resep-${r.no_resep}-${d.kode_brng}-${idx}`}
                                        >
                                            {d.nama_brng} • {d.jml} {d.satuan} •{" "}
                                            {d.aturan_pakai}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
