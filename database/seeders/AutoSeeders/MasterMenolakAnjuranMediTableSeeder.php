<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterMenolakAnjuranMediTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_menolak_anjuran_medis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_menolak_anjuran_medis')->insert(array (
          0 => 
          array (
            'kode_penolakan' => '001',
            'nama_penolakan' => 'Anjuran Rawat Inap',
          ),
          1 => 
          array (
            'kode_penolakan' => '002',
            'nama_penolakan' => 'Anjuran Rujuk',
          ),
          2 => 
          array (
            'kode_penolakan' => '003',
            'nama_penolakan' => 'Anjuran Tindakan Medis',
          ),
          3 => 
          array (
            'kode_penolakan' => '004',
            'nama_penolakan' => 'Anjuran Operasi',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}