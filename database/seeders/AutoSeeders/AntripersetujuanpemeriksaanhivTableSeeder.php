<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AntripersetujuanpemeriksaanhivTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('antripersetujuanpemeriksaanhiv')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('antripersetujuanpemeriksaanhiv')->insert(array (
          0 => 
          array (
            'no_persetujuan' => 'PPHIV20250819001',
            'no_rawat' => '2025/08/19/000002',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}