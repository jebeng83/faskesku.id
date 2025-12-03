<?php

namespace App\Http\Controllers;

use App\Models\Spesialis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SpesialisController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:view-spesialis')->only(['index', 'show']);
        $this->middleware('permission:create-spesialis')->only(['create', 'store']);
        $this->middleware('permission:edit-spesialis')->only(['edit', 'update']);
        $this->middleware('permission:delete-spesialis')->only(['destroy']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $spesialis = Spesialis::with(['dokter.pegawai'])->get();

        return Inertia::render('Spesialis/Index', [
            'spesialis' => $spesialis,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kd_sps' => 'required|string|max:5|unique:spesialis,kd_sps',
            'nm_sps' => 'required|string|max:50',
        ]);

        Spesialis::create($validated);

        return redirect()->back()->with('success', 'Spesialis berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show($kd_sps)
    {
        $spesialis = Spesialis::with(['dokter.pegawai'])->where('kd_sps', $kd_sps)->firstOrFail();

        return response()->json($spesialis);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $kd_sps)
    {
        $spesialis = Spesialis::where('kd_sps', $kd_sps)->firstOrFail();

        $validated = $request->validate([
            'nm_sps' => 'required|string|max:50',
        ]);

        $spesialis->update($validated);

        return redirect()->back()->with('success', 'Spesialis berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($kd_sps)
    {
        $spesialis = Spesialis::where('kd_sps', $kd_sps)->firstOrFail();

        // Check if spesialis has doctors
        if ($spesialis->dokter()->count() > 0) {
            return redirect()->back()->with('error', 'Tidak dapat menghapus spesialis yang masih memiliki dokter');
        }

        $spesialis->delete();

        return redirect()->back()->with('success', 'Spesialis berhasil dihapus');
    }
}
