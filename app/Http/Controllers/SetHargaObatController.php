<?php

namespace App\Http\Controllers;

use App\Models\SetPenjualanUmum;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class SetHargaObatController extends Controller
{
    /**
     * Display the settings page
     */
    public function index()
    {
        try {
            // Ambil data pengaturan harga obat
            $hargaObat = SetPenjualanUmum::first();
            
            if (!$hargaObat) {
                // Jika belum ada data, buat data default
                $hargaObat = SetPenjualanUmum::create([
                    'ralan' => 20,
                    'kelas1' => 20,
                    'kelas2' => 20,
                    'kelas3' => 20,
                    'utama' => 20,
                    'vip' => 20,
                    'vvip' => 20,
                    'beliluar' => 20,
                    'jualbebas' => 20,
                    'karyawan' => 20
                ]);
            }
            
            return Inertia::render('Settings/SetHargaObat', [
                'hargaObat' => $hargaObat
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Settings/SetHargaObat', [
                'error' => 'Terjadi kesalahan saat mengambil data: ' . $e->getMessage()
            ]);
        }
    }

    /**
     * Update the settings
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ralan' => 'required|numeric|min:0',
            'kelas1' => 'required|numeric|min:0',
            'kelas2' => 'required|numeric|min:0',
            'kelas3' => 'required|numeric|min:0',
            'utama' => 'required|numeric|min:0',
            'vip' => 'required|numeric|min:0',
            'vvip' => 'required|numeric|min:0',
            'beliluar' => 'required|numeric|min:0',
            'jualbebas' => 'required|numeric|min:0',
            'karyawan' => 'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator);
        }

        try {
            DB::beginTransaction();
            
            // Hapus data lama
            SetPenjualanUmum::query()->delete();
            
            // Buat data baru
            SetPenjualanUmum::create($request->all());
            
            DB::commit();
            
            return redirect()->back()->with('success', 'Pengaturan harga obat berhasil disimpan');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    /**
     * Get percentage data for API
     */
    public function getPercentageData()
    {
        try {
            $hargaObat = SetPenjualanUmum::first();
            
            if (!$hargaObat) {
                // Jika belum ada data, buat data default
                $hargaObat = SetPenjualanUmum::create([
                    'ralan' => 20,
                    'kelas1' => 20,
                    'kelas2' => 20,
                    'kelas3' => 20,
                    'utama' => 20,
                    'vip' => 20,
                    'vvip' => 20,
                    'beliluar' => 20,
                    'jualbebas' => 20,
                    'karyawan' => 20
                ]);
            }
            
            return response()->json([
                'success' => true,
                'data' => $hargaObat
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat mengambil data: ' . $e->getMessage()
            ], 500);
        }
    }
}