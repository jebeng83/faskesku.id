<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ClosingKasirTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('closing_kasir')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('closing_kasir')->insert(array (
          0 => 
          array (
            'shift' => 'Pagi',
            'jam_masuk' => '00:00:00',
            'jam_pulang' => '13:00:00',
          ),
          1 => 
          array (
            'shift' => 'Siang',
            'jam_masuk' => '13:00:01',
            'jam_pulang' => '19:00:00',
          ),
          2 => 
          array (
            'shift' => 'Malam',
            'jam_masuk' => '19:00:01',
            'jam_pulang' => '23:59:00',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}