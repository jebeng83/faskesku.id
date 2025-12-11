<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PersonalAccessTokenTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('personal_access_tokens')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('personal_access_tokens')->insert(array (
          0 => 
          array (
            'id' => 1,
            'tokenable_type' => 'App\\Models\\User',
            'tokenable_id' => 2,
            'name' => 'terminal-test',
            'token' => '63468540e6582fc8b778e1fbe32018805453e17b42ee65f861c425321943b094',
            'abilities' => '["*"]',
            'last_used_at' => '2025-12-01 23:09:51',
            'expires_at' => NULL,
            'created_at' => '2025-12-01 23:08:08',
            'updated_at' => '2025-12-01 23:09:51',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}