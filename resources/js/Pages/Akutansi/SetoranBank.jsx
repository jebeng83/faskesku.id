import React, { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import {
    Wallet,
    Banknote,
    Calendar,
    Filter,
    RefreshCcw,
    Loader2,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/Components/ui/Table";

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

function today() {
    return new Date().toISOString().slice(0, 10);
}

function nf(v) {
    try {
        return new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(v || 0));
    } catch {
        const n = Number(v || 0);
        return n.toFixed(2);
    }
}

function Card({ title, right, children }) {
    return (
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
}

export default function SetoranBankPage() {
    const [rekening, setRekening] = useState([]);
    const [qKas, setQKas] = useState("Kas");
    const [qBank, setQBank] = useState("Bank");
    const [form, setForm] = useState({
        tanggal: today(),
        no_bukti: "",
        keterangan: "Setoran kas ke bank",
        kd_rek_kas: "",
        kd_rek_bank: "",
        nominal: "",
        reset: true,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [posting, setPosting] = useState(false);
    const [preview, setPreview] = useState({
        meta: { jml: 0, debet: 0, kredit: 0, balanced: false },
        lines: [],
    });
    const [setoranId, setSetoranId] = useState(null);

    const kasOptions = useMemo(() => {
        const needle = qKas.trim().toLowerCase();
        return (rekening || [])
            .filter(
                (r) =>
                    String(r.tipe || "").toUpperCase() === "N" &&
                    String(r.balance || "").toUpperCase() === "D"
            )
            .filter(
                (r) =>
                    !needle ||
                    String(r.nm_rek || "")
                        .toLowerCase()
                        .includes(needle) ||
                    String(r.kd_rek || "")
                        .toLowerCase()
                        .includes(needle)
            );
    }, [rekening, qKas]);

    const bankOptions = useMemo(() => {
        const needle = qBank.trim().toLowerCase();
        return (rekening || [])
            .filter(
                (r) =>
                    String(r.tipe || "").toUpperCase() === "N" &&
                    String(r.balance || "").toUpperCase() === "D"
            )
            .filter(
                (r) =>
                    !needle ||
                    String(r.nm_rek || "")
                        .toLowerCase()
                        .includes(needle) ||
                    String(r.kd_rek || "")
                        .toLowerCase()
                        .includes(needle)
            );
    }, [rekening, qBank]);

    const loadRekening = async () => {
        try {
            const res = await axios.get("/api/akutansi/rekening", {
                params: { per_page: 1000 },
            });
            const rows = res?.data?.data || [];
            setRekening(rows);
        } catch {}
    };

    useEffect(() => {
        loadRekening();
    }, []);

    const validate = () => {
        const e = {};
        if (!form.kd_rek_kas) e.kd_rek_kas = "Pilih akun Kas";
        if (!form.kd_rek_bank) e.kd_rek_bank = "Pilih akun Bank";
        if (
            form.kd_rek_kas &&
            form.kd_rek_bank &&
            form.kd_rek_kas === form.kd_rek_bank
        )
            e.kd_rek_bank = "Kas dan Bank tidak boleh sama";
        const n = Number(form.nominal);
        if (!form.nominal || Number.isNaN(n) || n <= 0)
            e.nominal = "Nominal harus > 0";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const buildStorePayload = () => ({
        tgl_setor: form.tanggal,
        no_bukti: form.no_bukti || undefined,
        keterangan: form.keterangan || undefined,
        kd_rek_kas: form.kd_rek_kas,
        kd_rek_bank: form.kd_rek_bank,
        nominal: Number(form.nominal),
    });

    const upsertSetoran = async () => {
        const payload = buildStorePayload();
        let id = setoranId;
        if (!id) {
            const res = await axios.post("/api/akutansi/setoran-bank", payload);
            id = res?.data?.id;
            if (!id) throw new Error("Gagal membuat setoran bank");
            setSetoranId(id);
        } else {
            await axios.put(`/api/akutansi/setoran-bank/${id}`, payload);
        }
        return id;
    };

    const stage = async () => {
        if (!validate()) return;
        setLoading(true);
        try {
            const id = await upsertSetoran();
            const res = await axios.post(
                `/api/akutansi/setoran-bank/${id}/stage`,
                { reset: !!form.reset }
            );
            const data = res?.data || {};
            setPreview({
                meta: data.meta || preview.meta,
                lines: data.lines || [],
            });
        } catch (e) {
            const msg =
                e?.response?.data?.message ||
                e?.message ||
                "Gagal menyiapkan staging setoran bank";
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    const post = async () => {
        if (!preview?.lines || preview.lines.length < 2) {
            alert("Staging belum siap");
            return;
        }
        setPosting(true);
        try {
            const id = setoranId ?? (await upsertSetoran());
            const payload = {
                no_bukti: form.no_bukti || undefined,
                keterangan: form.keterangan || undefined,
                tgl_jurnal: form.tanggal,
            };
            const res = await axios.post(
                `/api/akutansi/setoran-bank/${id}/post`,
                payload
            );
            const noJ = res?.data?.no_jurnal || "";
            setPreview({
                meta: { jml: 0, debet: 0, kredit: 0, balanced: false },
                lines: [],
            });
            alert(
                noJ ? `Berhasil posting. No Jurnal: ${noJ}` : "Berhasil posting"
            );
            setSetoranId(null);
        } catch (e) {
            const msg =
                e?.response?.data?.message ||
                e?.response?.data?.error ||
                e?.message ||
                "Gagal posting setoran bank";
            alert(msg);
        } finally {
            setPosting(false);
        }
    };

    return (
        <SidebarKeuangan>
            <Head title="Keuangan - Setoran Bank" />
            <div className="py-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    <motion.div
                        variants={itemVariants}
                        className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 p-6 md:p-8"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
                        <div className="relative flex items-center gap-4">
                            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
                                <Wallet
                                    className="w-6 h-6 text-white"
                                    aria-hidden="true"
                                />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Setoran Bank
                            </h1>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card
                            title="Input"
                            right={
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={stage}
                                        disabled={loading}
                                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Filter className="w-4 h-4" />
                                        )}{" "}
                                        Stage
                                    </button>
                                    <button
                                        onClick={post}
                                        disabled={posting}
                                        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {posting ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Banknote className="w-4 h-4" />
                                        )}{" "}
                                        Post
                                    </button>
                                    <button
                                        onClick={loadRekening}
                                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        <RefreshCcw className="w-4 h-4" />{" "}
                                        Refresh Akun
                                    </button>
                                </div>
                            }
                        >
                            <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Tanggal
                                        </label>
                                        <div className="mt-1 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-500" />
                                            <input
                                                type="date"
                                                value={form.tanggal}
                                                onChange={(e) =>
                                                    setForm((f) => ({
                                                        ...f,
                                                        tanggal: e.target.value,
                                                    }))
                                                }
                                                className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Nominal
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={form.nominal}
                                            onChange={(e) =>
                                                setForm((f) => ({
                                                    ...f,
                                                    nominal: e.target.value,
                                                }))
                                            }
                                            className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50"
                                        />
                                        {errors.nominal && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors.nominal}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="reset-stage"
                                            type="checkbox"
                                            checked={!!form.reset}
                                            onChange={(e) =>
                                                setForm((f) => ({
                                                    ...f,
                                                    reset: e.target.checked,
                                                }))
                                            }
                                        />
                                        <label
                                            htmlFor="reset-stage"
                                            className="text-sm"
                                        >
                                            Reset staging sebelum Stage
                                        </label>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Akun Kas
                                        </label>
                                        <div className="mt-1 flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={qKas}
                                                onChange={(e) =>
                                                    setQKas(e.target.value)
                                                }
                                                placeholder="Cari akun kas"
                                                className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                                            />
                                        </div>
                                        <div className="mt-2 max-h-40 overflow-auto rounded-md border border-gray-200 dark:border-gray-700">
                                            <ul>
                                                {kasOptions
                                                    .slice(0, 50)
                                                    .map((r) => (
                                                        <li key={r.kd_rek}>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setForm(
                                                                        (
                                                                            f
                                                                        ) => ({
                                                                            ...f,
                                                                            kd_rek_kas:
                                                                                r.kd_rek,
                                                                        })
                                                                    )
                                                                }
                                                                className={`w-full text-left px-3 py-2 text-sm ${
                                                                    form.kd_rek_kas ===
                                                                    r.kd_rek
                                                                        ? "bg-blue-50 dark:bg-blue-900/30"
                                                                        : "hover:bg-gray-50 dark:hover:bg-gray-800"
                                                                }`}
                                                            >
                                                                <div className="flex items-center justify-between">
                                                                    <span className="font-mono text-xs sm:text-sm">
                                                                        {
                                                                            r.kd_rek
                                                                        }
                                                                    </span>
                                                                    <span className="text-xs">
                                                                        {
                                                                            r.nm_rek
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                        {errors.kd_rek_kas && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors.kd_rek_kas}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Akun Bank
                                        </label>
                                        <div className="mt-1 flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={qBank}
                                                onChange={(e) =>
                                                    setQBank(e.target.value)
                                                }
                                                placeholder="Cari akun bank"
                                                className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                                            />
                                        </div>
                                        <div className="mt-2 max-h-40 overflow-auto rounded-md border border-gray-200 dark:border-gray-700">
                                            <ul>
                                                {bankOptions
                                                    .slice(0, 50)
                                                    .map((r) => (
                                                        <li key={r.kd_rek}>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setForm(
                                                                        (
                                                                            f
                                                                        ) => ({
                                                                            ...f,
                                                                            kd_rek_bank:
                                                                                r.kd_rek,
                                                                        })
                                                                    )
                                                                }
                                                                className={`w-full text-left px-3 py-2 text-sm ${
                                                                    form.kd_rek_bank ===
                                                                    r.kd_rek
                                                                        ? "bg-indigo-50 dark:bg-indigo-900/30"
                                                                        : "hover:bg-gray-50 dark:hover:bg-gray-800"
                                                                }`}
                                                            >
                                                                <div className="flex items-center justify-between">
                                                                    <span className="font-mono text-xs sm:text-sm">
                                                                        {
                                                                            r.kd_rek
                                                                        }
                                                                    </span>
                                                                    <span className="text-xs">
                                                                        {
                                                                            r.nm_rek
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                        {errors.kd_rek_bank && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors.kd_rek_bank}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </form>
                            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            No Bukti
                                        </label>
                                        <input
                                            type="text"
                                            value={form.no_bukti}
                                            onChange={(e) =>
                                                setForm((f) => ({
                                                    ...f,
                                                    no_bukti: e.target.value,
                                                }))
                                            }
                                            className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Keterangan
                                        </label>
                                        <input
                                            type="text"
                                            value={form.keterangan}
                                            onChange={(e) =>
                                                setForm((f) => ({
                                                    ...f,
                                                    keterangan: e.target.value,
                                                }))
                                            }
                                            className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/50"
                                        />
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        Debet: Bank • Kredit: Kas
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-xl border border-white/60 bg-white/70 backdrop-blur-md shadow-sm p-4">
                                        <div className="text-sm text-slate-600">
                                            Debet
                                        </div>
                                        <div className="mt-1 text-2xl font-bold text-emerald-600">
                                            {nf(preview?.meta?.debet || 0)}
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-white/60 bg-white/70 backdrop-blur-md shadow-sm p-4">
                                        <div className="text-sm text-slate-600">
                                            Kredit
                                        </div>
                                        <div className="mt-1 text-2xl font-bold text-rose-600">
                                            {nf(preview?.meta?.kredit || 0)}
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div
                                            className={`rounded-xl border ${
                                                preview?.meta?.balanced
                                                    ? "border-emerald-300 bg-emerald-50"
                                                    : "border-rose-300 bg-rose-50"
                                            } p-3 flex items-center gap-2`}
                                        >
                                            {preview?.meta?.balanced ? (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                            ) : (
                                                <AlertCircle className="w-4 h-4 text-rose-600" />
                                            )}
                                            <span className="text-sm">
                                                {preview?.meta?.balanced
                                                    ? "Seimbang"
                                                    : "Belum seimbang"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <div className="overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <Table className="text-sm">
                                <TableHeader>
                                    <TableRow className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                                        <TableHead>Kode</TableHead>
                                        <TableHead>Nama Rekening</TableHead>
                                        <TableHead className="text-right">
                                            Debet
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Kredit
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {preview?.lines &&
                                    preview.lines.length > 0 ? (
                                        preview.lines.map((r, idx) => (
                                            <TableRow
                                                key={idx}
                                                className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30"
                                            >
                                                <TableCell className="font-mono text-xs sm:text-sm">
                                                    {r.kd_rek}
                                                </TableCell>
                                                <TableCell>
                                                    {r.nm_rek || "-"}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {nf(r.debet)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {nf(r.kredit)}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="py-8"
                                            >
                                                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                                    <Filter className="w-4 h-4" />{" "}
                                                    Belum ada staging. Isi form
                                                    dan klik Stage.
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </SidebarKeuangan>
    );
}

SetoranBankPage.layout = (page) => (
    <SidebarKeuangan title="Keuangan" children={page} />
);
