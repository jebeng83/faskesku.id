<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratKlasifikasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_klasifikasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_klasifikasi')->insert(array (
          0 => 
          array (
            'kd' => 'SK001',
            'klasifikasi' => 'RESMI',
          ),
          1 => 
          array (
            'kd' => 'SK002',
            'klasifikasi' => 'PENAWARAN',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}