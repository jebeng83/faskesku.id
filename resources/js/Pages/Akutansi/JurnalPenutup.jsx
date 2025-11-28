import React, { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import {
    BookOpen,
    Calendar,
    Clock,
    Info,
    CheckCircle2,
    AlertTriangle,
    RefreshCw,
} from "lucide-react";

const Card = ({ title, children, right }) => (
    <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
        {(title || right) && (
            <div className="relative px-4 py-3 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50 flex items-center justify-between">
                {title && (
                    <h2 className="text-base font-semibold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {title}
                    </h2>
                )}
                {right}
            </div>
        )}
        <div className="relative p-6">{children}</div>
    </div>
);

const formatDate = (v) => {
    if (!v) return "";
    try {
        return new Date(v).toISOString().slice(0, 10);
    } catch {
        return v;
    }
};

const formatTime = (v) => {
    if (!v) return "";
    try {
        return typeof v === "string" && v.length >= 8
            ? v.slice(0, 8)
            : new Date(v).toTimeString().slice(0, 8);
    } catch {
        return v;
    }
};

export default function JurnalPenutupPage() {
    const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
    const nowTime = useMemo(() => new Date().toTimeString().slice(0, 8), []);

    const [rekeningOptions, setRekeningOptions] = useState([]);
    const [items, setItems] = useState([]); // aggregated per /api/akutansi/rekeningtahun
    const [errors, setErrors] = useState({});
    const [generating, setGenerating] = useState(false);
    const [previewing, setPreviewing] = useState(false);
    const [netPreview, setNetPreview] = useState(null); // Profit/Loss berdasarkan periode (server/fallback)

    const [filters, setFilters] = useState({
        thn: new Date().getFullYear().toString(),
        period: "year", // 'year' | 'month' | 'day'
        month: (new Date().getMonth() + 1).toString(),
        date: today,
    });

    const [form, setForm] = useState({
        no_bukti: "",
        tgl_jurnal: today,
        jam_jurnal: nowTime,
        jenis: "C",
        keterangan: "Jurnal penutup otomatis",
        ikhtisar_kd_rek: "",
        modal_kd_rek: "",
        details: [],
    });

    const fetchRekeningOptions = async () => {
        try {
            const res = await axios.get("/api/akutansi/rekening", {
                params: { per_page: 1000 },
            });
            const data = (res?.data?.data || []).map((r) => ({
                kd_rek: r.kd_rek,
                nm_rek: r.nm_rek,
                tipe: String(r.tipe || "").toUpperCase(),
            }));
            setRekeningOptions(data);
            // Auto-suggest ikhtisar & modal
            const ikhtisar = data
                .filter((r) => r.tipe === "R")
                .find((r) => /IKHTISAR|LABA RUGI/i.test(r.nm_rek || ""));
            // Hanya pertimbangkan akun bertipe 'M' untuk Modal/Saldo Laba
            const modal = data
                .filter((r) => r.tipe === "M")
                .find((r) =>
                    /MODAL|LABA DITAHAN|SALDO LABA/i.test(r.nm_rek || "")
                );
            setForm((f) => ({
                ...f,
                ikhtisar_kd_rek: ikhtisar?.kd_rek || f.ikhtisar_kd_rek,
                modal_kd_rek: modal?.kd_rek || f.modal_kd_rek,
            }));
        } catch (e) {
            console.error("Gagal memuat daftar rekening:", e);
        }
    };

    const fetchAggregates = async () => {
        try {
            const params = { thn: filters.thn, period: filters.period };
            if (filters.period === "month") params.month = filters.month;
            if (filters.period === "day")
                params.date = formatDate(filters.date);
            const res = await axios.get("/api/akutansi/rekeningtahun", {
                params,
            });
            const items = res?.data?.items || [];
            setItems(items);
        } catch (e) {
            console.error("Gagal memuat agregasi rekening:", e);
        }
    };

    useEffect(() => {
        fetchRekeningOptions();
    }, []);
    useEffect(() => {
        fetchAggregates();
    }, [filters.thn, filters.period, filters.month, filters.date]);

    const rItems = useMemo(
        () =>
            (items || []).filter((it) => (it.tipe || "").toUpperCase() === "R"),
        [items]
    );
    const netFromR = useMemo(() => {
        // Hitung profit/loss dari saldo akhir akun nominal (R)
        // Pendekatan: gunakan orientasi balance per akun
        let ikhtisarDebit = 0;
        let ikhtisarCredit = 0;
        rItems.forEach((it) => {
            const amt = Math.abs(Number(it.saldo_akhir || 0));
            if (amt <= 0) return;
            const bal = (it.balance || "D").toUpperCase();
            const isDebitNature = bal === "D";
            if (isDebitNature) {
                // Beban: ditutup dengan Kredit akun beban, Debet Ikhtisar
                ikhtisarDebit += amt;
            } else {
                // Pendapatan: ditutup dengan Debet akun pendapatan, Kredit Ikhtisar
                ikhtisarCredit += amt;
            }
        });
        return ikhtisarCredit - ikhtisarDebit; // >0 profit, <0 loss
    }, [rItems]);

    const validate = () => {
        const errs = {};
        if (!form.tgl_jurnal) errs.tgl_jurnal = "Tanggal wajib diisi";
        if (!form.ikhtisar_kd_rek)
            errs.ikhtisar_kd_rek = "Pilih akun Ikhtisar Laba Rugi";
        if (!form.modal_kd_rek)
            errs.modal_kd_rek = "Pilih akun Modal/Saldo Laba";
        if (
            form.ikhtisar_kd_rek &&
            form.modal_kd_rek &&
            form.ikhtisar_kd_rek === form.modal_kd_rek
        )
            errs.modal_kd_rek =
                "Ikhtisar dan Modal/Saldo Laba tidak boleh sama";
        const d = form.details || [];
        if (d.length === 0) {
            errs.balanced =
                "Baris jurnal belum dihasilkan. Klik Generate terlebih dahulu.";
        } else if (!totals.balanced) {
            errs.balanced = "Total Debet dan Kredit harus seimbang";
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const generateClosingDetails = () => {
        const rows = [];
        let ikhtisarDebit = 0;
        let ikhtisarCredit = 0;
        rItems.forEach((it) => {
            // Hindari duplikasi: akun Ikhtisar dipakai sebagai agregator, tidak ditutup sebagai akun nominal
            if (String(it.kd_rek) === String(form.ikhtisar_kd_rek)) return;
            const amt = Math.abs(Number(it.saldo_akhir || 0));
            if (amt <= 0) return; // skip nol
            const bal = (it.balance || "D").toUpperCase();
            if (bal === "K") {
                // Pendapatan: Debet akun pendapatan, Kredit Ikhtisar
                rows.push({ kd_rek: it.kd_rek, debet: amt, kredit: 0 });
                ikhtisarCredit += amt;
            } else {
                // Beban: Kredit akun beban, Debet Ikhtisar
                rows.push({ kd_rek: it.kd_rek, debet: 0, kredit: amt });
                ikhtisarDebit += amt;
            }
        });

        const net = ikhtisarCredit - ikhtisarDebit; // >0 profit, <0 loss
        if (net > 0) {
            // Profit: Debet Ikhtisar, Kredit Modal
            rows.push({ kd_rek: form.ikhtisar_kd_rek, debet: net, kredit: 0 });
            rows.push({ kd_rek: form.modal_kd_rek, debet: 0, kredit: net });
        } else if (net < 0) {
            // Loss: Debet Modal, Kredit Ikhtisar
            const loss = Math.abs(net);
            rows.push({ kd_rek: form.modal_kd_rek, debet: loss, kredit: 0 });
            rows.push({ kd_rek: form.ikhtisar_kd_rek, debet: 0, kredit: loss });
        }

        return rows;
    };

    const fetchClosingPreview = async () => {
        // Validasi ringan sebelum preview: wajib pilih Ikhtisar & Modal
        if (!form.ikhtisar_kd_rek || !form.modal_kd_rek) {
            setErrors((prev) => ({
                ...prev,
                ikhtisar_kd_rek: !form.ikhtisar_kd_rek
                    ? "Pilih akun Ikhtisar Laba Rugi"
                    : prev.ikhtisar_kd_rek,
                modal_kd_rek: !form.modal_kd_rek
                    ? "Pilih akun Modal/Saldo Laba"
                    : prev.modal_kd_rek,
                balanced:
                    "Baris jurnal belum dihasilkan. Pilih akun Ikhtisar & Modal, lalu klik Generate.",
            }));
            return;
        }
        setPreviewing(true);
        try {
            const params = {
                thn: filters.thn,
                period: filters.period,
                ikhtisar_kd_rek: form.ikhtisar_kd_rek,
                modal_kd_rek: form.modal_kd_rek,
            };
            if (filters.period === "month") params.month = filters.month;
            if (filters.period === "day")
                params.date = formatDate(filters.date);
            const res = await axios.get(
                "/api/akutansi/jurnal/closing-preview",
                { params }
            );
            const rows = res?.data?.rows || [];
            const totalsFromServer = res?.data?.totals;
            const net = Number(res?.data?.net || 0);
            setForm((f) => ({ ...f, details: rows }));
            setNetPreview(net);
            if (totalsFromServer && totalsFromServer.balanced) {
                setErrors((prev) => ({ ...prev, balanced: undefined }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    balanced: "Total Debet dan Kredit harus seimbang",
                }));
            }
        } catch (e) {
            console.error(
                "Gagal mengambil preview jurnal penutup dari server, fallback ke perhitungan lokal.",
                e
            );
            const rows = generateClosingDetails();
            setForm((f) => ({ ...f, details: rows }));
            // Hitung net dari baris Ikhtisar pada hasil lokal
            try {
                const ikh = rows.find((r) => r.kd_rek === form.ikhtisar_kd_rek);
                const net =
                    Number(ikh?.debet || 0) - Number(ikh?.kredit || 0) || 0;
                setNetPreview(net);
            } catch (_) {}
            // Periksa keseimbangan hasil lokal dan tampilkan pesan bila belum seimbang
            try {
                const debet = rows.reduce(
                    (acc, it) => acc + Number(it.debet || 0),
                    0
                );
                const kredit = rows.reduce(
                    (acc, it) => acc + Number(it.kredit || 0),
                    0
                );
                if (Math.round(debet * 100) === Math.round(kredit * 100)) {
                    setErrors((prev) => ({ ...prev, balanced: undefined }));
                } else {
                    setErrors((prev) => ({
                        ...prev,
                        balanced:
                            "Total Debet dan Kredit belum seimbang. Pastikan Ikhtisar & Modal dipilih dengan benar.",
                    }));
                }
            } catch (_) {}
        } finally {
            setPreviewing(false);
        }
    };

    const totals = useMemo(() => {
        const d = form.details || [];
        const debet = d.reduce((acc, it) => acc + Number(it.debet || 0), 0);
        const kredit = d.reduce((acc, it) => acc + Number(it.kredit || 0), 0);
        return {
            debet,
            kredit,
            balanced: Math.round(debet * 100) === Math.round(kredit * 100),
        };
    }, [form.details]);

    useEffect(() => {
        fetchClosingPreview();
    }, [
        filters.thn,
        filters.period,
        filters.month,
        filters.date,
        form.ikhtisar_kd_rek,
        form.modal_kd_rek,
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setGenerating(true);
        try {
            const payload = {
                no_bukti:
                    form.no_bukti ||
                    `CLOSING-${filters.thn}-${
                        filters.period === "day"
                            ? formatDate(filters.date)
                            : filters.period === "month"
                            ? String(filters.month).padStart(2, "0")
                            : "FY"
                    }`,
                tgl_jurnal: formatDate(form.tgl_jurnal),
                jam_jurnal: formatTime(form.jam_jurnal),
                jenis: "C",
                keterangan: form.keterangan,
                closing_period: filters.period,
                closing_year: filters.thn,
                closing_month:
                    filters.period === "month"
                        ? Number(filters.month)
                        : undefined,
                closing_date:
                    filters.period === "day"
                        ? formatDate(filters.date)
                        : undefined,
                ikhtisar_kd_rek: form.ikhtisar_kd_rek,
                modal_kd_rek: form.modal_kd_rek,
                details: form.details.map((d) => ({
                    kd_rek: d.kd_rek,
                    debet: Number(d.debet || 0),
                    kredit: Number(d.kredit || 0),
                })),
            };
            const res = await axios.post("/api/akutansi/jurnal", payload);
            if (res?.status === 201) {
                alert("Jurnal penutup berhasil dibuat");
                setErrors({});
            }
        } catch (e) {
            const data = e?.response?.data;
            if (data && typeof data === "object")
                setErrors(
                    data.errors || {
                        _global:
                            data.message || "Gagal menghasilkan jurnal penutup",
                    }
                );
            console.error("Generate jurnal penutup gagal:", e);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <SidebarKeuangan>
            <Head title="Keuangan - Jurnal Penutup" />

            <div className="px-4 md:px-6 lg:px-8 py-4">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Jurnal Penutup
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            Generate jurnal penutup otomatis berdasarkan saldo
                            akhir akun nominal (Pendapatan & Beban) pada periode
                            terpilih.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Card title="Filter Periode">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Tahun
                                </label>
                                <input
                                    type="number"
                                    className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50"
                                    value={filters.thn}
                                    onChange={(e) =>
                                        setFilters((f) => ({
                                            ...f,
                                            thn: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Periode
                                </label>
                                <select
                                    className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50"
                                    value={filters.period}
                                    onChange={(e) =>
                                        setFilters((f) => ({
                                            ...f,
                                            period: e.target.value,
                                        }))
                                    }
                                >
                                    <option value="year">Tahunan</option>
                                    <option value="month">Bulanan</option>
                                    <option value="day">
                                        Harian (cut-off)
                                    </option>
                                </select>
                            </div>
                            {filters.period === "month" && (
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Bulan
                                    </label>
                                    <select
                                        className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50"
                                        value={filters.month}
                                        onChange={(e) =>
                                            setFilters((f) => ({
                                                ...f,
                                                month: e.target.value,
                                            }))
                                        }
                                    >
                                        {Array.from({ length: 12 }).map(
                                            (_, i) => (
                                                <option
                                                    key={i + 1}
                                                    value={String(i + 1)}
                                                >
                                                    {i + 1}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            )}
                            {filters.period === "day" && (
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Tanggal Cut-off
                                    </label>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        <input
                                            type="date"
                                            className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50"
                                            value={formatDate(filters.date)}
                                            onChange={(e) =>
                                                setFilters((f) => ({
                                                    ...f,
                                                    date: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>

                    <Card title="Akun Penutup (Ikhtisar & Modal)">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Ikhtisar Laba Rugi
                                </label>
                                <select
                                    className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50"
                                    value={form.ikhtisar_kd_rek}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            ikhtisar_kd_rek: e.target.value,
                                        }))
                                    }
                                >
                                    <option value="">
                                        -- pilih rekening --
                                    </option>
                                    {rekeningOptions
                                        .filter(
                                            (r) =>
                                                String(
                                                    r.tipe || ""
                                                ).toUpperCase() === "R"
                                        )
                                        .map((r) => (
                                            <option
                                                key={r.kd_rek}
                                                value={r.kd_rek}
                                            >
                                                {r.kd_rek} - {r.nm_rek}
                                            </option>
                                        ))}
                                </select>
                                {errors.ikhtisar_kd_rek && (
                                    <p className="text-xs text-red-600 mt-1">
                                        {errors.ikhtisar_kd_rek}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Modal/Saldo Laba
                                </label>
                                <select
                                    className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50"
                                    value={form.modal_kd_rek}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            modal_kd_rek: e.target.value,
                                        }))
                                    }
                                >
                                    <option value="">
                                        -- pilih rekening --
                                    </option>
                                    {rekeningOptions
                                        .filter(
                                            (r) =>
                                                String(
                                                    r.tipe || ""
                                                ).toUpperCase() === "M"
                                        )
                                        .map((r) => (
                                            <option
                                                key={r.kd_rek}
                                                value={r.kd_rek}
                                            >
                                                {r.kd_rek} - {r.nm_rek}
                                            </option>
                                        ))}
                                </select>
                                {errors.modal_kd_rek && (
                                    <p className="text-xs text-red-600 mt-1">
                                        {errors.modal_kd_rek}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    No Bukti (opsional)
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50"
                                    value={form.no_bukti}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            no_bukti: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Tanggal
                                    </label>
                                    <input
                                        type="date"
                                        className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50"
                                        value={formatDate(form.tgl_jurnal)}
                                        onChange={(e) =>
                                            setForm((f) => ({
                                                ...f,
                                                tgl_jurnal: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Waktu
                                    </label>
                                    <input
                                        type="time"
                                        className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50"
                                        value={formatTime(form.jam_jurnal)}
                                        onChange={(e) =>
                                            setForm((f) => ({
                                                ...f,
                                                jam_jurnal: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card title="Status Profit/Loss">
                        <div className="flex items-center gap-3 text-sm">
                            {/* Tampilkan net dari preview (periode) bila tersedia, fallback ke perhitungan YTD */}
                            {(netPreview ?? netFromR) > 0 ? (
                                <span className="flex items-center gap-2 text-green-700 dark:text-green-400">
                                    <CheckCircle2 className="w-4 h-4" /> Profit:{" "}
                                    <strong>
                                        {(
                                            netPreview ?? netFromR
                                        ).toLocaleString("id-ID")}
                                    </strong>
                                </span>
                            ) : (netPreview ?? netFromR) < 0 ? (
                                <span className="flex items-center gap-2 text-red-700 dark:text-red-400">
                                    <AlertTriangle className="w-4 h-4" /> Rugi:{" "}
                                    <strong>
                                        {Math.abs(
                                            netPreview ?? netFromR
                                        ).toLocaleString("id-ID")}
                                    </strong>
                                </span>
                            ) : (
                                <span className="text-gray-700 dark:text-gray-300">
                                    Net: 0
                                </span>
                            )}
                        </div>
                    </Card>
                </div>

                <div className="mt-4">
                    <Card title="Preview Baris Jurnal Penutup">
                        <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="grid grid-cols-12 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-200">
                                <div className="col-span-5 p-2">Rekening</div>
                                <div className="col-span-3 p-2 text-right">
                                    Debet (Rp)
                                </div>
                                <div className="col-span-3 p-2 text-right">
                                    Kredit (Rp)
                                </div>
                                <div className="col-span-1 p-2"></div>
                            </div>
                            {(form.details || []).map((row, idx) => (
                                <div
                                    key={idx}
                                    className="grid grid-cols-12 border-t border-gray-200 dark:border-gray-700"
                                >
                                    <div className="col-span-5 p-2">
                                        <span className="text-xs">
                                            {row.kd_rek}
                                        </span>
                                    </div>
                                    <div className="col-span-3 p-2 text-right">
                                        <span className="text-xs">
                                            {Number(
                                                row.debet || 0
                                            ).toLocaleString("id-ID")}
                                        </span>
                                    </div>
                                    <div className="col-span-3 p-2 text-right">
                                        <span className="text-xs">
                                            {Number(
                                                row.kredit || 0
                                            ).toLocaleString("id-ID")}
                                        </span>
                                    </div>
                                    <div className="col-span-1 p-2"></div>
                                </div>
                            ))}
                            <div className="flex items-center justify-between p-2 border-t border-gray-200 dark:border-gray-700">
                                <div className="text-xs">
                                    <span className="mr-4">
                                        Total Debet:{" "}
                                        <strong>
                                            {totals.debet.toLocaleString(
                                                "id-ID"
                                            )}
                                        </strong>
                                    </span>
                                    <span>
                                        Total Kredit:{" "}
                                        <strong>
                                            {totals.kredit.toLocaleString(
                                                "id-ID"
                                            )}
                                        </strong>
                                    </span>
                                    {!totals.balanced && (
                                        <span className="ml-3 text-red-600">
                                            Debet ≠ Kredit
                                        </span>
                                    )}
                                </div>
                                <div className="text-xs text-gray-500">
                                    Baris jurnal dibangun otomatis dari saldo
                                    akhir akun nominal (R) + transfer ke Modal.
                                </div>
                            </div>
                            {errors.balanced && (
                                <p className="text-xs text-red-600 px-2 pb-2">
                                    {errors.balanced}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={fetchClosingPreview}
                                disabled={
                                    previewing ||
                                    !form.ikhtisar_kd_rek ||
                                    !form.modal_kd_rek
                                }
                                className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 disabled:opacity-50"
                            >
                                <RefreshCw className="w-4 h-4" />
                                {previewing
                                    ? "Menghitung..."
                                    : "Generate Preview"}
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={
                                    generating ||
                                    previewing ||
                                    (form.details || []).length === 0 ||
                                    !totals.balanced
                                }
                                className="flex items-center gap-2 px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
                            >
                                <BookOpen className="w-4 h-4" />
                                {generating
                                    ? "Menyimpan..."
                                    : "Generate & Simpan Jurnal Penutup"}
                            </button>
                        </div>
                        {errors._global && (
                            <p className="text-xs text-red-600 mt-2 text-right">
                                {errors._global}
                            </p>
                        )}
                    </Card>
                </div>

                <div className="mt-4">
                    <Card title="Catatan">
                        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-3">
                            <p className="flex items-center gap-2">
                                <Info className="w-4 h-4" /> Sistem akan menutup
                                semua akun bertipe <strong>'R'</strong>{" "}
                                (Pendapatan/Beban) berdasarkan saldo akhir
                                periode.
                            </p>
                            <p>
                                Pilih akun <strong>Ikhtisar Laba Rugi</strong>{" "}
                                dan <strong>Modal/Saldo Laba</strong> sesuai
                                master rekening.
                            </p>
                            <p>
                                Format No Bukti default:{" "}
                                <code>CLOSING-[tahun]-[periode]</code>. Anda
                                bisa menyesuaikan.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </SidebarKeuangan>
    );
}
