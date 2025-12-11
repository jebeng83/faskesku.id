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
        DB::table('admin')->insert(array (
          0 => 
          array (
            'usere' => 'q½YÄ™\'â•É…£Å¸Êe',
            'passworde' => 'Ç§\\§' . "\0" . 'ôgÈº®c²WÛ„',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}