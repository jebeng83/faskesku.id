<?php

namespace App\Http\Controllers\RawatJalan;

use App\Http\Controllers\Controller;
use App\Models\RawatJalan\ResepObat;
use App\Models\RawatJalan\ResepDokter;
use App\Models\RawatJalan\Gudangbarang;
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
        try {
            $request->validate([
                'no_rawat' => 'required|string',
                'kd_poli' => 'required|string',
                'items' => 'required|array|min:1',
                'items.*.kode_brng' => 'required|string',
                'items.*.jml' => 'required|numeric|min:0.1',
                'items.*.aturan_pakai' => 'nullable|string|max:150'
            ]);

            DB::beginTransaction();

            // Validasi stok obat terlebih dahulu
            foreach ($request->items as $obat) {
                $stokTersedia = Gudangbarang::where('kode_brng', $obat['kode_brng'])
                    ->sum('stok');
                
                if ($stokTersedia < $obat['jml']) {
                    return response()->json([
                        'success' => false,
                        'message' => "Stok obat {$obat['kode_brng']} tidak mencukupi. Tersedia: {$stokTersedia}, Diminta: {$obat['jml']}"
                    ], 400);
                }
            }

            // Buat resep obat dengan nomor resep otomatis
            $resepObat = ResepObat::createResep([
                'tgl_perawatan' => $request->tgl_perawatan ?? Carbon::now()->format('Y-m-d'),
                'jam' => $request->jam ?? Carbon::now()->format('H:i:s'),
                'no_rawat' => $request->no_rawat,
                'kd_dokter' => $request->kd_dokter ?? 'DR001', // Default dokter jika tidak ada
                'tgl_peresepan' => $request->tgl_peresepan ?? Carbon::now()->format('Y-m-d'),
                'jam_peresepan' => $request->jam_peresepan ?? Carbon::now()->format('H:i:s'),
                'status' => $request->status ?? 'ralan',
                'tgl_penyerahan' => $request->tgl_penyerahan ?? Carbon::now()->format('Y-m-d'),
                'jam_penyerahan' => $request->jam_penyerahan ?? Carbon::now()->format('H:i:s')
            ]);

            // Simpan detail resep
            $resepDetails = ResepDokter::saveResepDetail($resepObat->no_resep, $request->items);

            // Update stok obat (kurangi stok)
            foreach ($request->items as $obat) {
                $this->updateStokObat($obat['kode_brng'], $obat['jml']);
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
     * Mendapatkan detail resep
     */
    public function show($noResep): JsonResponse
    {
        try {
            $resepObat = ResepObat::with('resepDokter.databarang')
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
                'data' => $resepObat
            ]);

        } catch (\Exception $e) {
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
            $resepList = ResepObat::with('resepDokter.databarang')
                ->where('no_rawat', $noRawat)
                ->orderBy('tgl_peresepan', 'desc')
                ->orderBy('jam_peresepan', 'desc')
                ->get();

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
     * Mengambil data resep berdasarkan no_resep
     */
    public function getResep($noResep): JsonResponse
    {
        try {
            $resepObat = ResepObat::with(['resepDokter.databarang'])
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
                    'resep_obat' => $resepObat,
                    'detail_resep' => $resepObat->resepDokter->map(function($detail) {
                        return [
                            'kode_brng' => $detail->kode_brng,
                            'nama_brng' => $detail->databarang->nama_brng ?? 'Obat tidak ditemukan',
                            'jml' => $detail->jml,
                            'aturan_pakai' => $detail->aturan_pakai,
                            'satuan' => $detail->databarang->kode_satbesar ?? ''
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
     * Update stok obat setelah resep dibuat
     */
    private function updateStokObat($kodeBrng, $jumlah)
    {
        // Ambil stok dari gudang dengan urutan FIFO (First In, First Out)
        $gudangList = Gudangbarang::where('kode_brng', $kodeBrng)
            ->where('stok', '>', 0)
            ->orderBy('no_batch')
            ->get();

        $sisaJumlah = $jumlah;

        foreach ($gudangList as $gudang) {
            if ($sisaJumlah <= 0) break;

            if ($gudang->stok >= $sisaJumlah) {
                // Stok di gudang ini cukup
                $gudang->stok -= $sisaJumlah;
                $gudang->save();
                $sisaJumlah = 0;
            } else {
                // Stok di gudang ini tidak cukup, ambil semua
                $sisaJumlah -= $gudang->stok;
                $gudang->stok = 0;
                $gudang->save();
            }
        }

        if ($sisaJumlah > 0) {
            throw new \Exception("Stok obat {$kodeBrng} tidak mencukupi");
        }
    }
}