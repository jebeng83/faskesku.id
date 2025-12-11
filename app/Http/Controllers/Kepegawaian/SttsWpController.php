<?php

namespace App\Http\Controllers\Kepegawaian;

use App\Http\Controllers\Controller;
use App\Models\Kepegawaian\SttsWp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SttsWpController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'stts' => 'required|string|max:5|unique:stts_wp,stts',
            'ktg' => 'nullable|string|max:50',
        ], [
            'stts.required' => 'Status WP harus diisi',
            'stts.unique' => 'Status WP sudah digunakan',
            'stts.max' => 'Status WP maksimal 5 karakter',
            'ktg.max' => 'Kategori maksimal 50 karakter',
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

        $sttsWp = SttsWp::create($data);

        // Untuk request dari Inertia, return redirect back dengan success message
        if ($request->header('X-Inertia')) {
            return redirect()->back()
                ->with('success', 'Data Status WP berhasil ditambahkan.')
                ->with('sttsWpCreated', [
                    'stts' => $sttsWp->stts,
                ]);
        }

        // Untuk request JSON biasa (non-Inertia)
        if ($request->expectsJson() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Data Status WP berhasil ditambahkan.',
                'data' => $sttsWp,
            ], 201);
        }

        return redirect()->back()
            ->with('success', 'Data Status WP berhasil ditambahkan.');
    }
}
