<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenilaianTerapiWicaraTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_terapi_wicara')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();

        Schema::enableForeignKeyConstraints();
    }
}
