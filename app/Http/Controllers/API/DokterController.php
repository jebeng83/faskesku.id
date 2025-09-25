<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Dokter;
use Illuminate\Http\Request;

class DokterController extends Controller
{
    /**
     * Mendapatkan daftar dokter aktif
     */
    public function index(Request $request)
    {
        try {
            $query = Dokter::aktif();
            
            // Filter berdasarkan pencarian nama dokter
            if ($request->has('search') && !empty($request->search)) {
                $search = $request->search;
                $query->where('nm_dokter', 'LIKE', "%{$search}%");
            }
            
            // Ambil data dengan pagination atau semua data
            if ($request->has('per_page')) {
                $dokters = $query->select('kd_dokter', 'nm_dokter')
                    ->orderBy('nm_dokter')
                    ->paginate($request->per_page);
            } else {
                $dokters = $query->select('kd_dokter', 'nm_dokter')
                    ->orderBy('nm_dokter')
                    ->get();
            }
            
            return response()->json([
                'success' => true,
                'data' => $dokters,
                'message' => 'Data dokter berhasil diambil'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Mendapatkan detail dokter berdasarkan kode
     */
    public function show($kd_dokter)
    {
        try {
            $dokter = Dokter::where('kd_dokter', $kd_dokter)
                ->aktif()
                ->first();
                
            if (!$dokter) {
                return response()->json([
                    'success' => false,
                    'message' => 'Dokter tidak ditemukan'
                ], 404);
            }
            
            return response()->json([
                'success' => true,
                'data' => $dokter,
                'message' => 'Detail dokter berhasil diambil'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }
}