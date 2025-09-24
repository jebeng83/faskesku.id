<?php

namespace App\Http\Controllers;

use App\Models\ResikoKerja;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResikoKerjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ResikoKerja::query();

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kode_resiko', 'like', "%{$search}%")
                  ->orWhere('nama_resiko', 'like', "%{$search}%");
            });
        }

        $resikoKerja = $query->orderBy('kode_resiko')
                            ->paginate(10)
                            ->withQueryString();

        return Inertia::render('Kepegawian/ResikoKerja/Index', [
            'resikoKerja' => $resikoKerja,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'kode_resiko' => 'required|string|max:3|unique:resiko_kerja,kode_resiko',
            'nama_resiko' => 'required|string|max:100',
            'indek' => 'required|integer'
        ]);

        ResikoKerja::create([
            'kode_resiko' => $request->kode_resiko,
            'nama_resiko' => $request->nama_resiko,
            'indek' => $request->indek
        ]);

        return redirect()->route('resiko-kerja.index')
                        ->with('success', 'Resiko Kerja berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $kode_resiko)
    {
        $resikoKerja = ResikoKerja::findOrFail($kode_resiko);

        $request->validate([
            'kode_resiko' => 'required|string|max:3|unique:resiko_kerja,kode_resiko,' . $kode_resiko . ',kode_resiko',
            'nama_resiko' => 'required|string|max:100',
            'indek' => 'required|integer'
        ]);

        $resikoKerja->update([
            'kode_resiko' => $request->kode_resiko,
            'nama_resiko' => $request->nama_resiko,
            'indek' => $request->indek
        ]);

        return redirect()->route('resiko-kerja.index')
                        ->with('success', 'Resiko Kerja berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($kode_resiko)
    {
        $resikoKerja = ResikoKerja::findOrFail($kode_resiko);
        $resikoKerja->delete();

        return redirect()->route('resiko-kerja.index')
                        ->with('success', 'Resiko Kerja berhasil dihapus.');
    }
}