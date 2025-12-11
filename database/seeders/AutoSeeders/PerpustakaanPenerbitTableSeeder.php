<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PerpustakaanPenerbitTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('perpustakaan_penerbit')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('perpustakaan_penerbit')->insert(array (
          0 => 
          array (
            'kode_penerbit' => 'PK00000001',
            'nama_penerbit' => 'YASKI',
            'alamat_penerbit' => '1
        ',
            'no_telp' => '1',
            'email' => '1',
            'website_penerbit' => '1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}