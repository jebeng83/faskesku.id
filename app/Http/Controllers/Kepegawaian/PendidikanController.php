<?php

namespace App\Http\Controllers\Kepegawaian;

use App\Http\Controllers\Controller;
use App\Models\Kepegawaian\Pendidikan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PendidikanController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tingkat' => 'required|string|max:80|unique:pendidikan,tingkat',
            'indek' => 'nullable|integer',
            'gapok1' => 'nullable|numeric',
            'kenaikan' => 'nullable|numeric',
            'maksimal' => 'nullable|integer',
        ], [
            'tingkat.required' => 'Tingkat Pendidikan harus diisi',
            'tingkat.unique' => 'Tingkat Pendidikan sudah digunakan',
            'tingkat.max' => 'Tingkat Pendidikan maksimal 80 karakter',
            'indek.integer' => 'Indek harus berupa angka',
            'gapok1.numeric' => 'Gaji Pokok harus berupa angka',
            'kenaikan.numeric' => 'Kenaikan harus berupa angka',
            'maksimal.integer' => 'Maksimal harus berupa angka',
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

        $pendidikan = Pendidikan::create($data);

        // Untuk request dari Inertia, return redirect back dengan success message
        if ($request->header('X-Inertia')) {
            return redirect()->back()
                ->with('success', 'Data Pendidikan berhasil ditambahkan.')
                ->with('pendidikanCreated', [
                    'tingkat' => $pendidikan->tingkat,
                ]);
        }

        // Untuk request JSON biasa (non-Inertia)
        if ($request->expectsJson() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Data Pendidikan berhasil ditambahkan.',
                'data' => $pendidikan,
            ], 201);
        }

        return redirect()->back()
            ->with('success', 'Data Pendidikan berhasil ditambahkan.');
    }
}
