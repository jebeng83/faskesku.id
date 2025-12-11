<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UtdDetailPemisahanKomponenTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('utd_detail_pemisahan_komponen')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('utd_detail_pemisahan_komponen')->insert(array (
          0 => 
          array (
            'no_donor' => '2024/01/UTD0001',
            'no_kantong' => 'FFP2024/01/UTD0001',
            'kode_komponen' => 'FFP',
            'tanggal_kadaluarsa' => '2024-01-18',
          ),
          1 => 
          array (
            'no_donor' => '2024/11/UTD0001',
            'no_kantong' => 'FFP2024/11/UTD0001',
            'kode_komponen' => 'FFP',
            'tanggal_kadaluarsa' => '2024-11-24',
          ),
          2 => 
          array (
            'no_donor' => '2025/06/UTD0001',
            'no_kantong' => 'FFP2025/06/UTD0001',
            'kode_komponen' => 'FFP',
            'tanggal_kadaluarsa' => '2025-06-24',
          ),
          3 => 
          array (
            'no_donor' => '2024/01/UTD0001',
            'no_kantong' => 'FP2024/01/UTD0001',
            'kode_komponen' => 'FP',
            'tanggal_kadaluarsa' => '2024-01-18',
          ),
          4 => 
          array (
            'no_donor' => '2024/01/UTD0001',
            'no_kantong' => 'PA2024/01/UTD0001',
            'kode_komponen' => 'PA',
            'tanggal_kadaluarsa' => '2024-01-18',
          ),
          5 => 
          array (
            'no_donor' => '2024/01/UTD0001',
            'no_kantong' => 'PRC2024/01/UTD0001',
            'kode_komponen' => 'PRC',
            'tanggal_kadaluarsa' => '2024-02-12',
          ),
          6 => 
          array (
            'no_donor' => '2025/06/UTD0001',
            'no_kantong' => 'PRC2025/06/UTD0001',
            'kode_komponen' => 'PRC',
            'tanggal_kadaluarsa' => '2025-07-19',
          ),
          7 => 
          array (
            'no_donor' => '2024/01/UTD0001',
            'no_kantong' => 'PRP2024/01/UTD0001',
            'kode_komponen' => 'PRP',
            'tanggal_kadaluarsa' => '2024-01-18',
          ),
          8 => 
          array (
            'no_donor' => '2024/11/UTD0001',
            'no_kantong' => 'PRP2024/11/UTD0001',
            'kode_komponen' => 'PRP',
            'tanggal_kadaluarsa' => '2024-11-24',
          ),
          9 => 
          array (
            'no_donor' => '2024/01/UTD0001',
            'no_kantong' => 'WB2024/01/UTD0001',
            'kode_komponen' => 'WB',
            'tanggal_kadaluarsa' => '2024-02-12',
          ),
          10 => 
          array (
            'no_donor' => '2024/11/UTD0001',
            'no_kantong' => 'WB2024/11/UTD0001',
            'kode_komponen' => 'WB',
            'tanggal_kadaluarsa' => '2024-12-19',
          ),
          11 => 
          array (
            'no_donor' => '2024/01/UTD0001',
            'no_kantong' => 'WRC2024/01/UTD0001',
            'kode_komponen' => 'WRC',
            'tanggal_kadaluarsa' => '2024-01-18',
          ),
          12 => 
          array (
            'no_donor' => '2025/06/UTD0001',
            'no_kantong' => 'WRC2025/06/UTD0001',
            'kode_komponen' => 'WRC',
            'tanggal_kadaluarsa' => '2025-06-24',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}