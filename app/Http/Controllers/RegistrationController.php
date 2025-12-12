<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\Patient;
use App\Models\Penjab;
use App\Models\Poliklinik;
use App\Models\RegPeriksa;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class RegistrationController extends Controller
{
    /**
     * Display the registration page
     */
    public function index(Request $request)
    {
        // Get data for dropdowns
        $dokters = Dokter::select('kd_dokter', 'nm_dokter')->get();
        $polikliniks = Poliklinik::select('kd_poli', 'nm_poli')->get();
        $penjabs = Penjab::select('kd_pj', 'png_jawab')->get();

        // Get registrations for today
        $registrations = RegPeriksa::with(['pasien', 'dokter', 'poliklinik', 'penjab'])
            ->where('tgl_registrasi', date('Y-m-d'))
            ->orderBy('jam_reg', 'desc')
            ->paginate(10);

        return Inertia::render('Registration/Index', [
            'dokters' => $dokters,
            'polikliniks' => $polikliniks,
            'penjabs' => $penjabs,
            'registrations' => $registrations,
        ]);
    }

    /**
     * Search patients for registration
     */
    public function searchPatients(Request $request)
    {
        $query = Patient::query();

        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        $patients = $query->with(['kelurahan', 'kecamatan', 'kabupaten'])
            ->orderBy('no_rkm_medis', 'desc')
            ->limit(10)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $patients,
        ]);
    }

    /**
     * Register patient for examination
     */
    public function registerPatient(Request $request, Patient $patient)
    {
        $request->validate([
            'kd_dokter' => 'required|exists:dokter,kd_dokter',
            'kd_poli' => 'required|exists:poliklinik,kd_poli',
            'kd_pj' => 'required|exists:penjab,kd_pj',
            'p_jawab' => 'required|string|max:100',
            'almt_pj' => 'required|string|max:200',
            'hubunganpj' => 'required|string|max:20',
        ]);

        // Check if patient has ever registered in this polyclinic
        $hasRegistered = RegPeriksa::where('no_rkm_medis', $patient->no_rkm_medis)
            ->where('kd_poli', $request->kd_poli)
            ->exists();

        // Get polyclinic data for biaya registrasi
        $poliklinik = Poliklinik::where('kd_poli', $request->kd_poli)->first();

        // Determine status poli and biaya registrasi
        $status_poli = $hasRegistered ? 'Lama' : 'Baru';
        $biaya_reg = $hasRegistered ? $poliklinik->registrasilama : $poliklinik->registrasi;

        // Set default values
        $status_lanjut = 'Ralan';
        $status_bayar = 'Belum Bayar';

        // Generate nomor registrasi dan rawat
        $noReg = RegPeriksa::generateNoReg($request->kd_dokter, $request->kd_poli);
        $noRawat = RegPeriksa::generateNoRawat();

        // Hitung umur pasien untuk registrasi
        $tglLahir = Carbon::parse($patient->tgl_lahir);
        $umur = $tglLahir->diffInYears(Carbon::now());
        $sttsUmur = 'Th';

        // Update umur pasien di tabel pasien dengan format yang benar
        $updatedAge = Patient::calculateAgeFromDate($patient->tgl_lahir);
        $patient->update(['umur' => $updatedAge]);

        $data = [
            'no_reg' => $noReg,
            'no_rawat' => $noRawat,
            'tgl_registrasi' => now()->toDateString(),
            'jam_reg' => now()->toTimeString(),
            'kd_dokter' => $request->kd_dokter,
            'no_rkm_medis' => $patient->no_rkm_medis,
            'kd_poli' => $request->kd_poli,
            'p_jawab' => $request->p_jawab,
            'almt_pj' => $request->almt_pj,
            'hubunganpj' => $request->hubunganpj,
            'biaya_reg' => $biaya_reg,
            'stts' => 'Belum',
            'stts_daftar' => 'Baru',
            'status_lanjut' => $status_lanjut,
            'kd_pj' => $request->kd_pj,
            'umurdaftar' => $umur,
            'sttsumur' => $sttsUmur,
            'status_bayar' => $status_bayar,
            'status_poli' => $status_poli,
        ];

        // Support saving address codes if they exist in table and are passed or derived
        $addressFields = ['kode_wilayah', 'kd_prop', 'kd_kab', 'kd_kec', 'kd_kel'];
        foreach ($addressFields as $field) {
            if (Schema::hasColumn('reg_periksa', $field)) {
                if ($request->filled($field)) {
                    $data[$field] = $request->$field;
                } elseif (isset($patient->$field)) {
                    $data[$field] = $patient->$field;
                }
            }
        }

        $registration = RegPeriksa::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Pasien berhasil didaftarkan untuk periksa.',
            'data' => [
                'no_reg' => $registration->no_reg,
                'no_rawat' => $registration->no_rawat,
                'tgl_registrasi' => $registration->tgl_registrasi,
                'jam_reg' => $registration->jam_reg,
                'kd_dokter' => $registration->kd_dokter,
                'kd_poli' => $registration->kd_poli,
                'no_rkm_medis' => $registration->no_rkm_medis,
            ],
        ]);
    }

    /**
     * Check patient status in specific polyclinic
     */
    public function checkPatientPoliStatus(Request $request, Patient $patient)
    {
        $kd_poli = $request->get('kd_poli');

        if (! $kd_poli) {
            return response()->json([
                'success' => false,
                'message' => 'Kode poliklinik diperlukan',
            ], 400);
        }

        // Check if patient has ever registered in this polyclinic
        $hasRegistered = RegPeriksa::where('no_rkm_medis', $patient->no_rkm_medis)
            ->where('kd_poli', $kd_poli)
            ->exists();

        // Get polyclinic data for biaya registrasi
        $poliklinik = Poliklinik::where('kd_poli', $kd_poli)->first();

        if (! $poliklinik) {
            return response()->json([
                'success' => false,
                'message' => 'Poliklinik tidak ditemukan',
            ], 404);
        }

        // Determine status poli and biaya registrasi
        $status_poli = $hasRegistered ? 'Lama' : 'Baru';
        $biaya_reg = $hasRegistered ? $poliklinik->registrasilama : $poliklinik->registrasi;

        return response()->json([
            'success' => true,
            'data' => [
                'status_poli' => $status_poli,
                'biaya_reg' => $biaya_reg,
                'has_registered' => $hasRegistered,
            ],
        ]);
    }

    /**
     * Get registrations with filters
     */
    public function getRegistrations(Request $request)
    {
        $query = RegPeriksa::with([
            'pasien' => function ($q) {
                $q->select('no_rkm_medis', 'nm_pasien', 'jk', 'umur', 'alamat', 'no_ktp');
            },
            'dokter' => function ($q) {
                $q->select('kd_dokter', 'nm_dokter')->with([
                    'pegawai' => function ($p) {
                        $p->select('nik', 'no_ktp', 'departemen');
                    },
                ]);
            },
            'poliklinik:kd_poli,nm_poli',
            'penjab:kd_pj,png_jawab',
        ]);

        // Filter by date
        if ($request->has('start_date') && $request->start_date && $request->has('end_date') && $request->end_date) {
            $query->whereBetween('tgl_registrasi', [$request->start_date, $request->end_date]);
        } elseif ($request->has('start_date') && $request->start_date) {
            $query->where('tgl_registrasi', $request->start_date);
        } elseif ($request->has('end_date') && $request->end_date) {
            $query->where('tgl_registrasi', $request->end_date);
        } elseif ($request->has('date') && $request->date) {
            $query->where('tgl_registrasi', $request->date);
        } else {
            $query->where('tgl_registrasi', date('Y-m-d'));
        }

        // Filter by polyclinic
        if ($request->has('kd_poli') && $request->kd_poli) {
            $query->where('kd_poli', $request->kd_poli);
        }

        // Filter by doctor
        if ($request->has('kd_dokter') && $request->kd_dokter) {
            $query->where('kd_dokter', $request->kd_dokter);
        }

        // Filter by patient name
        if ($request->has('search') && $request->search) {
            $searchTerm = $request->search;
            $query->whereHas('pasien', function ($q) use ($searchTerm) {
                $q->where('nm_pasien', 'like', "%{$searchTerm}%")
                    ->orWhere('no_rkm_medis', 'like', "%{$searchTerm}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('stts', $request->status);
        }

        // Filter by status_poli
        if ($request->has('status_poli') && $request->status_poli) {
            $query->where('status_poli', $request->status_poli);
        }

        // Mendukung parameter per_page dari request agar client dapat mengatur jumlah data per halaman
        $perPage = (int) ($request->get('per_page') ?? 15);
        if ($perPage <= 0) {
            $perPage = 15;
        } elseif ($perPage > 100) {
            // Batasi maksimal 100 agar tidak membebani server
            $perPage = 100;
        }

        // Pastikan data selalu fresh dari database (tidak menggunakan cache)
        $registrations = $query->orderBy('jam_reg', 'desc')
            ->paginate($perPage);

        // Debug: Log sample data untuk memastikan field stts ada
        if ($registrations->count() > 0) {
            \Log::info('RegistrationController::getRegistrations - Sample data', [
                'total' => $registrations->total(),
                'sample_no_rawat' => $registrations->first()->no_rawat ?? null,
                'sample_stts' => $registrations->first()->stts ?? null,
                'sample_status_bayar' => $registrations->first()->status_bayar ?? null,
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $registrations,
        ]);
    }

    /**
     * Cancel patient registration
     */
    public function cancelRegistration(Request $request)
    {
        $request->validate([
            'no_rawat' => 'required|string',
        ]);

        // Find registration by no_rawat
        $registration = RegPeriksa::where('no_rawat', $request->no_rawat)->first();

        if (! $registration) {
            return response()->json([
                'success' => false,
                'message' => 'Registrasi tidak ditemukan',
            ], 404);
        }

        // Check if registration can be cancelled (only if status is 'Belum')
        if ($registration->stts !== 'Belum') {
            return response()->json([
                'success' => false,
                'message' => 'Registrasi tidak dapat dibatalkan karena sudah dalam proses atau selesai',
            ], 400);
        }

        // Update status to 'Batal'
        $registration->update(['stts' => 'Batal']);

        return response()->json([
            'success' => true,
            'message' => 'Registrasi berhasil dibatalkan',
        ]);
    }

    /**
     * Statistik kunjungan poli per bulan (top N poli dalam setahun)
     * Response shape:
     * {
     *   success: true,
     *   data: {
     *     year: 2025,
     *     months: ["Jan","Feb",...],
     *     series: [ { kd_poli, nm_poli, data: [12 angka], total: n } ],
     *     max: 123
     *   }
     * }
     */
    public function poliMonthlyStats(Request $request)
    {
        $year = (int) ($request->get('year') ?? date('Y'));
        $limit = (int) ($request->get('limit') ?? 5);
        if ($limit < 1) {
            $limit = 5;
        }

        // Ambil agregasi jumlah per bulan per poli
        $rows = DB::table('reg_periksa')
            ->join('poliklinik', 'poliklinik.kd_poli', '=', 'reg_periksa.kd_poli')
            ->selectRaw('MONTH(reg_periksa.tgl_registrasi) as month, reg_periksa.kd_poli as kd_poli, poliklinik.nm_poli as nm_poli, COUNT(*) as total')
            ->whereYear('reg_periksa.tgl_registrasi', $year)
            ->groupBy('month', 'reg_periksa.kd_poli', 'poliklinik.nm_poli')
            ->get();

        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

        // Susun data per poli
        $seriesMap = [];
        foreach ($rows as $r) {
            $kp = $r->kd_poli;
            if (! isset($seriesMap[$kp])) {
                $seriesMap[$kp] = [
                    'kd_poli' => $kp,
                    'nm_poli' => $r->nm_poli,
                    'data' => array_fill(0, 12, 0),
                    'total' => 0,
                ];
            }
            $idx = max(0, min(11, ((int) $r->month) - 1));
            $seriesMap[$kp]['data'][$idx] = (int) $r->total;
            $seriesMap[$kp]['total'] += (int) $r->total;
        }

        $series = array_values($seriesMap);
        // Urutkan berdasarkan total tertinggi dan ambil top N
        usort($series, function ($a, $b) {
            return $b['total'] <=> $a['total'];
        });
        if ($limit > 0 && count($series) > $limit) {
            $series = array_slice($series, 0, $limit);
        }

        // Hitung nilai maksimum untuk skala chart
        $max = 0;
        foreach ($series as $s) {
            foreach ($s['data'] as $val) {
                if ($val > $max) {
                    $max = $val;
                }
            }
        }

        return response()->json([
            'success' => true,
            'data' => [
                'year' => $year,
                'months' => $months,
                'series' => $series,
                'max' => $max,
            ],
        ]);
    }

    /**
     * Print registration card
     */
    public function print($no_rawat)
    {
        // Get registration with relations
        $registration = RegPeriksa::with(['pasien', 'dokter', 'poliklinik', 'penjab'])
            ->where('no_rawat', $no_rawat)
            ->first();

        if (! $registration) {
            abort(404, 'Registrasi tidak ditemukan');
        }

        // Get setting data (logo and kop surat)
        $setting = null;
        $logoBase64 = null;

        if (Schema::hasTable('setting')) {
            // Ambil record aktif jika ada, jika tidak, ambil record pertama
            $active = DB::table('setting')
                ->select('nama_instansi', 'alamat_instansi', 'kabupaten', 'propinsi', 'kontak', 'email', 'logo', 'aktifkan')
                ->whereRaw('LOWER(aktifkan) = ?', ['yes'])
                ->first();

            if (! $active) {
                $active = DB::table('setting')
                    ->select('nama_instansi', 'alamat_instansi', 'kabupaten', 'propinsi', 'kontak', 'email', 'logo', 'aktifkan')
                    ->first();
            }

            if ($active) {
                // Buat setting object tanpa logo (untuk menghindari binary data di JSON)
                $setting = (object) [
                    'nama_instansi' => $active->nama_instansi ?? null,
                    'alamat_instansi' => $active->alamat_instansi ?? null,
                    'kabupaten' => $active->kabupaten ?? null,
                    'propinsi' => $active->propinsi ?? null,
                    'kontak' => $active->kontak ?? null,
                    'email' => $active->email ?? null,
                ];

                // Convert logo to base64 if exists
                $logoBlob = $active->logo ?? null;
                if ($logoBlob) {
                    // Pastikan blob dalam bentuk string
                    if (! is_string($logoBlob) && is_resource($logoBlob)) {
                        $logoBlob = stream_get_contents($logoBlob);
                    }

                    if (is_string($logoBlob) && ! empty($logoBlob)) {
                        // Detect MIME type
                        $mime = 'image/png'; // default
                        if (function_exists('finfo_open')) {
                            $finfo = finfo_open(FILEINFO_MIME_TYPE);
                            $mime = finfo_buffer($finfo, $logoBlob) ?: 'image/png';
                            finfo_close($finfo);
                        }

                        $logoBase64 = 'data:'.$mime.';base64,'.base64_encode($logoBlob);
                    }
                }
            }
        }

        // Convert registration to array untuk memastikan serialization yang benar
        $registrationData = [
            'no_reg' => $registration->no_reg,
            'no_rawat' => $registration->no_rawat,
            'tgl_registrasi' => $registration->tgl_registrasi,
            'jam_reg' => $registration->jam_reg,
            'no_rkm_medis' => $registration->no_rkm_medis,
            'pasien' => $registration->pasien ? [
                'no_rkm_medis' => $registration->pasien->no_rkm_medis,
                'nm_pasien' => $registration->pasien->nm_pasien,
            ] : null,
            'dokter' => $registration->dokter ? [
                'kd_dokter' => $registration->dokter->kd_dokter,
                'nm_dokter' => $registration->dokter->nm_dokter,
            ] : null,
            'poliklinik' => $registration->poliklinik ? [
                'kd_poli' => $registration->poliklinik->kd_poli,
                'nm_poli' => $registration->poliklinik->nm_poli,
            ] : null,
            'penjab' => $registration->penjab ? [
                'kd_pj' => $registration->penjab->kd_pj,
                'png_jawab' => $registration->penjab->png_jawab,
            ] : null,
        ];

        return Inertia::render('Registration/CetakRegistrasi', [
            'registration' => $registrationData,
            'setting' => $setting,
            'logoBase64' => $logoBase64,
        ]);
    }
}