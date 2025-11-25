<?php

namespace App\Services\Akutansi;

use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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
        $agg = DB::table('tampjurnal')
            ->select(DB::raw('COUNT(*) AS jml'), DB::raw('IFNULL(SUM(debet),0) AS debet'), DB::raw('IFNULL(SUM(kredit),0) AS kredit'))
            ->first();

        if (!$agg || (int)$agg->jml <= 0) {
            return ['status' => 'error', 'message' => 'Tidak ada data di tampjurnal untuk diposting'];
        }
        $debet = (float)$agg->debet;
        $kredit = (float)$agg->kredit;
        if (bccomp($debet, $kredit, 2) !== 0) {
            return ['status' => 'error', 'message' => 'Total debet dan kredit tidak seimbang'];
        }

        return DB::transaction(function () use ($noBukti, $jenis, $keterangan) {
            $now = Carbon::now();
            $tgl = $now->toDateString();
            $jam = $now->format('H:i:s');

            $prefix = 'JR' . $now->format('Ymd');
            $maxSuffix = DB::table('jurnal')
                ->whereDate('tgl_jurnal', $tgl)
                ->select(DB::raw('IFNULL(MAX(CONVERT(RIGHT(no_jurnal,6),SIGNED)),0) AS mx'))
                ->value('mx');
            $newSuffix = (int)$maxSuffix + 1;
            $suffix = str_pad((string)$newSuffix, 6, '0', STR_PAD_LEFT);
            $noJurnal = $prefix . $suffix;

            DB::table('jurnal')->insert([
                'no_jurnal'  => $noJurnal,
                'no_bukti'   => $noBukti,
                'tgl_jurnal' => $tgl,
                'jam_jurnal' => $jam,
                'jenis'      => $jenis,
                'keterangan' => $keterangan,
            ]);

            $rows = DB::table('tampjurnal')->get();
            foreach ($rows as $row) {
                DB::table('detailjurnal')->insert([
                    'no_jurnal' => $noJurnal,
                    'kd_rek'    => $row->kd_rek,
                    'debet'     => $row->debet,
                    'kredit'    => $row->kredit,
                ]);
            }

            DB::table('tampjurnal')->truncate();

            return [
                'status' => 'ok',
                'no_jurnal' => $noJurnal,
                'posted_rows' => count($rows),
            ];
        });
    }
}

