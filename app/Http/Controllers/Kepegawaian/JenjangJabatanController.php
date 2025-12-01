<?php

namespace App\Http\Controllers\Kepegawaian;

use App\Http\Controllers\Controller;
use App\Models\Kepegawaian\JenjangJabatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class JenjangJabatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = JenjangJabatan::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kode', 'like', "%{$search}%")
                    ->orWhere('nama', 'like', "%{$search}%");
            });
        }

        // Pagination
        $jenjangJabatan = $query->orderBy('kode')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Kepegawaian/JenjangJabatan/Index', [
            'jenjangJabatan' => $jenjangJabatan,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Kepegawaian/JenjangJabatan/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kode' => 'required|string|max:10|unique:jnj_jabatan,kode',
            'nama' => 'required|string|max:50',
            'tnj' => 'required|numeric',
            'indek' => 'nullable|integer',
        ], [
            'kode.required' => 'Kode harus diisi',
            'kode.unique' => 'Kode sudah digunakan',
            'kode.max' => 'Kode maksimal 10 karakter',
            'nama.required' => 'Nama harus diisi',
            'nama.max' => 'Nama maksimal 50 karakter',
            'tnj.required' => 'Tunjangan harus diisi',
            'tnj.numeric' => 'Tunjangan harus berupa angka',
            'indek.integer' => 'Indek harus berupa angka',
        ]);

        if ($validator->fails()) {
            // Untuk request dari Inertia, return redirect back dengan errors (Inertia akan handle ini)
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

        $jenjangJabatan = JenjangJabatan::create($data);

        // Untuk request dari Inertia, return redirect back dengan success message
        // Tapi karena ini dari modal, kita perlu return response yang tidak redirect
        // Solusi: return redirect back dengan flash message, tapi di frontend kita handle dengan preserveState
        if ($request->header('X-Inertia')) {
            return redirect()->back()
                ->with('success', 'Data Jenjang Jabatan berhasil ditambahkan.')
                ->with('jenjangJabatanCreated', [
                    'kode' => $jenjangJabatan->kode,
                    'nama' => $jenjangJabatan->nama,
                ]);
        }

        // Untuk request JSON biasa (non-Inertia)
        if ($request->expectsJson() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Data Jenjang Jabatan berhasil ditambahkan.',
                'data' => $jenjangJabatan,
            ], 201);
        }

        return redirect()->route('jenjang-jabatan.index')
            ->with('success', 'Data Jenjang Jabatan berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $kode)
    {
        $jenjangJabatan = JenjangJabatan::findOrFail($kode);

        return Inertia::render('Kepegawaian/JenjangJabatan/Show', [
            'jenjangJabatan' => $jenjangJabatan,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $kode)
    {
        $jenjangJabatan = JenjangJabatan::findOrFail($kode);

        return Inertia::render('Kepegawaian/JenjangJabatan/Edit', [
            'jenjangJabatan' => $jenjangJabatan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $kode)
    {
        $jenjangJabatan = JenjangJabatan::findOrFail($kode);

        $validator = Validator::make($request->all(), [
            'kode' => 'required|string|max:10|unique:jnj_jabatan,kode,'.$kode.',kode',
            'nama' => 'required|string|max:50',
            'tnj' => 'required|numeric',
            'indek' => 'nullable|integer',
        ], [
            'kode.required' => 'Kode harus diisi',
            'kode.unique' => 'Kode sudah digunakan',
            'kode.max' => 'Kode maksimal 10 karakter',
            'nama.required' => 'Nama harus diisi',
            'nama.max' => 'Nama maksimal 50 karakter',
            'tnj.required' => 'Tunjangan harus diisi',
            'tnj.numeric' => 'Tunjangan harus berupa angka',
            'indek.integer' => 'Indek harus berupa angka',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $validator->validated();

        $jenjangJabatan->update($data);

        return redirect()->route('jenjang-jabatan.index')
            ->with('success', 'Data Jenjang Jabatan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $kode)
    {
        $jenjangJabatan = JenjangJabatan::findOrFail($kode);
        $jenjangJabatan->delete();

        return redirect()->route('jenjang-jabatan.index')
            ->with('success', 'Data Jenjang Jabatan berhasil dihapus.');
    }
}
