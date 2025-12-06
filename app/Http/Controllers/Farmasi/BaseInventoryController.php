<?php

namespace App\Http\Controllers\Farmasi;

use App\Models\Farmasi\RiwayatBarangMedis;
use App\Models\Farmasi\TampJurnal;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class BaseInventoryController extends BaseController
{
    protected function adjustStockPlus(string $kodeBrg, string $kdBangsal, float $qty, ?string $noBatch = null, ?string $noFaktur = null): void
    {
        $noBatch = $noBatch ?? '';
        $noFaktur = $noFaktur ?? '';
        $exists = DB::table('gudangbarang')->where(['kode_brng' => $kodeBrg, 'kd_bangsal' => $kdBangsal, 'no_batch' => $noBatch, 'no_faktur' => $noFaktur])->exists();
        if ($exists) {
            DB::table('gudangbarang')->where(['kode_brng' => $kodeBrg, 'kd_bangsal' => $kdBangsal, 'no_batch' => $noBatch, 'no_faktur' => $noFaktur])->update(['stok' => DB::raw('stok+'.$qty)]);
        } else {
            DB::table('gudangbarang')->insert(['kode_brng' => $kodeBrg, 'kd_bangsal' => $kdBangsal, 'stok' => $qty, 'no_batch' => $noBatch, 'no_faktur' => $noFaktur]);
        }
    }

    protected function adjustStockMinus(string $kodeBrg, string $kdBangsal, float $qty, ?string $noBatch = null, ?string $noFaktur = null): void
    {
        $noBatch = $noBatch ?? '';
        $noFaktur = $noFaktur ?? '';
        DB::table('gudangbarang')->where(['kode_brng' => $kodeBrg, 'kd_bangsal' => $kdBangsal, 'no_batch' => $noBatch, 'no_faktur' => $noFaktur])->update(['stok' => DB::raw('stok-'.$qty)]);
    }

    protected function adjustBatchSisaDelta(string $kodeBrg, string $noBatch, string $noFaktur, float $delta): void
    {
        DB::table('data_batch')->where(['kode_brng' => $kodeBrg, 'no_batch' => $noBatch, 'no_faktur' => $noFaktur])->update(['sisa' => DB::raw('sisa+'.$delta)]);
    }

    protected function recordRiwayat(string $kodeBrg, string $kdBangsal, float $masuk, float $keluar, string $status, ?string $noBatch, ?string $noFaktur, ?string $keterangan, ?string $petugas): void
    {
        RiwayatBarangMedis::create([
            'kode_brng' => $kodeBrg,
            'stok_awal' => 0,
            'masuk' => $masuk,
            'keluar' => $keluar,
            'stok_akhir' => 0,
            'posisi' => $status,
            'tanggal' => now()->toDateString(),
            'jam' => now()->toTimeString(),
            'petugas' => $petugas ?? '-',
            'kd_bangsal' => $kdBangsal,
            'status' => 'Simpan',
            'no_batch' => $noBatch ?? '',
            'no_faktur' => $noFaktur ?? '',
            'keterangan' => $keterangan ?? '',
        ]);
    }

    protected function addJournalLines(array $lines): void
    {
        foreach ($lines as $l) {
            DB::table('tampjurnal')->insert([
                'kd_rek' => (string) $l[0],
                'nm_rek' => (string) ($l[1] ?? '-'),
                'debet' => (float) ($l[2] ?? 0),
                'kredit' => (float) ($l[3] ?? 0),
            ]);
        }
    }

    protected function stageJurnal(array $lines): void
    {
        DB::table('tampjurnal')->delete();
        $agg = [];
        foreach ($lines as $l) {
            $kd = $l[0];
            $nm = $l[1] ?? '-';
            $debet = (float) ($l[2] ?? 0);
            $kredit = (float) ($l[3] ?? 0);
            if (! isset($agg[$kd])) {
                $agg[$kd] = ['kd_rek' => $kd, 'nm_rek' => $nm, 'debet' => 0.0, 'kredit' => 0.0];
            }
            $agg[$kd]['nm_rek'] = $nm ?: ($agg[$kd]['nm_rek'] ?? '-');
            $agg[$kd]['debet'] += $debet;
            $agg[$kd]['kredit'] += $kredit;
        }
        foreach ($agg as $row) {
            DB::table('tampjurnal')->insert([
                'kd_rek' => (string) $row['kd_rek'],
                'nm_rek' => (string) ($row['nm_rek'] ?? '-'),
                'debet' => (float) $row['debet'],
                'kredit' => (float) $row['kredit'],
            ]);
        }
    }
}
