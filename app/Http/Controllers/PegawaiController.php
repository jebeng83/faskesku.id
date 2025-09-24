<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use App\Models\JenjangJabatan;
use App\Models\KelompokJabatan;
use App\Models\ResikoKerja;
use App\Models\EmergencyIndex;
use App\Models\Departemen;
use App\Models\Bidang;
use App\Models\StatusWP;
use App\Models\StatusKerja;
use App\Models\Pendidikan;
use App\Models\Bank;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PegawaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $perPage = $request->get('per_page', 10);

        $pegawai = Pegawai::with([
            'jenjangJabatan',
            'kelompokJabatan',
            'resikoKerja',
            'emergencyIndex',
            'departemenRelation',
            'bidangRelation',
            'statusWP',
            'statusKerja',
            'pendidikanRelation',
            'bankRelation'
        ])
        ->when($search, function ($query, $search) {
            return $query->where(function ($q) use ($search) {
                $q->where('nik', 'like', "%{$search}%")
                  ->orWhere('nama', 'like', "%{$search}%")
                  ->orWhere('jbtn', 'like', "%{$search}%")
                  ->orWhere('alamat', 'like', "%{$search}%")
                  ->orWhere('kota', 'like', "%{$search}%");
            });
        })
        ->orderBy('nama')
        ->paginate($perPage);

        // Get related data for dropdowns
        $jenjangJabatan = JenjangJabatan::orderBy('nama')->get();
        $kelompokJabatan = KelompokJabatan::orderBy('nama_kelompok')->get();
        $resikoKerja = ResikoKerja::orderBy('nama_resiko')->get();
        $emergencyIndex = EmergencyIndex::orderBy('nama_emergency')->get();
        $departemen = Departemen::orderBy('nama')->get();
        $bidang = Bidang::orderBy('nama')->get();
        $statusWP = StatusWP::orderBy('stts')->get();
        $statusKerja = StatusKerja::orderBy('stts')->get();
        $pendidikan = Pendidikan::orderBy('tingkat')->get();
        $bank = Bank::orderBy('namabank')->get();

        return Inertia::render('Kepegawian/Pegawai/index', [
            'pegawai' => $pegawai,
            'filters' => $request->only(['search', 'per_page']),
            'jenjangJabatan' => $jenjangJabatan,
            'kelompokJabatan' => $kelompokJabatan,
            'resikoKerja' => $resikoKerja,
            'emergencyIndex' => $emergencyIndex,
            'departemen' => $departemen,
            'bidang' => $bidang,
            'statusWP' => $statusWP,
            'statusKerja' => $statusKerja,
            'pendidikan' => $pendidikan,
            'bank' => $bank,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nik' => 'required|string|max:20|unique:pegawai,nik',
            'nama' => 'required|string|max:50',
            'jk' => 'required|in:Pria,Wanita',
            'jbtn' => 'required|string|max:25',
            'jnj_jabatan' => 'required|string|max:5',
            'kode_kelompok' => 'required|string|max:3',
            'kode_resiko' => 'required|string|max:3',
            'kode_emergency' => 'required|string|max:3',
            'departemen' => 'required|string|max:25|exists:departemen,dep_id',
            'bidang' => 'required|string|max:15',
            'stts_wp' => 'required|string|max:5',
            'stts_kerja' => 'required|string|max:3',
            'npwp' => 'nullable|string|max:15',
            'pendidikan' => 'required|string|max:80',
            'gapok' => 'required|numeric|min:0',
            'tmp_lahir' => 'required|string|max:15',
            'tgl_lahir' => 'required|date',
            'alamat' => 'required|string|max:200',
            'kota' => 'required|string|max:20',
            'mulai_kerja' => 'required|date',
            'ms_kerja' => 'required|in:<1,PT,FT>',
            // indexins mengikuti departemen karena FK mengarah ke departemen.dep_id
            'indexins' => 'nullable|string|max:25',
            'bpd' => 'required|string|max:8',
            'rekening' => 'nullable|string|max:25',
            'stts_aktif' => 'required|in:AKTIF,NONAKTIF',
            'wajibmasuk' => 'required|integer|min:0',
            'pengurang' => 'required|numeric|min:0',
            'indek' => 'required|integer|min:0',
            'mulai_kontrak' => 'nullable|date',
            'cuti_diambil' => 'required|integer|min:0',
            'dankes' => 'required|numeric|min:0',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'no_ktp' => 'nullable|string|max:20',
            // tgl_masuk dihapus karena tidak ada di tabel
        ], [
            'nik.required' => 'NIK harus diisi',
            'nik.unique' => 'NIK sudah digunakan',
            'nik.max' => 'NIK maksimal 20 karakter',
            'nama.required' => 'Nama harus diisi',
            'nama.max' => 'Nama maksimal 50 karakter',
            'jk.required' => 'Jenis kelamin harus dipilih',
            'jk.in' => 'Jenis kelamin harus Pria atau Wanita',
            'jbtn.required' => 'Jabatan harus diisi',
            'jbtn.max' => 'Jabatan maksimal 25 karakter',
            'jnj_jabatan.required' => 'Jenjang jabatan harus dipilih',
            'kode_kelompok.required' => 'Kelompok jabatan harus dipilih',
            'kode_resiko.required' => 'Resiko kerja harus dipilih',
            'kode_emergency.required' => 'Emergency index harus dipilih',
            'departemen.required' => 'Departemen harus dipilih',
            'bidang.required' => 'Bidang harus dipilih',
            'stts_wp.required' => 'Status WP harus dipilih',
            'stts_kerja.required' => 'Status kerja harus dipilih',
            'pendidikan.required' => 'Pendidikan harus dipilih',
            'gapok.required' => 'Gaji pokok harus diisi',
            'gapok.numeric' => 'Gaji pokok harus berupa angka',
            'gapok.min' => 'Gaji pokok tidak boleh negatif',
            'tmp_lahir.required' => 'Tempat lahir harus diisi',
            'tgl_lahir.required' => 'Tanggal lahir harus diisi',
            'tgl_lahir.date' => 'Format tanggal lahir tidak valid',
            'alamat.required' => 'Alamat harus diisi',
            'kota.required' => 'Kota harus diisi',
            'mulai_kerja.required' => 'Tanggal mulai kerja harus diisi',
            'mulai_kerja.date' => 'Format tanggal mulai kerja tidak valid',
            'ms_kerja.required' => 'Masa kerja harus dipilih',
            'indexins.required' => 'Index harus diisi',
            'bpd.required' => 'Bank harus dipilih',
            'stts_aktif.required' => 'Status aktif harus dipilih',
            'wajibmasuk.required' => 'Wajib masuk harus diisi',
            'wajibmasuk.integer' => 'Wajib masuk harus berupa angka',
            'pengurang.required' => 'Pengurang harus diisi',
            'pengurang.numeric' => 'Pengurang harus berupa angka',
            'indek.required' => 'Indek harus diisi',
            'indek.integer' => 'Indek harus berupa angka',
            'cuti_diambil.required' => 'Cuti diambil harus diisi',
            'cuti_diambil.integer' => 'Cuti diambil harus berupa angka',
            'dankes.required' => 'Dankes harus diisi',
            'dankes.numeric' => 'Dankes harus berupa angka',
            'photo.image' => 'File harus berupa gambar',
            'photo.mimes' => 'Format gambar harus jpeg, png, atau jpg',
            'photo.max' => 'Ukuran gambar maksimal 2MB',
        ]);

        // Sinkronkan indexins dengan departemen untuk memenuhi FK (indexins -> departemen.dep_id)
        $validated['indexins'] = $validated['departemen'] ?? null;

        // Handle photo upload
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('pegawai-photos', 'public');
            $validated['photo'] = $photoPath;
        }

        Pegawai::create($validated);

        return redirect()->route('pegawai.index')->with('success', 'Data pegawai berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $nik)
    {
        $pegawai = Pegawai::with([
            'jenjangJabatan',
            'kelompokJabatan',
            'resikoKerja',
            'emergencyIndex',
            'departemenRelation',
            'bidangRelation',
            'statusWP',
            'statusKerja',
            'pendidikanRelation',
            'bankRelation',
            'user'
        ])->findOrFail($nik);

        return Inertia::render('Kepegawai/Pegawai/show', [
            'pegawai' => $pegawai
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $nik)
    {
        $pegawai = Pegawai::findOrFail($nik);

        $validated = $request->validate([
            'nik' => 'required|string|max:20|unique:pegawai,nik,' . $nik . ',nik',
            'nama' => 'required|string|max:50',
            'jk' => 'required|in:Pria,Wanita',
            'jbtn' => 'required|string|max:25',
            'jnj_jabatan' => 'required|string|max:5',
            'kode_kelompok' => 'required|string|max:3',
            'kode_resiko' => 'required|string|max:3',
            'kode_emergency' => 'required|string|max:3',
            'departemen' => 'required|string|max:25|exists:departemen,dep_id',
            'bidang' => 'required|string|max:15',
            'stts_wp' => 'required|string|max:5',
            'stts_kerja' => 'required|string|max:3',
            'npwp' => 'nullable|string|max:15',
            'pendidikan' => 'required|string|max:80',
            'gapok' => 'required|numeric|min:0',
            'tmp_lahir' => 'required|string|max:15',
            'tgl_lahir' => 'required|date',
            'alamat' => 'required|string|max:200',
            'kota' => 'required|string|max:20',
            'mulai_kerja' => 'required|date',
            'ms_kerja' => 'required|in:<1,PT,FT>',
            // indexins mengikuti departemen karena FK mengarah ke departemen.dep_id
            'indexins' => 'nullable|string|max:25',
            'bpd' => 'required|string|max:8',
            'rekening' => 'nullable|string|max:25',
            'stts_aktif' => 'required|in:AKTIF,NONAKTIF',
            'wajibmasuk' => 'required|integer|min:0',
            'pengurang' => 'required|numeric|min:0',
            'indek' => 'required|integer|min:0',
            'mulai_kontrak' => 'nullable|date',
            'cuti_diambil' => 'required|integer|min:0',
            'dankes' => 'required|numeric|min:0',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'no_ktp' => 'nullable|string|max:20',
            // tgl_masuk dihapus karena tidak ada di tabel
        ], [
            'nik.required' => 'NIK harus diisi',
            'nik.unique' => 'NIK sudah digunakan',
            'nik.max' => 'NIK maksimal 20 karakter',
            'nama.required' => 'Nama harus diisi',
            'nama.max' => 'Nama maksimal 50 karakter',
            'jk.required' => 'Jenis kelamin harus dipilih',
            'jk.in' => 'Jenis kelamin harus Pria atau Wanita',
            'jbtn.required' => 'Jabatan harus diisi',
            'jbtn.max' => 'Jabatan maksimal 25 karakter',
            'jnj_jabatan.required' => 'Jenjang jabatan harus dipilih',
            'kode_kelompok.required' => 'Kelompok jabatan harus dipilih',
            'kode_resiko.required' => 'Resiko kerja harus dipilih',
            'kode_emergency.required' => 'Emergency index harus dipilih',
            'departemen.required' => 'Departemen harus dipilih',
            'bidang.required' => 'Bidang harus dipilih',
            'stts_wp.required' => 'Status WP harus dipilih',
            'stts_kerja.required' => 'Status kerja harus dipilih',
            'pendidikan.required' => 'Pendidikan harus dipilih',
            'gapok.required' => 'Gaji pokok harus diisi',
            'gapok.numeric' => 'Gaji pokok harus berupa angka',
            'gapok.min' => 'Gaji pokok tidak boleh negatif',
            'tmp_lahir.required' => 'Tempat lahir harus diisi',
            'tgl_lahir.required' => 'Tanggal lahir harus diisi',
            'tgl_lahir.date' => 'Format tanggal lahir tidak valid',
            'alamat.required' => 'Alamat harus diisi',
            'kota.required' => 'Kota harus diisi',
            'mulai_kerja.required' => 'Tanggal mulai kerja harus diisi',
            'mulai_kerja.date' => 'Format tanggal mulai kerja tidak valid',
            'ms_kerja.required' => 'Masa kerja harus dipilih',
            'indexins.required' => 'Index harus diisi',
            'bpd.required' => 'Bank harus dipilih',
            'stts_aktif.required' => 'Status aktif harus dipilih',
            'wajibmasuk.required' => 'Wajib masuk harus diisi',
            'wajibmasuk.integer' => 'Wajib masuk harus berupa angka',
            'pengurang.required' => 'Pengurang harus diisi',
            'pengurang.numeric' => 'Pengurang harus berupa angka',
            'indek.required' => 'Indek harus diisi',
            'indek.integer' => 'Indek harus berupa angka',
            'cuti_diambil.required' => 'Cuti diambil harus diisi',
            'cuti_diambil.integer' => 'Cuti diambil harus berupa angka',
            'dankes.required' => 'Dankes harus diisi',
            'dankes.numeric' => 'Dankes harus berupa angka',
            'photo.image' => 'File harus berupa gambar',
            'photo.mimes' => 'Format gambar harus jpeg, png, atau jpg',
            'photo.max' => 'Ukuran gambar maksimal 2MB',
        ]);

        // Sinkronkan indexins dengan departemen untuk memenuhi FK (indexins -> departemen.dep_id)
        $validated['indexins'] = $validated['departemen'] ?? null;

        // Handle photo upload
        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($pegawai->photo && Storage::disk('public')->exists($pegawai->photo)) {
                Storage::disk('public')->delete($pegawai->photo);
            }
            
            $photoPath = $request->file('photo')->store('pegawai-photos', 'public');
            $validated['photo'] = $photoPath;
        }

        $pegawai->update($validated);

        return redirect()->route('pegawai.index')->with('success', 'Data pegawai berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $nik)
    {
        $pegawai = Pegawai::findOrFail($nik);

        // Delete photo if exists
        if ($pegawai->photo && Storage::disk('public')->exists($pegawai->photo)) {
            Storage::disk('public')->delete($pegawai->photo);
        }

        $pegawai->delete();

        return redirect()->route('pegawai.index')->with('success', 'Data pegawai berhasil dihapus');
    }
}