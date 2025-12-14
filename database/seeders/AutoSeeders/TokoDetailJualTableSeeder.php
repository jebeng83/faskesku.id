<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TokoDetailJualTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('toko_detail_jual')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();

        Schema::enableForeignKeyConstraints();
    }
}
