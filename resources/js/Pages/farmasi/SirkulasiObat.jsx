import React, { useEffect, useMemo, useRef, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import SidebarFarmasi from "@/Layouts/SidebarFarmasi";
import SearchableSelect from "@/Components/SearchableSelect";

function formatNumber(n) {
    const num = Number(n);
    if (!Number.isFinite(num)) return "0";
    const hasFraction = Math.floor(num) !== num;
    const opts = hasFraction
        ? { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        : { maximumFractionDigits: 0 };
    return new Intl.NumberFormat("id-ID", opts).format(num);
}

function toDateInputValue(d) {
    const pad = (x) => String(x).padStart(2, "0");
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    return `${year}-${month}-${day}`;
}

function currentMonthRange() {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return {
        start: toDateInputValue(start),
        end: toDateInputValue(end),
    };
}

export default function SirkulasiObat() {
    const [jenis, setJenis] = useState("");
    const [kategori, setKategori] = useState("");
    const [golongan, setGolongan] = useState("");
    const [q, setQ] = useState("");
    const [batchOn, setBatchOn] = useState(false);
    const [lokasi, setLokasi] = useState("AP");
    const defaultRange = currentMonthRange();
    const [tglAwal, setTglAwal] = useState(defaultRange.start);
    const [tglAkhir, setTglAkhir] = useState(defaultRange.end);

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const requestIdRef = useRef(0);
    const controllerRef = useRef(null);

    const fetchData = async (opts = {}) => {
        const id = requestIdRef.current + 1;
        requestIdRef.current = id;
        if (controllerRef.current) {
            try {
                controllerRef.current.abort();
            } catch {}
        }
        const ac = new AbortController();
        controllerRef.current = ac;
        setLoading(true);
        try {
            const { data } = await axios.get(
                "/farmasi/sirkulasi-obat/data",
                {
                    params: {
                        jenis,
                        kategori,
                        golongan,
                        q,
                        lokasi,
                        tgl_awal: tglAwal,
                        tgl_akhir: tglAkhir,
                        batch: batchOn ? "on" : "off",
                        per_page: opts.per_page ?? 200,
                        page: 1,
                    },
                    headers: { Accept: "application/json" },
                    withCredentials: true,
                    signal: ac.signal,
                }
            );
            if (id !== requestIdRef.current) return;
            const it = data?.items ?? [];
            setItems(it);
        } catch (e) {
            if (id !== requestIdRef.current) return;
            setItems([]);
        } finally {
            if (id === requestIdRef.current) setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const triggerSearch = () => {
        fetchData();
    };

    const resetFilters = () => {
        const def = currentMonthRange();
        setJenis("");
        setKategori("");
        setGolongan("");
        setQ("");
        setBatchOn(false);
        setLokasi("AP");
        setTglAwal(def.start);
        setTglAkhir(def.end);
        fetchData();
    };

    const rows = useMemo(() => {
        if (Array.isArray(items)) return items?.data ?? [];
        if (items && Array.isArray(items.data)) return items.data;
        return [];
    }, [items]);

    const totals = useMemo(() => {
        const sum = (key) =>
            rows.reduce((acc, r) => acc + Number(r?.[key]?.total || 0), 0);
        const sumJumlah = (key) =>
            rows.reduce((acc, r) => acc + Number(r?.[key]?.jumlah || 0), 0);
        const aset = rows.reduce(
            (acc, r) => acc + Number(r?.aset_stok || 0),
            0
        );
        return {
            aset,
            pengadaan: {
                jumlah: sumJumlah("pengadaan"),
                total: sum("pengadaan"),
            },
            penerimaan: {
                jumlah: sumJumlah("penerimaan"),
                total: sum("penerimaan"),
            },
            penjualan: {
                jumlah: sumJumlah("penjualan"),
                total: sum("penjualan"),
            },
            ke_pasien: {
                jumlah: sumJumlah("ke_pasien"),
                total: sum("ke_pasien"),
            },
            piutang: { jumlah: sumJumlah("piutang"), total: sum("piutang") },
            retur_beli: {
                jumlah: sumJumlah("retur_beli"),
                total: sum("retur_beli"),
            },
            retur_jual: {
                jumlah: sumJumlah("retur_jual"),
                total: sum("retur_jual"),
            },
            retur_piutang: {
                jumlah: sumJumlah("retur_piutang"),
                total: sum("retur_piutang"),
            },
            pengambilan_utd: {
                jumlah: sumJumlah("pengambilan_utd"),
                total: sum("pengambilan_utd"),
            },
            stok_keluar_medis: {
                jumlah: sumJumlah("stok_keluar_medis"),
                total: sum("stok_keluar_medis"),
            },
            resep_pulang: {
                jumlah: sumJumlah("resep_pulang"),
                total: sum("resep_pulang"),
            },
            mutasi_masuk: {
                jumlah: sumJumlah("mutasi_masuk"),
                total: sum("mutasi_masuk"),
            },
            mutasi_keluar: {
                jumlah: sumJumlah("mutasi_keluar"),
                total: sum("mutasi_keluar"),
            },
            hibah: { jumlah: sumJumlah("hibah"), total: sum("hibah") },
        };
    }, [rows]);

    return (
        <SidebarFarmasi title="Farmasi">
            <Head title="Sirkulasi Obat" />
            <div className="space-y-6">
                <div className="px-6 py-4 mb-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 rounded-lg">
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Sirkulasi Obat, Alkes & BHP Medis
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 border border-white/20 dark:border-gray-700/50">
                    <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Filter
                        </h3>
                    </div>
                    <div className="relative p-6">
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Jenis
                                </label>
                                <SearchableSelect
                                    source="farmasi_jenis"
                                    value={jenis}
                                    onChange={setJenis}
                                    placeholder="Pilih jenis obat"
                                    searchPlaceholder="Ketik nama atau kode jenis..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Kategori
                                </label>
                                <SearchableSelect
                                    source="farmasi_kategori"
                                    value={kategori}
                                    onChange={setKategori}
                                    placeholder="Pilih kategori obat"
                                    searchPlaceholder="Ketik nama atau kode kategori..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Golongan
                                </label>
                                <SearchableSelect
                                    source="farmasi_golongan"
                                    value={golongan}
                                    onChange={setGolongan}
                                    placeholder="Pilih golongan obat"
                                    searchPlaceholder="Ketik nama atau kode golongan..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Kata Kunci
                                </label>
                                <input
                                    type="text"
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Cari kode/nama barang"
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Per Lokasi
                                </label>
                                <SearchableSelect
                                    source="bangsal"
                                    value={lokasi}
                                    onChange={setLokasi}
                                    placeholder="Pilih lokasi"
                                />
                            </div>
                            <div className="flex items-end gap-2">
                                <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={batchOn}
                                        onChange={(e) =>
                                            setBatchOn(e.target.checked)
                                        }
                                    />
                                    Mode Batch
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Tanggal Awal
                                </label>
                                <input
                                    type="date"
                                    value={tglAwal}
                                    onChange={(e) => setTglAwal(e.target.value)}
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Tanggal Akhir
                                </label>
                                <input
                                    type="date"
                                    value={tglAkhir}
                                    onChange={(e) =>
                                        setTglAkhir(e.target.value)
                                    }
                                    className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div className="md:col-span-2 flex items-end gap-2">
                                <button
                                    onClick={triggerSearch}
                                    className="rounded-lg px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white"
                                >
                                    Cari
                                </button>
                                <button
                                    onClick={resetFilters}
                                    className="rounded-lg px-4 py-2.5 text-sm font-semibold bg-white/90 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-200"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
                                <th className="px-3 py-2 text-left font-semibold">
                                    Kode Barang
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Nama Barang
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Satuan
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Tgl Opname
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Nilai Aset
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Stok Awal
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Pengadaan
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Penerimaan
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Penjualan
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Ke Pasien
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Piutang Jual
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Retur Beli
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Retur Jual
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Retur Piutang
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Pengambilan UTD
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Stok Keluar Medis
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Resep Pulang
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Mutasi Masuk
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Mutasi Keluar
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Hibah
                                </th>
                                <th className="px-3 py-2 text-left font-semibold">
                                    Stok Terakhir
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr className="animate-pulse">
                                    {Array.from({ length: 21 }).map(
                                        (_, idx) => (
                                            <td
                                                key={`skel_${idx}`}
                                                className="px-3 py-2"
                                            >
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                                            </td>
                                        )
                                    )}
                                </tr>
                            )}
                            {!loading && rows.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={21}
                                        className="px-3 py-4 text-center text-gray-600 dark:text-gray-300"
                                    >
                                        Tidak ada data
                                    </td>
                                </tr>
                            )}
                            {!loading &&
                                rows.map((row, idx) => (
                                    <tr
                                        key={`${row.kode_brng}_${idx}`}
                                        className="border-b border-gray-100/50 dark:border-gray-700/30"
                                    >
                                        <td className="px-3 py-2">
                                            {row.kode_brng}
                                        </td>
                                        <td className="px-3 py-2">
                                            {row.nama_brng}
                                        </td>
                                        <td className="px-3 py-2">
                                            {row.kode_sat}
                                        </td>
                                        <td className="px-3 py-2">
                                            {row.tgl_opname_awal || "-"}
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatNumber(row.aset_stok)}
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatNumber(row.stok_awal)}
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatNumber(
                                                row?.pengadaan?.jumlah
                                            )}{" "}
                                            (
                                            {formatNumber(
                                                row?.pengadaan?.total
                                            )}
                                            )
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatNumber(
                                                row?.penerimaan?.jumlah
                                            )}{" "}
                                            (
                                            {formatNumber(
                                                row?.penerimaan?.total
                                            )}
                                            )
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatNumber(
                                                row?.penjualan?.jumlah
                                            )}{" "}
                                            (
                                            {formatNumber(
                                                row?.penjualan?.total
                                            )}
                                            )
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatNumber(
                                                row?.ke_pasien?.jumlah
                                            )}{" "}
                                            (
                                            {formatNumber(
                                                row?.ke_pasien?.total
                                            )}
                                            )
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatNumber(row?.piutang?.jumlah)}{" "}
                                            ({formatNumber(row?.piutang?.total)}
                                            )
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatNumber(
                                                row?.retur_beli?.jumlah
                                            )}{" "}
                                            (
                                            {formatNumber(
                                                row?.retur_beli?.total
                                            )}
                                            )
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatNumber(
                                                row?.retur_jual?.jumlah
                                            )}{" "}
                                            (
                                            {formatNumber(
                                                row?.retur_jual?.total
                                            )}
                                            )
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatNumber(
                                                row?.retur_piutang?.jumlah
                                            )}{" "}
                                            (
                                            {formatNumber(
                                                row?.retur_piutang?.total
                                            )}
                                            )
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatNumber(
                                                row?.pengambilan_utd?.jumlah
                                            )}{" "}
                                            (
                                            {formatNumber(
                                                row?.pengambilan_utd?.total
                                            )}
                                            )
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatNumber(
                                                row?.stok_keluar_medis?.jumlah
                                            )}{" "}
                                            (
                                            {formatNumber(
                                                row?.stok_keluar_medis?.total
                                            )}
                                            )
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatNumber(
                                                row?.resep_pulang?.jumlah
                                            )}{" "}
                                            (
                                            {formatNumber(
                                                row?.resep_pulang?.total
                                            )}
                                            )
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatNumber(
                                                row?.mutasi_masuk?.jumlah
                                            )}{" "}
                                            (
                                            {formatNumber(
                                                row?.mutasi_masuk?.total
                                            )}
                                            )
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatNumber(
                                                row?.mutasi_keluar?.jumlah
                                            )}{" "}
                                            (
                                            {formatNumber(
                                                row?.mutasi_keluar?.total
                                            )}
                                            )
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatNumber(row?.hibah?.jumlah)} (
                                            {formatNumber(row?.hibah?.total)})
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatNumber(row.stok_terakhir)}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="rounded-lg border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 p-4">
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Nilai Aset
                        </div>
                        <div className="mt-1 text-lg font-bold">
                            {formatNumber(totals.aset)}
                        </div>
                    </div>
                    <div className="rounded-lg border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 p-4">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <div className="text-xs text-gray-600">
                                    Pengadaan
                                </div>
                                <div className="font-semibold">
                                    {formatNumber(totals.pengadaan.total)} (
                                    {formatNumber(totals.pengadaan.jumlah)})
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600">
                                    Penerimaan
                                </div>
                                <div className="font-semibold">
                                    {formatNumber(totals.penerimaan.total)} (
                                    {formatNumber(totals.penerimaan.jumlah)})
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600">
                                    Penjualan
                                </div>
                                <div className="font-semibold">
                                    {formatNumber(totals.penjualan.total)} (
                                    {formatNumber(totals.penjualan.jumlah)})
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600">
                                    Ke Pasien
                                </div>
                                <div className="font-semibold">
                                    {formatNumber(totals.ke_pasien.total)} (
                                    {formatNumber(totals.ke_pasien.jumlah)})
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600">
                                    Piutang Jual
                                </div>
                                <div className="font-semibold">
                                    {formatNumber(totals.piutang.total)} (
                                    {formatNumber(totals.piutang.jumlah)})
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600">
                                    Retur Beli
                                </div>
                                <div className="font-semibold">
                                    {formatNumber(totals.retur_beli.total)} (
                                    {formatNumber(totals.retur_beli.jumlah)})
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600">
                                    Retur Jual
                                </div>
                                <div className="font-semibold">
                                    {formatNumber(totals.retur_jual.total)} (
                                    {formatNumber(totals.retur_jual.jumlah)})
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600">
                                    Retur Piutang
                                </div>
                                <div className="font-semibold">
                                    {formatNumber(totals.retur_piutang.total)} (
                                    {formatNumber(totals.retur_piutang.jumlah)})
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 p-4">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <div className="text-xs text-gray-600">
                                    Pengambilan UTD
                                </div>
                                <div className="font-semibold">
                                    {formatNumber(totals.pengambilan_utd.total)}{" "}
                                    (
                                    {formatNumber(
                                        totals.pengambilan_utd.jumlah
                                    )}
                                    )
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600">
                                    Stok Keluar Medis
                                </div>
                                <div className="font-semibold">
                                    {formatNumber(
                                        totals.stok_keluar_medis.total
                                    )}{" "}
                                    (
                                    {formatNumber(
                                        totals.stok_keluar_medis.jumlah
                                    )}
                                    )
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600">
                                    Resep Pulang
                                </div>
                                <div className="font-semibold">
                                    {formatNumber(totals.resep_pulang.total)} (
                                    {formatNumber(totals.resep_pulang.jumlah)})
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600">
                                    Mutasi Masuk
                                </div>
                                <div className="font-semibold">
                                    {formatNumber(totals.mutasi_masuk.total)} (
                                    {formatNumber(totals.mutasi_masuk.jumlah)})
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600">
                                    Mutasi Keluar
                                </div>
                                <div className="font-semibold">
                                    {formatNumber(totals.mutasi_keluar.total)} (
                                    {formatNumber(totals.mutasi_keluar.jumlah)})
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600">
                                    Hibah
                                </div>
                                <div className="font-semibold">
                                    {formatNumber(totals.hibah.total)} (
                                    {formatNumber(totals.hibah.jumlah)})
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarFarmasi>
    );
}
