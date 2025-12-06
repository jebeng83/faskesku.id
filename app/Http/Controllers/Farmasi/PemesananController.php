<?php

namespace App\Http\Controllers\Farmasi;

use App\Models\Farmasi\Pemesanan as HeaderPemesanan;
use App\Models\Farmasi\DetailPesan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PemesananController extends BaseInventoryController
{
    public function listHutang(Request $request)
    {
        $q = trim((string) $request->query('q', ''));
        $status = trim((string) $request->query('status', 'Belum Dibayar'));
        $from = $request->query('from');
        $to = $request->query('to');
        $perPage = (int) $request->query('per_page', 20);
        $perPage = $perPage > 0 ? $perPage : 20;

        $query = DB::table('pemesanan')
            ->leftJoin('datasuplier', 'pemesanan.kode_suplier', '=', 'datasuplier.kode_suplier')
            ->select([
                'pemesanan.no_faktur',
                'pemesanan.no_order',
                'pemesanan.kode_suplier',
                'datasuplier.nama_suplier as supplier',
                'pemesanan.nip',
                'pemesanan.tgl_pesan',
                'pemesanan.tgl_faktur',
                'pemesanan.tgl_tempo',
                DB::raw('pemesanan.total2 as total'),
                'pemesanan.ppn',
                'pemesanan.meterai',
                'pemesanan.tagihan',
                'pemesanan.kd_bangsal',
                'pemesanan.status',
            ]);

        if ($status !== '') {
            $query->where('pemesanan.status', $status);
        }
        if ($q !== '') {
            $like = "%$q%";
            $query->where(function ($w) use ($like) {
                $w->where('pemesanan.no_faktur', 'like', $like)
                    ->orWhere('pemesanan.no_order', 'like', $like)
                    ->orWhere('pemesanan.kode_suplier', 'like', $like)
                    ->orWhere('datasuplier.nama_suplier', 'like', $like);
            });
        }
        if ($from && $to) {
            $query->whereBetween('pemesanan.tgl_pesan', [$from, $to]);
        } elseif ($from) {
            $query->whereDate('pemesanan.tgl_pesan', '>=', $from);
        } elseif ($to) {
            $query->whereDate('pemesanan.tgl_pesan', '<=', $to);
        }

        $paginator = $query->orderBy('pemesanan.tgl_pesan', 'desc')
            ->orderBy('pemesanan.no_faktur', 'desc')
            ->paginate($perPage)
            ->appends($request->query());

        return response()->json([
            'data' => $paginator->items(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
            ],
        ]);
    }

    public function stagePelunasan(Request $request, \App\Services\Akutansi\JurnalPostingService $service)
    {
        $data = $request->validate([
            'no_faktur' => ['required', 'string'],
            'kd_rek_bayar' => ['required', 'string'],
            'nominal' => ['nullable', 'numeric', 'min:0.01'],
            'reset' => ['nullable', 'boolean'],
        ]);

        $row = DB::table('pemesanan')
            ->where('no_faktur', $data['no_faktur'])
            ->first(['tagihan', 'status']);
        if (! $row) {
            return response()->json(['message' => 'Data pemesanan tidak ditemukan'], 404);
        }
        if (in_array((string) ($row->status ?? ''), ['Sudah Dibayar', 'Dibayar'], true)) {
            return response()->json(['message' => 'Faktur ini sudah ditandai dibayar'], 422);
        }

        $nominal = (float) ($data['nominal'] ?? $row->tagihan ?? 0);
        if ($nominal <= 0) {
            return response()->json(['message' => 'Nominal pelunasan harus > 0'], 422);
        }

        $akun = \App\Models\Farmasi\SetAkun::query()->first();
        if (! $akun || ! $akun->Kontra_Pemesanan_Obat) {
            return response()->json(['message' => 'Konfigurasi akun Kontra_Pemesanan_Obat belum diset'], 422);
        }

        DB::transaction(function () use ($data, $akun, $nominal) {
            if (! empty($data['reset'])) {
                DB::table('tampjurnal')->delete();
                DB::table('tampjurnal2')->delete();
            }

            $nmBayar = DB::table('rekening')->where('kd_rek', $data['kd_rek_bayar'])->value('nm_rek') ?? 'Kas/Bank';
            $nmHutang = DB::table('rekening')->where('kd_rek', $akun->Kontra_Pemesanan_Obat)->value('nm_rek') ?? 'Hutang Usaha';

            $lines = [];
            $lines[] = [$akun->Kontra_Pemesanan_Obat, $nmHutang, $nominal, 0];
            $lines[] = [$data['kd_rek_bayar'], $nmBayar, 0, $nominal];

            $this->stageJurnal($lines);
        });

        try {
            $preview = $service->preview();
            return response()->json(['status' => 'ok', 'no_faktur' => $data['no_faktur'], 'preview' => $preview]);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Gagal membuat preview pelunasan: '.$e->getMessage()], 500);
        }
    }

    public function markPaid(Request $request, string $no_faktur)
    {
        $tgl = (string) $request->input('tgl_bayar', now()->toDateString());

        $exists = DB::table('pemesanan')->where('no_faktur', $no_faktur)->exists();
        if (! $exists) {
            return response()->json(['message' => 'Data pemesanan tidak ditemukan'], 404);
        }

        DB::table('pemesanan')->where('no_faktur', $no_faktur)->update([
            'status' => 'Sudah Dibayar',
            'tgl_faktur' => DB::raw("COALESCE(tgl_faktur, '$tgl')"),
        ]);

        return response()->json(['status' => 'ok', 'no_faktur' => $no_faktur]);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'no_order' => 'nullable|string',
            'kode_suplier' => 'required|string',
            'nip' => 'required|string',
            'tgl_pesan' => 'required|date',
            'tgl_faktur' => 'nullable|date',
            'tgl_tempo' => 'nullable|date',
            'kd_bangsal' => 'required|string',
            'total1' => 'nullable|numeric',
            'potongan' => 'nullable|numeric',
            'total2' => 'nullable|numeric',
            'ppn' => 'nullable|numeric',
            'meterai' => 'nullable|numeric',
            'tagihan' => 'nullable|numeric',
            'items' => 'required|array',
        ]);

        return DB::transaction(function () use ($data) {
            $noFaktur = $this->generateNoFakturForPemesanan();

            $total1 = (float) ($data['total1'] ?? $data['subtotal'] ?? 0);
            $potongan = (float) ($data['potongan'] ?? $data['dis'] ?? 0);
            $total2 = (float) ($data['total2'] ?? $data['total'] ?? max(0, $total1 - $potongan));
            $ppn = (float) ($data['ppn'] ?? 0);
            $meterai = (float) ($data['meterai'] ?? 0);
            $sumItems = 0.0;
            foreach ($data['items'] as $it) {
                $sumItems += (float) (($it['jumlah'] ?? 0) * ($it['harga'] ?? ($it['h_pesan'] ?? 0)));
            }
            $baseTotal = $total2 > 0 ? $total2 : (($data['total'] ?? 0) > 0 ? (float) $data['total'] : (max(0, $total1 - $potongan) > 0 ? max(0, $total1 - $potongan) : $sumItems));
            $tagihan = (float) ($data['tagihan'] ?? ($baseTotal + $ppn + $meterai));

            DB::table('pemesanan')->insert([
                'no_faktur' => $noFaktur,
                'no_order' => $data['no_order'] ?? null,
                'kode_suplier' => $data['kode_suplier'],
                'nip' => $data['nip'],
                'tgl_pesan' => $data['tgl_pesan'],
                'tgl_faktur' => $data['tgl_faktur'] ?? null,
                'tgl_tempo' => $data['tgl_tempo'] ?? null,
                'total1' => $total1,
                'potongan' => $potongan,
                'total2' => $baseTotal,
                'ppn' => $ppn,
                'meterai' => $meterai,
                'tagihan' => $tagihan,
                'kd_bangsal' => $data['kd_bangsal'],
                'status' => 'Belum Dibayar',
            ]);

            foreach ($data['items'] as $it) {
                $nbRaw = $it['no_batch'] ?? null;
                $nb = is_string($nbRaw) && trim($nbRaw) !== '' ? trim($nbRaw) : 'BATCH001';
                $kadaluarsa = $it['kadaluarsa'] ?? null;
                $kodeSat = isset($it['kode_sat']) && is_string($it['kode_sat']) && trim($it['kode_sat']) !== ''
                    ? trim($it['kode_sat'])
                    : 'TAB';

                DB::table('detailpesan')->insert([
                    'no_faktur' => $noFaktur,
                    'kode_brng' => $it['kode_brng'],
                    'kode_sat' => $kodeSat,
                    'jumlah' => $it['jumlah'],
                    'h_pesan' => $it['harga'],
                    'subtotal' => $it['subtotal'] ?? 0,
                    'dis' => $it['dis'] ?? 0,
                    'besardis' => $it['besardis'] ?? 0,
                    'total' => $it['total'] ?? 0,
                    'no_batch' => $nb,
                    'jumlah2' => $it['jumlah2'] ?? $it['jumlah'],
                    'kadaluarsa' => $kadaluarsa,
                ]);
            }

            $akun = \App\Models\Farmasi\SetAkun::query()->first();
            if ($akun) {
                $lines = [];
                $lines[] = [$akun->Pemesanan_Obat, 'PEMESANAN OBAT', $baseTotal + $meterai, 0];
                if ($ppn > 0) {
                    $lines[] = [$akun->PPN_Masukan, 'PPN MASUKAN OBAT', $ppn, 0];
                }
                $lines[] = [$akun->Kontra_Pemesanan_Obat, 'KONTRA PEMESANAN OBAT', 0, $tagihan];
                $this->stageJurnal($lines);
            }

            return response()->json(['status' => 'ok', 'no_faktur' => $noFaktur, 'no_order' => $data['no_order'] ?? null]);
        });
    }

    public function generateNoOrder()
    {
        try {
            $today = now()->format('Ymd');
            $prefix = 'PO-' . $today . '-';
            return DB::transaction(function () use ($prefix) {
                $last = DB::table('pemesanan')
                    ->where('no_order', 'LIKE', $prefix.'%')
                    ->orderBy('no_order', 'desc')
                    ->lockForUpdate()
                    ->first();
                $next = 1;
                if ($last) {
                    $lastNumber = (int) substr($last->no_order, -3);
                    $next = $lastNumber + 1;
                }
                $no = $prefix.str_pad($next, 3, '0', STR_PAD_LEFT);
                while (DB::table('pemesanan')->where('no_order', $no)->exists()) {
                    $next++;
                    $no = $prefix.str_pad($next, 3, '0', STR_PAD_LEFT);
                }
                return response()->json(['success' => true, 'no_order' => $no]);
            });
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error generating no order: '.$e->getMessage()], 500);
        }
    }

    protected function generateNoFakturForPemesanan(): string
    {
        $today = now()->format('Ymd');
        $prefix = 'PB-' . $today . '-';
        $no = null;
        DB::transaction(function () use ($prefix, &$no) {
            $last = DB::table('pemesanan')
                ->where('no_faktur', 'LIKE', $prefix.'%')
                ->orderBy('no_faktur', 'desc')
                ->lockForUpdate()
                ->first();
            $next = 1;
            if ($last) {
                $lastNumber = (int) substr($last->no_faktur, -3);
                $next = $lastNumber + 1;
            }
            $candidate = $prefix.str_pad($next, 3, '0', STR_PAD_LEFT);
            while (DB::table('pemesanan')->where('no_faktur', $candidate)->exists()) {
                $next++;
                $candidate = $prefix.str_pad($next, 3, '0', STR_PAD_LEFT);
            }
            $no = $candidate;
        });

        return $no ?? ($prefix.'001');
    }
}
