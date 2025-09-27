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

            if (empty($bangsalList)) {
                return response()->json([
                    'success' => true,
                    'data' => [],
                    'message' => 'Tidak ada depo yang terkait dengan poli ini'
                ]);
            }

            // Gunakan method baru dari model Databarang untuk join dengan gudangbarang
            $obatList = collect();
            
            foreach ($bangsalList as $bangsal) {
                $obatBangsal = Databarang::getObatWithStok($search, $bangsal, $limit);
                $obatList = $obatList->merge($obatBangsal);
            }

            // Group by kode_brng dan sum total stok
            $result = $obatList->groupBy('kode_brng')->map(function ($items) use ($bangsalList) {
                $firstItem = $items->first();
                $totalStok = $items->sum('total_stok');
                
                // Dapatkan detail stok per bangsal
                $databarang = Databarang::where('kode_brng', $firstItem->kode_brng)->first();
                $stokPerBangsal = [];
                
                if ($databarang) {
                    $stokDetail = $databarang->getStokDetailPerBangsal();
                    foreach ($bangsalList as $bangsal) {
                        $stokPerBangsal[$bangsal] = $stokDetail->get($bangsal, 0);
                    }
                }

                return [
                    'kode_brng' => $firstItem->kode_brng,
                    'nama_brng' => $firstItem->nama_brng,
                    'kode_satbesar' => $firstItem->kode_satbesar,
                    'kode_sat' => $firstItem->kode_sat,
                    'ralan' => $firstItem->ralan,
                    'total_stok' => $totalStok,
                    'stok_per_bangsal' => $stokPerBangsal,
                    'isi' => $firstItem->isi,
                    'kapasitas' => $firstItem->kapasitas,
                    'expire' => $firstItem->expire
                ];
            })->values()->take($limit);

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
     * Cek ketersediaan stok obat berdasarkan poli atau bangsal
     */
    public function cekStokObat(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'kode_brng' => 'required|string',
                'kd_bangsal' => 'nullable|string',
                'kd_poli' => 'nullable|string'
            ]);

            $databarang = Databarang::where('kode_brng', $request->kode_brng)->first();
            
            if (!$databarang) {
                return response()->json([
                    'success' => false,
                    'message' => 'Obat tidak ditemukan'
                ], 404);
            }

            if ($request->kd_bangsal) {
                // Cek stok per bangsal spesifik
                $stok = $databarang->getTotalStokByBangsal($request->kd_bangsal);
                $stokDetail = Gudangbarang::where('kode_brng', $request->kode_brng)
                    ->where('kd_bangsal', $request->kd_bangsal)
                    ->where('stok', '>', 0)
                    ->select('stok', 'no_batch', 'no_faktur')
                    ->get();
            } elseif ($request->kd_poli) {
                // Cek stok berdasarkan bangsal yang terkait dengan poli
                $bangsalList = SetDepoRalan::getBangsalByPoli($request->kd_poli);
                
                $stok = 0;
                $stokDetail = collect();
                
                foreach ($bangsalList as $kdBangsal) {
                    $stokBangsal = Gudangbarang::getTotalStokByBarangBangsal($request->kode_brng, $kdBangsal);
                    $stok += $stokBangsal;
                    
                    $detailBangsal = Gudangbarang::where('kode_brng', $request->kode_brng)
                        ->where('kd_bangsal', $kdBangsal)
                        ->where('stok', '>', 0)
                        ->select('kd_bangsal', 'stok', 'no_batch', 'no_faktur')
                        ->get();
                    
                    $stokDetail = $stokDetail->merge($detailBangsal);
                }
            } else {
                // Cek total stok dari semua bangsal
                $stok = $databarang->getTotalStok();
                $stokDetail = $databarang->getStokDetailPerBangsal();
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'kode_brng' => $request->kode_brng,
                    'nama_brng' => $databarang->nama_brng,
                    'kd_bangsal' => $request->kd_bangsal,
                    'kd_poli' => $request->kd_poli,
                    'stok' => $stok,
                    'stok_detail' => $stokDetail,
                    'harga_ralan' => $databarang->ralan,
                    'satuan' => $databarang->kode_satbesar
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