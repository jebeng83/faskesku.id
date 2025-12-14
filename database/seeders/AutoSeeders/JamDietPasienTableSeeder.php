<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class JamDietPasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('jam_diet_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('jam_diet_pasien')->insert([
            0 => [
                'waktu' => 'Pagi',
                'jam' => '08:00',
            ],
            1 => [
                'waktu' => 'Pagi2',
                'jam' => '10:00',
            ],
            2 => [
                'waktu' => 'Siang',
                'jam' => '12:00',
            ],
            3 => [
                'waktu' => 'Siang2',
                'jam' => '14:00',
            ],
            4 => [
                'waktu' => 'Sore',
                'jam' => '16:00',
            ],
            5 => [
                'waktu' => 'Malam',
                'jam' => '21:00',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
