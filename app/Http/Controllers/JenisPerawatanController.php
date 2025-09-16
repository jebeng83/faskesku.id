<?php

namespace App\Http\Controllers;

use App\Models\JenisPerawatan;
use App\Models\Penjab;
use App\Models\Poliklinik;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class JenisPerawatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = JenisPerawatan::with(['penjab', 'poliklinik']);

        // Apply filters
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Set default kategori to 'RJ' if not provided
        $kategori = $request->get('kd_kategori', 'RJ');
        if ($kategori) {
            $query->byKategori($kategori);
        }

        if ($request->has('status') && $request->status !== '') {
            $query->byStatus($request->status);
        }

        if ($request->has('kd_pj') && $request->kd_pj) {
            $query->byPenjab($request->kd_pj);
        }

        if ($request->has('kd_poli') && $request->kd_poli) {
            $query->byPoliklinik($request->kd_poli);
        }

        // Pagination
        $jenisPerawatan = $query->orderBy('kd_jenis_prw', 'asc')
            ->paginate(15)
            ->withQueryString();

        // Get filter options
        $penjabs = Penjab::select('kd_pj', 'png_jawab')->get();
        $polikliniks = Poliklinik::select('kd_poli', 'nm_poli')->get();
        
        // Get unique categories from existing data
        $categories = JenisPerawatan::select('kd_kategori')
            ->distinct()
            ->whereNotNull('kd_kategori')
            ->pluck('kd_kategori')
            ->toArray();

        return Inertia::render('JenisPerawatan/Index', [
            'jenisPerawatan' => $jenisPerawatan,
            'filters' => array_merge(
                $request->only(['search', 'kd_kategori', 'status', 'kd_pj', 'kd_poli']),
                ['kd_kategori' => $kategori] // Ensure kategori is always set
            ),
            'penjabs' => $penjabs,
            'polikliniks' => $polikliniks,
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $penjabs = Penjab::select('kd_pj', 'png_jawab')->get();
        $polikliniks = Poliklinik::select('kd_poli', 'nm_poli')->get();

        return Inertia::render('JenisPerawatan/Create', [
            'penjabs' => $penjabs,
            'polikliniks' => $polikliniks,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kd_jenis_prw' => 'required|string|max:15|unique:jns_perawatan,kd_jenis_prw',
            'nm_perawatan' => 'required|string|max:80',
            'kd_kategori' => 'nullable|string|max:5',
            'material' => 'nullable|numeric|min:0',
            'bhp' => 'required|numeric|min:0',
            'tarif_tindakandr' => 'nullable|numeric|min:0',
            'tarif_tindakanpr' => 'nullable|numeric|min:0',
            'kso' => 'nullable|numeric|min:0',
            'menejemen' => 'nullable|numeric|min:0',
            'total_byrdr' => 'nullable|numeric|min:0',
            'total_byrpr' => 'nullable|numeric|min:0',
            'total_byrdrpr' => 'required|numeric|min:0',
            'kd_pj' => 'required|string|max:3|exists:penjab,kd_pj',
            'kd_poli' => 'required|string|max:5|exists:poliklinik,kd_poli',
            'status' => 'required|in:0,1',
        ], [
            'kd_jenis_prw.required' => 'Kode jenis perawatan harus diisi',
            'kd_jenis_prw.unique' => 'Kode jenis perawatan sudah ada',
            'nm_perawatan.required' => 'Nama perawatan harus diisi',
            'bhp.required' => 'BHP harus diisi',
            'total_byrdrpr.required' => 'Total biaya dokter + perawat harus diisi',
            'kd_pj.required' => 'Penjab harus dipilih',
            'kd_pj.exists' => 'Penjab tidak ditemukan',
            'kd_poli.required' => 'Poliklinik harus dipilih',
            'kd_poli.exists' => 'Poliklinik tidak ditemukan',
            'status.required' => 'Status harus dipilih',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator->errors())->withInput();
        }

        $data = $validator->validated();

        // Set default values for nullable fields
        $data['material'] = $data['material'] ?? 0;
        $data['tarif_tindakandr'] = $data['tarif_tindakandr'] ?? 0;
        $data['tarif_tindakanpr'] = $data['tarif_tindakanpr'] ?? 0;
        $data['kso'] = $data['kso'] ?? 0;
        $data['menejemen'] = $data['menejemen'] ?? 0;
        $data['total_byrdr'] = $data['total_byrdr'] ?? 0;
        $data['total_byrpr'] = $data['total_byrpr'] ?? 0;

        JenisPerawatan::create($data);

        return redirect()->route('jenis-perawatan.index')
            ->with('success', 'Jenis perawatan berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(JenisPerawatan $jenisPerawatan)
    {
        $jenisPerawatan->load(['penjab', 'poliklinik']);

        return Inertia::render('JenisPerawatan/Show', [
            'jenisPerawatan' => $jenisPerawatan,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JenisPerawatan $jenisPerawatan)
    {
        $penjabs = Penjab::select('kd_pj', 'png_jawab')->get();
        $polikliniks = Poliklinik::select('kd_poli', 'nm_poli')->get();

        return Inertia::render('JenisPerawatan/Edit', [
            'jenisPerawatan' => $jenisPerawatan,
            'penjabs' => $penjabs,
            'polikliniks' => $polikliniks,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JenisPerawatan $jenisPerawatan)
    {
        $validator = Validator::make($request->all(), [
            'kd_jenis_prw' => 'required|string|max:15|unique:jns_perawatan,kd_jenis_prw,' . $jenisPerawatan->kd_jenis_prw . ',kd_jenis_prw',
            'nm_perawatan' => 'required|string|max:80',
            'kd_kategori' => 'nullable|string|max:5',
            'material' => 'nullable|numeric|min:0',
            'bhp' => 'required|numeric|min:0',
            'tarif_tindakandr' => 'nullable|numeric|min:0',
            'tarif_tindakanpr' => 'nullable|numeric|min:0',
            'kso' => 'nullable|numeric|min:0',
            'menejemen' => 'nullable|numeric|min:0',
            'total_byrdr' => 'nullable|numeric|min:0',
            'total_byrpr' => 'nullable|numeric|min:0',
            'total_byrdrpr' => 'required|numeric|min:0',
            'kd_pj' => 'required|string|max:3|exists:penjab,kd_pj',
            'kd_poli' => 'required|string|max:5|exists:poliklinik,kd_poli',
            'status' => 'required|in:0,1',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator->errors())->withInput();
        }

        $data = $validator->validated();

        // Set default values for nullable fields
        $data['material'] = $data['material'] ?? 0;
        $data['tarif_tindakandr'] = $data['tarif_tindakandr'] ?? 0;
        $data['tarif_tindakanpr'] = $data['tarif_tindakanpr'] ?? 0;
        $data['kso'] = $data['kso'] ?? 0;
        $data['menejemen'] = $data['menejemen'] ?? 0;
        $data['total_byrdr'] = $data['total_byrdr'] ?? 0;
        $data['total_byrpr'] = $data['total_byrpr'] ?? 0;

        $jenisPerawatan->update($data);

        return redirect()->route('jenis-perawatan.index')
            ->with('success', 'Jenis perawatan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JenisPerawatan $jenisPerawatan)
    {
        $jenisPerawatan->delete();

        return redirect()->route('jenis-perawatan.index')
            ->with('success', 'Jenis perawatan berhasil dihapus.');
    }

    /**
     * Toggle status of the specified resource.
     */
    public function toggleStatus(JenisPerawatan $jenisPerawatan)
    {
        $newStatus = $jenisPerawatan->status === '1' ? '0' : '1';
        $jenisPerawatan->update(['status' => $newStatus]);

        $statusText = $newStatus === '1' ? 'diaktifkan' : 'dinonaktifkan';

        return redirect()->route('jenis-perawatan.index')
            ->with('success', "Jenis perawatan berhasil {$statusText}.");
    }
}