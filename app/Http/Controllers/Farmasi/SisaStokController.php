<?php

namespace App\Http\Controllers\Farmasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SisaStokController
{
    public function index(Request $request)
    {
        $jenis = $request->query('jenis', '');
        $kategori = $request->query('kategori', '');
        $golongan = $request->query('golongan', '');
        $q = $request->query('q', '');
        $batchParam = $request->query('batch');
        $page = max(1, (int) $request->query('page', 1));
        $perPage = (int) $request->query('per_page', 10);
        if ($perPage <= 0) {
            $perPage = 10;
        }

        $defaultBatch = env('AKTIFKANBATCHOBAT', 'Yes');
        $batchOn = $batchParam !== null
            ? in_array(strtolower($batchParam), ['on', 'yes', 'true', '1'])
            : in_array(strtolower($defaultBatch), ['on', 'yes', 'true', '1']);

        $hppColumn = env('HPPFARMASI', 'dasar');

        $gudangs = DB::table('bangsal')
            ->select('kd_bangsal', 'nm_bangsal')
            ->where('status', '1')
            ->where('kd_bangsal', '<>', '-')
            ->orderBy('kd_bangsal')
            ->get();

        $baseQuery = DB::table('databarang as db')
            ->join('jenis as j', 'db.kdjns', '=', 'j.kdjns')
            ->join('golongan_barang as g', 'db.kode_golongan', '=', 'g.kode')
            ->join('kategori_barang as k', 'db.kode_kategori', '=', 'k.kode')
            ->select(
                'db.kode_brng',
                'db.nama_brng',
                'db.kode_sat',
                DB::raw($hppColumn . ' as harga_satuan')
            )
            ->where('j.nama', 'like', '%' . $jenis . '%')
            ->where('k.nama', 'like', '%' . $kategori . '%')
            ->where('g.nama', 'like', '%' . $golongan . '%')
            ->where(function ($w) use ($q) {
                $w->where('db.kode_brng', 'like', '%' . $q . '%')
                    ->orWhere('db.nama_brng', 'like', '%' . $q . '%');
            })
            ->orderBy('db.kode_brng')
            ;

        $paginator = $baseQuery->paginate($perPage, ['*'], 'page', $page);
        $items = $paginator->items();

        $resultItems = [];
        foreach ($items as $item) {
            $stokPerGudang = [];
            $total = 0;
            foreach ($gudangs as $gd) {
                $last = DB::table('riwayat_barang_medis')
                    ->where('kode_brng', $item->kode_brng)
                    ->where('kd_bangsal', $gd->kd_bangsal)
                    ->orderBy('tanggal', 'desc')
                    ->orderBy('jam', 'desc')
                    ->first();

                if ($last) {
                    $stok = (float) ($last->stok_akhir ?? 0);
                } else {
                    $qStok = DB::table('gudangbarang')
                        ->where('kode_brng', $item->kode_brng)
                        ->where('kd_bangsal', $gd->kd_bangsal);

                    if ($batchOn) {
                        $qStok->where('no_batch', '<>', '')->where('no_faktur', '<>', '');
                    } else {
                        $qStok->where('no_batch', '=', '')->where('no_faktur', '=', '');
                    }

                    $stok = (float) ($qStok->sum('stok') ?? 0);
                }

                $stokPerGudang[$gd->kd_bangsal] = $stok;
                $total += $stok;
            }

            $harga = (float) ($item->harga_satuan ?? 0);
            $nilaiAset = $harga * $total;

            $resultItems[] = [
                'kode_brng' => $item->kode_brng,
                'nama_brng' => $item->nama_brng,
                'kode_sat' => $item->kode_sat,
                'harga_satuan' => $harga,
                'stok_per_gudang' => $stokPerGudang,
                'total' => $total,
                'nilai_aset' => $nilaiAset,
            ];
        }

        $links = [];
        $lastPage = (int) $paginator->lastPage();
        $currentPage = (int) $paginator->currentPage();
        if ($lastPage > 1) {
            for ($i = 1; $i <= $lastPage; $i++) {
                $links[] = [
                    'url' => $i === $currentPage ? null : ('?page=' . $i),
                    'label' => (string) $i,
                    'active' => $i === $currentPage,
                ];
            }
        }

        return response()->json([
            'gudangs' => $gudangs,
            'items' => [
                'data' => $resultItems,
                'current_page' => $currentPage,
                'last_page' => $lastPage,
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
                'total' => $paginator->total(),
                'links' => $links,
            ],
        ]);
    }
}
