<?php

namespace App\Http\Controllers\RawatJalan;

use App\Http\Controllers\Controller;
use App\Models\RawatJalan\ResepObat;
use App\Models\RawatJalan\ResepDokter;
use App\Models\RawatJalan\Gudangbarang;
use App\Models\RawatJalan\Databarang;
use App\Models\SetDepoRalan;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ResepController extends Controller
{
    /**
     * Menyimpan resep baru
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'no_rawat' => 'required|string',
            'kd_poli' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.kode_brng' => 'required|string',
            'items.*.jml' => 'required|numeric|min:0.1',
            'items.*.aturan_pakai' => 'nullable|string|max:150'
        ]);

        // Validasi kd_dokter
        if (empty($request->kd_dokter)) {
            return response()->json([
                'success' => false,
                'message' => 'Dokter harus dipilih'
            ], 400);
        }

        // Validasi dokter exists dan aktif
        $dokter = \App\Models\Dokter::where('kd_dokter', $request->kd_dokter)
            ->where('status', '1')
            ->first();

        if (!$dokter) {
            return response()->json([
                'success' => false,
                'message' => 'Dokter tidak ditemukan atau tidak aktif'
            ], 400);
        }

        DB::beginTransaction();

        try {
            // Dapatkan bangsal berdasarkan poli untuk validasi stok yang tepat
            $bangsalList = SetDepoRalan::getBangsalByPoli($request->kd_poli);
            
            if (empty($bangsalList)) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak ada depo yang terkait dengan poli ini'
                ], 400);
            }

            // Validasi stok obat berdasarkan bangsal yang terkait dengan poli
            foreach ($request->items as $obat) {
                $databarang = Databarang::where('kode_brng', $obat['kode_brng'])->first();
                
                if (!$databarang) {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => "Obat dengan kode {$obat['kode_brng']} tidak ditemukan"
                    ], 400);
                }
                
                if ($databarang->status != '1') {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => "Obat {$databarang->nama_brng} tidak aktif"
                    ], 400);
                }
                
                // Hitung total stok dari bangsal yang terkait dengan poli
                $totalStokTersedia = 0;
                $stokPerBangsal = [];
                
                foreach ($bangsalList as $kdBangsal) {
                    $stokBangsal = Gudangbarang::getTotalStokByBarangBangsal($obat['kode_brng'], $kdBangsal);
                    $totalStokTersedia += $stokBangsal;
                    $stokPerBangsal[$kdBangsal] = $stokBangsal;
                }
                
                if ($totalStokTersedia < $obat['jml']) {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => "Stok obat {$databarang->nama_brng} tidak mencukupi. Tersedia: {$totalStokTersedia}, Diminta: {$obat['jml']}",
                        'stok_detail' => $stokPerBangsal
                    ], 400);
                }
                
                // Validasi jumlah minimum
                if ($obat['jml'] <= 0) {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => "Jumlah obat {$databarang->nama_brng} harus lebih dari 0"
                    ], 400);
                }
            }

            // Buat resep obat dengan nomor resep otomatis
            $resepObat = ResepObat::createResep([
                'tgl_perawatan' => '0000-00-00',
                'jam' => '00:00:00',
                'no_rawat' => $request->no_rawat,
                'kd_dokter' => $request->kd_dokter, // Dokter yang dipilih user
                'tgl_peresepan' => $request->tgl_peresepan ?? Carbon::now()->format('Y-m-d'),
                'jam_peresepan' => $request->jam_peresepan ?? Carbon::now()->format('H:i:s'),
                'status' => $request->status ?? 'ralan',
                'tgl_penyerahan' => '0000-00-00',
                'jam_penyerahan' => '00:00:00'
            ]);

            // Simpan detail resep
            $resepDetails = ResepDokter::saveResepDetail($resepObat->no_resep, $request->items);

            // Update stok obat (kurangi stok) dengan logging yang lebih baik
            foreach ($request->items as $obat) {
                try {
                    $this->updateStokObat($obat['kode_brng'], $obat['jml'], $request->kd_poli);
                } catch (\Exception $e) {
                    // Rollback jika ada error pada update stok
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => 'Gagal mengupdate stok: ' . $e->getMessage()
                    ], 500);
                }
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Resep berhasil disimpan',
                'data' => [
                    'no_resep' => $resepObat->no_resep,
                    'resep_obat' => $resepObat,
                    'resep_detail' => $resepDetails
                ]
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mendapatkan detail resep berdasarkan nomor resep
     *
     * Mengambil data resep lengkap beserta detail obat-obatan
     * yang terkait dengan nomor resep tertentu.
     *
     * @param string $noResep Nomor resep yang akan dicari
     * @return \Illuminate\Http\JsonResponse Response JSON dengan data resep atau error
     *
     * @throws \Exception Jika terjadi kesalahan dalam proses pengambilan data
     */
    public function show(string $noResep): JsonResponse
    {
        try {
            // Ambil data resep dengan relasi ke detail obat
            $resepObat = ResepObat::with('resepDokter.databarang')
                ->where('no_resep', $noResep)
                ->first();

            // Validasi apakah resep ditemukan
            if (!$resepObat) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resep tidak ditemukan'
                ], 404);
            }

            // Return data resep jika berhasil ditemukan
            return response()->json([
                'success' => true,
                'data' => $resepObat
            ], 200);
            
        } catch (\Exception $e) {
            // Handle error dan return response error
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mendapatkan daftar resep berdasarkan no_rawat
     */
    public function getByNoRawat($noRawat): JsonResponse
    {
        try {
            // Decode noRawat untuk menangani encoding dari frontend
            $decodedNoRawat = urldecode($noRawat);
            
            $resepList = ResepObat::with(['resepDokter.databarang', 'dokter'])
                ->where('no_rawat', $decodedNoRawat)
                ->orderBy('tgl_peresepan', 'desc')
                ->orderBy('jam_peresepan', 'desc')
                ->get()
                ->map(function($resep) {
                    return [
                        'no_resep' => $resep->no_resep,
                        'tgl_peresepan' => $resep->tgl_peresepan,
                        'jam_peresepan' => $resep->jam_peresepan,
                        'no_rawat' => $resep->no_rawat,
                        'kd_dokter' => $resep->kd_dokter,
                        'nama_dokter' => $resep->dokter->nm_dokter ?? 'Dokter tidak ditemukan',
                        'status' => $resep->status,
                        'tgl_perawatan' => $resep->tgl_perawatan,
                        'jam' => $resep->jam,
                        'tgl_penyerahan' => $resep->tgl_penyerahan,
                        'jam_penyerahan' => $resep->jam_penyerahan,
                        'detail_obat' => $resep->resepDokter->map(function($detail) {
                            return [
                                'kode_brng' => $detail->kode_brng,
                                'nama_brng' => $detail->databarang->nama_brng ?? 'Obat tidak ditemukan',
                                'jml' => $detail->jml,
                                'aturan_pakai' => $detail->aturan_pakai,
                                'satuan' => $detail->databarang->kode_satbesar ?? '',
                                'harga' => $detail->databarang->h_beli ?? 0
                            ];
                        })
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $resepList
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mengambil riwayat resep berdasarkan no_rkm_medis pasien dengan pagination
     */
    public function getByNoRkmMedis($noRkmMedis): JsonResponse
    {
        try {
            // Decode noRkmMedis untuk menangani encoding dari frontend
            $decodedNoRkmMedis = urldecode($noRkmMedis);
            
            // Ambil parameter pagination dari request
            $limit = request()->get('limit', 5); // Default 5 untuk loading awal
            $offset = request()->get('offset', 0);
            
            // Pertama, ambil semua no_rawat berdasarkan no_rkm_medis dari reg_periksa
            $noRawatArray = DB::table('reg_periksa')
                ->where('no_rkm_medis', $decodedNoRkmMedis)
                ->pluck('no_rawat')
                ->toArray();
            
            // Jika tidak ada no_rawat ditemukan, return empty
            if (empty($noRawatArray)) {
                return response()->json([
                    'success' => true,
                    'data' => [],
                    'total' => 0,
                    'has_more' => false,
                    'no_rawat_list' => []
                ]);
            }
            
            // Hitung total resep untuk pagination
            $totalResep = ResepObat::whereIn('no_rawat', $noRawatArray)->count();
            
            // Ambil resep berdasarkan array no_rawat dengan pagination
            $resepList = ResepObat::with(['resepDokter.databarang', 'dokter'])
                ->whereIn('no_rawat', $noRawatArray)
                ->orderBy('tgl_peresepan', 'desc')
                ->orderBy('jam_peresepan', 'desc')
                ->skip($offset)
                ->take($limit)
                ->get()
                ->map(function($resep) {
                    return [
                        'no_resep' => $resep->no_resep,
                        'tgl_peresepan' => $resep->tgl_peresepan,
                        'jam_peresepan' => $resep->jam_peresepan,
                        'no_rawat' => $resep->no_rawat,
                        'kd_dokter' => $resep->kd_dokter,
                        'nama_dokter' => $resep->dokter->nm_dokter ?? 'Dokter tidak ditemukan',
                        'status' => $resep->status,
                        'tgl_perawatan' => $resep->tgl_perawatan,
                        'jam' => $resep->jam,
                        'tgl_penyerahan' => $resep->tgl_penyerahan,
                        'jam_penyerahan' => $resep->jam_penyerahan,
                        'detail_obat' => $resep->resepDokter->map(function($detail) {
                            return [
                                'kode_brng' => $detail->kode_brng,
                                'nama_brng' => $detail->databarang->nama_brng ?? 'Obat tidak ditemukan',
                                'jml' => $detail->jml,
                                'aturan_pakai' => $detail->aturan_pakai,
                                'satuan' => $detail->databarang->kode_satbesar ?? '',
                                'harga' => $detail->databarang->h_beli ?? 0
                            ];
                        })
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $resepList,
                'total' => $totalResep,
                'current_count' => $resepList->count(),
                'has_more' => ($offset + $limit) < $totalResep,
                'next_offset' => ($offset + $limit) < $totalResep ? $offset + $limit : null,
                'no_rawat_list' => $noRawatArray
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mengambil data resep berdasarkan no_resep
     */
    public function getResep($noResep): JsonResponse
    {
        try {
            $resepObat = ResepObat::with(['resepDokter.databarang', 'dokter'])
                ->where('no_resep', $noResep)
                ->first();

            if (!$resepObat) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resep tidak ditemukan'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'no_resep' => $resepObat->no_resep,
                    'tgl_peresepan' => $resepObat->tgl_peresepan,
                    'jam_peresepan' => $resepObat->jam_peresepan,
                    'no_rawat' => $resepObat->no_rawat,
                    'kd_dokter' => $resepObat->kd_dokter,
                    'nama_dokter' => $resepObat->dokter->nm_dokter ?? 'Dokter tidak ditemukan',
                    'status' => $resepObat->status,
                    'tgl_perawatan' => $resepObat->tgl_perawatan,
                    'jam' => $resepObat->jam,
                    'tgl_penyerahan' => $resepObat->tgl_penyerahan,
                    'jam_penyerahan' => $resepObat->jam_penyerahan,
                    'detail_obat' => $resepObat->resepDokter->map(function($detail) {
                        return [
                            'kode_brng' => $detail->kode_brng,
                            'nama_brng' => $detail->databarang->nama_brng ?? 'Obat tidak ditemukan',
                            'jml' => $detail->jml,
                            'aturan_pakai' => $detail->aturan_pakai,
                            'satuan' => $detail->databarang->kode_satbesar ?? '',
                            'harga' => $detail->databarang->h_beli ?? 0
                        ];
                    })
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
     * Update stok obat setelah resep dibuat dengan metode FIFO
     */
    private function updateStokObat($kodeBrng, $jumlah, $kdPoli = null)
    {
        // Dapatkan bangsal yang terkait dengan poli jika ada
        $bangsalList = null;
        if ($kdPoli) {
            $bangsalList = SetDepoRalan::getBangsalByPoli($kdPoli);
        }
        
        // Ambil stok dari gudang dengan urutan FIFO (First In, First Out)
        // Urutkan berdasarkan tanggal expire dan no_batch
        $gudangQuery = Gudangbarang::where('kode_brng', $kodeBrng)
            ->where('stok', '>', 0);
            
        // Filter berdasarkan bangsal jika ada
        if ($bangsalList && !empty($bangsalList)) {
            $gudangQuery->whereIn('kd_bangsal', $bangsalList);
        }
        
        $gudangList = $gudangQuery->orderBy('no_batch')
            ->orderBy('no_faktur')
            ->get();

        if ($gudangList->isEmpty()) {
            throw new \Exception("Tidak ada stok tersedia untuk obat {$kodeBrng}");
        }

        $sisaJumlah = $jumlah;
        $updatedBatches = [];

        foreach ($gudangList as $gudang) {
            if ($sisaJumlah <= 0) break;

            $stokSebelum = $gudang->stok;
            
            if ($gudang->stok >= $sisaJumlah) {
                // Stok di gudang ini cukup
                $gudang->stok -= $sisaJumlah;
                $gudang->save();
                
                $updatedBatches[] = [
                    'kd_bangsal' => $gudang->kd_bangsal,
                    'no_batch' => $gudang->no_batch,
                    'no_faktur' => $gudang->no_faktur,
                    'stok_sebelum' => $stokSebelum,
                    'stok_diambil' => $sisaJumlah,
                    'stok_sesudah' => $gudang->stok
                ];
                
                $sisaJumlah = 0;
            } else {
                // Stok di gudang ini tidak cukup, ambil semua
                $stokDiambil = $gudang->stok;
                $sisaJumlah -= $gudang->stok;
                $gudang->stok = 0;
                $gudang->save();
                
                $updatedBatches[] = [
                    'kd_bangsal' => $gudang->kd_bangsal,
                    'no_batch' => $gudang->no_batch,
                    'no_faktur' => $gudang->no_faktur,
                    'stok_sebelum' => $stokSebelum,
                    'stok_diambil' => $stokDiambil,
                    'stok_sesudah' => 0
                ];
            }
        }

        if ($sisaJumlah > 0) {
            // Dapatkan nama obat untuk error message yang lebih informatif
            $databarang = Databarang::where('kode_brng', $kodeBrng)->first();
            $namaObat = $databarang ? $databarang->nama_brng : $kodeBrng;
            throw new \Exception("Stok obat {$namaObat} tidak mencukupi. Kekurangan: {$sisaJumlah}");
        }

        // Log perubahan stok untuk audit trail
         Log::info('Stok obat diupdate', [
             'kode_brng' => $kodeBrng,
             'jumlah_diminta' => $jumlah,
             'batches_updated' => $updatedBatches
         ]);

        return $updatedBatches;
    }

    /**
     * Mendapatkan informasi stok obat untuk validasi berdasarkan poli
     */
    public function getStokInfo(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'kode_brng' => 'required|string',
                'kd_poli' => 'nullable|string'
            ]);

            $databarang = Databarang::where('kode_brng', $request->kode_brng)->first();
            
            if (!$databarang) {
                return response()->json([
                    'success' => false,
                    'message' => 'Obat tidak ditemukan'
                ], 404);
            }

            // Jika ada kd_poli, hitung stok berdasarkan bangsal yang terkait
            if ($request->kd_poli) {
                $bangsalList = SetDepoRalan::getBangsalByPoli($request->kd_poli);
                
                $totalStok = 0;
                $stokPerBangsal = [];
                
                foreach ($bangsalList as $kdBangsal) {
                    $stokBangsal = Gudangbarang::getTotalStokByBarangBangsal($request->kode_brng, $kdBangsal);
                    $totalStok += $stokBangsal;
                    $stokPerBangsal[$kdBangsal] = $stokBangsal;
                }
                
                // Dapatkan detail batch untuk bangsal yang terkait
                $batchDetail = Gudangbarang::where('kode_brng', $request->kode_brng)
                    ->whereIn('kd_bangsal', $bangsalList)
                    ->where('stok', '>', 0)
                    ->select('kd_bangsal', 'stok', 'no_batch', 'no_faktur')
                    ->orderBy('no_batch')
                    ->get();
            } else {
                // Jika tidak ada kd_poli, gunakan semua bangsal
                $totalStok = $databarang->getTotalStok();
                $stokPerBangsal = $databarang->getStokDetailPerBangsal();
                
                $batchDetail = Gudangbarang::where('kode_brng', $request->kode_brng)
                    ->where('stok', '>', 0)
                    ->select('kd_bangsal', 'stok', 'no_batch', 'no_faktur')
                    ->orderBy('no_batch')
                    ->get();
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'kode_brng' => $databarang->kode_brng,
                    'nama_brng' => $databarang->nama_brng,
                    'total_stok' => $totalStok,
                    'stok_per_bangsal' => $stokPerBangsal,
                    'batch_detail' => $batchDetail,
                    'harga_ralan' => $databarang->ralan,
                    'satuan' => $databarang->kode_satbesar,
                    'status' => $databarang->status
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
     * Menghapus resep berdasarkan nomor resep
     */
    public function destroy($noResep): JsonResponse
    {
        try {
            DB::beginTransaction();

            // Cari resep yang akan dihapus
            $resep = ResepObat::where('no_resep', $noResep)->first();

            if (!$resep) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resep tidak ditemukan'
                ], 404);
            }

            // Hapus detail resep terlebih dahulu
            ResepDokter::where('no_resep', $noResep)->delete();

            // Hapus resep utama
            $resep->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Resep berhasil dihapus'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error deleting resep: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat menghapus resep: ' . $e->getMessage()
            ], 500);
        }
    }
}