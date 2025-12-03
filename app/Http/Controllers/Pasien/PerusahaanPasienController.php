<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Models\Pasien\PerusahaanPasien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PerusahaanPasienController extends Controller
{
    public function store(Request $request)
    {
        // Validasi
        $validator = Validator::make($request->all(), [
            'kode_perusahaan' => 'required|string|max:8|unique:perusahaan_pasien,kode_perusahaan',
            'nama_perusahaan' => 'required|string|max:70',
            'alamat' => 'nullable|string|max:100',
            'kota' => 'nullable|string|max:40',
            'no_telp' => 'nullable|string|max:27',
        ], [
            'kode_perusahaan.required' => 'Kode Perusahaan harus diisi',
            'kode_perusahaan.unique' => 'Kode Perusahaan sudah digunakan',
            'kode_perusahaan.max' => 'Kode Perusahaan maksimal 8 karakter',
            'nama_perusahaan.required' => 'Nama Perusahaan harus diisi',
            'nama_perusahaan.max' => 'Nama Perusahaan maksimal 70 karakter',
            'alamat.max' => 'Alamat maksimal 100 karakter',
            'kota.max' => 'Kota maksimal 40 karakter',
            'no_telp.max' => 'No. Telepon maksimal 27 karakter',
        ]);

        // Handle error validasi
        if ($validator->fails()) {
            // Untuk request dari Inertia, return redirect back dengan errors
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

        // Simpan data
        $data = $validator->validated();
        $perusahaanPasien = PerusahaanPasien::create($data);

        // Return response untuk Inertia
        if ($request->header('X-Inertia')) {
            return redirect()->back()
                ->with('success', 'Data Perusahaan Pasien berhasil ditambahkan.')
                ->with('perusahaanPasienCreated', [
                    'kode_perusahaan' => $perusahaanPasien->kode_perusahaan,
                    'nama_perusahaan' => $perusahaanPasien->nama_perusahaan,
                ]);
        }

        // Return response untuk JSON biasa
        if ($request->expectsJson() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Data Perusahaan Pasien berhasil ditambahkan.',
                'data' => $perusahaanPasien,
            ], 201);
        }

        // Default redirect
        return redirect()->route('perusahaan-pasien.index')
            ->with('success', 'Data Perusahaan Pasien berhasil ditambahkan.');
    }
}
