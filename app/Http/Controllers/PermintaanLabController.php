<?php

namespace App\Http\Controllers;

use App\Models\PermintaanLab;
use App\Models\PermintaanDetailPermintaanLab;
use App\Models\JnsPerawatanLab;
use App\Models\TemplateLaboratorium;
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

class PermintaanLabController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = PermintaanLab::with(['regPeriksa.patient', 'dokter']);

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

        $permintaanLab = $query->orderBy('tgl_permintaan', 'desc')
                              ->orderBy('jam_permintaan', 'desc')
                              ->paginate(15);

        return Inertia::render('PermintaanLab/Index', [
            'permintaanLab' => $permintaanLab,
            'filters' => $request->only(['tanggal', 'status', 'dokter', 'search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $dokters = Dokter::select('kd_dokter', 'nm_dokter')->get();
        $regPeriksa = RegPeriksa::with('patient')
                                ->whereDate('tgl_registrasi', today())
                                ->where('status_lanjut', 'Ralan')
                                ->get();

        return Inertia::render('PermintaanLab/Create', [
            'dokters' => $dokters,
            'regPeriksa' => $regPeriksa
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
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
            'detail_tests.*.kd_jenis_prw' => 'required|string|exists:jns_perawatan_lab,kd_jenis_prw',
            'detail_tests.*.stts_bayar' => 'required|in:Sudah,Belum',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        DB::beginTransaction();
        try {
            $data = $validator->validated();
            
            // Set default values untuk sampel dan hasil
            $data['tgl_sampel'] = $data['tgl_sampel'] ?? '0000-00-00';
            $data['jam_sampel'] = $data['jam_sampel'] ?? '00:00:00';
            $data['tgl_hasil'] = $data['tgl_hasil'] ?? '0000-00-00';
            $data['jam_hasil'] = $data['jam_hasil'] ?? '00:00:00';

            // Create main permintaan lab record (noorder akan auto-generate)
            $permintaanLab = PermintaanLab::create([
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

            // Create detail records - automatically get all templates for each kd_jenis_prw
            foreach ($data['detail_tests'] as $detail) {
                // Get all templates for this kd_jenis_prw
                $templates = TemplateLaboratorium::where('kd_jenis_prw', $detail['kd_jenis_prw'])->get();
                
                // Only create detail records if templates exist
                if ($templates->count() > 0) {
                    // Create detail record for each template
                    foreach ($templates as $template) {
                        PermintaanDetailPermintaanLab::create([
                            'noorder' => $permintaanLab->noorder,
                            'kd_jenis_prw' => $detail['kd_jenis_prw'],
                            'id_template' => $template->id_template,
                            'stts_bayar' => $detail['stts_bayar'],
                        ]);
                    }
                }
            }

            DB::commit();
            
            // Return Inertia response with success message
            return redirect()->back()->with('success', 'Permintaan laboratorium berhasil dibuat dengan nomor order: ' . $permintaanLab->noorder);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('PermintaanLabController store error: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            return redirect()->back()->withErrors(['error' => 'Gagal menyimpan permintaan laboratorium: ' . $e->getMessage()])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $noorder)
    {
        $permintaanLab = PermintaanLab::with(['regPeriksa.patient', 'dokter'])
                                     ->findOrFail($noorder);

        return Inertia::render('PermintaanLab/Show', [
            'permintaanLab' => $permintaanLab
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $noorder)
    {
        $permintaanLab = PermintaanLab::with(['regPeriksa.patient', 'dokter'])
                                     ->findOrFail($noorder);
        
        $dokters = Dokter::select('kd_dokter', 'nm_dokter')->get();
        $regPeriksa = RegPeriksa::with('patient')->get();

        return Inertia::render('PermintaanLab/Edit', [
            'permintaanLab' => $permintaanLab,
            'dokters' => $dokters,
            'regPeriksa' => $regPeriksa
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $noorder)
    {
        $permintaanLab = PermintaanLab::findOrFail($noorder);

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
            return back()->withErrors($validator)->withInput();
        }

        try {
            $data = $validator->validated();
            $permintaanLab->update($data);

            return redirect()->route('permintaan-lab.index')
                           ->with('success', 'Permintaan laboratorium berhasil diperbarui');
        } catch (\Exception $e) {
            Log::error('PermintaanLabController update error: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            return back()->withErrors(['error' => 'Gagal memperbarui permintaan laboratorium: ' . $e->getMessage()])
                        ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $noorder)
    {
        try {
            $permintaanLab = PermintaanLab::findOrFail($noorder);
            $permintaanLab->delete();

            // Check if request is AJAX
            if (request()->wantsJson() || request()->ajax()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Permintaan laboratorium berhasil dihapus'
                ]);
            }

            return redirect()->route('permintaan-lab.index')
                           ->with('success', 'Permintaan laboratorium berhasil dihapus');
        } catch (\Exception $e) {
            // Check if request is AJAX
            if (request()->wantsJson() || request()->ajax()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal menghapus permintaan laboratorium: ' . $e->getMessage()
                ], 500);
            }

            return back()->withErrors(['error' => 'Gagal menghapus permintaan laboratorium: ' . $e->getMessage()]);
        }
    }

    /**
     * Get reg periksa data for AJAX
     */
    public function getRegPeriksa(Request $request): JsonResponse
    {
        $query = RegPeriksa::with('patient')
                          ->where('status_lanjut', 'Ralan');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('no_rawat', 'like', "%{$search}%")
                  ->orWhereHas('patient', function($q) use ($search) {
                      $q->where('nm_pasien', 'like', "%{$search}%")
                        ->orWhere('no_rkm_medis', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('tanggal')) {
            $query->whereDate('tgl_registrasi', $request->tanggal);
        }

        $regPeriksa = $query->limit(10)->get();

        return response()->json([
            'success' => true,
            'data' => $regPeriksa
        ]);
    }

    /**
     * Get permintaan lab by no_rawat
     */
    public function getByNoRawat($noRawat): JsonResponse
    {
        try {
            // Decode noRawat untuk menangani encoding dari frontend
            $decodedNoRawat = urldecode($noRawat);
            
            $permintaanList = PermintaanLab::with(['regPeriksa.patient', 'dokter', 'detailPermintaan.jenisPerawatan'])
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
                        'dokter_perujuk' => '-',
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
                        'detail_tests' => $permintaan->detailPermintaan->map(function($detail) {
                            return [
                                'kd_jenis_prw' => $detail->kd_jenis_prw,
                                'nm_perawatan' => $detail->jenisPerawatan->nm_perawatan ?? '',
                                'biaya' => $detail->jenisPerawatan->total_byrdr ?? 0,
                                'stts_bayar' => $detail->stts_bayar,
                            ];
                        })
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $permintaanList,
                'total' => $permintaanList->count()
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data permintaan laboratorium: ' . $e->getMessage(),
                'data' => []
            ], 500);
        }
    }

    /**
     * Get available lab tests
     */
    public function getLabTests(Request $request): JsonResponse
    {
        try {
            $search = $request->get('search', '');
            $kelas = $request->get('kelas', '');
            
            $query = JnsPerawatanLab::where('status', '1');
            
            if (!empty($search)) {
                $query->where('nm_perawatan', 'like', '%' . $search . '%');
            }
            
            if (!empty($kelas)) {
                $query->where('kelas', $kelas);
            }
            
            $labTests = $query->orderBy('nm_perawatan', 'asc')->get();
            
            return response()->json([
                'success' => true,
                'data' => $labTests,
                'total' => $labTests->count()
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching lab tests: ' . $e->getMessage(),
                'data' => []
            ], 500);
        }
    }

    /**
     * Get riwayat permintaan lab by no_rawat
     */
    public function getRiwayat($noRawat): JsonResponse
    {
        try {
            $riwayatPermintaan = PermintaanLab::with([
                'detailPermintaan.jnsPerawatanLab',
                'detailPermintaan.templateLaboratorium'
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