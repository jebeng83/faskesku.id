<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetUrutNoRkmMediTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_urut_no_rkm_medis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_urut_no_rkm_medis')->insert(array (
          0 => 
          array (
            'urutan' => 'Straight',
            'tahun' => 'No',
            'bulan' => 'No',
            'posisi_tahun_bulan' => 'Depan',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}