<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class JamMasukTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('jam_masuk')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('jam_masuk')->insert(array (
          0 => 
          array (
            'shift' => 'Pagi',
            'jam_masuk' => '06:00:00',
            'jam_pulang' => '16:00:00',
          ),
          1 => 
          array (
            'shift' => 'Pagi2',
            'jam_masuk' => '08:00:00',
            'jam_pulang' => '14:00:00',
          ),
          2 => 
          array (
            'shift' => 'Pagi3',
            'jam_masuk' => '10:00:00',
            'jam_pulang' => '17:00:00',
          ),
          3 => 
          array (
            'shift' => 'Siang',
            'jam_masuk' => '14:00:00',
            'jam_pulang' => '08:00:00',
          ),
          4 => 
          array (
            'shift' => 'Siang2',
            'jam_masuk' => '14:00:00',
            'jam_pulang' => '21:00:00',
          ),
          5 => 
          array (
            'shift' => 'Malam',
            'jam_masuk' => '20:00:00',
            'jam_pulang' => '02:00:00',
          ),
          6 => 
          array (
            'shift' => 'Midle Siang1',
            'jam_masuk' => '00:00:00',
            'jam_pulang' => '06:00:00',
          ),
          7 => 
          array (
            'shift' => 'Midle Siang3',
            'jam_masuk' => '00:00:00',
            'jam_pulang' => '00:00:00',
          ),
          8 => 
          array (
            'shift' => 'Midle Siang4',
            'jam_masuk' => '04:00:00',
            'jam_pulang' => '16:00:00',
          ),
          9 => 
          array (
            'shift' => 'Midle Malam1',
            'jam_masuk' => '00:00:00',
            'jam_pulang' => '06:00:00',
          ),
          10 => 
          array (
            'shift' => 'Midle Malam5',
            'jam_masuk' => '22:00:00',
            'jam_pulang' => '07:00:00',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}