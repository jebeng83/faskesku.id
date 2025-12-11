<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenilaianAwalKeperawatanRalanRencanaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_awal_keperawatan_ralan_rencana')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_awal_keperawatan_ralan_rencana')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/27/000002',
            'kode_rencana' => '001',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/18/000002',
            'kode_rencana' => '001',
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/25/000001',
            'kode_rencana' => '001',
          ),
          3 => 
          array (
            'no_rawat' => '2025/07/29/000001',
            'kode_rencana' => '001',
          ),
          4 => 
          array (
            'no_rawat' => '2025/07/29/000001',
            'kode_rencana' => '002',
          ),
          5 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'kode_rencana' => '001',
          ),
          6 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'kode_rencana' => '003',
          ),
          7 => 
          array (
            'no_rawat' => '2025/08/21/000001',
            'kode_rencana' => '001',
          ),
          8 => 
          array (
            'no_rawat' => '2025/08/21/000001',
            'kode_rencana' => '002',
          ),
          9 => 
          array (
            'no_rawat' => '2025/08/25/000001',
            'kode_rencana' => '001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}