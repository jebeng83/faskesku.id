<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ChecklistKriteriaMasukNicuTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('checklist_kriteria_masuk_nicu')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('checklist_kriteria_masuk_nicu')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'tanggal' => '2025-08-12 14:24:16',
            'respirasi1' => 'Tidak',
            'respirasi2' => 'Tidak',
            'respirasi3' => 'Tidak',
            'respirasi4' => 'Tidak',
            'prematur1' => 'Tidak',
            'prematur2' => 'Tidak',
            'prematur3' => 'Tidak',
            'kardio1' => 'Tidak',
            'kardio2' => 'Tidak',
            'kardio3' => 'Tidak',
            'neuro1' => 'Tidak',
            'neuro2' => 'Tidak',
            'neuro3' => 'Tidak',
            'metabolik1' => 'Tidak',
            'metabolik2' => 'Tidak',
            'metabolik3' => 'Tidak',
            'kondisilain1' => 'Tidak',
            'kondisilain2' => 'Tidak',
            'kondisilain3' => 'Tidak',
            'kondisilain4' => 'Tidak',
            'keputusan' => 'Tidak Diterima - Dirawat Di Ruang Perawatan Bayi Lain',
            'keterangan' => 'tes ok gaaas',
            'nik' => '12/09/1988/001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}