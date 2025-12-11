<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PemberiHutangLainTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pemberi_hutang_lain')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pemberi_hutang_lain')->insert(array (
          0 => 
          array (
            'kode_pemberi_hutang' => 'PH002',
            'nama_pemberi_hutang' => '1',
            'alamat' => '2',
            'no_telp' => '0',
            'kd_rek' => '211220',
            'status' => '1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}