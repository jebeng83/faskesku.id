<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Models\Pasien\CacatFisik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CacatFisikController extends Controller
{
    public function store(Request $request)
    {
        // Validasi
        $validator = Validator::make($request->all(), [
            'nama_cacat' => 'required|string|max:30|unique:cacat_fisik,nama_cacat',
        ], [
            'nama_cacat.required' => 'Nama Cacat Fisik harus diisi',
            'nama_cacat.unique' => 'Nama Cacat Fisik sudah digunakan',
            'nama_cacat.max' => 'Nama Cacat Fisik maksimal 30 karakter',
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
        $cacatFisik = CacatFisik::create($data);

        // Return response untuk Inertia
        if ($request->header('X-Inertia')) {
            return redirect()->back()
                ->with('success', 'Data Cacat Fisik berhasil ditambahkan.')
                ->with('cacatFisikCreated', [
                    'id' => $cacatFisik->id,
                    'nama_cacat' => $cacatFisik->nama_cacat,
                ]);
        }

        // Return response untuk JSON biasa
        if ($request->expectsJson() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Data Cacat Fisik berhasil ditambahkan.',
                'data' => $cacatFisik,
            ], 201);
        }

        // Default redirect
        return redirect()->route('cacat-fisik.index')
            ->with('success', 'Data Cacat Fisik berhasil ditambahkan.');
    }
}
