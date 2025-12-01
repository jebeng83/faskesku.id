<?php

namespace App\Http\Controllers\Kepegawaian;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Kepegawaian\SipPegawai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SipPegawaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = SipPegawai::with('employee');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('no_sip', 'like', "%{$search}%")
                    ->orWhere('nik', 'like', "%{$search}%")
                    ->orWhereHas('employee', function ($empQuery) use ($search) {
                        $empQuery->where('nama', 'like', "%{$search}%");
                    });
            });
        }

        // Pagination
        $sipPegawai = $query->orderBy('masa_berlaku', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Employees/sip_pegawai', [
            'sipPegawai' => $sipPegawai,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Load reference data
        $employees = Employee::select('nik', 'nama', 'jbtn', 'jnj_jabatan')
            ->orderBy('nama')
            ->get();

        $jnjJabatan = DB::table('jnj_jabatan')
            ->select('kode', 'nama')
            ->orderBy('kode')
            ->get();

        return Inertia::render('Employees/sip_pegawai', [
            'mode' => 'create',
            'refs' => [
                'employees' => $employees,
                'jnjJabatan' => $jnjJabatan,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nik' => 'required|string|max:20|exists:pegawai,nik',
            'jnj_jabatan' => 'required|string|max:10',
            'no_sip' => 'required|string|max:100',
            'masa_berlaku' => 'required|date',
            'status' => 'required|in:0,1',
        ], [
            'nik.required' => 'NIK Pegawai harus diisi',
            'nik.exists' => 'NIK Pegawai tidak ditemukan',
            'jnj_jabatan.required' => 'Jenjang Jabatan harus diisi',
            'no_sip.required' => 'Nomor SIP harus diisi',
            'masa_berlaku.required' => 'Masa Berlaku harus diisi',
            'masa_berlaku.date' => 'Masa Berlaku harus berupa tanggal',
            'status.required' => 'Status harus diisi',
            'status.in' => 'Status harus 0 atau 1',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $validator->validated();

        SipPegawai::create($data);

        return redirect()->route('sip-pegawai.index')
            ->with('success', 'Data SIP Pegawai berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $nik)
    {
        $sipPegawai = SipPegawai::where('nik', $nik)->with('employee')->firstOrFail();

        return Inertia::render('Employees/sip_pegawai', [
            'mode' => 'show',
            'sipPegawai' => $sipPegawai,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $nik)
    {
        $sipPegawai = SipPegawai::where('nik', $nik)->with('employee')->firstOrFail();

        // Load reference data
        $employees = Employee::select('nik', 'nama', 'jbtn', 'jnj_jabatan')
            ->orderBy('nama')
            ->get();

        $jnjJabatan = DB::table('jnj_jabatan')
            ->select('kode', 'nama')
            ->orderBy('kode')
            ->get();

        return Inertia::render('Employees/sip_pegawai', [
            'mode' => 'edit',
            'sipPegawai' => $sipPegawai,
            'refs' => [
                'employees' => $employees,
                'jnjJabatan' => $jnjJabatan,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $nik)
    {
        $sipPegawai = SipPegawai::where('nik', $nik)->firstOrFail();

        $validator = Validator::make($request->all(), [
            'nik' => 'required|string|max:20|exists:pegawai,nik',
            'jnj_jabatan' => 'required|string|max:10',
            'no_sip' => 'required|string|max:100',
            'masa_berlaku' => 'required|date',
            'status' => 'required|in:0,1',
        ], [
            'nik.required' => 'NIK Pegawai harus diisi',
            'nik.exists' => 'NIK Pegawai tidak ditemukan',
            'jnj_jabatan.required' => 'Jenjang Jabatan harus diisi',
            'no_sip.required' => 'Nomor SIP harus diisi',
            'masa_berlaku.required' => 'Masa Berlaku harus diisi',
            'masa_berlaku.date' => 'Masa Berlaku harus berupa tanggal',
            'status.required' => 'Status harus diisi',
            'status.in' => 'Status harus 0 atau 1',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $validator->validated();

        $sipPegawai->update($data);

        return redirect()->route('sip-pegawai.index')
            ->with('success', 'Data SIP Pegawai berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $nik)
    {
        $sipPegawai = SipPegawai::where('nik', $nik)->firstOrFail();
        $sipPegawai->delete();

        return redirect()->route('sip-pegawai.index')
            ->with('success', 'Data SIP Pegawai berhasil dihapus.');
    }
}
