<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BuktiPerencanaanPemulanganSaksikeluargaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bukti_perencanaan_pemulangan_saksikeluarga')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bukti_perencanaan_pemulangan_saksikeluarga')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'photo' => 'pages/upload/20250620000002.jpeg',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'photo' => 'pages/upload/20250628000001.jpeg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}