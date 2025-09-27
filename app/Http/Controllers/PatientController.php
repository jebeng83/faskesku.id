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
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Patient::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Pagination
        $patients = $query->orderBy('no_rkm_medis', 'desc')
            ->paginate(10)
            ->withQueryString();

        $dokters = Dokter::select('kd_dokter', 'nm_dokter')->get();
        $polikliniks = Poliklinik::select('kd_poli', 'nm_poli')->get();
        $penjabs = Penjab::select('kd_pj', 'png_jawab')->get();

        return Inertia::render('Patients/Index', [
            'patients' => $patients,
            'filters' => $request->only(['search']),
            'dokters' => $dokters,
            'polikliniks' => $polikliniks,
            'penjabs' => $penjabs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Patients/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nm_pasien' => 'required|string|max:40',
            'no_ktp' => 'nullable|string|max:20|unique:pasien,no_ktp',
            'jk' => 'required|in:L,P',
            'tmp_lahir' => 'required|string|max:15',
            'tgl_lahir' => 'required|date',
            'nm_ibu' => 'required|string|max:40',
            'alamat' => 'required|string|max:200',
            'gol_darah' => 'nullable|in:A,B,O,AB,-',
            'pekerjaan' => 'nullable|string|max:60',
            'stts_nikah' => 'nullable|in:BELUM MENIKAH,MENIKAH,JANDA,DUDHA,JOMBLO',
            'agama' => 'nullable|string|max:12',
            'no_tlp' => 'nullable|string|max:40',
            'pnd' => 'required|in:TS,TK,SD,SMP,SMA,SLTA/SEDERAJAT,D1,D2,D3,D4,S1,S2,S3,-',
            'keluarga' => 'nullable|in:AYAH,IBU,ISTRI,SUAMI,SAUDARA,ANAK,DIRI SENDIRI,LAIN-LAIN',
            'namakeluarga' => 'required|string|max:50',
            'kd_pj' => 'required|string|max:3',
            'no_peserta' => 'nullable|string|max:25',
            // 'pekerjaanpj' => 'required|string|max:35',
            'alamatpj' => 'required|string|max:100',
            'kode_wilayah' => 'required|string|max:13|exists:wilayah,kode',
        ], [
            'nm_pasien.required' => 'Nama Pasien harus diisi',
            'nm_pasien.max' => 'Nama Pasien maksimal 40 karakter',
            'no_ktp.required' => 'Nomor KTP harus diisi',
            'no_ktp.max' => 'Nomor KTP maksimal 20 karakter',
            'no_ktp.unique' => 'Nomor KTP sudah ada',
            'jk.required' => 'Jenis Kelamin harus diisi',
            'jk.in' => 'Jenis Kelamin harus Laki-laki atau Perempuan',
            'tmp_lahir.required' => 'Tempat Lahir harus diisi',
            'tmp_lahir.max' => 'Tempat Lahir maksimal 15 karakter',
            'tgl_lahir.required' => 'Tanggal Lahir harus diisi',
            'tgl_lahir.date' => 'Tanggal Lahir harus berupa tanggal',
            'nm_ibu.required' => 'Nama Ibu harus diisi',
            'nm_ibu.max' => 'Nama Ibu maksimal 40 karakter',
            'alamat.required' => 'Alamat harus diisi',
            'alamat.max' => 'Alamat maksimal 200 karakter',
            'kd_pj.required' => 'Penjab harus diisi',
            'kd_pj.max' => 'Penjab maksimal 3 karakter',
            // 'pekerjaanpj.required' => 'Pekerjaan Penanggung Jawab harus diisi',
            // 'pekerjaanpj.max' => 'Pekerjaan Penanggung Jawab maksimal 35 karakter',
            'alamatpj.required' => 'Alamat Penanggung Jawab harus diisi',
            'alamatpj.max' => 'Alamat Penanggung Jawab maksimal 100 karakter',
            'kode_wilayah.required' => 'Kode Wilayah harus diisi',
            'kode_wilayah.max' => 'Kode Wilayah maksimal 13 karakter',
            'kode_wilayah.exists' => 'Kode Wilayah tidak ditemukan',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator->errors())->withInput();
        }

        $data = $validator->validated();

        // Get wilayah details and set address fields
        $wilayah = Wilayah::find($data['kode_wilayah']);
        if ($wilayah) {
            $wilayahDetails = $wilayah->getFullAddressDetails();
            $data['kelurahanpj'] = $wilayahDetails['village'];
            $data['kecamatanpj'] = $wilayahDetails['district'];
            $data['kabupatenpj'] = $wilayahDetails['regency'];
            $data['propinsipj'] = $wilayahDetails['province'];
        }

        // Generate nomor RM otomatis
        $data['no_rkm_medis'] = Patient::generateNoRM();
        $data['tgl_daftar'] = now()->toDateString();
        $data['umur'] = Patient::calculateAgeFromDate($data['tgl_lahir']);

        // Set default values for required fields
        $data['kd_kel'] = $data['kd_kel'] ?? 1;
        $data['kd_kec'] = $data['kd_kec'] ?? 1;
        $data['kd_kab'] = $data['kd_kab'] ?? 1;
        $data['perusahaan_pasien'] = $data['perusahaan_pasien'] ?? '-';
        $data['suku_bangsa'] = $data['suku_bangsa'] ?? '1';
        $data['bahasa_pasien'] = $data['bahasa_pasien'] ?? '1';
        $data['cacat_fisik'] = $data['cacat_fisik'] ?? '1';
        $data['nip'] = $data['nip'] ?? '';
        $data['kd_prop'] = $data['kd_prop'] ?? 1;
        $data['email'] = $data['email'] ?? '';
        $data['pekerjaanpj'] = $data['pekerjaanpj'] ?? '';

        Patient::create($data);

        // Check if request is from Inertia (modal)
        if (request()->header('X-Inertia')) {
            return response()->json([
                'success' => true,
                'message' => 'Data pasien berhasil ditambahkan.',
                'data' => Patient::where('no_rkm_medis', $data['no_rkm_medis'])->first()
            ]);
        }

        return redirect()->route('patients.index')
            ->with('success', 'Data pasien berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        return Inertia::render('Patients/Show', [
            'patient' => $patient,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Patient $patient)
    {
        return Inertia::render('Patients/Edit', [
            'patient' => $patient,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Patient $patient)
    {
        $validator = Validator::make($request->all(), [
            'nm_pasien' => 'required|string|max:40',
            'no_ktp' => 'nullable|string|max:20|unique:pasien,no_ktp,' . $patient->no_rkm_medis . ',no_rkm_medis',
            'jk' => 'required|in:L,P',
            'tmp_lahir' => 'required|string|max:15',
            'tgl_lahir' => 'required|date',
            'nm_ibu' => 'required|string|max:40',
            'alamat' => 'required|string|max:200',
            'gol_darah' => 'nullable|in:A,B,O,AB,-',
            'pekerjaan' => 'nullable|string|max:60',
            'stts_nikah' => 'nullable|in:BELUM MENIKAH,MENIKAH,JANDA,DUDHA,JOMBLO',
            'agama' => 'nullable|string|max:12',
            'no_tlp' => 'nullable|string|max:40',
            'pnd' => 'required|in:TS,TK,SD,SMP,SMA,SLTA/SEDERAJAT,D1,D2,D3,D4,S1,S2,S3,-',
            'keluarga' => 'nullable|in:AYAH,IBU,ISTRI,SUAMI,SAUDARA,ANAK,DIRI SENDIRI,LAIN-LAIN',
            'namakeluarga' => 'required|string|max:50',
            'kd_pj' => 'required|string|max:3',
            'no_peserta' => 'nullable|string|max:25',
            'pekerjaanpj' => 'required|string|max:35',
            'alamatpj' => 'required|string|max:100',
            'kode_wilayah' => 'required|string|max:13|exists:wilayah,kode',
            'email' => 'nullable|email|max:50',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator->errors())->withInput();
        }

        $data = $validator->validated();

        // Get wilayah details and set address fields
        $wilayah = Wilayah::find($data['kode_wilayah']);
        if ($wilayah) {
            $wilayahDetails = $wilayah->getFullAddressDetails();
            $data['kelurahanpj'] = $wilayahDetails['village'];
            $data['kecamatanpj'] = $wilayahDetails['district'];
            $data['kabupatenpj'] = $wilayahDetails['regency'];
            $data['propinsipj'] = $wilayahDetails['province'];
        }

        // Update umur
        $data['umur'] = \Carbon\Carbon::parse($data['tgl_lahir'])->age . ' Th';

        $patient->update($data);

        return redirect()->route('patients.index')
            ->with('success', 'Data pasien berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        $patient->delete();

        return redirect()->route('patients.index')
            ->with('success', 'Data pasien berhasil dihapus.');
    }

    /**
     * Register patient for examination
     */
    public function registerPeriksa(Request $request, Patient $patient)
    {
        $request->validate([
            'kd_dokter' => 'required|exists:dokter,kd_dokter',
            'kd_poli' => 'required|exists:poliklinik,kd_poli',
            'kd_pj' => 'required|exists:penjab,kd_pj',
            'p_jawab' => 'required|string|max:100',
            'almt_pj' => 'required|string|max:200',
            'hubunganpj' => 'required|string|max:20',
            'kode_wilayah' => 'required|string|max:13|exists:wilayah,kode'
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

        // Hitung umur pasien
        $tglLahir = Carbon::parse($patient->tgl_lahir);
        $umur = $tglLahir->diffInYears(Carbon::now());
        $sttsUmur = 'Th';

        RegPeriksa::create([
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
            'kode_wilayah' => $request->kode_wilayah,
        ]);

        return redirect()->route('patients.index')
            ->with('success', 'Pasien berhasil didaftarkan untuk periksa.');
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
}
