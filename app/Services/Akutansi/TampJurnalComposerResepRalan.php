<?php

namespace App\Services\Akutansi;

use Illuminate\Support\Facades\DB;

/**
 * Menyusun komposisi jurnal untuk resep obat Rawat Jalan dan menuliskannya ke staging tampjurnal2.
 * Akun menggunakan pemetaan dari tabel set_akun_ralan.
 *
 * Baris jurnal yang disusun:
 * - Suspen Piutang Obat Ralan (Debet) vs Pendapatan Obat (Kredit)
 * - HPP Obat Rawat Jalan (Debet) vs Persediaan Obat Rawat Jalan (Kredit)
 */
class TampJurnalComposerResepRalan
{
    /**
     * Compose dan tulis ke tampjurnal2 untuk nomor resep tertentu.
     *
     * @return array{debet:float,kredit:float,lines:array<int,array{kd_rek:string,debet:float,kredit:float}>}
     */
    public function composeForNoResep(string $noResep): array
    {
        // Agregasi total nilai jual dan HPP dari detail resep
        $agg = DB::table('resep_dokter AS rd')
            ->join('databarang AS db', 'db.kode_brng', '=', 'rd.kode_brng')
            ->where('rd.no_resep', $noResep)
            ->selectRaw('IFNULL(SUM(rd.jml * db.ralan),0) AS total_jual, IFNULL(SUM(rd.jml * db.h_beli),0) AS total_hpp')
            ->first();

        $totalJual = (float) ($agg->total_jual ?? 0);
        $totalHpp = (float) ($agg->total_hpp ?? 0);

        // Validasi pemetaan akun
        $akun = DB::table('set_akun_ralan')->first();
        if (! $akun) {
            throw new \RuntimeException('Pengaturan akun rawat jalan (set_akun_ralan) tidak ditemukan.');
        }

        $lines = [];

        // 1) Suspen Piutang Obat Ralan vs Pendapatan Obat
        $suspen = (string) ($akun->Suspen_Piutang_Obat_Ralan ?? '');
        $pendapatanObat = (string) ($akun->Obat_Ralan ?? '');
        if ($suspen === '' || $pendapatanObat === '') {
            throw new \RuntimeException('Akun Suspen/Pendapatan obat rawat jalan belum terkonfigurasi.');
        }
        if ($totalJual > 0) {
            $lines[] = ['kd_rek' => $suspen, 'debet' => $totalJual, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => $pendapatanObat, 'debet' => 0.0, 'kredit' => $totalJual];
        }

        // 2) HPP Obat vs Persediaan Obat
        $hppObat = (string) ($akun->HPP_Obat_Rawat_Jalan ?? '');
        $persediaanObat = (string) ($akun->Persediaan_Obat_Rawat_Jalan ?? '');
        if ($hppObat === '' || $persediaanObat === '') {
            throw new \RuntimeException('Akun HPP/Persediaan obat rawat jalan belum terkonfigurasi.');
        }
        if ($totalHpp > 0) {
            $lines[] = ['kd_rek' => $hppObat, 'debet' => $totalHpp, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => $persediaanObat, 'debet' => 0.0, 'kredit' => $totalHpp];
        }

        if (empty($lines)) {
            return ['debet' => 0.0, 'kredit' => 0.0, 'lines' => []];
        }

        // Tulis ke staging tampjurnal2 (kosongkan dulu)
        DB::table('tampjurnal2')->delete();
        DB::table('tampjurnal2')->insert(array_map(function ($l) {
            return [
                'kd_rek' => $l['kd_rek'],
                'nm_rek' => null,
                'debet' => $l['debet'],
                'kredit' => $l['kredit'],
            ];
        }, $lines));

        $totDeb = 0.0;
        $totKre = 0.0;
        foreach ($lines as $l) {
            $totDeb += $l['debet'];
            $totKre += $l['kredit'];
        }

        return ['debet' => $totDeb, 'kredit' => $totKre, 'lines' => $lines];
    }
}
