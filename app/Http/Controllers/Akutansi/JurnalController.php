<?php
declare(strict_types=1);

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Carbon\Carbon;
use App\Services\Akutansi\JurnalPostingService;

class JurnalController extends Controller
{
    /**
     * Inertia page for Jurnal CRUD.
     */
    public function page(): InertiaResponse
    {
        return Inertia::render('Akutansi/Jurnal');
    }

    /**
     * List journals with optional filters and pagination.
     */
    /**
     * List journals with optional filters and pagination.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $q = trim((string) $request->get('q'));
        $from = $request->get('from');
        $to = $request->get('to');
        $jenis = $request->get('jenis');
        $page = max(1, (int) $request->get('page', 1));
        $perPage = max(1, min(100, (int) $request->get('per_page', 20)));

        $base = DB::table('jurnal')
            ->leftJoin('detailjurnal', 'detailjurnal.no_jurnal', '=', 'jurnal.no_jurnal')
            ->select(
                'jurnal.no_jurnal', 'jurnal.no_bukti', 'jurnal.tgl_jurnal', 'jurnal.jam_jurnal', 'jurnal.jenis', 'jurnal.keterangan',
                DB::raw('IFNULL(SUM(detailjurnal.debet),0) AS debet_total'),
                DB::raw('IFNULL(SUM(detailjurnal.kredit),0) AS kredit_total')
            )
            ->groupBy('jurnal.no_jurnal', 'jurnal.no_bukti', 'jurnal.tgl_jurnal', 'jurnal.jam_jurnal', 'jurnal.jenis', 'jurnal.keterangan');

        if ($q !== '') {
            $base->where(function ($w) use ($q) {
                $w->where('jurnal.no_jurnal', 'like', "%$q%")
                  ->orWhere('jurnal.no_bukti', 'like', "%$q%")
                  ->orWhere('jurnal.keterangan', 'like', "%$q%");
            });
        }
        if ($from && $to) {
            $base->whereBetween('jurnal.tgl_jurnal', [$from, $to]);
        } elseif ($from) {
            $base->where('jurnal.tgl_jurnal', '>=', $from);
        } elseif ($to) {
            $base->where('jurnal.tgl_jurnal', '<=', $to);
        }
        if ($jenis && in_array($jenis, ['U', 'P'])) {
            $base->where('jurnal.jenis', $jenis);
        }

        $base->orderByDesc('jurnal.tgl_jurnal')
            ->orderByDesc('jurnal.jam_jurnal')
            ->orderByDesc('jurnal.no_jurnal');

        // Manual pagination using count subquery
        $countQuery = DB::table('jurnal');
        if ($q !== '') {
            $countQuery->where(function ($w) use ($q) {
                $w->where('jurnal.no_jurnal', 'like', "%$q%")
                  ->orWhere('jurnal.no_bukti', 'like', "%$q%")
                  ->orWhere('jurnal.keterangan', 'like', "%$q%");
            });
        }
        if ($from && $to) {
            $countQuery->whereBetween('jurnal.tgl_jurnal', [$from, $to]);
        } elseif ($from) {
            $countQuery->where('jurnal.tgl_jurnal', '>=', $from);
        } elseif ($to) {
            $countQuery->where('jurnal.tgl_jurnal', '<=', $to);
        }
        if ($jenis && in_array($jenis, ['U', 'P'])) {
            $countQuery->where('jurnal.jenis', $jenis);
        }
        $total = (int) $countQuery->count();

        $items = $base->forPage($page, $perPage)->get();

        return response()->json([
            'data' => $items,
            'meta' => [
                'current_page' => $page,
                'per_page' => $perPage,
                'last_page' => (int) ceil(max(1, $total) / $perPage),
                'total' => $total,
            ],
        ]);
    }

    /**
     * Show single journal with detail lines.
     */
    /**
     * Show single journal with detail lines.
     *
     * @param string $no_jurnal
     * @return JsonResponse
     */
    public function show(string $no_jurnal): JsonResponse
    {
        $jurnal = DB::table('jurnal')->where('no_jurnal', $no_jurnal)->first();
        if (!$jurnal) {
            return response()->json(['message' => 'Jurnal tidak ditemukan'], 404);
        }

        $details = DB::table('detailjurnal')
            ->leftJoin('rekening', 'rekening.kd_rek', '=', 'detailjurnal.kd_rek')
            ->select('detailjurnal.no_jurnal', 'detailjurnal.kd_rek', 'rekening.nm_rek', 'detailjurnal.debet', 'detailjurnal.kredit')
            ->where('detailjurnal.no_jurnal', $no_jurnal)
            ->orderByDesc('detailjurnal.debet')
            ->orderBy('detailjurnal.kredit')
            ->get();

        $totals = [
            'debet_total' => (float) ($details->sum('debet')),
            'kredit_total' => (float) ($details->sum('kredit')),
        ];

        return response()->json(['header' => $jurnal, 'details' => $details, 'totals' => $totals]);
    }

    /**
     * Create a new manual journal (jenis = U by default) with detail lines.
     */
    /**
     * Create a new manual journal (jenis = U by default) with detail lines.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'no_bukti' => ['nullable', 'string', 'max:30'],
            'tgl_jurnal' => ['required', 'date'],
            'jam_jurnal' => ['nullable', 'date_format:H:i:s'],
            'jenis' => ['nullable', 'in:U,P'],
            'keterangan' => ['nullable', 'string', 'max:350'],
            'details' => ['required', 'array', 'min:1'],
            'details.*.kd_rek' => ['required', 'string', 'max:15', 'exists:rekening,kd_rek'],
            'details.*.debet' => ['nullable', 'numeric', 'min:0'],
            'details.*.kredit' => ['nullable', 'numeric', 'min:0'],
        ]);

        $jenis = $data['jenis'] ?? 'U';
        $tgl = $data['tgl_jurnal'];
        $jam = $data['jam_jurnal'] ?? Carbon::now()->format('H:i:s');

        // Validate debet == kredit and at least one positive value
        $sumDebet = 0.0; $sumKredit = 0.0; $hasPositive = false;
        foreach ($data['details'] as $d) {
            $debet = (float) ($d['debet'] ?? 0);
            $kredit = (float) ($d['kredit'] ?? 0);
            $sumDebet += $debet;
            $sumKredit += $kredit;
            if ($debet > 0 || $kredit > 0) $hasPositive = true;
        }
        if (!$hasPositive || round($sumDebet, 2) <= 0 || round($sumKredit, 2) <= 0) {
            return response()->json(['message' => 'Detail jurnal harus memiliki nominal debet/kredit > 0'], 422);
        }
        if (round($sumDebet, 2) !== round($sumKredit, 2)) {
            return response()->json(['message' => 'Total Debet dan Kredit harus sama (double-entry).'], 422);
        }

        DB::beginTransaction();
        try {
            // Generate no_jurnal harian (prefix JR + yyyymmdd + 6 digit)
            $prefix = 'JR' . str_replace('-', '', $tgl);
            $max = DB::table('jurnal')
                ->lockForUpdate()
                ->where('tgl_jurnal', $tgl)
                ->select(DB::raw('IFNULL(MAX(CONVERT(RIGHT(no_jurnal,6),SIGNED)),0) AS max_no'))
                ->value('max_no');
            $next = ((int) $max) + 1;
            $noSuffix = str_pad((string) $next, 6, '0', STR_PAD_LEFT);
            $noJurnal = $prefix . $noSuffix;

            // Insert header
            DB::table('jurnal')->insert([
                'no_jurnal' => $noJurnal,
                'no_bukti' => $data['no_bukti'] ?? null,
                'tgl_jurnal' => $tgl,
                'jam_jurnal' => $jam,
                'jenis' => $jenis,
                'keterangan' => $data['keterangan'] ?? null,
            ]);

            // Insert detail lines
            $detailRows = [];
            foreach ($data['details'] as $d) {
                $detailRows[] = [
                    'no_jurnal' => $noJurnal,
                    'kd_rek' => $d['kd_rek'],
                    'debet' => (float) ($d['debet'] ?? 0),
                    'kredit' => (float) ($d['kredit'] ?? 0),
                ];
            }
            if (!empty($detailRows)) {
                DB::table('detailjurnal')->insert($detailRows);
            }

            DB::commit();
            return response()->json(['message' => 'Jurnal tersimpan', 'no_jurnal' => $noJurnal], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal menyimpan jurnal', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Preview komposisi staging tampjurnal (Debet/Kredit) sebelum posting.
     * Single Posting Point helper.
     */
    public function previewFromTemp(JurnalPostingService $service): JsonResponse
    {
        $data = $service->preview();
        return response()->json($data);
    }

    /**
     * Posting isi tampjurnal ke jurnal/detailjurnal.
     * Menghasilkan jurnal jenis=P (posted dari transaksi), lalu mengosongkan tampjurnal.
     */
    public function postFromTemp(Request $request, JurnalPostingService $service): JsonResponse
    {
        $validated = $request->validate([
            'no_bukti' => ['nullable', 'string', 'max:30'],
            'keterangan' => ['nullable', 'string', 'max:350'],
            'tgl_jurnal' => ['nullable', 'date'],
        ]);

        try {
            $result = $service->post($validated['no_bukti'] ?? null, $validated['keterangan'] ?? null, $validated['tgl_jurnal'] ?? null);
            return response()->json(['message' => 'Posting jurnal berhasil', 'no_jurnal' => $result['no_jurnal']], 201);
        } catch (\RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Gagal melakukan posting jurnal', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update manual journal (jenis U). For jenis P (posted), disallow edits except description.
     */
    /**
     * Update manual journal (jenis U). For jenis P (posted), disallow edits except description.
     *
     * @param Request $request
     * @param string $no_jurnal
     * @return JsonResponse
     */
    public function update(Request $request, string $no_jurnal): JsonResponse
    {
        $jurnal = DB::table('jurnal')->where('no_jurnal', $no_jurnal)->first();
        if (!$jurnal) return response()->json(['message' => 'Jurnal tidak ditemukan'], 404);

        $allowEditDetails = ($jurnal->jenis === 'U');
        $rules = [
            'no_bukti' => ['nullable', 'string', 'max:30'],
            'tgl_jurnal' => ['required', 'date'],
            'jam_jurnal' => ['nullable', 'date_format:H:i:s'],
            'keterangan' => ['nullable', 'string', 'max:350'],
        ];
        if ($allowEditDetails) {
            $rules['details'] = ['required', 'array', 'min:1'];
            $rules['details.*.kd_rek'] = ['required', 'string', 'max:15', 'exists:rekening,kd_rek'];
            $rules['details.*.debet'] = ['nullable', 'numeric', 'min:0'];
            $rules['details.*.kredit'] = ['nullable', 'numeric', 'min:0'];
        }
        $data = $request->validate($rules);

        if ($allowEditDetails) {
            $sumDebet = 0.0; $sumKredit = 0.0; $hasPositive = false;
            foreach ($data['details'] as $d) {
                $debet = (float) ($d['debet'] ?? 0);
                $kredit = (float) ($d['kredit'] ?? 0);
                $sumDebet += $debet; $sumKredit += $kredit; if ($debet > 0 || $kredit > 0) $hasPositive = true;
            }
            if (!$hasPositive || round($sumDebet, 2) <= 0 || round($sumKredit, 2) <= 0) {
                return response()->json(['message' => 'Detail jurnal harus memiliki nominal debet/kredit > 0'], 422);
            }
            if (round($sumDebet, 2) !== round($sumKredit, 2)) {
                return response()->json(['message' => 'Total Debet dan Kredit harus sama (double-entry).'], 422);
            }
        }

        DB::beginTransaction();
        try {
            // Update header fields (jenis tidak diubah melalui update ini)
            DB::table('jurnal')->where('no_jurnal', $no_jurnal)->update([
                'no_bukti' => $data['no_bukti'] ?? $jurnal->no_bukti,
                'tgl_jurnal' => $data['tgl_jurnal'] ?? $jurnal->tgl_jurnal,
                'jam_jurnal' => $data['jam_jurnal'] ?? $jurnal->jam_jurnal,
                'keterangan' => $data['keterangan'] ?? $jurnal->keterangan,
            ]);

            if ($allowEditDetails) {
                DB::table('detailjurnal')->where('no_jurnal', $no_jurnal)->delete();
                $rows = [];
                foreach ($data['details'] as $d) {
                    $rows[] = [
                        'no_jurnal' => $no_jurnal,
                        'kd_rek' => $d['kd_rek'],
                        'debet' => (float) ($d['debet'] ?? 0),
                        'kredit' => (float) ($d['kredit'] ?? 0),
                    ];
                }
                if (!empty($rows)) DB::table('detailjurnal')->insert($rows);
            }

            DB::commit();
            return response()->json(['message' => 'Jurnal diperbarui']);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal memperbarui jurnal', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Delete manual journal (jenis U). For jenis P (posted), refuse and suggest reversal.
     */
    /**
     * Delete manual journal (jenis U). For jenis P (posted), refuse and suggest reversal.
     *
     * @param string $no_jurnal
     * @return JsonResponse
     */
    public function destroy(string $no_jurnal): JsonResponse
    {
        $jurnal = DB::table('jurnal')->where('no_jurnal', $no_jurnal)->first();
        if (!$jurnal) return response()->json(['message' => 'Jurnal tidak ditemukan'], 404);
        if ($jurnal->jenis === 'P') {
            return response()->json(['message' => 'Jurnal hasil posting transaksi (jenis=P) bersifat read-only. Gunakan jurnal pembalik (reversal) untuk koreksi.'], 400);
        }

        DB::beginTransaction();
        try {
            DB::table('detailjurnal')->where('no_jurnal', $no_jurnal)->delete();
            DB::table('jurnal')->where('no_jurnal', $no_jurnal)->delete();
            DB::commit();
            return response()->json(['message' => 'Jurnal dihapus']);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal menghapus jurnal', 'error' => $e->getMessage()], 500);
        }
    }
}