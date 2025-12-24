<?php

namespace App\Http\Controllers;

use App\Models\SkriningVisual;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class SkriningVisualController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $q = SkriningVisual::query();
        if ($request->filled('no_rkm_medis')) {
            $q->where('no_rkm_medis', $request->string('no_rkm_medis')->toString());
        }
        if ($request->filled('from')) {
            $q->whereDate('tanggal', '>=', $request->date('from'));
        }
        if ($request->filled('to')) {
            $q->whereDate('tanggal', '<=', $request->date('to'));
        }
        $rows = $q->orderBy('tanggal', 'desc')->orderBy('jam', 'desc')->get();
        return response()->json(['data' => $rows]);
    }

    public function show(string $no_rkm_medis, string $tanggal): JsonResponse
    {
        $row = SkriningVisual::query()
            ->where('no_rkm_medis', $no_rkm_medis)
            ->whereDate('tanggal', $tanggal)
            ->firstOrFail();
        return response()->json(['data' => $row]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validateData($request);
        if (is_string($data['jam']) && preg_match('/^\d{2}:\d{2}$/', $data['jam'])) {
            $data['jam'] = $data['jam'] . ':00';
        }
        $row = new SkriningVisual($data);
        $row->save();
        return response()->json(['data' => $row]);
    }

    public function update(Request $request, string $no_rkm_medis, string $tanggal): JsonResponse
    {
        $data = $this->validateData($request);
        if (is_string($data['jam']) && preg_match('/^\d{2}:\d{2}$/', $data['jam'])) {
            $data['jam'] = $data['jam'] . ':00';
        }
        DB::table('skrining_visual')
            ->where('no_rkm_medis', $no_rkm_medis)
            ->whereDate('tanggal', $tanggal)
            ->update($data);
        $updated = SkriningVisual::query()
            ->where('no_rkm_medis', $no_rkm_medis)
            ->whereDate('tanggal', $tanggal)
            ->first();
        return response()->json(['data' => $updated]);
    }

    public function destroy(string $no_rkm_medis, string $tanggal): JsonResponse
    {
        DB::table('skrining_visual')
            ->where('no_rkm_medis', $no_rkm_medis)
            ->whereDate('tanggal', $tanggal)
            ->delete();
        return response()->json(['success' => true]);
    }

    protected function validateData(Request $request): array
    {
        return $request->validate([
            'no_rkm_medis' => ['required', 'string', 'max:15'],
            'tanggal' => ['required', 'date'],
            'jam' => ['required', 'regex:/^\d{2}:\d{2}(:\d{2})?$/'],
            'hasil_skrining' => ['required', 'in:Merah,Oranye,Kuning,Hijau'],
            'skrining_resiko_jatuh' => ['required', 'string', 'max:200'],
            'skor_resiko_jatuh' => ['required', 'string', 'max:2'],
            'keputusan' => ['required', 'in:Sesuai Antrian,Prioritas,UGD'],
        ]);
    }
}
