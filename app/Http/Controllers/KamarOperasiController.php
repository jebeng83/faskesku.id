<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class KamarOperasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('KamarOperasi/Index', [
            'title' => 'Data Kamar Operasi'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('KamarOperasi/Create', [
            'title' => 'Tambah Data Kamar Operasi'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Implementation for storing kamar operasi data
        return redirect()->route('kamar-operasi.index')
            ->with('success', 'Data kamar operasi berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('KamarOperasi/Show', [
            'title' => 'Detail Kamar Operasi'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('KamarOperasi/Edit', [
            'title' => 'Edit Data Kamar Operasi'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Implementation for updating kamar operasi data
        return redirect()->route('kamar-operasi.index')
            ->with('success', 'Data kamar operasi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Implementation for deleting kamar operasi data
        return redirect()->route('kamar-operasi.index')
            ->with('success', 'Data kamar operasi berhasil dihapus.');
    }
}