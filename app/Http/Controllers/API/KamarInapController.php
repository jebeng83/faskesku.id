<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class KamarInapController extends Controller
{
    private function resolveTarifKamar(string $noRawat, string $kdKamar): float
    {
        $tarif = (float) (DB::table('kamar')->where('kd_kamar', $kdKamar)->value('trf_kamar') ?? 0);

        $kdPj = (string) (DB::table('reg_periksa')->where('no_rawat', $noRawat)->value('kd_pj') ?? '');
        if ($kdPj !== '') {
            $override = DB::table('set_harga_kamar')
                ->where('kd_kamar', $kdKamar)
                ->where('kd_pj', $kdPj)
                ->value('tarif');

            if ($override !== null) {
                $tarif = (float) $override;
            }
        }

        return $tarif;
    }

    private function findActiveKamarInap(string $noRawat)
    {
        return DB::table('kamar_inap')
            ->where('no_rawat', $noRawat)
            ->where('stts_pulang', '-')
            ->where(function ($w) {
                $w->whereNull('tgl_keluar')->orWhere('tgl_keluar', '0000-00-00');
            })
            ->orderByDesc('tgl_masuk')
            ->orderByDesc('jam_masuk')
            ->first();
    }

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

            $tarif = $this->resolveTarifKamar($noRawat, $kdKamar);
            DB::table('kamar_inap')->insert([
                'no_rawat' => $noRawat,
                'kd_kamar' => $kdKamar,
                'trf_kamar' => (double) $tarif,
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

    public function checkout(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'no_rawat' => 'required|string|exists:reg_periksa,no_rawat',
                'stts_pulang' => 'required|string|max:20',
                'diagnosa_akhir' => 'required|string|max:100',
                'tgl_keluar' => 'nullable|date',
                'jam_keluar' => ['nullable', 'regex:/^\d{2}:\d{2}(:\d{2})?$/'],
            ]);

            $noRawat = $validated['no_rawat'];
            $sttsPulang = $validated['stts_pulang'];
            $diagnosaAkhir = $validated['diagnosa_akhir'];

            $now = Carbon::now();
            $tglKeluar = $validated['tgl_keluar'] ?? $now->toDateString();
            $jamKeluar = $validated['jam_keluar'] ?? $now->format('H:i:s');
            if (preg_match('/^\d{2}:\d{2}$/', (string) $jamKeluar)) {
                $jamKeluar = $jamKeluar.':00';
            }

            DB::beginTransaction();

            $active = $this->findActiveKamarInap($noRawat);
            if (! $active) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak ada data kamar inap aktif untuk no_rawat ini',
                ], 422);
            }

            $start = Carbon::parse($active->tgl_masuk.' '.$active->jam_masuk);
            $end = Carbon::parse($tglKeluar.' '.$jamKeluar);
            $lama = max(1, $start->startOfDay()->diffInDays($end->startOfDay()) + 1);

            $tarif = (float) ($active->trf_kamar ?? 0);
            if ($tarif <= 0) {
                $tarif = $this->resolveTarifKamar($noRawat, (string) $active->kd_kamar);
            }
            $ttlBiaya = $lama * $tarif;

            DB::table('kamar_inap')
                ->where('no_rawat', $noRawat)
                ->where('kd_kamar', $active->kd_kamar)
                ->where('tgl_masuk', $active->tgl_masuk)
                ->where('jam_masuk', $active->jam_masuk)
                ->update([
                    'tgl_keluar' => $tglKeluar,
                    'jam_keluar' => $jamKeluar,
                    'stts_pulang' => $sttsPulang,
                    'diagnosa_akhir' => $diagnosaAkhir,
                    'lama' => $lama,
                    'trf_kamar' => $tarif,
                    'ttl_biaya' => $ttlBiaya,
                ]);

            DB::table('kamar')->where('kd_kamar', $active->kd_kamar)->update([
                'status' => 'KOSONG',
            ]);

            DB::table('reg_periksa')->where('no_rawat', $noRawat)->update([
                'keputusan' => 'CHECK-OUT',
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Check-out rawat inap berhasil',
                'data' => [
                    'no_rawat' => $noRawat,
                    'kd_kamar' => $active->kd_kamar,
                    'tgl_keluar' => $tglKeluar,
                    'jam_keluar' => $jamKeluar,
                    'lama' => $lama,
                    'ttl_biaya' => $ttlBiaya,
                ],
            ]);
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
                'message' => 'Gagal melakukan check out: '.$e->getMessage(),
            ], 500);
        }
    }

    public function pindah(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'no_rawat' => 'required|string|exists:reg_periksa,no_rawat',
                'kd_kamar_tujuan' => 'required|string|exists:kamar,kd_kamar',
                'tgl_pindah' => 'nullable|date',
                'jam_pindah' => ['nullable', 'regex:/^\d{2}:\d{2}(:\d{2})?$/'],
            ]);

            $noRawat = $validated['no_rawat'];
            $kdKamarTujuan = $validated['kd_kamar_tujuan'];

            $roomTarget = DB::table('kamar')->where('kd_kamar', $kdKamarTujuan)->first();
            if (! $roomTarget) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kamar tujuan tidak ditemukan',
                ], 404);
            }
            if (strtoupper((string) ($roomTarget->status ?? '')) !== 'KOSONG') {
                return response()->json([
                    'success' => false,
                    'message' => 'Kamar tujuan tidak kosong',
                    'errors' => ['kd_kamar_tujuan' => ['Kamar tujuan tidak kosong']],
                ], 422);
            }

            $now = Carbon::now();
            $tglPindah = $validated['tgl_pindah'] ?? $now->toDateString();
            $jamPindah = $validated['jam_pindah'] ?? $now->format('H:i:s');
            if (preg_match('/^\d{2}:\d{2}$/', (string) $jamPindah)) {
                $jamPindah = $jamPindah.':00';
            }

            DB::beginTransaction();

            $active = $this->findActiveKamarInap($noRawat);
            if (! $active) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak ada data kamar inap aktif untuk dipindahkan',
                ], 422);
            }

            $start = Carbon::parse($active->tgl_masuk.' '.$active->jam_masuk);
            $end = Carbon::parse($tglPindah.' '.$jamPindah);
            $lama = max(1, $start->startOfDay()->diffInDays($end->startOfDay()) + 1);

            $tarifLama = (float) ($active->trf_kamar ?? 0);
            if ($tarifLama <= 0) {
                $tarifLama = $this->resolveTarifKamar($noRawat, (string) $active->kd_kamar);
            }
            $ttlBiayaLama = $lama * $tarifLama;

            DB::table('kamar_inap')
                ->where('no_rawat', $noRawat)
                ->where('kd_kamar', $active->kd_kamar)
                ->where('tgl_masuk', $active->tgl_masuk)
                ->where('jam_masuk', $active->jam_masuk)
                ->update([
                    'tgl_keluar' => $tglPindah,
                    'jam_keluar' => $jamPindah,
                    'stts_pulang' => 'Pindah Kamar',
                    'lama' => $lama,
                    'trf_kamar' => $tarifLama,
                    'ttl_biaya' => $ttlBiayaLama,
                ]);

            DB::table('kamar')->where('kd_kamar', $active->kd_kamar)->update([
                'status' => 'KOSONG',
            ]);

            $tarifBaru = $this->resolveTarifKamar($noRawat, $kdKamarTujuan);
            DB::table('kamar_inap')->insert([
                'no_rawat' => $noRawat,
                'kd_kamar' => $kdKamarTujuan,
                'trf_kamar' => (double) $tarifBaru,
                'diagnosa_awal' => (string) ($active->diagnosa_awal ?? '-'),
                'diagnosa_akhir' => '-',
                'tgl_masuk' => $tglPindah,
                'jam_masuk' => $jamPindah,
                'tgl_keluar' => null,
                'jam_keluar' => null,
                'lama' => 0,
                'ttl_biaya' => 0,
                'stts_pulang' => '-',
            ]);

            DB::table('kamar')->where('kd_kamar', $kdKamarTujuan)->update([
                'status' => 'ISI',
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Pindah kamar berhasil',
                'data' => [
                    'no_rawat' => $noRawat,
                    'from' => $active->kd_kamar,
                    'to' => $kdKamarTujuan,
                    'tgl_pindah' => $tglPindah,
                    'jam_pindah' => $jamPindah,
                ],
            ]);
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
                'message' => 'Gagal pindah kamar: '.$e->getMessage(),
            ], 500);
        }
    }

    public function gabung(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'no_rawat_ibu' => 'required|string|exists:reg_periksa,no_rawat',
                'no_rawat_bayi' => 'required|string|different:no_rawat_ibu|exists:reg_periksa,no_rawat',
            ]);

            $noIbu = $validated['no_rawat_ibu'];
            $noBayi = $validated['no_rawat_bayi'];

            DB::beginTransaction();

            $exists = DB::table('ranap_gabung')->where('no_rawat', $noIbu)->orWhere('no_rawat2', $noBayi)->exists();
            if ($exists) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Relasi ranap gabung sudah ada',
                ], 409);
            }

            $activeIbu = $this->findActiveKamarInap($noIbu);
            $activeBayi = $this->findActiveKamarInap($noBayi);
            if (! $activeIbu || ! $activeBayi) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Ibu dan/atau bayi tidak memiliki kamar inap aktif',
                ], 422);
            }

            DB::table('ranap_gabung')->insert([
                'no_rawat' => $noIbu,
                'no_rawat2' => $noBayi,
            ]);

            DB::table('kamar_inap')
                ->where('no_rawat', $noBayi)
                ->where('kd_kamar', $activeBayi->kd_kamar)
                ->where('tgl_masuk', $activeBayi->tgl_masuk)
                ->where('jam_masuk', $activeBayi->jam_masuk)
                ->update([
                    'stts_pulang' => 'Pindah Kamar',
                ]);

            DB::table('kamar')->where('kd_kamar', $activeBayi->kd_kamar)->update([
                'status' => 'KOSONG',
            ]);

            DB::table('kamar_inap')->where('no_rawat', $noBayi)->update([
                'no_rawat' => $noIbu,
            ]);

            DB::table('reg_periksa')->where('no_rawat', $noBayi)->update([
                'status_lanjut' => 'Ranap',
                'keputusan' => 'GABUNG-RANAP',
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Ranap gabung berhasil',
                'data' => [
                    'no_rawat_ibu' => $noIbu,
                    'no_rawat_bayi' => $noBayi,
                ],
            ]);
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
                'message' => 'Gagal ranap gabung: '.$e->getMessage(),
            ], 500);
        }
    }

    public function updateHariRawat(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'no_rawat' => 'nullable|string|exists:reg_periksa,no_rawat',
            ]);

            $setting = DB::table('set_jam_minimal')->first();
            $lamajam = (int) ($setting->lamajam ?? 0);
            $hariawal = (string) ($setting->hariawal ?? 'No');

            $query = DB::table('kamar_inap')
                ->where('stts_pulang', '-')
                ->where(function ($w) {
                    $w->whereNull('tgl_keluar')->orWhere('tgl_keluar', '0000-00-00');
                });

            if (! empty($validated['no_rawat'])) {
                $query->where('no_rawat', $validated['no_rawat']);
            }

            $rows = $query
                ->orderBy('no_rawat')
                ->orderByDesc('tgl_masuk')
                ->orderByDesc('jam_masuk')
                ->get();

            if ($rows->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => empty($validated['no_rawat'])
                        ? 'Tidak ada kamar inap aktif untuk diperbarui'
                        : 'Tidak ada data kamar inap aktif untuk no_rawat ini',
                ], 422);
            }

            $end = Carbon::now();
            $updated = 0;

            foreach ($rows as $active) {
                $noRawat = (string) ($active->no_rawat ?? '');
                if ($noRawat === '') {
                    continue;
                }

                $start = Carbon::parse($active->tgl_masuk.' '.$active->jam_masuk);
                $dayDiff = max(0, $start->copy()->startOfDay()->diffInDays($end->copy()->startOfDay(), false));
                $secondsDiff = max(0, $start->diffInSeconds($end, false));

                $baseLama = $dayDiff === 0 ? (($secondsDiff > 3600 * $lamajam) ? 1 : 0) : $dayDiff;
                $lama = $baseLama + ($hariawal === 'Yes' ? 1 : 0);
                $lama = max(0, (int) $lama);

                $tarif = (float) ($active->trf_kamar ?? 0);
                if ($tarif <= 0) {
                    $tarif = $this->resolveTarifKamar($noRawat, (string) $active->kd_kamar);
                }
                $ttlBiaya = $lama * $tarif;

                $updated += DB::table('kamar_inap')
                    ->where('no_rawat', $noRawat)
                    ->where('kd_kamar', $active->kd_kamar)
                    ->where('tgl_masuk', $active->tgl_masuk)
                    ->where('jam_masuk', $active->jam_masuk)
                    ->update([
                        'lama' => $lama,
                        'trf_kamar' => $tarif,
                        'ttl_biaya' => $ttlBiaya,
                    ]);
            }

            return response()->json([
                'success' => true,
                'message' => empty($validated['no_rawat'])
                    ? 'Hari rawat ranap aktif berhasil diperbarui'
                    : 'Hari rawat berhasil diperbarui',
                'data' => [
                    'updated' => $updated,
                ],
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal update hari rawat: '.$e->getMessage(),
            ], 500);
        }
    }

    public function hapusDataSalah(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'no_rawat' => 'required|string|exists:reg_periksa,no_rawat',
                'kd_kamar' => 'required|string|exists:kamar,kd_kamar',
                'tgl_masuk' => 'required|date',
                'jam_masuk' => ['required', 'regex:/^\d{2}:\d{2}(:\d{2})?$/'],
            ]);

            $noRawat = $validated['no_rawat'];
            $kdKamar = $validated['kd_kamar'];
            $tglMasuk = $validated['tgl_masuk'];
            $jamMasuk = $validated['jam_masuk'];
            if (preg_match('/^\d{2}:\d{2}$/', (string) $jamMasuk)) {
                $jamMasuk = $jamMasuk.':00';
            }

            $hasBillingSnapshot = DB::table('billing')->where('no_rawat', $noRawat)->exists();
            if ($hasBillingSnapshot) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data billing sudah ada. Hubungi kasir/keuangan.',
                ], 422);
            }

            DB::beginTransaction();

            $deleted = DB::table('kamar_inap')
                ->where('no_rawat', $noRawat)
                ->where('kd_kamar', $kdKamar)
                ->where('tgl_masuk', $tglMasuk)
                ->where('jam_masuk', $jamMasuk)
                ->delete();

            if ($deleted <= 0) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Data kamar inap tidak ditemukan',
                ], 404);
            }

            DB::table('kamar')->where('kd_kamar', $kdKamar)->update([
                'status' => 'KOSONG',
            ]);

            $remaining = DB::table('kamar_inap')->where('no_rawat', $noRawat)->count();
            if ($remaining <= 0) {
                DB::table('reg_periksa')->where('no_rawat', $noRawat)->update([
                    'status_lanjut' => 'Ralan',
                    'stts' => 'Sudah',
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Data kamar inap berhasil dihapus',
            ]);
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
                'message' => 'Gagal menghapus data: '.$e->getMessage(),
            ], 500);
        }
    }
}
