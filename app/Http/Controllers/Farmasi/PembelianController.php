<?php

namespace App\Http\Controllers\Farmasi;

use App\Models\Farmasi\DataBatch;
use App\Models\Farmasi\DetailBeli;
use App\Models\Farmasi\Pembelian;
use App\Models\Farmasi\SetAkun;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PembelianController extends BaseInventoryController
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'no_faktur' => 'required|string',
            'kode_suplier' => 'required|string',
            'nip' => 'required|string',
            'tgl_beli' => 'required|date',
            'total1' => 'required|numeric',
            'potongan' => 'required|numeric',
            'total2' => 'required|numeric',
            'ppn' => 'required|numeric',
            'tagihan' => 'required|numeric',
            'kd_bangsal' => 'required|string',
            'kd_rek' => 'required|string',
            'items' => 'required|array',
        ]);

        return DB::transaction(function () use ($data) {
            Pembelian::create([
                'no_faktur' => $data['no_faktur'],
                'kode_suplier' => $data['kode_suplier'],
                'nip' => $data['nip'],
                'tgl_beli' => $data['tgl_beli'],
                'total1' => $data['total1'],
                'potongan' => $data['potongan'],
                'total2' => $data['total2'],
                'ppn' => $data['ppn'],
                'tagihan' => $data['tagihan'],
                'kd_bangsal' => $data['kd_bangsal'],
                'kd_rek' => $data['kd_rek'],
            ]);

            foreach ($data['items'] as $it) {
                $row = [
                    'no_faktur' => $data['no_faktur'],
                    'kode_brng' => $it['kode_brng'],
                    'kode_sat' => $it['kode_sat'] ?? null,
                    'jumlah' => $it['jumlah'],
                    'h_beli' => $it['harga'],
                    'subtotal' => $it['subtotal'] ?? 0,
                    'dis' => $it['dis'] ?? 0,
                    'besardis' => $it['besardis'] ?? 0,
                    'total' => $it['total'] ?? 0,
                    'no_batch' => $it['no_batch'] ?? null,
                    'jumlah2' => $it['jumlah2'] ?? $it['jumlah'],
                    'kadaluarsa' => $it['kadaluarsa'] ?? null,
                ];
                DetailBeli::create($row);

                $qty = (float) ($row['jumlah2']);
                $nb = $row['no_batch'];
                $nf = $data['no_faktur'];

                $this->adjustStockPlus($row['kode_brng'], $data['kd_bangsal'], $qty, $nb, $nf);

                if ($nb) {
                    $exists = DB::table('data_batch')->where(['kode_brng' => $row['kode_brng'], 'no_batch' => $nb, 'no_faktur' => $nf])->exists();
                    if (! $exists) {
                        DataBatch::create([
                            'kode_brng' => $row['kode_brng'],
                            'no_batch' => $nb,
                            'no_faktur' => $nf,
                            'h_beli' => (float) $row['h_beli'],
                            'tgl_kadaluarsa' => $row['kadaluarsa'],
                            'sisa' => $qty,
                        ]);
                    } else {
                        $this->adjustBatchSisaDelta($row['kode_brng'], $nb, $nf, $qty);
                    }
                }

                $this->recordRiwayat($row['kode_brng'], $data['kd_bangsal'], $qty, 0, 'Pengadaan', $nb, $nf, $data['no_faktur'], $data['nip']);
            }

            $akun = SetAkun::query()->first();
            if ($akun) {
                $lines = [];
                $lines[] = [$akun->Pengadaan_Obat, 'PEMBELIAN', $data['total2'], 0];
                if ((float) $data['ppn'] > 0) {
                    $lines[] = [$akun->PPN_Masukan, 'PPN Masukan Obat', $data['ppn'], 0];
                }
                $lines[] = [$data['kd_rek'], 'AKUN BAYAR', 0, $data['total2'] + $data['ppn']];
                $this->stageJurnal($lines);
            }

            // Update harga beli dan harga jual di databarang berdasarkan pembelian
            $persen = DB::table('set_harga_obat')->first();
            foreach ($data['items'] as $it) {
                $hargaBeliBaru = (float) $it['harga'];
                $dasarMode = ($persen && isset($persen->hargadasar) && $persen->hargadasar === 'Harga Diskon') ? 'diskon' : 'beli';
                $hargaDasar = $dasarMode === 'diskon'
                    ? ($hargaBeliBaru - (float) ($it['besardis'] ?? 0))
                    : $hargaBeliBaru;

                DB::table('databarang')->where('kode_brng', $it['kode_brng'])->update([
                    'h_beli' => $hargaBeliBaru,
                    'dasar' => $hargaDasar,
                    'ralan' => DB::raw('ROUND('.$hargaDasar.' + '.$hargaDasar.' * '.((float) ($persen->ralan ?? 0)).' / 100)'),
                    'kelas1' => DB::raw('ROUND('.$hargaDasar.' + '.$hargaDasar.' * '.((float) ($persen->kelas1 ?? 0)).' / 100)'),
                    'kelas2' => DB::raw('ROUND('.$hargaDasar.' + '.$hargaDasar.' * '.((float) ($persen->kelas2 ?? 0)).' / 100)'),
                    'kelas3' => DB::raw('ROUND('.$hargaDasar.' + '.$hargaDasar.' * '.((float) ($persen->kelas3 ?? 0)).' / 100)'),
                    'utama' => DB::raw('ROUND('.$hargaDasar.' + '.$hargaDasar.' * '.((float) ($persen->utama ?? 0)).' / 100)'),
                    'vip' => DB::raw('ROUND('.$hargaDasar.' + '.$hargaDasar.' * '.((float) ($persen->vip ?? 0)).' / 100)'),
                    'vvip' => DB::raw('ROUND('.$hargaDasar.' + '.$hargaDasar.' * '.((float) ($persen->vvip ?? 0)).' / 100)'),
                    'beliluar' => DB::raw('ROUND('.$hargaDasar.' + '.$hargaDasar.' * '.((float) ($persen->beliluar ?? 0)).' / 100)'),
                    'jualbebas' => DB::raw('ROUND('.$hargaDasar.' + '.$hargaDasar.' * '.((float) ($persen->jualbebas ?? 0)).' / 100)'),
                    'karyawan' => DB::raw('ROUND('.$hargaDasar.' + '.$hargaDasar.' * '.((float) ($persen->karyawan ?? 0)).' / 100)'),
                ]);
            }

            return response()->json(['status' => 'ok', 'no_faktur' => $data['no_faktur']]);
        });
    }
}
