import React from "react";
import axios from "axios";
import { usePage, router } from "@inertiajs/react";
import {
    Printer,
    Download,
    ArrowLeft,
    Loader2,
    AlertCircle,
} from "lucide-react";
import SidebarKeuangan from "@/Layouts/SidebarKeuangan";

const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
});

export default function NotaJalanPage() {
    const { no_rawat } = usePage().props;
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        if (!no_rawat) {
            setError("No. Rawat tidak ditemukan");
            setLoading(false);
            return;
        }

        const loadData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `/api/akutansi/nota-jalan/${encodeURIComponent(no_rawat)}`
                );
                setData(response.data);
                setError(null);
            } catch (e) {
                setError(
                    e?.response?.data?.message ||
                        e?.message ||
                        "Gagal memuat data nota"
                );
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [no_rawat]);

    const handlePrint = () => {
        window.print();
    };

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
        return timeString.substring(0, 5); // HH:MM
    };

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
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md">
                    <div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-4">
                        <AlertCircle className="w-6 h-6" />
                        <h2 className="text-xl font-bold">Error</h2>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        {error || "Data nota tidak ditemukan"}
                    </p>
                    <button
                        onClick={() => router.visit("/akutansi/billing")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Kembali ke Billing
                    </button>
                </div>
            </div>
        );
    }

    const {
        nota_jalan,
        reg_periksa,
        pasien,
        dokter,
        poliklinik,
        penjab,
        billing_items,
        billing_grand_total,
        pembayaran_total,
        setting,
        logo_base64,
    } = data;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            {/* Header dengan tombol aksi - tidak dicetak */}
            <div className="max-w-4xl mx-auto px-4 mb-6 print:hidden">
                <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                    <button
                        onClick={() => router.visit("/akutansi/billing")}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </button>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Printer className="w-4 h-4" />
                            Cetak
                        </button>
                        <button
                            onClick={async () => {
                                if (!no_rawat) {
                                    alert("No. Rawat tidak tersedia");
                                    return;
                                }
                                const encodedNoRawat =
                                    encodeURIComponent(no_rawat);
                                const url = `/api/akutansi/nota-jalan/${encodedNoRawat}/pdf?ts=${Date.now()}`;
                                console.log("Downloading PDF from:", url);
                                try {
                                    const response = await axios.get(url, {
                                        responseType: "blob",
                                        withCredentials: true,
                                        headers: { Accept: "application/pdf" },
                                    });

                                    const contentType =
                                        response.headers["content-type"] || "";
                                    if (
                                        !contentType.includes("application/pdf")
                                    ) {
                                        try {
                                            const text =
                                                await response.data.text();
                                            throw new Error(text);
                                        } catch {
                                            throw new Error(
                                                "Server mengembalikan respon non-PDF"
                                            );
                                        }
                                    }

                                    // Ambil nama file dari Content-Disposition jika tersedia
                                    let filename = `Nota_Jalan_${no_rawat}_${new Date().getTime()}.pdf`;
                                    const disposition =
                                        response.headers["content-disposition"];
                                    if (
                                        disposition &&
                                        disposition.includes("filename=")
                                    ) {
                                        const match = disposition.match(
                                            /filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/i
                                        );
                                        const extracted =
                                            match?.[1] || match?.[2];
                                        if (extracted) {
                                            filename =
                                                decodeURIComponent(extracted);
                                        }
                                    }

                                    const blob = new Blob([response.data], {
                                        type: "application/pdf",
                                    });
                                    const downloadUrl =
                                        window.URL.createObjectURL(blob);
                                    const link = document.createElement("a");
                                    link.href = downloadUrl;
                                    link.download = filename;
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                    window.URL.revokeObjectURL(downloadUrl);
                                } catch (error) {
                                    console.error(
                                        "Error downloading PDF via axios:",
                                        error
                                    );
                                    // Fallback: buka langsung URL agar browser menangani download
                                    try {
                                        window.open(url, "_blank");
                                    } catch {
                                        alert(
                                            "Gagal mengunduh PDF: " +
                                                (error?.message ||
                                                    "Tidak diketahui")
                                        );
                                    }
                                }
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Konten Nota - akan dicetak */}
            <div
                id="nota-content"
                className="nota-container mx-auto bg-white p-4"
                style={{ width: "8.5in", minHeight: "13in" }}
            >
                {/* Header Nota dengan Logo dan Kop Surat */}
                <div className="mb-4">
                    {/* Kop Surat: Logo di kiri, Informasi di kanan */}
                    <div className="flex items-start gap-3 mb-2">
                        {/* Logo di kiri */}
                        <div className="flex-shrink-0">
                            {logo_base64 ? (
                                <img
                                    src={logo_base64}
                                    alt="Logo Instansi"
                                    className="h-16 w-16 object-contain"
                                    style={{
                                        maxWidth: "64px",
                                        maxHeight: "64px",
                                    }}
                                />
                            ) : (
                                <div className="h-16 w-16 border border-gray-300 rounded flex items-center justify-center text-gray-400 text-xs">
                                    Logo
                                </div>
                            )}
                        </div>

                        {/* Kop Surat di kanan */}
                        <div className="flex-1 text-sm">
                            <h1 className="text-base font-bold text-gray-900 mb-0.5">
                                {setting?.nama_instansi ||
                                    "Rumah Sakit / Klinik"}
                            </h1>
                            {setting?.alamat_instansi && (
                                <p className="text-xs text-gray-700 mb-0.5">
                                    {setting.alamat_instansi}
                                </p>
                            )}
                            {(setting?.kabupaten || setting?.propinsi) && (
                                <p className="text-xs text-gray-600 mb-0.5">
                                    {[setting?.kabupaten, setting?.propinsi]
                                        .filter(Boolean)
                                        .join(", ")}
                                </p>
                            )}
                            {(setting?.kontak || setting?.email) && (
                                <p className="text-xs text-gray-600">
                                    {[
                                        setting?.kontak &&
                                            `Telp: ${setting.kontak}`,
                                        setting?.email &&
                                            `Email: ${setting.email}`,
                                    ]
                                        .filter(Boolean)
                                        .join(" • ")}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Garis pemisah */}
                    <div className="border-t border-gray-400 my-2"></div>

                    {/* Judul di tengah */}
                    <div className="text-center py-1">
                        <h2 className="text-base font-bold text-gray-900">
                            NOTA PEMBAYARAN RAWAT JALAN
                        </h2>
                    </div>

                    {/* Garis pemisah */}
                    <div className="border-t border-gray-400 mt-2"></div>
                </div>

                {/* Informasi Pasien dan Kunjungan - 2 Kolom */}
                <div className="border border-gray-400 p-3 mb-4">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                        {/* Kolom Kiri: Informasi Pasien */}
                        <div>
                            <p className="font-semibold text-gray-900 mb-1">
                                Informasi Pasien
                            </p>
                            <div className="space-y-1">
                                <div>
                                    <span className="text-gray-600">Nama:</span>{" "}
                                    <span className="font-semibold text-gray-900">
                                        {pasien?.nm_pasien || "-"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">
                                        No. RM:
                                    </span>{" "}
                                    <span className="font-semibold text-gray-900 font-mono">
                                        {pasien?.no_rkm_medis || "-"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">
                                        Alamat:
                                    </span>{" "}
                                    <span className="text-gray-900">
                                        {pasien?.alamat || "-"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Telp:</span>{" "}
                                    <span className="text-gray-900">
                                        {pasien?.no_tlp || "-"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Kanan: Informasi Kunjungan */}
                        <div>
                            <p className="font-semibold text-gray-900 mb-1">
                                Informasi Kunjungan
                            </p>
                            <div className="space-y-1">
                                <div>
                                    <span className="text-gray-600">
                                        No. Nota:
                                    </span>{" "}
                                    <span className="font-semibold text-gray-900 font-mono">
                                        {nota_jalan?.no_nota || "-"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">
                                        No. Rawat:
                                    </span>{" "}
                                    <span className="font-semibold text-gray-900 font-mono">
                                        {reg_periksa?.no_rawat || "-"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">
                                        Poliklinik:
                                    </span>{" "}
                                    <span className="text-gray-900">
                                        {poliklinik?.nm_poli || "-"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">
                                        Dokter:
                                    </span>{" "}
                                    <span className="text-gray-900">
                                        {dokter?.nm_dokter || "-"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">
                                        Penjamin:
                                    </span>{" "}
                                    <span className="text-gray-900">
                                        {penjab?.png_jawab || "-"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">
                                        Tanggal:
                                    </span>{" "}
                                    <span className="text-gray-900">
                                        {formatDate(nota_jalan?.tanggal)}{" "}
                                        {formatTime(nota_jalan?.jam)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detail Tagihan per Kategori */}
                <div className="mb-4">
                    <div className="border border-gray-400">
                        <table className="w-full border-collapse text-xs">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-400">
                                    <th
                                        className="border-r border-gray-400 px-2 py-1.5 text-left font-semibold text-gray-900"
                                        style={{ width: "5%" }}
                                    >
                                        No.
                                    </th>
                                    <th
                                        className="border-r border-gray-400 px-2 py-1.5 text-left font-semibold text-gray-900"
                                        style={{ width: "50%" }}
                                    >
                                        Tagihan
                                    </th>
                                    <th
                                        className="border-r border-gray-400 px-2 py-1.5 text-right font-semibold text-gray-900"
                                        style={{ width: "20%" }}
                                    >
                                        Biaya
                                    </th>
                                    <th
                                        className="border-r border-gray-400 px-2 py-1.5 text-center font-semibold text-gray-900"
                                        style={{ width: "10%" }}
                                    >
                                        Jml.
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-right font-semibold text-gray-900"
                                        style={{ width: "15%" }}
                                    >
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {(() => {
                                    // Deduplikasi billing_items terlebih dahulu
                                    const seenItems = new Map();
                                    const deduplicatedItems = [];

                                    if (
                                        billing_items &&
                                        billing_items.length > 0
                                    ) {
                                        billing_items.forEach((item) => {
                                            // Normalisasi field untuk konsistensi
                                            const tglByr = String(
                                                item.tgl_byr || ""
                                            ).trim();
                                            const no = String(
                                                item.no || ""
                                            ).trim();
                                            const status = String(
                                                item.status || ""
                                            ).trim();
                                            const nmPerawatan = String(
                                                item.nm_perawatan || ""
                                            ).trim();
                                            const biaya = String(
                                                item.biaya || "0"
                                            ).trim();
                                            const jumlah = String(
                                                item.jumlah || "1"
                                            ).trim();
                                            const tambahan = String(
                                                item.tambahan || "0"
                                            ).trim();

                                            // Buat unique key dari kombinasi field penting
                                            const uniqueKey = `${no}_${status}_${tglByr}_${nmPerawatan}_${biaya}_${jumlah}_${tambahan}`;

                                            // Cek apakah item sudah pernah muncul
                                            if (!seenItems.has(uniqueKey)) {
                                                seenItems.set(uniqueKey, item);
                                                deduplicatedItems.push(item);
                                            }
                                        });
                                    }

                                    // Kelompokkan billing_items berdasarkan kategori (status) setelah deduplikasi
                                    const groupedByCategory = {};
                                    let itemNumber = 1;

                                    deduplicatedItems.forEach((item) => {
                                        const category = item.status || "-";
                                        if (!groupedByCategory[category]) {
                                            groupedByCategory[category] = [];
                                        }
                                        groupedByCategory[category].push({
                                            ...item,
                                            itemNumber: itemNumber++,
                                        });
                                    });

                                    const rows = [];
                                    Object.keys(groupedByCategory).forEach(
                                        (category) => {
                                            const items =
                                                groupedByCategory[category];
                                            // Header kategori
                                            rows.push(
                                                <tr
                                                    key={`category-${category}`}
                                                    className="bg-gray-50 border-b border-gray-300"
                                                >
                                                    <td
                                                        colSpan={5}
                                                        className="px-2 py-1 font-semibold text-gray-900 border-b border-gray-300"
                                                    >
                                                        {category}
                                                    </td>
                                                </tr>
                                            );
                                            // Item dalam kategori
                                            items.forEach((item) => {
                                                rows.push(
                                                    <tr
                                                        key={
                                                            item.noindex ||
                                                            `item-${item.itemNumber}`
                                                        }
                                                        className="border-b border-gray-200"
                                                    >
                                                        <td className="border-r border-gray-300 px-2 py-1 text-gray-700">
                                                            {item.itemNumber}.
                                                        </td>
                                                        <td className="border-r border-gray-300 px-2 py-1 text-gray-900">
                                                            {item.nm_perawatan ||
                                                                "-"}
                                                        </td>
                                                        <td className="border-r border-gray-300 px-2 py-1 text-right text-gray-900">
                                                            {currency.format(
                                                                Number(
                                                                    item.biaya ||
                                                                        0
                                                                )
                                                            )}
                                                        </td>
                                                        <td className="border-r border-gray-300 px-2 py-1 text-center text-gray-700">
                                                            {item.jumlah || 1}
                                                        </td>
                                                        <td className="px-2 py-1 text-right font-semibold text-gray-900">
                                                            {currency.format(
                                                                Number(
                                                                    item.totalbiaya ||
                                                                        0
                                                                )
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            });
                                        }
                                    );

                                    if (rows.length === 0) {
                                        return (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="px-2 py-4 text-center text-gray-500"
                                                >
                                                    Tidak ada data tagihan
                                                </td>
                                            </tr>
                                        );
                                    }

                                    return rows;
                                })()}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Total di Kanan Bawah */}
                {(() => {
                    // Deduplikasi billing_items untuk perhitungan total yang akurat
                    const seenItems = new Map();
                    const deduplicatedItems = [];

                    if (billing_items && billing_items.length > 0) {
                        billing_items.forEach((item) => {
                            const tglByr = String(item.tgl_byr || "").trim();
                            const no = String(item.no || "").trim();
                            const status = String(item.status || "").trim();
                            const nmPerawatan = String(
                                item.nm_perawatan || ""
                            ).trim();
                            const biaya = String(item.biaya || "0").trim();
                            const jumlah = String(item.jumlah || "1").trim();
                            const tambahan = String(
                                item.tambahan || "0"
                            ).trim();

                            const uniqueKey = `${no}_${status}_${tglByr}_${nmPerawatan}_${biaya}_${jumlah}_${tambahan}`;

                            if (!seenItems.has(uniqueKey)) {
                                seenItems.set(uniqueKey, item);
                                deduplicatedItems.push(item);
                            }
                        });
                    }

                    // Hitung total tambahan dari data yang sudah dideduplikasi
                    const totalTambahan = deduplicatedItems.reduce(
                        (sum, item) => sum + Number(item.tambahan || 0),
                        0
                    );

                    return (
                        <div className="flex justify-end mb-4">
                            <div className="w-64 border border-gray-400 p-2 text-xs">
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-700">
                                        Total:
                                    </span>
                                    <span className="font-semibold text-gray-900 text-right">
                                        {currency.format(
                                            billing_grand_total || 0
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-700">PPN:</span>
                                    <span className="font-semibold text-gray-900 text-right">
                                        {currency.format(
                                            pembayaran_total?.besarppn || 0
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-700">
                                        Tambahan:
                                    </span>
                                    <span className="font-semibold text-gray-900 text-right">
                                        {currency.format(totalTambahan)}
                                    </span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-700">
                                        Potongan:
                                    </span>
                                    <span className="font-semibold text-gray-900 text-right">
                                        {currency.format(0)}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t border-gray-400 pt-1 mt-1">
                                    <span className="font-bold text-gray-900">
                                        Grand Total:
                                    </span>
                                    <span className="font-bold text-gray-900 text-right">
                                        {currency.format(
                                            (billing_grand_total || 0) +
                                                (pembayaran_total?.besarppn ||
                                                    0) +
                                                totalTambahan
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })()}

                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-gray-400">
                    <div className="grid grid-cols-2 gap-6 text-xs">
                        <div className="text-center">
                            <p className="text-gray-600 mb-2">
                                Pasien / Keluarga
                            </p>
                            <div className="h-12 border-b border-gray-400 mb-1"></div>
                            <p className="text-gray-500">
                                Tanda Tangan & Nama Jelas
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-600 mb-2">Petugas Kasir</p>
                            <div className="h-12 border-b border-gray-400 mb-1"></div>
                            <p className="text-gray-500">
                                Tanda Tangan & Nama Jelas
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS untuk Print - Ukuran Kertas Folio (8.5 x 13 Inci) */}
            <style>{`
                @media print {
                    body {
                        background: white;
                        margin: 0;
                        padding: 0;
                    }
                    .print\\:hidden {
                        display: none !important;
                    }
                    .print\\:shadow-none {
                        box-shadow: none !important;
                    }
                    .print\\:p-4 {
                        padding: 0.75rem !important;
                    }
                    .nota-container {
                        width: 8.5in !important;
                        min-height: 13in !important;
                        max-width: 8.5in !important;
                        margin: 0 auto !important;
                        padding: 0.5in !important;
                        box-shadow: none !important;
                    }
                    @page {
                        size: 8.5in 13in;
                        margin: 0.25in;
                    }
                    /* Pastikan tabel tidak terpotong */
                    table {
                        page-break-inside: avoid;
                    }
                    /* Pastikan border terlihat saat print */
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
            `}</style>
        </div>
    );
}

NotaJalanPage.layout = (page) => (
    <SidebarKeuangan title="Cetak Nota Jalan">{page}</SidebarKeuangan>
);
