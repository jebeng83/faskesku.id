<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PerpustakaanPengarangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('perpustakaan_pengarang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('perpustakaan_pengarang')->insert(array (
          0 => 
          array (
            'kode_pengarang' => 'PP001',
            'nama_pengarang' => 'YASKI',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}