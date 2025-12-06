<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SettingTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('settings')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('settings')->insert(array (
          0 => 
          array (
            'id' => 1,
            'key' => 'app.name',
            'value' => 'Faskesku ID',
            'type' => 'string',
            'group' => 'app',
            'description' => 'Nama aplikasi yang ditampilkan di UI',
            'created_at' => '2025-10-27 16:44:02',
            'updated_at' => '2025-10-27 09:44:02',
          ),
          1 => 
          array (
            'id' => 2,
            'key' => 'app.timezone',
            'value' => 'UTC',
            'type' => 'string',
            'group' => 'app',
            'description' => 'Zona waktu default aplikasi',
            'created_at' => '2025-10-27 16:44:02',
            'updated_at' => '2025-10-27 09:44:02',
          ),
          2 => 
          array (
            'id' => 3,
            'key' => 'ui.theme',
            'value' => 'light',
            'type' => 'string',
            'group' => 'ui',
            'description' => 'Tema tampilan (light/dark)',
            'created_at' => '2025-10-27 16:44:02',
            'updated_at' => '2025-10-27 09:44:02',
          ),
          3 => 
          array (
            'id' => 4,
            'key' => 'ui.sidebar.collapsed',
            'value' => 'false',
            'type' => 'boolean',
            'group' => 'ui',
            'description' => 'Apakah sidebar dalam kondisi collapsed',
            'created_at' => '2025-10-27 16:44:02',
            'updated_at' => '2025-10-27 09:44:02',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}