<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterMasalahKeperawatanNeonatuTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_masalah_keperawatan_neonatus')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_masalah_keperawatan_neonatus')->insert(array (
          0 => 
          array (
            'kode_masalah' => '001',
            'nama_masalah' => 'tes',
          ),
          1 => 
          array (
            'kode_masalah' => '002',
            'nama_masalah' => 'tes2',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}