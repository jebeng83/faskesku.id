<?php

namespace App\Http\Controllers\RawatJalan;

use App\Http\Controllers\Controller;
use App\Models\RawatJalan\TemplatePemeriksaanDokter;
use App\Models\RawatJalan\TemplatePemeriksaanDokterDetail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TemplatePemeriksaanDokterController extends Controller
{
    public function list(Request $request): JsonResponse
    {
        $rows = DB::table('template_pemeriksaan_dokter')->select(['no_template', 'keluhan', 'pemeriksaan', 'penilaian'])->orderBy('no_template', 'desc')->limit(200)->get();
        $detailMap = DB::table('template_pemeriksaan_dokter_detail')->select(['no_template', 'nm_template'])->get()->keyBy('no_template');
        $data = $rows->map(function ($r) use ($detailMap) {
            $nm = $detailMap[$r->no_template]->nm_template ?? null;
            return [
                'no_template' => $r->no_template,
                'nm_template' => $nm,
                'keluhan' => $r->keluhan,
                'pemeriksaan' => $r->pemeriksaan,
                'penilaian' => $r->penilaian,
            ];
        });
        return response()->json(['data' => $data]);
    }

    public function item(Request $request): JsonResponse
    {
        $no = (string) $request->query('no_template', '');
        if ($no === '') {
            return response()->json(['message' => 'no_template wajib diisi'], 422);
        }
        $main = TemplatePemeriksaanDokter::query()->where('no_template', $no)->first();
        $detail = TemplatePemeriksaanDokterDetail::query()->where('no_template', $no)->first();
        if (! $main) {
            return response()->json(['message' => 'Template tidak ditemukan'], 404);
        }
        return response()->json(['data' => array_merge($main->toArray(), $detail ? $detail->toArray() : [])]);
    }

    public function storeMain(Request $request): JsonResponse
    {
        $no = (string) $request->input('no_template', '');
        $data = $request->only(['kd_dokter', 'keluhan', 'pemeriksaan', 'penilaian', 'rencana', 'instruksi', 'evaluasi']);
        if ($no === '') {
            $no = $this->generateNoTemplate();
        }
        $payload = array_merge(['no_template' => $no], $data);
        $exists = TemplatePemeriksaanDokter::query()->where('no_template', $no)->exists();
        if ($exists) {
            TemplatePemeriksaanDokter::query()->where('no_template', $no)->update($data);
            return response()->json(['message' => 'Template diperbarui', 'no_template' => $no]);
        }
        TemplatePemeriksaanDokter::query()->create($payload);
        return response()->json(['message' => 'Template tersimpan', 'no_template' => $no]);
    }

    public function storeDetail(Request $request): JsonResponse
    {
        $no = (string) $request->input('no_template', '');
        if ($no === '') {
            return response()->json(['message' => 'no_template wajib diisi'], 422);
        }
        $data = $request->only(['nm_template', 'suhu_tubuh', 'tensi', 'nadi', 'respirasi', 'spo2', 'tinggi', 'berat', 'gcs', 'lingkar_perut']);
        $mapped = [
            'nm_template' => $data['nm_template'] ?? null,
            'suhu' => $data['suhu_tubuh'] ?? null,
            'tensi' => $data['tensi'] ?? null,
            'nadi' => $data['nadi'] ?? null,
            'respirasi' => $data['respirasi'] ?? null,
            'spo2' => $data['spo2'] ?? null,
            'tinggi' => $data['tinggi'] ?? null,
            'berat' => $data['berat'] ?? null,
            'gcs' => $data['gcs'] ?? null,
            'lingkar_perut' => $data['lingkar_perut'] ?? null,
        ];
        $payload = array_merge(['no_template' => $no], $mapped);
        $exists = TemplatePemeriksaanDokterDetail::query()->where('no_template', $no)->exists();
        if ($exists) {
            TemplatePemeriksaanDokterDetail::query()->where('no_template', $no)->update($mapped);
            return response()->json(['message' => 'Detail template diperbarui', 'no_template' => $no]);
        }
        TemplatePemeriksaanDokterDetail::query()->create($payload);
        return response()->json(['message' => 'Detail template tersimpan', 'no_template' => $no]);
    }

    private function generateNoTemplate(): string
    {
        $prefix = 'TPD';
        $seq = (string) (now()->format('YmdHis')).sprintf('%04d', random_int(0, 9999));
        return $prefix.str_pad($seq, 19, '0', STR_PAD_RIGHT);
    }
}

