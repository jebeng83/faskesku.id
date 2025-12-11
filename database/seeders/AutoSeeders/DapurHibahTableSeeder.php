<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DapurHibahTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('dapur_hibah')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('dapur_hibah')->insert(array (
          0 => 
          array (
            'no_hibah' => 'HD20241118001',
            'kode_pemberi' => 'H0001',
            'nip' => '123124',
            'tgl_hibah' => '2024-11-18',
            'totalhibah' => 106000.0,
            'keterangan' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}