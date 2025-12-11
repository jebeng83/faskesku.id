<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TemporaryResepTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('temporary_resep')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('temporary_resep')->insert(array (
          0 => 
          array (
            'no' => 0,
            'temp1' => 'AB-Vask 10mg (Otsus)',
            'temp2' => '2x1',
            'temp3' => '10',
            'temp4' => 'Ampul',
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
            'temp37' => '127.0.0.1',
          ),
          1 => 
          array (
            'no' => 1,
            'temp1' => 'Acrios 50 mg tab',
            'temp2' => '3x1',
            'temp3' => '10',
            'temp4' => 'Tablet',
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
            'temp37' => '127.0.0.1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}