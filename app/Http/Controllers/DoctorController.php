<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Employee;
use App\Models\Spesialis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DoctorController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:view-doctors')->only(['index', 'show']);
        $this->middleware('permission:create-doctors')->only(['create', 'store']);
        $this->middleware('permission:edit-doctors')->only(['edit', 'update']);
        $this->middleware('permission:delete-doctors')->only(['destroy']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $doctors = Doctor::with('pegawai')->get();

        // Get employees that are not yet registered as doctors
        $availableEmployees = Employee::whereNotIn('nik', function ($query) {
            $query->select('kd_dokter')->from('dokter');
        })->select('nik', 'nama', 'jk', 'tmp_lahir', 'tgl_lahir', 'alamat')
            ->get();

        // Get all spesialis for dropdown
        $spesialisList = Spesialis::select('kd_sps', 'nm_sps')->get();

        return Inertia::render('Doctor/Index', [
            'doctors' => $doctors,
            'availableEmployees' => $availableEmployees,
            'spesialisList' => $spesialisList
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kd_dokter' => 'required|string|max:20|unique:dokter,kd_dokter|exists:pegawai,nik',
            'nm_dokter' => 'required|string|max:50',
            'jk' => 'required|in:L,P',
            'tmp_lahir' => 'nullable|string|max:15',
            'tgl_lahir' => 'nullable|date',
            'gol_drh' => 'nullable|in:A,B,AB,O',
            'agama' => 'nullable|in:ISLAM,KRISTEN,KATOLIK,HINDU,BUDHA,KONGHUCU',
            'almt_tgl' => 'nullable|string|max:60',
            'no_telp' => 'nullable|string|max:13',
            'stts_nikah' => 'nullable|in:BELUM MENIKAH,MENIKAH,JANDA,DUDHA,JANDA MATI,DUDHA MATI',
            'kd_sps' => 'nullable|string|max:5',
            'alumni' => 'nullable|string|max:60',
            'no_ijn_praktek' => 'nullable|string|max:120',
            'status' => 'nullable|string|max:1|in:1,0',
        ]);

        Doctor::create($validated);

        return redirect()->back()->with('success', 'Doctor berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show($kd_dokter)
    {
        $doctor = Doctor::with('pegawai', 'regPeriksas')->where('kd_dokter', $kd_dokter)->firstOrFail();

        return response()->json($doctor);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $kd_dokter)
    {
        $doctor = Doctor::where('kd_dokter', $kd_dokter)->firstOrFail();

        $validated = $request->validate([
            'nm_dokter' => 'required|string|max:50',
            'jk' => 'required|in:L,P',
            'tmp_lahir' => 'nullable|string|max:15',
            'tgl_lahir' => 'nullable|date',
            'gol_drh' => 'nullable|in:A,B,AB,O',
            'agama' => 'nullable|in:ISLAM,KRISTEN,KATOLIK,HINDU,BUDHA,KONGHUCU',
            'almt_tgl' => 'nullable|string|max:60',
            'no_telp' => 'nullable|string|max:13',
            'stts_nikah' => 'nullable|in:BELUM MENIKAH,MENIKAH,JANDA,DUDHA,JANDA MATI,DUDHA MATI',
            'kd_sps' => 'nullable|string|max:5',
            'alumni' => 'nullable|string|max:60',
            'no_ijn_praktek' => 'nullable|string|max:120',
            'status' => 'nullable|string|max:1|in:1,0',
        ]);

        $doctor->update($validated);

        return redirect()->back()->with('success', 'Doctor berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($kd_dokter)
    {
        $doctor = Doctor::where('kd_dokter', $kd_dokter)->firstOrFail();
        $doctor->update(['status' => '0']);

        return redirect()->to(route('doctors.index'))->with('success', 'Doctor berhasil dihapus');
    }
}
