<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class DokterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Dokter::query();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kd_dokter', 'like', "%{$search}%")
                  ->orWhere('nm_dokter', 'like', "%{$search}%")
                  ->orWhere('no_telp', 'like', "%{$search}%")
                  ->orWhere('alumni', 'like', "%{$search}%")
                  ->orWhere('no_ijn_praktek', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by gender
        if ($request->filled('jk')) {
            $query->where('jk', $request->jk);
        }

        // Filter by marital status
        if ($request->filled('stts_nikah')) {
            $query->where('stts_nikah', $request->stts_nikah);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'kd_dokter');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        $dokters = $query->paginate(10)->withQueryString();

        return Inertia::render('Dokter/Index', [
            'title' => 'Data Dokter',
            'dokters' => $dokters,
            'filters' => $request->only(['search', 'status', 'jk', 'stts_nikah']),
            'statusOptions' => [
                '1' => 'Aktif',
                '0' => 'Tidak Aktif'
            ],
            'genderOptions' => [
                'L' => 'Laki-laki',
                'P' => 'Perempuan'
            ],
            'maritalStatusOptions' => [
                'Belum Menikah' => 'Belum Menikah',
                'Menikah' => 'Menikah',
                'Cerai Hidup' => 'Cerai Hidup',
                'Cerai Mati' => 'Cerai Mati'
            ],
            'bloodTypeOptions' => [
                'A' => 'A',
                'B' => 'B',
                'AB' => 'AB',
                'O' => 'O'
            ],
            'religionOptions' => [
                'Islam' => 'Islam',
                'Kristen' => 'Kristen',
                'Katolik' => 'Katolik',
                'Hindu' => 'Hindu',
                'Buddha' => 'Buddha',
                'Konghucu' => 'Konghucu'
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kd_dokter' => 'required|string|max:20|unique:dokter,kd_dokter',
            'nm_dokter' => 'required|string|max:50',
            'jk' => 'required|in:L,P',
            'tmp_lahir' => 'required|string|max:20',
            'tgl_lahir' => 'required|date',
            'gol_drh' => 'required|in:A,B,AB,O',
            'agama' => 'required|string|max:12',
            'almt_tgl' => 'required|string|max:60',
            'no_telp' => 'required|string|max:13',
            'email' => 'nullable|email|max:70|unique:dokter,email',
            'stts_nikah' => 'required|in:Belum Menikah,Menikah,Cerai Hidup,Cerai Mati',
            'kd_sps' => 'nullable|string|max:5',
            'alumni' => 'nullable|string|max:60',
            'no_ijn_praktek' => 'nullable|string|max:120',
            'status' => 'required|in:0,1'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            Dokter::create($request->all());

            return redirect()->route('dokter.index')->with('success', 'Data dokter berhasil ditambahkan.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Dokter $dokter)
    {
        // Load relationships
        $dokter->load(['regPeriksas' => function ($query) {
            $query->with(['pasien', 'poliklinik'])
                ->orderBy('tgl_registrasi', 'desc')
                ->limit(10);
        }]);

        return Inertia::render('Dokter/Show', [
            'title' => 'Detail Dokter',
            'dokter' => $dokter,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dokter $dokter)
    {
        $validator = Validator::make($request->all(), [
            'kd_dokter' => [
                'required',
                'string',
                'max:20',
                Rule::unique('dokter', 'kd_dokter')->ignore($dokter->kd_dokter, 'kd_dokter')
            ],
            'nm_dokter' => 'required|string|max:50',
            'jk' => 'required|in:L,P',
            'tmp_lahir' => 'required|string|max:20',
            'tgl_lahir' => 'required|date',
            'gol_drh' => 'required|in:A,B,AB,O',
            'agama' => 'required|string|max:12',
            'almt_tgl' => 'required|string|max:60',
            'no_telp' => 'required|string|max:13',
            'email' => [
                'nullable',
                'email',
                'max:70',
                Rule::unique('dokter', 'email')->ignore($dokter->kd_dokter, 'kd_dokter')
            ],
            'stts_nikah' => 'required|in:Belum Menikah,Menikah,Cerai Hidup,Cerai Mati',
            'kd_sps' => 'nullable|string|max:5',
            'alumni' => 'nullable|string|max:60',
            'no_ijn_praktek' => 'nullable|string|max:120',
            'status' => 'required|in:0,1'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            $dokter->update($request->all());

            return redirect()->route('dokter.index')->with('success', 'Data dokter berhasil diperbarui.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Terjadi kesalahan saat memperbarui data: ' . $e->getMessage()])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dokter $dokter)
    {
        try {
            // Check if dokter has related records
            $hasRegPeriksa = $dokter->regPeriksas()->exists();
            
            if ($hasRegPeriksa) {
                return back()->withErrors(['error' => 'Dokter tidak dapat dihapus karena masih memiliki data registrasi periksa.']);
            }

            $dokter->delete();

            return redirect()->route('dokter.index')->with('success', 'Data dokter berhasil dihapus.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Terjadi kesalahan saat menghapus data: ' . $e->getMessage()]);
        }
    }

    /**
     * Toggle status dokter
     */
    public function toggleStatus(Dokter $dokter)
    {
        try {
            $newStatus = $dokter->status === '1' ? '0' : '1';
            $dokter->update(['status' => $newStatus]);

            $statusText = $newStatus === '1' ? 'diaktifkan' : 'dinonaktifkan';
            
            return back()->with('success', "Status dokter berhasil {$statusText}.");
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Terjadi kesalahan saat mengubah status: ' . $e->getMessage()]);
        }
    }

    /**
     * Get dokters for select options
     */
    public function getDokters(Request $request)
    {
        $query = Dokter::select('kd_dokter', 'nm_dokter', 'status');

        // Filter only active doctors if requested
        if ($request->boolean('active_only')) {
            $query->where('status', '1');
        }

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kd_dokter', 'like', "%{$search}%")
                  ->orWhere('nm_dokter', 'like', "%{$search}%");
            });
        }

        $dokters = $query->orderBy('nm_dokter')->get();

        return response()->json($dokters);
    }

    /**
     * Get next doctor code
     */
    public function getNextCode()
    {
        $lastDokter = Dokter::orderBy('kd_dokter', 'desc')->first();
        
        if (!$lastDokter) {
            $nextCode = 'D001';
        } else {
            $lastNumber = (int) substr($lastDokter->kd_dokter, 1);
            $nextNumber = $lastNumber + 1;
            $nextCode = 'D' . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);
        }

        return response()->json(['next_code' => $nextCode]);
    }
}