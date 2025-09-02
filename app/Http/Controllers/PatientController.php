<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

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

        return Inertia::render('Patients/Index', [
            'patients' => $patients,
            'filters' => $request->only(['search']),
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
            'pekerjaanpj' => 'required|string|max:35',
            'alamatpj' => 'required|string|max:100',
            'kelurahanpj' => 'required|string|max:60',
            'kecamatanpj' => 'required|string|max:60',
            'kabupatenpj' => 'required|string|max:60',
            'propinsipj' => 'required|string|max:30',
            'email' => 'nullable|email|max:50',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $validator->validated();
        
        // Generate nomor RM otomatis
        $data['no_rkm_medis'] = Patient::generateNoRM();
        $data['tgl_daftar'] = now()->toDateString();
        $data['umur'] = \Carbon\Carbon::parse($data['tgl_lahir'])->age . ' Th';
        
        // Set default values for required fields
        $data['kd_kel'] = $data['kd_kel'] ?? 1;
        $data['kd_kec'] = $data['kd_kec'] ?? 1;
        $data['kd_kab'] = $data['kd_kab'] ?? 1;
        $data['perusahaan_pasien'] = $data['perusahaan_pasien'] ?? '00000000';
        $data['suku_bangsa'] = $data['suku_bangsa'] ?? 1;
        $data['bahasa_pasien'] = $data['bahasa_pasien'] ?? 1;
        $data['cacat_fisik'] = $data['cacat_fisik'] ?? 0;
        $data['nip'] = $data['nip'] ?? '';
        $data['kd_prop'] = $data['kd_prop'] ?? 1;

        Patient::create($data);

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
            'kelurahanpj' => 'required|string|max:60',
            'kecamatanpj' => 'required|string|max:60',
            'kabupatenpj' => 'required|string|max:60',
            'propinsipj' => 'required|string|max:30',
            'email' => 'nullable|email|max:50',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $validator->validated();
        
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
}
