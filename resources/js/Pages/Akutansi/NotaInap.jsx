import React from "react";
import axios from "axios";
import { usePage, router } from "@inertiajs/react";
import { ArrowLeft, AlertCircle, Loader2, Printer, Search } from "lucide-react";
import LayoutUtama from "@/Pages/LayoutUtama";
import SidebarKeuanganMenu from "@/Components/SidebarKeuanganMenu";

const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
});

const PrintStyles = () => (
    <style
        dangerouslySetInnerHTML={{
            __html: `
@page { size: 8.5in 13in; margin: 0.25in; }
@media print {
  html, body { background: #fff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body * { visibility: hidden !important; }
  #nota-content, #nota-content * { visibility: visible !important; }
  #nota-content { position: absolute !important; inset: 0 auto auto 0 !important; margin: 0 !important; }
}
`,
        }}
    />
);

export default function NotaInapPage() {
    const { no_rawat } = usePage().props;
    const [noRawatInput, setNoRawatInput] = React.useState(no_rawat || "");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [data, setData] = React.useState(null);

    const loadData = React.useCallback(async (nr) => {
        if (!nr) return;
        try {
            setLoading(true);
            const response = await axios.get(
                `/api/akutansi/nota-inap/${encodeURIComponent(nr)}`
            );
            setData(response.data);
            setError(null);
        } catch (e) {
            setData(null);
            setError(
                e?.response?.data?.message || e?.message || "Gagal memuat data nota"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        if (no_rawat) loadData(no_rawat);
    }, [loadData, no_rawat]);

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } catch {
            return dateString;
        }
    };

    const formatTime = (timeString) => {
        if (!timeString) return "-";
        return String(timeString).substring(0, 5);
    };

    const grouped = React.useMemo(() => {
        const items = Array.isArray(data?.billing_items) ? data.billing_items : [];
        const groups = new Map();
        items.forEach((it) => {
            const key = it?.status || "-";
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(it);
        });
        return Array.from(groups.entries()).map(([status, items]) => ({
            status,
            items: items.slice().sort((a, b) => (a?.noindex || 0) - (b?.noindex || 0)),
        }));
    }, [data]);

    const handleSearch = () => {
        const cleaned = String(noRawatInput || "").trim();
        if (!cleaned) return;
        router.visit(`/akutansi/nota-inap?no_rawat=${encodeURIComponent(cleaned)}`);
    };

    const handleBack = () => {
        const nr = String(no_rawat || "").trim();
        if (nr) {
            router.visit(
                `/akutansi/billing-rawat-inap?no_rawat=${encodeURIComponent(nr)}`
            );
            return;
        }
        router.visit("/akutansi/billing-rawat-inap");
    };

    if (!no_rawat) {
        return (
            <LayoutUtama title="Keuangan" left={<SidebarKeuanganMenu title="Keuangan" />}>
                <PrintStyles />
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
                    <div className="max-w-2xl mx-auto px-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                                Nota Rawat Inap
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                Masukkan No. Rawat untuk menampilkan cetakan nota.
                            </p>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="relative flex-1">
                                    <input
                                        value={noRawatInput}
                                        onChange={(e) => setNoRawatInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") handleSearch();
                                        }}
                                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 pl-9 text-sm"
                                        placeholder="contoh: 2024/11/22/0001"
                                    />
                                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                </div>
                                <button
                                    onClick={handleSearch}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                                >
                                    Tampilkan
                                </button>
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={handleBack}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Kembali
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutUtama>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                    <span className="text-gray-600 dark:text-gray-400">
                        Memuat data nota...
                    </span>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <LayoutUtama title="Keuangan" left={<SidebarKeuanganMenu title="Keuangan" />}>
                <PrintStyles />
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
                        <div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-4">
                            <AlertCircle className="w-6 h-6" />
                            <h2 className="text-xl font-bold">Error</h2>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            {error || "Data nota tidak ditemukan"}
                        </p>
                        <button
                            onClick={handleBack}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Kembali
                        </button>
                    </div>
                </div>
            </LayoutUtama>
        );
    }

    const {
        nota_inap,
        reg_periksa,
        pasien,
        dokter,
        poliklinik,
        penjab,
        billing_grand_total,
        pembayaran_total,
        setting,
        logo_base64,
    } = data;

    return (
        <LayoutUtama title="Keuangan" left={<SidebarKeuanganMenu title="Keuangan" />}>
            <PrintStyles />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
                <div className="max-w-4xl mx-auto px-4 mb-6 print:hidden">
                    <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </button>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => window.print()}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Printer className="w-4 h-4" />
                                Cetak
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    id="nota-content"
                    className="nota-container mx-auto bg-white p-4"
                    style={{ width: "8.5in", minHeight: "13in" }}
                >
                    <div className="mb-4">
                        <div className="flex items-start gap-3 mb-2">
                            <div className="flex-shrink-0">
                                {logo_base64 ? (
                                    <img
                                        src={logo_base64}
                                        alt="Logo Instansi"
                                        className="h-16 w-16 object-contain"
                                        style={{ maxWidth: "64px", maxHeight: "64px" }}
                                    />
                                ) : (
                                    <div className="h-16 w-16 border border-gray-300 rounded flex items-center justify-center text-gray-400 text-xs">
                                        Logo
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 text-sm">
                                <div className="text-center">
                                    <div className="font-bold text-base">
                                        {setting?.nama_instansi || "-"}
                                    </div>
                                    {setting?.alamat_instansi ? (
                                        <div>{setting.alamat_instansi}</div>
                                    ) : null}
                                    {(setting?.kabupaten || setting?.propinsi) ? (
                                        <div>
                                            {String(
                                                [setting?.kabupaten, setting?.propinsi]
                                                    .filter(Boolean)
                                                    .join(", ")
                                            )}
                                        </div>
                                    ) : null}
                                    {(setting?.kontak || setting?.email) ? (
                                        <div>
                                            {setting?.kontak ? `Telp: ${setting.kontak}` : ""}
                                            {setting?.kontak && setting?.email ? " • " : ""}
                                            {setting?.email ? `Email: ${setting.email}` : ""}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-black my-2" />
                        <div className="text-center font-bold text-lg">
                            NOTA PEMBAYARAN RAWAT INAP
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div className="space-y-1">
                            <div className="flex justify-between gap-2">
                                <span className="font-semibold">Nama</span>
                                <span className="flex-1 text-right">
                                    {pasien?.nm_pasien || "-"}
                                </span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span className="font-semibold">No. RM</span>
                                <span className="flex-1 text-right">
                                    {pasien?.no_rkm_medis || "-"}
                                </span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span className="font-semibold">Alamat</span>
                                <span className="flex-1 text-right">
                                    {pasien?.alamat || "-"}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between gap-2">
                                <span className="font-semibold">No. Nota</span>
                                <span className="flex-1 text-right">
                                    {nota_inap?.no_nota || "-"}
                                </span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span className="font-semibold">No. Rawat</span>
                                <span className="flex-1 text-right">
                                    {reg_periksa?.no_rawat || no_rawat || "-"}
                                </span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span className="font-semibold">Tanggal</span>
                                <span className="flex-1 text-right">
                                    {formatDate(nota_inap?.tanggal)}{" "}
                                    {formatTime(nota_inap?.jam)}
                                </span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span className="font-semibold">Dokter</span>
                                <span className="flex-1 text-right">
                                    {dokter?.nm_dokter || "-"}
                                </span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span className="font-semibold">Unit</span>
                                <span className="flex-1 text-right">
                                    {poliklinik?.nm_poli || "-"}
                                </span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span className="font-semibold">Penjamin</span>
                                <span className="flex-1 text-right">
                                    {penjab?.png_jawab || "-"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <table className="w-full text-sm border border-gray-800">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-800 px-2 py-1 w-[40px]">
                                    No
                                </th>
                                <th className="border border-gray-800 px-2 py-1 text-left">
                                    Uraian
                                </th>
                                <th className="border border-gray-800 px-2 py-1 text-right w-[110px]">
                                    Tarif
                                </th>
                                <th className="border border-gray-800 px-2 py-1 text-center w-[60px]">
                                    Jml
                                </th>
                                <th className="border border-gray-800 px-2 py-1 text-right w-[130px]">
                                    Subtotal
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {grouped.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="border border-gray-800 px-2 py-2 text-center text-gray-500"
                                    >
                                        Tidak ada item billing
                                    </td>
                                </tr>
                            ) : null}
                            {grouped.map((g) => (
                                <React.Fragment key={g.status}>
                                    <tr className="bg-gray-50">
                                        <td
                                            colSpan={5}
                                            className="border border-gray-800 px-2 py-1 font-semibold"
                                        >
                                            {g.status}
                                        </td>
                                    </tr>
                                    {g.items.map((it, idx) => {
                                        const biaya = Number(it?.biaya || 0);
                                        const jumlah = Number(it?.jumlah || 0) || 1;
                                        const tambahan = Number(it?.tambahan || 0);
                                        const total =
                                            Number(it?.totalbiaya ?? (biaya * jumlah + tambahan)) ||
                                            0;
                                        return (
                                            <tr key={`${g.status}-${it?.noindex || idx}`}>
                                                <td className="border border-gray-800 px-2 py-1 text-center">
                                                    {idx + 1}
                                                </td>
                                                <td className="border border-gray-800 px-2 py-1">
                                                    {it?.nm_perawatan || "-"}
                                                </td>
                                                <td className="border border-gray-800 px-2 py-1 text-right whitespace-nowrap">
                                                    {currency.format(biaya)}
                                                </td>
                                                <td className="border border-gray-800 px-2 py-1 text-center">
                                                    {jumlah}
                                                </td>
                                                <td className="border border-gray-800 px-2 py-1 text-right whitespace-nowrap">
                                                    {currency.format(total)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td
                                    colSpan={4}
                                    className="border border-gray-800 px-2 py-1 text-right font-bold"
                                >
                                    Total
                                </td>
                                <td className="border border-gray-800 px-2 py-1 text-right font-bold whitespace-nowrap">
                                    {currency.format(Number(billing_grand_total || 0))}
                                </td>
                            </tr>
                            {pembayaran_total ? (
                                <>
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="border border-gray-800 px-2 py-1 text-right font-semibold"
                                        >
                                            Pembayaran
                                        </td>
                                        <td className="border border-gray-800 px-2 py-1 text-right whitespace-nowrap">
                                            {currency.format(
                                                Number(pembayaran_total?.besar_bayar || 0)
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="border border-gray-800 px-2 py-1 text-right font-semibold"
                                        >
                                            PPN
                                        </td>
                                        <td className="border border-gray-800 px-2 py-1 text-right whitespace-nowrap">
                                            {currency.format(
                                                Number(pembayaran_total?.besarppn || 0)
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="border border-gray-800 px-2 py-1 text-right font-bold"
                                        >
                                            Grand Total
                                        </td>
                                        <td className="border border-gray-800 px-2 py-1 text-right font-bold whitespace-nowrap">
                                            {currency.format(
                                                Number(pembayaran_total?.grand_total || 0)
                                            )}
                                        </td>
                                    </tr>
                                </>
                            ) : null}
                        </tfoot>
                    </table>
                </div>
            </div>
        </LayoutUtama>
    );
}
