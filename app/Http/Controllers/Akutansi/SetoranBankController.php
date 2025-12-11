<?php

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use App\Models\Akutansi\SetoranBank;
use App\Services\Akutansi\JurnalPostingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SetoranBankController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'q' => ['nullable', 'string'],
            'from' => ['nullable', 'date'],
            'to' => ['nullable', 'date'],
            'posted' => ['nullable', 'boolean'],
        ]);

        $q = trim((string) $request->query('q', ''));
        $from = $request->query('from');
        $to = $request->query('to');
        $posted = $request->boolean('posted');

        $query = SetoranBank::query()->with(['rekeningKas', 'rekeningBank', 'jurnal']);

        if ($q !== '') {
            $like = "%$q%";
            $query->where(function ($w) use ($like) {
                $w->where('no_bukti', 'like', $like)
                    ->orWhere('keterangan', 'like', $like)
                    ->orWhere('kd_rek_kas', 'like', $like)
                    ->orWhere('kd_rek_bank', 'like', $like);
            });
        }
        if ($from && $to) {
            $query->whereBetween('tgl_setor', [$from, $to]);
        } elseif ($from) {
            $query->whereDate('tgl_setor', '>=', $from);
        } elseif ($to) {
            $query->whereDate('tgl_setor', '<=', $to);
        }
        if ($request->has('posted')) {
            if ($posted) {
                $query->whereNotNull('no_jurnal');
            } else {
                $query->whereNull('no_jurnal');
            }
        }

        $rows = $query->orderBy('tgl_setor', 'desc')->orderBy('id', 'desc')->get();

        return response()->json(['data' => $rows]);
    }

    public function show(int $id)
    {
        $row = SetoranBank::with(['rekeningKas', 'rekeningBank', 'jurnal'])->find($id);
        if (! $row) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($row);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tgl_setor' => ['required', 'date'],
            'no_bukti' => ['nullable', 'string', 'max:30'],
            'keterangan' => ['nullable', 'string', 'max:350'],
            'kd_rek_kas' => ['required', 'string', 'exists:rekening,kd_rek'],
            'kd_rek_bank' => ['required', 'string', 'exists:rekening,kd_rek'],
            'nominal' => ['required', 'numeric', 'min:0.01'],
        ]);

        if ($validated['kd_rek_kas'] === $validated['kd_rek_bank']) {
            return response()->json(['message' => 'Akun Kas dan Bank tidak boleh sama'], 422);
        }

        $row = SetoranBank::create($validated);

        return response()->json(['id' => $row->id], 201);
    }

    public function update(Request $request, int $id)
    {
        $row = SetoranBank::find($id);
        if (! $row) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        if ($row->no_jurnal) {
            return response()->json(['message' => 'Data sudah diposting'], 409);
        }

        $validated = $request->validate([
            'tgl_setor' => ['nullable', 'date'],
            'no_bukti' => ['nullable', 'string', 'max:30'],
            'keterangan' => ['nullable', 'string', 'max:350'],
            'kd_rek_kas' => ['nullable', 'string', 'exists:rekening,kd_rek'],
            'kd_rek_bank' => ['nullable', 'string', 'exists:rekening,kd_rek'],
            'nominal' => ['nullable', 'numeric', 'min:0.01'],
        ]);

        if (isset($validated['kd_rek_kas'], $validated['kd_rek_bank']) && $validated['kd_rek_kas'] === $validated['kd_rek_bank']) {
            return response()->json(['message' => 'Akun Kas dan Bank tidak boleh sama'], 422);
        }

        $row->fill($validated)->save();

        return response()->json(['message' => 'Data diperbarui']);
    }

    public function destroy(int $id)
    {
        $row = SetoranBank::find($id);
        if (! $row) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        if ($row->no_jurnal) {
            return response()->json(['message' => 'Data sudah diposting'], 409);
        }
        $row->delete();
        return response()->json(['message' => 'Data dihapus']);
    }

    public function stage(int $id, Request $request, JurnalPostingService $service)
    {
        $row = SetoranBank::find($id);
        if (! $row) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $request->validate(['reset' => ['nullable', 'boolean']]);

        if ($row->kd_rek_kas === $row->kd_rek_bank) {
            return response()->json(['message' => 'Akun Kas dan Bank tidak boleh sama'], 422);
        }

        DB::transaction(function () use ($request, $row) {
            if ($request->boolean('reset')) {
                DB::table('tampjurnal')->delete();
                DB::table('tampjurnal2')->delete();
            }
            $nom = (float) $row->nominal;
            DB::table('tampjurnal')->insert([
                ['kd_rek' => (string) $row->kd_rek_bank, 'debet' => $nom, 'kredit' => 0],
                ['kd_rek' => (string) $row->kd_rek_kas, 'debet' => 0, 'kredit' => $nom],
            ]);
        });

        try {
            $preview = $service->preview();
            return response()->json($preview);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Gagal membuat preview setoran bank: '.$e->getMessage()], 500);
        }
    }

    public function post(int $id, Request $request, JurnalPostingService $service)
    {
        $row = SetoranBank::find($id);
        if (! $row) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $noBukti = $request->input('no_bukti') ?? $row->no_bukti;
        $keterangan = $request->input('keterangan') ?? $row->keterangan;
        $tgl = $request->input('tgl_jurnal') ?? $row->tgl_setor;

        try {
            $result = $service->post($noBukti, $keterangan, $tgl);
            if (isset($result['no_jurnal'])) {
                $row->no_jurnal = (string) $result['no_jurnal'];
                $row->posted_at = now();
                $row->save();
            }
            return response()->json($result, 201);
        } catch (\RuntimeException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal posting setoran bank: '.$e->getMessage(),
                'error' => $e->getMessage(),
            ], 400);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal posting setoran bank: '.$e->getMessage(),
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

