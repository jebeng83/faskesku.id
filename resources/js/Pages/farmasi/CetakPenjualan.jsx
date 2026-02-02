import React, { useEffect } from "react";
import { Head } from "@inertiajs/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(val);
};

export default function CetakPenjualan({ penjualan, instansi, nota }) {
    useEffect(() => {
        // Auto-print on load
        const timer = setTimeout(() => {
            window.print();
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    if (!penjualan) {
        return (
            <div className="bg-white min-h-screen text-black p-4 font-mono text-sm max-w-[80mm] mx-auto print:p-0 print:max-w-full">
                <Head title={`Cetak Nota ${nota || '-'}`} />
                <div className="no-print mt-4 mb-8 flex justify-center gap-4">
                    <button onClick={() => window.history.back()} className="px-4 py-2 bg-gray-200 text-gray-800 rounded font-bold">KEMBALI</button>
                </div>
                <div className="text-center border-b border-dashed border-gray-400 pb-2">
                    <h1 className="font-bold text-base uppercase">{instansi?.nama_instansi || 'APOTEK FASKES'}</h1>
                </div>
                <div className="py-6 text-center">
                    <div className="text-lg font-black">Nota tidak ditemukan</div>
                    <div className="text-xs text-gray-500 mt-1">{nota}</div>
                </div>
            </div>
        );
    }

    const subtotal = penjualan.detail.reduce((acc, item) => acc + Number(item.total), 0);
    const totalTagihan = subtotal + Number(penjualan.ppn) + Number(penjualan.ongkir);

    return (
        <div className="bg-white min-h-screen text-black p-4 font-mono text-sm max-w-[80mm] mx-auto print:p-0 print:max-w-full">
            <Head title={`Cetak Nota ${penjualan.nota_jual}`} />

            <style>{`
                @page { size: 80mm auto; margin: 0; }
                @media print {
                    .no-print { display: none; }
                    body { background: white; padding: 0; }
                }
            `}</style>

            <div className="no-print mt-4 mb-8 flex justify-center gap-4">
                <button onClick={() => window.print()} className="px-4 py-2 bg-emerald-600 text-white rounded font-bold">CETAK</button>
                <button onClick={() => window.history.back()} className="px-4 py-2 bg-gray-200 text-gray-800 rounded font-bold">KEMBALI</button>
            </div>

            <div className="text-center border-b border-dashed border-gray-400 pb-2">
                <h1 className="font-bold text-base uppercase">{instansi?.nama_instansi || 'APOTEK FASKES'}</h1>
                <p className="text-[10px] leading-tight">{instansi?.alamat_instansi}</p>
                <p className="text-[10px]">{instansi?.kontak}</p>
            </div>

            <div className="py-2 space-y-1 text-[11px]">
                <div className="flex justify-between">
                    <span>Nota:</span>
                    <span className="font-bold">{penjualan.nota_jual}</span>
                </div>
                <div className="flex justify-between">
                    <span>Tanggal:</span>
                    <span>{penjualan.tgl_jual ? format(new Date(penjualan.tgl_jual), 'dd/MM/yyyy', { locale: id }) : '-'}</span>
                </div>
                <div className="flex justify-between">
                    <span>Pasien:</span>
                    <span className="uppercase">{penjualan.nm_pasien || 'UMUM'}</span>
                </div>
                <div className="flex justify-between">
                    <span>Kasir:</span>
                    <span>{penjualan.petugas || penjualan.nip}</span>
                </div>
            </div>

            <div className="border-y border-dashed border-gray-400 py-1">
                <table className="w-full text-[11px]">
                    <tbody>
                        {penjualan.detail.map((it, idx) => (
                            <React.Fragment key={idx}>
                                <tr>
                                    <td colSpan="3" className="font-bold">{it.nama_brng}</td>
                                </tr>
                                <tr className="border-b border-gray-50 last:border-none">
                                    <td className="py-1">{it.jumlah} {it.kode_sat} x {formatCurrency(it.h_jual)}</td>
                                    <td className="py-1 text-center">{it.dis > 0 ? `-${it.dis}%` : ''}</td>
                                    <td className="py-1 text-right font-bold">{formatCurrency(it.total)}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="py-2 space-y-1 text-[11px]">
                <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(subtotal)}</span>
                </div>
                {Number(penjualan.ppn) > 0 && (
                    <div className="flex justify-between">
                        <span>PPN:</span>
                        <span>{formatCurrency(penjualan.ppn)}</span>
                    </div>
                )}
                {Number(penjualan.ongkir) > 0 && (
                    <div className="flex justify-between">
                        <span>Ongkir:</span>
                        <span>{formatCurrency(penjualan.ongkir)}</span>
                    </div>
                )}
                <div className="flex justify-between text-base font-black pt-1 border-t border-dashed border-gray-400 mt-1">
                    <span>TOTAL:</span>
                    <span>{formatCurrency(totalTagihan)}</span>
                </div>
            </div>

            <div className="mt-6 text-center text-[10px] italic">
                <p>Terima kasih atas kunjungan Anda</p>
                <p>Semoga lekas sembuh</p>
                <div className="mt-4 border-t border-gray-200 pt-2 opacity-30 not-italic">
                    {penjualan.nota_jual}
                </div>
            </div>
        </div>
    );
}
