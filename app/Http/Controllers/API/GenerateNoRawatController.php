<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\RegPeriksa;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class GenerateNoRawatController extends Controller
{
    /**
     * Generate nomor rawat atau nomor registrasi
     */
    public function generateNoRawat(Request $request): JsonResponse
    {
        $request->validate([
            'tanggal' => 'required|date',
            'type' => 'required|in:no_rawat,no_reg',
            'kd_dokter' => 'required_if:type,no_reg|string',
            'kd_poli' => 'nullable|string',
            'urutnoreg' => 'nullable|in:poli,dokter,dokter + poli'
        ]);

        try {
            $tanggal = $request->tanggal;
            $type = $request->type;
            $kdDokter = $request->kd_dokter;
            $kdPoli = $request->kd_poli;
            $urutNoReg = $request->urutnoreg ?? env('URUT_NO_REG', 'dokter + poli'); // Ambil dari environment variable

            // Optimized cache lock with shorter timeout to prevent long waits
            $lockKey = "generate_{$type}_{$tanggal}" . ($type === 'no_reg' ? "_{$kdDokter}_{$kdPoli}" : '');
            
            return cache()->lock($lockKey, 3)->block(2, function () use ($tanggal, $type, $kdDokter, $kdPoli, $urutNoReg) {
                return DB::transaction(function () use ($tanggal, $type, $kdDokter, $kdPoli, $urutNoReg) {
                    $result = [];

                    if ($type === 'no_rawat') {
                        // Generate no_rawat: format YYYY/MM/DD/NNNNNN
                        $noRawat = $this->generateNoRawatNumber($tanggal);
                        $result['no_rawat'] = $noRawat;
                    } else if ($type === 'no_reg') {
                        // Generate no_reg: format NNN berdasarkan URUTNOREG logic
                        $noReg = RegPeriksa::generateNoReg($kdDokter, $kdPoli, $tanggal, $urutNoReg);
                        $result['no_reg'] = $noReg;
                    }

                    return response()->json([
                        'success' => true,
                        'data' => $result,
                        'message' => 'Nomor rawat berhasil digenerate'
                    ]);
                });
            });

        } catch (\Illuminate\Contracts\Cache\LockTimeoutException $e) {
            Log::error('Lock timeout when generating no_rawat: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server sedang sibuk, silakan coba lagi dalam beberapa detik'
            ], 503);
        } catch (\Exception $e) {
            Log::error('Error generating no_rawat: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal generate nomor rawat: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generate nomor rawat dengan format YYYY/MM/DD/NNNNNN
     * Menggunakan logika Java: MAX(CONVERT(RIGHT(reg_periksa.no_rawat,6),signed))
     */
    private function generateNoRawatNumber($tanggal, $kdDokter = null, $kdPoli = null)
    {
        // Determine the type
        $type = ($kdDokter && $kdPoli) ? 'no_reg' : 'no_rawat';
        
        if ($type === 'no_rawat') {
            // Format tanggal menjadi Y/m/d untuk nomor rawat
            $today = Carbon::parse($tanggal)->format('Y/m/d');
            
            return DB::transaction(function () use ($tanggal, $today) {
                // Menggunakan logika Java: MAX(CONVERT(RIGHT(reg_periksa.no_rawat,6),signed))
                // Query untuk mendapatkan nomor maksimal pada tanggal tertentu
                $maxNumber = DB::selectOne("
                    SELECT IFNULL(MAX(CONVERT(RIGHT(reg_periksa.no_rawat,6), SIGNED)), 0) as max_number 
                    FROM reg_periksa 
                    WHERE reg_periksa.tgl_registrasi = ?
                ", [$tanggal]);
                
                // Increment nomor maksimal + 1 (seperti logika Java)
                $nextNumber = (int) $maxNumber->max_number + 1;
                
                // Format dengan padding 6 digit (seperti autoNomer3 di Java)
                $no_rawat = $today . '/' . str_pad($nextNumber, 6, '0', STR_PAD_LEFT);
                
                Log::info('Java-style generation - Max number: ' . $maxNumber->max_number . ', Next: ' . $nextNumber . ', Result: ' . $no_rawat);
                
                return $no_rawat;
            });
        } else {
            return DB::transaction(function () use ($tanggal, $kdDokter, $kdPoli) {
                // For no_reg, use existing logic with locking
                $query = RegPeriksa::whereDate('tgl_registrasi', $tanggal)
                    ->where('kd_dokter', $kdDokter)
                    ->lockForUpdate();
                    
                if ($kdPoli) {
                    $query->where('kd_poli', $kdPoli);
                }
                
                $lastRegPeriksa = $query->orderBy('no_reg', 'desc')->first();
                
                $nextSequence = 1;
                if ($lastRegPeriksa && $lastRegPeriksa->no_reg) {
                    $nextSequence = (int) $lastRegPeriksa->no_reg + 1;
                }
                
                // Check for reserved numbers and skip them
                do {
                    $formattedNumber = str_pad($nextSequence, 3, '0', STR_PAD_LEFT);
                    $cacheKey = "reserved_no_reg_{$formattedNumber}_{$tanggal}";
                    
                    // If not reserved, we can use this number
                    if (!cache()->has($cacheKey)) {
                        break;
                    }
                    
                    // If reserved, try next sequence
                    $nextSequence++;
                    
                    // Prevent infinite loop
                    if ($nextSequence > 999) {
                        throw new \Exception('Unable to generate unique no_reg - all numbers reserved');
                    }
                } while (true);

                return $formattedNumber;
            });
        }
    }

    /**
     * Reserve nomor rawat untuk mencegah penggunaan oleh komputer lain
     */
    public function reserveNoRawat(Request $request): JsonResponse
    {
        $request->validate([
            'tanggal' => 'required|date',
            'type' => 'required|in:no_rawat,no_reg',
            'kd_dokter' => 'nullable|string',
            'kd_poli' => 'nullable|string'
        ]);

        try {
            return DB::transaction(function () use ($request) {
                $tanggal = $request->tanggal;
                $type = $request->type;
                $sessionId = session()->getId();

                $result = [];
                
                if ($type === 'no_rawat') {
                    // Untuk no_rawat, menggunakan logika Java yang sama
                    $today = Carbon::parse($tanggal)->format('Y/m/d');
                    
                    // Menggunakan logika Java: MAX(CONVERT(RIGHT(reg_periksa.no_rawat,6),signed))
                    $maxNumber = DB::selectOne("
                        SELECT IFNULL(MAX(CONVERT(RIGHT(reg_periksa.no_rawat,6), SIGNED)), 0) as max_number 
                        FROM reg_periksa 
                        WHERE reg_periksa.tgl_registrasi = ?
                    ", [$tanggal]);
                    
                    // Increment nomor maksimal + 1 (seperti logika Java)
                    $nextNumber = (int) $maxNumber->max_number + 1;
                    
                    // Format dengan padding 6 digit (seperti autoNomer3 di Java)
                    $noRawat = $today . '/' . str_pad($nextNumber, 6, '0', STR_PAD_LEFT);
                    
                    $result['no_rawat'] = $noRawat;
                    
                    Log::info('Java-style reservation - Max number: ' . $maxNumber->max_number . ', Next: ' . $nextNumber . ', Result: ' . $noRawat);
                    
                    // Reserve nomor untuk 5 menit
                    $reservationCacheKey = "reserved_no_rawat_{$noRawat}";
                    cache()->put($reservationCacheKey, $sessionId, 300);
                    
                    // Simpan mapping untuk array cache (testing)
                    $reservationKeys = cache()->get("reservation_keys_{$sessionId}", []);
                    $reservationKeys[] = $reservationCacheKey;
                    cache()->put("reservation_keys_{$sessionId}", $reservationKeys, 300);
                    
                } else if ($type === 'no_reg') {
                    // Generate no_reg: format NNN berdasarkan dokter dan poli
                    $noReg = $this->generateNoRawatNumber($tanggal, $request->kd_dokter, $request->kd_poli);
                    $result['no_reg'] = $noReg;
                    
                    // Reserve nomor untuk 5 menit
                    $cacheKey = "reserved_no_reg_{$noReg}_{$tanggal}";
                    cache()->put($cacheKey, $sessionId, 300);
                    
                    // Simpan mapping untuk array cache (testing)
                    $reservationKeys = cache()->get("reservation_keys_{$sessionId}", []);
                    $reservationKeys[] = $cacheKey;
                    cache()->put("reservation_keys_{$sessionId}", $reservationKeys, 300);
                }

                $result['reservation_id'] = $sessionId;

                return response()->json([
                    'success' => true,
                    'data' => $result,
                    'message' => 'Nomor rawat berhasil direserve',
                    'expires_at' => now()->addMinutes(5)->toISOString()
                ]);
            });

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal reserve nomor rawat: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Release reserved nomor rawat
     */
    public function releaseNoRawat(Request $request): JsonResponse
    {
        $request->validate([
            'reservation_id' => 'required|string'
        ]);

        try {
            $sessionId = $request->reservation_id;
            $released = false;

            // Cari dan hapus semua reservasi untuk session ini
            // Karena menggunakan array cache untuk testing, kita perlu cara lain untuk mencari keys
            $cacheStore = cache()->getStore();
            
            if (method_exists($cacheStore, 'getRedis')) {
                // Untuk Redis cache
                $cacheKeys = [
                    "reserved_no_rawat_*",
                    "reserved_no_reg_*"
                ];

                foreach ($cacheKeys as $pattern) {
                    $keys = cache()->getRedis()->keys($pattern);
                    foreach ($keys as $key) {
                        $reservedBy = cache()->get($key);
                        if ($reservedBy === $sessionId) {
                            cache()->forget($key);
                            $released = true;
                        }
                    }
                }
            } else {
                // Untuk array cache (testing), kita perlu cara lain
                // Simpan mapping reservation_id ke cache keys
                $reservationKeys = cache()->get("reservation_keys_{$sessionId}", []);
                
                foreach ($reservationKeys as $key) {
                    if (cache()->has($key) && cache()->get($key) === $sessionId) {
                        cache()->forget($key);
                        $released = true;
                    }
                }
                
                // Hapus mapping
                cache()->forget("reservation_keys_{$sessionId}");
            }

            if ($released) {
                return response()->json([
                    'success' => true,
                    'message' => 'Nomor rawat berhasil direlease'
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Tidak ada nomor rawat yang direserve oleh session ini'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal release nomor rawat: ' . $e->getMessage()
            ], 500);
        }
    }
}