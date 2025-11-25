import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
    Receipt,
    Search,
    Plus,
    Pencil,
    Trash2,
    Info,
    Wallet,
    Check,
} from "lucide-react";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import SearchableSelect from "@/Components/SearchableSelect";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
};

const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
});
const number = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 });

function Field({ label, children }) {
    return (
        <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-300">
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
        <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="No. Rawat">
                    <input
                        name="no_rawat"
                        value={form.no_rawat}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm"
                    />
                </Field>
                <Field label="Tanggal">
                    <input
                        type="date"
                        name="tgl_byr"
                        value={form.tgl_byr}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm"
                    />
                </Field>
                <Field label="Keterangan (No)">
                    <input
                        name="no"
                        value={form.no}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm"
                    />
                </Field>
                <Field label="Kategori (Status)">
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm"
                    >
                        <option value="">Pilih Kategori…</option>
                        {statusOptions.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                </Field>
                <Field label="Nama Item (nm_perawatan)">
                    <input
                        name="nm_perawatan"
                        value={form.nm_perawatan}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm"
                    />
                </Field>
                <Field label="Pemisah">
                    <input
                        name="pemisah"
                        value={form.pemisah}
                        onChange={handleChange}
                        maxLength={1}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm"
                    />
                </Field>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <Field label="Biaya">
                    <input
                        type="number"
                        step="0.01"
                        name="biaya"
                        value={form.biaya}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm"
                    />
                </Field>
                <Field label="Jumlah">
                    <input
                        type="number"
                        step="0.01"
                        name="jumlah"
                        value={form.jumlah}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm"
                    />
                </Field>
                <Field label="Tambahan">
                    <input
                        type="number"
                        step="0.01"
                        name="tambahan"
                        value={form.tambahan}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm"
                    />
                </Field>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-gray-50/80 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 px-4 py-3">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                    Total Per Item
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currency.format(total || 0)}
                </div>
            </div>
            <div className="flex items-center justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 disabled:opacity-50"
                >
                    {saving ? "Menyimpan…" : "Simpan"}
                </button>
            </div>
        </form>
    );
}

function Modal({ title, children, onClose }) {
    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="absolute inset-x-0 top-14 mx-auto max-w-2xl rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl p-6"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Close"
                    >
                        ×
                    </button>
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
        akunPendapatan,
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
        // Akun pendapatan: wajib jika tidak disediakan default pada config
        if (!akunPendapatan) {
            notify(
                "Akun Pendapatan (kredit) wajib dipilih. Alternatif: set rek_pendapatan_default di config/akutansi.php."
            );
            return false;
        }
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
        akunPendapatan,
    }) => {
        const ok = await validateBeforeSnapshot({
            selectedCategories,
            bayar,
            totalWithPpn,
            akunBayar,
            akunPiutang,
            akunPendapatan,
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
                kd_rek_kredit: akunPendapatan?.kd_rek || null,
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
            className="space-y-6"
        >
            {/* Header */}
            <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-6"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
                            <Receipt className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Billing Pasien
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Kelola rincian biaya pasien berdasarkan snapshot
                                tabel billing.
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
                                className="w-full md:w-[420px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/80 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                        <button
                            onClick={loadData}
                            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700"
                        >
                            Muat
                        </button>
                    </div>
                </div>
                {invoice && (
                    <div className="relative mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Kunjungan
                            </p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {invoice.visit?.no_rawat}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {invoice.visit?.tgl_registrasi}
                            </p>
                        </div>
                        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Pasien
                            </p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {invoice.visit?.pasien}{" "}
                                <span className="text-gray-500">
                                    ({invoice.visit?.no_rkm_medis})
                                </span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Dokter: {invoice.visit?.dokter} • Poli:{" "}
                                {invoice.visit?.poli}
                            </p>
                        </div>
                        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Penjamin
                            </p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {invoice.visit?.penjamin}
                            </p>
                            {invoice.nota && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Nota {invoice.nota?.jenis}:{" "}
                                    {invoice.nota?.no_nota} •{" "}
                                    {invoice.nota?.tanggal} {invoice.nota?.jam}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Tabs */}
            <motion.div
                variants={itemVariants}
                className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm"
            >
                <div className="border-b border-gray-200 dark:border-gray-800 mb-4">
                    <div className="flex items-center gap-6">
                        <button
                            className={`px-2 pb-3 text-sm font-semibold ${
                                activeTab === "tagihan"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-600 dark:text-gray-300"
                            }`}
                            onClick={() => setActiveTab("tagihan")}
                        >
                            Data Tagihan
                        </button>
                        <button
                            className={`px-2 pb-3 text-sm font-semibold ${
                                activeTab === "pembayaran"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-600 dark:text-gray-300"
                            }`}
                            onClick={() => setActiveTab("pembayaran")}
                        >
                            Pembayaran
                        </button>
                        <button
                            className={`px-2 pb-3 text-sm font-semibold ${
                                activeTab === "permintaan"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-600 dark:text-gray-300"
                            }`}
                            onClick={() => setActiveTab("permintaan")}
                        >
                            Status Permintaan
                        </button>
                    </div>
                </div>

                {activeTab === "tagihan" && (
                    <div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowCreate(true)}
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow hover:bg-emerald-700"
                                >
                                    <Plus className="w-4 h-4" />
                                    Tambah Item
                                </button>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) =>
                                            setStatusFilter(e.target.value)
                                        }
                                        className="rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
                                    >
                                        <option value="">Semua Kategori</option>
                                        {statusOptions.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        value={q}
                                        onChange={(e) => setQ(e.target.value)}
                                        placeholder="Cari item…"
                                        className="rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
                                    />
                                    <button
                                        onClick={loadData}
                                        className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800"
                                    >
                                        Terapkan
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 px-3 py-2">
                                    <Wallet className="w-4 h-4 text-indigo-600 dark:text-indigo-300" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        Grand Total:
                                    </span>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {currency.format(
                                            summary.grand_total || 0
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Status proses preview obat / pesan error saja (tanpa pesan info panjang) */}
                        {items.length > 0 &&
                            items[0]?.source === "preview" &&
                            (mergingObatPreview || mergeError) && (
                                <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3 text-amber-800 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-200">
                                    {mergingObatPreview && (
                                        <div className="mt-2 text-xs">
                                            Memuat preview obat dari resep…
                                        </div>
                                    )}
                                    {mergeError && (
                                        <div className="mt-2 text-xs text-red-700 dark:text-red-300">
                                            {mergeError}
                                        </div>
                                    )}
                                </div>
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
                            akunPendapatan,
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
                                akunPendapatan,
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
                    className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-x-auto"
                >
                    <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                        <thead>
                            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                <th className="py-3 px-4">Tanggal</th>
                                <th className="py-3 px-4">Keterangan</th>
                                <th className="py-3 px-4">
                                    Tagihan/Tindakan/Terapi
                                </th>
                                <th className="py-3 px-4">Biaya</th>
                                <th className="py-3 px-4">Jml</th>
                                <th className="py-3 px-4">Tambahan</th>
                                <th className="py-3 px-4">Total</th>
                                <th className="py-3 px-4">Kategori</th>
                                <th className="py-3 px-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={9}
                                        className="py-8 text-center text-gray-600 dark:text-gray-300"
                                    >
                                        Memuat data…
                                    </td>
                                </tr>
                            ) : items.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="py-10">
                                        <div className="flex items-center justify-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                            <Info className="w-4 h-4" />
                                            Tidak ada item billing untuk no.
                                            rawat ini.
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                items.map((row) => (
                                    <tr
                                        key={row.noindex}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                                    >
                                        <td className="py-2 px-4 text-gray-900 dark:text-white">
                                            {row.tgl_byr}
                                        </td>
                                        <td className="py-2 px-4">
                                            {row.no || "-"}
                                        </td>
                                        <td className="py-2 px-4 font-medium text-gray-900 dark:text-white">
                                            {row.nm_perawatan}
                                        </td>
                                        <td className="py-2 px-4">
                                            {currency.format(row.biaya || 0)}
                                        </td>
                                        <td className="py-2 px-4">
                                            {number.format(row.jumlah || 0)}
                                        </td>
                                        <td className="py-2 px-4">
                                            {currency.format(row.tambahan || 0)}
                                        </td>
                                        <td className="py-2 px-4 font-semibold">
                                            {currency.format(
                                                row.totalbiaya || 0
                                            )}
                                        </td>
                                        <td className="py-2 px-4">
                                            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4">
                                            <div className="flex items-center gap-2">
                                                <button
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
                                                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
                                                    aria-label="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
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
                                                    className="p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-300 disabled:opacity-50"
                                                    aria-label="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </motion.div>
            )}

            {/* Summary By Status - hanya untuk Tab Data Tagihan */}
            {activeTab === "tagihan" && (
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                    {Object.entries(summary.by_status || {}).map(
                        ([key, val]) => (
                            <div
                                key={key}
                                className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm"
                            >
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {key}
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                                    {currency.format(val.total || 0)}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {val.count || 0} item
                                </p>
                            </div>
                        )
                    )}
                </motion.div>
            )}

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
    // Akun pendapatan (kredit) untuk posting jurnal ketika snapshot
    const [akunPendapatan, setAkunPendapatan] = React.useState("");
    const [akunPendapatanData, setAkunPendapatanData] = React.useState(null);

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Field label="Kembali : Rp">
                        <input
                            readOnly
                            value={currency.format(kembali || 0)}
                            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm"
                        />
                    </Field>
                    <Field label="Akun Pendapatan (Kredit)">
                        <SearchableSelect
                            source="rekening"
                            value={akunPendapatan}
                            onChange={(v) => setAkunPendapatan(v || "")}
                            onSelect={(opt) =>
                                setAkunPendapatanData(opt || null)
                            }
                            placeholder="Pilih akun pendapatan (COA)"
                            defaultDisplay={akunPendapatanData?.label || null}
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Wajib dipilih bila default pendapatan belum diatur
                            pada config/akutansi.php
                        </p>
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
                            akunPendapatan: akunPendapatan
                                ? {
                                      kd_rek: akunPendapatan,
                                      nm_rek:
                                          akunPendapatanData?.nm_rek || null,
                                  }
                                : null,
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
                                    {p.detail_tests?.map((d) => (
                                        <li
                                            key={`${p.noorder}-${d.kd_jenis_prw}`}
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
                                    {p.pemeriksaan?.map((d) => (
                                        <li
                                            key={`${p.noorder}-${d.kd_jenis_prw}`}
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
                                    {r.detail_obat?.map((d) => (
                                        <li
                                            key={`${r.no_resep}-${d.kode_brng}`}
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
