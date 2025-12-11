<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ChecklistKriteriaMasukHcuTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('checklist_kriteria_masuk_hcu')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('checklist_kriteria_masuk_hcu')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'tanggal' => '2025-06-30 09:02:16',
            'kardiologi1' => 'Tidak',
            'kardiologi2' => 'Tidak',
            'kardiologi3' => 'Tidak',
            'kardiologi4' => 'Tidak',
            'kardiologi5' => 'Tidak',
            'kardiologi6' => 'Tidak',
            'pernapasan1' => 'Tidak',
            'pernapasan2' => 'Tidak',
            'pernapasan3' => 'Tidak',
            'syaraf1' => 'Tidak',
            'syaraf2' => 'Tidak',
            'syaraf3' => 'Tidak',
            'syaraf4' => 'Tidak',
            'pencernaan1' => 'Tidak',
            'pencernaan2' => 'Tidak',
            'pencernaan3' => 'Tidak',
            'pencernaan4' => 'Tidak',
            'pembedahan1' => 'Tidak',
            'pembedahan2' => 'Tidak',
            'hematologi1' => 'Tidak',
            'hematologi2' => 'Tidak',
            'infeksi' => 'Tidak',
            'nik' => 'D0000004',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}