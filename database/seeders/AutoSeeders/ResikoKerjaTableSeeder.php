<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ResikoKerjaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('resiko_kerja')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('resiko_kerja')->insert(array (
          0 => 
          array (
            'kode_resiko' => '-',
            'nama_resiko' => '-',
            'indek' => 0,
          ),
          1 => 
          array (
            'kode_resiko' => 'I',
            'nama_resiko' => 'GRADE I ( KEUANGAN,SDI,PHD,REKAM MEDIS)',
            'indek' => 3,
          ),
          2 => 
          array (
            'kode_resiko' => 'II',
            'nama_resiko' => 'GRADE II( Gizi, Unit Jenazah, Farmasi,ips,loundry,sopir)',
            'indek' => 5,
          ),
          3 => 
          array (
            'kode_resiko' => 'III',
            'nama_resiko' => 'GRADE II( Gizi, Unit Jenazah, Farmasi,ips,loundry,sopir)',
            'indek' => 7,
          ),
          4 => 
          array (
            'kode_resiko' => 'IV',
            'nama_resiko' => 'GRADE IV( IGD,IKO,VK,HCU,PERINATOLOGI)',
            'indek' => 9,
          ),
          5 => 
          array (
            'kode_resiko' => 'SB',
            'nama_resiko' => 'SANGAT BERESIKO',
            'indek' => 10,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}