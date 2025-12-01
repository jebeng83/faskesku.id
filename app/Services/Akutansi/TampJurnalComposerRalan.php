<?php

namespace App\Services\Akutansi;

use Illuminate\Support\Facades\DB;

/**
 * Menyusun komposisi jurnal untuk tindakan Rawat Jalan (umum) dan menuliskannya ke staging paralel tampjurnal2.
 * Menggunakan pemetaan akun dari set_akun_ralan.
 */
class TampJurnalComposerRalan
{
    /**
     * Compose dan tulis ke staging tampjurnal2 untuk no_rawat tertentu.
     *
     * @param string $noRawat
     * @return array{debet:float,kredit:float,lines:array<int,array{kd_rek:string,debet:float,kredit:float}>}
     */
    public function composeForNoRawat(string $noRawat): array
    {
        // Aggregasi komponen biaya dari tabel tindakan rawat jalan
        $aggDr = DB::table('rawat_jl_dr')
            ->where('no_rawat', $noRawat)
            ->selectRaw('IFNULL(SUM(biaya_rawat),0) AS biaya, IFNULL(SUM(bhp),0) AS bhp, IFNULL(SUM(kso),0) AS kso, IFNULL(SUM(menejemen),0) AS manajemen, IFNULL(SUM(tarif_tindakandr),0) AS dr')
            ->first();
        $aggPr = DB::table('rawat_jl_pr')
            ->where('no_rawat', $noRawat)
            ->selectRaw('IFNULL(SUM(biaya_rawat),0) AS biaya, IFNULL(SUM(bhp),0) AS bhp, IFNULL(SUM(kso),0) AS kso, IFNULL(SUM(menejemen),0) AS manajemen, IFNULL(SUM(tarif_tindakanpr),0) AS pr')
            ->first();
        $aggDrPr = DB::table('rawat_jl_drpr')
            ->where('no_rawat', $noRawat)
            ->selectRaw('IFNULL(SUM(biaya_rawat),0) AS biaya, IFNULL(SUM(bhp),0) AS bhp, IFNULL(SUM(kso),0) AS kso, IFNULL(SUM(menejemen),0) AS manajemen, IFNULL(SUM(tarif_tindakandr),0) AS dr, IFNULL(SUM(tarif_tindakanpr),0) AS pr')
            ->first();

        $totalBiaya = (float) (($aggDr->biaya ?? 0) + ($aggPr->biaya ?? 0) + ($aggDrPr->biaya ?? 0));
        $totalBhp = (float) (($aggDr->bhp ?? 0) + ($aggPr->bhp ?? 0) + ($aggDrPr->bhp ?? 0));
        $totalKso = (float) (($aggDr->kso ?? 0) + ($aggPr->kso ?? 0) + ($aggDrPr->kso ?? 0));
        $totalManajemen = (float) (($aggDr->manajemen ?? 0) + ($aggPr->manajemen ?? 0) + ($aggDrPr->manajemen ?? 0));
        $totalDr = (float) (($aggDr->dr ?? 0) + ($aggDrPr->dr ?? 0));
        $totalPr = (float) (($aggPr->pr ?? 0) + ($aggDrPr->pr ?? 0));

        // Jasa sarana sebagai sisa biaya yang bukan DR/PR/KSO/Manajemen/BHP
        $totalSarana = max(0.0, round($totalBiaya - ($totalDr + $totalPr + $totalKso + $totalManajemen + $totalBhp), 2));

        // Validasi pemetaan akun
        $akun = DB::table('set_akun_ralan')->first();
        if (!$akun) {
            throw new \RuntimeException('Pengaturan akun rawat jalan (set_akun_ralan) tidak ditemukan.');
        }

        $lines = [];

        // 1) Suspen Piutang vs Pendapatan Tindakan
        $suspen = (string) ($akun->Suspen_Piutang_Tindakan_Ralan ?? '');
        $pendapatan = (string) ($akun->Tindakan_Ralan ?? '');
        if ($suspen === '' || $pendapatan === '') {
            throw new \RuntimeException('Akun Suspen/Pendapatan tindakan rawat jalan belum terkonfigurasi.');
        }
        if ($totalBiaya > 0) {
            $lines[] = ['kd_rek' => $suspen, 'debet' => $totalBiaya, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => $pendapatan, 'debet' => 0.0, 'kredit' => $totalBiaya];
        }

        // 2) Beban/Utang Jasa Medik Dokter
        if (($akun->Beban_Jasa_Medik_Dokter_Tindakan_Ralan ?? null) && ($akun->Utang_Jasa_Medik_Dokter_Tindakan_Ralan ?? null) && $totalDr > 0) {
            $lines[] = ['kd_rek' => (string) $akun->Beban_Jasa_Medik_Dokter_Tindakan_Ralan, 'debet' => $totalDr, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Utang_Jasa_Medik_Dokter_Tindakan_Ralan, 'debet' => 0.0, 'kredit' => $totalDr];
        }

        // 3) Beban/Utang Jasa Medik Paramedis
        if (($akun->Beban_Jasa_Medik_Paramedis_Tindakan_Ralan ?? null) && ($akun->Utang_Jasa_Medik_Paramedis_Tindakan_Ralan ?? null) && $totalPr > 0) {
            $lines[] = ['kd_rek' => (string) $akun->Beban_Jasa_Medik_Paramedis_Tindakan_Ralan, 'debet' => $totalPr, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Utang_Jasa_Medik_Paramedis_Tindakan_Ralan, 'debet' => 0.0, 'kredit' => $totalPr];
        }

        // 4) Beban/Utang KSO
        if (($akun->Beban_KSO_Tindakan_Ralan ?? null) && ($akun->Utang_KSO_Tindakan_Ralan ?? null) && $totalKso > 0) {
            $lines[] = ['kd_rek' => (string) $akun->Beban_KSO_Tindakan_Ralan, 'debet' => $totalKso, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Utang_KSO_Tindakan_Ralan, 'debet' => 0.0, 'kredit' => $totalKso];
        }

        // 5) HPP/Persediaan BHP
        if (($akun->HPP_BHP_Tindakan_Ralan ?? null) && ($akun->Persediaan_BHP_Tindakan_Ralan ?? null) && $totalBhp > 0) {
            $lines[] = ['kd_rek' => (string) $akun->HPP_BHP_Tindakan_Ralan, 'debet' => $totalBhp, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Persediaan_BHP_Tindakan_Ralan, 'debet' => 0.0, 'kredit' => $totalBhp];
        }

        // 6) Beban/Utang Menejemen
        if (($akun->Beban_Jasa_Menejemen_Tindakan_Ralan ?? null) && ($akun->Utang_Jasa_Menejemen_Tindakan_Ralan ?? null) && $totalManajemen > 0) {
            $lines[] = ['kd_rek' => (string) $akun->Beban_Jasa_Menejemen_Tindakan_Ralan, 'debet' => $totalManajemen, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Utang_Jasa_Menejemen_Tindakan_Ralan, 'debet' => 0.0, 'kredit' => $totalManajemen];
        }

        // 7) Beban/Utang Jasa Sarana
        if (($akun->Beban_Jasa_Sarana_Tindakan_Ralan ?? null) && ($akun->Utang_Jasa_Sarana_Tindakan_Ralan ?? null) && $totalSarana > 0) {
            $lines[] = ['kd_rek' => (string) $akun->Beban_Jasa_Sarana_Tindakan_Ralan, 'debet' => $totalSarana, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Utang_Jasa_Sarana_Tindakan_Ralan, 'debet' => 0.0, 'kredit' => $totalSarana];
        }

        if (empty($lines)) {
            return ['debet' => 0.0, 'kredit' => 0.0, 'lines' => []];
        }

        // Hitung total debet dan kredit untuk validasi
        $totDeb = 0.0;
        $totKre = 0.0;
        foreach ($lines as $l) {
            $totDeb += $l['debet'];
            $totKre += $l['kredit'];
        }

        // Validasi: pastikan debet dan kredit seimbang sebelum menulis ke staging
        if (round($totDeb, 2) !== round($totKre, 2)) {
            throw new \RuntimeException(
                sprintf(
                    'Komposisi jurnal tidak seimbang: Debet = %s, Kredit = %s, Selisih = %s. Periksa konfigurasi akun di set_akun_ralan.',
                    number_format($totDeb, 2, '.', ','),
                    number_format($totKre, 2, '.', ','),
                    number_format(abs($totDeb - $totKre), 2, '.', ',')
                )
            );
        }

        // Tulis ke staging tampjurnal2 (kosongkan dulu agar idempoten untuk no_rawat ini)
        // Catatan: tampjurnal2 tidak memiliki no_rawat kolom, sehingga pengosongan bersifat global.
        // Catatan: tampjurnal sudah dibersihkan di controller sebelum memanggil composer ini
        DB::table('tampjurnal2')->delete();
        DB::table('tampjurnal2')->insert(array_map(function ($l) {
            return [
                'kd_rek' => $l['kd_rek'],
                'nm_rek' => null,
                'debet' => $l['debet'],
                'kredit' => $l['kredit'],
            ];
        }, $lines));

        return ['debet' => $totDeb, 'kredit' => $totKre, 'lines' => $lines];
    }
}