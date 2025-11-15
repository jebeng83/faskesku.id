<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\RegPeriksa;
use App\Models\Dokter;
use App\Models\Poliklinik;
use App\Models\Penjab;
use App\Models\Wilayah;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

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

        $patients = $query->orderBy('no_rkm_medis', 'desc')
            ->limit(10)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $patients
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

        $registration = RegPeriksa::create([
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
        ]);

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
            ]
        ]);
    }

    /**
     * Check patient status in specific polyclinic
     */
    public function checkPatientPoliStatus(Request $request, Patient $patient)
    {
        $kd_poli = $request->get('kd_poli');

        if (!$kd_poli) {
            return response()->json([
                'success' => false,
                'message' => 'Kode poliklinik diperlukan'
            ], 400);
        }

        // Check if patient has ever registered in this polyclinic
        $hasRegistered = RegPeriksa::where('no_rkm_medis', $patient->no_rkm_medis)
            ->where('kd_poli', $kd_poli)
            ->exists();

        // Get polyclinic data for biaya registrasi
        $poliklinik = Poliklinik::where('kd_poli', $kd_poli)->first();

        if (!$poliklinik) {
            return response()->json([
                'success' => false,
                'message' => 'Poliklinik tidak ditemukan'
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
                'has_registered' => $hasRegistered
            ]
        ]);
    }

    /**
     * Get registrations with filters
     */
    public function getRegistrations(Request $request)
    {
        $query = RegPeriksa::with([
            'pasien' => function($q) {
                $q->select('no_rkm_medis','nm_pasien','jk','umur','alamat','no_ktp');
            },
            'dokter' => function($q) {
                $q->select('kd_dokter','nm_dokter')->with([
                    'pegawai' => function($p) {
                        $p->select('nik','no_ktp','departemen');
                    }
                ]);
            },
            'poliklinik:kd_poli,nm_poli',
            'penjab:kd_pj,png_jawab'
        ]);

        // Filter by date
        if ($request->has('date') && $request->date) {
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

        $registrations = $query->orderBy('jam_reg', 'desc')
            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $registrations
        ]);
    }

    /**
     * Cancel patient registration
     */
    public function cancelRegistration(Request $request)
    {
        $request->validate([
            'no_rawat' => 'required|string'
        ]);

        // Find registration by no_rawat
        $registration = RegPeriksa::where('no_rawat', $request->no_rawat)->first();

        if (!$registration) {
            return response()->json([
                'success' => false,
                'message' => 'Registrasi tidak ditemukan'
            ], 404);
        }

        // Check if registration can be cancelled (only if status is 'Belum')
        if ($registration->stts !== 'Belum') {
            return response()->json([
                'success' => false,
                'message' => 'Registrasi tidak dapat dibatalkan karena sudah dalam proses atau selesai'
            ], 400);
        }

        // Update status to 'Batal'
        $registration->update(['stts' => 'Batal']);

        return response()->json([
            'success' => true,
            'message' => 'Registrasi berhasil dibatalkan'
        ]);
    }
}
