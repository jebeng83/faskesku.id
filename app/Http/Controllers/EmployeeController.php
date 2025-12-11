<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

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
        // Load reference data for searchable selects
        $jnjJabatan = DB::table('jnj_jabatan')->select('kode', 'nama')->orderBy('kode')->get();
        $kelompokJabatan = DB::table('kelompok_jabatan')->select('kode_kelompok', 'nama_kelompok')->orderBy('kode_kelompok')->get();
        $resikoKerja = DB::table('resiko_kerja')->select('kode_resiko', 'nama_resiko')->orderBy('kode_resiko')->get();
        $departemen = DB::table('departemen')->select('dep_id', 'nama')->orderBy('dep_id')->get();
        $bidang = DB::table('bidang')->select('nama')->orderBy('nama')->get();
        $sttsWp = DB::table('stts_wp')->select('stts', 'ktg')->orderBy('stts')->get();
        $sttsKerja = DB::table('stts_kerja')->select('stts', 'ktg')->orderBy('stts')->get();
        $pendidikan = DB::table('pendidikan')->select('tingkat')->orderBy('tingkat')->get();
        $bank = DB::table('bank')->select('namabank')->orderBy('namabank')->get();
        // Determine the correct display column for emergency_index table dynamically
        $emergencyNameColumn = DB::table('information_schema.columns')
            ->whereRaw('table_schema = DATABASE()')
            ->where('table_name', 'emergency_index')
            ->whereIn('column_name', ['emergency', 'nama_emergency', 'nama', 'name', 'deskripsi', 'keterangan'])
            ->orderByRaw("FIELD(column_name, 'emergency','nama_emergency','nama','name','deskripsi','keterangan')")
            ->value('column_name');

        if ($emergencyNameColumn) {
            $emergencyIndex = DB::table('emergency_index')
                ->select('kode_emergency', DB::raw("$emergencyNameColumn AS emergency"))
                ->orderBy('kode_emergency')
                ->get();
        } else {
            // Fallback: provide hyphen as label if no suitable column exists
            $emergencyIndex = DB::table('emergency_index')
                ->select('kode_emergency', DB::raw("'-' AS emergency"))
                ->orderBy('kode_emergency')
                ->get();
        }

        return Inertia::render('Employees/Create', [
            'refs' => [
                'jnjJabatan' => $jnjJabatan,
                'kelompokJabatan' => $kelompokJabatan,
                'resikoKerja' => $resikoKerja,
                'departemen' => $departemen,
                'bidang' => $bidang,
                'sttsWp' => $sttsWp,
                'sttsKerja' => $sttsKerja,
                'pendidikan' => $pendidikan,
                'bank' => $bank,
                'emergencyIndex' => $emergencyIndex,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            // Data utama pegawai
            'nik' => 'required|string|max:20|unique:pegawai,nik',
            'no_ktp' => 'required|string|min:16|max:20|unique:pegawai,no_ktp',
            'nama' => 'required|string|max:50',
            'jk' => 'required|in:Pria,Wanita',
            'tmp_lahir' => 'required|string|max:20',
            'tgl_lahir' => 'required|date',
            'alamat' => 'required|string|max:60',
            // Foto (opsional)
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',

            // Informasi kepegawaian (opsional)
            'jbtn' => 'nullable|string|max:25',
            'jnj_jabatan' => 'nullable|string|max:5',
            'kode_kelompok' => 'nullable|string|max:3',
            'kode_resiko' => 'nullable|string|max:3',
            'kode_emergency' => 'nullable|string|max:3',
            'departemen' => 'nullable|string|max:4',
            'bidang' => 'nullable|string|max:15',
            'stts_wp' => 'nullable|string|max:5',
            'stts_kerja' => 'nullable|string|max:3',
            'pendidikan' => 'nullable|string|max:80',
            'kota' => 'nullable|string|max:20',
            'mulai_kerja' => 'nullable|date',
            'stts_aktif' => 'nullable|in:AKTIF,CUTI,KELUAR,TENAGA LUAR,NON AKTIF',

            // Informasi finansial (opsional)
            'npwp' => 'nullable|string|max:15',
            'gapok' => 'nullable|numeric',
            'bpd' => 'nullable|string|max:50',
            'rekening' => 'nullable|string|max:25',
            'indexins' => 'nullable|string|max:4',
        ], [
            'nik.required' => 'Nomor Induk Pegawai harus diisi',
            'nik.max' => 'Nomor Induk Pegawai maksimal 20 karakter',
            'nik.unique' => 'Nomor Induk Pegawai sudah ada',
            'no_ktp.required' => 'Nomor KTP harus diisi',
            'no_ktp.min' => 'Nomor KTP harus 16 digit',
            'no_ktp.max' => 'Nomor KTP maksimal 20 digit',
            'no_ktp.unique' => 'Nomor KTP sudah ada',
            'nama.required' => 'Nama harus diisi',
            'nama.max' => 'Nama maksimal 50 karakter',
            'jk.required' => 'Jenis Kelamin harus diisi',
            'jk.in' => 'Jenis Kelamin harus Pria atau Wanita',
            'tmp_lahir.required' => 'Tempat Lahir harus diisi',
            'tmp_lahir.max' => 'Tempat Lahir maksimal 20 karakter',
            'tgl_lahir.required' => 'Tanggal Lahir harus diisi',
            'tgl_lahir.date' => 'Tanggal Lahir harus berupa tanggal',
            'alamat.required' => 'Alamat harus diisi',
            'alamat.max' => 'Alamat maksimal 60 karakter',
        ]);

        // if ($validator->fails()) {
        //     return back()->withErrors($validator)->withInput();
        // }

        $data = $validator->validated();

        // Set default values untuk field yang tidak ada di form
        $data['jbtn'] = $data['jbtn'] ?? '-';
        $data['jnj_jabatan'] = $data['jnj_jabatan'] ?? '-';
        $data['kode_kelompok'] = $data['kode_kelompok'] ?? '-';
        $data['kode_resiko'] = $data['kode_resiko'] ?? '-';
        $data['kode_emergency'] = $data['kode_emergency'] ?? '-';
        $data['departemen'] = $data['departemen'] ?? '-';
        $data['bidang'] = $data['bidang'] ?? '-';
        $data['stts_wp'] = $data['stts_wp'] ?? '-';
        $data['stts_kerja'] = $data['stts_kerja'] ?? '-';
        $data['npwp'] = $data['npwp'] ?? '';
        $data['pendidikan'] = $data['pendidikan'] ?? '-';
        $data['gapok'] = $data['gapok'] ?? '0';
        $data['kota'] = $data['kota'] ?? '';
        $data['mulai_kerja'] = $data['mulai_kerja'] ?? now()->format('Y-m-d');
        $data['indexins'] = $data['indexins'] ?? '-';
        $data['bpd'] = $data['bpd'] ?? 'BPD';
        $data['rekening'] = $data['rekening'] ?? '';
        $data['stts_aktif'] = $data['stts_aktif'] ?? 'AKTIF';
        $data['wajibmasuk'] = '0';
        $data['pengurang'] = '0';
        $data['indek'] = '0';
        $data['mulai_kontrak'] = now()->format('Y-m-d');
        $data['cuti_diambil'] = '0';
        $data['dankes'] = '0';
        // Handle upload foto jika ada
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('pegawai', 'public');
            $data['photo'] = $path; // simpan path relatif ke storage/app/public
        } else {
            $data['photo'] = '';
        }

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
        // Load reference data for searchable selects
        $jnjJabatan = DB::table('jnj_jabatan')->select('kode', 'nama')->orderBy('kode')->get();
        $kelompokJabatan = DB::table('kelompok_jabatan')->select('kode_kelompok', 'nama_kelompok')->orderBy('kode_kelompok')->get();
        $resikoKerja = DB::table('resiko_kerja')->select('kode_resiko', 'nama_resiko')->orderBy('kode_resiko')->get();
        $departemen = DB::table('departemen')->select('dep_id', 'nama')->orderBy('dep_id')->get();
        $bidang = DB::table('bidang')->select('nama')->orderBy('nama')->get();
        $sttsWp = DB::table('stts_wp')->select('stts', 'ktg')->orderBy('stts')->get();
        $sttsKerja = DB::table('stts_kerja')->select('stts', 'ktg')->orderBy('stts')->get();
        $pendidikan = DB::table('pendidikan')->select('tingkat')->orderBy('tingkat')->get();
        $bank = DB::table('bank')->select('namabank')->orderBy('namabank')->get();
        // Determine the correct display column for emergency_index table dynamically
        $emergencyNameColumn = DB::table('information_schema.columns')
            ->whereRaw('table_schema = DATABASE()')
            ->where('table_name', 'emergency_index')
            ->whereIn('column_name', ['emergency', 'nama_emergency', 'nama', 'name', 'deskripsi', 'keterangan'])
            ->orderByRaw("FIELD(column_name, 'emergency','nama_emergency','nama','name','deskripsi','keterangan')")
            ->value('column_name');

        if ($emergencyNameColumn) {
            $emergencyIndex = DB::table('emergency_index')
                ->select('kode_emergency', DB::raw("$emergencyNameColumn AS emergency"))
                ->orderBy('kode_emergency')
                ->get();
        } else {
            // Fallback: provide hyphen as label if no suitable column exists
            $emergencyIndex = DB::table('emergency_index')
                ->select('kode_emergency', DB::raw("'-' AS emergency"))
                ->orderBy('kode_emergency')
                ->get();
        }

        return Inertia::render('Employees/Edit', [
            'employee' => $employee,
            'refs' => [
                'jnjJabatan' => $jnjJabatan,
                'kelompokJabatan' => $kelompokJabatan,
                'resikoKerja' => $resikoKerja,
                'departemen' => $departemen,
                'bidang' => $bidang,
                'sttsWp' => $sttsWp,
                'sttsKerja' => $sttsKerja,
                'pendidikan' => $pendidikan,
                'bank' => $bank,
                'emergencyIndex' => $emergencyIndex,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $validator = Validator::make($request->all(), [
            // Data utama pegawai
            'nik' => 'required|string|max:20|unique:pegawai,nik,'.$employee->id,
            'no_ktp' => 'required|string|min:16|max:20|unique:pegawai,no_ktp,'.$employee->id,
            'nama' => 'required|string|max:50',
            'jk' => 'required|in:Pria,Wanita',
            'tmp_lahir' => 'required|string|max:20',
            'tgl_lahir' => 'required|date',
            'alamat' => 'required|string|max:60',
            // Foto (opsional)
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',

            // Informasi kepegawaian (opsional)
            'jbtn' => 'nullable|string|max:25',
            'jnj_jabatan' => 'nullable|string|max:5',
            'kode_kelompok' => 'nullable|string|max:3',
            'kode_resiko' => 'nullable|string|max:3',
            'kode_emergency' => 'nullable|string|max:3',
            'departemen' => 'nullable|string|max:4',
            'bidang' => 'nullable|string|max:15',
            'stts_wp' => 'nullable|string|max:5',
            'stts_kerja' => 'nullable|string|max:3',
            'pendidikan' => 'nullable|string|max:80',
            'kota' => 'nullable|string|max:20',
            'mulai_kerja' => 'nullable|date',
            'stts_aktif' => 'nullable|in:AKTIF,CUTI,KELUAR,TENAGA LUAR,NON AKTIF',

            // Informasi finansial (opsional)
            'npwp' => 'nullable|string|max:15',
            'gapok' => 'nullable|numeric',
            'bpd' => 'nullable|string|max:50',
            'rekening' => 'nullable|string|max:25',
            'indexins' => 'nullable|string|max:4',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $validator->validated();

        // Upload foto baru jika dikirim
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('pegawai', 'public');
            $data['photo'] = $path;
        } else {
            // jika tidak ada foto baru, pertahankan yang lama
            $data['photo'] = $employee->photo ?? '';
        }

        $employee->update($data);

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
