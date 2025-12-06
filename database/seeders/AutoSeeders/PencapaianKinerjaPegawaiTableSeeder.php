<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PencapaianKinerjaPegawaiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pencapaian_kinerja_pegawai')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pencapaian_kinerja_pegawai')->insert(array (
          0 => 
          array (
            'id' => 117,
            'kode_pencapaian' => 'I',
            'tahun' => '2024',
            'bulan' => 11,
            'keterangan' => '-',
          ),
          1 => 
          array (
            'id' => 117,
            'kode_pencapaian' => 'II',
            'tahun' => '2022',
            'bulan' => 1,
            'keterangan' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}