<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TemporaryPermintaanRadiologiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('temporary_permintaan_radiologi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('temporary_permintaan_radiologi')->insert(array (
          0 => 
          array (
            'no' => 11,
            'temp1' => 'ICU.CTO-01',
            'temp2' => 'THORAX AP/PA',
            'temp3' => '',
            'temp4' => '',
            'temp5' => '',
            'temp6' => '',
            'temp7' => '',
            'temp8' => '',
            'temp9' => '',
            'temp10' => '',
            'temp11' => '',
            'temp12' => '',
            'temp13' => '',
            'temp14' => '',
            'temp15' => '',
            'temp16' => '',
            'temp17' => '',
            'temp18' => '',
            'temp19' => '',
            'temp20' => '',
            'temp21' => '',
            'temp22' => '',
            'temp23' => '',
            'temp24' => '',
            'temp25' => '',
            'temp26' => '',
            'temp27' => '',
            'temp28' => '',
            'temp29' => '',
            'temp30' => '',
            'temp31' => '',
            'temp32' => '',
            'temp33' => '',
            'temp34' => '',
            'temp35' => '',
            'temp36' => '',
            'temp37' => '',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}