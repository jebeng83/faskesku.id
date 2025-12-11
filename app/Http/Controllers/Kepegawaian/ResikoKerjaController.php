<?php

namespace App\Http\Controllers\Kepegawaian;

use App\Http\Controllers\Controller;
use App\Models\Kepegawaian\ResikoKerja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ResikoKerjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ResikoKerja::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kode_resiko', 'like', "%{$search}%")
                    ->orWhere('nama_resiko', 'like', "%{$search}%");
            });
        }

        // Pagination
        $resikoKerja = $query->orderBy('kode_resiko')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Kepegawaian/ResikoKerja/Index', [
            'resikoKerja' => $resikoKerja,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Kepegawaian/ResikoKerja/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kode_resiko' => 'required|string|max:3|unique:resiko_kerja,kode_resiko',
            'nama_resiko' => 'required|string|max:100',
            'indek' => 'nullable|integer',
        ], [
            'kode_resiko.required' => 'Kode Resiko harus diisi',
            'kode_resiko.unique' => 'Kode Resiko sudah digunakan',
            'kode_resiko.max' => 'Kode Resiko maksimal 3 karakter',
            'nama_resiko.required' => 'Nama Resiko harus diisi',
            'nama_resiko.max' => 'Nama Resiko maksimal 100 karakter',
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

        $resikoKerja = ResikoKerja::create($data);

        // Untuk request dari Inertia, return redirect back dengan success message
        if ($request->header('X-Inertia')) {
            return redirect()->back()
                ->with('success', 'Data Resiko Kerja berhasil ditambahkan.')
                ->with('resikoKerjaCreated', [
                    'kode_resiko' => $resikoKerja->kode_resiko,
                ]);
        }

        // Untuk request JSON biasa (non-Inertia)
        if ($request->expectsJson() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Data Resiko Kerja berhasil ditambahkan.',
                'data' => $resikoKerja,
            ], 201);
        }

        return redirect()->route('resiko-kerja.index')
            ->with('success', 'Data Resiko Kerja berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $kode_resiko)
    {
        $resikoKerja = ResikoKerja::findOrFail($kode_resiko);

        return Inertia::render('Kepegawaian/ResikoKerja/Show', [
            'resikoKerja' => $resikoKerja,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $kode_resiko)
    {
        $resikoKerja = ResikoKerja::findOrFail($kode_resiko);

        return Inertia::render('Kepegawaian/ResikoKerja/Edit', [
            'resikoKerja' => $resikoKerja,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $kode_resiko)
    {
        $resikoKerja = ResikoKerja::findOrFail($kode_resiko);

        $validator = Validator::make($request->all(), [
            'kode_resiko' => 'required|string|max:3|unique:resiko_kerja,kode_resiko,'.$kode_resiko.',kode_resiko',
            'nama_resiko' => 'required|string|max:100',
            'indek' => 'nullable|integer',
        ], [
            'kode_resiko.required' => 'Kode Resiko harus diisi',
            'kode_resiko.unique' => 'Kode Resiko sudah digunakan',
            'kode_resiko.max' => 'Kode Resiko maksimal 3 karakter',
            'nama_resiko.required' => 'Nama Resiko harus diisi',
            'nama_resiko.max' => 'Nama Resiko maksimal 100 karakter',
            'indek.integer' => 'Indek harus berupa angka',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $validator->validated();

        $resikoKerja->update($data);

        return redirect()->route('resiko-kerja.index')
            ->with('success', 'Data Resiko Kerja berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $kode_resiko)
    {
        $resikoKerja = ResikoKerja::findOrFail($kode_resiko);
        $resikoKerja->delete();

        return redirect()->route('resiko-kerja.index')
            ->with('success', 'Data Resiko Kerja berhasil dihapus.');
    }
}
