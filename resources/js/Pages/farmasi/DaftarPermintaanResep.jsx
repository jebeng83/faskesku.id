import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import SidebarFarmasi from "@/Layouts/SidebarFarmasi";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/Card";
import Button from "@/Components/ui/Button";
import Input from "@/Components/ui/Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/Select";
import Badge from "@/Components/ui/Badge";
import { Filter, Search, Eye, ClipboardList, Pill } from "lucide-react";

/**
 * Daftar Permintaan Resep
 *
 * Catatan:
 * - Backend saat ini belum memiliki endpoint daftar global, jadi halaman ini menyediakan pencarian berdasarkan no_rawat atau no_rkm_medis.
 * - Untuk no_rawat gunakan GET /api/resep/rawat/{no_rawat}
 * - Untuk no_rkm_medis gunakan GET /api/resep/pasien/{no_rkm_medis}?limit=N
 * - Kolom Validasi belum tersedia di model saat ini; yang ditampilkan adalah status penyerahan.
 */
const DaftarPermintaanResep = () => {
    const todayStr = () => {
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    };
    const minusDaysStr = (days) => {
        const d = new Date();
        d.setDate(d.getDate() - days);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    };

    const [filters, setFilters] = useState({
        jenis: "ralan",
        start_date: todayStr(),
        end_date: todayStr(),
        dokter: "",
        poli: "",
        // mengikuti pola Java: filter status terlayani (Semua/Belum/Sudah)
        status_perawatan: "Semua",
        // pencarian bebas
        q: "",
        // parameter tambahan untuk ranap
        kd_bangsal: "",
        kd_depo: "",
        // pencarian langsung
        no_rawat: "",
        no_rkm_medis: "",
        // paginasi sederhana
        limit: 10,
        page: 1,
    });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedResep, setSelectedResep] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [saving, setSaving] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    // Context tambahan untuk modal detail (mis. kd_poli/kd_bangsal dari baris daftar)
    const [detailContext, setDetailContext] = useState({
        kd_poli: "",
        kd_bangsal: "",
    });
    // Cache stok info per item obat (map: kode_brng -> {loading, data, error, expanded})
    const [stokInfoMap, setStokInfoMap] = useState({});

    useEffect(() => {
        // Restore last used filters
        try {
            const saved = localStorage.getItem("permintaanResepFilters");
            if (saved) setFilters(JSON.parse(saved));
        } catch (_) {}
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(
                "permintaanResepFilters",
                JSON.stringify(filters)
            );
        } catch (_) {}
    }, [filters]);

    const handleFilterChange = (key, value) => {
        setError("");
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const fetchByNoRawat = async () => {
        setLoading(true);
        setError("");
        try {
            const params = new URLSearchParams({
                no_rawat: String(filters.no_rawat || ""),
            });
            const resp = await fetch(`/api/resep/rawat?${params}`);
            const json = await resp.json();
            if (!json.success) {
                throw new Error(json.message || "Gagal memuat data resep");
            }
            // API mengembalikan array resep untuk no_rawat tersebut
            setData(json.data || []);
        } catch (e) {
            setError(e.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchByNoRkmMedis = async () => {
        setLoading(true);
        setError("");
        try {
            const params = new URLSearchParams({
                limit: String(filters.limit || 10),
            });
            const resp = await fetch(
                `/api/resep/pasien/${encodeURIComponent(
                    filters.no_rkm_medis
                )}?${params}`
            );
            const json = await resp.json();
            if (!json.success) {
                throw new Error(
                    json.message || "Gagal memuat data resep pasien"
                );
            }
            setData(json.data || []);
        } catch (e) {
            setError(e.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchList = async () => {
        setLoading(true);
        setError("");
        try {
            const params = new URLSearchParams({
                start_date: filters.start_date,
                end_date: filters.end_date,
                jenis: filters.jenis,
                limit: String(filters.limit || 10),
                page: String(filters.page || 1),
            });
            if (filters.dokter) params.set("dokter", filters.dokter);
            if (filters.poli) params.set("poli", filters.poli);
            if (filters.q) params.set("q", filters.q);
            // status_perawatan: kirim hanya jika bukan "Semua"
            if (
                filters.status_perawatan &&
                filters.status_perawatan !== "Semua"
            ) {
                params.set(
                    "status_perawatan",
                    filters.status_perawatan === "Belum Terlayani"
                        ? "Belum"
                        : "Sudah"
                );
            }
            // opsi khusus ranap
            if (filters.kd_bangsal)
                params.set("kd_bangsal", filters.kd_bangsal);
            if (filters.kd_depo) params.set("kd_depo", filters.kd_depo);

            const resp = await fetch(`/api/resep/list?${params.toString()}`);
            const json = await resp.json();
            if (!json.success) {
                throw new Error(json.message || "Gagal memuat daftar resep");
            }
            setData(json.data || []);
        } catch (e) {
            setError(e.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (filters.no_rawat) {
            fetchByNoRawat();
        } else if (filters.no_rkm_medis) {
            fetchByNoRkmMedis();
        } else {
            fetchList();
        }
    };

    const openDetail = async (noResep, rowContext = {}) => {
        try {
            const resp = await fetch(
                `/api/resep/${encodeURIComponent(noResep)}`
            );
            const json = await resp.json();
            if (json.success) {
                setSelectedResep(json.data);
                setShowDetail(true);
                setDetailContext({
                    kd_poli: rowContext?.kd_poli || "",
                    kd_bangsal: rowContext?.kd_bangsal || "",
                });
                // Reset stok info cache ketika membuka resep baru
                setStokInfoMap({});
            }
        } catch (e) {}
    };

    // Ambil stok info per item obat
    const fetchStokInfo = async (kodeBrng) => {
        // Hindari fetch berulang jika sudah ada dan bukan loading
        setStokInfoMap((prev) => {
            const current = prev[kodeBrng] || {};
            return {
                ...prev,
                [kodeBrng]: {
                    ...current,
                    loading: true,
                    error: "",
                    expanded: true,
                },
            };
        });
        try {
            const params = new URLSearchParams({ kode_brng: kodeBrng });
            if (detailContext?.kd_poli)
                params.set("kd_poli", detailContext.kd_poli);
            const resp = await fetch(
                `/api/resep/stok-info?${params.toString()}`
            );
            const json = await resp.json();
            setStokInfoMap((prev) => ({
                ...prev,
                [kodeBrng]: {
                    loading: false,
                    data: json.success ? json.data : null,
                    error: json.success
                        ? ""
                        : json.message || "Gagal memuat stok",
                    expanded: true,
                },
            }));
        } catch (e) {
            setStokInfoMap((prev) => ({
                ...prev,
                [kodeBrng]: {
                    loading: false,
                    data: null,
                    error: e.message || "Gagal memuat stok",
                    expanded: true,
                },
            }));
        }
    };

    // Toggle tampilan stok per item
    const toggleStokInfo = (kodeBrng) => {
        setStokInfoMap((prev) => {
            const cur = prev[kodeBrng];
            // Jika belum ada data, lakukan fetch pertama kali
            if (!cur) {
                // Optimistic state: set expanded dan loading; fetch async
                return {
                    ...prev,
                    [kodeBrng]: {
                        loading: true,
                        data: null,
                        error: "",
                        expanded: true,
                    },
                };
            }
            return { ...prev, [kodeBrng]: { ...cur, expanded: !cur.expanded } };
        });
        // Jika belum pernah fetch, panggil API
        const cur = stokInfoMap[kodeBrng];
        if (!cur) {
            fetchStokInfo(kodeBrng);
        }
    };

    const handlePenyerahan = async () => {
        if (!selectedResep) return;
        setSaving(true);
        try {
            // Siapkan payload untuk mengirim perubahan Embalase/Tuslah (non-racikan) yang diedit
            const buildPenyerahanPayload = (res) => {
                const payload = {
                    embalase_tuslah: {
                        non_racikan: [],
                    },
                };
                const nonR = Array.isArray(res?.detail_obat)
                    ? res.detail_obat
                    : [];
                for (const it of nonR) {
                    payload.embalase_tuslah.non_racikan.push({
                        kode_brng: it.kode_brng,
                        embalase: Number(it.embalase || 0),
                        tuslah: Number(it.tuslah || 0),
                    });
                }
                return payload;
            };

            const payload = buildPenyerahanPayload(selectedResep);
            const resp = await fetch(
                `/api/resep/${encodeURIComponent(
                    selectedResep.no_resep
                )}/penyerahan`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    // Backend telah memproses perubahan embalase/tuslah untuk item non-racikan.
                    // Dukungan untuk racikan akan ditambahkan kemudian.
                    body: JSON.stringify(payload),
                }
            );
            const json = await resp.json();
            if (!json.success) {
                throw new Error(json.message || "Gagal memproses penyerahan");
            }
            // Perbarui informasi penyerahan, validasi, dan status pada modal dan daftar
            const now = new Date();
            const yyyy = now.getFullYear();
            const mm = String(now.getMonth() + 1).padStart(2, "0");
            const dd = String(now.getDate()).padStart(2, "0");
            const hh = String(now.getHours()).padStart(2, "0");
            const mi = String(now.getMinutes()).padStart(2, "0");
            const ss = String(now.getSeconds()).padStart(2, "0");
            const todayISO = `${yyyy}-${mm}-${dd}`;
            const timeStr = `${hh}:${mi}:${ss}`;

            const tglPenyerahanBaru = json.data?.tgl_penyerahan || todayISO;
            const jamPenyerahanBaru = json.data?.jam_penyerahan || timeStr;
            const tglValidasiBaru = json.data?.tgl_validasi || todayISO;
            const jamValidasiBaru = json.data?.jam_validasi || timeStr;

            setSelectedResep((prev) => ({
                ...prev,
                tgl_penyerahan: tglPenyerahanBaru,
                jam_penyerahan: jamPenyerahanBaru,
                // Tgl/Jam Validasi: gunakan kolom yang tersedia pada model saat ini (tgl_perawatan & jam)
                tgl_perawatan: tglValidasiBaru,
                jam: jamValidasiBaru,
                status_perawatan: "Sudah Terlayani",
            }));

            // Sinkronkan juga ke list hasil pencarian agar baris ikut hijau
            setData((prev) => {
                if (!Array.isArray(prev)) return prev;
                return prev.map((row) => {
                    if (row.no_resep !== selectedResep.no_resep) return row;
                    return {
                        ...row,
                        tgl_penyerahan: tglPenyerahanBaru,
                        jam_penyerahan: jamPenyerahanBaru,
                        // Tgl/Jam Validasi pada list menggunakan tgl_perawatan & jam
                        tgl_perawatan: tglValidasiBaru,
                        jam: jamValidasiBaru,
                        status_perawatan: "Sudah Terlayani",
                    };
                });
            });
            setConfirmOpen(false);
            alert("Penyerahan obat berhasil diproses.");
        } catch (e) {
            alert(e.message);
        } finally {
            setSaving(false);
        }
    };

    const formatDate = (str) => {
        if (!str || str === "0000-00-00") return "-";
        try {
            const d = new Date(str);
            return `${String(d.getDate()).padStart(2, "0")}/${String(
                d.getMonth() + 1
            ).padStart(2, "0")}/${d.getFullYear()}`;
        } catch {
            return str;
        }
    };

    const formatTime = (str) => {
        if (!str || str === "00:00:00") return "-";
        return str;
    };

    const formatRupiah = (num) => {
        const n = Number(num || 0);
        return n.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });
    };

    const computeTotals = (res) => {
        if (!res)
            return {
                subtotal: 0,
                tambahan_total: 0,
                ppn: 0,
                total_plus_ppn: 0,
                ppn_rate: 0.11,
            };
        const ppnRate = typeof res.ppn_rate === "number" ? res.ppn_rate : 0.11;

        // Kumpulkan item non-racikan
        const nonRacikan = Array.isArray(res.detail_obat)
            ? res.detail_obat
            : [];
        const subtotalNonRacikan = nonRacikan.reduce((acc, it) => {
            const sub =
                typeof it.subtotal === "number"
                    ? it.subtotal
                    : Number(it.tarif || 0) * Number(it.jml || 0);
            return acc + sub;
        }, 0);
        const tambahanNonRacikan = nonRacikan.reduce((acc, it) => {
            const emb = Number(it.embalase || 0);
            const tus = Number(it.tuslah || 0);
            return acc + emb + tus;
        }, 0);

        // Kumpulkan item racikan (detail dalam setiap grup)
        const racikanGroups = Array.isArray(res.racikan) ? res.racikan : [];
        const { subtotalRacikan, tambahanRacikan } = racikanGroups.reduce(
            (acc, grp) => {
                const details = Array.isArray(grp?.details) ? grp.details : [];
                for (const d of details) {
                    const sub =
                        typeof d.subtotal === "number"
                            ? d.subtotal
                            : Number(d.tarif || 0) * Number(d.jml || 0);
                    const emb = Number(d.embalase || 0);
                    const tus = Number(d.tuslah || 0);
                    acc.subtotalRacikan += sub;
                    acc.tambahanRacikan += emb + tus;
                }
                return acc;
            },
            { subtotalRacikan: 0, tambahanRacikan: 0 }
        );

        const subtotalFallback = subtotalNonRacikan + subtotalRacikan;
        const tambahanFallback = tambahanNonRacikan + tambahanRacikan;
        const ppnFallback = Math.round(subtotalFallback * ppnRate);
        const totalPlusPpnFallback =
            subtotalFallback + tambahanFallback + ppnFallback;

        return {
            subtotal:
                typeof res.subtotal === "number"
                    ? res.subtotal
                    : subtotalFallback,
            tambahan_total:
                typeof res.tambahan_total === "number"
                    ? res.tambahan_total
                    : tambahanFallback,
            ppn: typeof res.ppn === "number" ? res.ppn : ppnFallback,
            total_plus_ppn:
                typeof res.total_plus_ppn === "number"
                    ? res.total_plus_ppn
                    : totalPlusPpnFallback,
            ppn_rate: ppnRate,
        };
    };

    // Edit biaya tambahan per item (non-racikan)
    const updateNonRacikanCharge = (index, key, value) => {
        setSelectedResep((prev) => {
            if (!prev) return prev;
            const list = Array.isArray(prev.detail_obat)
                ? [...prev.detail_obat]
                : [];
            if (!list[index]) return prev;
            const item = { ...list[index] };
            const num = Number(value ?? 0);
            item[key] = Number.isFinite(num) && num >= 0 ? num : 0;
            list[index] = item;
            return { ...prev, detail_obat: list };
        });
    };

    // Edit biaya tambahan per item dalam racikan
    const updateRacikanCharge = (gidx, idx, key, value) => {
        setSelectedResep((prev) => {
            if (!prev) return prev;
            const groups = Array.isArray(prev.racikan)
                ? prev.racikan.map((g) => ({ ...g }))
                : [];
            if (!groups[gidx]) return prev;
            const grp = { ...groups[gidx] };
            const details = Array.isArray(grp.details) ? [...grp.details] : [];
            if (!details[idx]) return prev;
            const item = { ...details[idx] };
            const num = Number(value ?? 0);
            item[key] = Number.isFinite(num) && num >= 0 ? num : 0;
            details[idx] = item;
            grp.details = details;
            groups[gidx] = grp;
            return { ...prev, racikan: groups };
        });
    };

    return (
        <SidebarFarmasi title="Farmasi">
            <Head title="Daftar Permintaan Resep" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Daftar Permintaan Resep
                        </h1>
                        <p className="text-gray-600">
                            Muat permintaan resep berdasarkan No. Rawat atau No.
                            RM pasien
                        </p>
                    </div>
                </div>

                {/* Filter Section */}
                <Card className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                    <CardHeader className="relative bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50">
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Filter Pencarian
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    Jenis
                                </label>
                                <Select
                                    value={filters.jenis}
                                    onValueChange={(v) =>
                                        handleFilterChange("jenis", v)
                                    }
                                >
                                    <SelectTrigger className="focus:ring-2 focus:ring-blue-500/50 border-gray-300 dark:border-gray-600">
                                        <SelectValue placeholder="Pilih jenis" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ralan">
                                            Rawat Jalan
                                        </SelectItem>
                                        <SelectItem value="ranap">
                                            Rawat Inap
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    Tgl. Awal
                                </label>
                                <Input
                                    type="date"
                                    value={filters.start_date}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "start_date",
                                            e.target.value
                                        )
                                    }
                                    className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    Tgl. Akhir
                                </label>
                                <Input
                                    type="date"
                                    value={filters.end_date}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "end_date",
                                            e.target.value
                                        )
                                    }
                                    className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    No. Rawat
                                </label>
                                <Input
                                    placeholder="YYYY/MM/DD/NNNNN"
                                    value={filters.no_rawat}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "no_rawat",
                                            e.target.value
                                        )
                                    }
                                    className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    No. RM (No. Rekam Medis)
                                </label>
                                <Input
                                    placeholder="Contoh: 000123"
                                    value={filters.no_rkm_medis}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "no_rkm_medis",
                                            e.target.value
                                        )
                                    }
                                    className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    Dokter (nm_dokter)
                                </label>
                                <Input
                                    placeholder="Cari dokter"
                                    value={filters.dokter}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "dokter",
                                            e.target.value
                                        )
                                    }
                                    className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    Poli/Bangsal
                                </label>
                                <Input
                                    placeholder="Cari poli atau bangsal"
                                    value={filters.poli}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "poli",
                                            e.target.value
                                        )
                                    }
                                    className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    Status Terlayani
                                </label>
                                <Select
                                    value={filters.status_perawatan}
                                    onValueChange={(v) =>
                                        handleFilterChange(
                                            "status_perawatan",
                                            v
                                        )
                                    }
                                >
                                    <SelectTrigger className="focus:ring-2 focus:ring-blue-500/50 border-gray-300 dark:border-gray-600">
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Semua">
                                            Semua
                                        </SelectItem>
                                        <SelectItem value="Belum Terlayani">
                                            Belum Terlayani
                                        </SelectItem>
                                        <SelectItem value="Sudah Terlayani">
                                            Sudah Terlayani
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {filters.jenis === "ranap" && (
                                <>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                            Kode Bangsal (opsional)
                                        </label>
                                        <Input
                                            placeholder="Misal: B01"
                                            value={filters.kd_bangsal}
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    "kd_bangsal",
                                                    e.target.value
                                                )
                                            }
                                            className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                            Kode Depo (opsional)
                                        </label>
                                        <Input
                                            placeholder="Misal: D01"
                                            value={filters.kd_depo}
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    "kd_depo",
                                                    e.target.value
                                                )
                                            }
                                            className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                        />
                                    </div>
                                </>
                            )}
                            <div className="md:col-span-2 lg:col-span-3">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    Pencarian bebas (No
                                    Resep/Rawat/RM/Pasien/Dokter/Penjamin)
                                </label>
                                <Input
                                    placeholder="Ketik kata kunci..."
                                    value={filters.q}
                                    onChange={(e) =>
                                        handleFilterChange("q", e.target.value)
                                    }
                                    className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                                    Limit
                                </label>
                                <Input
                                    type="number"
                                    min={1}
                                    max={50}
                                    value={filters.limit}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "limit",
                                            Number(e.target.value) || 10
                                        )
                                    }
                                    className="dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <Button
                                onClick={handleSearch}
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
                            >
                                <Search className="h-4 w-4" />
                                Cari
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700"
                                onClick={() => {
                                    setFilters({
                                        jenis: "ralan",
                                        start_date: todayStr(),
                                        end_date: todayStr(),
                                        dokter: "",
                                        poli: "",
                                        status_perawatan: "Semua",
                                        q: "",
                                        kd_bangsal: "",
                                        kd_depo: "",
                                        no_rawat: "",
                                        no_rkm_medis: "",
                                        limit: 10,
                                        page: 1,
                                    });
                                    setData([]);
                                    setError("");
                                }}
                            >
                                Reset
                            </Button>
                        </div>
                        {error && (
                            <div className="mt-3 text-sm text-red-600">
                                {error ||
                                    "Tips: Jika tidak memasukkan No. Rawat/RM, gunakan filter tanggal/dokter/poli lalu klik Cari untuk memuat daftar global."}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Data Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Hasil Pencarian</CardTitle>
                        <p className="text-sm text-gray-600">
                            Menampilkan {data.length} data resep
                        </p>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-200">
                                    <thead>
                                        <tr className="bg-stone-700 text-white">
                                            <th className="border border-gray-200 px-4 py-2 text-center">
                                                No. Resep
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-center">
                                                Tgl. Peresepan
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-center">
                                                Jam Peresepan
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-center">
                                                No. Rawat
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-center">
                                                No. RM
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-center">
                                                Pasien
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-center">
                                                Dokter Peresep
                                            </th>
                                            {filters.jenis === "ralan" ? (
                                                <th className="border border-gray-200 px-4 py-2 text-center">
                                                    Poli/Unit
                                                </th>
                                            ) : (
                                                <th className="border border-gray-200 px-4 py-2 text-center">
                                                    Ruang/Kamar
                                                </th>
                                            )}
                                            <th className="border border-gray-200 px-4 py-2 text-center">
                                                Status Terlayani
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-center">
                                                Jenis Bayar
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-center">
                                                Tgl. Validasi
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-center">
                                                Jam Validasi
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-center">
                                                Tgl. Penyerahan
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-center">
                                                Jam Penyerahan
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2 text-center">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={15}
                                                    className="border border-gray-200 px-4 py-8 text-center text-gray-500"
                                                >
                                                    Belum ada data. Masukkan No.
                                                    Rawat atau No. RM lalu klik
                                                    Cari atau gunakan filter
                                                    tanggal lalu klik Cari.
                                                </td>
                                            </tr>
                                        ) : (
                                            data.map((item) => {
                                                const statusLabel =
                                                    item.status_perawatan ===
                                                    "Sudah"
                                                        ? "Sudah Terlayani"
                                                        : item.status_perawatan ===
                                                          "Belum"
                                                        ? "Belum Terlayani"
                                                        : item.status_perawatan ||
                                                          "Belum Terlayani";
                                                const sudah =
                                                    statusLabel ===
                                                    "Sudah Terlayani";
                                                return (
                                                    <tr
                                                        key={item.no_resep}
                                                        className={`hover:bg-gray-50 ${
                                                            sudah
                                                                ? "bg-green-50"
                                                                : ""
                                                        }`}
                                                    >
                                                        <td className="border border-gray-200 px-4 py-2 font-mono">
                                                            {item.no_resep}
                                                        </td>
                                                        <td className="border border-gray-200 px-4 py-2">
                                                            {formatDate(
                                                                item.tgl_peresepan
                                                            )}
                                                        </td>
                                                        <td className="border border-gray-200 px-4 py-2">
                                                            {formatTime(
                                                                item.jam_peresepan
                                                            )}
                                                        </td>
                                                        <td className="border border-gray-200 px-4 py-2 font-mono">
                                                            {item.no_rawat}
                                                        </td>
                                                        <td className="border border-gray-200 px-4 py-2 text-center">
                                                            {item.no_rkm_medis ||
                                                                "-"}
                                                        </td>
                                                        <td className="border border-gray-200 px-4 py-2">
                                                            {item.nm_pasien ||
                                                                "-"}
                                                        </td>
                                                        <td className="border border-gray-200 px-4 py-2">
                                                            {item.nm_dokter ||
                                                                item.nama_dokter ||
                                                                "-"}
                                                        </td>
                                                        <td className="border border-gray-200 px-4 py-2">
                                                            {filters.jenis ===
                                                            "ralan"
                                                                ? item.nm_poli ||
                                                                  "-"
                                                                : item.nm_bangsal ||
                                                                  "-"}
                                                        </td>
                                                        <td className="border border-gray-200 px-4 py-2">
                                                            <Badge
                                                                variant="outline"
                                                                className={
                                                                    sudah
                                                                        ? "bg-green-100 text-green-800 border-green-300"
                                                                        : ""
                                                                }
                                                            >
                                                                {statusLabel}
                                                            </Badge>
                                                        </td>
                                                        <td className="border border-gray-200 px-4 py-2">
                                                            {item.png_jawab ||
                                                                "-"}
                                                        </td>
                                                        <td className="border border-gray-200 px-4 py-2">
                                                            {formatDate(
                                                                item.tgl_perawatan
                                                            )}
                                                        </td>
                                                        <td className="border border-gray-200 px-4 py-2">
                                                            {formatTime(
                                                                item.jam
                                                            )}
                                                        </td>
                                                        <td className="border border-gray-200 px-4 py-2">
                                                            {formatDate(
                                                                item.tgl_penyerahan
                                                            )}
                                                        </td>
                                                        <td className="border border-gray-200 px-4 py-2">
                                                            {formatTime(
                                                                item.jam_penyerahan
                                                            )}
                                                        </td>
                                                        <td className="border border-gray-200 px-4 py-2 text-center">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="flex items-center gap-1"
                                                                onClick={() =>
                                                                    openDetail(
                                                                        item.no_resep,
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <Eye className="h-3 w-3" />{" "}
                                                                Detail
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Detail Modal */}
                {showDetail && selectedResep && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Pill className="h-4 w-4" /> Detail Resep #
                                    {selectedResep.no_resep}
                                </h3>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowDetail(false)}
                                >
                                    Tutup
                                </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-gray-600">
                                        No. Rawat
                                    </div>
                                    <div className="font-mono">
                                        {selectedResep.no_rawat}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-600">Dokter</div>
                                    <div>
                                        {selectedResep.nama_dokter || "-"}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-600">Depo</div>
                                    <div>
                                        {selectedResep?.depo?.nm_bangsal || "-"}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-600">
                                        Tgl/Jam Peresepan
                                    </div>
                                    <div>
                                        {formatDate(
                                            selectedResep.tgl_peresepan
                                        )}{" "}
                                        {formatTime(
                                            selectedResep.jam_peresepan
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-600">
                                        Tgl/Jam Penyerahan
                                    </div>
                                    <div>
                                        {formatDate(
                                            selectedResep.tgl_penyerahan
                                        )}{" "}
                                        {formatTime(
                                            selectedResep.jam_penyerahan
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="text-sm font-medium mb-2">
                                    Detail Obat
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-200 text-sm">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border px-3 py-2 text-left">
                                                    Kode
                                                </th>
                                                <th className="border px-3 py-2 text-left">
                                                    Nama Obat
                                                </th>
                                                <th className="border px-3 py-2 text-left">
                                                    Satuan
                                                </th>
                                                <th className="border px-3 py-2 text-right">
                                                    Tarif
                                                </th>
                                                <th className="border px-3 py-2 text-right">
                                                    Jumlah
                                                </th>
                                                <th className="border px-3 py-2 text-left">
                                                    Aturan Pakai
                                                </th>
                                                <th className="border px-3 py-2 text-right">
                                                    Embalase
                                                </th>
                                                <th className="border px-3 py-2 text-right">
                                                    Tuslah
                                                </th>
                                                <th className="border px-3 py-2 text-right">
                                                    Total Item
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(selectedResep.detail_obat || [])
                                                .length === 0 ? (
                                                <tr>
                                                    <td
                                                        colSpan={9}
                                                        className="border px-3 py-4 text-center text-gray-500"
                                                    >
                                                        Belum ada item obat pada
                                                        resep ini.
                                                    </td>
                                                </tr>
                                            ) : (
                                                (
                                                    selectedResep.detail_obat ||
                                                    []
                                                ).map((d, idx) => (
                                                    <React.Fragment
                                                        key={d.kode_brng || idx}
                                                    >
                                                        <tr>
                                                            <td className="border px-3 py-2 font-mono">
                                                                {d.kode_brng}
                                                            </td>
                                                            <td className="border px-3 py-2">
                                                                {d.nama_brng ||
                                                                    "-"}
                                                            </td>
                                                            <td className="border px-3 py-2">
                                                                {d.satuan ||
                                                                    "-"}
                                                            </td>
                                                            <td className="border px-3 py-2 text-right">
                                                                {formatRupiah(
                                                                    d.tarif || 0
                                                                )}
                                                            </td>
                                                            <td className="border px-3 py-2 text-right">
                                                                {d.jml}
                                                            </td>
                                                            <td className="border px-3 py-2">
                                                                {d.aturan_pakai ||
                                                                    "-"}
                                                            </td>
                                                            <td className="border px-3 py-2 text-right">
                                                                <Input
                                                                    type="number"
                                                                    min={0}
                                                                    step="1"
                                                                    value={
                                                                        typeof d.embalase ===
                                                                        "number"
                                                                            ? d.embalase
                                                                            : Number(
                                                                                  d.embalase ||
                                                                                      0
                                                                              )
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateNonRacikanCharge(
                                                                            idx,
                                                                            "embalase",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="w-28 text-right"
                                                                />
                                                            </td>
                                                            <td className="border px-3 py-2 text-right">
                                                                <Input
                                                                    type="number"
                                                                    min={0}
                                                                    step="1"
                                                                    value={
                                                                        typeof d.tuslah ===
                                                                        "number"
                                                                            ? d.tuslah
                                                                            : Number(
                                                                                  d.tuslah ||
                                                                                      0
                                                                              )
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateNonRacikanCharge(
                                                                            idx,
                                                                            "tuslah",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="w-28 text-right"
                                                                />
                                                            </td>
                                                            <td className="border px-3 py-2 text-right">
                                                                {formatRupiah(
                                                                    typeof d.subtotal ===
                                                                        "number"
                                                                        ? d.subtotal
                                                                        : Number(
                                                                              d.tarif ||
                                                                                  0
                                                                          ) *
                                                                              Number(
                                                                                  d.jml ||
                                                                                      0
                                                                              )
                                                                )}
                                                            </td>
                                                        </tr>
                                                        {/* Stok Info (FIFO) per item non-racikan */}
                                                        <tr>
                                                            <td
                                                                colSpan={9}
                                                                className="border px-3 py-2 bg-gray-50"
                                                            >
                                                                <div className="flex items-center justify-between">
                                                                    <div className="text-xs text-gray-600">
                                                                        Validasi
                                                                        stok &
                                                                        batch
                                                                        FIFO
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={() =>
                                                                                toggleStokInfo(
                                                                                    d.kode_brng
                                                                                )
                                                                            }
                                                                        >
                                                                            {stokInfoMap[
                                                                                d
                                                                                    .kode_brng
                                                                            ]
                                                                                ?.expanded
                                                                                ? "Sembunyikan Stok"
                                                                                : "Tampilkan Stok"}
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                                {stokInfoMap[
                                                                    d.kode_brng
                                                                ]?.expanded && (
                                                                    <div className="mt-2">
                                                                        {stokInfoMap[
                                                                            d
                                                                                .kode_brng
                                                                        ]
                                                                            ?.loading ? (
                                                                            <div className="text-xs text-gray-600">
                                                                                Memuat
                                                                                stok...
                                                                            </div>
                                                                        ) : stokInfoMap[
                                                                              d
                                                                                  .kode_brng
                                                                          ]
                                                                              ?.error ? (
                                                                            <div className="text-xs text-red-600">
                                                                                {
                                                                                    stokInfoMap[
                                                                                        d
                                                                                            .kode_brng
                                                                                    ]
                                                                                        ?.error
                                                                                }
                                                                            </div>
                                                                        ) : (
                                                                            (() => {
                                                                                const info =
                                                                                    stokInfoMap[
                                                                                        d
                                                                                            .kode_brng
                                                                                    ]
                                                                                        ?.data;
                                                                                if (
                                                                                    !info
                                                                                )
                                                                                    return null;
                                                                                const batches =
                                                                                    Array.isArray(
                                                                                        info.batch_detail
                                                                                    )
                                                                                        ? info.batch_detail
                                                                                        : [];
                                                                                const perBangsal =
                                                                                    info.stok_per_bangsal ||
                                                                                    {};
                                                                                return (
                                                                                    <div className="space-y-2">
                                                                                        <div className="text-xs">
                                                                                            Total
                                                                                            stok
                                                                                            tersedia:{" "}
                                                                                            <span className="font-semibold">
                                                                                                {
                                                                                                    info.total_stok
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                        {/* Stok per bangsal */}
                                                                                        <div className="overflow-x-auto">
                                                                                            <table className="w-full text-xs border border-gray-200">
                                                                                                <thead>
                                                                                                    <tr className="bg-gray-100">
                                                                                                        <th className="border px-2 py-1 text-left">
                                                                                                            Bangsal
                                                                                                        </th>
                                                                                                        <th className="border px-2 py-1 text-right">
                                                                                                            Stok
                                                                                                        </th>
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                    {Object.keys(
                                                                                                        perBangsal
                                                                                                    )
                                                                                                        .length ===
                                                                                                    0 ? (
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                colSpan={
                                                                                                                    2
                                                                                                                }
                                                                                                                className="border px-2 py-1 text-center text-gray-500"
                                                                                                            >
                                                                                                                Tidak
                                                                                                                ada
                                                                                                                data
                                                                                                                bangsal
                                                                                                                terkait.
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    ) : (
                                                                                                        Object.entries(
                                                                                                            perBangsal
                                                                                                        ).map(
                                                                                                            ([
                                                                                                                bangsal,
                                                                                                                stok,
                                                                                                            ]) => (
                                                                                                                <tr
                                                                                                                    key={
                                                                                                                        bangsal
                                                                                                                    }
                                                                                                                >
                                                                                                                    <td className="border px-2 py-1 font-mono">
                                                                                                                        {
                                                                                                                            bangsal
                                                                                                                        }
                                                                                                                    </td>
                                                                                                                    <td className="border px-2 py-1 text-right">
                                                                                                                        {
                                                                                                                            stok
                                                                                                                        }
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            )
                                                                                                        )
                                                                                                    )}
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                        {/* Detail batch (FIFO) */}
                                                                                        <div className="overflow-x-auto">
                                                                                            <table className="w-full text-xs border border-gray-200 mt-2">
                                                                                                <thead>
                                                                                                    <tr className="bg-gray-100">
                                                                                                        <th className="border px-2 py-1 text-left">
                                                                                                            Bangsal
                                                                                                        </th>
                                                                                                        <th className="border px-2 py-1 text-left">
                                                                                                            Batch
                                                                                                        </th>
                                                                                                        <th className="border px-2 py-1 text-left">
                                                                                                            Faktur
                                                                                                        </th>
                                                                                                        <th className="border px-2 py-1 text-right">
                                                                                                            Stok
                                                                                                        </th>
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                    {batches.length ===
                                                                                                    0 ? (
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                colSpan={
                                                                                                                    4
                                                                                                                }
                                                                                                                className="border px-2 py-1 text-center text-gray-500"
                                                                                                            >
                                                                                                                Tidak
                                                                                                                ada
                                                                                                                batch
                                                                                                                aktif.
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    ) : (
                                                                                                        batches.map(
                                                                                                            (
                                                                                                                b,
                                                                                                                bi
                                                                                                            ) => (
                                                                                                                <tr
                                                                                                                    key={
                                                                                                                        bi
                                                                                                                    }
                                                                                                                >
                                                                                                                    <td className="border px-2 py-1 font-mono">
                                                                                                                        {
                                                                                                                            b.kd_bangsal
                                                                                                                        }
                                                                                                                    </td>
                                                                                                                    <td className="border px-2 py-1">
                                                                                                                        {b.no_batch ||
                                                                                                                            "-"}
                                                                                                                    </td>
                                                                                                                    <td className="border px-2 py-1">
                                                                                                                        {b.no_faktur ||
                                                                                                                            "-"}
                                                                                                                    </td>
                                                                                                                    <td className="border px-2 py-1 text-right">
                                                                                                                        {
                                                                                                                            b.stok
                                                                                                                        }
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            )
                                                                                                        )
                                                                                                    )}
                                                                                                </tbody>
                                                                                            </table>
                                                                                            <div className="text-[11px] text-gray-500 mt-1">
                                                                                                Pengurangan
                                                                                                stok
                                                                                                saat
                                                                                                penyerahan
                                                                                                menggunakan
                                                                                                urutan
                                                                                                FIFO
                                                                                                berdasarkan
                                                                                                batch.
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            })()
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {/* Racikan */}
                                {Array.isArray(selectedResep.racikan) &&
                                    selectedResep.racikan.length > 0 && (
                                        <div className="mt-6">
                                            <div className="text-sm font-medium mb-2">
                                                Detail Obat Racikan
                                            </div>
                                            {selectedResep.racikan.map(
                                                (grp, gidx) => (
                                                    <div
                                                        key={gidx}
                                                        className="mb-6"
                                                    >
                                                        <div className="flex items-center justify-between text-sm bg-gray-50 border p-3 rounded">
                                                            <div>
                                                                <div className="font-semibold">
                                                                    {grp.nama_racik ||
                                                                        `Racikan #${grp.no_racik}`}
                                                                </div>
                                                                <div className="text-gray-600">
                                                                    Metode:{" "}
                                                                    {grp.metode ||
                                                                        "-"}
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div>
                                                                    Jumlah
                                                                    Racikan:{" "}
                                                                    {grp.jml_dr ??
                                                                        "-"}
                                                                </div>
                                                                <div>
                                                                    Aturan
                                                                    Pakai:{" "}
                                                                    {grp.aturan_pakai ||
                                                                        "-"}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="overflow-x-auto mt-2">
                                                            <table className="w-full border-collapse border border-gray-200 text-sm">
                                                                <thead>
                                                                    <tr className="bg-gray-100">
                                                                        <th className="border px-3 py-2 text-left">
                                                                            Kode
                                                                        </th>
                                                                        <th className="border px-3 py-2 text-left">
                                                                            Nama
                                                                            Obat
                                                                        </th>
                                                                        <th className="border px-3 py-2 text-left">
                                                                            Satuan
                                                                        </th>
                                                                        <th className="border px-3 py-2 text-right">
                                                                            Tarif
                                                                        </th>
                                                                        <th className="border px-3 py-2 text-right">
                                                                            Jumlah
                                                                        </th>
                                                                        <th className="border px-3 py-2 text-left">
                                                                            Kandungan
                                                                        </th>
                                                                        <th className="border px-3 py-2 text-right">
                                                                            Embalase
                                                                        </th>
                                                                        <th className="border px-3 py-2 text-right">
                                                                            Tuslah
                                                                        </th>
                                                                        <th className="border px-3 py-2 text-right">
                                                                            Total
                                                                            Item
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {(
                                                                        grp.details ||
                                                                        []
                                                                    ).length ===
                                                                    0 ? (
                                                                        <tr>
                                                                            <td
                                                                                colSpan={
                                                                                    9
                                                                                }
                                                                                className="border px-3 py-4 text-center text-gray-500"
                                                                            >
                                                                                Tidak
                                                                                ada
                                                                                detail
                                                                                racikan.
                                                                            </td>
                                                                        </tr>
                                                                    ) : (
                                                                        (
                                                                            grp.details ||
                                                                            []
                                                                        ).map(
                                                                            (
                                                                                d,
                                                                                idx
                                                                            ) => (
                                                                                <React.Fragment
                                                                                    key={
                                                                                        d.kode_brng ||
                                                                                        idx
                                                                                    }
                                                                                >
                                                                                    <tr>
                                                                                        <td className="border px-3 py-2 font-mono">
                                                                                            {
                                                                                                d.kode_brng
                                                                                            }
                                                                                        </td>
                                                                                        <td className="border px-3 py-2">
                                                                                            {d.nama_brng ||
                                                                                                "-"}
                                                                                        </td>
                                                                                        <td className="border px-3 py-2">
                                                                                            {d.satuan ||
                                                                                                "-"}
                                                                                        </td>
                                                                                        <td className="border px-3 py-2 text-right">
                                                                                            {formatRupiah(
                                                                                                d.tarif ||
                                                                                                    0
                                                                                            )}
                                                                                        </td>
                                                                                        <td className="border px-3 py-2 text-right">
                                                                                            {
                                                                                                d.jml
                                                                                            }
                                                                                        </td>
                                                                                        <td className="border px-3 py-2">
                                                                                            {d.kandungan ||
                                                                                                "-"}
                                                                                        </td>
                                                                                        <td className="border px-3 py-2 text-right">
                                                                                            <Input
                                                                                                type="number"
                                                                                                min={
                                                                                                    0
                                                                                                }
                                                                                                step="1"
                                                                                                value={
                                                                                                    typeof d.embalase ===
                                                                                                    "number"
                                                                                                        ? d.embalase
                                                                                                        : Number(
                                                                                                              d.embalase ||
                                                                                                                  0
                                                                                                          )
                                                                                                }
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) =>
                                                                                                    updateRacikanCharge(
                                                                                                        gidx,
                                                                                                        idx,
                                                                                                        "embalase",
                                                                                                        e
                                                                                                            .target
                                                                                                            .value
                                                                                                    )
                                                                                                }
                                                                                                className="w-28 text-right"
                                                                                            />
                                                                                        </td>
                                                                                        <td className="border px-3 py-2 text-right">
                                                                                            <Input
                                                                                                type="number"
                                                                                                min={
                                                                                                    0
                                                                                                }
                                                                                                step="1"
                                                                                                value={
                                                                                                    typeof d.tuslah ===
                                                                                                    "number"
                                                                                                        ? d.tuslah
                                                                                                        : Number(
                                                                                                              d.tuslah ||
                                                                                                                  0
                                                                                                          )
                                                                                                }
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) =>
                                                                                                    updateRacikanCharge(
                                                                                                        gidx,
                                                                                                        idx,
                                                                                                        "tuslah",
                                                                                                        e
                                                                                                            .target
                                                                                                            .value
                                                                                                    )
                                                                                                }
                                                                                                className="w-28 text-right"
                                                                                            />
                                                                                        </td>
                                                                                        <td className="border px-3 py-2 text-right">
                                                                                            {formatRupiah(
                                                                                                typeof d.subtotal ===
                                                                                                    "number"
                                                                                                    ? d.subtotal
                                                                                                    : Number(
                                                                                                          d.tarif ||
                                                                                                              0
                                                                                                      ) *
                                                                                                          Number(
                                                                                                              d.jml ||
                                                                                                                  0
                                                                                                          )
                                                                                            )}
                                                                                        </td>
                                                                                    </tr>
                                                                                    {/* Stok Info (FIFO) per item racikan */}
                                                                                    <tr>
                                                                                        <td
                                                                                            colSpan={
                                                                                                9
                                                                                            }
                                                                                            className="border px-3 py-2 bg-gray-50"
                                                                                        >
                                                                                            <div className="flex items-center justify-between">
                                                                                                <div className="text-xs text-gray-600">
                                                                                                    Validasi
                                                                                                    stok
                                                                                                    &
                                                                                                    batch
                                                                                                    FIFO
                                                                                                </div>
                                                                                                <div className="flex items-center gap-2">
                                                                                                    <Button
                                                                                                        variant="outline"
                                                                                                        size="sm"
                                                                                                        onClick={() =>
                                                                                                            toggleStokInfo(
                                                                                                                d.kode_brng
                                                                                                            )
                                                                                                        }
                                                                                                    >
                                                                                                        {stokInfoMap[
                                                                                                            d
                                                                                                                .kode_brng
                                                                                                        ]
                                                                                                            ?.expanded
                                                                                                            ? "Sembunyikan Stok"
                                                                                                            : "Tampilkan Stok"}
                                                                                                    </Button>
                                                                                                </div>
                                                                                            </div>
                                                                                            {stokInfoMap[
                                                                                                d
                                                                                                    .kode_brng
                                                                                            ]
                                                                                                ?.expanded && (
                                                                                                <div className="mt-2">
                                                                                                    {stokInfoMap[
                                                                                                        d
                                                                                                            .kode_brng
                                                                                                    ]
                                                                                                        ?.loading ? (
                                                                                                        <div className="text-xs text-gray-600">
                                                                                                            Memuat
                                                                                                            stok...
                                                                                                        </div>
                                                                                                    ) : stokInfoMap[
                                                                                                          d
                                                                                                              .kode_brng
                                                                                                      ]
                                                                                                          ?.error ? (
                                                                                                        <div className="text-xs text-red-600">
                                                                                                            {
                                                                                                                stokInfoMap[
                                                                                                                    d
                                                                                                                        .kode_brng
                                                                                                                ]
                                                                                                                    ?.error
                                                                                                            }
                                                                                                        </div>
                                                                                                    ) : (
                                                                                                        (() => {
                                                                                                            const info =
                                                                                                                stokInfoMap[
                                                                                                                    d
                                                                                                                        .kode_brng
                                                                                                                ]
                                                                                                                    ?.data;
                                                                                                            if (
                                                                                                                !info
                                                                                                            )
                                                                                                                return null;
                                                                                                            const batches =
                                                                                                                Array.isArray(
                                                                                                                    info.batch_detail
                                                                                                                )
                                                                                                                    ? info.batch_detail
                                                                                                                    : [];
                                                                                                            const perBangsal =
                                                                                                                info.stok_per_bangsal ||
                                                                                                                {};
                                                                                                            return (
                                                                                                                <div className="space-y-2">
                                                                                                                    <div className="text-xs">
                                                                                                                        Total
                                                                                                                        stok
                                                                                                                        tersedia:{" "}
                                                                                                                        <span className="font-semibold">
                                                                                                                            {
                                                                                                                                info.total_stok
                                                                                                                            }
                                                                                                                        </span>
                                                                                                                    </div>
                                                                                                                    {/* Stok per bangsal */}
                                                                                                                    <div className="overflow-x-auto">
                                                                                                                        <table className="w-full text-xs border border-gray-200">
                                                                                                                            <thead>
                                                                                                                                <tr className="bg-gray-100">
                                                                                                                                    <th className="border px-2 py-1 text-left">
                                                                                                                                        Bangsal
                                                                                                                                    </th>
                                                                                                                                    <th className="border px-2 py-1 text-right">
                                                                                                                                        Stok
                                                                                                                                    </th>
                                                                                                                                </tr>
                                                                                                                            </thead>
                                                                                                                            <tbody>
                                                                                                                                {Object.keys(
                                                                                                                                    perBangsal
                                                                                                                                )
                                                                                                                                    .length ===
                                                                                                                                0 ? (
                                                                                                                                    <tr>
                                                                                                                                        <td
                                                                                                                                            colSpan={
                                                                                                                                                2
                                                                                                                                            }
                                                                                                                                            className="border px-2 py-1 text-center text-gray-500"
                                                                                                                                        >
                                                                                                                                            Tidak
                                                                                                                                            ada
                                                                                                                                            data
                                                                                                                                            bangsal
                                                                                                                                            terkait.
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                ) : (
                                                                                                                                    Object.entries(
                                                                                                                                        perBangsal
                                                                                                                                    ).map(
                                                                                                                                        ([
                                                                                                                                            bangsal,
                                                                                                                                            stok,
                                                                                                                                        ]) => (
                                                                                                                                            <tr
                                                                                                                                                key={
                                                                                                                                                    bangsal
                                                                                                                                                }
                                                                                                                                            >
                                                                                                                                                <td className="border px-2 py-1 font-mono">
                                                                                                                                                    {
                                                                                                                                                        bangsal
                                                                                                                                                    }
                                                                                                                                                </td>
                                                                                                                                                <td className="border px-2 py-1 text-right">
                                                                                                                                                    {
                                                                                                                                                        stok
                                                                                                                                                    }
                                                                                                                                                </td>
                                                                                                                                            </tr>
                                                                                                                                        )
                                                                                                                                    )
                                                                                                                                )}
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                    </div>
                                                                                                                    {/* Detail batch (FIFO) */}
                                                                                                                    <div className="overflow-x-auto">
                                                                                                                        <table className="w-full text-xs border border-gray-200 mt-2">
                                                                                                                            <thead>
                                                                                                                                <tr className="bg-gray-100">
                                                                                                                                    <th className="border px-2 py-1 text-left">
                                                                                                                                        Bangsal
                                                                                                                                    </th>
                                                                                                                                    <th className="border px-2 py-1 text-left">
                                                                                                                                        Batch
                                                                                                                                    </th>
                                                                                                                                    <th className="border px-2 py-1 text-left">
                                                                                                                                        Faktur
                                                                                                                                    </th>
                                                                                                                                    <th className="border px-2 py-1 text-right">
                                                                                                                                        Stok
                                                                                                                                    </th>
                                                                                                                                </tr>
                                                                                                                            </thead>
                                                                                                                            <tbody>
                                                                                                                                {batches.length ===
                                                                                                                                0 ? (
                                                                                                                                    <tr>
                                                                                                                                        <td
                                                                                                                                            colSpan={
                                                                                                                                                4
                                                                                                                                            }
                                                                                                                                            className="border px-2 py-1 text-center text-gray-500"
                                                                                                                                        >
                                                                                                                                            Tidak
                                                                                                                                            ada
                                                                                                                                            batch
                                                                                                                                            aktif.
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                ) : (
                                                                                                                                    batches.map(
                                                                                                                                        (
                                                                                                                                            b,
                                                                                                                                            bi
                                                                                                                                        ) => (
                                                                                                                                            <tr
                                                                                                                                                key={
                                                                                                                                                    bi
                                                                                                                                                }
                                                                                                                                            >
                                                                                                                                                <td className="border px-2 py-1 font-mono">
                                                                                                                                                    {
                                                                                                                                                        b.kd_bangsal
                                                                                                                                                    }
                                                                                                                                                </td>
                                                                                                                                                <td className="border px-2 py-1">
                                                                                                                                                    {b.no_batch ||
                                                                                                                                                        "-"}
                                                                                                                                                </td>
                                                                                                                                                <td className="border px-2 py-1">
                                                                                                                                                    {b.no_faktur ||
                                                                                                                                                        "-"}
                                                                                                                                                </td>
                                                                                                                                                <td className="border px-2 py-1 text-right">
                                                                                                                                                    {
                                                                                                                                                        b.stok
                                                                                                                                                    }
                                                                                                                                                </td>
                                                                                                                                            </tr>
                                                                                                                                        )
                                                                                                                                    )
                                                                                                                                )}
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                        <div className="text-[11px] text-gray-500 mt-1">
                                                                                                                            Pengurangan
                                                                                                                            stok
                                                                                                                            saat
                                                                                                                            penyerahan
                                                                                                                            menggunakan
                                                                                                                            urutan
                                                                                                                            FIFO
                                                                                                                            berdasarkan
                                                                                                                            batch.
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            );
                                                                                                        })()
                                                                                                    )}
                                                                                                </div>
                                                                                            )}
                                                                                        </td>
                                                                                    </tr>
                                                                                </React.Fragment>
                                                                            )
                                                                        )
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                {/* Ringkasan total */}
                                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-1">
                                        <div className="text-gray-600">
                                            Total
                                        </div>
                                        <div className="font-semibold">
                                            {formatRupiah(
                                                computeTotals(selectedResep)
                                                    .subtotal
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-gray-600">
                                            Tambahan (Embalase + Tuslah)
                                        </div>
                                        <div className="font-semibold">
                                            {formatRupiah(
                                                computeTotals(selectedResep)
                                                    .tambahan_total
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-gray-600">
                                            PPN (
                                            {Math.round(
                                                (computeTotals(selectedResep)
                                                    .ppn_rate || 0.11) * 100
                                            )}
                                            %)
                                        </div>
                                        <div className="font-semibold">
                                            {formatRupiah(
                                                computeTotals(selectedResep).ppn
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-1 col-span-2">
                                        <div className="text-gray-600">
                                            Total + PPN
                                        </div>
                                        <div className="text-lg font-bold">
                                            {formatRupiah(
                                                computeTotals(selectedResep)
                                                    .total_plus_ppn
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* Tombol aksi */}
                                <div className="mt-4 flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowDetail(false)}
                                    >
                                        Tutup
                                    </Button>
                                    <Button
                                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                                        disabled={
                                            saving ||
                                            (selectedResep?.tgl_penyerahan &&
                                                selectedResep?.tgl_penyerahan !==
                                                    "0000-00-00")
                                        }
                                        onClick={() => setConfirmOpen(true)}
                                    >
                                        {saving
                                            ? "Memproses..."
                                            : "Proses Penyerahan"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Konfirmasi Penyerahan */}
                {confirmOpen && selectedResep && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
                            <div className="px-6 py-4 border-b">
                                <h4 className="text-base font-semibold">
                                    Konfirmasi Penyerahan Obat
                                </h4>
                            </div>
                            <div className="px-6 py-4 text-sm space-y-3">
                                <p>
                                    Anda akan memproses penyerahan untuk Resep
                                    <span className="font-mono font-semibold">
                                        {" "}
                                        #{selectedResep.no_resep}
                                    </span>
                                    .
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <div className="text-gray-600">
                                            Total
                                        </div>
                                        <div className="font-semibold">
                                            {formatRupiah(
                                                computeTotals(selectedResep)
                                                    .subtotal
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gray-600">
                                            Tambahan (Embalase + Tuslah)
                                        </div>
                                        <div className="font-semibold">
                                            {formatRupiah(
                                                computeTotals(selectedResep)
                                                    .tambahan_total
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gray-600">PPN</div>
                                        <div className="font-semibold">
                                            {formatRupiah(
                                                computeTotals(selectedResep).ppn
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="text-gray-600">
                                            Total + PPN
                                        </div>
                                        <div className="text-lg font-bold">
                                            {formatRupiah(
                                                computeTotals(selectedResep)
                                                    .total_plus_ppn
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-xs text-yellow-800">
                                    - Pastikan stok tersedia pada depo terkait.
                                    Penyerahan akan mengurangi stok dengan
                                    metode FIFO.
                                    <br />- Perubahan Embalase/Tuslah per item
                                    yang Anda edit akan ikut dikirim ke server
                                    sebagai bagian dari penyerahan.
                                </div>
                            </div>
                            <div className="px-6 py-4 border-t flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setConfirmOpen(false)}
                                >
                                    Batal
                                </Button>
                                <Button
                                    className="bg-blue-600 hover:bg-blue-700"
                                    onClick={handlePenyerahan}
                                    disabled={saving}
                                >
                                    {saving ? "Memproses..." : "Ya, Serahkan"}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SidebarFarmasi>
    );
};

export default DaftarPermintaanResep;
