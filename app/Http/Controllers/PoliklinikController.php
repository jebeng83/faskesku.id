<?php

namespace App\Http\Controllers;

use App\Models\Poliklinik;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PoliklinikController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Poliklinik::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kd_poli', 'like', "%{$search}%")
                    ->orWhere('nm_poli', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Pagination
        $polikliniks = $query->orderBy('kd_poli', 'asc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Poliklinik/Index', [
            'title' => 'Data Poliklinik',
            'polikliniks' => $polikliniks,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Poliklinik/Create', [
            'title' => 'Tambah Poliklinik',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kd_poli' => 'required|string|max:5|unique:poliklinik,kd_poli',
            'nm_poli' => 'required|string|max:50',
            'registrasi' => 'required|numeric|min:0',
            'registrasilama' => 'required|numeric|min:0',
            'status' => 'required|in:0,1'
        ], [
            'kd_poli.required' => 'Kode poliklinik wajib diisi.',
            'kd_poli.unique' => 'Kode poliklinik sudah digunakan.',
            'kd_poli.max' => 'Kode poliklinik maksimal 5 karakter.',
            'nm_poli.required' => 'Nama poliklinik wajib diisi.',
            'nm_poli.max' => 'Nama poliklinik maksimal 50 karakter.',
            'registrasi.required' => 'Biaya registrasi baru wajib diisi.',
            'registrasi.numeric' => 'Biaya registrasi baru harus berupa angka.',
            'registrasi.min' => 'Biaya registrasi baru tidak boleh kurang dari 0.',
            'registrasilama.required' => 'Biaya registrasi lama wajib diisi.',
            'registrasilama.numeric' => 'Biaya registrasi lama harus berupa angka.',
            'registrasilama.min' => 'Biaya registrasi lama tidak boleh kurang dari 0.',
            'status.required' => 'Status wajib dipilih.',
            'status.in' => 'Status harus aktif atau tidak aktif.'
        ]);

        if ($validator->fails()) {
            // Return JSON response for AJAX requests
            if ($request->expectsJson() || $request->ajax()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }
            
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            $poliklinik = Poliklinik::create($request->all());

            // Return JSON response for AJAX requests
            if ($request->expectsJson() || $request->ajax()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Data poliklinik berhasil ditambahkan.',
                    'data' => $poliklinik
                ], 201);
            }

            return redirect()->route('poliklinik.index')
                ->with('success', 'Data poliklinik berhasil ditambahkan.');
        } catch (\Exception $e) {
            // Return JSON response for AJAX requests
            if ($request->expectsJson() || $request->ajax()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()
                ], 500);
            }
            
            return redirect()->back()
                ->with('error', 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Poliklinik $poliklinik)
    {
        // Load relationships
        $poliklinik->load(['rawatJalan' => function ($query) {
            $query->with(['patient', 'dokter'])
                ->orderBy('tgl_registrasi', 'desc')
                ->limit(10);
        }]);

        return Inertia::render('Poliklinik/Show', [
            'title' => 'Detail Poliklinik',
            'poliklinik' => $poliklinik,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Poliklinik $poliklinik)
    {
        return Inertia::render('Poliklinik/Edit', [
            'title' => 'Edit Poliklinik',
            'poliklinik' => $poliklinik,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Poliklinik $poliklinik)
    {
        $validator = Validator::make($request->all(), [
            'kd_poli' => [
                'required',
                'string',
                'max:5',
                Rule::unique('poliklinik', 'kd_poli')->ignore($poliklinik->kd_poli, 'kd_poli')
            ],
            'nm_poli' => 'required|string|max:50',
            'registrasi' => 'required|numeric|min:0',
            'registrasilama' => 'required|numeric|min:0',
            'status' => 'required|in:0,1'
        ], [
            'kd_poli.required' => 'Kode poliklinik wajib diisi.',
            'kd_poli.unique' => 'Kode poliklinik sudah digunakan.',
            'kd_poli.max' => 'Kode poliklinik maksimal 5 karakter.',
            'nm_poli.required' => 'Nama poliklinik wajib diisi.',
            'nm_poli.max' => 'Nama poliklinik maksimal 50 karakter.',
            'registrasi.required' => 'Biaya registrasi baru wajib diisi.',
            'registrasi.numeric' => 'Biaya registrasi baru harus berupa angka.',
            'registrasi.min' => 'Biaya registrasi baru tidak boleh kurang dari 0.',
            'registrasilama.required' => 'Biaya registrasi lama wajib diisi.',
            'registrasilama.numeric' => 'Biaya registrasi lama harus berupa angka.',
            'registrasilama.min' => 'Biaya registrasi lama tidak boleh kurang dari 0.',
            'status.required' => 'Status wajib dipilih.',
            'status.in' => 'Status harus aktif atau tidak aktif.'
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            $poliklinik->update($request->all());

            return redirect()->route('poliklinik.index')
                ->with('success', 'Data poliklinik berhasil diperbarui.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Terjadi kesalahan saat memperbarui data: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Poliklinik $poliklinik)
    {
        try {
            // Check if poliklinik has related rawat jalan records
            if ($poliklinik->rawatJalan()->exists()) {
                return redirect()->back()
                    ->with('error', 'Poliklinik tidak dapat dihapus karena masih memiliki data rawat jalan terkait.');
            }

            $poliklinik->delete();

            return redirect()->route('poliklinik.index')
                ->with('success', 'Data poliklinik berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Terjadi kesalahan saat menghapus data: ' . $e->getMessage());
        }
    }

    /**
     * Toggle status of the specified resource.
     */
    public function toggleStatus(Poliklinik $poliklinik)
    {
        try {
            $newStatus = $poliklinik->status === '1' ? '0' : '1';
            $poliklinik->update(['status' => $newStatus]);

            $statusText = $newStatus === '1' ? 'diaktifkan' : 'dinonaktifkan';

            return redirect()->back()
                ->with('success', "Poliklinik berhasil {$statusText}.");
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Terjadi kesalahan saat mengubah status: ' . $e->getMessage());
        }
    }

    /**
     * Get poliklinik data for API/AJAX requests
     */
    public function getPolikliniks(Request $request)
    {
        $query = Poliklinik::aktif();

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kd_poli', 'like', "%{$search}%")
                    ->orWhere('nm_poli', 'like', "%{$search}%");
            });
        }

        $polikliniks = $query->select('kd_poli', 'nm_poli', 'registrasi', 'registrasilama')
            ->orderBy('nm_poli', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $polikliniks
        ]);
    }
}