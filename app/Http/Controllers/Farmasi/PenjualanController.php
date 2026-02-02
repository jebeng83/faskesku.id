<?php

namespace App\Http\Controllers\Farmasi;

use App\Models\Farmasi\DetailJual;
use App\Models\Farmasi\Penjualan;
use App\Models\Farmasi\SetAkun;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class PenjualanController extends BaseInventoryController
{
    public function index()
    {
        $bangsal = DB::table('bangsal')->select('kd_bangsal', 'nm_bangsal')->orderBy('nm_bangsal')->get();
        $akunBayar = DB::table('akun_bayar')
            ->leftJoin('rekening', 'akun_bayar.kd_rek', '=', 'rekening.kd_rek')
            ->select('akun_bayar.kd_rek', 'akun_bayar.nama_bayar', 'rekening.nm_rek')
            ->orderBy('akun_bayar.nama_bayar')
            ->get();
        $petugas = DB::table('petugas')->select('nip', 'nama')->orderBy('nama')->get();

        return Inertia::render('farmasi/PenjualanObat', [
            'bangsal' => $bangsal,
            'akunBayar' => $akunBayar,
            'petugasList' => $petugas,
        ]);
    }

    public function generateNota()
    {
        $today = now()->format('Ymd');
        $prefix = 'JL-' . $today . '-';

        $last = DB::table('penjualan')
            ->where('nota_jual', 'LIKE', $prefix . '%')
            ->orderBy('nota_jual', 'desc')
            ->first();

        $next = 1;
        if ($last) {
            $lastNumber = (int) substr($last->nota_jual, -4);
            $next = $lastNumber + 1;
        }

        $no = $prefix . str_pad($next, 4, '0', STR_PAD_LEFT);
        return response()->json(['nota' => $no]);
    }

    public function listRiwayat(Request $request)
    {
        $query = Penjualan::query()
            ->with(['detail' => function($q) {
                $q->join('databarang', 'detailjual.kode_brng', '=', 'databarang.kode_brng')
                  ->select('detailjual.*', 'databarang.nama_brng');
            }, 'petugas']);

        if ($request->tgl_awal && $request->tgl_akhir) {
            $query->whereBetween('tgl_jual', [$request->tgl_awal, $request->tgl_akhir]);
        }

        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('nota_jual', 'like', "%{$request->search}%")
                  ->orWhere('nm_pasien', 'like', "%{$request->search}%")
                  ->orWhere('nip', 'like', "%{$request->search}%");
            });
        }

        // Clone query for total sum before pagination
        $totalQuery = clone $query;
        $totalSumDetail = DB::table('detailjual')
            ->whereIn('nota_jual', $totalQuery->pluck('nota_jual'))
            ->sum('total');
        $totalSumPPN = $totalQuery->sum('ppn');
        $totalPendapatan = $totalSumDetail + $totalSumPPN;

        $data = $query->orderBy('tgl_jual', 'desc')
                    ->orderBy('nota_jual', 'desc')
                    ->paginate(20);

        return response()->json([
            'data' => $data,
            'total_pendapatan' => (float)$totalPendapatan
        ]);
    }

    public function print($nota_jual)
    {
        $penjualan = Penjualan::with(['detail.barang', 'petugas'])
            ->where('nota_jual', $nota_jual)
            ->first();

        $instansi = null;
        if (Schema::hasTable('setting')) {
            $fields = [];
            foreach (['logo', 'nama_instansi', 'alamat_instansi', 'kabupaten', 'propinsi', 'kontak', 'email', 'kode_ppk'] as $col) {
                if (Schema::hasColumn('setting', $col)) {
                    $fields[] = $col;
                }
            }
            if (! empty($fields)) {
                $query = DB::table('setting')->select($fields);
                if (Schema::hasColumn('setting', 'aktifkan')) {
                    $query->where('aktifkan', 'Yes');
                }
                $row = $query->orderBy('nama_instansi')->first();
                if ($row) {
                    $instansi = [];
                    foreach ($fields as $f) {
                        $v = $row->{$f} ?? null;
                        if (is_string($v)) {
                            $v = preg_replace('/[\x00-\x1F\x7F]/u', '', $v);
                        }
                        $instansi[$f] = $v;
                    }
                }
            }
        }

        if (! $penjualan) {
            Log::warning("Penjualan nota {$nota_jual} tidak ditemukan untuk cetak.");
            return Inertia::render('farmasi/CetakPenjualan', [
                'penjualan' => null,
                'instansi' => $instansi,
                'nota' => $nota_jual,
            ]);
        }

        $details = [];
        foreach ($penjualan->detail as $it) {
            $details[] = [
                'nama_brng' => $it->barang->nama_brng ?? ($it->nama_brng ?? '-'),
                'kode_sat'  => !empty($it->kode_sat) && $it->kode_sat !== '-' ? $it->kode_sat : ($it->barang->kode_sat ?? '-'),
                'jumlah'    => (float) $it->jumlah,
                'h_jual'    => (float) $it->h_jual,
                'dis'       => (float) $it->dis,
                'total'     => (float) $it->total,
            ];
        }

        $cleanPenjualan = [
            'nota_jual' => $penjualan->nota_jual,
            'tgl_jual'  => $penjualan->tgl_jual,
            'nm_pasien' => $penjualan->nm_pasien,
            'nip'       => $penjualan->nip,
            'petugas'   => $penjualan->petugas->nama ?? '-',
            'ppn'       => (float) $penjualan->ppn,
            'ongkir'    => (float) $penjualan->ongkir,
            'detail'    => $details,
        ];

        return Inertia::render('farmasi/CetakPenjualan', [
            'penjualan' => $cleanPenjualan,
            'instansi' => $instansi,
            'nota' => $nota_jual,
        ]);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'nota_jual' => 'required|string',
            'tgl_jual' => 'required|date',
            'nip' => 'required|string',
            'no_rkm_medis' => 'nullable|string',
            'nm_pasien' => 'nullable|string',
            'keterangan' => 'nullable|string',
            'jns_jual' => 'required|string',
            'ongkir' => 'required|numeric',
            'ppn' => 'required|numeric',
            'status' => 'required|string',
            'kd_bangsal' => 'required|string',
            'kd_rek' => 'required|string',
            'nama_bayar' => 'nullable|string',
            'items' => 'required|array',
        ]);

        return DB::transaction(function () use ($data) {
            Penjualan::create([
                'nota_jual' => $data['nota_jual'],
                'tgl_jual' => $data['tgl_jual'],
                'nip' => $data['nip'],
                'no_rkm_medis' => $data['no_rkm_medis'] ?? null,
                'nm_pasien' => $data['nm_pasien'] ?? null,
                'keterangan' => $data['keterangan'] ?? null,
                'jns_jual' => $data['jns_jual'],
                'ongkir' => $data['ongkir'],
                'ppn' => $data['ppn'],
                'status' => $data['status'],
                'kd_bangsal' => $data['kd_bangsal'],
                'kd_rek' => $data['kd_rek'],
                'nama_bayar' => $data['nama_bayar'] ?? null,
            ]);

            $totalJual = 0.0;
            $totalHPP = 0.0;

            foreach ($data['items'] as $it) {
                $row = [
                    'nota_jual' => $data['nota_jual'],
                    'kode_brng' => $it['kode_brng'],
                    'kode_sat' => $it['kode_sat'] ?? null,
                    'h_beli' => $it['h_beli'] ?? 0,
                    'h_jual' => $it['h_jual'],
                    'jumlah' => $it['jumlah'],
                    'subtotal' => $it['subtotal'] ?? 0,
                    'dis' => $it['dis'] ?? 0,
                    'bsr_dis' => $it['bsr_dis'] ?? 0,
                    'tambahan' => $it['tambahan'] ?? 0,
                    'total' => $it['total'] ?? ($it['jumlah'] * $it['h_jual']),
                    'aturan_pakai' => $it['aturan_pakai'] ?? '',
                    'no_batch' => $it['no_batch'] ?? '-',
                    'no_faktur' => $it['no_faktur'] ?? '-',
                    'embalase' => $it['embalase'] ?? 0,
                    'tuslah' => $it['tuslah'] ?? 0,
                ];
                DetailJual::create($row);

                $qty = (float) $row['jumlah'];
                $nb = $row['no_batch'];
                $nf = $row['no_faktur'];

                $this->adjustStockMinus($row['kode_brng'], $data['kd_bangsal'], $qty, $nb, $nf);
                if ($nb && $nf) {
                    $this->adjustBatchSisaDelta($row['kode_brng'], $nb, $nf, -$qty);
                }
                $this->recordRiwayat($row['kode_brng'], $data['kd_bangsal'], 0, $qty, 'Penjualan', $nb, $nf, $data['nota_jual'], $data['nip']);

                $totalJual += (float) $row['total'];
                $totalHPP += (float) $row['h_beli'] * $qty;
            }

            $akun = SetAkun::query()->first();
            if ($akun) {
                $lines = [];
                $lines[] = [$akun->Penjualan_Obat, 'PENJUALAN OBAT BEBAS', 0, $totalJual + (float) $data['ongkir']];
                if ((float) $data['ppn'] > 0) {
                    $lines[] = [$akun->PPN_Keluaran, 'PPN KELUARAN', 0, (float) $data['ppn']];
                }
                $lines[] = [$data['kd_rek'], $data['nama_bayar'] ?: 'AKUN BAYAR', $totalJual + (float) $data['ongkir'] + (float) $data['ppn'], 0];
                $lines[] = [$akun->HPP_Obat_Jual_Bebas, 'HPP Obat Jual Bebas', $totalHPP, 0];
                $lines[] = [$akun->Persediaan_Obat_Jual_Bebas, 'Persediaan Obat Jual Bebas', 0, $totalHPP];
                $this->stageJurnal($lines);

                // Auto-post from staging to jurnal table
                try {
                    $journalService = app(\App\Services\Akutansi\JournalService::class);
                    $journalService->postFromStaging(
                        $data['nota_jual'], 
                        'U', 
                        'Posting otomatis Penjualan Obat nota ' . $data['nota_jual']
                    );
                } catch (\Exception $e) {
                    // Log the error but don't fail the transaction if journal posting fails
                    Log::error('Gagal posting jurnal otomatis: ' . $e->getMessage());
                }
            }

            return redirect()->back()->with('success', 'Transaksi Berhasil Disimpan! Nota: ' . $data['nota_jual']);
        });
    }
}
