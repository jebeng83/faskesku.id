<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ChecklistKriteriaMasukPicuTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('checklist_kriteria_masuk_picu')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('checklist_kriteria_masuk_picu')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/08/19/000002',
            'tanggal' => '2025-08-26 06:19:39',
            'kriteriaumum1' => 'Tidak',
            'kriteriaumum2' => 'Ya',
            'kriteriaumum3' => 'Tidak',
            'respirasi1' => 'Ya',
            'respirasi2' => 'Tidak',
            'respirasi3' => 'Ya',
            'respirasi4' => 'Tidak',
            'kardio1' => 'Ya',
            'kardio2' => 'Tidak',
            'kardio3' => 'Ya',
            'kardio4' => 'Tidak',
            'neuro1' => 'Ya',
            'neuro2' => 'Tidak',
            'neuro3' => 'Ya',
            'neuro4' => 'Tidak',
            'bedah1' => 'Ya',
            'bedah2' => 'Tidak',
            'bedah3' => 'Ya',
            'kondisilain1' => 'Tidak',
            'kondisilain2' => 'Ya',
            'kondisilain3' => 'Tidak',
            'keputusan' => 'Tidak Diterima - Dirawat Di Ruang Lain',
            'keterangan' => 'tes',
            'nik' => '08998998',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}