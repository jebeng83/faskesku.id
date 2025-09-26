<?php

namespace App\Http\Controllers;

use App\Models\Bank;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BankController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $perPage = $request->get('per_page', 10);

        $query = Bank::query();

        if ($search) {
            $query->where('namabank', 'like', '%' . $search . '%');
        }

        $bank = $query->paginate($perPage)->withQueryString();

        return Inertia::render('Kepegawian/Bank/index', [
            'bank' => $bank,
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Kepegawian/Bank/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'namabank' => 'required|string|max:50|unique:bank,namabank',
        ], [
            'namabank.required' => 'Nama bank wajib diisi.',
            'namabank.string' => 'Nama bank harus berupa teks.',
            'namabank.max' => 'Nama bank maksimal 50 karakter.',
            'namabank.unique' => 'Nama bank sudah ada.',
        ]);

        try {
            Bank::create($validated);

            return redirect()->route('bank.index')->with('success', 'Data bank berhasil ditambahkan.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menambahkan data bank: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Bank $bank)
    {
        return Inertia::render('Kepegawian/Bank/show', [
            'bank' => $bank,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bank $bank)
    {
        return Inertia::render('Kepegawian/Bank/edit', [
            'bank' => $bank,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bank $bank)
    {
        $validated = $request->validate([
            'namabank' => 'required|string|max:50|unique:bank,namabank,' . $bank->id,
        ], [
            'namabank.required' => 'Nama bank wajib diisi.',
            'namabank.string' => 'Nama bank harus berupa teks.',
            'namabank.max' => 'Nama bank maksimal 50 karakter.',
            'namabank.unique' => 'Nama bank sudah ada.',
        ]);

        try {
            $bank->update($validated);

            return redirect()->route('bank.index')->with('success', 'Data bank berhasil diperbarui.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal memperbarui data bank: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bank $bank)
    {
        try {
            $bank->delete();

            return redirect()->route('bank.index')->with('success', 'Data bank berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus data bank: ' . $e->getMessage());
        }
    }
}