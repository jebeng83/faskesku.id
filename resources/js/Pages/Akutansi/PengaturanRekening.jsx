import React, { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import SearchableSelect from "@/Components/SearchableSelect";
import { Info, Save, RefreshCw } from "lucide-react";

// Card komponen ringan mengikuti UI_UX_IMPROVEMENTS_GUIDE.md
const Card = ({ title, children }) => (
    <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-indigo-500/5">
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

// Daftar kolom per section (fallback jika payload awal belum ada baris di DB)
const COLS_UMUM = [
    "Pengadaan_Obat",
    "Pemesanan_Obat",
    "Kontra_Pemesanan_Obat",
    "Bayar_Pemesanan_Obat",
    "Penjualan_Obat",
    "Piutang_Obat",
    "Kontra_Piutang_Obat",
    "Retur_Ke_Suplayer",
    "Kontra_Retur_Ke_Suplayer",
    "Retur_Dari_pembeli",
    "Kontra_Retur_Dari_Pembeli",
    "Retur_Piutang_Obat",
    "Kontra_Retur_Piutang_Obat",
    "Pengadaan_Ipsrs",
    "Stok_Keluar_Ipsrs",
    "Kontra_Stok_Keluar_Ipsrs",
    "Bayar_Piutang_Pasien",
    "Pengambilan_Utd",
    "Kontra_Pengambilan_Utd",
    "Pengambilan_Penunjang_Utd",
    "Kontra_Pengambilan_Penunjang_Utd",
    "Penyerahan_Darah",
    "Stok_Keluar_Medis",
    "Kontra_Stok_Keluar_Medis",
    "HPP_Obat_Jual_Bebas",
    "Persediaan_Obat_Jual_Bebas",
    "Penerimaan_NonMedis",
    "Kontra_Penerimaan_NonMedis",
    "Bayar_Pemesanan_Non_Medis",
    "Hibah_Obat",
    "Kontra_Hibah_Obat",
    "Penerimaan_Toko",
    "Kontra_Penerimaan_Toko",
    "Pengadaan_Toko",
    "Bayar_Pemesanan_Toko",
    "Penjualan_Toko",
    "HPP_Barang_Toko",
    "Persediaan_Barang_Toko",
    "Piutang_Toko",
    "Kontra_Piutang_Toko",
    "Retur_Beli_Toko",
    "Kontra_Retur_Beli_Toko",
    "Retur_Beli_Non_Medis",
    "Kontra_Retur_Beli_Non_Medis",
    "Retur_Jual_Toko",
    "Kontra_Retur_Jual_Toko",
    "Retur_Piutang_Toko",
    "Kontra_Retur_Piutang_Toko",
    "Kerugian_Klaim_BPJS_RVP",
    "Lebih_Bayar_Klaim_BPJS_RVP",
    "Piutang_BPJS_RVP",
    "Kontra_Penerimaan_AsetInventaris",
    "Kontra_Hibah_Aset",
    "Hibah_Non_Medis",
    "Kontra_Hibah_Non_Medis",
    "Beban_Hutang_Lain",
    "PPN_Masukan",
    "Pengadaan_Dapur",
    "Stok_Keluar_Dapur",
    "Kontra_Stok_Keluar_Dapur",
    "PPN_Keluaran",
    "Diskon_Piutang",
    "Piutang_Tidak_Terbayar",
    "Lebih_Bayar_Piutang",
];
const COLS_UMUM2 = [
    "Penerimaan_Dapur",
    "Kontra_Penerimaan_Dapur",
    "Bayar_Pemesanan_Dapur",
    "Retur_Beli_Dapur",
    "Kontra_Retur_Beli_Dapur",
    "Hibah_Dapur",
    "Kontra_Hibah_Dapur",
    "Piutang_Jasa_Perusahaan",
    "Pendapatan_Piutang_Jasa_Perusahaan",
];
const COLS_RALAN = [
    "Suspen_Piutang_Tindakan_Ralan",
    "Tindakan_Ralan",
    "Beban_Jasa_Medik_Dokter_Tindakan_Ralan",
    "Utang_Jasa_Medik_Dokter_Tindakan_Ralan",
    "Beban_Jasa_Medik_Paramedis_Tindakan_Ralan",
    "Utang_Jasa_Medik_Paramedis_Tindakan_Ralan",
    "Beban_KSO_Tindakan_Ralan",
    "Utang_KSO_Tindakan_Ralan",
    "Beban_Jasa_Sarana_Tindakan_Ralan",
    "Utang_Jasa_Sarana_Tindakan_Ralan",
    "HPP_BHP_Tindakan_Ralan",
    "Persediaan_BHP_Tindakan_Ralan",
    "Beban_Jasa_Menejemen_Tindakan_Ralan",
    "Utang_Jasa_Menejemen_Tindakan_Ralan",
    "Suspen_Piutang_Laborat_Ralan",
    "Laborat_Ralan",
    "Beban_Jasa_Medik_Dokter_Laborat_Ralan",
    "Utang_Jasa_Medik_Dokter_Laborat_Ralan",
    "Beban_Jasa_Medik_Petugas_Laborat_Ralan",
    "Utang_Jasa_Medik_Petugas_Laborat_Ralan",
    "Beban_Kso_Laborat_Ralan",
    "Utang_Kso_Laborat_Ralan",
    "HPP_Persediaan_Laborat_Rawat_Jalan",
    "Persediaan_BHP_Laborat_Rawat_Jalan",
    "Beban_Jasa_Sarana_Laborat_Ralan",
    "Utang_Jasa_Sarana_Laborat_Ralan",
    "Beban_Jasa_Perujuk_Laborat_Ralan",
    "Utang_Jasa_Perujuk_Laborat_Ralan",
    "Beban_Jasa_Menejemen_Laborat_Ralan",
    "Utang_Jasa_Menejemen_Laborat_Ralan",
    "Suspen_Piutang_Radiologi_Ralan",
    "Radiologi_Ralan",
    "Beban_Jasa_Medik_Dokter_Radiologi_Ralan",
    "Utang_Jasa_Medik_Dokter_Radiologi_Ralan",
    "Beban_Jasa_Medik_Petugas_Radiologi_Ralan",
    "Utang_Jasa_Medik_Petugas_Radiologi_Ralan",
    "Beban_Kso_Radiologi_Ralan",
    "Utang_Kso_Radiologi_Ralan",
    "HPP_Persediaan_Radiologi_Rawat_Jalan",
    "Persediaan_BHP_Radiologi_Rawat_Jalan",
    "Beban_Jasa_Sarana_Radiologi_Ralan",
    "Utang_Jasa_Sarana_Radiologi_Ralan",
    "Beban_Jasa_Perujuk_Radiologi_Ralan",
    "Utang_Jasa_Perujuk_Radiologi_Ralan",
    "Beban_Jasa_Menejemen_Radiologi_Ralan",
    "Utang_Jasa_Menejemen_Radiologi_Ralan",
    "Suspen_Piutang_Obat_Ralan",
    "Obat_Ralan",
    "HPP_Obat_Rawat_Jalan",
    "Persediaan_Obat_Rawat_Jalan",
    "Registrasi_Ralan",
    "Suspen_Piutang_Operasi_Ralan",
    "Operasi_Ralan",
    "Beban_Jasa_Medik_Dokter_Operasi_Ralan",
    "Utang_Jasa_Medik_Dokter_Operasi_Ralan",
    "Beban_Jasa_Medik_Paramedis_Operasi_Ralan",
    "Utang_Jasa_Medik_Paramedis_Operasi_Ralan",
    "HPP_Obat_Operasi_Ralan",
    "Persediaan_Obat_Kamar_Operasi_Ralan",
    "Tambahan_Ralan",
    "Potongan_Ralan",
];
const COLS_RANAP = [
    "Suspen_Piutang_Tindakan_Ranap",
    "Tindakan_Ranap",
    "Beban_Jasa_Medik_Dokter_Tindakan_Ranap",
    "Utang_Jasa_Medik_Dokter_Tindakan_Ranap",
    "Beban_Jasa_Medik_Paramedis_Tindakan_Ranap",
    "Utang_Jasa_Medik_Paramedis_Tindakan_Ranap",
    "Beban_KSO_Tindakan_Ranap",
    "Utang_KSO_Tindakan_Ranap",
    "Beban_Jasa_Sarana_Tindakan_Ranap",
    "Utang_Jasa_Sarana_Tindakan_Ranap",
    "Beban_Jasa_Menejemen_Tindakan_Ranap",
    "Utang_Jasa_Menejemen_Tindakan_Ranap",
    "HPP_BHP_Tindakan_Ranap",
    "Persediaan_BHP_Tindakan_Ranap",
    "Suspen_Piutang_Laborat_Ranap",
    "Laborat_Ranap",
    "Beban_Jasa_Medik_Dokter_Laborat_Ranap",
    "Utang_Jasa_Medik_Dokter_Laborat_Ranap",
    "Beban_Jasa_Medik_Petugas_Laborat_Ranap",
    "Utang_Jasa_Medik_Petugas_Laborat_Ranap",
    "Beban_Kso_Laborat_Ranap",
    "Utang_Kso_Laborat_Ranap",
    "HPP_Persediaan_Laborat_Rawat_inap",
    "Persediaan_BHP_Laborat_Rawat_Inap",
    "Beban_Jasa_Sarana_Laborat_Ranap",
    "Utang_Jasa_Sarana_Laborat_Ranap",
    "Beban_Jasa_Perujuk_Laborat_Ranap",
    "Utang_Jasa_Perujuk_Laborat_Ranap",
    "Beban_Jasa_Menejemen_Laborat_Ranap",
    "Utang_Jasa_Menejemen_Laborat_Ranap",
    "Suspen_Piutang_Radiologi_Ranap",
    "Radiologi_Ranap",
    "Beban_Jasa_Medik_Dokter_Radiologi_Ranap",
    "Utang_Jasa_Medik_Dokter_Radiologi_Ranap",
    "Beban_Jasa_Medik_Petugas_Radiologi_Ranap",
    "Utang_Jasa_Medik_Petugas_Radiologi_Ranap",
    "Beban_Kso_Radiologi_Ranap",
    "Utang_Kso_Radiologi_Ranap",
    "HPP_Persediaan_Radiologi_Rawat_Inap",
    "Persediaan_BHP_Radiologi_Rawat_Inap",
    "Beban_Jasa_Sarana_Radiologi_Ranap",
    "Utang_Jasa_Sarana_Radiologi_Ranap",
    "Beban_Jasa_Perujuk_Radiologi_Ranap",
    "Utang_Jasa_Perujuk_Radiologi_Ranap",
    "Beban_Jasa_Menejemen_Radiologi_Ranap",
    "Utang_Jasa_Menejemen_Radiologi_Ranap",
    "Suspen_Piutang_Obat_Ranap",
    "Obat_Ranap",
    "HPP_Obat_Rawat_Inap",
    "Persediaan_Obat_Rawat_Inap",
    "Registrasi_Ranap",
    "Service_Ranap",
    "Tambahan_Ranap",
    "Potongan_Ranap",
    "Retur_Obat_Ranap",
    "Resep_Pulang_Ranap",
    "Kamar_Inap",
    "Suspen_Piutang_Operasi_Ranap",
    "Operasi_Ranap",
    "Beban_Jasa_Medik_Dokter_Operasi_Ranap",
    "Utang_Jasa_Medik_Dokter_Operasi_Ranap",
    "Beban_Jasa_Medik_Paramedis_Operasi_Ranap",
    "Utang_Jasa_Medik_Paramedis_Operasi_Ranap",
    "HPP_Obat_Operasi_Ranap",
];
const COLS_RANAP2 = [
    "Persediaan_Obat_Kamar_Operasi_Ranap",
    "Harian_Ranap",
    "Uang_Muka_Ranap",
    "Piutang_Pasien_Ranap",
    "Sisa_Uang_Muka_Ranap",
];

const humanize = (key) => (key || "").replace(/_/g, " ");

function SectionForm({
    sectionKey,
    title,
    columns,
    data,
    onChange,
    onSave,
    isSaving,
}) {
    const [filter, setFilter] = useState("");
    const [detailsByCol, setDetailsByCol] = useState({});
    const visibleCols = useMemo(() => {
        const term = filter.trim().toLowerCase();
        if (!term) return columns;
        return columns.filter((c) => humanize(c).toLowerCase().includes(term));
    }, [filter, columns]);

    // Hitung jumlah perubahan (dibanding data awal yang disediakan via prop data.original)
    const changedCount = useMemo(() => {
        const orig = data?.original || {};
        const cur = data?.current || {};
        let n = 0;
        columns.forEach((c) => {
            if ((orig?.[c] || "") !== (cur?.[c] || "")) n += 1;
        });
        return n;
    }, [data, columns]);

    const handleResetToOriginal = () => {
        const orig = data?.original || {};
        onChange(sectionKey, orig);
        setDetailsByCol({});
    };

    // Prefetch detail rekening untuk nilai awal (kd_rek sudah terisi) agar Nama Akun, Tipe, Balance muncul
    useEffect(() => {
        let cancelled = false;
        const cur = data?.current || {};
        const doFetch = async () => {
            const tasks = [];
            const collected = {};
            columns.forEach((col) => {
                const kd = cur?.[col];
                if (!kd) return;
                if (detailsByCol[col]) return; // sudah ada detail
                tasks.push(
                    (async () => {
                        try {
                            const params = new URLSearchParams({
                                limit: "10",
                                q: kd,
                            });
                            const res = await fetch(
                                `/api/akutansi/pengaturan-rekening/rekening?${params.toString()}`,
                                { headers: { Accept: "application/json" } }
                            );
                            const json = await res.json();
                            const items = Array.isArray(json?.items)
                                ? json.items
                                : [];
                            const match =
                                items.find((it) => it?.kd_rek === kd) ||
                                items[0] ||
                                null;
                            if (match) {
                                collected[col] = {
                                    kd_rek: match?.kd_rek || kd,
                                    nm_rek: match?.nm_rek || "",
                                    tipe: match?.tipe || "",
                                    balance: match?.balance || "",
                                    level: match?.level ?? null,
                                };
                            }
                        } catch {}
                    })()
                );
            });
            if (tasks.length > 0) {
                await Promise.all(tasks);
                if (!cancelled)
                    setDetailsByCol((prev) => ({ ...prev, ...collected }));
            }
        };
        doFetch();
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(data?.current), columns.join(",")]);

    return (
        <Card title={title}>
            <div className="mb-4 flex items-end gap-3">
                <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                        Filter kolom
                    </label>
                    <input
                        type="text"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Ketik nama kolom, mis. Obat, Radiologi, Laborat…"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleResetToOriginal}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    <RefreshCw className="w-4 h-4" /> Reset ke nilai awal
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700 border-b">
                                Letak Akun Rekening
                            </th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700 border-b">
                                Kode Akun
                            </th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700 border-b">
                                Nama Akun
                            </th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700 border-b">
                                Tipe
                            </th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700 border-b">
                                Balance
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleCols.map((col) => {
                            const curVal = data?.current?.[col] || "";
                            const fallback = curVal ? `${curVal}` : null;
                            const info = detailsByCol[col] || {};
                            return (
                                <tr
                                    key={col}
                                    className="odd:bg-white even:bg-gray-50"
                                >
                                    <td className="px-3 py-2 align-middle text-gray-800">
                                        {humanize(col)}
                                    </td>
                                    <td className="px-3 py-2 align-middle">
                                        <SearchableSelect
                                            source="rekening"
                                            value={curVal}
                                            onChange={(val) =>
                                                onChange(sectionKey, {
                                                    ...(data?.current || {}),
                                                    [col]: val,
                                                })
                                            }
                                            onSelect={(opt) =>
                                                setDetailsByCol((prev) => ({
                                                    ...prev,
                                                    [col]: opt,
                                                }))
                                            }
                                            placeholder="Pilih Rekening"
                                            searchPlaceholder="Cari rekening…"
                                            defaultDisplay={fallback}
                                        />
                                    </td>
                                    <td className="px-3 py-2 align-middle text-gray-700">
                                        {info?.nm_rek || "-"}
                                    </td>
                                    <td className="px-3 py-2 align-middle text-gray-700">
                                        {info?.tipe || "-"}
                                    </td>
                                    <td className="px-3 py-2 align-middle text-gray-700">
                                        {info?.balance || "-"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="mt-5 flex items-center gap-3">
                <button
                    type="button"
                    disabled={isSaving || changedCount === 0}
                    onClick={() => onSave(sectionKey)}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    <Save className="w-4 h-4" /> Simpan Perubahan (
                    {changedCount})
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Tip: Hanya kolom yang berubah yang akan dikirim ke server.
                    Semua nilai wajib berupa kode rekening (kd_rek) yang valid.
                </p>
            </div>
        </Card>
    );
}

export default function PengaturanRekeningPage() {
    const [activeTab, setActiveTab] = useState("umum"); // umum | ralan | ranap
    const [saving, setSaving] = useState(false);
    const [payload, setPayload] = useState({
        umum: { original: {}, current: {} },
        umum2: { original: {}, current: {} },
        ralan: { original: {}, current: {} },
        ranap: { original: {}, current: {} },
        ranap2: { original: {}, current: {} },
    });

    const loadAll = async () => {
        try {
            const res = await axios.get("/api/akutansi/pengaturan-rekening");
            const data = res.data || {};
            const next = { ...payload };
            // gunakan fallback daftar kolom untuk memastikan semua kolom tampil
            const apply = (key, cols) => {
                const row = data?.[key] || {};
                const original = {};
                cols.forEach((c) => {
                    original[c] = row?.[c] || "";
                });
                next[key] = { original, current: { ...original } };
            };
            apply("umum", COLS_UMUM);
            apply("umum2", COLS_UMUM2);
            apply("ralan", COLS_RALAN);
            apply("ranap", COLS_RANAP);
            apply("ranap2", COLS_RANAP2);
            setPayload(next);
        } catch (e) {
            console.error("Gagal memuat konfigurasi:", e);
            alert("Gagal memuat Pengaturan Rekening. Periksa konsol.");
        }
    };

    useEffect(() => {
        loadAll();
    }, []);

    const handleChange = (sectionKey, newCurrentOrObj) => {
        setPayload((prev) => ({
            ...prev,
            [sectionKey]: {
                original: prev[sectionKey]?.original || {},
                current:
                    typeof newCurrentOrObj === "object"
                        ? newCurrentOrObj
                        : {
                              ...(prev[sectionKey]?.current || {}),
                              value: newCurrentOrObj,
                          },
            },
        }));
    };

    const buildChanges = (sectionKey) => {
        const orig = payload[sectionKey]?.original || {};
        const cur = payload[sectionKey]?.current || {};
        const changes = {};
        Object.keys(cur).forEach((k) => {
            if ((orig[k] || "") !== (cur[k] || "")) changes[k] = cur[k] || null;
        });
        return changes;
    };

    const saveSection = async (sectionKey) => {
        const changes = buildChanges(sectionKey);
        if (Object.keys(changes).length === 0) {
            alert("Tidak ada perubahan untuk disimpan.");
            return;
        }
        setSaving(true);
        try {
            const res = await axios.put(
                `/api/akutansi/pengaturan-rekening/${encodeURIComponent(
                    sectionKey
                )}`,
                changes
            );
            const fresh = res.data?.data || {};
            // reset original = fresh, current = fresh
            setPayload((prev) => ({
                ...prev,
                [sectionKey]: {
                    original: {
                        ...(prev[sectionKey]?.original || {}),
                        ...fresh,
                    },
                    current: { ...(prev[sectionKey]?.current || {}), ...fresh },
                },
            }));
        } catch (e) {
            const msg =
                e?.response?.data?.message ||
                "Gagal menyimpan. Periksa konsol.";
            const errors = e?.response?.data?.errors;
            if (errors && typeof errors === "object") {
                const firstKey = Object.keys(errors)[0];
                alert(`${msg}\nKolom bermasalah: ${firstKey}`);
            } else {
                alert(msg);
            }
            console.error("Simpan section gagal:", e);
        } finally {
            setSaving(false);
        }
    };

    // UI tab header
    const TabButton = ({ value, label }) => (
        <button
            type="button"
            onClick={() => setActiveTab(value)}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                activeTab === value
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50"
            }`}
        >
            {label}
        </button>
    );

    return (
        <div>
            <Head title="Keuangan - Pengaturan Rekening/COA" />

            <div className="space-y-6">
                {/* Header */}
                <Card>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Pengaturan Rekening / COA
                            </h1>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Map kolom transaksi ke Kode Rekening. Nilai
                                harus berupa kd_rek yang valid.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <TabButton value="umum" label="Umum" />
                            <TabButton value="ralan" label="Ralan" />
                            <TabButton value="ranap" label="Ranap" />
                        </div>
                    </div>
                </Card>

                {/* Content */}
                {activeTab === "umum" && (
                    <div className="space-y-6">
                        <SectionForm
                            sectionKey="umum"
                            title="Set Akun (Umum)"
                            columns={COLS_UMUM}
                            data={payload.umum}
                            onChange={handleChange}
                            onSave={saveSection}
                            isSaving={saving}
                        />
                        <SectionForm
                            sectionKey="umum2"
                            title="Set Akun 2 (Tambahan)"
                            columns={COLS_UMUM2}
                            data={payload.umum2}
                            onChange={handleChange}
                            onSave={saveSection}
                            isSaving={saving}
                        />
                    </div>
                )}

                {activeTab === "ralan" && (
                    <SectionForm
                        sectionKey="ralan"
                        title="Set Akun Rawat Jalan"
                        columns={COLS_RALAN}
                        data={payload.ralan}
                        onChange={handleChange}
                        onSave={saveSection}
                        isSaving={saving}
                    />
                )}

                {activeTab === "ranap" && (
                    <div className="space-y-6">
                        <SectionForm
                            sectionKey="ranap"
                            title="Set Akun Rawat Inap"
                            columns={COLS_RANAP}
                            data={payload.ranap}
                            onChange={handleChange}
                            onSave={saveSection}
                            isSaving={saving}
                        />
                        <SectionForm
                            sectionKey="ranap2"
                            title="Set Akun Rawat Inap (Tambahan)"
                            columns={COLS_RANAP2}
                            data={payload.ranap2}
                            onChange={handleChange}
                            onSave={saveSection}
                            isSaving={saving}
                        />
                    </div>
                )}

                <Card>
                    <div className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <Info className="w-4 h-4 mt-0.5" />
                        <div>
                            <p>
                                Validasi otomatis akan memastikan setiap kolom
                                yang Anda kirim berisi kd_rek yang ada di tabel
                                rekening. Kolom yang tidak Anda ubah tidak akan
                                dikirim.
                            </p>
                            <p className="mt-1">
                                Update dilakukan massal pada satu baris
                                konfigurasi per tabel (tanpa WHERE) sesuai
                                asumsi basis data Khanza. Jika tabel belum
                                memiliki baris, sistem akan menyisipkan baris
                                kosong terlebih dahulu saat penyimpanan.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

PengaturanRekeningPage.layout = (page) => (
    <SidebarKeuangan title="Keuangan" children={page} />
);
