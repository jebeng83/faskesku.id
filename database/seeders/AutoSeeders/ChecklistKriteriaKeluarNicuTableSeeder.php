<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ChecklistKriteriaKeluarNicuTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('checklist_kriteria_keluar_nicu')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('checklist_kriteria_keluar_nicu')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'tanggal' => '2025-08-15 10:14:43',
            'respirasi1' => 'Tidak',
            'respirasi2' => 'Tidak',
            'respirasi3' => 'Tidak',
            'kardio1' => 'Tidak',
            'kardio2' => 'Tidak',
            'nutrisi1' => 'Tidak',
            'nutrisi2' => 'Tidak',
            'nutrisi3' => 'Tidak',
            'suhutubuh1' => 'Tidak',
            'suhutubuh2' => 'Tidak',
            'infeksi1' => 'Tidak',
            'infeksi2' => 'Tidak',
            'infeksi3' => 'Tidak',
            'keputusan' => 'Layak Dipindahkan Ke Ruang Rawat Bayi/Rawat Gabung',
            'keterangan' => 'tes sasas',
            'nik' => 'D0000004',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}