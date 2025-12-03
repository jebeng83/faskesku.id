<?php

namespace App\Http\Controllers;

use App\Models\KategoriPerawatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class KategoriPerawatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = KategoriPerawatan::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kd_kategori', 'like', "%{$search}%")
                    ->orWhere('nm_kategori', 'like', "%{$search}%");
            });
        }

        // Pagination
        $kategoris = $query->orderBy('kd_kategori')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('KategoriPerawatan/Index', [
            'title' => 'Kategori Perawatan',
            'data' => $kategoris,
            'search' => $request->search,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('KategoriPerawatan/Create', [
            'title' => 'Tambah Kategori Perawatan',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kd_kategori' => 'required|string|max:5|unique:kategori_perawatan,kd_kategori',
            'nm_kategori' => 'required|string|max:30',
        ], [
            'kd_kategori.required' => 'Kode kategori harus diisi.',
            'kd_kategori.max' => 'Kode kategori maksimal 5 karakter.',
            'kd_kategori.unique' => 'Kode kategori sudah digunakan.',
            'nm_kategori.required' => 'Nama kategori harus diisi.',
            'nm_kategori.max' => 'Nama kategori maksimal 30 karakter.',
        ]);

        // Handle error validasi untuk popup (Inertia request)
        if ($validator->fails()) {
            // Untuk request dari Inertia (popup), return redirect back dengan errors
            if ($request->header('X-Inertia')) {
                return redirect()->back()
                    ->withErrors($validator)
                    ->withInput();
            }
            // Untuk request JSON biasa (non-Inertia)
            if ($request->expectsJson() || $request->wantsJson()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            return back()->withErrors($validator)->withInput();
        }

        try {
            $kategori = KategoriPerawatan::create([
                'kd_kategori' => $request->kd_kategori,
                'nm_kategori' => $request->nm_kategori,
            ]);

            // Return response untuk Inertia (popup)
            if ($request->header('X-Inertia')) {
                return redirect()->back()
                    ->with('success', 'Kategori Perawatan berhasil ditambahkan.')
                    ->with('kategoriPerawatanCreated', [
                        'kd_kategori' => $kategori->kd_kategori,
                        'nm_kategori' => $kategori->nm_kategori,
                    ]);
            }

            // Return response untuk JSON biasa
            if ($request->expectsJson() || $request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Kategori perawatan berhasil ditambahkan.',
                    'data' => $kategori,
                ], 201);
            }

            // Default redirect untuk form biasa
            return redirect()->route('kategori-perawatan.index')
                ->with('success', 'Kategori perawatan berhasil ditambahkan.');
        } catch (\Exception $e) {
            if ($request->header('X-Inertia')) {
                return redirect()->back()
                    ->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data.'])
                    ->withInput();
            }

            return back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data.'])
                ->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $kategori = KategoriPerawatan::findOrFail($id);

        return Inertia::render('KategoriPerawatan/Show', [
            'kategori' => $kategori,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $kategori = KategoriPerawatan::findOrFail($id);

        return Inertia::render('KategoriPerawatan/Edit', [
            'title' => 'Edit Kategori Perawatan',
            'kategori' => $kategori,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $kategori = KategoriPerawatan::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'kd_kategori' => 'required|string|max:5|unique:kategori_perawatan,kd_kategori,'.$id.',kd_kategori',
            'nm_kategori' => 'required|string|max:30',
        ], [
            'kd_kategori.required' => 'Kode kategori harus diisi.',
            'kd_kategori.max' => 'Kode kategori maksimal 5 karakter.',
            'kd_kategori.unique' => 'Kode kategori sudah digunakan.',
            'nm_kategori.required' => 'Nama kategori harus diisi.',
            'nm_kategori.max' => 'Nama kategori maksimal 30 karakter.',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            $kategori->update([
                'kd_kategori' => $request->kd_kategori,
                'nm_kategori' => $request->nm_kategori,
            ]);

            return redirect()->route('kategori-perawatan.index')
                ->with('success', 'Kategori perawatan berhasil diperbarui.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Terjadi kesalahan saat memperbarui data.'])
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $kategori = KategoriPerawatan::findOrFail($id);

            // Check if kategori is being used in jns_perawatan
            if ($kategori->jnsPerawatan()->exists() || $kategori->jnsPerawatanInap()->exists()) {
                return back()->withErrors(['error' => 'Kategori tidak dapat dihapus karena masih digunakan dalam jenis perawatan.']);
            }

            $kategori->delete();

            return redirect()->route('kategori-perawatan.index')
                ->with('success', 'Kategori perawatan berhasil dihapus.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Terjadi kesalahan saat menghapus data.']);
        }
    }

    /**
     * Generate auto code for kategori
     */
    public function generateKode()
    {
        try {
            // Get the last kategori code dengan format KPXXX
            // Urutkan berdasarkan angka setelah "KP" secara numerik, bukan string
            $lastKategori = KategoriPerawatan::where('kd_kategori', 'like', 'KP%')
                ->orderByRaw('CAST(SUBSTRING(kd_kategori, 3) AS UNSIGNED) DESC')
                ->first();

            if (! $lastKategori) {
                $newCode = 'KP001';
            } else {
                // Extract number from last code (format: KPXXX)
                $lastNumber = (int) substr($lastKategori->kd_kategori, 2);
                $newNumber = $lastNumber + 1;
                $newCode = 'KP'.str_pad($newNumber, 3, '0', STR_PAD_LEFT);
            }

            return response()->json([
                'success' => true,
                'kode' => $newCode,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal generate kode kategori',
            ], 500);
        }
    }
}
