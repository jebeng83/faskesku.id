<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RehabilitasiMedikController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('RehabilitasiMedik/Index', [
            'title' => 'Data Rehabilitasi Medik',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('RehabilitasiMedik/Create', [
            'title' => 'Tambah Data Rehabilitasi Medik',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Implementation for storing rehabilitasi medik data
        return redirect()->route('rehabilitasi-medik.index')
            ->with('success', 'Data rehabilitasi medik berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('RehabilitasiMedik/Show', [
            'title' => 'Detail Rehabilitasi Medik',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('RehabilitasiMedik/Edit', [
            'title' => 'Edit Data Rehabilitasi Medik',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Implementation for updating rehabilitasi medik data
        return redirect()->route('rehabilitasi-medik.index')
            ->with('success', 'Data rehabilitasi medik berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Implementation for deleting rehabilitasi medik data
        return redirect()->route('rehabilitasi-medik.index')
            ->with('success', 'Data rehabilitasi medik berhasil dihapus.');
    }
}
