import React, { useEffect, useMemo, useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import {
    BookOpen,
    Calendar,
    Clock,
    Plus,
    RefreshCcw,
    Search,
    Trash2,
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

export default function DetailJurnalPage() {
    const initialNo = usePage()?.props?.no_jurnal || "";
    const [noJurnal, setNoJurnal] = useState(initialNo);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [errors, setErrors] = useState({});
    const [rekeningOptions, setRekeningOptions] = useState([]);

    const canEdit = data?.header?.jenis === "U";

    const totals = useMemo(() => {
        const d = data?.details || [];
        const debet = d.reduce((acc, it) => acc + Number(it.debet || 0), 0);
        const kredit = d.reduce((acc, it) => acc + Number(it.kredit || 0), 0);
        return {
            debet,
            kredit,
            balanced: Math.round(debet * 100) === Math.round(kredit * 100),
        };
    }, [data]);

    const fetchRekeningOptions = async () => {
        try {
            const res = await axios.get("/api/akutansi/rekening", {
                params: { per_page: 1000 },
            });
            const data = (res?.data?.data || []).map((r) => ({
                kd_rek: r.kd_rek,
                nm_rek: r.nm_rek,
            }));
            setRekeningOptions(data);
        } catch (e) {
            console.error("Gagal memuat daftar rekening:", e);
        }
    };

    const fetchJurnal = async (no) => {
        if (!no) return;
        setLoading(true);
        setErrors({});
        try {
            const res = await axios.get(
                `/api/akutansi/jurnal/${encodeURIComponent(no)}`
            );
            setData(res?.data || null);
        } catch (e) {
            const msg =
                e?.response?.data?.message || "Gagal memuat detail jurnal";
            setErrors({ _global: msg });
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRekeningOptions();
    }, []);
    useEffect(() => {
        if (initialNo) fetchJurnal(initialNo);
    }, [initialNo]);

    const handleSearch = async (e) => {
        e?.preventDefault?.();
        await fetchJurnal(noJurnal);
    };

    const updateHeader = (patch) => {
        setData((s) => (s ? { ...s, header: { ...s.header, ...patch } } : s));
    };

    const updateDetail = (idx, patch) => {
        setData((s) =>
            s
                ? {
                      ...s,
                      details: (s.details || []).map((row, i) =>
                          i === idx ? { ...row, ...patch } : row
                      ),
                  }
                : s
        );
    };

    const addDetailRow = () => {
        setData((s) =>
            s
                ? {
                      ...s,
                      details: [
                          ...(s.details || []),
                          { kd_rek: "", nm_rek: "", debet: 0, kredit: 0 },
                      ],
                  }
                : s
        );
    };

    const removeDetailRow = (idx) => {
        setData((s) =>
            s
                ? {
                      ...s,
                      details: (s.details || []).filter((_, i) => i !== idx),
                  }
                : s
        );
    };

    const handleSave = async () => {
        if (!data?.header?.no_jurnal) return;
        const errs = {};
        if (canEdit) {
            const d = data.details || [];
            if (d.length < 1) errs.details = "Minimal 1 baris";
            d.forEach((row, i) => {
                if (!row.kd_rek) errs[`details.${i}.kd_rek`] = "Pilih rekening";
                const deb = Number(row.debet || 0),
                    kre = Number(row.kredit || 0);
                if (deb <= 0 && kre <= 0)
                    errs[`details.${i}.amount`] = "Isi debet atau kredit";
                if (deb > 0 && kre > 0)
                    errs[`details.${i}.amount2`] = "Tidak boleh keduanya > 0";
            });
            if (!totals.balanced)
                errs.balanced = "Debet harus sama dengan Kredit";
        }
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setUpdating(true);
        try {
            const payload = {
                no_bukti: data?.header?.no_bukti || null,
                tgl_jurnal: formatDate(data?.header?.tgl_jurnal),
                jam_jurnal: formatTime(data?.header?.jam_jurnal),
                keterangan: data?.header?.keterangan || null,
            };
            if (canEdit) {
                payload.details = (data?.details || []).map((d) => ({
                    kd_rek: d.kd_rek,
                    debet: Number(d.debet || 0),
                    kredit: Number(d.kredit || 0),
                }));
            }
            await axios.put(
                `/api/akutansi/jurnal/${encodeURIComponent(
                    data.header.no_jurnal
                )}`,
                payload
            );
            await fetchJurnal(data.header.no_jurnal);
        } catch (e) {
            const resp = e?.response?.data;
            if (resp && typeof resp === "object")
                setErrors(
                    resp.errors || {
                        _global: resp.message || "Gagal memperbarui",
                    }
                );
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div>
            <Head title="Keuangan - Detail Jurnal" />
            <div className="space-y-6">
                <Card
                    title="Detail Jurnal"
                    right={
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => fetchJurnal(noJurnal)}
                                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <RefreshCcw className="w-4 h-4" /> Refresh
                            </button>
                        </div>
                    }
                >
                    <form
                        onSubmit={handleSearch}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                        <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                                No. Jurnal
                            </label>
                            <div className="mt-1 flex items-center gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={noJurnal}
                                        onChange={(e) =>
                                            setNoJurnal(e.target.value)
                                        }
                                        placeholder="Masukkan nomor jurnal (mis. JR20250101XXXXXX)"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-300"
                                    />
                                    <Search className="absolute right-2 top-2.5 w-4 h-4 text-gray-400" />
                                </div>
                                <button
                                    type="submit"
                                    className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                                >
                                    Muat
                                </button>
                            </div>
                        </div>
                        <div className="flex items-end">
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                {data?.header?.no_jurnal ? (
                                    <span>
                                        Memuat:{" "}
                                        <span className="font-mono font-semibold">
                                            {data.header.no_jurnal}
                                        </span>
                                    </span>
                                ) : (
                                    <span>
                                        Masukkan nomor jurnal untuk melihat
                                        rinciannya
                                    </span>
                                )}
                            </div>
                        </div>
                    </form>
                    {errors._global && (
                        <p className="mt-3 text-sm text-red-600">
                            {errors._global}
                        </p>
                    )}
                </Card>

                {loading && (
                    <Card>
                        <div className="text-sm text-gray-500">
                            Memuat data...
                        </div>
                    </Card>
                )}

                {data && (
                    <Card title={`Detail ${data?.header?.no_jurnal || ""}`}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-medium">
                                    Tanggal
                                </label>
                                <input
                                    type="date"
                                    value={formatDate(data?.header?.tgl_jurnal)}
                                    onChange={(e) =>
                                        updateHeader({
                                            tgl_jurnal: e.target.value,
                                        })
                                    }
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium">
                                    Waktu
                                </label>
                                <input
                                    type="text"
                                    value={formatTime(data?.header?.jam_jurnal)}
                                    onChange={(e) =>
                                        updateHeader({
                                            jam_jurnal: e.target.value,
                                        })
                                    }
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium">
                                    No. Bukti
                                </label>
                                <input
                                    type="text"
                                    value={data?.header?.no_bukti || ""}
                                    onChange={(e) =>
                                        updateHeader({
                                            no_bukti: e.target.value,
                                        })
                                    }
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium">
                                    Jenis
                                </label>
                                <input
                                    type="text"
                                    value={data?.header?.jenis || ""}
                                    disabled
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm bg-gray-50"
                                />
                            </div>
                            <div className="md:col-span-4">
                                <label className="block text-xs font-medium">
                                    Keterangan
                                </label>
                                <input
                                    type="text"
                                    value={data?.header?.keterangan || ""}
                                    onChange={(e) =>
                                        updateHeader({
                                            keterangan: e.target.value,
                                        })
                                    }
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-semibold">
                                    Detail Jurnal
                                </label>
                                {canEdit && (
                                    <button
                                        type="button"
                                        onClick={addDetailRow}
                                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        <Plus className="w-4 h-4" /> Tambah
                                        Baris
                                    </button>
                                )}
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                                                Rekening
                                            </th>
                                            <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-600">
                                                Debet
                                            </th>
                                            <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-600">
                                                Kredit
                                            </th>
                                            <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-600">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {(data?.details || []).map(
                                            (row, idx) => (
                                                <tr key={idx}>
                                                    <td className="px-3 py-2">
                                                        {canEdit ? (
                                                            <select
                                                                value={
                                                                    row.kd_rek ||
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    updateDetail(
                                                                        idx,
                                                                        {
                                                                            kd_rek: e
                                                                                .target
                                                                                .value,
                                                                        }
                                                                    )
                                                                }
                                                                className={`w-full rounded-lg border px-3 py-2 text-sm ${
                                                                    errors[
                                                                        `details.${idx}.kd_rek`
                                                                    ]
                                                                        ? "border-red-500"
                                                                        : "border-gray-300"
                                                                }`}
                                                            >
                                                                <option value="">
                                                                    -- pilih
                                                                    rekening --
                                                                </option>
                                                                {rekeningOptions.map(
                                                                    (opt) => (
                                                                        <option
                                                                            key={
                                                                                opt.kd_rek
                                                                            }
                                                                            value={
                                                                                opt.kd_rek
                                                                            }
                                                                        >
                                                                            {
                                                                                opt.kd_rek
                                                                            }{" "}
                                                                            -{" "}
                                                                            {
                                                                                opt.nm_rek
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                        ) : (
                                                            <div className="text-sm">
                                                                {row.kd_rek} -{" "}
                                                                {row.nm_rek ||
                                                                    ""}
                                                            </div>
                                                        )}
                                                        {(errors[
                                                            `details.${idx}.kd_rek`
                                                        ] ||
                                                            errors[
                                                                `details.${idx}.amount`
                                                            ] ||
                                                            errors[
                                                                `details.${idx}.amount2`
                                                            ]) && (
                                                            <p className="mt-1 text-xs text-red-600">
                                                                {errors[
                                                                    `details.${idx}.kd_rek`
                                                                ] ||
                                                                    errors[
                                                                        `details.${idx}.amount`
                                                                    ] ||
                                                                    errors[
                                                                        `details.${idx}.amount2`
                                                                    ]}
                                                            </p>
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2 text-right">
                                                        {canEdit ? (
                                                            <input
                                                                type="number"
                                                                step="0.01"
                                                                value={
                                                                    row.debet
                                                                }
                                                                onChange={(e) =>
                                                                    updateDetail(
                                                                        idx,
                                                                        {
                                                                            debet: Number(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            ),
                                                                            kredit: 0,
                                                                        }
                                                                    )
                                                                }
                                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-right"
                                                            />
                                                        ) : (
                                                            <div className="text-sm">
                                                                {Number(
                                                                    row.debet ||
                                                                        0
                                                                ).toLocaleString(
                                                                    "id-ID"
                                                                )}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2 text-right">
                                                        {canEdit ? (
                                                            <input
                                                                type="number"
                                                                step="0.01"
                                                                value={
                                                                    row.kredit
                                                                }
                                                                onChange={(e) =>
                                                                    updateDetail(
                                                                        idx,
                                                                        {
                                                                            kredit: Number(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            ),
                                                                            debet: 0,
                                                                        }
                                                                    )
                                                                }
                                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-right"
                                                            />
                                                        ) : (
                                                            <div className="text-sm">
                                                                {Number(
                                                                    row.kredit ||
                                                                        0
                                                                ).toLocaleString(
                                                                    "id-ID"
                                                                )}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2 text-right">
                                                        {canEdit ? (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeDetailRow(
                                                                        idx
                                                                    )
                                                                }
                                                                className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                                                            >
                                                                Hapus
                                                            </button>
                                                        ) : (
                                                            <span className="text-xs text-gray-500">
                                                                -
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className="px-3 py-2 text-right font-semibold">
                                                Total
                                            </td>
                                            <td className="px-3 py-2 text-right font-semibold">
                                                {Number(
                                                    totals.debet || 0
                                                ).toLocaleString("id-ID")}
                                            </td>
                                            <td className="px-3 py-2 text-right font-semibold">
                                                {Number(
                                                    totals.kredit || 0
                                                ).toLocaleString("id-ID")}
                                            </td>
                                            <td className="px-3 py-2 text-right">
                                                <span
                                                    className={`inline-flex items-center px-2 py-1 rounded-md text-xs ${
                                                        totals.balanced
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {totals.balanced
                                                        ? "Seimbang"
                                                        : "Tidak seimbang"}
                                                </span>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        {errors.balanced && (
                            <p className="mt-3 text-sm text-red-600">
                                {errors.balanced}
                            </p>
                        )}
                        {errors._global && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors._global}
                            </p>
                        )}

                        <div className="mt-4 flex items-center justify-end gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    data?.header?.no_jurnal &&
                                    fetchJurnal(data.header.no_jurnal)
                                }
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Reload
                            </button>
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={updating || !canEdit}
                                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                                    canEdit
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                }`}
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}

DetailJurnalPage.layout = (page) => (
    <SidebarKeuangan title="Keuangan" children={page} />
);
