<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenilaianAwalKeperawatanRalanMasalahTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_awal_keperawatan_ralan_masalah')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_awal_keperawatan_ralan_masalah')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/27/000002',
            'kode_masalah' => '001',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/18/000002',
            'kode_masalah' => '001',
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/25/000001',
            'kode_masalah' => '001',
          ),
          3 => 
          array (
            'no_rawat' => '2025/07/29/000001',
            'kode_masalah' => '001',
          ),
          4 => 
          array (
            'no_rawat' => '2025/07/29/000001',
            'kode_masalah' => '004',
          ),
          5 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'kode_masalah' => '001',
          ),
          6 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'kode_masalah' => '002',
          ),
          7 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'kode_masalah' => '008',
          ),
          8 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'kode_masalah' => '009',
          ),
          9 => 
          array (
            'no_rawat' => '2025/08/21/000001',
            'kode_masalah' => '001',
          ),
          10 => 
          array (
            'no_rawat' => '2025/08/25/000001',
            'kode_masalah' => '001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}