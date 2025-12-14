<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AdminTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('admin')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('admin')->insert([
            0 => [
                'usere' => 'q½YÄ™\'â•É…£Å¸Êe',
                'passworde' => 'Ç§\\§'."\0".'ôgÈº®c²WÛ„',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
