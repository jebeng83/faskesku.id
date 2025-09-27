<?php

namespace App\Http\Controllers;

use App\Models\EmergencyIndex;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmergencyIndexController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = EmergencyIndex::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kode_emergency', 'like', "%{$search}%")
                  ->orWhere('nama_emergency', 'like', "%{$search}%");
            });
        }

        $emergencyIndexes = $query->orderBy('kode_emergency', 'asc')
                                 ->paginate(10)
                                 ->withQueryString();

        return Inertia::render('Kepegawian/EmegersiIndex/index', [
            'emergencyIndexes' => $emergencyIndexes,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'kode_emergency' => 'required|string|max:3|unique:emergency_index,kode_emergency',
            'nama_emergency' => 'required|string|max:100',
            'indek' => 'required|integer|min:0'
        ]);

        EmergencyIndex::create([
            'kode_emergency' => $request->kode_emergency,
            'nama_emergency' => $request->nama_emergency,
            'indek' => $request->indek
        ]);

        return redirect()->route('emergency-index.index')
                        ->with('success', 'Emergency Index berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $kode_emergency)
    {
        $emergencyIndex = EmergencyIndex::where('kode_emergency', $kode_emergency)->firstOrFail();

        $request->validate([
            'kode_emergency' => 'required|string|max:3|unique:emergency_index,kode_emergency,' . $kode_emergency . ',kode_emergency',
            'nama_emergency' => 'required|string|max:100',
            'indek' => 'required|integer|min:0'
        ]);

        $emergencyIndex->update([
            'kode_emergency' => $request->kode_emergency,
            'nama_emergency' => $request->nama_emergency,
            'indek' => $request->indek
        ]);

        return redirect()->route('emergency-index.index')
                        ->with('success', 'Emergency Index berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($kode_emergency)
    {
        $emergencyIndex = EmergencyIndex::where('kode_emergency', $kode_emergency)->firstOrFail();
        $emergencyIndex->delete();

        return redirect()->route('emergency-index.index')
                        ->with('success', 'Emergency Index berhasil dihapus.');
    }
}