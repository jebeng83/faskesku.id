<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BuktiPenagihanPiutangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bukti_penagihan_piutang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bukti_penagihan_piutang')->insert(array (
          0 => 
          array (
            'no_tagihan' => 'PP20250428001',
            'photo' => 'pages/upload/PP20250428001.jpeg',
          ),
          1 => 
          array (
            'no_tagihan' => 'PP20250603001',
            'photo' => 'pages/upload/PP20250603001.jpeg',
          ),
          2 => 
          array (
            'no_tagihan' => 'PP20250620001',
            'photo' => 'pages/upload/PP20250620001.jpeg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}