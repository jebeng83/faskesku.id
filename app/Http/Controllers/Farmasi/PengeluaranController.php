<?php

namespace App\Http\Controllers\Farmasi;

use App\Models\Farmasi\DetailPengeluaranObatBhp;
use App\Models\Farmasi\PengeluaranObatBhp;
use App\Models\Farmasi\SetAkun;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PengeluaranController extends BaseInventoryController
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'no_keluar' => 'required|string',
            'tanggal' => 'required|date',
            'nip' => 'required|string',
            'keterangan' => 'nullable|string',
            'kd_bangsal' => 'required|string',
            'items' => 'required|array',
        ]);

        return DB::transaction(function () use ($data) {
            PengeluaranObatBhp::create([
                'no_keluar' => $data['no_keluar'],
                'tanggal' => $data['tanggal'],
                'nip' => $data['nip'],
                'keterangan' => $data['keterangan'] ?? null,
                'kd_bangsal' => $data['kd_bangsal'],
            ]);

            $totalKeluar = 0.0;

            foreach ($data['items'] as $it) {
                $row = [
                    'no_keluar' => $data['no_keluar'],
                    'kode_brng' => $it['kode_brng'],
                    'kode_sat' => $it['kode_sat'] ?? null,
                    'no_batch' => $it['no_batch'] ?? null,
                    'jumlah' => $it['jumlah'],
                    'h_beli' => $it['h_beli'] ?? 0,
                    'subtotal' => ($it['jumlah'] * ($it['h_beli'] ?? 0)),
                    'no_faktur' => $it['no_faktur'] ?? null,
                ];
                DetailPengeluaranObatBhp::create($row);

                $qty = (float) $row['jumlah'];
                $nb = $row['no_batch'];
                $nf = $row['no_faktur'];

                $this->adjustStockMinus($row['kode_brng'], $data['kd_bangsal'], $qty, $nb, $nf);
                if ($nb && $nf) {
                    $this->adjustBatchSisaDelta($row['kode_brng'], $nb, $nf, -$qty);
                }
                $this->recordRiwayat($row['kode_brng'], $data['kd_bangsal'], 0, $qty, 'Stok Keluar', $nb, $nf, $data['no_keluar'].' '.($data['keterangan'] ?? ''), $data['nip']);

                $totalKeluar += (float) $row['subtotal'];
            }

            $akun = SetAkun::query()->first();
            if ($akun) {
                $lines = [];
                $lines[] = [$akun->Kontra_Stok_Keluar_Medis, 'KONTRA PERSEDIAAN BARANG', $totalKeluar, 0];
                $lines[] = [$akun->Stok_Keluar_Medis, 'PERSEDIAAN BARANG', 0, $totalKeluar];
                $this->stageJurnal($lines);
            }

            return response()->json(['status' => 'ok', 'no_keluar' => $data['no_keluar']]);
        });
    }
}
