<?php

namespace App\Http\Controllers\RawatJalan;

use App\Http\Controllers\Controller;
use App\Models\RawatJalan\Databarang;
use App\Models\RawatJalan\Gudangbarang;
use App\Models\SetDepoRalan;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ObatController extends Controller
{
    /**
     * Mendapatkan daftar obat dengan stok berdasarkan poli
     */
    public function getObatByPoli(Request $request): JsonResponse
    {
        try {
            $kdPoli = $request->get('kd_poli');
            $search = $request->get('search', '');
            $limit = $request->get('limit', 50);

            if (!$kdPoli) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kode poli diperlukan'
                ], 400);
            }

            // Dapatkan bangsal berdasarkan poli
            $bangsalList = SetDepoRalan::getBangsalByPoli($kdPoli);

            if ($bangsalList->isEmpty()) {
                return response()->json([
                    'success' => true,
                    'data' => [],
                    'message' => 'Tidak ada depo yang terkait dengan poli ini'
                ]);
            }

            // Query obat dengan stok
            $query = Databarang::active()
                ->with(['gudangBarang' => function ($query) use ($bangsalList) {
                    $query->whereIn('kd_bangsal', $bangsalList)
                          ->where('stok', '>', 0);
                }])
                ->whereHas('gudangBarang', function ($query) use ($bangsalList) {
                    $query->whereIn('kd_bangsal', $bangsalList)
                          ->where('stok', '>', 0);
                });

            // Filter pencarian jika ada
            if (!empty($search)) {
                $query->search($search);
            }

            $obatList = $query->limit($limit)->get();

            // Format data dengan total stok per bangsal
            $result = $obatList->map(function ($obat) use ($bangsalList) {
                $totalStok = 0;
                $stokPerBangsal = [];

                foreach ($bangsalList as $bangsal) {
                    $stokBangsal = $obat->getTotalStokByBangsal($bangsal);
                    $totalStok += $stokBangsal;
                    $stokPerBangsal[$bangsal] = $stokBangsal;
                }

                return [
                    'kode_brng' => $obat->kode_brng,
                    'nama_brng' => $obat->nama_brng,
                    'kode_satbesar' => $obat->kode_satbesar,
                    'kode_sat' => $obat->kode_sat,
                    'ralan' => $obat->ralan,
                    'total_stok' => $totalStok,
                    'stok_per_bangsal' => $stokPerBangsal,
                    'isi' => $obat->isi,
                    'kapasitas' => $obat->kapasitas
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $result,
                'total' => $result->count()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mendapatkan detail obat berdasarkan kode
     */
    public function getDetailObat(Request $request, $kodeBarang): JsonResponse
    {
        try {
            $kdPoli = $request->get('kd_poli');

            if (!$kdPoli) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kode poli diperlukan'
                ], 400);
            }

            $obat = Databarang::where('kode_brng', $kodeBarang)
                             ->active()
                             ->first();

            if (!$obat) {
                return response()->json([
                    'success' => false,
                    'message' => 'Obat tidak ditemukan'
                ], 404);
            }

            // Dapatkan bangsal berdasarkan poli
            $bangsalList = SetDepoRalan::getBangsalByPoli($kdPoli);
            $totalStok = 0;
            $stokPerBangsal = [];

            foreach ($bangsalList as $bangsal) {
                $stokBangsal = $obat->getTotalStokByBangsal($bangsal);
                $totalStok += $stokBangsal;
                $stokPerBangsal[$bangsal] = $stokBangsal;
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'kode_brng' => $obat->kode_brng,
                    'nama_brng' => $obat->nama_brng,
                    'kode_satbesar' => $obat->kode_satbesar,
                    'kode_sat' => $obat->kode_sat,
                    'ralan' => $obat->ralan,
                    'total_stok' => $totalStok,
                    'stok_per_bangsal' => $stokPerBangsal,
                    'isi' => $obat->isi,
                    'kapasitas' => $obat->kapasitas,
                    'expire' => $obat->expire
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Cek ketersediaan stok obat
     */
    public function cekStokObat(Request $request): JsonResponse
    {
        try {
            $kodeBarang = $request->get('kode_brng');
            $kdPoli = $request->get('kd_poli');
            $jumlahDiminta = $request->get('jumlah', 0);

            if (!$kodeBarang || !$kdPoli) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kode barang dan kode poli diperlukan'
                ], 400);
            }

            // Dapatkan bangsal berdasarkan poli
            $bangsalList = SetDepoRalan::getBangsalByPoli($kdPoli);
            $totalStok = 0;

            foreach ($bangsalList as $bangsal) {
                $totalStok += Gudangbarang::getTotalStokByBarangBangsal($kodeBarang, $bangsal);
            }

            $tersedia = $totalStok >= $jumlahDiminta;

            return response()->json([
                'success' => true,
                'data' => [
                    'kode_brng' => $kodeBarang,
                    'total_stok' => $totalStok,
                    'jumlah_diminta' => $jumlahDiminta,
                    'tersedia' => $tersedia,
                    'sisa_stok' => $totalStok - $jumlahDiminta
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }
}