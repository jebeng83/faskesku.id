<?php

namespace App\Http\Controllers\Farmasi;

use App\Models\Farmasi\DataBatch;
use App\Models\Farmasi\Pembelian as HeaderPembelian;
use App\Models\DetailBeli;
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

        return DB::connection('fufufafa')->transaction(function () use ($data) {
            HeaderPembelian::create([
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
                $persen = DB::connection('fufufafa')->table('set_harga_obat')->first();
                foreach ($data['items'] as $it) {
                    $hargaBeliBaru = (float) $it['harga'];
                    $besardis = (float) ($it['besardis'] ?? 0);
                    $hasDiscount = ($besardis > 0) || ((float) ($it['dis'] ?? 0) > 0);

                    // Nilai untuk kolom 'dasar' selalu mencerminkan harga setelah diskon jika ada
                    $hargaDasarField = $hasDiscount ? max($hargaBeliBaru - $besardis, 0) : $hargaBeliBaru;

                    // Basis perhitungan harga jual mengikuti konfigurasi hargadasar
                    $useHargaDiskon = ($persen && isset($persen->hargadasar) && $persen->hargadasar === 'Harga Diskon');
                    $baseForSale = $useHargaDiskon ? $hargaDasarField : $hargaBeliBaru;

                    // Siapkan field update: selalu set h_beli ke HNA pembelian saat ini,
                    // dan dasar mencerminkan harga setelah diskon bila ada
                    $updates = [
                        'h_beli' => $hargaBeliBaru,
                        'dasar' => $hargaDasarField,
                        'ralan' => DB::raw('ROUND('.$baseForSale.' + '.$baseForSale.' * '.((float) ($persen->ralan ?? 0)).' / 100)'),
                        'kelas1' => DB::raw('ROUND('.$baseForSale.' + '.$baseForSale.' * '.((float) ($persen->kelas1 ?? 0)).' / 100)'),
                        'kelas2' => DB::raw('ROUND('.$baseForSale.' + '.$baseForSale.' * '.((float) ($persen->kelas2 ?? 0)).' / 100)'),
                        'kelas3' => DB::raw('ROUND('.$baseForSale.' + '.$baseForSale.' * '.((float) ($persen->kelas3 ?? 0)).' / 100)'),
                        'utama' => DB::raw('ROUND('.$baseForSale.' + '.$baseForSale.' * '.((float) ($persen->utama ?? 0)).' / 100)'),
                        'vip' => DB::raw('ROUND('.$baseForSale.' + '.$baseForSale.' * '.((float) ($persen->vip ?? 0)).' / 100)'),
                        'vvip' => DB::raw('ROUND('.$baseForSale.' + '.$baseForSale.' * '.((float) ($persen->vvip ?? 0)).' / 100)'),
                        'beliluar' => DB::raw('ROUND('.$baseForSale.' + '.$baseForSale.' * '.((float) ($persen->beliluar ?? 0)).' / 100)'),
                        'jualbebas' => DB::raw('ROUND('.$baseForSale.' + '.$baseForSale.' * '.((float) ($persen->jualbebas ?? 0)).' / 100)'),
                        'karyawan' => DB::raw('ROUND('.$baseForSale.' + '.$baseForSale.' * '.((float) ($persen->karyawan ?? 0)).' / 100)'),
                    ];

                    DB::connection('fufufafa')
                        ->table('databarang')
                        ->where('kode_brng', $it['kode_brng'])
                        ->update($updates);
                }

            return response()->json(['status' => 'ok', 'no_faktur' => $data['no_faktur']]);
        });
    }

    public function getAkunBayar()
    {
        $rows = DB::connection('fufufafa')->table('akun_bayar')
            ->leftJoin('rekening', 'akun_bayar.kd_rek', '=', 'rekening.kd_rek')
            ->select('akun_bayar.kd_rek', 'akun_bayar.nama_bayar', 'rekening.nm_rek')
            ->orderBy('akun_bayar.nama_bayar')
            ->get();
        return response()->json(['success' => true, 'data' => $rows]);
    }

    public function getSupplier()
    {
        $rows = DB::connection('fufufafa')->table('datasuplier')
            ->select('kode_suplier', 'nama_suplier')
            ->orderBy('nama_suplier')
            ->get();
        return response()->json(['success' => true, 'data' => $rows]);
    }

    public function getPetugas(Request $request)
    {
        $q = DB::connection('fufufafa')->table('petugas')
            ->select('nip', 'nama')
            ->orderBy('nama');
        if ($request->has('q') && !empty($request->q)) {
            $term = $request->q;
            $q->where(function ($w) use ($term) {
                $w->where('nip', 'like', "%{$term}%")
                  ->orWhere('nama', 'like', "%{$term}%");
            });
        }
        $rows = $q->get();
        return response()->json(['success' => true, 'data' => $rows])
            ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
            ->header('Pragma', 'no-cache')
            ->header('Expires', '0');
    }

    public function getLokasi()
    {
        $rows = DB::connection('fufufafa')->table('bangsal')
            ->select('kd_bangsal', 'nm_bangsal')
            ->orderBy('nm_bangsal')
            ->get();
        return response()->json(['success' => true, 'data' => $rows]);
    }

    public function generateNoFaktur()
    {
        try {
            $today = now()->format('Ymd');
            $prefix = 'PB-' . $today . '-';
            return DB::connection('fufufafa')->transaction(function () use ($prefix) {
                $last = DB::connection('fufufafa')->table('pembelian')
                    ->where('no_faktur', 'LIKE', $prefix.'%')
                    ->orderBy('no_faktur', 'desc')
                    ->lockForUpdate()
                    ->first();
                $next = 1;
                if ($last) {
                    $lastNumber = (int) substr($last->no_faktur, -3);
                    $next = $lastNumber + 1;
                }
                $no = $prefix.str_pad($next, 3, '0', STR_PAD_LEFT);
                while (DB::connection('fufufafa')->table('pembelian')->where('no_faktur', $no)->exists()) {
                    $next++;
                    $no = $prefix.str_pad($next, 3, '0', STR_PAD_LEFT);
                }
                return response()->json(['success' => true, 'no_faktur' => $no]);
            });
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error generating no faktur: '.$e->getMessage()], 500);
        }
    }
}
