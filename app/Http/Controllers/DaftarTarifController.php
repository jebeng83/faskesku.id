<?php

namespace App\Http\Controllers;

use App\Models\Bangsal;
use App\Models\JnsPerawatan;
use App\Models\JnsPerawatanInap;
use App\Models\JnsPerawatanLab;
use App\Models\JnsPerawatanRadiologi;
use App\Models\KategoriPerawatan;
use App\Models\Penjab;
use App\Models\Poliklinik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class DaftarTarifController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search', '');
        $category = $request->query('category', 'rawat-jalan');
        $perPage = $request->query('per_page', 10);
        $poliklinikFilter = $request->query('poliklinik');
        $bangsalFilter = $request->query('bangsal');
        $statusFilter = $request->query('status', '1');

        $data = [];

        switch ($category) {
            case 'rawat-jalan':
                $query = JnsPerawatan::with(['poliklinik', 'penjab']);

                // Apply status filter
                if ($statusFilter !== 'all') {
                    $query->where('status', $statusFilter);
                }

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
                $query = JnsPerawatanInap::with(['bangsal', 'penjab']);

                // Apply status filter
                if ($statusFilter !== 'all') {
                    $query->where('status', $statusFilter);
                }

                if ($search) {
                    $query->search($search);
                }

                // Add bangsal filter for rawat-inap
                if ($bangsalFilter) {
                    $query->where('kd_bangsal', $bangsalFilter);
                }

                $data = $query->paginate($perPage);
                break;

            case 'laboratorium':
                $query = JnsPerawatanLab::with([
                    'penjab',
                    'templateLaboratorium' => function ($q) {
                        $q->ordered();
                    },
                ]);

                // Apply status filter
                if ($statusFilter !== 'all') {
                    $query->where('status', $statusFilter);
                }

                if ($search) {
                    $query->search($search);
                }

                $data = $query->paginate($perPage);
                break;

            case 'radiologi':
                $query = JnsPerawatanRadiologi::with('penjab');

                // Apply status filter
                if ($statusFilter !== 'all') {
                    $query->where('status', $statusFilter);
                }

                if ($search) {
                    $query->search($search);
                }

                $data = $query->paginate($perPage);
                break;

            case 'kamar':
                // Untuk kamar, kita bisa menggunakan data dari poliklinik atau bangsal
                $query = Poliklinik::query();

                // Apply status filter
                if ($statusFilter !== 'all') {
                    $query->where('status', $statusFilter);
                }

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
        $bangsals = Bangsal::where('status', '1')->get();
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
                'status' => $statusFilter, // Pass status filter back to frontend
                'poliklinik' => $poliklinikFilter, // Pass poliklinik filter back to frontend
                'bangsal' => $bangsalFilter, // Pass bangsal filter back to frontend
            ],
            'polikliniks' => $polikliniks,
            'bangsals' => $bangsals,
            'penjaabs' => $penjaabs,
            'kategoris' => $kategoris,
        ]);
    }

    /**
     * Show the form for creating a new tarif.
     */
    public function create(Request $request)
    {
        $category = $request->query('category', 'rawat-jalan');

        // Get data untuk dropdown
        $polikliniks = Poliklinik::where('status', '1')->get();
        $bangsals = Bangsal::where('status', '1')->get();
        $penjaabs = Penjab::where('status', '1')->get();
        $kategoris = KategoriPerawatan::orderBy('kd_kategori', 'asc')->get();

        return Inertia::render('DaftarTarif/Create', [
            'title' => 'Tambah Tarif',
            'category' => $category,
            'polikliniks' => $polikliniks,
            'bangsals' => $bangsals,
            'penjaabs' => $penjaabs,
            'kategoris' => $kategoris,
        ]);
    }

    /**
     * Store a newly created tarif in storage.
     */
    public function store(Request $request)
    {
        $category = $request->input('category', 'rawat-jalan');

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
            'status' => 'required|in:0,1',
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

        // Set totals based on checkbox status - hanya simpan jika checkbox tercentang (true)
        $data['total_byrdr'] = (($data['show_total_dokter'] ?? false) === true) ? $calculatedTotalDr : 0;
        $data['total_byrpr'] = (($data['show_total_perawat'] ?? false) === true) ? $calculatedTotalPr : 0;
        $data['total_byrdrpr'] = (($data['show_total_dokter_perawat'] ?? false) === true) ? $calculatedTotalDrPr : 0;

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
            'kd_jenis_prw' => 'required|string|max:15|unique:jns_perawatan,kd_jenis_prw,'.$id.',kd_jenis_prw',
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
            'status' => 'required|in:0,1',
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

        // Set totals based on checkbox status - hanya simpan jika checkbox tercentang (true)
        $data['total_byrdr'] = (($data['show_total_dokter'] ?? false) === true) ? $calculatedTotalDr : 0;
        $data['total_byrpr'] = (($data['show_total_perawat'] ?? false) === true) ? $calculatedTotalPr : 0;
        $data['total_byrdrpr'] = (($data['show_total_dokter_perawat'] ?? false) === true) ? $calculatedTotalDrPr : 0;

        // Remove checkbox fields from data before saving
        unset($data['show_total_dokter'], $data['show_total_perawat'], $data['show_total_dokter_perawat']);

        $tarif->update($data);

        return redirect()->route('daftar-tarif.index', ['category' => 'rawat-jalan'])
            ->with('success', 'Tarif rawat jalan berhasil diperbarui');
    }

    /**
     * Update status tarif (nonaktifkan/aktifkan)
     */
    public function updateStatus(Request $request, $id)
    {
        $category = $request->input('category', 'rawat-jalan');
        $status = $request->input('status', '0');

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
                    return redirect()->back()->with('error', 'Kategori tidak valid');
            }

            // Update status
            $tarif->update(['status' => $status]);

            $message = $status == '1' ? 'Tarif berhasil diaktifkan' : 'Tarif berhasil dinonaktifkan';

            return redirect()->back()->with('success', $message);

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal mengubah status tarif');
        }
    }

    /**
     * Remove the specified tarif from storage.
     */
    public function destroy(Request $request, $id)
    {
        $category = $request->input('category', 'rawat-jalan');

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
                    return redirect()->back()->with('error', 'Kategori tidak valid');
            }

            // Soft delete: set status = 0
            $tarif->update(['status' => '0']);

            return redirect()->back()->with('success', 'Tarif berhasil dinonaktifkan');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menonaktifkan tarif');
        }
    }

    /**
     * Generate kode otomatis berdasarkan kategori
     */
    public function generateKode(Request $request)
    {
        $kdKategori = $request->query('kd_kategori');
        $category = $request->query('category', 'rawat-jalan');

        if (! $kdKategori && $category !== 'laboratorium') {
            return response()->json([
                'success' => false,
                'message' => 'Kategori harus dipilih',
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
                case 'laboratorium':
                    // Kode pemeriksaan laboratorium tidak tergantung kd_kategori, gunakan prefix LA
                    $kode = JnsPerawatanLab::generateKodeJenisPerawatan();
                    break;
                default:
                    $kode = JnsPerawatan::generateKodeJenisPerawatan($kdKategori);
                    break;
            }

            return response()->json([
                'success' => true,
                'kode' => $kode,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal generate kode: '.$e->getMessage(),
            ]);
        }
    }

    // Placeholder methods for other categories
    public function storeRawatInap(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kd_jenis_prw' => 'required|string|max:15|unique:jns_perawatan_inap,kd_jenis_prw',
            'nm_perawatan' => 'required|string|max:80',
            'kd_kategori' => 'nullable|string|max:5',
            'material' => 'nullable|numeric|min:0',
            'bhp' => 'nullable|numeric|min:0',
            'tarif_tindakandr' => 'nullable|numeric|min:0',
            'tarif_tindakanpr' => 'nullable|numeric|min:0',
            'kso' => 'nullable|numeric|min:0',
            'menejemen' => 'nullable|numeric|min:0',
            'kd_pj' => 'required|string|max:3',
            'kd_bangsal' => 'required|string|max:5',
            'kelas' => 'required|string|max:20',
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

        // Set totals based on checkbox status - hanya simpan jika checkbox tercentang (true)
        $data['total_byrdr'] = (($data['show_total_dokter'] ?? false) === true) ? $calculatedTotalDr : 0;
        $data['total_byrpr'] = (($data['show_total_perawat'] ?? false) === true) ? $calculatedTotalPr : 0;
        $data['total_byrdrpr'] = (($data['show_total_dokter_perawat'] ?? false) === true) ? $calculatedTotalDrPr : 0;

        // Remove checkbox fields from data before saving
        unset($data['show_total_dokter'], $data['show_total_perawat'], $data['show_total_dokter_perawat']);
        unset($data['total_dr'], $data['total_pr'], $data['total_drpr']);
        unset($data['category']);

        // Add default status
        $data['status'] = '1'; // Default status aktif

        JnsPerawatanInap::create($data);

        return redirect()->route('daftar-tarif.index', ['category' => 'rawat-inap'])
            ->with('success', 'Tarif rawat inap berhasil ditambahkan');
    }

    private function storeLaboratorium(Request $request)
    {
        // Validasi sesuai struktur tabel jns_perawatan_lab
        $validator = Validator::make($request->all(), [
            'kd_jenis_prw' => 'required|string|max:15|unique:jns_perawatan_lab,kd_jenis_prw',
            'nm_perawatan' => 'required|string|max:80',
            // Komponen tarif
            'material' => 'nullable|numeric|min:0', // akan dipetakan ke bagian_rs
            'bhp' => 'required|numeric|min:0',
            'bagian_perujuk' => 'required|numeric|min:0', // akan dipetakan ke tarif_perujuk
            'tarif_tindakandr' => 'required|numeric|min:0', // dokter
            'tarif_tindakanpr' => 'nullable|numeric|min:0', // petugas
            'kso' => 'nullable|numeric|min:0',
            'menejemen' => 'nullable|numeric|min:0',
            // Relasi
            'kd_pj' => 'required|string|max:3',
            // Status dan enum
            'status' => 'nullable|in:0,1',
            'kelas' => 'required|string|in:-,Rawat Jalan,Kelas 1,Kelas 2,Kelas 3,Kelas Utama,Kelas VIP,Kelas VVIP',
            'kategori' => 'required|string|in:PK,PA,MB',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $request->all();

        // Pemetaan field frontend -> kolom database
        $bagian_rs = (float) ($data['material'] ?? 0);
        $bhp = (float) ($data['bhp'] ?? 0);
        $tarif_perujuk = (float) ($data['bagian_perujuk'] ?? 0);
        $tarif_tindakan_dokter = (float) ($data['tarif_tindakandr'] ?? 0);
        $tarif_tindakan_petugas = (float) ($data['tarif_tindakanpr'] ?? 0);
        $kso = (float) ($data['kso'] ?? 0);
        $menejemen = (float) ($data['menejemen'] ?? 0);

        // Hitung total biaya laboratorium
        $total_byr = $bagian_rs + $bhp + $tarif_perujuk + $tarif_tindakan_dokter + $tarif_tindakan_petugas + $kso + $menejemen;

        // Simpan ke tabel jns_perawatan_lab
        JnsPerawatanLab::create([
            'kd_jenis_prw' => $data['kd_jenis_prw'],
            'nm_perawatan' => $data['nm_perawatan'],
            'bagian_rs' => $bagian_rs,
            'bhp' => $bhp,
            'tarif_perujuk' => $tarif_perujuk,
            'tarif_tindakan_dokter' => $tarif_tindakan_dokter,
            'tarif_tindakan_petugas' => $tarif_tindakan_petugas,
            'kso' => $kso,
            'menejemen' => $menejemen,
            'total_byr' => $total_byr,
            'kd_pj' => $data['kd_pj'],
            'status' => $data['status'] ?? '1',
            'kelas' => $data['kelas'],
            'kategori' => $data['kategori'],
        ]);

        return redirect()->route('daftar-tarif.index', ['category' => 'laboratorium'])
            ->with('success', 'Tarif pemeriksaan laboratorium berhasil ditambahkan');
    }

    private function storeRadiologi(Request $request)
    { /* Implementation for radiologi */
    }

    private function updateRawatInap(Request $request, $id)
    {
        $jnsPerawatan = JnsPerawatanInap::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'kd_jenis_prw' => 'required|string|max:15|unique:jns_perawatan_inap,kd_jenis_prw,'.$id.',kd_jenis_prw',
            'nm_perawatan' => 'required|string|max:80',
            'kd_kategori' => 'nullable|string|max:5',
            'material' => 'nullable|numeric|min:0',
            'bhp' => 'nullable|numeric|min:0',
            'tarif_tindakandr' => 'nullable|numeric|min:0',
            'tarif_tindakanpr' => 'nullable|numeric|min:0',
            'kso' => 'nullable|numeric|min:0',
            'menejemen' => 'nullable|numeric|min:0',
            'kd_pj' => 'required|string|max:3',
            'kd_bangsal' => 'required|string|max:5',
            'kelas' => 'required|string|max:20',
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

        // Calculate actual totals based on checkbox status - hanya jika checkbox benar-benar tercentang (true)
        $total_byrdr = 0;
        $total_byrpr = 0;
        $total_byrdrpr = 0;

        if (($data['show_total_dokter'] ?? false) === true) {
            $total_byrdr = $material + $bhp + $tarif_tindakandr + $kso + $menejemen;
        }

        if (($data['show_total_perawat'] ?? false) === true) {
            $total_byrpr = $material + $bhp + $tarif_tindakanpr + $kso + $menejemen;
        }

        if (($data['show_total_dokter_perawat'] ?? false) === true) {
            $total_byrdrpr = $material + $bhp + $tarif_tindakandr + $tarif_tindakanpr + $kso + $menejemen;
        }

        // Remove checkbox fields before saving
        unset($data['show_total_dokter'], $data['show_total_perawat'], $data['show_total_dokter_perawat']);
        unset($data['total_dr'], $data['total_pr'], $data['total_drpr']);
        unset($data['category']);

        // Add calculated totals
        $data['total_byrdr'] = $total_byrdr;
        $data['total_byrpr'] = $total_byrpr;
        $data['total_byrdrpr'] = $total_byrdrpr;

        // Set status to '1' for updates (active status)
        $data['status'] = '1';

        $jnsPerawatan->update($data);

        return redirect()->route('daftar-tarif.index', ['category' => 'rawat-inap'])
            ->with('success', 'Tarif rawat inap berhasil diperbarui');
    }

    private function updateLaboratorium(Request $request, $id)
    { /* Implementation for laboratorium */
    }

    private function updateRadiologi(Request $request, $id)
    { /* Implementation for radiologi */
    }

    /**
     * Update template laboratorium rows for a given jenis perawatan.
     */
    public function updateLaboratoriumTemplates(Request $request, $kdJenisPrw)
    {
        // Validasi struktur rows
        $validator = Validator::make($request->all(), [
            'rows' => 'required|array|min:1',
            'rows.*.pemeriksaan' => 'required|string|max:255',
            'rows.*.bagian_rs' => 'required|numeric|min:0',
            'rows.*.bhp' => 'required|numeric|min:0',
            'rows.*.bagian_perujuk' => 'required|numeric|min:0',
            'rows.*.bagian_dokter' => 'required|numeric|min:0',
            'rows.*.bagian_laborat' => 'required|numeric|min:0',
            'rows.*.kso' => 'nullable|numeric|min:0',
            'rows.*.menejemen' => 'nullable|numeric|min:0',
            'rows.*.biaya_item' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return redirect()->back(303)
                ->withErrors($validator)
                ->withInput();
        }

        try {
            // Pastikan jenis perawatan ada
            $jns = \App\Models\JnsPerawatanLab::findOrFail($kdJenisPrw);

            // Hapus semua template lama untuk kd_jenis_prw ini, kemudian insert ulang berdasarkan urut
            \App\Models\TemplateLaboratorium::where('kd_jenis_prw', $kdJenisPrw)->delete();

            $rows = $request->input('rows', []);
            $urut = 1;
            foreach ($rows as $row) {
                \App\Models\TemplateLaboratorium::create([
                    'kd_jenis_prw' => $kdJenisPrw,
                    'Pemeriksaan' => $row['pemeriksaan'],
                    'satuan' => $row['satuan'] ?? null,
                    // Map nilai rujukan input (ld/la/pd/pa) ke kolom database yang sesuai
                    'nilai_rujukan_ld' => $row['ld'] ?? null,
                    'nilai_rujukan_la' => $row['la'] ?? null,
                    'nilai_rujukan_pd' => $row['pd'] ?? null,
                    'nilai_rujukan_pa' => $row['pa'] ?? null,
                    'bagian_rs' => $row['bagian_rs'] ?? 0,
                    'bhp' => $row['bhp'] ?? 0,
                    'bagian_perujuk' => $row['bagian_perujuk'] ?? 0,
                    'bagian_dokter' => $row['bagian_dokter'] ?? 0,
                    'bagian_laborat' => $row['bagian_laborat'] ?? 0,
                    'kso' => $row['kso'] ?? 0,
                    'menejemen' => $row['menejemen'] ?? 0,
                    'biaya_item' => $row['biaya_item'] ?? 0,
                    'urut' => $urut++,
                ]);
            }

            return redirect()->route('daftar-tarif.index', ['category' => 'laboratorium'], 303)
                ->with('success', 'Template laboratorium berhasil diperbarui');
        } catch (\Exception $e) {
            return redirect()->back(303)->with('error', 'Gagal memperbarui template laboratorium');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        try {
            // Determine category from request parameter
            $category = request()->query('category', 'rawat-jalan');

            if ($category === 'rawat-inap') {
                // For rawat-inap, use JnsPerawatanInap model
                $jnsPerawatan = JnsPerawatanInap::findOrFail($id);

                // Get data untuk form rawat-inap
                $bangsals = Bangsal::where('status', '1')->get();
                $penjaabs = Penjab::where('status', '1')->get();
                $kategoris = KategoriPerawatan::orderBy('kd_kategori', 'asc')->get();

                return Inertia::render('DaftarTarif/Edit', [
                    'jnsPerawatan' => $jnsPerawatan,
                    'bangsals' => $bangsals,
                    'penjaabs' => $penjaabs,
                    'kategoris' => $kategoris,
                    'category' => $category,
                ]);
            } else {
                // For rawat-jalan, use JnsPerawatan model
                $jnsPerawatan = JnsPerawatan::findOrFail($id);

                // Get data untuk form rawat-jalan
                $polikliniks = Poliklinik::where('status', '1')->get();
                $penjaabs = Penjab::where('status', '1')->get();
                $kategoris = KategoriPerawatan::orderBy('kd_kategori', 'asc')->get();

                return Inertia::render('DaftarTarif/Edit', [
                    'jnsPerawatan' => $jnsPerawatan,
                    'polikliniks' => $polikliniks,
                    'penjaabs' => $penjaabs,
                    'kategoris' => $kategoris,
                    'category' => $category,
                ]);
            }
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
            // Determine category from request or detect from existing data
            $category = $request->input('category', 'rawat-jalan');

            // If category is rawat-inap, use the specific update method
            if ($category === 'rawat-inap') {
                return $this->updateRawatInap($request, $id);
            }

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
                'status' => 'required|in:0,1',
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

            // Set total berdasarkan checkbox - hanya jika checkbox benar-benar tercentang (true)
            if (($data['show_total_dokter'] ?? false) === true) {
                // Total Dokter = Material + BHP + Tarif Tindakan Dokter + KSO + Menejemen (tanpa tarif perawat)
                $totalByrdr = $material + $bhp + $tarif_tindakandr + $kso + $menejemen;
            }

            if (($data['show_total_perawat'] ?? false) === true) {
                // Total Perawat = Material + BHP + Tarif Tindakan Perawat + KSO + Menejemen (tanpa tarif dokter)
                $totalByrpr = $material + $bhp + $tarif_tindakanpr + $kso + $menejemen;
            }

            if (($data['show_total_dokter_perawat'] ?? false) === true) {
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
                ->with('error', 'Gagal memperbarui data: '.$e->getMessage())
                ->withInput();
        }
    }
}
