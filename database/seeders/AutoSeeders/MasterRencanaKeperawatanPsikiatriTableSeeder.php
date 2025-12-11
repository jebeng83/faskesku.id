<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterRencanaKeperawatanPsikiatriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_rencana_keperawatan_psikiatri')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_rencana_keperawatan_psikiatri')->insert(array (
          0 => 
          array (
            'kode_masalah' => '001',
            'kode_rencana' => '001',
            'rencana_keperawatan' => 'rencana 1',
          ),
          1 => 
          array (
            'kode_masalah' => '002',
            'kode_rencana' => '002',
            'rencana_keperawatan' => 'rencana 2',
          ),
          2 => 
          array (
            'kode_masalah' => '001',
            'kode_rencana' => '003',
            'rencana_keperawatan' => 'sasasass',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}