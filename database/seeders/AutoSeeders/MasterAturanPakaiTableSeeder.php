<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterAturanPakaiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_aturan_pakai')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_aturan_pakai')->insert(array (
          0 => 
          array (
            'aturan' => '1 x 1',
          ),
          1 => 
          array (
            'aturan' => '1 x 500 mg / 8 jam',
          ),
          2 => 
          array (
            'aturan' => '2 X 1',
          ),
          3 => 
          array (
            'aturan' => '2 x sehari dioleskan tipis pada kulit',
          ),
          4 => 
          array (
            'aturan' => '3 x 1',
          ),
          5 => 
          array (
            'aturan' => '3 x sehari dioleskan tipis pada kulit',
          ),
          6 => 
          array (
            'aturan' => '3x1/2 tablet',
          ),
          7 => 
          array (
            'aturan' => '4 x 1 bungus per 6 jam, dihabiskan',
          ),
          8 => 
          array (
            'aturan' => '4 x 1 cth',
          ),
          9 => 
          array (
            'aturan' => '4 x 1 pagi',
          ),
          10 => 
          array (
            'aturan' => '4 x 5 pagi, siang, malam',
          ),
          11 => 
          array (
            'aturan' => '5 x 1 pagi',
          ),
          12 => 
          array (
            'aturan' => '9 x 1',
          ),
          13 => 
          array (
            'aturan' => 'per 12 jam',
          ),
          14 => 
          array (
            'aturan' => 'per 12 jam, setelah makan',
          ),
          15 => 
          array (
            'aturan' => 'per 24 jam',
          ),
          16 => 
          array (
            'aturan' => 'per 8 jam',
          ),
          17 => 
          array (
            'aturan' => 'tiap 4-6 jam sekali, 1 tablet. bila demam, nyeri',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}