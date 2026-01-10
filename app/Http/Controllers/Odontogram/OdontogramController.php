<?php

namespace App\Http\Controllers\Odontogram;

use App\Http\Controllers\Controller;
use App\Models\Odontogram\Odontogram;
use App\Models\Odontogram\KondisiGigi;
use App\Models\RegPeriksa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OdontogramController extends Controller
{
    public function byPatient(string $noRkmMedis)
    {
        $rows = Odontogram::with(['kondisiGigi', 'penyakit', 'jenisPerawatan'])
            ->where('no_rkm_medis', $noRkmMedis)
            ->orderByDesc('tanggal')
            ->get();

        $data = $rows->map(function ($r) {
            return [
                'no_rawat' => $r->no_rawat,
                'no_rkm_medis' => $r->no_rkm_medis,
                'elemen_gigi' => (int) $r->elemen_gigi,
                'tanggal' => optional($r->tanggal)->format('Y-m-d'),
                'kondisi' => [
                    'id' => $r->id_kondisi_gigi,
                    'kode' => optional($r->kondisiGigi)->kode,
                    'nama' => optional($r->kondisiGigi)->nama,
                ],
                'kd_penyakit' => $r->kd_penyakit,
                'kd_jns_prw' => $r->kd_jns_prw,
                'penyakit' => [
                    'kode' => optional($r->penyakit)->kd_penyakit,
                    'nama' => optional($r->penyakit)->nm_penyakit,
                ],
                'jenis_perawatan' => [
                    'kode' => optional($r->jenisPerawatan)->kd_jenis_prw,
                    'nama' => optional($r->jenisPerawatan)->nm_perawatan,
                ],
                'status' => $r->status,
            ];
        });

        return response()->json([
            'success' => true,
            'count' => $data->count(),
            'data' => $data,
        ]);
    }

    public function byVisit(string $noRawat)
    {
        $rows = Odontogram::with(['kondisiGigi', 'penyakit', 'jenisPerawatan'])
            ->where('no_rawat', $noRawat)
            ->get();

        $data = $rows->map(function ($r) {
            return [
                'no_rawat' => $r->no_rawat,
                'no_rkm_medis' => $r->no_rkm_medis,
                'elemen_gigi' => (int) $r->elemen_gigi,
                'tanggal' => optional($r->tanggal)->format('Y-m-d'),
                'kondisi' => [
                    'id' => $r->id_kondisi_gigi,
                    'kode' => optional($r->kondisiGigi)->kode,
                    'nama' => optional($r->kondisiGigi)->nama,
                ],
                'kd_penyakit' => $r->kd_penyakit,
                'kd_jns_prw' => $r->kd_jns_prw,
                'penyakit' => [
                    'kode' => optional($r->penyakit)->kd_penyakit,
                    'nama' => optional($r->penyakit)->nm_penyakit,
                ],
                'jenis_perawatan' => [
                    'kode' => optional($r->jenisPerawatan)->kd_jenis_prw,
                    'nama' => optional($r->jenisPerawatan)->nm_perawatan,
                ],
                'status' => $r->status,
            ];
        });

        return response()->json([
            'success' => true,
            'count' => $data->count(),
            'data' => $data,
        ]);
    }

    public function kondisi()
    {
        $rows = KondisiGigi::select('id', 'kode', 'nama')->orderBy('kode')->get();
        return response()->json([
            'success' => true,
            'count' => $rows->count(),
            'data' => $rows,
        ]);
    }

    public function storeByVisit(Request $request, string $noRawat)
    {
        $validated = $request->validate([
            'no_rawat' => ['nullable', 'string'],
            'no_rkm_medis' => ['nullable', 'string'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.elemen_gigi' => ['required', 'integer', 'min:11', 'max:85'],
            'items.*.id_kondisi_gigi' => ['nullable', 'integer'],
            'items.*.kd_penyakit' => ['nullable', 'string'],
            'items.*.kd_jns_prw' => ['nullable', 'string'],
            'items.*.status' => ['nullable', 'in:0,1'],
        ]);

        $reg = RegPeriksa::where('no_rawat', $noRawat)->first();
        if (! $reg) {
            return response()->json([
                'success' => false,
                'message' => 'No. Rawat tidak ditemukan pada reg_periksa',
            ], 404);
        }

        $noRkmMedis = $validated['no_rkm_medis'] ?? $reg->no_rkm_medis;

        DB::beginTransaction();
        try {
            Odontogram::where('no_rawat', $noRawat)->delete();

            $created = 0;
            foreach ($validated['items'] as $it) {
                $idKondisi = $it['id_kondisi_gigi'] ?? null;
                Odontogram::create([
                    'no_rawat' => $noRawat,
                    'no_rkm_medis' => $noRkmMedis,
                    'tanggal' => $reg->tgl_registrasi ? date('Y-m-d', strtotime($reg->tgl_registrasi)) : date('Y-m-d'),
                    'elemen_gigi' => (int) $it['elemen_gigi'],
                    'id_kondisi_gigi' => $idKondisi,
                    'kd_penyakit' => (string) ($it['kd_penyakit'] ?? ''),
                    'kd_jns_prw' => (string) ($it['kd_jns_prw'] ?? ''),
                    'status' => (string) ($it['status'] ?? '1'),
                ]);
                $created++;
            }

            DB::commit();
            return response()->json([
                'success' => true,
                'count' => $created,
                'message' => 'Odontogram berhasil disimpan untuk kunjungan',
            ], 201);
        } catch (\RuntimeException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 404);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan odontogram: '.$e->getMessage(),
            ], 500);
        }
    }

    public function storeByPatient(Request $request, string $noRkmMedis)
    {
        $validated = $request->validate([
            'items' => ['required', 'array', 'min:1'],
            'items.*.elemen_gigi' => ['required', 'integer', 'min:11', 'max:85'],
            'items.*.id_kondisi_gigi' => ['nullable', 'integer'],
            'items.*.kd_penyakit' => ['nullable', 'string'],
            'items.*.kd_jns_prw' => ['nullable', 'string'],
            'items.*.status' => ['nullable', 'in:0,1'],
            'items.*.tanggal' => ['required', 'date'],
        ]);

        DB::beginTransaction();
        try {
            $dates = collect($validated['items'])->pluck('tanggal')->unique()->values();
            $dateToRawat = [];
            foreach ($dates as $tgl) {
                $reg = RegPeriksa::where('no_rkm_medis', $noRkmMedis)
                    ->whereDate('tgl_registrasi', $tgl)
                    ->orderByDesc('tgl_registrasi')
                    ->first();
                if (! $reg) {
                    throw new \RuntimeException('Kunjungan pasien pada tanggal '.$tgl.' tidak ditemukan');
                }
                $dateToRawat[$tgl] = $reg->no_rawat;
            }

            $created = 0;
            $updated = 0;
            foreach ($validated['items'] as $it) {
                $noRawat = $dateToRawat[$it['tanggal']];

                $attrs = [
                    'no_rkm_medis' => $noRkmMedis,
                    'tanggal' => $it['tanggal'],
                    'elemen_gigi' => (int) $it['elemen_gigi'],
                ];
                $values = [
                    'no_rawat' => $noRawat,
                    'id_kondisi_gigi' => $it['id_kondisi_gigi'] ?? null,
                    'kd_penyakit' => (string) ($it['kd_penyakit'] ?? ''),
                    'kd_jns_prw' => (string) ($it['kd_jns_prw'] ?? ''),
                    'status' => (string) ($it['status'] ?? '1'),
                ];

                $existing = Odontogram::where($attrs)->exists();
                if ($existing) {
                    Odontogram::where($attrs)->update($values);
                    $updated++;
                } else {
                    Odontogram::create($attrs + $values);
                    $created++;
                }
            }

            DB::commit();
            return response()->json([
                'success' => true,
                'created' => $created,
                'updated' => $updated,
                'message' => 'Odontogram berhasil disimpan untuk pasien',
            ], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan odontogram: '.$e->getMessage(),
            ], 500);
        }
    }

    public function destroyByPatient(string $noRkmMedis, string $tanggal, int $elemenGigi)
    {
        try {
            $deleted = Odontogram::where('no_rkm_medis', $noRkmMedis)
                ->whereDate('tanggal', $tanggal)
                ->where('elemen_gigi', $elemenGigi)
                ->delete();
            if ($deleted === 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Odontogram tidak ditemukan untuk pasien/tanggal/elemen tersebut',
                ], 404);
            }
            return response()->json([
                'success' => true,
                'message' => 'Rincian odontogram berhasil dihapus',
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus odontogram: '.$e->getMessage(),
            ], 500);
        }
    }
}
