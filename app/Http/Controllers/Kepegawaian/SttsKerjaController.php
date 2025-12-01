<?php

namespace App\Http\Controllers\Kepegawaian;

use App\Http\Controllers\Controller;
use App\Models\Kepegawaian\SttsKerja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SttsKerjaController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'stts' => 'required|string|max:3|unique:stts_kerja,stts',
            'ktg' => 'nullable|string|max:20',
            'indek' => 'nullable|integer',
            'hakcuti' => 'nullable|integer',
        ], [
            'stts.required' => 'Status Kerja harus diisi',
            'stts.unique' => 'Status Kerja sudah digunakan',
            'stts.max' => 'Status Kerja maksimal 3 karakter',
            'ktg.max' => 'Kategori maksimal 20 karakter',
            'indek.integer' => 'Indek harus berupa angka',
            'hakcuti.integer' => 'Hak Cuti harus berupa angka',
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

        $sttsKerja = SttsKerja::create($data);

        // Untuk request dari Inertia, return redirect back dengan success message
        if ($request->header('X-Inertia')) {
            return redirect()->back()
                ->with('success', 'Data Status Kerja berhasil ditambahkan.')
                ->with('sttsKerjaCreated', [
                    'stts' => $sttsKerja->stts,
                ]);
        }

        // Untuk request JSON biasa (non-Inertia)
        if ($request->expectsJson() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Data Status Kerja berhasil ditambahkan.',
                'data' => $sttsKerja,
            ], 201);
        }

        return redirect()->back()
            ->with('success', 'Data Status Kerja berhasil ditambahkan.');
    }
}
