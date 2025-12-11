<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AntrilabpaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('antrilabpa')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        
        Schema::enableForeignKeyConstraints();
    }
}