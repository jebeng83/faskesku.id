<?php

namespace App\Http\Controllers;

use App\Models\TriaseUgd;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class TriaseUgdController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $q = TriaseUgd::query();
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

    public function show(string $no_rawat): JsonResponse
    {
        $row = TriaseUgd::query()
            ->where('no_rawat', $no_rawat)
            ->firstOrFail();
        return response()->json(['data' => $row]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validated($request);
        if (is_string($data['jam']) && preg_match('/^\d{2}:\d{2}$/', $data['jam'])) {
            $data['jam'] = $data['jam'] . ':00';
        }
        if (is_array($data['indikator'])) {
            $data['indikator'] = implode(', ', array_filter($data['indikator']));
        }
        $row = new TriaseUgd($data);
        $row->save();
        return response()->json(['data' => $row]);
    }

    public function update(Request $request, string $no_rawat): JsonResponse
    {
        $data = $this->validated($request);
        if (is_string($data['jam']) && preg_match('/^\d{2}:\d{2}$/', $data['jam'])) {
            $data['jam'] = $data['jam'] . ':00';
        }
        if (is_array($data['indikator'])) {
            $data['indikator'] = implode(', ', array_filter($data['indikator']));
        }
        DB::table('triase_ugd')
            ->where('no_rawat', $no_rawat)
            ->update($data);
        $updated = TriaseUgd::query()
            ->where('no_rawat', $no_rawat)
            ->first();
        return response()->json(['data' => $updated]);
    }

    public function destroy(string $no_rawat): JsonResponse
    {
        DB::table('triase_ugd')
            ->where('no_rawat', $no_rawat)
            ->delete();
        return response()->json(['success' => true]);
    }

    protected function validated(Request $request): array
    {
        return $request->validate([
            'no_rawat' => ['required', 'string', 'max:17', 'exists:reg_periksa,no_rawat'],
            'no_rkm_medis' => ['required', 'string', 'max:15'],
            'tanggal' => ['required', 'date'],
            'jam' => ['required', 'regex:/^\d{2}:\d{2}(:\d{2})?$/'],
            'kategori' => ['required', 'in:ATS 1,ATS 2,ATS 3,ATS 4,ATS 5'],
            'indikator' => ['required'],
            'keputusan' => ['required', 'in:Sesuai Antrian,Prioritas,UGD'],
            'catatan' => ['nullable', 'string', 'max:200'],
        ]);
    }
}
