<?php

namespace App\Http\Controllers;

use App\Models\StatusKerja;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatusKerjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = StatusKerja::query();

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('stts', 'like', "%{$search}%")
                  ->orWhere('ktg', 'like', "%{$search}%");
            });
        }

        // Pagination
        $perPage = $request->get('per_page', 10);
        $statusKerja = $query->paginate($perPage)->withQueryString();

        return Inertia::render('Kepegawian/StatusKerja/index', [
            'statusKerja' => $statusKerja,
            'filters' => $request->only(['search', 'per_page']),
            'flash' => session()->get('flash', [])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Kepegawian/StatusKerja/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'stts' => 'required|string|max:3|unique:stts_kerja,stts',
            'ktg' => 'required|string|max:20',
            'indek' => 'required|integer|min:0|max:9999',
            'hakcuti' => 'required|integer|min:0|max:99999999999'
        ], [
            'stts.required' => 'Status harus diisi',
            'stts.max' => 'Status maksimal 3 karakter',
            'stts.unique' => 'Status sudah ada',
            'ktg.required' => 'Keterangan harus diisi',
            'ktg.max' => 'Keterangan maksimal 20 karakter',
            'indek.required' => 'Indek harus diisi',
            'indek.integer' => 'Indek harus berupa angka',
            'indek.min' => 'Indek minimal 0',
            'indek.max' => 'Indek maksimal 9999',
            'hakcuti.required' => 'Hak cuti harus diisi',
            'hakcuti.integer' => 'Hak cuti harus berupa angka',
            'hakcuti.min' => 'Hak cuti minimal 0',
            'hakcuti.max' => 'Hak cuti maksimal 99999999999'
        ]);

        try {
            StatusKerja::create($validated);
            
            return redirect()->route('status-kerja.index')
                           ->with('flash', ['success' => 'Status kerja berhasil ditambahkan']);
        } catch (\Exception $e) {
            return redirect()->back()
                           ->with('flash', ['error' => 'Gagal menambahkan status kerja'])
                           ->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(StatusKerja $statusKerja)
    {
        return Inertia::render('Kepegawai/StatusKerja/Show', [
            'statusKerja' => $statusKerja
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StatusKerja $statusKerja)
    {
        return Inertia::render('Kepegawai/StatusKerja/Edit', [
            'statusKerja' => $statusKerja
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StatusKerja $statusKerja)
    {
        $validated = $request->validate([
            'stts' => 'required|string|max:3|unique:stts_kerja,stts,' . $statusKerja->id,
            'ktg' => 'required|string|max:20',
            'indek' => 'required|integer|min:0|max:9999',
            'hakcuti' => 'required|integer|min:0|max:99999999999'
        ], [
            'stts.required' => 'Status harus diisi',
            'stts.max' => 'Status maksimal 3 karakter',
            'stts.unique' => 'Status sudah ada',
            'ktg.required' => 'Keterangan harus diisi',
            'ktg.max' => 'Keterangan maksimal 20 karakter',
            'indek.required' => 'Indek harus diisi',
            'indek.integer' => 'Indek harus berupa angka',
            'indek.min' => 'Indek minimal 0',
            'indek.max' => 'Indek maksimal 9999',
            'hakcuti.required' => 'Hak cuti harus diisi',
            'hakcuti.integer' => 'Hak cuti harus berupa angka',
            'hakcuti.min' => 'Hak cuti minimal 0',
            'hakcuti.max' => 'Hak cuti maksimal 99999999999'
        ]);

        try {
            $statusKerja->update($validated);
            
            return redirect()->route('status-kerja.index')
                           ->with('flash', ['success' => 'Status kerja berhasil diperbarui']);
        } catch (\Exception $e) {
            return redirect()->back()
                           ->with('flash', ['error' => 'Gagal memperbarui status kerja'])
                           ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StatusKerja $statusKerja)
    {
        try {
            $statusKerja->delete();
            
            return redirect()->route('status-kerja.index')
                           ->with('flash', ['success' => 'Status kerja berhasil dihapus']);
        } catch (\Exception $e) {
            return redirect()->back()
                           ->with('flash', ['error' => 'Gagal menghapus status kerja']);
        }
    }
}