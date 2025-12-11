<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterRencanaKeperawatanGigiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_rencana_keperawatan_gigi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_rencana_keperawatan_gigi')->insert(array (
          0 => 
          array (
            'kode_masalah' => '001',
            'kode_rencana' => '001',
            'rencana_keperawatan' => 'Diberikan Antibiotik',
          ),
          1 => 
          array (
            'kode_masalah' => '002',
            'kode_rencana' => '002',
            'rencana_keperawatan' => 'Diberikan Antinyeri',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}