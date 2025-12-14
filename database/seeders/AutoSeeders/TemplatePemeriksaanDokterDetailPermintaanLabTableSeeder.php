<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TemplatePemeriksaanDokterDetailPermintaanLabTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('template_pemeriksaan_dokter_detail_permintaan_lab')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('template_pemeriksaan_dokter_detail_permintaan_lab')->insert([
            0 => [
                'no_template' => 'TPD0000000000000004',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 665,
            ],
            1 => [
                'no_template' => 'TPD0000000000000004',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 666,
            ],
            2 => [
                'no_template' => 'TPD0000000000000004',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 667,
            ],
            3 => [
                'no_template' => 'TPD0000000000000004',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 668,
            ],
            4 => [
                'no_template' => 'TPD0000000000000004',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 669,
            ],
            5 => [
                'no_template' => 'TPD0000000000000004',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 670,
            ],
            6 => [
                'no_template' => 'TPD0000000000000004',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 671,
            ],
            7 => [
                'no_template' => 'TPD0000000000000004',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 672,
            ],
            8 => [
                'no_template' => 'TPD0000000000000004',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 673,
            ],
            9 => [
                'no_template' => 'TPD0000000000000004',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 674,
            ],
            10 => [
                'no_template' => 'TPD0000000000000004',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 675,
            ],
            11 => [
                'no_template' => 'TPD0000000000000004',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 2198,
            ],
            12 => [
                'no_template' => 'TPD0000000000000004',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 2199,
            ],
            13 => [
                'no_template' => 'TPD0000000000000004',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 2200,
            ],
            14 => [
                'no_template' => 'TPD0000000000000004',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 2201,
            ],
            15 => [
                'no_template' => 'TPD0000000000000004',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 2202,
            ],
            16 => [
                'no_template' => 'TPD0000000000000010',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 665,
            ],
            17 => [
                'no_template' => 'TPD0000000000000011',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 665,
            ],
            18 => [
                'no_template' => 'TPD0000000000000011',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 671,
            ],
            19 => [
                'no_template' => 'TPD0000000000000011',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 672,
            ],
            20 => [
                'no_template' => 'TPD0000000000000011',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 674,
            ],
            21 => [
                'no_template' => 'TPD0000000000000011',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 675,
            ],
            22 => [
                'no_template' => 'TPD0000000000000011',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 2198,
            ],
            23 => [
                'no_template' => 'TPD0000000000000011',
                'kd_jenis_prw' => '102-K.2',
                'id_template' => 2201,
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
