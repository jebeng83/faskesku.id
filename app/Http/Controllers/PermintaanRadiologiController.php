<?php

namespace App\Http\Controllers;

use App\Models\PermintaanRadiologi;
use App\Models\PermintaanPemeriksaanRadiologi;
use App\Models\JnsPerawatanRadiologi;
use App\Models\RegPeriksa;
use App\Models\Dokter;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Carbon\Carbon;

class PermintaanRadiologiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = PermintaanRadiologi::with(['regPeriksa.patient', 'dokter']);

        // Filter berdasarkan tanggal
        if ($request->filled('tanggal')) {
            $query->byTanggalPermintaan($request->tanggal);
        }

        // Filter berdasarkan status
        if ($request->filled('status')) {
            $query->byStatus($request->status);
        }

        // Filter berdasarkan dokter
        if ($request->filled('dokter')) {
            $query->byDokter($request->dokter);
        }

        // Search berdasarkan no_rawat atau nama pasien
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('no_rawat', 'like', "%{$search}%")
                  ->orWhere('noorder', 'like', "%{$search}%")
                  ->orWhereHas('regPeriksa.patient', function($q) use ($search) {
                      $q->where('nm_pasien', 'like', "%{$search}%");
                  });
            });
        }

        $permintaanRadiologi = $query->orderBy('tgl_permintaan', 'desc')
                                    ->orderBy('jam_permintaan', 'desc')
                                    ->paginate(15);

        return Inertia::render('PermintaanRadiologi/Index', [
            'permintaanRadiologi' => $permintaanRadiologi,
            'filters' => $request->only(['tanggal', 'status', 'dokter', 'search'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        // Decode no_rawat untuk menangani encoding dari frontend
        $requestData = $request->all();
        if (isset($requestData['no_rawat'])) {
            $requestData['no_rawat'] = urldecode($requestData['no_rawat']);
        }
        
        $validator = Validator::make($requestData, [
            'no_rawat' => 'required|string|max:17|exists:reg_periksa,no_rawat',
            'tgl_permintaan' => 'required|date',
            'jam_permintaan' => 'required|date_format:H:i',
            'tgl_sampel' => 'nullable|date',
            'jam_sampel' => 'nullable|date_format:H:i',
            'tgl_hasil' => 'nullable|date',
            'jam_hasil' => 'nullable|date_format:H:i',
            'status' => 'required|in:ralan,ranap',
            'informasi_tambahan' => 'nullable|string|max:60',
            'diagnosa_klinis' => 'required|string|max:80',
            'dokter_perujuk' => 'nullable|string|max:20',
            'detail_tests' => 'required|array|min:1',
            'detail_tests.*.kd_jenis_prw' => 'required|string|exists:jns_perawatan_radiologi,kd_jenis_prw',
            'detail_tests.*.stts_bayar' => 'required|in:Sudah,Belum',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();
        try {
            $data = $validator->validated();
            
            // Set default values untuk sampel dan hasil
            $data['tgl_sampel'] = $data['tgl_sampel'] ?? '0000-00-00';
            $data['jam_sampel'] = $data['jam_sampel'] ?? '00:00:00';
            $data['tgl_hasil'] = $data['tgl_hasil'] ?? '0000-00-00';
            $data['jam_hasil'] = $data['jam_hasil'] ?? '00:00:00';

            // Create main permintaan radiologi record (noorder akan auto-generate)
            $permintaanRadiologi = PermintaanRadiologi::create([
                'no_rawat' => $data['no_rawat'],
                'tgl_permintaan' => $data['tgl_permintaan'],
                'jam_permintaan' => $data['jam_permintaan'],
                'tgl_sampel' => $data['tgl_sampel'],
                'jam_sampel' => $data['jam_sampel'],
                'tgl_hasil' => $data['tgl_hasil'],
                'jam_hasil' => $data['jam_hasil'],
                'dokter_perujuk' => $data['dokter_perujuk'] ?? '-',
                'status' => $data['status'],
                'informasi_tambahan' => $data['informasi_tambahan'],
                'diagnosa_klinis' => $data['diagnosa_klinis'],
            ]);

            // Create detail records
            foreach ($data['detail_tests'] as $detail) {
                PermintaanPemeriksaanRadiologi::create([
                    'noorder' => $permintaanRadiologi->noorder,
                    'kd_jenis_prw' => $detail['kd_jenis_prw'],
                    'stts_bayar' => $detail['stts_bayar'],
                ]);
            }

            DB::commit();
            
            return response()->json([
                'success' => true,
                'message' => 'Permintaan radiologi berhasil dibuat',
                'data' => [
                    'noorder' => $permintaanRadiologi->noorder,
                    'no_rawat' => $permintaanRadiologi->no_rawat
                ]
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('PermintaanRadiologiController store error: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan permintaan radiologi: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $noorder)
    {
        $permintaanRadiologi = PermintaanRadiologi::with(['regPeriksa.patient', 'dokter', 'detailPermintaan.jenisPerawatan'])
                                                 ->findOrFail($noorder);

        return response()->json([
            'success' => true,
            'data' => $permintaanRadiologi
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $noorder)
    {
        $permintaanRadiologi = PermintaanRadiologi::findOrFail($noorder);

        // Decode no_rawat untuk menangani encoding dari frontend
        $requestData = $request->all();
        if (isset($requestData['no_rawat'])) {
            $requestData['no_rawat'] = urldecode($requestData['no_rawat']);
        }

        $validator = Validator::make($requestData, [
            'no_rawat' => 'required|string|max:17|exists:reg_periksa,no_rawat',
            'tgl_permintaan' => 'required|date',
            'jam_permintaan' => 'required|date_format:H:i',
            'tgl_sampel' => 'nullable|date',
            'jam_sampel' => 'nullable|date_format:H:i',
            'tgl_hasil' => 'nullable|date',
            'jam_hasil' => 'nullable|date_format:H:i',
            'status' => 'required|in:ralan,ranap',
            'informasi_tambahan' => 'nullable|string|max:60',
            'diagnosa_klinis' => 'required|string|max:80'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $data = $validator->validated();
            $permintaanRadiologi->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Permintaan radiologi berhasil diperbarui',
                'data' => $permintaanRadiologi
            ]);
        } catch (\Exception $e) {
            Log::error('PermintaanRadiologiController update error: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui permintaan radiologi: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $noorder)
    {
        try {
            $permintaanRadiologi = PermintaanRadiologi::findOrFail($noorder);
            $permintaanRadiologi->delete();

            // Check if request is AJAX
            if (request()->ajax() || request()->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Permintaan radiologi berhasil dihapus'
                ]);
            }

            return redirect()->route('permintaan-radiologi.index')
                           ->with('success', 'Permintaan radiologi berhasil dihapus');
        } catch (\Exception $e) {
            Log::error('PermintaanRadiologiController destroy error: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);

            if (request()->ajax() || request()->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal menghapus permintaan radiologi: ' . $e->getMessage()
                ], 500);
            }

            return redirect()->back()
                           ->withErrors(['error' => 'Gagal menghapus permintaan radiologi: ' . $e->getMessage()]);
        }
    }

    /**
     * Get jenis perawatan radiologi for selection
     */
    public function getJenisPerawatan(Request $request): JsonResponse
    {
        try {
            $query = JnsPerawatanRadiologi::aktif();

            // Filter berdasarkan kelas jika ada
            if ($request->filled('kelas')) {
                $query->where('kelas', $request->kelas);
            }

            // Filter berdasarkan penjab jika ada
            if ($request->filled('kd_pj')) {
                $query->where('kd_pj', $request->kd_pj);
            }

            // Search berdasarkan nama perawatan
            if ($request->filled('search')) {
                $query->search($request->search);
            }

            $jenisPerawatan = $query->select([
                'kd_jenis_prw',
                'nm_perawatan',
                'total_byr',
                'bagian_rs',
                'tarif_perujuk',
                'tarif_tindakan_dokter',
                'tarif_tindakan_petugas'
            ])->get();

            return response()->json([
                'success' => true,
                'data' => $jenisPerawatan
            ]);
        } catch (\Exception $e) {
            Log::error('PermintaanRadiologiController getJenisPerawatan error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data jenis perawatan radiologi'
            ], 500);
        }
    }

    /**
     * Get permintaan radiologi by no_rawat
     */
    public function getByNoRawat($noRawat): JsonResponse
    {
        try {
            // Decode noRawat untuk menangani encoding dari frontend
            $decodedNoRawat = urldecode($noRawat);
            
            $permintaanList = PermintaanRadiologi::with(['regPeriksa.patient', 'dokter', 'detailPermintaan.jenisPerawatan'])
                ->where('no_rawat', $decodedNoRawat)
                ->orderBy('tgl_permintaan', 'desc')
                ->orderBy('jam_permintaan', 'desc')
                ->get()
                ->map(function($permintaan) {
                    return [
                        'noorder' => $permintaan->noorder,
                        'no_rawat' => $permintaan->no_rawat,
                        'tgl_permintaan' => $permintaan->tgl_permintaan,
                        'jam_permintaan' => $permintaan->jam_permintaan,
                        'tgl_sampel' => $permintaan->tgl_sampel,
                        'jam_sampel' => $permintaan->jam_sampel,
                        'tgl_hasil' => $permintaan->tgl_hasil,
                        'jam_hasil' => $permintaan->jam_hasil,
                        'dokter_perujuk' => $permintaan->dokter_perujuk ?? '-',
                        'status' => $permintaan->status,
                        'informasi_tambahan' => $permintaan->informasi_tambahan,
                        'diagnosa_klinis' => $permintaan->diagnosa_klinis,
                        'pasien' => [
                            'no_rkm_medis' => $permintaan->regPeriksa->patient->no_rkm_medis ?? '',
                            'nm_pasien' => $permintaan->regPeriksa->patient->nm_pasien ?? '',
                        ],
                        'dokter' => [
                            'kd_dokter' => $permintaan->dokter->kd_dokter ?? '',
                            'nm_dokter' => $permintaan->dokter->nm_dokter ?? '',
                        ],
                        'pemeriksaan' => $permintaan->detailPermintaan->map(function($detail) {
                            return [
                                'kd_jenis_prw' => $detail->kd_jenis_prw,
                                'stts_bayar' => $detail->stts_bayar,
                                'jns_perawatan_radiologi' => [
                                    'nm_perawatan' => $detail->jenisPerawatan->nm_perawatan ?? '',
                                    'total_byr' => $detail->jenisPerawatan->total_byr ?? 0,
                                ]
                            ];
                        })
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $permintaanList
            ]);

        } catch (\Exception $e) {
            Log::error('PermintaanRadiologiController getByNoRawat error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data permintaan radiologi'
            ], 500);
        }
    }

    /**
     * Get riwayat permintaan radiologi by no_rawat
     */
    public function getRiwayat($noRawat): JsonResponse
    {
        try {
            $riwayatPermintaan = PermintaanRadiologi::with([
                'detailPermintaan.jnsPerawatanRadiologi'
            ])
            ->where('no_rawat', $noRawat)
            ->orderBy('tgl_permintaan', 'desc')
            ->orderBy('jam_permintaan', 'desc')
            ->get();

            return response()->json([
                'success' => true,
                'data' => $riwayatPermintaan
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil riwayat permintaan: ' . $e->getMessage()
            ], 500);
        }
    }
}