<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Dokter;
use App\Models\Patient;
use App\Models\Poliklinik;
use App\Models\RegPeriksa;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RegPeriksaController extends Controller
{
    /**
     * Get all registrasi periksa with filters
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = RegPeriksa::with(['patient', 'dokter', 'poliklinik']);

            // Filter berdasarkan status
            if ($request->filled('status')) {
                $query->byStatus($request->status);
            }

            // Filter berdasarkan status daftar
            if ($request->filled('status_daftar')) {
                $query->byStatusDaftar($request->status_daftar);
            }

            // Filter berdasarkan status lanjut
            if ($request->filled('status_lanjut')) {
                $query->byStatusLanjut($request->status_lanjut);
            }

            // Filter berdasarkan dokter
            if ($request->filled('dokter')) {
                $query->byDokter($request->dokter);
            }

            // Filter berdasarkan poli
            if ($request->filled('poli')) {
                $query->byPoli($request->poli);
            }

            // Filter berdasarkan status bayar
            if ($request->filled('status_bayar')) {
                $query->byStatusBayar($request->status_bayar);
            }

            // Filter berdasarkan tanggal
            if ($request->filled('tanggal')) {
                $query->byTanggalRegistrasi($request->tanggal);
            }

            // Filter berdasarkan range tanggal
            if ($request->filled('tanggal_awal') && $request->filled('tanggal_akhir')) {
                $query->byRangeTanggal($request->tanggal_awal, $request->tanggal_akhir);
            }

            // Filter berdasarkan penjamin (kd_pj) - mendukung single atau comma-separated
            if ($request->filled('kd_pj')) {
                $codes = array_filter(array_map('trim', explode(',', (string) $request->kd_pj)));
                if (! empty($codes)) {
                    $query->whereIn('kd_pj', $codes);
                }
            } elseif ($request->filled('kd_pj_in')) {
                $codes = array_filter(array_map('trim', explode(',', (string) $request->kd_pj_in)));
                if (! empty($codes)) {
                    $query->whereIn('kd_pj', $codes);
                }
            }

            // Search berdasarkan nama pasien atau no rawat
            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('no_rawat', 'like', "%{$search}%")
                        ->orWhere('no_reg', 'like', "%{$search}%")
                        ->orWhereHas('patient', function ($patientQuery) use ($search) {
                            $patientQuery->where('nama', 'like', "%{$search}%");
                        });
                });
            }

            $perPage = (int) ($request->query('per_page', 15));
            $regPeriksas = $query->orderBy('tgl_registrasi', 'desc')
                ->orderBy('jam_reg', 'desc')
                ->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $regPeriksas,
                'message' => 'Data registrasi periksa berhasil diambil',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data registrasi periksa: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get registrasi periksa by exact no_rawat (safe for values containing '/')
     */
    public function findByNoRawat(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'no_rawat' => 'required|string',
            ]);

            $regPeriksa = RegPeriksa::with(['patient', 'dokter', 'poliklinik'])
                ->where('no_rawat', $request->no_rawat)
                ->first();

            if (! $regPeriksa) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data registrasi periksa tidak ditemukan untuk nomor rawat yang diberikan',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $regPeriksa,
                'message' => 'Data registrasi periksa berhasil diambil berdasarkan no_rawat',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data registrasi periksa: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Create a new registrasi periksa
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'no_reg' => 'sometimes|string|max:8|unique:reg_periksa,no_reg',
                'no_rawat' => 'sometimes|string|max:17|unique:reg_periksa,no_rawat',
                'tgl_registrasi' => 'sometimes|date',
                'jam_reg' => 'sometimes|date_format:H:i',
                'kd_dokter' => 'required|string|exists:dokter,kd_dokter',
                'no_rkm_medis' => 'required|string|exists:pasien,no_rkm_medis',
                'kd_poli' => 'required|string|exists:poliklinik,kd_poli',
                'p_jawab' => 'required|string|max:100',
                'almt_pj' => 'required|string|max:200',
                'hubunganpj' => 'required|string|max:20',
                'biaya_reg' => 'required|numeric|min:0',
                'stts' => 'sometimes|in:Belum,Sudah,Batal,Berkas Diterima,Dirujuk,Meninggal,Dirawat,Pulang Paksa',
                'stts_daftar' => 'sometimes|in:-,Lama,Baru',
                'status_lanjut' => 'sometimes|in:Ralan,Ranap',
                'kd_pj' => 'required|string|max:3',
                'status_bayar' => 'sometimes|in:Sudah Bayar,Belum Bayar',
                'status_poli' => 'sometimes|in:Lama,Baru',
            ]);

            $validated['tgl_registrasi'] = $validated['tgl_registrasi'] ?? date('Y-m-d');
            $validated['jam_reg'] = $validated['jam_reg'] ?? date('H:i');
            $validated['stts'] = $validated['stts'] ?? 'Belum';
            $validated['stts_daftar'] = $validated['stts_daftar'] ?? 'Baru';
            $validated['status_lanjut'] = $validated['status_lanjut'] ?? 'Ralan';
            $validated['status_bayar'] = $validated['status_bayar'] ?? 'Belum Bayar';
            $validated['status_poli'] = $validated['status_poli'] ?? 'Baru';

            $patient = Patient::find($validated['no_rkm_medis']);

            $attempts = 0;
            while ($attempts < 5) {
                $attempts++;
                try {
                    DB::beginTransaction();

                    if (empty($validated['no_reg'])) {
                        $validated['no_reg'] = RegPeriksa::generateNoReg($validated['kd_dokter'], $validated['kd_poli'], $validated['tgl_registrasi']);
                    }
                    if (empty($validated['no_rawat'])) {
                        $validated['no_rawat'] = RegPeriksa::generateNoRawat($validated['tgl_registrasi']);
                    }

                    $regPeriksa = new RegPeriksa($validated);

                    if ($patient && $patient->tgl_lahir) {
                        $umurData = $regPeriksa->hitungUmur($patient->tgl_lahir, $validated['tgl_registrasi']);
                        if ($umurData) {
                            $regPeriksa->umurdaftar = $umurData['umur'];
                            $regPeriksa->sttsumur = $umurData['satuan'];
                        }
                    }

                    $regPeriksa->save();
                    $regPeriksa->load(['patient', 'dokter', 'poliklinik']);
                    DB::commit();

                    return response()->json([
                        'success' => true,
                        'data' => $regPeriksa,
                        'message' => 'Registrasi periksa berhasil dibuat',
                    ], 201);
                } catch (\Throwable $e) {
                    DB::rollBack();
                    $msg = (string) $e->getMessage();
                    $isDuplicate = str_contains($msg, 'Duplicate entry') || (int) $e->getCode() === 23000;
                    if ($isDuplicate && $attempts < 5) {
                        usleep(100000);
                        $validated['no_reg'] = null;
                        $validated['no_rawat'] = null;

                        continue;
                    }
                    throw $e;
                }
            }

            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat registrasi periksa setelah beberapa percobaan',
            ], 500);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat registrasi periksa: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get specific registrasi periksa
     */
    public function show(RegPeriksa $regPeriksa): JsonResponse
    {
        try {
            $regPeriksa->load(['patient', 'dokter', 'poliklinik']);

            return response()->json([
                'success' => true,
                'data' => $regPeriksa,
                'message' => 'Data registrasi periksa berhasil diambil',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data registrasi periksa: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update registrasi periksa
     */
    public function update(Request $request, RegPeriksa $regPeriksa): JsonResponse
    {
        try {
            $request->validate([
                'no_reg' => 'required|string|max:8|unique:reg_periksa,no_reg,'.$regPeriksa->no_reg.',no_reg',
                'no_rawat' => 'required|string|max:17|unique:reg_periksa,no_rawat,'.$regPeriksa->no_rawat.',no_rawat',
                'tgl_registrasi' => 'required|date',
                'jam_reg' => 'required|date_format:H:i',
                'kd_dokter' => 'required|string|exists:dokter,kd_dokter',
                'no_rkm_medis' => 'required|string|exists:pasien,no_rkm_medis',
                'kd_poli' => 'required|string|exists:poliklinik,kd_poli',
                'p_jawab' => 'required|string|max:100',
                'almt_pj' => 'required|string|max:200',
                'hubunganpj' => 'required|string|max:20',
                'biaya_reg' => 'required|numeric|min:0',
                'stts' => 'required|in:Belum,Sudah,Batal,Berkas Diterima,Dirujuk,Meninggal,Dirawat,Pulang Paksa',
                'stts_daftar' => 'required|in:-,Lama,Baru',
                'status_lanjut' => 'required|in:Ralan,Ranap',
                'kd_pj' => 'required|string|max:3',
                'status_bayar' => 'required|in:Sudah Bayar,Belum Bayar',
                'status_poli' => 'required|in:Lama,Baru',
            ]);

            // Hitung umur otomatis jika data pasien berubah
            if (
                $regPeriksa->no_rkm_medis !== $request->no_rkm_medis ||
                $regPeriksa->tgl_registrasi !== $request->tgl_registrasi
            ) {

                $patient = Patient::find($request->no_rkm_medis);
                if ($patient && $patient->tgl_lahir) {
                    $umurData = $regPeriksa->hitungUmur($patient->tgl_lahir, $request->tgl_registrasi);
                    if ($umurData) {
                        $request->merge([
                            'umurdaftar' => $umurData['umur'],
                            'sttsumur' => $umurData['satuan'],
                        ]);
                    }
                }
            }

            $regPeriksa->update($request->all());
            $regPeriksa->load(['patient', 'dokter', 'poliklinik']);

            return response()->json([
                'success' => true,
                'data' => $regPeriksa,
                'message' => 'Registrasi periksa berhasil diperbarui',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui registrasi periksa: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update registrasi periksa menggunakan payload no_rawat (aman untuk nilai yang mengandung '/')
     */
    public function updateByRawat(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'no_rawat' => 'required|string',
            ]);

            $model = RegPeriksa::where('no_rawat', $request->no_rawat)->first();
            if (! $model) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data registrasi periksa tidak ditemukan untuk nomor rawat yang diberikan',
                ], 404);
            }

            $rules = [
                'no_reg' => 'required|string|max:8|unique:reg_periksa,no_reg,'.$model->no_reg.',no_reg',
                'no_rawat' => 'required|string|max:17|unique:reg_periksa,no_rawat,'.$model->no_rawat.',no_rawat',
                'tgl_registrasi' => 'required|date',
                'jam_reg' => 'required|date_format:H:i',
                'kd_dokter' => 'required|string|exists:dokter,kd_dokter',
                'no_rkm_medis' => 'required|string|exists:pasien,no_rkm_medis',
                'kd_poli' => 'required|string|exists:poliklinik,kd_poli',
                'p_jawab' => 'required|string|max:100',
                'almt_pj' => 'required|string|max:200',
                'hubunganpj' => 'required|string|max:20',
                'biaya_reg' => 'required|numeric|min:0',
                'stts' => 'required|in:Belum,Sudah,Batal,Berkas Diterima,Dirujuk,Meninggal,Dirawat,Pulang Paksa',
                'stts_daftar' => 'required|in:-,Lama,Baru',
                'status_lanjut' => 'required|in:Ralan,Ranap',
                'kd_pj' => 'required|string|max:3',
                'status_bayar' => 'required|in:Sudah Bayar,Belum Bayar',
                'status_poli' => 'required|in:Lama,Baru',
            ];

            $validated = $request->validate($rules);

            // Hitung umur otomatis jika data pasien berubah
            if (
                isset($validated['no_rkm_medis']) &&
                ($validated['no_rkm_medis'] !== $model->no_rkm_medis)
            ) {
                $patient = \App\Models\Patient::where('no_rkm_medis', $validated['no_rkm_medis'])->first();
                if ($patient) {
                    $birthDate = new \DateTime($patient->tgl_lahir ?? date('Y-m-d'));
                    $today = new \DateTime($validated['tgl_registrasi'] ?? date('Y-m-d'));
                    $diff = $today->diff($birthDate);
                    $validated['umurdaftar'] = $diff->y;
                    $validated['sttsumur'] = 'Th';
                }
            }

            $model->update($validated);

            return response()->json([
                'success' => true,
                'data' => $model,
                'message' => 'Registrasi periksa berhasil diperbarui.',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui registrasi periksa: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update status_bayar saja untuk registrasi periksa
     */
    public function updateStatusBayar(Request $request, string $regPeriksa): JsonResponse
    {
        try {
            // Decode no_rawat untuk menangani encoding dari frontend
            $noRawat = urldecode($regPeriksa);

            $request->validate([
                'status_bayar' => 'required|in:Sudah Bayar,Belum Bayar',
            ]);

            $regPeriksaModel = RegPeriksa::where('no_rawat', $noRawat)->first();

            if (! $regPeriksaModel) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data registrasi periksa tidak ditemukan untuk nomor rawat yang diberikan',
                ], 404);
            }

            $regPeriksaModel->update([
                'status_bayar' => $request->status_bayar,
            ]);

            return response()->json([
                'success' => true,
                'data' => $regPeriksaModel,
                'message' => 'Status bayar berhasil diperbarui menjadi: '.$request->status_bayar,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui status bayar: '.$e->getMessage(),
            ], 500);
        }
    }

    public function updateKeputusan(Request $request, string $regPeriksa): JsonResponse
    {
        try {
            $noRawat = urldecode($regPeriksa);
            $request->validate([
                'keputusan' => 'required|in:-,RUJUKAN,PRIORITAS,HIJAU,KUNING,MERAH,HITAM,MJKN,CHECK-IN',
            ]);

            $model = RegPeriksa::where('no_rawat', $noRawat)->first();

            if (! $model) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data registrasi periksa tidak ditemukan untuk nomor rawat yang diberikan',
                ], 404);
            }

            $model->update([
                'keputusan' => $request->keputusan,
            ]);

            return response()->json([
                'success' => true,
                'data' => $model,
                'message' => 'Keputusan berhasil diperbarui menjadi: '.$request->keputusan,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui keputusan: '.$e->getMessage(),
            ], 500);
        }
    }

    public function updateStatus(Request $request, string $regPeriksa): JsonResponse
    {
        try {
            $noRawat = urldecode($regPeriksa);
            $request->validate([
                'stts' => 'required|in:Belum,Sudah,Batal,Berkas Diterima,Dirujuk,Meninggal,Dirawat,Pulang Paksa',
            ]);

            $model = RegPeriksa::where('no_rawat', $noRawat)->first();

            if (! $model) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data registrasi periksa tidak ditemukan untuk nomor rawat yang diberikan',
                ], 404);
            }

            $model->update([
                'stts' => $request->stts,
            ]);

            return response()->json([
                'success' => true,
                'data' => $model,
                'message' => 'Status berhasil diperbarui menjadi: '.$request->stts,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui status: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update keputusan by explicit no_rawat in payload (safe for values with '/')
     */
    public function updateKeputusanByRawat(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'no_rawat' => 'required|string',
                'keputusan' => 'required|in:-,RUJUKAN,PRIORITAS,HIJAU,KUNING,MERAH,HITAM,MJKN,CHECK-IN',
            ]);

            $model = RegPeriksa::where('no_rawat', $request->no_rawat)->first();

            if (! $model) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data registrasi periksa tidak ditemukan untuk nomor rawat yang diberikan',
                ], 404);
            }

            $model->update([
                'keputusan' => $request->keputusan,
            ]);

            return response()->json([
                'success' => true,
                'data' => $model,
                'message' => 'Keputusan berhasil diperbarui menjadi: '.$request->keputusan,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui keputusan: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete registrasi periksa
     */
    public function destroy(RegPeriksa $regPeriksa): JsonResponse
    {
        try {
            $regPeriksa->delete();

            return response()->json([
                'success' => true,
                'message' => 'Registrasi periksa berhasil dihapus',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus registrasi periksa: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Hitung umur untuk pasien tertentu
     */
    public function hitungUmur(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'no_rkm_medis' => 'required|string|exists:patients,no_rkm_medis',
                'tanggal_registrasi' => 'required|date',
            ]);

            $patient = Patient::find($request->no_rkm_medis);
            $regPeriksa = new RegPeriksa;

            $umurData = $regPeriksa->hitungUmur($patient->tanggal_lahir, $request->tanggal_registrasi);

            return response()->json([
                'success' => true,
                'data' => $umurData,
                'message' => 'Umur berhasil dihitung',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghitung umur: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get statistik registrasi periksa
     */
    public function getStatistik(Request $request): JsonResponse
    {
        try {
            $tanggalAwal = $request->query('tanggal_awal', Carbon::now()->startOfMonth());
            $tanggalAkhir = $request->query('tanggal_akhir', Carbon::now()->endOfMonth());

            $query = RegPeriksa::byRangeTanggal($tanggalAwal, $tanggalAkhir);

            $statistik = [
                'total_registrasi' => $query->count(),
                'pasien_baru' => $query->byStatusDaftar('Baru')->count(),
                'pasien_lama' => $query->byStatusDaftar('Lama')->count(),
                'rawat_jalan' => $query->byStatusLanjut('Ralan')->count(),
                'rawat_inap' => $query->byStatusLanjut('Ranap')->count(),
                'sudah_bayar' => $query->byStatusBayar('Sudah Bayar')->count(),
                'belum_bayar' => $query->byStatusBayar('Belum Bayar')->count(),
                'sudah_diperiksa' => $query->byStatus('Sudah')->count(),
                'belum_diperiksa' => $query->byStatus('Belum')->count(),
            ];

            return response()->json([
                'success' => true,
                'data' => $statistik,
                'message' => 'Statistik berhasil diambil',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil statistik: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get data untuk dropdown/filter
     */
    public function getFilterData(): JsonResponse
    {
        try {
            $doctors = Dokter::aktif()->get(['kd_dokter', 'nm_dokter']);
            $polis = Poliklinik::aktif()->get(['kd_poli', 'nm_poli']);
            $patients = Patient::orderBy('nama')->get(['no_rkm_medis', 'nama']);

            return response()->json([
                'success' => true,
                'data' => [
                    'doctors' => $doctors,
                    'polis' => $polis,
                    'patients' => $patients,
                ],
                'message' => 'Data filter berhasil diambil',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data filter: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get last and next numbers for no_reg and no_rawat
     */
    public function nextNumbers(Request $request): JsonResponse
    {
        try {
            // Log request untuk debugging
            Log::info('nextNumbers request', [
                'all_input' => $request->all(),
                'query_params' => $request->query->all(),
                'kd_poli' => $request->input('kd_poli'),
                'kd_dokter' => $request->input('kd_dokter'),
                'tanggal' => $request->input('tanggal'),
            ]);

            $urut = env('URUT_NO_REG', 'dokter + poli');
            $norm = strtolower(str_replace(' ', '', (string) $urut));

            // Validasi kd_poli - pastikan ada di database
            $kdPoliInput = trim((string) $request->input('kd_poli'));
            if (empty($kdPoliInput)) {
                Log::warning('nextNumbers: kd_poli kosong');
                return response()->json([
                    'success' => false,
                    'message' => 'kd_poli harus diisi',
                    'errors' => ['kd_poli' => ['kd_poli harus diisi']],
                ], 422);
            }

            // Normalize kd_poli ke uppercase untuk pencarian
            $kdPoli = strtoupper($kdPoliInput);
            $isIgd = $kdPoli === 'IGDK';
            $poliklinik = Poliklinik::where('kd_poli', $kdPoli)->first();
            if (! $poliklinik) {
                return response()->json([
                    'success' => false,
                    'message' => 'Poliklinik tidak ditemukan',
                    'errors' => ['kd_poli' => ['Poliklinik dengan kode '.$kdPoli.' tidak ditemukan']],
                ], 422);
            }

            // Validasi tanggal - fleksibel dengan berbagai format
            $tanggalInput = $request->input('tanggal');
            $date = null;
            if ($tanggalInput) {
                try {
                    $date = \Carbon\Carbon::parse($tanggalInput)->format('Y-m-d');
                } catch (\Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Format tanggal tidak valid',
                        'errors' => ['tanggal' => ['Format tanggal tidak valid. Gunakan format YYYY-MM-DD']],
                    ], 422);
                }
            } else {
                $date = date('Y-m-d');
            }

            // Validasi kd_dokter hanya jika diperlukan (bukan IGDK dan URUT_NO_REG = 'dokter+poli')
            $kdDokter = null;
            if (! $isIgd && $norm === 'dokter+poli') {
                $kdDokterInput = trim((string) $request->input('kd_dokter'));
                if (empty($kdDokterInput)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'kd_dokter harus diisi untuk poliklinik non-IGD',
                        'errors' => ['kd_dokter' => ['kd_dokter harus diisi']],
                    ], 422);
                }

                $dokter = Dokter::where('kd_dokter', $kdDokterInput)->first();
                if (! $dokter) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Dokter tidak ditemukan',
                        'errors' => ['kd_dokter' => ['Dokter dengan kode '.$kdDokterInput.' tidak ditemukan']],
                    ], 422);
                }
                $kdDokter = $kdDokterInput;
            } else {
                // Untuk IGDK atau jika URUT_NO_REG bukan 'dokter+poli', kd_dokter opsional
                $kdDokterInput = $request->input('kd_dokter');
                $kdDokter = $kdDokterInput ? trim((string) $kdDokterInput) : null;
            }

            $qb = RegPeriksa::where('tgl_registrasi', $date)->where('kd_poli', $kdPoli);
            if ($norm === 'dokter+poli' && ! $isIgd && $kdDokter) {
                $qb->where('kd_dokter', $kdDokter);
            }
            $lastNoRegNum = $qb->selectRaw('IFNULL(MAX(CONVERT(no_reg, SIGNED)), 0) as no')->first()->no;
            $lastNoReg = $lastNoRegNum > 0 ? str_pad((string) $lastNoRegNum, 3, '0', STR_PAD_LEFT) : null;
            $nextNoReg = RegPeriksa::generateNoReg($kdDokter, $kdPoli, $date);

            $lastNoRawatRow = RegPeriksa::where('tgl_registrasi', $date)
                ->orderBy('no_rawat', 'desc')
                ->first();
            $lastNoRawat = $lastNoRawatRow ? (string) $lastNoRawatRow->no_rawat : null;
            $nextNoRawat = RegPeriksa::generateNoRawat($date);

            return response()->json([
                'success' => true,
                'data' => [
                    'last_no_reg' => $lastNoReg,
                    'next_no_reg' => $nextNoReg,
                    'last_no_rawat' => $lastNoRawat,
                    'next_no_rawat' => $nextNoRawat,
                ],
                'message' => 'Nomor registrasi berhasil dihitung',
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil nomor registrasi: '.$e->getMessage(),
            ], 500);
        }
    }
}
