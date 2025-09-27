<?php

namespace App\Http\Controllers;

use App\Models\Bidang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BidangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $perPage = $request->get('per_page', 10);

        $bidang = Bidang::query()
            ->when($search, function ($query, $search) {
                return $query->where('nama', 'like', "%{$search}%");
            })
            ->orderBy('nama')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Kepegawian/Bidang/index', [
            'bidang' => $bidang,
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:15|unique:bidang,nama',
        ], [
            'nama.required' => 'Nama bidang harus diisi.',
            'nama.max' => 'Nama bidang maksimal 15 karakter.',
            'nama.unique' => 'Nama bidang sudah ada.',
        ]);

        Bidang::create([
            'nama' => $request->nama,
        ]);

        return redirect()->route('bidang.index')->with('success', 'Bidang berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bidang $bidang)
    {
        $request->validate([
            'nama' => 'required|string|max:15|unique:bidang,nama,' . $bidang->id,
        ], [
            'nama.required' => 'Nama bidang harus diisi.',
            'nama.max' => 'Nama bidang maksimal 15 karakter.',
            'nama.unique' => 'Nama bidang sudah ada.',
        ]);

        $bidang->update([
            'nama' => $request->nama,
        ]);

        return redirect()->route('bidang.index')->with('success', 'Bidang berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bidang $bidang)
    {
        try {
            $bidang->delete();
            return redirect()->route('bidang.index')->with('success', 'Bidang berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->route('bidang.index')->with('error', 'Bidang tidak dapat dihapus karena masih digunakan.');
        }
    }
}