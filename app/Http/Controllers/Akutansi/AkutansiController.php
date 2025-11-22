<?php

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use App\Models\RegPeriksa;
use App\Models\Akutansi\Billing;
use App\Models\Akutansi\NotaJalan;
use App\Models\Akutansi\NotaInap;

class AkutansiController extends Controller
{
    /**
     * Preview invoice berbasis billing/nota untuk satu kunjungan (no_rawat).
     * Return JSON agar mudah diintegrasikan ke UI.
     */
    public function invoice(string $no_rawat)
    {
        $reg = RegPeriksa::with(['pasien', 'dokter', 'poliklinik', 'penjab'])
            ->findOrFail($no_rawat);

        $billing = Billing::where('no_rawat', $no_rawat)
            ->orderBy('noindex')
            ->get();

        $notaJalan = NotaJalan::where('no_rawat', $no_rawat)->first();
        $notaInap = NotaInap::where('no_rawat', $no_rawat)->first();

        $summaryByStatus = $billing->groupBy('status')->map(function ($items) {
            return [
                'count' => $items->count(),
                'biaya' => round($items->sum('biaya'), 2),
                'jumlah' => round($items->sum('jumlah'), 2),
                'tambahan' => round($items->sum('tambahan'), 2),
                'total' => round($items->sum('totalbiaya'), 2),
            ];
        });

        $grandTotal = round($billing->sum('totalbiaya'), 2);

        $nota = null;
        if ($notaJalan) {
            $nota = [
                'jenis' => 'Ralan',
                'no_nota' => $notaJalan->no_nota,
                'tanggal' => $notaJalan->tanggal,
                'jam' => $notaJalan->jam,
            ];
        } elseif ($notaInap) {
            $nota = [
                'jenis' => 'Ranap',
                'no_nota' => $notaInap->no_nota,
                'tanggal' => $notaInap->tanggal,
                'jam' => $notaInap->jam,
                'uang_muka' => $notaInap->Uang_Muka,
            ];
        }

        return response()->json([
            'visit' => [
                'no_rawat' => $reg->no_rawat,
                'no_rkm_medis' => $reg->no_rkm_medis,
                'pasien' => optional($reg->pasien)->nm_pasien,
                'dokter' => optional($reg->dokter)->nm_dokter,
                'poli' => optional($reg->poliklinik)->nm_poli,
                'penjamin' => optional($reg->penjab)->png_jawab,
                'status_lanjut' => $reg->status_lanjut ?? null,
                'tgl_registrasi' => $reg->tgl_registrasi ?? null,
            ],
            'nota' => $nota,
            'items' => $billing->map(function ($b) {
                return [
                    'tgl_byr' => $b->tgl_byr,
                    'no' => $b->no,
                    'nm_perawatan' => $b->nm_perawatan,
                    'pemisah' => $b->pemisah,
                    'biaya' => $b->biaya,
                    'jumlah' => $b->jumlah,
                    'tambahan' => $b->tambahan,
                    'totalbiaya' => $b->totalbiaya,
                    'status' => $b->status,
                ];
            }),
            'summary' => [
                'by_status' => $summaryByStatus,
                'grand_total' => $grandTotal,
            ],
        ]);
    }
}