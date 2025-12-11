<?php

namespace App\Services\Akutansi;

use Illuminate\Support\Facades\DB;

/**
 * Menyusun komposisi jurnal untuk permintaan Laboratorium Rawat Jalan dan menuliskannya ke staging tampjurnal2.
 * Menggunakan pemetaan akun dari set_akun_ralan (kolom Laborat_Ralan).
 */
class TampJurnalComposerLab
{
    /**
     * Compose dan tulis ke staging tampjurnal2 untuk noorder permintaan lab tertentu.
     *
     * @param  string  $noorder  Nomor order permintaan lab
     * @return array{debet:float,kredit:float,lines:array<int,array{kd_rek:string,debet:float,kredit:float}>}
     */
    public function composeForNoOrder(string $noorder): array
    {
        // Ambil detail permintaan lab dengan relasi jenis perawatan
        $details = DB::table('permintaan_detail_permintaan_lab')
            ->join('jns_perawatan_lab', 'permintaan_detail_permintaan_lab.kd_jenis_prw', '=', 'jns_perawatan_lab.kd_jenis_prw')
            ->where('permintaan_detail_permintaan_lab.noorder', $noorder)
            ->select(
                'jns_perawatan_lab.total_byr',
                'jns_perawatan_lab.bagian_rs',
                'jns_perawatan_lab.bhp',
                'jns_perawatan_lab.tarif_perujuk',
                'jns_perawatan_lab.tarif_tindakan_dokter',
                'jns_perawatan_lab.tarif_tindakan_petugas',
                'jns_perawatan_lab.kso',
                'jns_perawatan_lab.menejemen'
            )
            ->get();

        if ($details->isEmpty()) {
            return ['debet' => 0.0, 'kredit' => 0.0, 'lines' => []];
        }

        // Aggregasi komponen biaya dari detail permintaan lab
        $totalBiaya = (float) $details->sum('total_byr');
        $totalBagianRs = (float) $details->sum('bagian_rs');
        $totalBhp = (float) $details->sum('bhp');
        $totalTarifPerujuk = (float) $details->sum('tarif_perujuk');
        $totalTarifDokter = (float) $details->sum('tarif_tindakan_dokter');
        $totalTarifPetugas = (float) $details->sum('tarif_tindakan_petugas');
        $totalKso = (float) $details->sum('kso');
        $totalMenejemen = (float) $details->sum('menejemen');

        // Jasa sarana sebagai sisa biaya yang bukan komponen lainnya
        $totalSarana = max(0.0, round($totalBiaya - ($totalBagianRs + $totalBhp + $totalTarifPerujuk + $totalTarifDokter + $totalTarifPetugas + $totalKso + $totalMenejemen), 2));

        // Validasi pemetaan akun
        $akun = DB::table('set_akun_ralan')->first();
        if (! $akun) {
            throw new \RuntimeException('Pengaturan akun rawat jalan (set_akun_ralan) tidak ditemukan.');
        }

        $lines = [];

        // 1) Suspen Piutang vs Pendapatan Laborat
        $suspen = (string) ($akun->Suspen_Piutang_Laborat_Ralan ?? '');
        $pendapatan = (string) ($akun->Laborat_Ralan ?? '');
        if ($suspen === '' || $pendapatan === '') {
            throw new \RuntimeException('Akun Suspen/Pendapatan laborat rawat jalan belum terkonfigurasi.');
        }
        if ($totalBiaya > 0) {
            $lines[] = ['kd_rek' => $suspen, 'debet' => $totalBiaya, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => $pendapatan, 'debet' => 0.0, 'kredit' => $totalBiaya];
        }

        // 2) Beban/Utang Jasa Medik Dokter
        if (($akun->Beban_Jasa_Medik_Dokter_Laborat_Ralan ?? null) && ($akun->Utang_Jasa_Medik_Dokter_Laborat_Ralan ?? null) && $totalTarifDokter > 0) {
            $lines[] = ['kd_rek' => (string) $akun->Beban_Jasa_Medik_Dokter_Laborat_Ralan, 'debet' => $totalTarifDokter, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Utang_Jasa_Medik_Dokter_Laborat_Ralan, 'debet' => 0.0, 'kredit' => $totalTarifDokter];
        }

        // 3) Beban/Utang Jasa Medik Petugas
        if (($akun->Beban_Jasa_Medik_Petugas_Laborat_Ralan ?? null) && ($akun->Utang_Jasa_Medik_Petugas_Laborat_Ralan ?? null) && $totalTarifPetugas > 0) {
            $lines[] = ['kd_rek' => (string) $akun->Beban_Jasa_Medik_Petugas_Laborat_Ralan, 'debet' => $totalTarifPetugas, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Utang_Jasa_Medik_Petugas_Laborat_Ralan, 'debet' => 0.0, 'kredit' => $totalTarifPetugas];
        }

        // 4) Beban/Utang KSO
        if (($akun->Beban_Kso_Laborat_Ralan ?? null) && ($akun->Utang_Kso_Laborat_Ralan ?? null) && $totalKso > 0) {
            $lines[] = ['kd_rek' => (string) $akun->Beban_Kso_Laborat_Ralan, 'debet' => $totalKso, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Utang_Kso_Laborat_Ralan, 'debet' => 0.0, 'kredit' => $totalKso];
        }

        // 5) HPP/Persediaan BHP
        if (($akun->HPP_Persediaan_Laborat_Rawat_Jalan ?? null) && ($akun->Persediaan_BHP_Laborat_Rawat_Jalan ?? null) && $totalBhp > 0) {
            $lines[] = ['kd_rek' => (string) $akun->HPP_Persediaan_Laborat_Rawat_Jalan, 'debet' => $totalBhp, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Persediaan_BHP_Laborat_Rawat_Jalan, 'debet' => 0.0, 'kredit' => $totalBhp];
        }

        // 6) Beban/Utang Jasa Perujuk
        if (($akun->Beban_Jasa_Perujuk_Laborat_Ralan ?? null) && ($akun->Utang_Jasa_Perujuk_Laborat_Ralan ?? null) && $totalTarifPerujuk > 0) {
            $lines[] = ['kd_rek' => (string) $akun->Beban_Jasa_Perujuk_Laborat_Ralan, 'debet' => $totalTarifPerujuk, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Utang_Jasa_Perujuk_Laborat_Ralan, 'debet' => 0.0, 'kredit' => $totalTarifPerujuk];
        }

        // 7) Beban/Utang Jasa Sarana
        if (($akun->Beban_Jasa_Sarana_Laborat_Ralan ?? null) && ($akun->Utang_Jasa_Sarana_Laborat_Ralan ?? null) && $totalSarana > 0) {
            $lines[] = ['kd_rek' => (string) $akun->Beban_Jasa_Sarana_Laborat_Ralan, 'debet' => $totalSarana, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Utang_Jasa_Sarana_Laborat_Ralan, 'debet' => 0.0, 'kredit' => $totalSarana];
        }

        // 8) Beban/Utang Menejemen
        if (($akun->Beban_Jasa_Menejemen_Laborat_Ralan ?? null) && ($akun->Utang_Jasa_Menejemen_Laborat_Ralan ?? null) && $totalMenejemen > 0) {
            $lines[] = ['kd_rek' => (string) $akun->Beban_Jasa_Menejemen_Laborat_Ralan, 'debet' => $totalMenejemen, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Utang_Jasa_Menejemen_Laborat_Ralan, 'debet' => 0.0, 'kredit' => $totalMenejemen];
        }

        if (empty($lines)) {
            return ['debet' => 0.0, 'kredit' => 0.0, 'lines' => []];
        }

        // Gabungkan baris dengan kd_rek yang sama untuk menghindari duplicate key error
        // karena beberapa komponen biaya mungkin menggunakan akun yang sama
        $groupedLines = [];
        foreach ($lines as $line) {
            $kdRek = (string) $line['kd_rek'];
            if (! isset($groupedLines[$kdRek])) {
                $groupedLines[$kdRek] = [
                    'kd_rek' => $kdRek,
                    'debet' => 0.0,
                    'kredit' => 0.0,
                ];
            }
            $groupedLines[$kdRek]['debet'] += (float) $line['debet'];
            $groupedLines[$kdRek]['kredit'] += (float) $line['kredit'];
        }

        // Konversi kembali ke array indexed
        $mergedLines = array_values($groupedLines);

        // Tulis ke staging tampjurnal2 (kosongkan dulu agar idempoten untuk noorder ini)
        // Catatan: tampjurnal2 tidak memiliki noorder kolom, sehingga pengosongan bersifat global.
        DB::table('tampjurnal2')->delete();
        DB::table('tampjurnal2')->insert(array_map(function ($l) {
            return [
                'kd_rek' => $l['kd_rek'],
                'nm_rek' => null,
                'debet' => $l['debet'],
                'kredit' => $l['kredit'],
            ];
        }, $mergedLines));

        $totDeb = 0.0;
        $totKre = 0.0;
        foreach ($mergedLines as $l) {
            $totDeb += $l['debet'];
            $totKre += $l['kredit'];
        }

        return ['debet' => $totDeb, 'kredit' => $totKre, 'lines' => $mergedLines];
    }
}
