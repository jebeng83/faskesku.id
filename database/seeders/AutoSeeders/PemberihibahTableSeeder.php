<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PemberihibahTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pemberihibah')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pemberihibah')->insert(array (
          0 => 
          array (
            'kode_pemberi' => 'H0001',
            'nama_pemberi' => '-',
            'alamat' => '-',
            'kota' => '-',
            'no_telp' => '0',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}