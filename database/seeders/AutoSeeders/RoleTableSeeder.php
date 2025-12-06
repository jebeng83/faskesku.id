<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RoleTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('roles')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('roles')->insert(array (
          0 => 
          array (
            'id' => 1,
            'name' => 'admin',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          1 => 
          array (
            'id' => 2,
            'name' => 'dokter',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
          2 => 
          array (
            'id' => 3,
            'name' => 'petugas',
            'guard_name' => 'web',
            'created_at' => '2025-09-19 07:39:55',
            'updated_at' => '2025-09-19 07:39:55',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}