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

    /**
     * Generate next kd_pj with prefix (default: 'A') following pattern PREFIX + 2 digits (e.g., A01).
     * Returns last_code (existing max), next_code (suggested), and last_number.
     */
    public function nextCode(Request $request): JsonResponse
    {
        $prefix = strtoupper($request->query('prefix', 'A'));

        // Ambil semua kd_pj yang dimulai dengan prefix
        $codes = Penjab::query()
            ->select('kd_pj')
            ->where('kd_pj', 'like', $prefix . '%')
            ->pluck('kd_pj');

        $lastNumber = 0;
        foreach ($codes as $code) {
            if (preg_match('/^' . preg_quote($prefix, '/') . '(\d{2})$/', $code, $m)) {
                $num = (int) $m[1];
                if ($num > $lastNumber) {
                    $lastNumber = $num;
                }
            }
        }

        $nextNumber = $lastNumber + 1;
        $lastCode = $lastNumber > 0
            ? $prefix . str_pad((string) $lastNumber, 2, '0', STR_PAD_LEFT)
            : null;
        $nextCode = $prefix . str_pad((string) $nextNumber, 2, '0', STR_PAD_LEFT);

        return response()->json([
            'prefix' => $prefix,
            'last_number' => $lastNumber,
            'last_code' => $lastCode,
            'next_code' => $nextCode,
        ], 200);
    }

    public function store(Request $request): JsonResponse
    {
        // Terima alamat dari frontend baik sebagai "alamat_asuransi" maupun "alamat_perusahaan",
        // lalu simpan sebagai "alamat_asuransi" sesuai dengan skema model/DB.
        $validated = $request->validate([
            'kd_pj' => ['required', 'string', 'max:10', 'unique:penjab,kd_pj'],
            'png_jawab' => ['required', 'string', 'max:100'],
            'nama_perusahaan' => ['required', 'string', 'max:150'],
            'alamat_asuransi' => ['required_without:alamat_perusahaan', 'string'],
            'alamat_perusahaan' => ['nullable', 'string'],
            'no_telp' => ['nullable', 'string', 'max:50'],
            'attn' => ['nullable', 'string', 'max:100'],
            'status' => ['required', Rule::in(['0', '1'])],
        ]);

        $alamat = $request->input('alamat_asuransi') ?? $request->input('alamat_perusahaan');

        $penjab = Penjab::create([
            'kd_pj' => $validated['kd_pj'],
            'png_jawab' => $validated['png_jawab'],
            'nama_perusahaan' => $validated['nama_perusahaan'],
            'alamat_asuransi' => $alamat,
            'no_telp' => $validated['no_telp'] ?? null,
            'attn' => $validated['attn'] ?? null,
            'status' => $validated['status'],
        ]);

        return response()->json([
            'message' => 'Penanggung Jawab berhasil dibuat',
            'data' => $penjab,
        ], 201);
    }
}
