<?php

namespace App\Services\Akutansi;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class JournalService
{
    /**
     * Posting dari tampjurnal ke jurnal/detailjurnal.
     * - Validasi jml > 0
     * - Validasi total debet == total kredit
     * - Generate no_jurnal: JRYYYYMMDDNNNNNN
     * - Insert ke jurnal, lalu detailjurnal, kemudian kosongkan tampjurnal
     */
    public function postFromStaging(string $noBukti, string $jenis = 'U', string $keterangan = 'Posting otomatis'): array
    {
        // Validasi sebelum transaction
        $agg = DB::table('tampjurnal')
            ->select(DB::raw('COUNT(*) AS jml'), DB::raw('IFNULL(SUM(debet),0) AS debet'), DB::raw('IFNULL(SUM(kredit),0) AS kredit'))
            ->first();

        if (! $agg || (int) $agg->jml <= 0) {
            return ['status' => 'error', 'message' => 'Tidak ada data di tampjurnal untuk diposting'];
        }
        $debet = (float) $agg->debet;
        $kredit = (float) $agg->kredit;
        if (abs($debet - $kredit) > 0.01) {
            return ['status' => 'error', 'message' => 'Total debet dan kredit tidak seimbang'];
        }

        // Pastikan menggunakan transaction dengan benar
        try {
            return DB::transaction(function () use ($noBukti, $jenis, $keterangan) {
                $now = Carbon::now();
                $tgl = $now->toDateString();
                $jam = $now->format('H:i:s');

                // Generate no_jurnal dengan lock untuk menghindari race condition
                $prefix = 'JR'.$now->format('Ymd');
                $maxSuffix = DB::table('jurnal')
                    ->whereDate('tgl_jurnal', $tgl)
                    ->lockForUpdate()
                    ->select(DB::raw('IFNULL(MAX(CONVERT(RIGHT(no_jurnal,6),SIGNED)),0) AS mx'))
                    ->value('mx');
                $newSuffix = (int) $maxSuffix + 1;
                $suffix = str_pad((string) $newSuffix, 6, '0', STR_PAD_LEFT);
                $noJurnal = $prefix.$suffix;

                // Insert header jurnal
                DB::table('jurnal')->insert([
                    'no_jurnal' => $noJurnal,
                    'no_bukti' => $noBukti,
                    'tgl_jurnal' => $tgl,
                    'jam_jurnal' => $jam,
                    'jenis' => $jenis,
                    'keterangan' => $keterangan,
                ]);

                // Ambil semua baris dari tampjurnal dan insert ke detailjurnal
                $rows = DB::table('tampjurnal')->get();
                $detailRows = [];
                foreach ($rows as $row) {
                    $detailRows[] = [
                        'no_jurnal' => $noJurnal,
                        'kd_rek' => $row->kd_rek,
                        'debet' => (float) $row->debet,
                        'kredit' => (float) $row->kredit,
                    ];
                }

                // Insert detail dalam batch untuk efisiensi
                if (! empty($detailRows)) {
                    DB::table('detailjurnal')->insert($detailRows);
                }

                // Kosongkan tampjurnal setelah berhasil insert
                // Gunakan delete() bukan truncate() karena truncate() tidak bisa dilakukan dalam transaction
                DB::table('tampjurnal')->delete();

                return [
                    'status' => 'ok',
                    'no_jurnal' => $noJurnal,
                    'posted_rows' => count($rows),
                ];
            });
        } catch (\Illuminate\Database\QueryException $e) {
            \Log::error('Error posting jurnal dari staging', [
                'no_bukti' => $noBukti,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return [
                'status' => 'error',
                'message' => 'Gagal posting jurnal: '.$e->getMessage(),
            ];
        } catch (\Throwable $e) {
            \Log::error('Unexpected error posting jurnal dari staging', [
                'no_bukti' => $noBukti,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return [
                'status' => 'error',
                'message' => 'Gagal posting jurnal: '.$e->getMessage(),
            ];
        }
    }
}
