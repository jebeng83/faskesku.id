<?php

namespace App\Http\Controllers\Kepegawaian;

use App\Http\Controllers\Controller;
use App\Models\Kepegawaian\Bidang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BidangController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:15|unique:bidang,nama',
        ], [
            'nama.required' => 'Nama Bidang harus diisi',
            'nama.unique' => 'Nama Bidang sudah digunakan',
            'nama.max' => 'Nama Bidang maksimal 15 karakter',
        ]);

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

        $data = $validator->validated();

        $bidang = Bidang::create($data);

        // Untuk request dari Inertia, return redirect back dengan success message
        if ($request->header('X-Inertia')) {
            return redirect()->back()
                ->with('success', 'Data Bidang berhasil ditambahkan.')
                ->with('bidangCreated', [
                    'nama' => $bidang->nama,
                ]);
        }

        // Untuk request JSON biasa (non-Inertia)
        if ($request->expectsJson() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Data Bidang berhasil ditambahkan.',
                'data' => $bidang,
            ], 201);
        }

        return redirect()->back()
            ->with('success', 'Data Bidang berhasil ditambahkan.');
    }
}
