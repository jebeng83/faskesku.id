<?php

namespace App\Services\Akutansi;

use Illuminate\Support\Facades\DB;

class TampJurnalComposerPenyerahanResepRalan
{
    public function composeForNoResep(string $noResep): array
    {
        $resep = DB::table('resep_obat')->where('no_resep', $noResep)->first();
        if (! $resep) {
            throw new \RuntimeException('Resep tidak ditemukan');
        }
        $tgl = (string) ($resep->tgl_penyerahan ?? '');
        $jam = (string) ($resep->jam_penyerahan ?? '');
        if ($tgl === '' || $tgl === '0000-00-00' || $jam === '' || $jam === '00:00:00') {
            throw new \RuntimeException('Resep belum diserahkan');
        }

        $agg = DB::table('detail_pemberian_obat')
            ->where('no_rawat', $resep->no_rawat)
            ->where('tgl_perawatan', $tgl)
            ->where('jam', $jam)
            ->selectRaw('IFNULL(SUM(jml * biaya_obat),0) AS total_jual, IFNULL(SUM(jml * h_beli),0) AS total_hpp, IFNULL(SUM(embalase + tuslah),0) AS total_tambahan')
            ->first();

        $totalJual = (float) ($agg->total_jual ?? 0);
        $totalHpp = (float) ($agg->total_hpp ?? 0);
        $totalTambahan = (float) ($agg->total_tambahan ?? 0);

        $akun = DB::table('set_akun_ralan')->first();
        if (! $akun) {
            throw new \RuntimeException('Pengaturan akun rawat jalan tidak ditemukan');
        }

        $lines = [];

        $suspen = (string) ($akun->Suspen_Piutang_Obat_Ralan ?? '');
        $pendapatanObat = (string) ($akun->Obat_Ralan ?? '');
        if ($suspen === '' || $pendapatanObat === '') {
            throw new \RuntimeException('Akun Suspen/Pendapatan obat rawat jalan belum terkonfigurasi');
        }
        if ($totalJual > 0) {
            $lines[] = ['kd_rek' => $suspen, 'debet' => $totalJual, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => $pendapatanObat, 'debet' => 0.0, 'kredit' => $totalJual];
        }

        $hppObat = (string) ($akun->HPP_Obat_Rawat_Jalan ?? '');
        $persediaanObat = (string) ($akun->Persediaan_Obat_Rawat_Jalan ?? '');
        if ($hppObat === '' || $persediaanObat === '') {
            throw new \RuntimeException('Akun HPP/Persediaan obat rawat jalan belum terkonfigurasi');
        }
        if ($totalHpp > 0) {
            $lines[] = ['kd_rek' => $hppObat, 'debet' => $totalHpp, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => $persediaanObat, 'debet' => 0.0, 'kredit' => $totalHpp];
        }

        if ($totalTambahan > 0) {
            $tambahanRek = (string) ($akun->Tambahan_Ralan ?? '');
            if ($tambahanRek === '') {
                throw new \RuntimeException('Akun Tambahan_Ralan belum terkonfigurasi.');
            }
            $lines[] = ['kd_rek' => $suspen, 'debet' => $totalTambahan, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => $tambahanRek, 'debet' => 0.0, 'kredit' => $totalTambahan];
        }

        if (empty($lines)) {
            return ['debet' => 0.0, 'kredit' => 0.0, 'lines' => []];
        }

        $grouped = [];
        foreach ($lines as $l) {
            $k = $l['kd_rek'];
            if (! isset($grouped[$k])) {
                $grouped[$k] = ['kd_rek' => $k, 'debet' => 0.0, 'kredit' => 0.0];
            }
            $grouped[$k]['debet'] += (float) $l['debet'];
            $grouped[$k]['kredit'] += (float) $l['kredit'];
        }

        DB::table('tampjurnal2')->delete();
        DB::table('tampjurnal2')->insert(array_map(function ($l) {
            return [
                'kd_rek' => $l['kd_rek'],
                'nm_rek' => null,
                'debet' => $l['debet'],
                'kredit' => $l['kredit'],
            ];
        }, array_values($grouped)));

        $totDeb = 0.0;
        $totKre = 0.0;
        foreach ($grouped as $l) {
            $totDeb += $l['debet'];
            $totKre += $l['kredit'];
        }

        return ['debet' => $totDeb, 'kredit' => $totKre, 'lines' => array_values($grouped)];
    }
}
