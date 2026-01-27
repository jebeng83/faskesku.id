import React, { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import SidebarFarmasi from "@/Layouts/SidebarFarmasi";
import axios from "axios";
import { motion } from "framer-motion";
import { Search as SearchIcon, RefreshCcw, PackageOpen, Printer } from "lucide-react";

export default function CekStok() {
    const [bangsal, setBangsal] = useState([]);
    const [kdBangsal, setKdBangsal] = useState("");
    const [nmBangsal, setNmBangsal] = useState("");
    const [q, setQ] = useState("");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [appSetting, setAppSetting] = useState(null);

    const cekStokDataUrl = "/farmasi/sisa-stok/data";

    useEffect(() => {
        const fetchLokasi = async () => {
            try {
                const { data } = await axios.get("/farmasi/pembelian/lokasi", {
                    headers: { Accept: "application/json" },
                    withCredentials: true,
                });
                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.data)
                    ? data.data
                    : Array.isArray(data?.list)
                    ? data.list
                    : [];
                setBangsal(list);
            } catch {
                setBangsal([]);
            }
        };
        fetchLokasi();
        return () => {};
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/setting/app", { headers: { Accept: "application/json" } });
                if (res.ok) {
                    const json = await res.json();
                    const d = Array.isArray(json?.data) && json.data.length ? json.data[0] : null;
                    setAppSetting(d);
                }
            } catch {}
        })();
    }, []);

    const defaultBangsal = useMemo(() => {
        const ap = bangsal.find(
            (b) =>
                String(b?.kd_bangsal || "").toUpperCase() === "AP" ||
                String(b?.nm_bangsal || "")
                    .toLowerCase()
                    .includes("apotek")
        );
        return ap || (bangsal.length ? bangsal[0] : null);
    }, [bangsal]);

    useEffect(() => {
        if (!kdBangsal && defaultBangsal) {
            setKdBangsal(defaultBangsal.kd_bangsal);
            setNmBangsal(defaultBangsal.nm_bangsal || "");
        }
    }, [defaultBangsal, kdBangsal]);

    useEffect(() => {
        if (!kdBangsal) {
            setNmBangsal("");
            return;
        }
        const f = bangsal.find((b) => b.kd_bangsal === kdBangsal);
        setNmBangsal(f ? f.nm_bangsal || "" : "");
    }, [kdBangsal, bangsal]);

    const metaText = useMemo(() => {
        const loc = kdBangsal
            ? `${kdBangsal}${nmBangsal ? " — " + nmBangsal : ""}`
            : "Lokasi belum dipilih";
        const kw = q ? `kata kunci: ${q}` : "tanpa kata kunci";
        return `${loc} • ${kw}`;
    }, [kdBangsal, nmBangsal, q]);

    const triggerSearch = async () => {
        if (!kdBangsal) {
            setItems([]);
            return;
        }
        setLoading(true);
        try {
            const { data } = await axios.get(cekStokDataUrl, {
                params: { q, per_page: 1000 },
                headers: { Accept: "application/json" },
                withCredentials: true,
            });
            const rows = Array.isArray(data?.items?.data)
                ? data.items.data
                : Array.isArray(data?.items)
                ? data.items
                : Array.isArray(data)
                ? data
                : [];
            const mapped = rows.map((r) => ({
                kode_brng: r?.kode_brng || "",
                nama_brng: r?.nama_brng || "",
                jenis: "",
                kode_sat: r?.kode_sat || "",
                dasar: Number(r?.harga_satuan ?? 0),
                stok: Number((r?.stok_per_gudang || {})[kdBangsal] ?? 0),
            }));
            setItems(mapped.filter((it) => Number(it.stok) > 0));
        } catch {
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        if (!kdBangsal) return;
        const now = new Date();
        const createdAt = now.toLocaleString("id-ID");
        const locText = kdBangsal ? `${kdBangsal}${nmBangsal ? " — " + nmBangsal : ""}` : "-";
        const kwText = q || "-";
        const orgName = appSetting?.nama_instansi || "Nama Instansi";
        const orgAddrParts = [appSetting?.alamat_instansi || "", [appSetting?.kabupaten, appSetting?.propinsi].filter(Boolean).join(" ")].filter(Boolean);
        const orgAddr = orgAddrParts.join(" • ");
        const orgContactParts = [appSetting?.kontak || "", appSetting?.email || ""].filter(Boolean);
        const orgContact = orgContactParts.join(" • ");
        const logoUrl = appSetting?.nama_instansi ? `/setting/app/${encodeURIComponent(appSetting.nama_instansi)}/logo` : "";
        const rowsHtml = (items || [])
            .map((row) => {
                const kode = row?.kode_brng || row?.kode || "";
                const nama = row?.nama_brng || row?.nama || "";
                const kategori = row?.jenis || row?.kategori || row?.nama || "-";
                const satuan = row?.kode_sat || row?.satuan || "";
                const hargaNum = Number(row?.dasar ?? row?.harga ?? 0);
                const stokNum = Number(row?.stok ?? 0);
                const harga = hargaNum.toLocaleString("id-ID");
                const stok = stokNum.toLocaleString("id-ID");
                return `<tr>
                    <td style="padding:8px;border-bottom:1px solid #f3f4f6;">${kode}</td>
                    <td style="padding:8px;border-bottom:1px solid #f3f4f6;">${nama}</td>
                    <td style="padding:8px;border-bottom:1px solid #f3f4f6;">${kategori}</td>
                    <td style="padding:8px;border-bottom:1px solid #f3f4f6;">${satuan}</td>
                    <td style="padding:8px;border-bottom:1px solid #f3f4f6;text-align:right;">${harga}</td>
                    <td style="padding:8px;border-bottom:1px solid #f3f4f6;text-align:right;">${stok}</td>
                </tr>`;
            })
            .join("");
        const totalItems = (items || []).length;
        const totalStok = (items || []).reduce((acc, it) => acc + Number(it?.stok ?? 0), 0);
        const totalNilai = (items || []).reduce((acc, it) => acc + Number(it?.stok ?? 0) * Number(it?.dasar ?? 0), 0);
        const totalStokTxt = totalStok.toLocaleString("id-ID");
        const totalNilaiTxt = totalNilai.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
        const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Laporan Cek Stok Obat</title>
<style>
  body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Noto Sans", sans-serif; line-height: 1.5; color: #111827; padding: 24px; }
  .letterhead { display: flex; align-items: center; gap: 16px; border-bottom: 2px solid #1f2937; padding-bottom: 12px; margin-bottom: 20px; }
  .logo { width: 72px; height: 72px; object-fit: contain; }
  .org { flex: 1; }
  .org h1 { font-size: 18px; font-weight: 700; margin: 0; color: #0f172a; }
  .org p { margin: 2px 0; font-size: 12px; color: #374151; }
  .title { text-align: center; font-size: 16px; font-weight: 600; margin: 8px 0 16px; color: #0f172a; }
  .meta { text-align: center; font-size: 12px; color: #6b7280; margin-bottom: 12px; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  thead th { background: #f3f4f6; color: #111827; text-align: left; padding: 8px; border-bottom: 1px solid #e5e7eb; }
  tbody td { padding: 8px; border-bottom: 1px solid #f3f4f6; }
  tbody tr:nth-child(even) { background: #fafafa; }
  .summary { margin-top: 16px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
  .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; }
  .card .label { font-size: 11px; color: #6b7280; }
  .card .value { font-size: 14px; font-weight: 600; color: #111827; }
  @media print { thead th { background: #eee !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  @page { size: auto; margin: 12mm; }
</style>
</head>
<body>
  <div class="letterhead">
    ${logoUrl ? `<img class="logo" src="${logoUrl}" alt="Logo" />` : `<div class="logo" style="border:1px solid #e5e7eb"></div>`}
    <div class="org">
      <h1>${orgName}</h1>
      ${orgAddr ? `<p>${orgAddr}</p>` : ""}
      ${orgContact ? `<p>${orgContact}</p>` : ""}
    </div>
  </div>

  <div class="title">Laporan Cek Stok Obat</div>
  <div class="meta">Lokasi: ${locText} • Kata kunci: ${kwText} • Dicetak: ${createdAt}</div>

  <table>
    <thead>
      <tr>
        <th>Kode Barang</th>
        <th>Nama Barang</th>
        <th>Kategori</th>
        <th>Satuan</th>
        <th style="text-align:right;">Harga</th>
        <th style="text-align:right;">Stok</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>

  <div class="summary">
    <div class="card"><div class="label">Jumlah Item</div><div class="value">${totalItems.toLocaleString("id-ID")}</div></div>
    <div class="card"><div class="label">Total Stok</div><div class="value">${totalStokTxt}</div></div>
    <div class="card"><div class="label">Total Nilai (IDR)</div><div class="value">${totalNilaiTxt}</div></div>
  </div>
</body>
</html>`;
        const w = window.open("", "PRINT", "width=1024,height=768");
        if (!w) return;
        w.document.write(html);
        w.document.close();
        w.focus();
        w.print();
        w.close();
    };

    const resetFilters = () => {
        if (defaultBangsal) {
            setKdBangsal(defaultBangsal.kd_bangsal);
            setNmBangsal(defaultBangsal.nm_bangsal || "");
        } else {
            setKdBangsal("");
            setNmBangsal("");
        }
        setQ("");
        setItems([]);
    };

    return (
        <SidebarFarmasi title="Farmasi">
            <Head title="Cek Stok Obat" />
            <div className="space-y-6">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                                Cek Stok Obat
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {metaText}
                            </p>
                        </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200 border border-blue-100 dark:border-blue-900">
                            {kdBangsal
                                ? `${kdBangsal}${
                                      nmBangsal ? " — " + nmBangsal : ""
                                  }`
                                : "Lokasi belum dipilih"}
                        </span>
                        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                            {q ? `Kata kunci: ${q}` : "Tanpa kata kunci"}
                        </span>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="mx-auto px-4 sm:px-6 lg:px-12 xl:px-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Lokasi
                            </label>
                            <select
                                value={kdBangsal}
                                onChange={(e) => setKdBangsal(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm"
                            >
                                <option value="">Pilih Lokasi</option>
                                {bangsal.map((lokasi) => (
                                    <option
                                        key={lokasi.kd_bangsal}
                                        value={lokasi.kd_bangsal}
                                    >
                                        {lokasi.kd_bangsal} —{" "}
                                        {lokasi.nm_bangsal}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="md:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Kata Kunci
                            </label>
                            <div className="flex items-center gap-2 min-w-0">
                                <input
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") triggerSearch();
                                    }}
                                    placeholder="Kode/Nama/Kategori/Satuan"
                                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm"
                                />
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={triggerSearch}
                                        disabled={!kdBangsal || loading}
                                        aria-label="Cari stok"
                                        className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 hover:shadow-xl hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <SearchIcon className="h-4 w-4 mr-2" />
                                        Cari
                                    </button>
                                    <button
                                        onClick={handlePrint}
                                        disabled={!kdBangsal || loading || items.length === 0}
                                        aria-label="Cetak hasil"
                                        className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 hover:shadow-xl hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Printer className="h-4 w-4 mr-2" />
                                        Cetak
                                    </button>
                                    <button
                                        onClick={resetFilters}
                                        aria-label="Reset filter"
                                        className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <RefreshCcw className="h-4 w-4 mr-2" />
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                Hasil
                            </h3>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {items.length} baris
                            </div>
                        </div>
                        {loading ? (
                            <div className="p-6">
                                <div className="space-y-2">
                                    {[...Array(6).keys()].map((i) => (
                                        <div
                                            key={i}
                                            className="animate-pulse h-10 bg-gray-100 dark:bg-gray-800 rounded"
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        ) : items.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-800">
                                            <th className="sticky top-0 z-10 px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 border-b bg-gray-50 dark:bg-gray-800">
                                                Kode Barang
                                            </th>
                                            <th className="sticky top-0 z-10 px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 border-b bg-gray-50 dark:bg-gray-800">
                                                Nama Barang
                                            </th>
                                            <th className="sticky top-0 z-10 px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 border-b bg-gray-50 dark:bg-gray-800">
                                                Kategori
                                            </th>
                                            <th className="sticky top-0 z-10 px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 border-b bg-gray-50 dark:bg-gray-800">
                                                Satuan
                                            </th>
                                            <th className="sticky top-0 z-10 px-3 py-2 text-right text-xs font-semibold text-gray-700 dark:text-gray-200 border-b bg-gray-50 dark:bg-gray-800">
                                                Harga
                                            </th>
                                            <th className="sticky top-0 z-10 px-3 py-2 text-right text-xs font-semibold text-gray-700 dark:text-gray-200 border-b bg-gray-50 dark:bg-gray-800">
                                                Stok
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((row, idx) => (
                                            <tr
                                                key={idx}
                                                className="border-b border-gray-100 dark:border-gray-800 odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
                                            >
                                                <td className="px-3 py-2 text-sm">
                                                    {row?.kode_brng ||
                                                        row?.kode ||
                                                        ""}
                                                </td>
                                                <td className="px-3 py-2 text-sm">
                                                    {row?.nama_brng ||
                                                        row?.nama ||
                                                        ""}
                                                </td>
                                                <td className="px-3 py-2 text-sm">
                                                    {row?.jenis ||
                                                        row?.kategori ||
                                                        row?.nama ||
                                                        "-"}
                                                </td>
                                                <td className="px-3 py-2 text-sm">
                                                    {row?.kode_sat ||
                                                        row?.satuan ||
                                                        ""}
                                                </td>
                                                <td className="px-3 py-2 text-sm text-right">
                                                    {Number(
                                                        row?.dasar ??
                                                            row?.harga ??
                                                            0
                                                    ).toLocaleString()}
                                                </td>
                                                <td className="px-3 py-2 text-sm text-right">
                                                    {Number(
                                                        row?.stok ?? 0
                                                    ).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <PackageOpen className="mx-auto h-9 w-9 text-gray-400" />
                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                    {kdBangsal
                                        ? q
                                            ? "Tidak ada data."
                                            : "Ketik kata kunci untuk mulai mencari."
                                        : "Silakan pilih lokasi terlebih dahulu untuk mencari data obat."}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </SidebarFarmasi>
    );
}
