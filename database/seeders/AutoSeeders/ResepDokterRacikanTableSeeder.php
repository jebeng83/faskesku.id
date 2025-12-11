<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ResepDokterRacikanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('resep_dokter_racikan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('resep_dokter_racikan')->insert(array (
          0 => 
          array (
            'no_resep' => '202505260001',
            'no_racik' => '1',
            'nama_racik' => 'R1',
            'kd_racik' => 'R01',
            'jml_dr' => 13,
            'aturan_pakai' => '2 X 1',
            'keterangan' => '-',
          ),
          1 => 
          array (
            'no_resep' => '202505260002',
            'no_racik' => '1',
            'nama_racik' => 'R1',
            'kd_racik' => 'R01',
            'jml_dr' => 13,
            'aturan_pakai' => '2 X 1',
            'keterangan' => '-',
          ),
          2 => 
          array (
            'no_resep' => '202506200002',
            'no_racik' => '1',
            'nama_racik' => 'R1',
            'kd_racik' => 'R01',
            'jml_dr' => 10,
            'aturan_pakai' => '3 x 1',
            'keterangan' => '-',
          ),
          3 => 
          array (
            'no_resep' => '202506200003',
            'no_racik' => '1',
            'nama_racik' => 'R1',
            'kd_racik' => 'R01',
            'jml_dr' => 13,
            'aturan_pakai' => '2 X 1',
            'keterangan' => '-',
          ),
          4 => 
          array (
            'no_resep' => '202506300001',
            'no_racik' => '1',
            'nama_racik' => 'R1',
            'kd_racik' => 'R01',
            'jml_dr' => 10,
            'aturan_pakai' => '2 X 1',
            'keterangan' => 'HABISKAN',
          ),
          5 => 
          array (
            'no_resep' => '202506300002',
            'no_racik' => '1',
            'nama_racik' => 'R1',
            'kd_racik' => 'R01',
            'jml_dr' => 13,
            'aturan_pakai' => '2 X 1',
            'keterangan' => '-',
          ),
          6 => 
          array (
            'no_resep' => '202507230002',
            'no_racik' => '1',
            'nama_racik' => 'R1',
            'kd_racik' => 'R01',
            'jml_dr' => 14,
            'aturan_pakai' => '3 x 1',
            'keterangan' => 'HABISKAN',
          ),
          7 => 
          array (
            'no_resep' => '202507290001',
            'no_racik' => '1',
            'nama_racik' => 'R1',
            'kd_racik' => 'R01',
            'jml_dr' => 14,
            'aturan_pakai' => '3 x 1',
            'keterangan' => 'HABISKAN',
          ),
          8 => 
          array (
            'no_resep' => '202508040002',
            'no_racik' => '1',
            'nama_racik' => 'R1',
            'kd_racik' => 'R01',
            'jml_dr' => 14,
            'aturan_pakai' => '2 X 1',
            'keterangan' => '-',
          ),
          9 => 
          array (
            'no_resep' => '202508050001',
            'no_racik' => '1',
            'nama_racik' => 'R1',
            'kd_racik' => 'R01',
            'jml_dr' => 16,
            'aturan_pakai' => '2 X 1',
            'keterangan' => '-',
          ),
          10 => 
          array (
            'no_resep' => '202508210001',
            'no_racik' => '1',
            'nama_racik' => 'R1',
            'kd_racik' => 'R01',
            'jml_dr' => 12,
            'aturan_pakai' => '3 x 1',
            'keterangan' => '-',
          ),
          11 => 
          array (
            'no_resep' => '202508250003',
            'no_racik' => '1',
            'nama_racik' => 'R BATUK',
            'kd_racik' => 'R01',
            'jml_dr' => 12,
            'aturan_pakai' => '2 X 1',
            'keterangan' => '-',
          ),
          12 => 
          array (
            'no_resep' => '202508250003',
            'no_racik' => '2',
            'nama_racik' => 'R ANTIBIO',
            'kd_racik' => 'R01',
            'jml_dr' => 13,
            'aturan_pakai' => '3 x 1',
            'keterangan' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}