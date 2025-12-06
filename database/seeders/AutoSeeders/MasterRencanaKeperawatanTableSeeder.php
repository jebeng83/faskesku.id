<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterRencanaKeperawatanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_rencana_keperawatan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_rencana_keperawatan')->insert(array (
          0 => 
          array (
            'kode_masalah' => '001',
            'kode_rencana' => '001',
            'rencana_keperawatan' => 'DIRAWAT',
          ),
          1 => 
          array (
            'kode_masalah' => '001',
            'kode_rencana' => '002',
            'rencana_keperawatan' => 'DIPELUK',
          ),
          2 => 
          array (
            'kode_masalah' => '002',
            'kode_rencana' => '003',
            'rencana_keperawatan' => 'TIDUR AJA',
          ),
          3 => 
          array (
            'kode_masalah' => '002',
            'kode_rencana' => '004',
            'rencana_keperawatan' => 'BANGUN PAGI',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}