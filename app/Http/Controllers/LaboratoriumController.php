<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LaboratoriumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Laboratorium/Index', [
            'title' => 'Data Laboratorium'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Laboratorium/Create', [
            'title' => 'Tambah Data Laboratorium'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Implementation for storing laboratorium data
        return redirect()->route('laboratorium.index')
            ->with('success', 'Data laboratorium berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('Laboratorium/Show', [
            'title' => 'Detail Laboratorium'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Laboratorium/Edit', [
            'title' => 'Edit Data Laboratorium'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Implementation for updating laboratorium data
        return redirect()->route('laboratorium.index')
            ->with('success', 'Data laboratorium berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Implementation for deleting laboratorium data
        return redirect()->route('laboratorium.index')
            ->with('success', 'Data laboratorium berhasil dihapus.');
    }
}