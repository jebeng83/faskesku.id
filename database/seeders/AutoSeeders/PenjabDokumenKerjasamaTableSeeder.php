<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenjabDokumenKerjasamaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penjab_dokumen_kerjasama')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penjab_dokumen_kerjasama')->insert(array (
          0 => 
          array (
            'kd_pj' => 'B1',
            'kerjasama_berakhir' => '2024-11-03',
            'photo' => '',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}