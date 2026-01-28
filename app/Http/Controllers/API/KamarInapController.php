<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KamarInapController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'no_rawat' => 'required|string|exists:reg_periksa,no_rawat',
                'kd_kamar' => 'required|string|exists:kamar,kd_kamar',
                'diagnosa_awal' => 'required|string|max:100',
            ]);

            $noRawat = $validated['no_rawat'];
            $kdKamar = $validated['kd_kamar'];
            $diagnosaAwal = $validated['diagnosa_awal'];

            $room = DB::table('kamar')->where('kd_kamar', $kdKamar)->first();
            if (! $room) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kamar tidak ditemukan',
                ], 404);
            }
            if (strtoupper((string) ($room->status ?? '')) !== 'KOSONG') {
                return response()->json([
                    'success' => false,
                    'message' => 'Kamar tidak kosong',
                    'errors' => ['kd_kamar' => ['Kamar tidak kosong']],
                ], 422);
            }

            $nowDate = date('Y-m-d');
            $nowTime = date('H:i:s');

            DB::beginTransaction();
            DB::table('kamar_inap')->insert([
                'no_rawat' => $noRawat,
                'kd_kamar' => $kdKamar,
                'trf_kamar' => (double) ($room->trf_kamar ?? 0),
                'diagnosa_awal' => $diagnosaAwal,
                'diagnosa_akhir' => '-',
                'tgl_masuk' => $nowDate,
                'jam_masuk' => $nowTime,
                'tgl_keluar' => null,
                'jam_keluar' => null,
                'lama' => 0,
                'ttl_biaya' => 0,
                'stts_pulang' => '-',
            ]);

            DB::table('reg_periksa')->where('no_rawat', $noRawat)->update([
                'status_lanjut' => 'Ranap',
                'keputusan' => 'CHECK-IN',
            ]);

            DB::table('kamar')->where('kd_kamar', $kdKamar)->update([
                'status' => 'ISI',
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => [
                    'no_rawat' => $noRawat,
                    'kd_kamar' => $kdKamar,
                    'tgl_masuk' => $nowDate,
                    'jam_masuk' => $nowTime,
                ],
                'message' => 'Pasien berhasil masuk kamar inap',
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal melakukan check in: '.$e->getMessage(),
            ], 500);
        }
    }
}

