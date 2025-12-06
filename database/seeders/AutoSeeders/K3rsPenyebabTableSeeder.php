<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class K3rsPenyebabTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('k3rs_penyebab')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('k3rs_penyebab')->insert(array (
          0 => 
          array (
            'kode_penyebab' => 'PK001',
            'penyebab_kecelakaan' => 'Mesin dan peralatan kerja lain yang bersifat portable (jarum suntik, jarum jahit, instrumen bedah)',
          ),
          1 => 
          array (
            'kode_penyebab' => 'PK002',
            'penyebab_kecelakaan' => 'Sarana angkat dan angkut lainya',
          ),
          2 => 
          array (
            'kode_penyebab' => 'PK003',
            'penyebab_kecelakaan' => 'Organisme makluk hidup, seperti, virus, bakteri, jamur atau sejenisnya',
          ),
          3 => 
          array (
            'kode_penyebab' => 'PK004',
            'penyebab_kecelakaan' => 'coro',
          ),
          4 => 
          array (
            'kode_penyebab' => 'PK005',
            'penyebab_kecelakaan' => 'kondisi lingkungan',
          ),
          5 => 
          array (
            'kode_penyebab' => 'PK006',
            'penyebab_kecelakaan' => 'Keluarga Berantem',
          ),
          6 => 
          array (
            'kode_penyebab' => 'PK007',
            'penyebab_kecelakaan' => 'Tikus',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}