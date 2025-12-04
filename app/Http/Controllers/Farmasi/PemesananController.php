<?php

namespace App\Http\Controllers\Farmasi;

use App\Models\Farmasi\Pemesanan as HeaderPemesanan;
use App\Models\Farmasi\DetailPesan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PemesananController extends BaseInventoryController
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'no_order' => 'required|string',
            'kode_suplier' => 'required|string',
            'nip' => 'required|string',
            'tgl_pesan' => 'required|date',
            'tgl_faktur' => 'nullable|date',
            'tgl_tempo' => 'nullable|date',
            'kd_bangsal' => 'required|string',
            'total1' => 'required|numeric',
            'potongan' => 'required|numeric',
            'total2' => 'required|numeric',
            'ppn' => 'required|numeric',
            'tagihan' => 'required|numeric',
            'items' => 'required|array',
        ]);

        return DB::connection('fufufafa')->transaction(function () use ($data) {
            $noFaktur = $this->generateNoFakturForPemesanan();

            HeaderPemesanan::create([
                'no_faktur' => $noFaktur,
                'no_order' => $data['no_order'],
                'kode_suplier' => $data['kode_suplier'],
                'nip' => $data['nip'],
                'tgl_pesan' => $data['tgl_pesan'],
                'tgl_faktur' => $data['tgl_faktur'] ?? null,
                'tgl_tempo' => $data['tgl_tempo'] ?? null,
                'total1' => $data['total1'],
                'potongan' => $data['potongan'],
                'total2' => $data['total2'],
                'ppn' => $data['ppn'],
                'meterai' => 0,
                'tagihan' => $data['tagihan'],
                'kd_bangsal' => $data['kd_bangsal'],
                'status' => 'Belum Dibayar',
            ]);

            foreach ($data['items'] as $it) {
                DetailPesan::create([
                    'no_faktur' => $noFaktur,
                    'kode_brng' => $it['kode_brng'],
                    'kode_sat' => $it['kode_sat'] ?? null,
                    'jumlah' => $it['jumlah'],
                    'h_pesan' => $it['harga'],
                    'subtotal' => $it['subtotal'] ?? 0,
                    'dis' => $it['dis'] ?? 0,
                    'besardis' => $it['besardis'] ?? 0,
                    'total' => $it['total'] ?? 0,
                    'no_batch' => $it['no_batch'] ?? null,
                    'jumlah2' => $it['jumlah2'] ?? $it['jumlah'],
                    'kadaluarsa' => $it['kadaluarsa'] ?? null,
                ]);
            }

            return response()->json(['status' => 'ok', 'no_faktur' => $noFaktur, 'no_order' => $data['no_order']]);
        });
    }

    public function generateNoOrder()
    {
        try {
            $today = now()->format('Ymd');
            $prefix = 'PO-' . $today . '-';
            return DB::connection('fufufafa')->transaction(function () use ($prefix) {
                $last = DB::connection('fufufafa')->table('pemesanan')
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
                while (DB::connection('fufufafa')->table('pemesanan')->where('no_order', $no)->exists()) {
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
        DB::connection('fufufafa')->transaction(function () use ($prefix, &$no) {
            $last = DB::connection('fufufafa')->table('pemesanan')
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
            while (DB::connection('fufufafa')->table('pemesanan')->where('no_faktur', $candidate)->exists()) {
                $next++;
                $candidate = $prefix.str_pad($next, 3, '0', STR_PAD_LEFT);
            }
            $no = $candidate;
        });

        return $no ?? ($prefix.'001');
    }
}

