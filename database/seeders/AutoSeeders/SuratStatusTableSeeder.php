<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratStatusTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_status')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_status')->insert(array (
          0 => 
          array (
            'kd' => 'SS001',
            'status' => 'SUDAH DIBALAS',
          ),
          1 => 
          array (
            'kd' => 'SS002',
            'status' => 'PROSES DISPOSISI',
          ),
          2 => 
          array (
            'kd' => 'SS003',
            'status' => 'BELUM DIBALAS',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}