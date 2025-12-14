<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PendidikanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pendidikan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pendidikan')->insert([
            0 => [
                'tingkat' => '-',
                'indek' => 0,
                'gapok1' => 0.0,
                'kenaikan' => 0.0,
                'maksimal' => 0,
            ],
            1 => [
                'tingkat' => 'D3 IT',
                'indek' => 3,
                'gapok1' => 900000.0,
                'kenaikan' => 0.0,
                'maksimal' => 12,
            ],
            2 => [
                'tingkat' => 'D3 PERAWAT',
                'indek' => 6,
                'gapok1' => 700000.0,
                'kenaikan' => 40000.0,
                'maksimal' => 20,
            ],
            3 => [
                'tingkat' => 'S1 DIREKTUR UTAMA',
                'indek' => 10,
                'gapok1' => 10000000.0,
                'kenaikan' => 0.0,
                'maksimal' => 12,
            ],
            4 => [
                'tingkat' => 'S1 KEDOKTERAN',
                'indek' => 10,
                'gapok1' => 3000000.0,
                'kenaikan' => 100000.0,
                'maksimal' => 15,
            ],
            5 => [
                'tingkat' => 'S1 PEMERINTAHAN',
                'indek' => 0,
                'gapok1' => 0.0,
                'kenaikan' => 0.0,
                'maksimal' => 0,
            ],
            6 => [
                'tingkat' => 'S1 PERAWAT',
                'indek' => 10,
                'gapok1' => 1000000.0,
                'kenaikan' => 50000.0,
                'maksimal' => 15,
            ],
            7 => [
                'tingkat' => 'S1 PERAWAT KONTRAK',
                'indek' => 0,
                'gapok1' => 0.0,
                'kenaikan' => 0.0,
                'maksimal' => 10,
            ],
            8 => [
                'tingkat' => 'S2 PERAWAT',
                'indek' => 10,
                'gapok1' => 0.0,
                'kenaikan' => 0.0,
                'maksimal' => 20,
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
