<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterMasalahKeperawatanGeriatriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_masalah_keperawatan_geriatri')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_masalah_keperawatan_geriatri')->insert(array (
          0 => 
          array (
            'kode_masalah' => '001',
            'nama_masalah' => 'tes 1',
          ),
          1 => 
          array (
            'kode_masalah' => '002',
            'nama_masalah' => 'tes 2',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}