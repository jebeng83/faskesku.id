<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AkunAsetInventariTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('akun_aset_inventaris')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('akun_aset_inventaris')->insert(array (
          0 => 
          array (
            'kd_rek' => '123103',
            'id_jenis' => 'JI001',
          ),
          1 => 
          array (
            'kd_rek' => '123103',
            'id_jenis' => 'JI004',
          ),
          2 => 
          array (
            'kd_rek' => '123104',
            'id_jenis' => '-',
          ),
          3 => 
          array (
            'kd_rek' => '123104',
            'id_jenis' => 'AK',
          ),
          4 => 
          array (
            'kd_rek' => '123104',
            'id_jenis' => 'JI005',
          ),
          5 => 
          array (
            'kd_rek' => '123105',
            'id_jenis' => 'JI006',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}