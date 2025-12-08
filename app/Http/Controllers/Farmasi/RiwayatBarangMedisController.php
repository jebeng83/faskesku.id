<?php

namespace App\Http\Controllers\Farmasi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RiwayatBarangMedisController extends Controller
{
    public function index()
    {
        return Inertia::render('farmasi/RiwayatBarangMedis');
    }

    public function data(Request $request)
    {
        $perPage = (int) ($request->get('perPage', 25));
        $page = (int) ($request->get('page', 1));
        $from = $request->get('from');
        $to = $request->get('to');
        $q = $request->get('q');
        $kode = $request->get('kode_brng');
        $bangsal = $request->get('kd_bangsal');
        $namaBrng = $request->get('nama_brng');
        $nmBangsal = $request->get('nm_bangsal');
        $posisi = $request->get('posisi');
        $status = $request->get('status');

        $query = DB::table('riwayat_barang_medis')
            ->join('databarang', 'riwayat_barang_medis.kode_brng', '=', 'databarang.kode_brng')
            ->join('bangsal', 'riwayat_barang_medis.kd_bangsal', '=', 'bangsal.kd_bangsal')
            ->select([
                'riwayat_barang_medis.kode_brng',
                'databarang.nama_brng',
                'riwayat_barang_medis.stok_awal',
                'riwayat_barang_medis.masuk',
                'riwayat_barang_medis.keluar',
                'riwayat_barang_medis.stok_akhir',
                'riwayat_barang_medis.posisi',
                'riwayat_barang_medis.tanggal',
                'riwayat_barang_medis.jam',
                'riwayat_barang_medis.petugas',
                'riwayat_barang_medis.kd_bangsal',
                'bangsal.nm_bangsal',
                'riwayat_barang_medis.status',
                'riwayat_barang_medis.no_batch',
                'riwayat_barang_medis.no_faktur',
                'riwayat_barang_medis.keterangan',
            ]);

        if ($from && $to) {
            $query->whereBetween('riwayat_barang_medis.tanggal', [$from, $to]);
        }

        if ($kode) {
            $query->where('riwayat_barang_medis.kode_brng', 'like', '%'.$kode.'%');
        }

        if ($bangsal) {
            $query->where('riwayat_barang_medis.kd_bangsal', 'like', '%'.$bangsal.'%');
        }

        if ($namaBrng) {
            $query->where('databarang.nama_brng', 'like', '%'.$namaBrng.'%');
        }

        if ($nmBangsal) {
            $query->where('bangsal.nm_bangsal', 'like', '%'.$nmBangsal.'%');
        }

        if ($posisi) {
            $query->where('riwayat_barang_medis.posisi', 'like', '%'.$posisi.'%');
        }

        if ($status) {
            $query->where('riwayat_barang_medis.status', 'like', '%'.$status.'%');
        }

        if ($q) {
            $query->where(function ($sub) use ($q) {
                $sub->orWhere('riwayat_barang_medis.kode_brng', 'like', '%'.$q.'%')
                    ->orWhere('databarang.nama_brng', 'like', '%'.$q.'%')
                    ->orWhere('riwayat_barang_medis.petugas', 'like', '%'.$q.'%')
                    ->orWhere('bangsal.nm_bangsal', 'like', '%'.$q.'%')
                    ->orWhere('riwayat_barang_medis.no_batch', 'like', '%'.$q.'%')
                    ->orWhere('riwayat_barang_medis.no_faktur', 'like', '%'.$q.'%')
                    ->orWhere('riwayat_barang_medis.kd_bangsal', 'like', '%'.$q.'%')
                    ->orWhere('riwayat_barang_medis.status', 'like', '%'.$q.'%')
                    ->orWhere('riwayat_barang_medis.keterangan', 'like', '%'.$q.'%')
                    ->orWhere('riwayat_barang_medis.posisi', 'like', '%'.$q.'%');
            });
        }

        $query->orderBy('riwayat_barang_medis.tanggal')->orderBy('riwayat_barang_medis.jam');

        $paginator = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'items' => $paginator->items(),
            'total' => $paginator->total(),
            'page' => $paginator->currentPage(),
            'perPage' => $paginator->perPage(),
        ]);
    }

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

        $prev = DB::table('riwayat_barang_medis')
            ->where('kode_brng', $kode)
            ->where('kd_bangsal', $kdBangsal)
            ->orderBy('tanggal', 'desc')
            ->orderBy('jam', 'desc')
            ->first();
        $stokAwal = (double) ($prev->stok_akhir ?? 0);

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
