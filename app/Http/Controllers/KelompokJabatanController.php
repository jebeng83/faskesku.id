<?php

namespace App\Http\Controllers;

use App\Models\KelompokJabatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelompokJabatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = KelompokJabatan::query();

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kode_kelompok', 'like', "%{$search}%")
                  ->orWhere('nama_kelompok', 'like', "%{$search}%");
            });
        }

        $kelompokJabatan = $query->orderBy('kode_kelompok')
                                ->paginate(10)
                                ->withQueryString();

        return Inertia::render('Kepegawian/KelompokJabatan/Index', [
            'kelompokJabatan' => $kelompokJabatan,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'kode_kelompok' => 'required|string|max:3|unique:kelompok_jabatan,kode_kelompok',
            'nama_kelompok' => 'required|string|max:100',
            'indek' => 'required|integer'
        ]);

        KelompokJabatan::create([
            'kode_kelompok' => $request->kode_kelompok,
            'nama_kelompok' => $request->nama_kelompok,
            'indek' => $request->indek
        ]);

        return redirect()->route('kelompok-jabatan.index')
                        ->with('success', 'Kelompok Jabatan berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $kode_kelompok)
    {
        $kelompokJabatan = KelompokJabatan::findOrFail($kode_kelompok);

        $request->validate([
            'kode_kelompok' => 'required|string|max:3|unique:kelompok_jabatan,kode_kelompok,' . $kode_kelompok . ',kode_kelompok',
            'nama_kelompok' => 'required|string|max:100',
            'indek' => 'required|integer'
        ]);

        $kelompokJabatan->update([
            'kode_kelompok' => $request->kode_kelompok,
            'nama_kelompok' => $request->nama_kelompok,
            'indek' => $request->indek
        ]);

        return redirect()->route('kelompok-jabatan.index')
                        ->with('success', 'Kelompok Jabatan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($kode_kelompok)
    {
        $kelompokJabatan = KelompokJabatan::findOrFail($kode_kelompok);
        $kelompokJabatan->delete();

        return redirect()->route('kelompok-jabatan.index')
                        ->with('success', 'Kelompok Jabatan berhasil dihapus.');
    }
}