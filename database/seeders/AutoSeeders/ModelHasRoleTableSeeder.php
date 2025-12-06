<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ModelHasRoleTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('model_has_roles')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('model_has_roles')->insert(array (
          0 => 
          array (
            'role_id' => 1,
            'model_type' => 'App\\Models\\User',
            'model_id' => 2,
          ),
          1 => 
          array (
            'role_id' => 1,
            'model_type' => 'App\\Models\\User',
            'model_id' => 7,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}