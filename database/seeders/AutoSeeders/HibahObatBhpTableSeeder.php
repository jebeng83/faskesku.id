<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class HibahObatBhpTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('hibah_obat_bhp')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('hibah_obat_bhp')->insert(array (
          0 => 
          array (
            'no_hibah' => 'HO20250630001',
            'kode_pemberi' => 'H0001',
            'nip' => '123124',
            'tgl_hibah' => '2025-06-30',
            'totalhibah' => 2880000.0,
            'totalnilai' => 2880000.0,
            'kd_bangsal' => 'AP',
          ),
          1 => 
          array (
            'no_hibah' => 'HO20250719001',
            'kode_pemberi' => 'H0001',
            'nip' => '123124',
            'tgl_hibah' => '2025-07-19',
            'totalhibah' => 41302.4262400000006891787052154541015625,
            'totalnilai' => 41302.4262400000006891787052154541015625,
            'kd_bangsal' => 'GD',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}