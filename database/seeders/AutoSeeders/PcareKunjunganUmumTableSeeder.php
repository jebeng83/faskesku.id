<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PcareKunjunganUmumTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pcare_kunjungan_umum')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pcare_kunjungan_umum')->insert([
            0 => [
                'no_rawat' => '2025/11/12/000001',
                'noKunjungan' => null,
                'tglDaftar' => '2025-11-12',
                'no_rkm_medis' => '000057',
                'nm_pasien' => 'AGUS BUDIYONO,A. Md.Kep',
                'noKartu' => '0001441909697',
                'kdPoli' => '001',
                'nmPoli' => null,
                'keluhan' => 'Pasien melakukan kontrol rutin.',
                'kdSadar' => '04',
                'nmSadar' => null,
                'sistole' => '120',
                'diastole' => '80',
                'beratBadan' => '89',
                'tinggiBadan' => '165',
                'respRate' => '20',
                'heartRate' => '80',
                'lingkarPerut' => '72',
                'terapi' => null,
                'kdStatusPulang' => '3',
                'nmStatusPulang' => null,
                'tglPulang' => '2025-11-12',
                'kdDokter' => '132183',
                'nmDokter' => null,
                'kdDiag1' => 'H52.5',
                'nmDiag1' => null,
                'kdDiag2' => null,
                'nmDiag2' => null,
                'kdDiag3' => null,
                'nmDiag3' => null,
                'status' => 'Gagal',
                'KdAlergiMakanan' => '',
                'NmAlergiMakanan' => '',
                'KdAlergiUdara' => '',
                'NmAlergiUdara' => '',
                'KdAlergiObat' => '',
                'NmAlergiObat' => '',
                'KdPrognosa' => '',
                'NmPrognosa' => '',
                'terapi_non_obat' => '',
                'bmhp' => 'Tidak Ada',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
