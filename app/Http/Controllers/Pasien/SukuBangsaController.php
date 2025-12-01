<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Models\Pasien\SukuBangsa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SukuBangsaController extends Controller
{
    public function store(Request $request)
    {
        // Validasi
        $validator = Validator::make($request->all(), [
            'nama_suku_bangsa' => 'required|string|max:30|unique:suku_bangsa,nama_suku_bangsa',
        ], [
            'nama_suku_bangsa.required' => 'Nama Suku Bangsa harus diisi',
            'nama_suku_bangsa.unique' => 'Nama Suku Bangsa sudah digunakan',
            'nama_suku_bangsa.max' => 'Nama Suku Bangsa maksimal 30 karakter',
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
        $sukuBangsa = SukuBangsa::create($data);

        // Return response untuk Inertia
        if ($request->header('X-Inertia')) {
            return redirect()->back()
                ->with('success', 'Data Suku Bangsa berhasil ditambahkan.')
                ->with('sukuBangsaCreated', [
                    'id' => $sukuBangsa->id,
                    'nama_suku_bangsa' => $sukuBangsa->nama_suku_bangsa,
                ]);
        }

        // Return response untuk JSON biasa
        if ($request->expectsJson() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Data Suku Bangsa berhasil ditambahkan.',
                'data' => $sukuBangsa,
            ], 201);
        }

        // Default redirect
        return redirect()->route('suku-bangsa.index')
            ->with('success', 'Data Suku Bangsa berhasil ditambahkan.');
    }
}
