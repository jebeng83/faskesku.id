<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SukuBangsaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('suku_bangsa')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('suku_bangsa')->insert(array (
          0 => 
          array (
            'id' => 1,
            'nama_suku_bangsa' => '-',
          ),
          1 => 
          array (
            'id' => 16,
            'nama_suku_bangsa' => 'ARAB',
          ),
          2 => 
          array (
            'id' => 18,
            'nama_suku_bangsa' => 'ASMAT',
          ),
          3 => 
          array (
            'id' => 15,
            'nama_suku_bangsa' => 'BALI',
          ),
          4 => 
          array (
            'id' => 9,
            'nama_suku_bangsa' => 'BUGIS',
          ),
          5 => 
          array (
            'id' => 12,
            'nama_suku_bangsa' => 'DAYAK',
          ),
          6 => 
          array (
            'id' => 17,
            'nama_suku_bangsa' => 'INGGRIS',
          ),
          7 => 
          array (
            'id' => 5,
            'nama_suku_bangsa' => 'JAWA',
          ),
          8 => 
          array (
            'id' => 68,
            'nama_suku_bangsa' => 'LOMBOK',
          ),
          9 => 
          array (
            'id' => 11,
            'nama_suku_bangsa' => 'LUWU',
          ),
          10 => 
          array (
            'id' => 8,
            'nama_suku_bangsa' => 'MADURA',
          ),
          11 => 
          array (
            'id' => 13,
            'nama_suku_bangsa' => 'MELAYU',
          ),
          12 => 
          array (
            'id' => 22,
            'nama_suku_bangsa' => 'PALEMBANG',
          ),
          13 => 
          array (
            'id' => 37,
            'nama_suku_bangsa' => 'PAPUA',
          ),
          14 => 
          array (
            'id' => 3,
            'nama_suku_bangsa' => 'SASAK',
          ),
          15 => 
          array (
            'id' => 4,
            'nama_suku_bangsa' => 'SUNDA',
          ),
          16 => 
          array (
            'id' => 14,
            'nama_suku_bangsa' => 'SUNDU BUHUN',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}