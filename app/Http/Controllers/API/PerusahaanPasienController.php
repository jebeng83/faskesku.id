<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Pasien\PerusahaanPasien;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PerusahaanPasienController extends Controller
{
    public function nextCode(Request $request): JsonResponse
    {
        try {
            $prefix = 'I';

            $codes = PerusahaanPasien::query()
                ->select('kode_perusahaan')
                ->where('kode_perusahaan', 'like', $prefix.'%')
                ->pluck('kode_perusahaan');

            $lastNumber = 0;
            foreach ($codes as $code) {
                if (preg_match('/^'.preg_quote($prefix, '/').'\d{4}$/', $code)) {
                    $num = (int) substr($code, 1);
                    if ($num > $lastNumber) {
                        $lastNumber = $num;
                    }
                }
            }

            $nextNumber = $lastNumber + 1;
            $lastCode = $lastNumber > 0
                ? $prefix . str_pad((string) $lastNumber, 4, '0', STR_PAD_LEFT)
                : null;
            $nextCode = $prefix . str_pad((string) $nextNumber, 4, '0', STR_PAD_LEFT);

            return response()->json([
                'success' => true,
                'prefix' => $prefix,
                'last_number' => $lastNumber,
                'last_code' => $lastCode,
                'next_code' => $nextCode,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil kode perusahaan: ' . $e->getMessage()
            ], 500);
        }
    }
}
