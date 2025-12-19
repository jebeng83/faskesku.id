<?php

namespace App\Http\Controllers\Farmasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DaruratStokController
{
    public function index(Request $request)
    {
        $jenis = (string) $request->query('jenis', '');
        $kategori = (string) $request->query('kategori', '');
        $golongan = (string) $request->query('golongan', '');
        $q = (string) $request->query('q', '');
        $kdBangsal = (string) $request->query('kd_bangsal', '');
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

        $qGudang = DB::table('bangsal')
            ->select('kd_bangsal', 'nm_bangsal')
            ->where('status', '1')
            ->where('kd_bangsal', '<>', '-');
        if ($kdBangsal !== '') {
            $qGudang->where('kd_bangsal', $kdBangsal);
        }
        $gudangs = $qGudang->orderBy('kd_bangsal')->get();

        $baseQuery = DB::table('databarang as db')
            ->join('jenis as j', 'db.kdjns', '=', 'j.kdjns')
            ->join('golongan_barang as g', 'db.kode_golongan', '=', 'g.kode')
            ->join('kategori_barang as k', 'db.kode_kategori', '=', 'k.kode')
            ->select(
                'db.kode_brng',
                'db.nama_brng',
                'db.kode_sat',
                DB::raw('j.nama as jenis'),
                DB::raw('COALESCE(db.stokminimal, 0) as stok_minimal')
            )
            ->where('j.nama', 'like', '%' . $jenis . '%')
            ->where('k.nama', 'like', '%' . $kategori . '%')
            ->where('g.nama', 'like', '%' . $golongan . '%')
            ->where(function ($w) use ($q) {
                $w->where('db.kode_brng', 'like', '%' . $q . '%')
                    ->orWhere('db.nama_brng', 'like', '%' . $q . '%');
            })
            ->where('db.stokminimal', '>', 0)
            ->orderBy('db.kode_brng');

        $paginator = $baseQuery->paginate($perPage, ['*'], 'page', $page);
        $items = $paginator->items();

        $resultItems = [];
        foreach ($items as $item) {
            $total = 0.0;
            $stokPerGudang = [];
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

            $stokMin = (float) ($item->stok_minimal ?? 0);
            if ($stokMin > 0 && $total <= $stokMin) {
                $resultItems[] = [
                    'kode_brng' => $item->kode_brng,
                    'nama_brng' => $item->nama_brng,
                    'satuan' => $item->kode_sat,
                    'jenis' => $item->jenis,
                    'stok_minimal' => $stokMin,
                    'stok_saat_ini' => $total,
                    'stok_per_gudang' => $stokPerGudang,
                ];
            }
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
