<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SatuSehatMappingObatTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('satu_sehat_mapping_obat')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        
        Schema::enableForeignKeyConstraints();
    }
}