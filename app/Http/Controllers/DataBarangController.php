<?php

namespace App\Http\Controllers;

use App\Models\DataBarang;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class DataBarangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = DataBarang::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Pagination
        $dataBarang = $query->orderBy('kode_brng', 'desc')
                           ->paginate(10)
                           ->withQueryString();

        return Inertia::render('farmasi/dataobat', [
            'dataBarang' => $dataBarang,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kode_brng' => 'required|string|max:15|unique:databarang,kode_brng',
            'nama_brng' => 'required|string|max:80',
            'kode_sat' => 'required|string|max:4',
            'kode_satbesar' => 'nullable|string|max:4',
            'letak_barang' => 'nullable|string|max:50',
            'dasar' => 'nullable|string|max:100',
            'h_beli' => 'nullable|numeric|min:0',
            'ralan' => 'nullable|numeric|min:0',
            'kelas1' => 'nullable|numeric|min:0',
            'kelas2' => 'nullable|numeric|min:0',
            'kelas3' => 'nullable|numeric|min:0',
            'utama' => 'nullable|numeric|min:0',
            'vip' => 'nullable|numeric|min:0',
            'vvip' => 'nullable|numeric|min:0',
            'beliluar' => 'nullable|numeric|min:0',
            'jualbebas' => 'nullable|numeric|min:0',
            'karyawan' => 'nullable|numeric|min:0',
            'stokminimal' => 'nullable|integer|min:0',
            'kdjns' => 'nullable|string|max:4',
            'kapasitas' => 'nullable|integer|min:0',
            'expire' => 'nullable|date',
            'status' => 'nullable|string|max:1',
            'kode_industri' => 'nullable|string|max:5',
            'kode_kategori' => 'nullable|string|max:4',
            'kode_golongan' => 'nullable|string|max:4',
            'kemasan' => 'nullable|string|max:50',
            'bahan' => 'nullable|string|max:100',
            'officetarif' => 'nullable|numeric|min:0',
            'tipesarana' => 'nullable|string|max:2',
            'kode_ralan' => 'nullable|string|max:4',
            'bpjs' => 'nullable|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();
        
        // Set default values
        $data['status'] = $data['status'] ?? '1';
        $data['stokminimal'] = $data['stokminimal'] ?? 0;
        $data['kapasitas'] = $data['kapasitas'] ?? 0;

        DataBarang::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Data obat berhasil ditambahkan'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($kode_brng)
    {
        $dataBarang = DataBarang::findOrFail($kode_brng);
        
        return response()->json([
            'success' => true,
            'data' => $dataBarang
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $kode_brng)
    {
        $dataBarang = DataBarang::findOrFail($kode_brng);

        $validator = Validator::make($request->all(), [
            'nama_brng' => 'required|string|max:80',
            'kode_sat' => 'required|string|max:4',
            'kode_satbesar' => 'nullable|string|max:4',
            'letak_barang' => 'nullable|string|max:50',
            'dasar' => 'nullable|string|max:100',
            'h_beli' => 'nullable|numeric|min:0',
            'ralan' => 'nullable|numeric|min:0',
            'kelas1' => 'nullable|numeric|min:0',
            'kelas2' => 'nullable|numeric|min:0',
            'kelas3' => 'nullable|numeric|min:0',
            'utama' => 'nullable|numeric|min:0',
            'vip' => 'nullable|numeric|min:0',
            'vvip' => 'nullable|numeric|min:0',
            'beliluar' => 'nullable|numeric|min:0',
            'jualbebas' => 'nullable|numeric|min:0',
            'karyawan' => 'nullable|numeric|min:0',
            'stokminimal' => 'nullable|integer|min:0',
            'kdjns' => 'nullable|string|max:4',
            'kapasitas' => 'nullable|integer|min:0',
            'expire' => 'nullable|date',
            'status' => 'nullable|string|max:1',
            'kode_industri' => 'nullable|string|max:5',
            'kode_kategori' => 'nullable|string|max:4',
            'kode_golongan' => 'nullable|string|max:4',
            'kemasan' => 'nullable|string|max:50',
            'bahan' => 'nullable|string|max:100',
            'officetarif' => 'nullable|numeric|min:0',
            'tipesarana' => 'nullable|string|max:2',
            'kode_ralan' => 'nullable|string|max:4',
            'bpjs' => 'nullable|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();
        
        // Set default values
        $data['status'] = $data['status'] ?? '1';
        $data['stokminimal'] = $data['stokminimal'] ?? 0;
        $data['kapasitas'] = $data['kapasitas'] ?? 0;

        $dataBarang->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Data obat berhasil diperbarui'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($kode_brng)
    {
        $dataBarang = DataBarang::findOrFail($kode_brng);
        $dataBarang->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data obat berhasil dihapus'
        ]);
    }
}
