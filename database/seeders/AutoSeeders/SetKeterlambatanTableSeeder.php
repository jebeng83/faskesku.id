<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetKeterlambatanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_keterlambatan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_keterlambatan')->insert([
            0 => [
                'toleransi' => 5,
                'terlambat1' => 10,
                'terlambat2' => 15,
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
