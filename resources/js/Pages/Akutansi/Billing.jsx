import React from "react";
import axios from "axios";
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
} from "lucide-react";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import SearchableSelect from "@/Components/SearchableSelect";

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
        tgl_byr: initial.tgl_byr || new Date().toISOString().slice(0, 10),
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

export default function BillingPage({ statusOptions = [], initialNoRawat }) {
    const [noRawat, setNoRawat] = React.useState(initialNoRawat || "");
    const [invoice, setInvoice] = React.useState(null);
    const [items, setItems] = React.useState([]);
    const [summary, setSummary] = React.useState({
        by_status: {},
        grand_total: 0,
    });
    const [loading, setLoading] = React.useState(false);
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
        if (!noRawat) return;
        setLoading(true);
        setError(null);
        try {
            // Header info invoice (visit + nota)
            // Gunakan encodeURI agar karakter '/' pada no_rawat tidak di-encode menjadi %2F
            const invUrl = buildUrl(`/akutansi/invoice/${encodeURI(noRawat)}`);
            const invRes = await axios.get(invUrl, {
                headers: { Accept: "application/json" },
            });
            setInvoice(invRes.data);

            // Items untuk CRUD (butuh noindex)
            const apiUrl = buildUrl("/api/akutansi/billing", {
                no_rawat: noRawat,
                q,
                status: statusFilter,
            });
            const apiRes = await axios.get(apiUrl);
            const baseItems = apiRes.data.items || [];
            const baseSummary = apiRes.data.summary || {
                by_status: {},
                grand_total: 0,
            };
            setItems(baseItems);
            setSummary(baseSummary);

            // Jika mode preview (belum ada snapshot billing), lengkapi dengan data obat dari resep
            if (baseItems.length > 0 && baseItems[0]?.source === "preview") {
                try {
                    setMergingObatPreview(true);
                    setMergeError(null);
                    const { extraItems, extraSummary } = await buildObatPreview(
                        noRawat
                    );
                    if (extraItems.length > 0) {
                        // Gabungkan items dan summary
                        setItems((prev) => [...prev, ...extraItems]);
                        setSummary((prev) => {
                            const byStatus = { ...(prev?.by_status || {}) };
                            const existing = byStatus["Obat"] || {
                                total: 0,
                                count: 0,
                            };
                            byStatus["Obat"] = {
                                total:
                                    Number(existing.total || 0) +
                                    Number(extraSummary.total || 0),
                                count:
                                    Number(existing.count || 0) +
                                    Number(extraSummary.count || 0),
                            };
                            return {
                                by_status: byStatus,
                                grand_total:
                                    Number(prev?.grand_total || 0) +
                                    Number(extraSummary.total || 0),
                            };
                        });
                    }
                } catch (merErr) {
                    // Jangan gagal total, cukup catat error agar admin tahu
                    setMergeError(
                        merErr?.message ||
                            "Gagal memuat preview obat dari resep"
                    );
                } finally {
                    setMergingObatPreview(false);
                }
            }
        } catch (e) {
            setError(
                e?.response?.data?.message || e?.message || "Gagal memuat data"
            );
        } finally {
            setLoading(false);
        }
    };

    // Notifikasi sederhana (sementara gunakan alert)
    const notify = (msg) => {
        if (msg) alert(String(msg));
    };

    // Validasi ringan sebelum simpan item billing + cek keberadaan nota_jalan
    const validateBeforeSave = async (payload) => {
        if (!payload?.no_rawat) {
            notify("No. Rawat wajib diisi sebelum simpan.");
            return false;
        }
        if (!payload?.status) {
            notify("Kategori (Status) wajib dipilih.");
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
                notify(
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
            notify("Masukkan No. Rawat terlebih dahulu sebelum menyimpan.");
            return false;
        }
        if (
            !Array.isArray(selectedCategories) ||
            selectedCategories.length === 0
        ) {
            notify("Pilih minimal satu komponen biaya sebelum menyimpan.");
            return false;
        }
        // Validasi pembayaran & piutang dasar
        if ((Number(bayar) || 0) > (Number(totalWithPpn) || 0)) {
            notify(
                "Nominal bayar melebihi total tagihan + PPN. Atur kembali agar uang kembali = 0 sebelum menyimpan."
            );
            return false;
        }
        if ((Number(bayar) || 0) > 0 && !akunBayar) {
            notify(
                "Akun Bayar wajib dipilih ketika nominal bayar > 0 (Kas/Bank)."
            );
            return false;
        }
        if ((Number(piutang) || 0) > 0 && !akunPiutang) {
            notify("Akun Piutang wajib dipilih ketika ada sisa piutang.");
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
                notify(
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
                tgl_byr: val.tgl_byr || "",
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

        // 2) Buat nota_jalan jika belum ada, nomor otomatis per tanggal
        let noNota = invoice?.nota?.no_nota || null;
        try {
            const createNotaRes = await axios.post("/api/akutansi/nota-jalan", {
                no_rawat: payload.no_rawat,
                tanggal: payload.tgl_byr,
                jam: new Date().toTimeString().slice(0, 8),
            });
            noNota = createNotaRes?.data?.no_nota || noNota;
        } catch (e) {
            console.warn("Gagal membuat nota_jalan:", e?.message);
        }

        // 3) Stage jurnal dari total billing pasien ini
        try {
            await axios.post("/api/akutansi/jurnal/stage-from-billing", {
                no_rawat: payload.no_rawat,
            });
        } catch (e) {
            notify(
                e?.response?.data?.message ||
                    "Gagal menyiapkan staging jurnal. Pastikan mapping rekening debet/kredit di config/akutansi.php."
            );
        }

        // 4) Posting jurnal (balik) dengan no_bukti = no_nota (jika ada)
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
                notify(`Posting jurnal berhasil: ${postRes.data.no_jurnal}`);
            }
        } catch (e) {
            notify(
                e?.response?.data?.message ||
                    "Posting jurnal gagal. Periksa keseimbangan debet/kredit atau data staging."
            );
        }

        // Refresh UI
        setShowCreate(false);
        await loadData();
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

        // Konsistensi nominal: bayar + piutang harus sama dengan totalWithPpn
        const sumPay = Math.round(
            (Number(bayar) || 0) + (Number(piutang) || 0)
        );
        const twp = Math.round(Number(totalWithPpn) || 0);
        if (sumPay !== twp) {
            notify(
                `Jumlah Bayar (${currency.format(
                    Number(bayar) || 0
                )}) + Piutang (${currency.format(
                    Number(piutang) || 0
                )}) tidak sama dengan Total (${currency.format(
                    Number(totalWithPpn) || 0
                )}). Periksa kembali sebelum menyimpan.`
            );
            return;
        }

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
        const selectedItems = (items || [])
            .filter((it) => allowedStatus[it?.status ?? "-"])
            .map((it) => ({
                no_rawat: noRawat,
                tgl_byr: it.tgl_byr || new Date().toISOString().slice(0, 10),
                no: it.no || null,
                nm_perawatan: it.nm_perawatan || (it.no ?? "Item"),
                pemisah: it.pemisah || "-",
                biaya: Number(it.biaya || 0),
                jumlah: Number(it.jumlah || 1),
                tambahan: Number(it.tambahan || 0),
                status: it.status || "-",
            }));

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
            if (Math.round(gt) !== Math.round(Number(subtotal || 0))) {
                notify(
                    `Peringatan: Total snapshot (${currency.format(
                        gt
                    )}) berbeda dengan perhitungan UI (${currency.format(
                        subtotal || 0
                    )}). Pastikan filter kategori dan data sumber konsisten.`
                );
            }
        } catch (e) {
            notify(
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
                tanggal: new Date().toISOString().slice(0, 10),
                jam: new Date().toTimeString().slice(0, 8),
            });
            noNota = createNotaRes?.data?.no_nota || null;
            if (noNota) notify(`Nota jalan dibuat: ${noNota}`);
        } catch (e) {
            notify(
                e?.response?.data?.message ||
                    "Gagal membuat nota_jalan setelah snapshot. Anda dapat membuatnya manual dari menu terkait."
            );
        }

        // 3) Stage jurnal dari total billing dengan pemecahan debit & PPN
        try {
            await axios.post("/api/akutansi/jurnal/stage-from-billing", {
                no_rawat: noRawat,
                akun_bayar: akunBayar || null,
                akun_piutang: akunPiutang || null,
                bayar: Number(bayar) || 0,
                piutang: Number(piutang) || 0,
                ppn_percent: Number(ppnPercent) || 0,
                // Akun Pendapatan (kredit) tidak dikirim dari UI; backend akan memilih otomatis dari master rekening
            });
        } catch (e) {
            notify(
                e?.response?.data?.message ||
                    "Gagal menyiapkan staging jurnal. Pastikan mapping rekening debet/kredit di config/akutansi.php."
            );
        }

        // 4) Posting jurnal dengan no_bukti = no_nota (jika ada)
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
                notify(`Posting jurnal berhasil: ${postRes.data.no_jurnal}`);
            }
        } catch (e) {
            notify(
                e?.response?.data?.message ||
                    "Posting jurnal gagal. Periksa keseimbangan debet/kredit atau data staging."
            );
        }

        // 5) Pesan tambahan sesuai kondisi pembayaran (placeholder untuk aturan Java)
        if (piutang > 0) {
            notify(
                `Terdapat piutang sebesar ${currency.format(
                    piutang
                )}. Pastikan penagihan/rekonsiliasi dilakukan.`
            );
        }
        if (kembali > 0) {
            notify(
                `Uang kembali sebesar ${currency.format(
                    kembali
                )}. Catatan: fitur multi-cara bayar belum didukung di UI ini, dan pada Java jika cara bayar > 1 maka kembali wajib 0.`
            );
        }

        // Refresh UI
        await loadData();
    };

    const handleUpdate = async (noindex, payload) => {
        await axios.put(`/api/akutansi/billing/${noindex}`, payload);
        setEditItem(null);
        await loadData();
    };

    const handleDelete = async (row) => {
        if (row?.source !== "billing" || !row?.noindex) {
            alert(
                "Item ini berasal dari preview otomatis (belum ada snapshot billing). Silakan lakukan Posting Billing di kasir untuk membuat snapshot sebelum bisa edit/hapus di sini."
            );
            return;
        }
        if (!confirm(`Hapus item "${row.nm_perawatan}"?`)) return;
        await axios.delete(`/api/akutansi/billing/${row.noindex}`);
        await loadData();
    };

    React.useEffect(() => {
        if (initialNoRawat) {
            setNoRawat(initialNoRawat);
        }
    }, [initialNoRawat]);

    React.useEffect(() => {
        if (activeTab === "permintaan" && noRawat) {
            loadRequests();
        }
    }, [activeTab, noRawat]);

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
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                Kelola rincian biaya pasien berdasarkan snapshot tabel billing.
                            </p>
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
                                Dokter: {invoice.visit?.dokter} • Poli: {invoice.visit?.poli}
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
                                    Nota {invoice.nota?.jenis}: {invoice.nota?.no_nota} • {invoice.nota?.tanggal} {invoice.nota?.jam}
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
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
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
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
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
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
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
                                            onChange={(e) => setQ(e.target.value)}
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
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Tanggal</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Keterangan</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Tagihan/Tindakan/Terapi
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Biaya</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Jml</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Tambahan</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Total</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Kategori</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={9}
                                        className="px-4 py-12 text-center"
                                    >
                                        <motion.div
                                            className="flex flex-col items-center justify-center gap-3"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Memuat data...</span>
                                        </motion.div>
                                    </td>
                                </tr>
                            ) : items.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-4 py-12">
                                        <motion.div
                                            className="flex flex-col items-center justify-center gap-3"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <Database className="w-12 h-12 text-gray-400" />
                                            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                Tidak ada item billing untuk no. rawat ini.
                                            </span>
                                        </motion.div>
                                    </td>
                                </tr>
                            ) : (
                                <AnimatePresence>
                                    {items.map((row, idx) => (
                                        <motion.tr
                                            key={row.noindex ?? `temp-${idx}`}
                                            className="border-b border-gray-100/50 dark:border-gray-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all duration-200 group"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ delay: idx * 0.02 }}
                                            whileHover={{ scale: 1.01 }}
                                        >
                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                {row.tgl_byr}
                                            </td>
                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                {row.no || "-"}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                                {row.nm_perawatan}
                                            </td>
                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                {currency.format(row.biaya || 0)}
                                            </td>
                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                {number.format(row.jumlah || 0)}
                                            </td>
                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                {currency.format(row.tambahan || 0)}
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">
                                                {currency.format(row.totalbiaya || 0)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <motion.span
                                                    className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-700"
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    {row.status}
                                                </motion.span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <motion.button
                                                        onClick={() =>
                                                            setEditItem(row)
                                                        }
                                                        disabled={
                                                            row?.source !==
                                                            "billing"
                                                        }
                                                        title={
                                                            row?.source !==
                                                            "billing"
                                                                ? "Tidak bisa edit: item preview (belum snapshot billing)"
                                                                : "Edit"
                                                        }
                                                        className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        aria-label="Edit"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </motion.button>
                                                    <motion.button
                                                        onClick={() =>
                                                            handleDelete(row)
                                                        }
                                                        disabled={
                                                            row?.source !==
                                                            "billing"
                                                        }
                                                        title={
                                                            row?.source !==
                                                            "billing"
                                                                ? "Tidak bisa hapus: item preview (belum snapshot billing)"
                                                                : "Hapus"
                                                        }
                                                        className="p-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        aria-label="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
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
                                tgl_byr: editItem.tgl_byr,
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
function PembayaranTab({ summary, categoryMap, onSave }) {
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
    // Akun bayar (Kas/Bank) dan akun piutang yang dipilih melalui SearchableSelect
    const [akunBayar, setAkunBayar] = React.useState("");
    const [akunBayarData, setAkunBayarData] = React.useState(null);
    const [akunPiutang, setAkunPiutang] = React.useState("");
    const [akunPiutangData, setAkunPiutangData] = React.useState(null);
    // Akun pendapatan (kredit) dipilih otomatis di backend dari master rekening (rekening & subrekening); UI tidak perlu mengirimnya

    const totalWithPpn = React.useMemo(() => {
        const t = subtotal || 0;
        const p = Number(ppnPercent) || 0;
        return Math.round(t * (1 + p / 100));
    }, [subtotal, ppnPercent]);

    const kembali = React.useMemo(() => {
        const k = Number(bayar) - (totalWithPpn || 0);
        return k > 0 ? k : 0;
    }, [bayar, totalWithPpn]);

    const piutang = React.useMemo(() => {
        const sisa = (totalWithPpn || 0) - Number(bayar);
        return sisa > 0 ? sisa : 0;
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
                            type="number"
                            step="1"
                            value={bayar}
                            onChange={(e) =>
                                setBayar(Number(e.target.value) || 0)
                            }
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
                        onClick={() => setBayar(totalWithPpn || 0)}
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
                            readOnly
                            value={currency.format(piutang || 0)}
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
                        onClick={() => setBayar(0)}
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
                    className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800"
                    disabled
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
}) {
    return (
        <div className="space-y-6">
            {loading && (
                <div className="text-sm text-gray-600 dark:text-gray-300">
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
                        {lab.map((p) => (
                            <div
                                key={`lab-${p.noorder}`}
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
                                    {p.detail_tests?.map((d, idx) => (
                                        <li
                                            key={`lab-${p.noorder}-${d.kd_jenis_prw}-${idx}`}
                                        >
                                            {d.nm_perawatan} • {d.stts_bayar}
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
