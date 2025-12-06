<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetHariLiburTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_hari_libur')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_hari_libur')->insert(array (
          0 => 
          array (
            'tanggal' => '2011-12-18',
            'ktg' => '-',
          ),
          1 => 
          array (
            'tanggal' => '2012-01-15',
            'ktg' => 'kjk',
          ),
          2 => 
          array (
            'tanggal' => '2015-06-09',
            'ktg' => 'liburan',
          ),
          3 => 
          array (
            'tanggal' => '2018-02-16',
            'ktg' => 'Imlek',
          ),
          4 => 
          array (
            'tanggal' => '2019-05-30',
            'ktg' => '-',
          ),
          5 => 
          array (
            'tanggal' => '2019-06-01',
            'ktg' => 'KESAKTIAN PANCASILA',
          ),
          6 => 
          array (
            'tanggal' => '2019-10-10',
            'ktg' => 'maulid',
          ),
          7 => 
          array (
            'tanggal' => '2020-03-25',
            'ktg' => 'tanggal merah',
          ),
          8 => 
          array (
            'tanggal' => '2020-03-31',
            'ktg' => 'id',
          ),
          9 => 
          array (
            'tanggal' => '2020-07-31',
            'ktg' => 'id',
          ),
          10 => 
          array (
            'tanggal' => '2020-10-28',
            'ktg' => 'Maulid Nabi',
          ),
          11 => 
          array (
            'tanggal' => '2021-01-18',
            'ktg' => '-',
          ),
          12 => 
          array (
            'tanggal' => '2021-03-05',
            'ktg' => 'paskah',
          ),
          13 => 
          array (
            'tanggal' => '2022-03-01',
            'ktg' => 'tes',
          ),
          14 => 
          array (
            'tanggal' => '2022-05-01',
            'ktg' => 'hari lahir pacasila',
          ),
          15 => 
          array (
            'tanggal' => '2022-08-01',
            'ktg' => 'tes',
          ),
          16 => 
          array (
            'tanggal' => '2022-11-10',
            'ktg' => 'pahlawan',
          ),
          17 => 
          array (
            'tanggal' => '2022-12-25',
            'ktg' => 'natal',
          ),
          18 => 
          array (
            'tanggal' => '2023-01-01',
            'ktg' => 'libur tahun baru',
          ),
          19 => 
          array (
            'tanggal' => '2024-09-16',
            'ktg' => 'Maulud Nabi',
          ),
          20 => 
          array (
            'tanggal' => '2024-11-01',
            'ktg' => 'pilkada',
          ),
          21 => 
          array (
            'tanggal' => '2025-05-06',
            'ktg' => 'IDUL ADHA',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}