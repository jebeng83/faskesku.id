<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterRencanaKeperawatanAnakTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_rencana_keperawatan_anak')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_rencana_keperawatan_anak')->insert(array (
          0 => 
          array (
            'kode_masalah' => '001',
            'kode_rencana' => '001',
            'rencana_keperawatan' => 'Bayi Disapa',
          ),
          1 => 
          array (
            'kode_masalah' => '001',
            'kode_rencana' => '002',
            'rencana_keperawatan' => 'Ditanya',
          ),
          2 => 
          array (
            'kode_masalah' => '002',
            'kode_rencana' => '003',
            'rencana_keperawatan' => 'Suruh tidur cepat',
          ),
          3 => 
          array (
            'kode_masalah' => '002',
            'kode_rencana' => '004',
            'rencana_keperawatan' => 'Kasih obat tidur',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}