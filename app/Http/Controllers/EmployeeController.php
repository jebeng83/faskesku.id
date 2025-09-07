<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Employee::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                    ->orWhere('nik', 'like', "%{$search}%")
                    ->orWhere('jbtn', 'like', "%{$search}%")
                    ->orWhere('departemen', 'like', "%{$search}%");
            });
        }

        // Pagination
        $employees = $query->orderBy('nik', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Employees/Index', [
            'employees' => $employees,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Employees/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nik' => 'required|string|max:20|unique:pegawai,nik',
            'no_ktp' => 'required|string|max:16|min:16|unique:pegawai,no_ktp',
            'nama' => 'required|string|max:50',
            'jk' => 'required|in:Pria,Wanita',
            'tmp_lahir' => 'required|string|max:50',
            'tgl_lahir' => 'required|date',
            'alamat' => 'required|string|max:200',
        ], [
            'nik.required' => 'Nomor Induk Pegawai harus diisi',
            'nik.max' => 'Nomor Induk Pegawai maksimal 20 karakter',
            'nik.unique' => 'Nomor Induk Pegawai sudah ada',
            'no_ktp.required' => 'Nomor KTP harus diisi',
            'no_ktp.min' => 'Nomor KTP harus 16 digit',
            'no_ktp.max' => 'Nomor KTP maksimal 16 digit',
            'no_ktp.unique' => 'Nomor KTP sudah ada',
            'nama.required' => 'Nama harus diisi',
            'nama.max' => 'Nama maksimal 50 karakter',
            'jk.required' => 'Jenis Kelamin harus diisi',
            'jk.in' => 'Jenis Kelamin harus Pria atau Wanita',
            'tmp_lahir.required' => 'Tempat Lahir harus diisi',
            'tmp_lahir.max' => 'Tempat Lahir maksimal 50 karakter',
            'tgl_lahir.required' => 'Tanggal Lahir harus diisi',
            'tgl_lahir.date' => 'Tanggal Lahir harus berupa tanggal',
            'alamat.required' => 'Alamat harus diisi',
            'alamat.max' => 'Alamat maksimal 200 karakter',
        ]);

        // if ($validator->fails()) {
        //     return back()->withErrors($validator)->withInput();
        // }

        $data = $validator->validated();

        // Set default values untuk field yang tidak ada di form
        $data['jbtn'] = '-';
        $data['jnj_jabatan'] = '-';
        $data['kode_kelompok'] = '-';
        $data['kode_resiko'] = '-';
        $data['kode_emergency'] = '-';
        $data['departemen'] = '-';
        $data['bidang'] = '-';
        $data['stts_wp'] = '-';
        $data['stts_kerja'] = '-';
        $data['npwp'] = '';
        $data['pendidikan'] = '-';
        $data['gapok'] = '0';
        $data['kota'] = '';
        $data['mulai_kerja'] = now()->format('Y-m-d');
        $data['indexins'] = '-';
        $data['bpd'] = 'BPD';
        $data['rekening'] = '';
        $data['stts_aktif'] = 'AKTIF';
        $data['wajibmasuk'] = '0';
        $data['pengurang'] = '0';
        $data['indek'] = '0';
        $data['mulai_kontrak'] = now()->format('Y-m-d');
        $data['cuti_diambil'] = '0';
        $data['dankes'] = '0';
        $data['photo'] = '';

        Employee::create($data);

        return redirect()->route('employees.index')
            ->with('success', 'Data pegawai berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        return Inertia::render('Employees/Show', [
            'employee' => $employee,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        return Inertia::render('Employees/Edit', [
            'employee' => $employee,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $validator = Validator::make($request->all(), [
            'nip' => 'required|string|max:20|unique:employees,nip,' . $employee->id,
            'nama_lengkap' => 'required|string|max:100',
            'nama_panggilan' => 'nullable|string|max:50',
            'jenis_kelamin' => 'required|in:L,P',
            'tempat_lahir' => 'required|string|max:50',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string|max:200',
            'no_telepon' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100|unique:employees,email,' . $employee->id,
            'jabatan' => 'required|string|max:100',
            'departemen' => 'required|string|max:100',
            'status_karyawan' => 'required|in:TETAP,KONTRAK,MAGANG,HONORER',
            'tanggal_masuk' => 'required|date',
            'tanggal_keluar' => 'nullable|date|after:tanggal_masuk',
            'status_aktif' => 'required|in:AKTIF,NONAKTIF,CUTI,RESIGN',
            'pendidikan_terakhir' => 'required|string|max:50',
            'universitas' => 'nullable|string|max:100',
            'no_rekening' => 'nullable|string|max:30',
            'bank' => 'nullable|string|max:50',
            'nama_rekening' => 'nullable|string|max:100',
            'foto' => 'nullable|string|max:255',
            'catatan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $employee->update($validator->validated());

        return redirect()->route('employees.index')
            ->with('success', 'Data pegawai berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        // dd($employee);
        $employee->delete();

        return redirect()->route('employees.index')
            ->with('success', 'Data pegawai berhasil dihapus.');
    }
}
