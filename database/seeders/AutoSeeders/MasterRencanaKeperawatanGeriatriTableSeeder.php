<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterRencanaKeperawatanGeriatriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_rencana_keperawatan_geriatri')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_rencana_keperawatan_geriatri')->insert(array (
          0 => 
          array (
            'kode_masalah' => '001',
            'kode_rencana' => '001',
            'rencana_keperawatan' => 'tes juga',
          ),
          1 => 
          array (
            'kode_masalah' => '001',
            'kode_rencana' => '002',
            'rencana_keperawatan' => 'tes lagi',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}