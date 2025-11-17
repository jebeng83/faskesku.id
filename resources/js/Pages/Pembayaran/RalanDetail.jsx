import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
});

const sectionTitleClass = "text-lg font-semibold text-gray-900 dark:text-white";
const formatCurrency = (value) => currencyFormatter.format(value ?? 0);

const ResepCard = ({ resep }) => (
    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Nomor Resep</p>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">{resep.no_resep}</h4>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {resep.tgl_peresepan} • {resep.jam_peresepan}
                </div>
            </div>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {resep.items.map((item, idx) => (
                <div
                    key={`${resep.no_resep}-${item.kode_brng}-${idx}`}
                    className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.nama_brng}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Kode: {item.kode_brng} • {item.satuan || "-"}
                        </p>
                        {item.aturan_pakai && (
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Aturan: {item.aturan_pakai}</p>
                        )}
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(item.harga)}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Jumlah: {item.jumlah}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default function RalanDetail({
    reg_periksa,
    tindakan_kategori = [],
    tindakan_summary = {},
    resep_obat = [],
}) {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cash");

    if (!reg_periksa) {
        return (
            <AppLayout title="Pembayaran Ralan">
                <div className="-mt-6 -mx-6 p-6">
                    <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center text-gray-500 dark:text-gray-400">
                        Data tidak ditemukan.
                    </div>
                </div>
            </AppLayout>
        );
    }

    const totalKategori = tindakan_summary?.jumlah_kategori ?? tindakan_kategori.length;
    const totalTindakan = tindakan_summary?.jumlah_tindakan ?? 0;
    const totalBiaya =
        tindakan_summary?.grand_total ?? tindakan_kategori.reduce((sum, item) => sum + (item.total_biaya ?? 0), 0);

    return (
        <>
            <AppLayout title="Detail Pembayaran Ralan">
                <div className="-mt-6 -mx-6 p-6 space-y-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Pembayaran</p>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Detail Rawat Jalan</h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Nomor Rawat <span className="font-semibold">{reg_periksa.no_rawat}</span> • Status Bayar{" "}
                                <span className="font-semibold">{reg_periksa.status_bayar ?? "-"}</span>
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                                Dokter: {reg_periksa.dokter || "-"} • Poliklinik: {reg_periksa.poliklinik || "-"}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href={route("pembayaran.ralan")}
                                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                            >
                                &larr; Kembali ke daftar
                            </Link>
                            <button
                                type="button"
                                onClick={() => setShowPaymentModal(true)}
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition"
                            >
                                Validasi Pembayaran
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
                            <h3 className={sectionTitleClass}>Data Pasien</h3>
                            <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                <p className="flex justify-between">
                                    <span>Nama</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{reg_periksa.pasien?.nama}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>No. RM</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{reg_periksa.pasien?.no_rkm_medis}</span>
                                </p>
                                <p className="text-xs">{reg_periksa.pasien?.alamat}</p>
                                {reg_periksa.pasien?.no_tlp && <p className="text-xs text-gray-500">Telp: {reg_periksa.pasien.no_tlp}</p>}
                            </div>
                        </div>
                        <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
                            <h3 className={sectionTitleClass}>Registrasi</h3>
                            <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                <p>
                                    Tanggal:{" "}
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {reg_periksa.tgl_registrasi} • {reg_periksa.jam_reg}
                                    </span>
                                </p>
                                <p>Penjamin: {reg_periksa.penjamin}</p>
                                <p>Biaya Registrasi: {formatCurrency(reg_periksa.biaya_reg)}</p>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
                            <h3 className={sectionTitleClass}>Ringkasan</h3>
                            <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                <p>Total Kategori: {totalKategori}</p>
                                <p>Total Tindakan: {totalTindakan}</p>
                                <p>Total Biaya Tindakan: {formatCurrency(totalBiaya)}</p>
                                <p>Resep: {resep_obat.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <h3 className={sectionTitleClass}>Total Tindakan per Kategori</h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{tindakan_kategori.length} kategori</span>
                        </div>
                        {tindakan_kategori.length === 0 ? (
                            <div className="px-6 py-8 text-sm text-gray-500 dark:text-gray-400">Tidak ada data.</div>
                        ) : (
                            <div className="overflow-x-auto px-2">
                                <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                                    <thead>
                                        <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                            <th className="px-3 py-3 whitespace-nowrap">Kategori</th>
                                            <th className="px-3 py-3 whitespace-nowrap">Nama Biaya</th>
                                            <th className="px-3 py-3 whitespace-nowrap">Total Biaya</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {tindakan_kategori.map((row) => (
                                            <tr key={row.kategori} className="hover:bg-gray-50 dark:hover:bg-gray-800/60">
                                                <td className="px-3 py-3 whitespace-nowrap text-gray-900 dark:text-white font-semibold">
                                                    {row.kategori}
                                                </td>
                                                <td className="px-3 py-3 text-gray-900 dark:text-white">
                                                    <div className="flex flex-col gap-1">
                                                        {row.items?.map((item, idx) => (
                                                            <div
                                                                key={`${row.kategori}-${idx}`}
                                                                className="flex items-center justify-between gap-3 text-xs sm:text-sm"
                                                            >
                                                                <span>{item.nama}</span>
                                                                <span className="font-semibold">{formatCurrency(item.biaya)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-3 py-3 whitespace-nowrap text-gray-900 dark:text-white">
                                                    {formatCurrency(row.total_biaya)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <h2 className={sectionTitleClass}>Resep & Obat</h2>
                        {resep_obat.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                                Tidak ada resep untuk kunjungan ini.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {resep_obat.map((resep) => (
                                    <ResepCard key={resep.no_resep} resep={resep} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </AppLayout>

            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowPaymentModal(false)}
                        aria-hidden="true"
                    />
                    <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Validasi Pembayaran</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Pilih metode pembayaran yang akan digunakan untuk kunjungan ini.
                                </p>
                            </div>
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                                aria-label="Tutup"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-3">
                            <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                <input
                                    type="radio"
                                    name="payment_method"
                                    className="mt-1 text-blue-600 focus:ring-blue-500"
                                    value="cash"
                                    checked={paymentMethod === "cash"}
                                    onChange={() => setPaymentMethod("cash")}
                                />
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">Pembayaran Tunai</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Pasien membayar langsung di kasir saat ini.</p>
                                </div>
                            </label>

                            <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                <input
                                    type="radio"
                                    name="payment_method"
                                    className="mt-1 text-blue-600 focus:ring-blue-500"
                                    value="piutang"
                                    checked={paymentMethod === "piutang"}
                                    onChange={() => setPaymentMethod("piutang")}
                                />
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">Piutang / Penjamin</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Tagihkan ke penjamin atau pasien di kemudian hari.
                                    </p>
                                </div>
                            </label>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                                onClick={() => {
                                    // Placeholder aksi bayar
                                    setShowPaymentModal(false);
                                }}
                            >
                                Bayar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

