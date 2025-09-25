<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\JnsPerawatan;
use App\Models\JnsPerawatanInap;
use App\Models\JnsPerawatanLab;
use App\Models\JnsPerawatanRadiologi;
use App\Models\Poliklinik;
use App\Models\Penjab;
use App\Models\KategoriPerawatan;
use Illuminate\Support\Facades\Validator;

class DaftarTarifController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $category = $request->get('category', 'rawat-jalan');
        $perPage = $request->get('per_page', 10);
        $poliklinikFilter = $request->get('poliklinik'); // Add poliklinik filter parameter
    
        $data = [];
    
        switch ($category) {
            case 'rawat-jalan':
                $query = JnsPerawatan::with(['poliklinik', 'penjab'])
                    ->aktif();
                
                if ($search) {
                    $query->search($search);
                }
                
                // Add poliklinik filter for rawat-jalan
                if ($poliklinikFilter) {
                    $query->where('kd_poli', $poliklinikFilter);
                }
                
                $data = $query->paginate($perPage);
                break;
    
            case 'rawat-inap':
                $query = JnsPerawatanInap::with(['bangsal', 'penjab'])
                    ->aktif();
                
                if ($search) {
                    $query->search($search);
                }
                
                $data = $query->paginate($perPage);
                break;
    
            case 'laboratorium':
                $query = JnsPerawatanLab::with('penjab')
                    ->aktif();
                
                if ($search) {
                    $query->search($search);
                }
                
                $data = $query->paginate($perPage);
                break;
    
            case 'radiologi':
                $query = JnsPerawatanRadiologi::with('penjab')
                    ->aktif();
                
                if ($search) {
                    $query->search($search);
                }
                
                $data = $query->paginate($perPage);
                break;
    
            case 'kamar':
                // Untuk kamar, kita bisa menggunakan data dari poliklinik atau bangsal
                $query = Poliklinik::aktif();
                
                if ($search) {
                    $query->where(function ($q) use ($search) {
                        $q->where('kd_poli', 'like', "%{$search}%")
                            ->orWhere('nm_poli', 'like', "%{$search}%");
                    });
                }
                
                // Add poliklinik filter for kamar
                if ($poliklinikFilter) {
                    $query->where('kd_poli', $poliklinikFilter);
                }
                
                $data = $query->paginate($perPage);
                break;
        }
    
        // Get data untuk modal form
        $polikliniks = Poliklinik::where('status', '1')->get();
        $penjaabs = Penjab::where('status', '1')->get();
        $kategoris = KategoriPerawatan::all();
    
        return Inertia::render('DaftarTarif/Index', [
            'title' => 'Daftar Tarif',
            'data' => $data,
            'category' => $category,
            'search' => $search,
            'filters' => [
                'search' => $search,
                'category' => $category,
                'per_page' => $perPage,
                'poliklinik' => $poliklinikFilter // Pass poliklinik filter back to frontend
            ],
            'polikliniks' => $polikliniks,
            'penjaabs' => $penjaabs,
            'kategoris' => $kategoris
        ]);
    }

    /**
     * Show the form for creating a new tarif.
     */
    public function create(Request $request)
    {
        $category = $request->get('category', 'rawat-jalan');
        
        // Get data untuk dropdown
        $polikliniks = Poliklinik::where('status', '1')->get();
        $penjaabs = Penjab::where('status', '1')->get();
        $kategoris = KategoriPerawatan::orderBy('kd_kategori', 'asc')->get();
        
        return Inertia::render('DaftarTarif/Create', [
            'title' => 'Tambah Tarif',
            'category' => $category,
            'polikliniks' => $polikliniks,
            'penjaabs' => $penjaabs,
            'kategoris' => $kategoris
        ]);
    }

    /**
     * Store a newly created tarif in storage.
     */
    public function store(Request $request)
    {
        $category = $request->get('category', 'rawat-jalan');
        
        switch ($category) {
            case 'rawat-jalan':
                return $this->storeRawatJalan($request);
            case 'rawat-inap':
                return $this->storeRawatInap($request);
            case 'laboratorium':
                return $this->storeLaboratorium($request);
            case 'radiologi':
                return $this->storeRadiologi($request);
            default:
                return redirect()->back()->with('error', 'Kategori tidak valid');
        }
    }

    /**
     * Store rawat jalan tarif
     */
    private function storeRawatJalan(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kd_jenis_prw' => 'required|string|max:15|unique:jns_perawatan,kd_jenis_prw',
            'nm_perawatan' => 'required|string|max:80',
            'kd_kategori' => 'nullable|string|max:5',
            'material' => 'nullable|numeric|min:0',
            'bhp' => 'nullable|numeric|min:0',
            'tarif_tindakandr' => 'nullable|numeric|min:0',
            'tarif_tindakanpr' => 'nullable|numeric|min:0',
            'kso' => 'nullable|numeric|min:0',
            'menejemen' => 'nullable|numeric|min:0',
            'kd_pj' => 'required|string|max:3',
            'kd_poli' => 'required|string|max:5',
            'status' => 'required|in:0,1'
        ]);
    
        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }
    
        $data = $request->all();
        
        // Calculate totals
        $material = $data['material'] ?? 0;
        $bhp = $data['bhp'] ?? 0;
        $tarif_tindakandr = $data['tarif_tindakandr'] ?? 0;
        $tarif_tindakanpr = $data['tarif_tindakanpr'] ?? 0;
        $kso = $data['kso'] ?? 0;
        $menejemen = $data['menejemen'] ?? 0;
    
        // Calculate actual totals
        $calculatedTotalDr = $material + $bhp + $tarif_tindakandr + $kso + $menejemen;
        $calculatedTotalPr = $material + $bhp + $tarif_tindakanpr + $kso + $menejemen;
        $calculatedTotalDrPr = $material + $bhp + $tarif_tindakandr + $tarif_tindakanpr + $kso + $menejemen;
    
        // Set totals based on checkbox status - hanya simpan jika checkbox tercentang
        $data['total_byrdr'] = ($data['show_total_dokter'] ?? false) ? $calculatedTotalDr : 0;
        $data['total_byrpr'] = ($data['show_total_perawat'] ?? false) ? $calculatedTotalPr : 0;
        $data['total_byrdrpr'] = ($data['show_total_dokter_perawat'] ?? false) ? $calculatedTotalDrPr : 0;
    
        // Remove checkbox fields from data before saving
        unset($data['show_total_dokter'], $data['show_total_perawat'], $data['show_total_dokter_perawat']);
    
        JnsPerawatan::create($data);
    
        return redirect()->route('daftar-tarif.index', ['category' => 'rawat-jalan'])
            ->with('success', 'Tarif rawat jalan berhasil ditambahkan');
    }

    /**
     * Update rawat jalan tarif
     */
    private function updateRawatJalan(Request $request, $id)
    {
        $tarif = JnsPerawatan::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'kd_jenis_prw' => 'required|string|max:15|unique:jns_perawatan,kd_jenis_prw,' . $id . ',kd_jenis_prw',
            'nm_perawatan' => 'required|string|max:80',
            'kd_kategori' => 'nullable|string|max:5',
            'material' => 'nullable|numeric|min:0',
            'bhp' => 'nullable|numeric|min:0',
            'tarif_tindakandr' => 'nullable|numeric|min:0',
            'tarif_tindakanpr' => 'nullable|numeric|min:0',
            'kso' => 'nullable|numeric|min:0',
            'menejemen' => 'nullable|numeric|min:0',
            'kd_pj' => 'required|string|max:3',
            'kd_poli' => 'required|string|max:5',
            'status' => 'required|in:0,1'
        ]);
    
        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }
    
        $data = $request->all();
    
        // Calculate totals
        $material = $data['material'] ?? 0;
        $bhp = $data['bhp'] ?? 0;
        $tarif_tindakandr = $data['tarif_tindakandr'] ?? 0;
        $tarif_tindakanpr = $data['tarif_tindakanpr'] ?? 0;
        $kso = $data['kso'] ?? 0;
        $menejemen = $data['menejemen'] ?? 0;
    
        // Calculate actual totals
        $calculatedTotalDr = $material + $bhp + $tarif_tindakandr + $kso + $menejemen;
        $calculatedTotalPr = $material + $bhp + $tarif_tindakanpr + $kso + $menejemen;
        $calculatedTotalDrPr = $material + $bhp + $tarif_tindakandr + $tarif_tindakanpr + $kso + $menejemen;
    
        // Set totals based on checkbox status - hanya simpan jika checkbox tercentang
        $data['total_byrdr'] = ($data['show_total_dokter'] ?? false) ? $calculatedTotalDr : 0;
        $data['total_byrpr'] = ($data['show_total_perawat'] ?? false) ? $calculatedTotalPr : 0;
        $data['total_byrdrpr'] = ($data['show_total_dokter_perawat'] ?? false) ? $calculatedTotalDrPr : 0;
    
        // Remove checkbox fields from data before saving
        unset($data['show_total_dokter'], $data['show_total_perawat'], $data['show_total_dokter_perawat']);
    
        $tarif->update($data);
    
        return redirect()->route('daftar-tarif.index', ['category' => 'rawat-jalan'])
            ->with('success', 'Tarif rawat jalan berhasil diperbarui');
    }

    /**
     * Remove the specified tarif from storage.
     */
    public function destroy(Request $request, $id)
    {
        $category = $request->get('category', 'rawat-jalan');
        
        try {
            switch ($category) {
                case 'rawat-jalan':
                    $tarif = JnsPerawatan::findOrFail($id);
                    break;
                case 'rawat-inap':
                    $tarif = JnsPerawatanInap::findOrFail($id);
                    break;
                case 'laboratorium':
                    $tarif = JnsPerawatanLab::findOrFail($id);
                    break;
                case 'radiologi':
                    $tarif = JnsPerawatanRadiologi::findOrFail($id);
                    break;
                default:
                    return response()->json(['error' => 'Kategori tidak valid'], 400);
            }
            
            // Soft delete: set status = 0
            $tarif->update(['status' => '0']);
            
            return response()->json(['success' => 'Tarif berhasil dihapus']);
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal menghapus tarif'], 500);
        }
    }

    /**
     * Generate kode otomatis berdasarkan kategori
     */
    public function generateKode(Request $request)
    {
        $kdKategori = $request->get('kd_kategori');
        $category = $request->get('category', 'rawat-jalan');
        
        if (!$kdKategori) {
            return response()->json([
                'success' => false,
                'message' => 'Kategori harus dipilih'
            ]);
        }

        try {
            switch ($category) {
                case 'rawat-jalan':
                    $kode = JnsPerawatan::generateKodeJenisPerawatan($kdKategori);
                    break;
                case 'rawat-inap':
                    $kode = JnsPerawatanInap::generateKodeJenisPerawatan($kdKategori);
                    break;
                default:
                    $kode = JnsPerawatan::generateKodeJenisPerawatan($kdKategori);
                    break;
            }

            return response()->json([
                'success' => true,
                'kode' => $kode
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal generate kode: ' . $e->getMessage()
            ]);
        }
    }

    // Placeholder methods for other categories
    private function storeRawatInap(Request $request) { /* Implementation for rawat inap */ }
    private function storeLaboratorium(Request $request) { /* Implementation for laboratorium */ }
    private function storeRadiologi(Request $request) { /* Implementation for radiologi */ }
    private function updateRawatInap(Request $request, $id) { /* Implementation for rawat inap */ }
    private function updateLaboratorium(Request $request, $id) { /* Implementation for laboratorium */ }
    private function updateRadiologi(Request $request, $id) { /* Implementation for radiologi */ }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        try {
            $jnsPerawatan = JnsPerawatan::findOrFail($id);
            
            // Get data untuk form
            $polikliniks = Poliklinik::where('status', '1')->get();
            $penjaabs = Penjab::where('status', '1')->get();
            $kategoris = KategoriPerawatan::orderBy('kd_kategori', 'asc')->get();

            return Inertia::render('DaftarTarif/Edit', [
                'jnsPerawatan' => $jnsPerawatan,
                'polikliniks' => $polikliniks,
                'penjaabs' => $penjaabs,
                'kategoris' => $kategoris
            ]);
        } catch (\Exception $e) {
            return redirect()->route('daftar-tarif.index')
                ->with('error', 'Data tidak ditemukan');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $jnsPerawatan = JnsPerawatan::findOrFail($id);

            // Validasi data
            $validator = Validator::make($request->all(), [
                'nm_perawatan' => 'required|string|max:80',
                'kd_kategori' => 'required|string|max:5',
                'material' => 'required|numeric|min:0',
                'bhp' => 'required|numeric|min:0',
                'tarif_tindakandr' => 'required|numeric|min:0',
                'tarif_tindakanpr' => 'required|numeric|min:0',
                'kso' => 'required|numeric|min:0',
                'menejemen' => 'required|numeric|min:0',
                'kd_pj' => 'required|string|max:3',
                'kd_poli' => 'required|string|max:5',
                'status' => 'required|in:0,1'
            ]);

            if ($validator->fails()) {
                return redirect()->back()
                    ->withErrors($validator)
                    ->withInput();
            }

            $data = $request->all();

            // Hitung total berdasarkan checkbox yang dicentang
            $totalByrdr = 0;
            $totalByrpr = 0;
            $totalByrdrpr = 0;

            // Komponen dasar
            $material = $data['material'];
            $bhp = $data['bhp'];
            $tarif_tindakandr = $data['tarif_tindakandr'];
            $tarif_tindakanpr = $data['tarif_tindakanpr'];
            $kso = $data['kso'];
            $menejemen = $data['menejemen'];

            // Set total berdasarkan checkbox
            if (isset($data['show_total_dokter']) && $data['show_total_dokter']) {
                // Total Dokter = Material + BHP + Tarif Tindakan Dokter + KSO + Menejemen (tanpa tarif perawat)
                $totalByrdr = $material + $bhp + $tarif_tindakandr + $kso + $menejemen;
            }

            if (isset($data['show_total_perawat']) && $data['show_total_perawat']) {
                // Total Perawat = Material + BHP + Tarif Tindakan Perawat + KSO + Menejemen (tanpa tarif dokter)
                $totalByrpr = $material + $bhp + $tarif_tindakanpr + $kso + $menejemen;
            }

            if (isset($data['show_total_dokter_perawat']) && $data['show_total_dokter_perawat']) {
                // Total Dokter + Perawat = Material + BHP + Tarif Tindakan Dokter + Tarif Tindakan Perawat + KSO + Menejemen
                $totalByrdrpr = $material + $bhp + $tarif_tindakandr + $tarif_tindakanpr + $kso + $menejemen;
            }

            // Set nilai total
            $data['total_byrdr'] = $totalByrdr;
            $data['total_byrpr'] = $totalByrpr;
            $data['total_byrdrpr'] = $totalByrdrpr;

            // Hapus field checkbox dari data sebelum disimpan
            unset($data['show_total_dokter']);
            unset($data['show_total_perawat']);
            unset($data['show_total_dokter_perawat']);

            // Update data
            $jnsPerawatan->update($data);

            return redirect()->route('daftar-tarif.index', ['category' => 'rawat-jalan'])
                ->with('success', 'Perubahan tarif berhasil diperbarui');

        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Gagal memperbarui data: ' . $e->getMessage())
                ->withInput();
        }
    }
}