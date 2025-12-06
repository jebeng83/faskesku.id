<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KategoriPenyakitTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kategori_penyakit')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kategori_penyakit')->insert(array (
          0 => 
          array (
            'kd_ktg' => '-',
            'nm_kategori' => '-',
            'ciri_umum' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}