<?php

namespace App\Http\Controllers\Farmasi;

use App\Models\Farmasi\DetailJual;
use App\Models\Farmasi\Penjualan;
use App\Models\Farmasi\SetAkun;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PenjualanController extends BaseInventoryController
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'nota_jual' => 'required|string',
            'tgl_jual' => 'required|date',
            'nip' => 'required|string',
            'no_rkm_medis' => 'nullable|string',
            'nm_pasien' => 'nullable|string',
            'keterangan' => 'nullable|string',
            'jns_jual' => 'required|string',
            'ongkir' => 'required|numeric',
            'ppn' => 'required|numeric',
            'status' => 'required|string',
            'kd_bangsal' => 'required|string',
            'kode_akun_bayar' => 'required|string',
            'nama_bayar' => 'nullable|string',
            'items' => 'required|array',
        ]);

        return DB::transaction(function () use ($data) {
            Penjualan::create([
                'nota_jual' => $data['nota_jual'],
                'tgl_jual' => $data['tgl_jual'],
                'nip' => $data['nip'],
                'no_rkm_medis' => $data['no_rkm_medis'] ?? null,
                'nm_pasien' => $data['nm_pasien'] ?? null,
                'keterangan' => $data['keterangan'] ?? null,
                'jns_jual' => $data['jns_jual'],
                'ongkir' => $data['ongkir'],
                'ppn' => $data['ppn'],
                'status' => $data['status'],
                'kd_bangsal' => $data['kd_bangsal'],
                'kode_akun_bayar' => $data['kode_akun_bayar'],
                'nama_bayar' => $data['nama_bayar'] ?? null,
            ]);

            $totalJual = 0.0;
            $totalHPP = 0.0;

            foreach ($data['items'] as $it) {
                $row = [
                    'nota_jual' => $data['nota_jual'],
                    'kode_brng' => $it['kode_brng'],
                    'kode_sat' => $it['kode_sat'] ?? null,
                    'h_beli' => $it['h_beli'] ?? 0,
                    'h_jual' => $it['h_jual'],
                    'jumlah' => $it['jumlah'],
                    'subtotal' => $it['subtotal'] ?? 0,
                    'dis' => $it['dis'] ?? 0,
                    'bsr_dis' => $it['bsr_dis'] ?? 0,
                    'tambahan' => $it['tambahan'] ?? 0,
                    'total' => $it['total'] ?? ($it['jumlah'] * $it['h_jual']),
                    'aturan_pakai' => $it['aturan_pakai'] ?? null,
                    'no_batch' => $it['no_batch'] ?? null,
                    'no_faktur' => $it['no_faktur'] ?? null,
                ];
                DetailJual::create($row);

                $qty = (float) $row['jumlah'];
                $nb = $row['no_batch'];
                $nf = $row['no_faktur'];

                $this->adjustStockMinus($row['kode_brng'], $data['kd_bangsal'], $qty, $nb, $nf);
                if ($nb && $nf) {
                    $this->adjustBatchSisaDelta($row['kode_brng'], $nb, $nf, -$qty);
                }
                $this->recordRiwayat($row['kode_brng'], $data['kd_bangsal'], 0, $qty, 'Penjualan', $nb, $nf, $data['nota_jual'], $data['nip']);

                $totalJual += (float) $row['total'];
                $totalHPP += (float) $row['h_beli'] * $qty;
            }

            $akun = SetAkun::query()->first();
            if ($akun) {
                $lines = [];
                $lines[] = [$akun->Penjualan_Obat, 'PENJUALAN OBAT BEBAS', 0, $totalJual + (float) $data['ongkir']];
                if ((float) $data['ppn'] > 0) {
                    $lines[] = [$akun->PPN_Keluaran, 'PPN KELUARAN', 0, (float) $data['ppn']];
                }
                $lines[] = [$data['kode_akun_bayar'], $data['nama_bayar'] ?: 'AKUN BAYAR', $totalJual + (float) $data['ongkir'] + (float) $data['ppn'], 0];
                $lines[] = [$akun->HPP_Obat_Jual_Bebas, 'HPP Obat Jual Bebas', $totalHPP, 0];
                $lines[] = [$akun->Persediaan_Obat_Jual_Bebas, 'Persediaan Obat Jual Bebas', 0, $totalHPP];
                $this->stageJurnal($lines);
            }

            return response()->json(['status' => 'ok', 'nota_jual' => $data['nota_jual']]);
        });
    }
}
