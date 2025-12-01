<?php

namespace App\Http\Controllers\Kepegawaian;

use App\Http\Controllers\Controller;
use App\Models\Kepegawaian\KelompokJabatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class KelompokJabatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = KelompokJabatan::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kode_kelompok', 'like', "%{$search}%")
                    ->orWhere('nama_kelompok', 'like', "%{$search}%");
            });
        }

        // Pagination
        $kelompokJabatan = $query->orderBy('kode_kelompok')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Kepegawaian/KelompokJabatan/Index', [
            'kelompokJabatan' => $kelompokJabatan,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Kepegawaian/KelompokJabatan/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kode_kelompok' => 'required|string|max:3|unique:kelompok_jabatan,kode_kelompok',
            'nama_kelompok' => 'required|string|max:100',
            'indek' => 'nullable|integer',
        ], [
            'kode_kelompok.required' => 'Kode Kelompok harus diisi',
            'kode_kelompok.unique' => 'Kode Kelompok sudah digunakan',
            'kode_kelompok.max' => 'Kode Kelompok maksimal 3 karakter',
            'nama_kelompok.required' => 'Nama Kelompok harus diisi',
            'nama_kelompok.max' => 'Nama Kelompok maksimal 100 karakter',
            'indek.integer' => 'Indek harus berupa angka',
        ]);

        if ($validator->fails()) {
            // Untuk request dari Inertia, return redirect back dengan errors
            if ($request->header('X-Inertia')) {
                return redirect()->back()
                    ->withErrors($validator)
                    ->withInput();
            }
            // Untuk request JSON biasa (non-Inertia)
            if ($request->expectsJson() || $request->wantsJson()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $validator->validated();

        $kelompokJabatan = KelompokJabatan::create($data);

        // Untuk request dari Inertia, return redirect back dengan success message
        if ($request->header('X-Inertia')) {
            return redirect()->back()
                ->with('success', 'Data Kelompok Jabatan berhasil ditambahkan.')
                ->with('kelompokJabatanCreated', [
                    'kode_kelompok' => $kelompokJabatan->kode_kelompok,
                ]);
        }

        // Untuk request JSON biasa (non-Inertia)
        if ($request->expectsJson() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Data Kelompok Jabatan berhasil ditambahkan.',
                'data' => $kelompokJabatan,
            ], 201);
        }

        return redirect()->route('kelompok-jabatan.index')
            ->with('success', 'Data Kelompok Jabatan berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $kode_kelompok)
    {
        $kelompokJabatan = KelompokJabatan::findOrFail($kode_kelompok);

        return Inertia::render('Kepegawaian/KelompokJabatan/Show', [
            'kelompokJabatan' => $kelompokJabatan,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $kode_kelompok)
    {
        $kelompokJabatan = KelompokJabatan::findOrFail($kode_kelompok);

        return Inertia::render('Kepegawaian/KelompokJabatan/Edit', [
            'kelompokJabatan' => $kelompokJabatan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $kode_kelompok)
    {
        $kelompokJabatan = KelompokJabatan::findOrFail($kode_kelompok);

        $validator = Validator::make($request->all(), [
            'kode_kelompok' => 'required|string|max:3|unique:kelompok_jabatan,kode_kelompok,'.$kode_kelompok.',kode_kelompok',
            'nama_kelompok' => 'required|string|max:100',
            'indek' => 'nullable|integer',
        ], [
            'kode_kelompok.required' => 'Kode Kelompok harus diisi',
            'kode_kelompok.unique' => 'Kode Kelompok sudah digunakan',
            'kode_kelompok.max' => 'Kode Kelompok maksimal 3 karakter',
            'nama_kelompok.required' => 'Nama Kelompok harus diisi',
            'nama_kelompok.max' => 'Nama Kelompok maksimal 100 karakter',
            'indek.integer' => 'Indek harus berupa angka',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $validator->validated();

        $kelompokJabatan->update($data);

        return redirect()->route('kelompok-jabatan.index')
            ->with('success', 'Data Kelompok Jabatan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $kode_kelompok)
    {
        $kelompokJabatan = KelompokJabatan::findOrFail($kode_kelompok);
        $kelompokJabatan->delete();

        return redirect()->route('kelompok-jabatan.index')
            ->with('success', 'Data Kelompok Jabatan berhasil dihapus.');
    }
}
