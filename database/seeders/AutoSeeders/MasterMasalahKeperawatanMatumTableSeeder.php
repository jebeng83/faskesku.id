<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterMasalahKeperawatanMatumTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_masalah_keperawatan_mata')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_masalah_keperawatan_mata')->insert(array (
          0 => 
          array (
            'kode_masalah' => '001',
            'nama_masalah' => 'MATA',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}