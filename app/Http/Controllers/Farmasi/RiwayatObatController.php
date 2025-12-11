<?php

namespace App\Http\Controllers\Farmasi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RiwayatObatController extends Controller
{
    public function store(Request $request)
    {
        $kode = $request->input('kode_brng');
        $kdBangsal = $request->input('kd_bangsal');
        $noBatch = (string) $request->input('no_batch', '');
        $noFaktur = (string) $request->input('no_faktur', '');
        $masuk = (double) $request->input('masuk', 0);
        $keluar = (double) $request->input('keluar', 0);
        $posisi = $request->input('posisi');
        $petugas = (string) $request->input('petugas', '');
        $status = (string) $request->input('status', '');
        $keterangan = (string) $request->input('keterangan', '');

        $stokAwal = (double) (DB::table('gudangbarang')
            ->where('kode_brng', $kode)
            ->where('kd_bangsal', $kdBangsal)
            ->where('no_batch', $noBatch)
            ->where('no_faktur', $noFaktur)
            ->value('stok') ?? 0);

        if ($posisi === 'Opname') {
            $keluar = 0;
            $stokAkhir = $masuk;
        } else {
            $stokAkhir = $stokAwal + $masuk - $keluar;
        }

        DB::table('riwayat_barang_medis')->insert([
            'kode_brng' => $kode,
            'stok_awal' => $stokAwal,
            'masuk' => $masuk,
            'keluar' => $keluar,
            'stok_akhir' => $stokAkhir,
            'posisi' => $posisi,
            'tanggal' => now()->toDateString(),
            'jam' => now()->format('H:i:s'),
            'petugas' => $petugas,
            'kd_bangsal' => $kdBangsal,
            'status' => $status,
            'no_batch' => $noBatch,
            'no_faktur' => $noFaktur,
            'keterangan' => $keterangan,
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'kode_brng' => $kode,
                'stok_awal' => $stokAwal,
                'masuk' => $masuk,
                'keluar' => $keluar,
                'stok_akhir' => $stokAkhir,
                'posisi' => $posisi,
                'tanggal' => now()->toDateString(),
                'jam' => now()->format('H:i:s'),
                'petugas' => $petugas,
                'kd_bangsal' => $kdBangsal,
                'status' => $status,
                'no_batch' => $noBatch,
                'no_faktur' => $noFaktur,
                'keterangan' => $keterangan,
            ],
        ]);
    }
}

