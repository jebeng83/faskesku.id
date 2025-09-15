<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class IGDController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('IGD/Index', [
            'title' => 'Data IGD (Instalasi Gawat Darurat)'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('IGD/Create', [
            'title' => 'Tambah Data IGD'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Implementation for storing IGD data
        return redirect()->route('igd.index')
            ->with('success', 'Data IGD berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('IGD/Show', [
            'title' => 'Detail IGD'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('IGD/Edit', [
            'title' => 'Edit Data IGD'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Implementation for updating IGD data
        return redirect()->route('igd.index')
            ->with('success', 'Data IGD berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Implementation for deleting IGD data
        return redirect()->route('igd.index')
            ->with('success', 'Data IGD berhasil dihapus.');
    }
}