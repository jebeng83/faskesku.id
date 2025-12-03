<?php

namespace App\Http\Controllers\Farmasi;

use App\Models\Farmasi\DetailPesan;
use App\Models\Farmasi\Pemesanan;
use App\Models\Farmasi\SetAkun;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PemesananController extends BaseInventoryController
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'no_faktur' => 'required|string',
            'no_order' => 'nullable|string',
            'kode_suplier' => 'required|string',
            'nip' => 'required|string',
            'tgl_pesan' => 'required|date',
            'tgl_faktur' => 'nullable|date',
            'tgl_tempo' => 'nullable|date',
            'subtotal' => 'required|numeric',
            'dis' => 'required|numeric',
            'total' => 'required|numeric',
            'ppn' => 'required|numeric',
            'meterai' => 'required|numeric',
            'tagihan' => 'required|numeric',
            'kd_bangsal' => 'required|string',
            'items' => 'required|array',
        ]);

        return DB::transaction(function () use ($data) {
            Pemesanan::create([
                'no_faktur' => $data['no_faktur'],
                'no_order' => $data['no_order'] ?? null,
                'kode_suplier' => $data['kode_suplier'],
                'nip' => $data['nip'],
                'tgl_pesan' => $data['tgl_pesan'],
                'tgl_faktur' => $data['tgl_faktur'] ?? null,
                'tgl_tempo' => $data['tgl_tempo'] ?? null,
                'subtotal' => $data['subtotal'],
                'dis' => $data['dis'],
                'total' => $data['total'],
                'ppn' => $data['ppn'],
                'meterai' => $data['meterai'],
                'tagihan' => $data['tagihan'],
                'kd_bangsal' => $data['kd_bangsal'],
                'status' => 'Belum Dibayar',
            ]);

            foreach ($data['items'] as $it) {
                $row = [
                    'no_faktur' => $data['no_faktur'],
                    'kode_brng' => $it['kode_brng'],
                    'kode_sat' => $it['kode_sat'] ?? null,
                    'jumlah' => $it['jumlah'],
                    'h_pesan' => $it['harga'],
                    'subtotal' => $it['subtotal'] ?? 0,
                    'dis' => $it['dis'] ?? 0,
                    'besardis' => $it['besardis'] ?? 0,
                    'total' => $it['total'] ?? 0,
                    'no_batch' => $it['no_batch'] ?? null,
                    'jumlah2' => $it['jumlah2'] ?? $it['jumlah'],
                    'kadaluarsa' => $it['kadaluarsa'] ?? null,
                ];
                DetailPesan::create($row);
                $qty = (float) ($row['jumlah2']);
                $nb = $row['no_batch'];
                $nf = $data['no_faktur'];
                $this->adjustStockPlus($row['kode_brng'], $data['kd_bangsal'], $qty, $nb, $nf);
                if ($nb && $nf) {
                    $this->adjustBatchSisaDelta($row['kode_brng'], $nb, $nf, $qty);
                }
                $this->recordRiwayat($row['kode_brng'], $data['kd_bangsal'], $qty, 0, 'Penerimaan', $nb, $nf, $data['no_faktur'].' '.($data['no_order'] ?? ''), $data['nip']);
            }

            $akun = SetAkun::query()->first();
            if ($akun) {
                $lines = [];
                $lines[] = [$akun->Pemesanan_Obat, 'PERSEDIAAN BARANG', $data['total'] + $data['meterai'], 0];
                if ((float) $data['ppn'] > 0) {
                    $lines[] = [$akun->PPN_Masukan, 'PPN Masukan Obat', $data['ppn'], 0];
                }
                $lines[] = [$akun->Kontra_Pemesanan_Obat, 'HUTANG USAHA', 0, $data['total'] + $data['ppn'] + $data['meterai']];
                $this->stageJurnal($lines);
            }

            return response()->json(['status' => 'ok', 'no_faktur' => $data['no_faktur']]);
        });
    }
}
