<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UtdKomponenDarahTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('utd_komponen_darah')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('utd_komponen_darah')->insert(array (
          0 => 
          array (
            'kode' => 'FFP',
            'nama' => 'Fresh Frozen Plasma',
            'lama' => 5,
            'jasa_sarana' => 10000.0,
            'paket_bhp' => 10000.0,
            'kso' => 10000.0,
            'manajemen' => 10000.0,
            'total' => 40000.0,
            'pembatalan' => 0.0,
          ),
          1 => 
          array (
            'kode' => 'FP',
            'nama' => 'Fresh Plasma',
            'lama' => 5,
            'jasa_sarana' => 30000.0,
            'paket_bhp' => 20000.0,
            'kso' => 10000.0,
            'manajemen' => 40000.0,
            'total' => 100000.0,
            'pembatalan' => 0.0,
          ),
          2 => 
          array (
            'kode' => 'PA',
            'nama' => 'Platelet Apheresis',
            'lama' => 5,
            'jasa_sarana' => 0.0,
            'paket_bhp' => 0.0,
            'kso' => 0.0,
            'manajemen' => 0.0,
            'total' => 0.0,
            'pembatalan' => 0.0,
          ),
          3 => 
          array (
            'kode' => 'PRC',
            'nama' => 'Packed Red Cell',
            'lama' => 30,
            'jasa_sarana' => 0.0,
            'paket_bhp' => 0.0,
            'kso' => 0.0,
            'manajemen' => 0.0,
            'total' => 0.0,
            'pembatalan' => 0.0,
          ),
          4 => 
          array (
            'kode' => 'PRP',
            'nama' => 'Platelet Rich Plasma',
            'lama' => 5,
            'jasa_sarana' => 0.0,
            'paket_bhp' => 0.0,
            'kso' => 0.0,
            'manajemen' => 0.0,
            'total' => 0.0,
            'pembatalan' => 0.0,
          ),
          5 => 
          array (
            'kode' => 'WB',
            'nama' => 'Whole Blood',
            'lama' => 30,
            'jasa_sarana' => 0.0,
            'paket_bhp' => 0.0,
            'kso' => 0.0,
            'manajemen' => 0.0,
            'total' => 0.0,
            'pembatalan' => 0.0,
          ),
          6 => 
          array (
            'kode' => 'WRC',
            'nama' => 'Washed Red Cell',
            'lama' => 5,
            'jasa_sarana' => 0.0,
            'paket_bhp' => 0.0,
            'kso' => 0.0,
            'manajemen' => 0.0,
            'total' => 0.0,
            'pembatalan' => 0.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}