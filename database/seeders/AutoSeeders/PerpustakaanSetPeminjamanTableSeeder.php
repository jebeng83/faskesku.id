<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PerpustakaanSetPeminjamanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('perpustakaan_set_peminjaman')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('perpustakaan_set_peminjaman')->insert(array (
          0 => 
          array (
            'max_pinjam' => 1,
            'lama_pinjam' => 2,
            'denda_perhari' => 1000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}