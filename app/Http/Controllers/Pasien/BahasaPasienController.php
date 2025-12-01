<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Models\Pasien\BahasaPasien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BahasaPasienController extends Controller
{
    public function store(Request $request)
    {
        // Validasi
        $validator = Validator::make($request->all(), [
            'nama_bahasa' => 'required|string|max:30|unique:bahasa_pasien,nama_bahasa',
        ], [
            'nama_bahasa.required' => 'Nama Bahasa harus diisi',
            'nama_bahasa.unique' => 'Nama Bahasa sudah digunakan',
            'nama_bahasa.max' => 'Nama Bahasa maksimal 30 karakter',
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
        $bahasaPasien = BahasaPasien::create($data);

        // Return response untuk Inertia
        if ($request->header('X-Inertia')) {
            return redirect()->back()
                ->with('success', 'Data Bahasa Pasien berhasil ditambahkan.')
                ->with('bahasaPasienCreated', [
                    'id' => $bahasaPasien->id,
                    'nama_bahasa' => $bahasaPasien->nama_bahasa,
                ]);
        }

        // Return response untuk JSON biasa
        if ($request->expectsJson() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Data Bahasa Pasien berhasil ditambahkan.',
                'data' => $bahasaPasien,
            ], 201);
        }

        // Default redirect
        return redirect()->route('bahasa-pasien.index')
            ->with('success', 'Data Bahasa Pasien berhasil ditambahkan.');
    }
}
