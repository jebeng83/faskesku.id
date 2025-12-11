<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class JamJagaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('jam_jaga')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('jam_jaga')->insert(array (
          0 => 
          array (
            'no_id' => 6,
            'dep_id' => 'RNAP',
            'shift' => 'Pagi',
            'jam_masuk' => '07:00:00',
            'jam_pulang' => '14:00:00',
          ),
          1 => 
          array (
            'no_id' => 9,
            'dep_id' => 'RJ',
            'shift' => 'Pagi',
            'jam_masuk' => '08:00:00',
            'jam_pulang' => '11:00:00',
          ),
          2 => 
          array (
            'no_id' => 10,
            'dep_id' => 'IGD',
            'shift' => 'Pagi',
            'jam_masuk' => '07:00:00',
            'jam_pulang' => '13:00:00',
          ),
          3 => 
          array (
            'no_id' => 11,
            'dep_id' => 'MEN',
            'shift' => 'Pagi',
            'jam_masuk' => '17:00:00',
            'jam_pulang' => '20:00:00',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}