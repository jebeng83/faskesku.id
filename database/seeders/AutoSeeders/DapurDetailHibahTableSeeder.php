<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DapurDetailHibahTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('dapur_detail_hibah')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('dapur_detail_hibah')->insert(array (
          0 => 
          array (
            'no_hibah' => 'HD20241118001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 2.0,
            'h_hibah' => 3000.0,
            'subtotalhibah' => 6000.0,
          ),
          1 => 
          array (
            'no_hibah' => 'HD20241118001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 10.0,
            'h_hibah' => 10000.0,
            'subtotalhibah' => 100000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}