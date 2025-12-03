<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RawatInapController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('RawatInap/Index', [
            'title' => 'Data Rawat Inap',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('RawatInap/Create', [
            'title' => 'Tambah Data Rawat Inap',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Implementation for storing rawat inap data
        return redirect()->route('rawat-inap.index')
            ->with('success', 'Data rawat inap berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('RawatInap/Show', [
            'title' => 'Detail Rawat Inap',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('RawatInap/Edit', [
            'title' => 'Edit Data Rawat Inap',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Implementation for updating rawat inap data
        return redirect()->route('rawat-inap.index')
            ->with('success', 'Data rawat inap berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Implementation for deleting rawat inap data
        return redirect()->route('rawat-inap.index')
            ->with('success', 'Data rawat inap berhasil dihapus.');
    }
}
