<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterMasalahKeperawatanPsikiatriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_masalah_keperawatan_psikiatri')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_masalah_keperawatan_psikiatri')->insert(array (
          0 => 
          array (
            'kode_masalah' => '001',
            'nama_masalah' => 'tes psikiatri 1',
          ),
          1 => 
          array (
            'kode_masalah' => '002',
            'nama_masalah' => 'tes psikitari 2',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}