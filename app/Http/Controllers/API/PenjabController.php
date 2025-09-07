<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Penjab;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class PenjabController extends Controller
{
    public function index(): JsonResponse
    {
        $penjab = Penjab::where('status', '1')
            ->orderBy('png_jawab')
            ->get(['kd_pj', 'png_jawab']);

        return response()->json([
            'data' => $penjab,
        ], 200);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'kd_pj' => ['required', 'string', 'max:10', 'unique:penjab,kd_pj'],
            'png_jawab' => ['required', 'string', 'max:50'],
            'nama_perusahaan' => ['required', 'string', 'max:100'],
            'alamat_perusahaan' => ['required', 'string'],
            'no_telp' => ['nullable', 'string', 'max:20'],
            'attn' => ['nullable', 'string', 'max:50'],
            'status' => ['required', Rule::in(['0', '1'])],
        ]);

        $penjab = Penjab::create($validated);

        return response()->json([
            'message' => 'Penanggung Jawab berhasil dibuat',
            'data' => $penjab,
        ], 201);
    }
}
