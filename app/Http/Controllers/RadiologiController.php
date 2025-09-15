<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RadiologiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Radiologi/Index', [
            'title' => 'Data Radiologi'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Radiologi/Create', [
            'title' => 'Tambah Data Radiologi'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Implementation for storing radiologi data
        return redirect()->route('radiologi.index')
            ->with('success', 'Data radiologi berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('Radiologi/Show', [
            'title' => 'Detail Radiologi'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Radiologi/Edit', [
            'title' => 'Edit Data Radiologi'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Implementation for updating radiologi data
        return redirect()->route('radiologi.index')
            ->with('success', 'Data radiologi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Implementation for deleting radiologi data
        return redirect()->route('radiologi.index')
            ->with('success', 'Data radiologi berhasil dihapus.');
    }
}