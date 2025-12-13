<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\Patient;
use App\Models\Penjab;
use App\Models\Poliklinik;
use App\Models\Propinsi;
use App\Models\Kabupaten;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use App\Models\RegPeriksa;
use App\Models\Wilayah;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

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
            'no_rkm_medis' => 'nullable|string|max:15|unique:pasien,no_rkm_medis',
            'nm_pasien' => 'required|string|max:40',
            'no_ktp' => 'required|string|max:20|unique:pasien,no_ktp',
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
            'kd_pj' => 'required|exists:penjab,kd_pj',
            'no_peserta' => 'nullable|string|max:25',
            'pekerjaanpj' => 'required|string|max:35',
            'alamatpj' => 'required|string|max:100',
            'kode_wilayah' => 'required|string|max:13|exists:wilayah,kode',
            'email' => 'nullable|email|max:50',
            'perusahaan_pasien' => 'required|string|exists:perusahaan_pasien,kode_perusahaan|max:8',
            'suku_bangsa' => 'required|integer|exists:suku_bangsa,id',
            'bahasa_pasien' => 'required|integer|exists:bahasa_pasien,id',
            'cacat_fisik' => 'required|integer|exists:cacat_fisik,id',
            'nip' => 'nullable|string|max:30',
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
            'kd_pj.exists' => 'Penjab tidak valid',
            'pekerjaanpj.required' => 'Pekerjaan Penanggung Jawab harus diisi',
            'pekerjaanpj.max' => 'Pekerjaan Penanggung Jawab maksimal 35 karakter',
            'alamatpj.required' => 'Alamat Penanggung Jawab harus diisi',
            'alamatpj.max' => 'Alamat Penanggung Jawab maksimal 100 karakter',
            'kode_wilayah.required' => 'Kode Wilayah harus diisi',
            'kode_wilayah.max' => 'Kode Wilayah maksimal 13 karakter',
            'kode_wilayah.exists' => 'Kode Wilayah tidak ditemukan',
            'email.email' => 'Format email tidak valid',
            'email.max' => 'Email maksimal 50 karakter',
            'perusahaan_pasien.required' => 'Perusahaan pasien harus diisi',
            'perusahaan_pasien.exists' => 'Perusahaan pasien tidak valid',
            'perusahaan_pasien.max' => 'Kode perusahaan maksimal 8 karakter',
            'suku_bangsa.required' => 'Suku bangsa harus diisi',
            'suku_bangsa.exists' => 'Suku bangsa tidak valid',
            'bahasa_pasien.required' => 'Bahasa pasien harus diisi',
            'bahasa_pasien.exists' => 'Bahasa pasien tidak valid',
            'cacat_fisik.required' => 'Cacat fisik harus diisi',
            'cacat_fisik.exists' => 'Cacat fisik tidak valid',
            'nip.max' => 'NIP maksimal 30 karakter',
            'no_rkm_medis.unique' => 'Nomor Rekam Medis sudah ada',
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

            // Map kode_wilayah => kd_prop, kd_kab, kd_kec, kd_kel
            // Format expected: PP.RR.DD.VVVV (e.g., 74.01.01.1001)
            if (preg_match('/^\d{2}\.\d{2}\.\d{2}\.\d{4}$/', $data['kode_wilayah'])) {
                [$pp, $rr, $dd, $vvvv] = explode('.', $data['kode_wilayah']);

                // 1. Propinsi
                $ppInt = (int) $pp;
                $propinsi = Propinsi::find($ppInt);
                if (!$propinsi) {
                    $propinsi = Propinsi::where('nm_prop', $wilayahDetails['province'])->first();
                    if (!$propinsi) {
                        $propinsi = Propinsi::create([
                            'kd_prop' => $ppInt,
                            'nm_prop' => $wilayahDetails['province']
                        ]);
                    }
                }
                $data['kd_prop'] = $propinsi->kd_prop;

                // 2. Kabupaten
                $kabupaten = Kabupaten::where('nm_kab', $wilayahDetails['regency'])->first();
                if (!$kabupaten) {
                    $nextId = (Kabupaten::max('kd_kab') ?? 0) + 1;
                    $kabupaten = Kabupaten::create([
                        'kd_kab' => $nextId,
                        'nm_kab' => $wilayahDetails['regency']
                    ]);
                }
                $data['kd_kab'] = $kabupaten->kd_kab;

                // 3. Kecamatan
                $kecamatan = Kecamatan::where('nm_kec', $wilayahDetails['district'])->first();
                if (!$kecamatan) {
                    $nextId = (Kecamatan::max('kd_kec') ?? 0) + 1;
                    $kecamatan = Kecamatan::create([
                        'kd_kec' => $nextId,
                        'nm_kec' => $wilayahDetails['district']
                    ]);
                }
                $data['kd_kec'] = $kecamatan->kd_kec;

                // 4. Kelurahan
                $kelurahan = Kelurahan::where('nm_kel', $wilayahDetails['village'])->first();
                if (!$kelurahan) {
                    $nextId = (Kelurahan::max('kd_kel') ?? 0) + 1;
                    $kelurahan = Kelurahan::create([
                        'kd_kel' => $nextId,
                        'nm_kel' => $wilayahDetails['village']
                    ]);
                }
                $data['kd_kel'] = $kelurahan->kd_kel;
            }
        }

        // Generate nomor RM otomatis jika tidak diisi
        if (empty($data['no_rkm_medis'])) {
            $data['no_rkm_medis'] = Patient::generateNoRM();
        }
        $data['tgl_daftar'] = now()->toDateString();
        $data['umur'] = Patient::calculateAgeFromDate($data['tgl_lahir']);

        // Set default values for required legacy region fields to avoid FK violation
        $data['kd_prop'] = $data['kd_prop'] ?? 1;
        $data['kd_kab'] = $data['kd_kab'] ?? 1;
        $data['kd_kec'] = $data['kd_kec'] ?? 1;
        $data['kd_kel'] = $data['kd_kel'] ?? 1;
        // keep non-null defaults for optional string fields
        $data['nip'] = $data['nip'] ?? '';
        $data['email'] = $data['email'] ?? '';
        $data['pekerjaanpj'] = $data['pekerjaanpj'] ?? '';

        // Ensure kd_pj references an existing penjab (validated above)

        Patient::create($data);

        // Always respond with a redirect for Inertia requests to avoid plain JSON overlay
        return redirect()->back()->with('success', 'Data pasien berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        // Ambil nama cacat fisik dengan join sederhana (lookup) untuk tampilan
        $labelCol = Schema::hasColumn('cacat_fisik', 'nama_cacat')
            ? 'nama_cacat'
            : (Schema::hasColumn('cacat_fisik', 'nama_cacat_fisik')
                ? 'nama_cacat_fisik'
                : (Schema::hasColumn('cacat_fisik', 'nama') ? 'nama' : null));

        $namaCacat = null;
        if ($labelCol && $patient->cacat_fisik) {
            $namaCacat = DB::table('cacat_fisik')
                ->where('id', $patient->cacat_fisik)
                ->value($labelCol);
        }

        $patientData = $patient->toArray();
        $patientData['cacat_fisik_nama'] = $namaCacat;

        return Inertia::render('Patients/Show', [
            'patient' => $patientData,
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
            'no_ktp' => 'nullable|string|max:20|unique:pasien,no_ktp,'.$patient->no_rkm_medis.',no_rkm_medis',
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
            'kd_pj' => 'required|exists:penjab,kd_pj',
            'no_peserta' => 'nullable|string|max:25',
            'pekerjaanpj' => 'required|string|max:35',
            'alamatpj' => 'required|string|max:100',
            'kode_wilayah' => 'required|string|max:13|exists:wilayah,kode',
            'email' => 'nullable|email|max:50',
            'perusahaan_pasien' => 'required|string|exists:perusahaan_pasien,kode_perusahaan|max:8',
            'suku_bangsa' => 'required|integer|exists:suku_bangsa,id',
            'bahasa_pasien' => 'required|integer|exists:bahasa_pasien,id',
            'cacat_fisik' => 'required|integer|exists:cacat_fisik,id',
            'nip' => 'nullable|string|max:30',
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

            // Map kode_wilayah => kd_prop, kd_kab, kd_kec, kd_kel
            // Guarded by existence checks on legacy tables to avoid FK violations
            if (preg_match('/^\d{2}\.\d{2}\.\d{2}\.\d{4}$/', $data['kode_wilayah'])) {
                [$pp, $rr, $dd, $vvvv] = explode('.', $data['kode_wilayah']);
                
                // 1. Propinsi
                $ppInt = (int) $pp;
                $propinsi = Propinsi::find($ppInt);
                if (!$propinsi) {
                    $propinsi = Propinsi::where('nm_prop', $wilayahDetails['province'])->first();
                    if (!$propinsi) {
                        $propinsi = Propinsi::create([
                            'kd_prop' => $ppInt,
                            'nm_prop' => $wilayahDetails['province']
                        ]);
                    }
                }
                $data['kd_prop'] = $propinsi->kd_prop;

                // 2. Kabupaten
                $kabupaten = Kabupaten::where('nm_kab', $wilayahDetails['regency'])->first();
                if (!$kabupaten) {
                    $nextId = (Kabupaten::max('kd_kab') ?? 0) + 1;
                    $kabupaten = Kabupaten::create([
                        'kd_kab' => $nextId,
                        'nm_kab' => $wilayahDetails['regency']
                    ]);
                }
                $data['kd_kab'] = $kabupaten->kd_kab;

                // 3. Kecamatan
                $kecamatan = Kecamatan::where('nm_kec', $wilayahDetails['district'])->first();
                if (!$kecamatan) {
                    $nextId = (Kecamatan::max('kd_kec') ?? 0) + 1;
                    $kecamatan = Kecamatan::create([
                        'kd_kec' => $nextId,
                        'nm_kec' => $wilayahDetails['district']
                    ]);
                }
                $data['kd_kec'] = $kecamatan->kd_kec;

                // 4. Kelurahan
                $kelurahan = Kelurahan::where('nm_kel', $wilayahDetails['village'])->first();
                if (!$kelurahan) {
                    $nextId = (Kelurahan::max('kd_kel') ?? 0) + 1;
                    $kelurahan = Kelurahan::create([
                        'kd_kel' => $nextId,
                        'nm_kel' => $wilayahDetails['village']
                    ]);
                }
                $data['kd_kel'] = $kelurahan->kd_kel;
            }
        }

        // Update umur
        $data['umur'] = \Carbon\Carbon::parse($data['tgl_lahir'])->age.' Th';

        $patient->update($data);

        // Always respond with a redirect for Inertia requests to avoid plain JSON overlay
        return redirect()->back()->with('success', 'Data pasien berhasil diperbarui.');
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
}
