<?php

namespace App\Http\Controllers\Kepegawaian;

use App\Http\Controllers\Controller;
use App\Models\Kepegawaian\EmergencyIndex;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmergencyIndexController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kode_emergency' => 'required|string|max:3|unique:emergency_index,kode_emergency',
            'nama_emergency' => 'required|string|max:100',
            'indek' => 'nullable|integer',
        ], [
            'kode_emergency.required' => 'Kode Emergency harus diisi',
            'kode_emergency.unique' => 'Kode Emergency sudah digunakan',
            'kode_emergency.max' => 'Kode Emergency maksimal 3 karakter',
            'nama_emergency.required' => 'Nama Emergency harus diisi',
            'nama_emergency.max' => 'Nama Emergency maksimal 100 karakter',
            'indek.integer' => 'Indek harus berupa angka',
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

        $emergencyIndex = EmergencyIndex::create($data);

        // Untuk request dari Inertia, return redirect back dengan success message
        if ($request->header('X-Inertia')) {
            return redirect()->back()
                ->with('success', 'Data Emergency Index berhasil ditambahkan.')
                ->with('emergencyIndexCreated', [
                    'kode_emergency' => $emergencyIndex->kode_emergency,
                ]);
        }

        // Untuk request JSON biasa (non-Inertia)
        if ($request->expectsJson() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Data Emergency Index berhasil ditambahkan.',
                'data' => $emergencyIndex,
            ], 201);
        }

        return redirect()->back()
            ->with('success', 'Data Emergency Index berhasil ditambahkan.');
    }
}
