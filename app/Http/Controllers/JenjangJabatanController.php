<?php

namespace App\Http\Controllers;

use App\Models\JenjangJabatan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class JenjangJabatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = JenjangJabatan::query();

        // Filter berdasarkan pencarian
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kode', 'like', "%{$search}%")
                  ->orWhere('nama', 'like', "%{$search}%");
            });
        }

        // Filter berdasarkan status
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        // Pagination
        $perPage = $request->get('per_page', 10);
        $jenjangJabatan = $query->orderBy('kode', 'asc')->paginate($perPage);

        return Inertia::render('Kepegawian/JenjangJabatan/Index', [
            'jenjangJabatan' => $jenjangJabatan,
            'filters' => $request->only(['search', 'status', 'per_page'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kode' => 'required|string|max:5|unique:jnj_jabatan,kode',
            'nama' => 'required|string|max:50',
            'tnj' => 'nullable|numeric|min:0',
            'indek' => 'nullable|integer|min:0',
            'gapok1' => 'nullable|numeric|min:0',
            'gapok2' => 'nullable|numeric|min:0',
            'gapok3' => 'nullable|numeric|min:0',
            'gapok4' => 'nullable|numeric|min:0',
            'gapok5' => 'nullable|numeric|min:0',
            'gapok6' => 'nullable|numeric|min:0',
            'gapok7' => 'nullable|numeric|min:0',
            'gapok8' => 'nullable|numeric|min:0',
            'gapok9' => 'nullable|numeric|min:0',
            'gapok10' => 'nullable|numeric|min:0',
            'gapok11' => 'nullable|numeric|min:0',
            'gapok12' => 'nullable|numeric|min:0',
            'gapok13' => 'nullable|numeric|min:0',
            'gapok14' => 'nullable|numeric|min:0',
            'gapok15' => 'nullable|numeric|min:0',
            'gapok16' => 'nullable|numeric|min:0',
            'gapok17' => 'nullable|numeric|min:0',
            'status' => 'required|in:1,0'
        ], [
            'kode.required' => 'Kode jenjang jabatan harus diisi',
            'kode.unique' => 'Kode jenjang jabatan sudah digunakan',
            'kode.max' => 'Kode jenjang jabatan maksimal 5 karakter',
            'nama.required' => 'Nama jenjang jabatan harus diisi',
            'nama.max' => 'Nama jenjang jabatan maksimal 50 karakter',
            'tnj.numeric' => 'Tunjangan harus berupa angka',
            'indek.integer' => 'Indeks harus berupa angka bulat',
            'status.required' => 'Status harus dipilih',
            'status.in' => 'Status harus Aktif atau Nonaktif'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            JenjangJabatan::create($request->all());

            return redirect()->route('jenjang-jabatan.index')
                ->with('success', 'Jenjang jabatan berhasil ditambahkan');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menambahkan jenjang jabatan: ' . $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $kode)
    {
        $jenjangJabatan = JenjangJabatan::findOrFail($kode);

        $validator = Validator::make($request->all(), [
            'kode' => 'required|string|max:5|unique:jnj_jabatan,kode,' . $kode . ',kode',
            'nama' => 'required|string|max:50',
            'tnj' => 'nullable|numeric|min:0',
            'indek' => 'nullable|integer|min:0',
            'gapok1' => 'nullable|numeric|min:0',
            'gapok2' => 'nullable|numeric|min:0',
            'gapok3' => 'nullable|numeric|min:0',
            'gapok4' => 'nullable|numeric|min:0',
            'gapok5' => 'nullable|numeric|min:0',
            'gapok6' => 'nullable|numeric|min:0',
            'gapok7' => 'nullable|numeric|min:0',
            'gapok8' => 'nullable|numeric|min:0',
            'gapok9' => 'nullable|numeric|min:0',
            'gapok10' => 'nullable|numeric|min:0',
            'gapok11' => 'nullable|numeric|min:0',
            'gapok12' => 'nullable|numeric|min:0',
            'gapok13' => 'nullable|numeric|min:0',
            'gapok14' => 'nullable|numeric|min:0',
            'gapok15' => 'nullable|numeric|min:0',
            'gapok16' => 'nullable|numeric|min:0',
            'gapok17' => 'nullable|numeric|min:0',
            'status' => 'required|in:1,0'
        ], [
            'kode.required' => 'Kode jenjang jabatan harus diisi',
            'kode.unique' => 'Kode jenjang jabatan sudah digunakan',
            'kode.max' => 'Kode jenjang jabatan maksimal 5 karakter',
            'nama.required' => 'Nama jenjang jabatan harus diisi',
            'nama.max' => 'Nama jenjang jabatan maksimal 50 karakter',
            'tnj.numeric' => 'Tunjangan harus berupa angka',
            'indek.integer' => 'Indeks harus berupa angka bulat',
            'status.required' => 'Status harus dipilih',
            'status.in' => 'Status harus Aktif atau Nonaktif'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            $jenjangJabatan->update($request->all());

            return redirect()->route('jenjang-jabatan.index')
                ->with('success', 'Jenjang jabatan berhasil diperbarui');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal memperbarui jenjang jabatan: ' . $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($kode)
    {
        try {
            $jenjangJabatan = JenjangJabatan::findOrFail($kode);
            
            // Cek apakah jenjang jabatan masih digunakan oleh pegawai
            if ($jenjangJabatan->pegawai()->count() > 0) {
                return back()->withErrors(['error' => 'Jenjang jabatan tidak dapat dihapus karena masih digunakan oleh pegawai']);
            }

            $jenjangJabatan->delete();

            return redirect()->route('jenjang-jabatan.index')
                ->with('success', 'Jenjang jabatan berhasil dihapus');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menghapus jenjang jabatan: ' . $e->getMessage()]);
        }
    }

    /**
     * Get jenjang jabatan for API
     */
    public function api(Request $request)
    {
        $query = JenjangJabatan::query();

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kode', 'like', "%{$search}%")
                  ->orWhere('nama', 'like', "%{$search}%");
            });
        }

        $jenjangJabatan = $query->orderBy('kode', 'asc')->get();

        return response()->json($jenjangJabatan);
    }
}