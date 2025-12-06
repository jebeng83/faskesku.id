<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UtdPenyerahanDarahDetailTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('utd_penyerahan_darah_detail')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('utd_penyerahan_darah_detail')->insert(array (
          0 => 
          array (
            'no_penyerahan' => '2024/01/PD00001',
            'no_kantong' => 'FFP2024/01/UTD0001',
            'jasa_sarana' => 10000.0,
            'paket_bhp' => 10000.0,
            'kso' => 10000.0,
            'manajemen' => 10000.0,
            'total' => 40000.0,
          ),
          1 => 
          array (
            'no_penyerahan' => '2024/01/PD00001',
            'no_kantong' => 'FP2024/01/UTD0001',
            'jasa_sarana' => 30000.0,
            'paket_bhp' => 20000.0,
            'kso' => 10000.0,
            'manajemen' => 40000.0,
            'total' => 100000.0,
          ),
          2 => 
          array (
            'no_penyerahan' => '2024/01/PD00001',
            'no_kantong' => 'PA44664',
            'jasa_sarana' => 0.0,
            'paket_bhp' => 0.0,
            'kso' => 0.0,
            'manajemen' => 0.0,
            'total' => 0.0,
          ),
          3 => 
          array (
            'no_penyerahan' => '2024/11/PD00001',
            'no_kantong' => 'FFP2024/11/UTD0001',
            'jasa_sarana' => 10000.0,
            'paket_bhp' => 10000.0,
            'kso' => 10000.0,
            'manajemen' => 10000.0,
            'total' => 40000.0,
          ),
          4 => 
          array (
            'no_penyerahan' => '2025/06/PD00001',
            'no_kantong' => 'FFP2025/06/UTD0001',
            'jasa_sarana' => 10000.0,
            'paket_bhp' => 10000.0,
            'kso' => 10000.0,
            'manajemen' => 10000.0,
            'total' => 40000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}